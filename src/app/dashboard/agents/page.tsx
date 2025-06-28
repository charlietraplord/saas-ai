'use client';

import Link from 'next/link';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const mockAgents = [
	{
		id: 'a1',
		name: 'Customer Support Bot',
		description: 'Handles customer inquiries and support tickets',
		model: 'gpt-3.5-turbo',
		status: 'active',
		lastActive: '2 mins ago',
		stats: {
			chats: 156,
			satisfaction: '98%',
			responseTime: '< 1 min',
		},
	},
	{
		id: 'a2',
		name: 'Data Analysis Assistant',
		description: 'Processes and analyzes data reports',
		model: 'gpt-4',
		status: 'idle',
		lastActive: '1 hour ago',
		stats: {
			chats: 42,
			satisfaction: '95%',
			responseTime: '2 mins',
		},
	},
];

export default function MyAgents() {
	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-bold text-primary-dark">My AI Agents</h1>
					<p className="text-text mt-1">Manage and monitor your AI assistants</p>
				</div>
				<Link href="/dashboard/agents/create">
					<Button variant="primary">
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
					</Button>
				</Link>
			</div>

			{/* Agents Grid */}
			<div className="grid gap-6 md:grid-cols-2">
				{mockAgents.map((agent) => (
					<Card
						key={agent.id}
						className="hover:-translate-y-1 transition-transform duration-300"
					>
						<div className="p-6 space-y-4">
							{/* Agent Header */}
							<div className="flex justify-between items-start">
								<div className="flex-1">
									<h3 className="text-lg font-semibold text-primary-dark">
										{agent.name}
									</h3>
									<p className="text-sm text-text mt-1">
										{agent.description}
									</p>
								</div>
								<div
									className={`px-3 py-1 rounded-full text-sm ${
										agent.status === 'active'
											? 'bg-green-100 text-green-700'
											: 'bg-gray-100 text-gray-700'
									}`}
								>
									{agent.status}
								</div>
							</div>

							{/* Agent Stats */}
							<div className="grid grid-cols-3 gap-4 py-4 border-y border-text-2/10">
								<div>
									<p className="text-sm text-text">Total Chats</p>
									<p className="text-lg font-semibold text-primary-dark">
										{agent.stats.chats}
									</p>
								</div>
								<div>
									<p className="text-sm text-text">Satisfaction</p>
									<p className="text-lg font-semibold text-primary-dark">
										{agent.stats.satisfaction}
									</p>
								</div>
								<div>
									<p className="text-sm text-text">Response Time</p>
									<p className="text-lg font-semibold text-primary-dark">
										{agent.stats.responseTime}
									</p>
								</div>
							</div>

							{/* Agent Footer */}
							<div className="flex items-center justify-between">
								<div className="flex items-center text-sm text-text">
									<svg
										className="w-4 h-4 mr-1"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									Last active: {agent.lastActive}
								</div>
								<div className="flex gap-3">
									<Link
										href={`/dashboard/agents/${agent.id}/chat`}
										className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
									>
										<svg
											className="w-4 h-4 mr-2"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
											/>
										</svg>
										Chat
									</Link>
									<button className="p-2 text-text hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
										<svg
											className="w-4 h-4"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</Card>
				))}

				{/* Add Agent Card */}
				<Link href="/dashboard/agents/create">
					<Card
						variant="glass"
						className="h-full flex items-center justify-center border-2 border-dashed border-text-2/20 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
					>
						<div className="text-center p-6">
							<div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
								<svg
									className="w-6 h-6 text-primary"
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
							</div>
							<h3 className="text-lg font-semibold text-primary-dark">
								Create New Agent
							</h3>
							<p className="text-sm text-text mt-1">
								Add a new AI assistant to your team
							</p>
						</div>
					</Card>
				</Link>
			</div>
		</div>
	);
}
