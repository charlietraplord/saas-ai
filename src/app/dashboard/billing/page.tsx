import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { prisma } from '../../../lib/prisma';
import { BILLING_TIERS } from '../../../lib/billing';

export default async function BillingPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { 
      tenant: {
        include: { 
          usageRecords: { 
            where: { 
              createdAt: { 
                gte: new Date(new Date().setDate(1)) 
              } 
            } 
          }
        }
      }
    }
  });

  if (!user) return null;

  const currentPlan = BILLING_TIERS[user.tenant.plan];
  
  // Calculate total API calls and cost from usage records
  const currentUsage = user.tenant.usageRecords.reduce((acc, record) => {
    return {
      apiCalls: acc.apiCalls + (record.type === 'API_CALL' ? record.quantity : 0),
      cost: acc.cost + record.cost,
    };
  }, { apiCalls: 0, cost: 0 });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="h2">Billing & Plans</h1>
          <p className="text-text">Manage your subscription and billing details</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-text-2">Current Plan:</div>
          <div className="text-primary font-semibold">{currentPlan.name}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="card bg-gradient-to-br from-primary/5 to-primary/10">
            <h2 className="text-lg font-semibold mb-6">Current Usage</h2>
            
            <div className="space-y-6">
              {/* API Calls Progress */}
              <div>
                <div className="flex justify-between mb-2">
                  <div className="text-sm text-text-2">API Calls</div>
                  <div className="text-sm font-medium">
                    {currentUsage.apiCalls.toLocaleString()} / {currentPlan.maxCallsPerMonth.toLocaleString()}
                  </div>
                </div>
                <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (currentUsage.apiCalls / currentPlan.maxCallsPerMonth) * 100)}%`
                    }}
                  />
                </div>
              </div>

              {/* Monthly Cost */}
              <div className="grid grid-cols-2 gap-6 mt-8 p-6 bg-white rounded-xl">
                <div>
                  <div className="text-sm text-text-2">Current Usage</div>
                  <div className="text-2xl font-bold">${currentUsage.cost.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm text-text-2">Plan Price</div>
                  <div className="text-2xl font-bold">${currentPlan.price}/mo</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-blue-50">
          <h2 className="text-lg font-semibold mb-4">Plan Features</h2>
          <ul className="space-y-3 mb-6">
            {currentPlan.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-text-2">
                <svg className="w-4 h-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <button className="btn btn-primary w-full">Upgrade Plan</button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Usage History</h2>
          <button className="btn btn-outline">Export</button>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-text-2/10">
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Type</th>
                  <th className="text-left p-4">Quantity</th>
                  <th className="text-right p-4">Cost</th>
                </tr>
              </thead>
              <tbody>
                {user.tenant.usageRecords.map((record) => (
                  <tr key={record.id} className="border-b border-text-2/10">
                    <td className="p-4">{record.createdAt.toLocaleDateString()}</td>
                    <td className="p-4">{record.type}</td>
                    <td className="p-4">{record.quantity}</td>
                    <td className="p-4 text-right">${record.cost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
