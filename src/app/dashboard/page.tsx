import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Card from '../components/ui/Card';

const stats = [
	{
		name: 'Active Agents',
		value: '3',
		change: '+2',
		changeType: 'increase',
		icon: (
			<svg
				className="w-6 h-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
				/>
			</svg>
		),
	},
	{
		name: 'API Calls',
		value: '124',
		change: '+42',
		changeType: 'increase',
		icon: (
			<svg
				className="w-6 h-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M13 10V3L4 14h7v7l9-11h-7z"
				/>
			</svg>
		),
	},
	{
		name: 'Usage This Month',
		value: '$12.40',
		change: '-$2.30',
		changeType: 'decrease',
		icon: (
			<svg
				className="w-6 h-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		),
	},
];

const recentActivity = [
	{
		agent: 'Customer Support Agent',
		action: 'Completed chat session',
		time: '2 minutes ago',
		status: 'success',
	},
	{
		agent: 'Data Analysis Agent',
		action: 'Generated weekly report',
		time: '1 hour ago',
		status: 'success',
	},
	{
		agent: 'Research Assistant',
		action: 'Processing request',
		time: 'Just now',
		status: 'processing',
	},
];

export default async function DashboardHome() {
	const session = await getServerSession(authOptions);

	return (
		<div className="space-y-8">
			{/* Welcome Section */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-primary-dark">
						Welcome back, {session?.user?.name}
					</h1>
					<p className="text-text mt-1">
						Here&apos;s what&apos;s happening with your AI agents today.
					</p>
				</div>
				<button className="btn btn-primary">
					<svg
						className="w-5 h-5 mr-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 6v6m0 0v6m0-6h6m-6 0H6"
						/>
					</svg>
					New Agent
				</button>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{stats.map((stat) => (
					<Card
						key={stat.name}
						className="p-6 hover:-translate-y-1 transition-transform duration-300"
					>
						<div className="flex items-center justify-between">
							<div className="p-2 bg-primary/10 rounded-xl text-primary">
								{stat.icon}
							</div>
							<div
								className={`text-sm font-medium ${
									stat.changeType === 'increase'
										? 'text-green-600'
										: 'text-red-600'
								}`}
							>
								{stat.change}
							</div>
						</div>
						<div className="mt-4">
							<h3 className="text-lg font-medium text-text">
								{stat.name}
							</h3>
							<p className="text-2xl font-bold text-primary-dark mt-1">
								{stat.value}
							</p>
						</div>
					</Card>
				))}
			</div>

			{/* Recent Activity */}
			<Card className="overflow-hidden">
				<div className="border-b border-text-2/10 p-6">
					<h2 className="text-lg font-semibold text-primary-dark">
						Recent Activity
					</h2>
				</div>
				<div className="divide-y divide-text-2/10">
					{recentActivity.map((activity, idx) => (
						<div
							key={idx}
							className="p-6 hover:bg-primary/5 transition-colors duration-200"
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<div
										className={`w-2.5 h-2.5 rounded-full ${
											activity.status === 'success'
												? 'bg-green-500'
												: 'bg-blue-500 animate-pulse'
										}`}
									/>
									<div>
										<p className="font-medium text-primary-dark">
											{activity.agent}
										</p>
										<p className="text-sm text-text">
											{activity.action}
										</p>
									</div>
								</div>
								<span className="text-sm text-text">
									{activity.time}
								</span>
							</div>
						</div>
					))}
				</div>
			</Card>
		</div>
	);
}
