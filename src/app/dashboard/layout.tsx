import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Sidebar from '../components/shared/Sidebar';
import TopBar from '../components/shared/TopBar';

export const metadata = { title: 'Dashboard' };

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  return (
    <div className="min-h-screen bg-gradient-light">
      <div className="flex">
        <Sidebar user={session.user} />
        
        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <TopBar user={session.user} />
          
          {/* Content Area */}
          <div className="p-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
