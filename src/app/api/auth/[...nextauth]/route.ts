import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import type { User } from '@/lib/types';

declare module 'next-auth' {
  interface Session {
    user: User & DefaultSession['user']
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.hashedPassword) return null;
        
        const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);
        
        if (!isValid) return null;
        
        return { 
          id: user.id,
          name: user.name,
          email: user.email,
          tenantId: user.tenantId
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          tenantId: '', // This will be set when first signing up
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email || '' }
        });
        
        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.tenantId = dbUser.tenantId;
        }
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        // Check if this Google user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! }
        });

        // If they don't exist, create a new tenant and user
        if (!existingUser) {
          const tenant = await prisma.tenant.create({
            data: {
              name: `${user.name}'s Tenant`,
              plan: 'FREE',
            },
          });

          // Generate a random secure password for OAuth users since they'll never use it
          const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
          const hashedPassword = await bcrypt.hash(randomPassword, 10);

          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name!,
              tenantId: tenant.id,
              hashedPassword, // Add the hashed random password
            },
          });
        }
      }
      return true;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
