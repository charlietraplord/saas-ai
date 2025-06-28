'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Button from '../ui/Button';

const nav = [
	{
		label: 'Dashboard',
		href: '/dashboard',
		icon: (
			<svg
				className="w-5 h-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
				/>
			</svg>
		),
	},
	{
		label: 'My Agents',
		href: '/dashboard/agents',
		icon: (
			<svg
				className="w-5 h-5"
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
		label: 'Usage',
		href: '/dashboard/usage',
		icon: (
			<svg
				className="w-5 h-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
				/>
			</svg>
		),
	},
	{
		label: 'Settings',
		href: '/dashboard/settings',
		icon: (
			<svg
				className="w-5 h-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
				/>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
				/>
			</svg>
		),
	},
	{
		label: 'Billing',
		href: '/dashboard/billing',
		icon: (
			<svg
				className="w-5 h-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
				/>
			</svg>
		),
	},
];

export default function Sidebar({ user }: { user: any }) {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const pathname = usePathname();

	return (
		<aside
			className={clsx(
				'bg-white border-r border-text-2/10 transition-all duration-300',
				'flex flex-col h-screen sticky top-0',
				isCollapsed ? 'w-20' : 'w-64'
			)}
		>
			{/* Header */}
			<div
				className={clsx(
					'flex items-center p-4 border-b border-text-2/10',
					isCollapsed ? 'justify-center' : 'justify-between'
				)}
			>
				{/* {!isCollapsed && (
          <div>
            <div className="font-bold text-primary-dark">{user?.name || 'User'}</div>
            <div className="text-xs text-text truncate">{user?.email}</div>
          </div>
        )} */}
				<button
					onClick={() => setIsCollapsed(!isCollapsed)}
					className="p-2 rounded-lg hover:bg-primary/5 transition-colors"
					aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
				>
					<svg
						className={clsx(
							'w-5 h-5 text-primary transform transition-transform',
							isCollapsed ? 'rotate-180' : ''
						)}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
						/>
					</svg>
				</button>
			</div>

			{/* Navigation */}
			<nav className="flex-1 overflow-y-auto py-4">
				<ul className="space-y-1 px-3">
					{nav.map((item) => {
						const isActive = pathname === item.href;
						return (
							<li key={item.href}>
								<Link
									href={item.href}
									className={clsx(
										'flex items-center px-3 py-2 rounded-xl transition-all duration-200',
										isActive
											? 'bg-primary text-white shadow-lg shadow-primary/25'
											: 'text-text hover:bg-primary/5 hover:text-primary',
										isCollapsed && 'justify-center'
									)}
								>
									{item.icon}
									{/* {!isCollapsed && (
                    <span className="ml-3">{item.label}</span>
                  )} */}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>

			{/* Footer */}
			<div
				className={clsx(
					'p-4 border-t border-text-2/10',
					isCollapsed ? 'items-center' : ''
				)}
			>
				<form action="/api/auth/signout" method="post">
					<Button
						variant="ghost"
						type="submit"
						fullWidth
						className={clsx(
							'text-text hover:text-primary justify-center',
							isCollapsed && 'w-12 h-12 p-0'
						)}
					>
						<svg
							className="w-5 h-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							/>
						</svg>
						{/* {!isCollapsed && <span className="ml-2">Logout</span>} */}
					</Button>
				</form>
			</div>
		</aside>
	);
}
