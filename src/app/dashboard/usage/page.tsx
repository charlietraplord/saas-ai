export default function UsagePage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="h2">Usage & Analytics</h1>
          <p className="text-text">Track your platform usage and performance metrics</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card transition-all hover:shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="text-text-2">API Calls</div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-primary-dark mb-1">1,234</div>
          <div className="flex items-center text-sm">
            <span className="text-green-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +12.5%
            </span>
            <span className="text-text-2 ml-2">vs last month</span>
          </div>
        </div>

        <div className="card transition-all hover:shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="text-text-2">Usage Cost</div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-primary-dark mb-1">$12.40</div>
          <div className="flex items-center text-sm">
            <span className="text-red-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              -2.3%
            </span>
            <span className="text-text-2 ml-2">vs last month</span>
          </div>
        </div>

        <div className="card transition-all hover:shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="text-text-2">Success Rate</div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-primary-dark mb-1">89%</div>
          <div className="flex items-center text-sm">
            <span className="text-green-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +5%
            </span>
            <span className="text-text-2 ml-2">vs last month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Usage Timeline</h2>
          <div className="h-72 flex items-center justify-center">
            <p className="text-text-2">Charts coming soon...</p>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Usage</h2>
            <button className="text-primary text-sm hover:text-primary-dark">View All</button>
          </div>
          
          <div className="space-y-4">
            {[
              { agent: 'Customer Support', type: 'API Call', time: '2 minutes ago', status: 'success' },
              { agent: 'Data Analysis', type: 'API Call', time: '1 hour ago', status: 'success' },
              { agent: 'Sales Assistant', type: 'API Call', time: '3 hours ago', status: 'error' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div>
                    <div className="font-medium">{activity.agent}</div>
                    <div className="text-sm text-text-2">{activity.type}</div>
                  </div>
                </div>
                <div className="text-sm text-text-2">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
