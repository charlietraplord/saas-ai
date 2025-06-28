import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import { AuthProvider } from './components/providers/auth-provider';
import { SocketProvider } from './components/providers/socket-provider';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Agent SaaS',
  description: 'AI-powered automation platform',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SocketProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}