import React from 'react';
import Link from 'next/link';
import { siteConfig } from '../../../config/site';

const socialLinks = [
	{
		name: 'Twitter',
		href: '#',
		icon: (props: React.SVGProps<SVGSVGElement>) => (
			<svg fill="currentColor" viewBox="0 0 24 24" {...props}>
				<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
			</svg>
		),
	},
	{
		name: 'LinkedIn',
		href: '#',
		icon: (props: React.SVGProps<SVGSVGElement>) => (
			<svg fill="currentColor" viewBox="0 0 24 24" {...props}>
				<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
			</svg>
		),
	},
	{
		name: 'GitHub',
		href: '#',
		icon: (props: React.SVGProps<SVGSVGElement>) => (
			<svg fill="currentColor" viewBox="0 0 24 24" {...props}>
				<path
					fillRule="evenodd"
					d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
					clipRule="evenodd"
				/>
			</svg>
		),
	},
];

const Footer = () => (
	<footer className="relative mt-20 overflow-hidden">
		{/* Background Gradient */}
		<div className="absolute inset-0 bg-gradient-primary opacity-10" />

		{/* Top Wave */}
		<div className="absolute top-0 left-0 right-0">
			<svg
				className="w-full h-20 -mb-1 text-white fill-current"
				viewBox="0 0 1440 64"
				preserveAspectRatio="none"
			>
				<path d="M0,64L80,58.7C160,53,320,43,480,42.7C640,43,800,53,960,53.3C1120,53,1280,43,1360,37.3L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
			</svg>
		</div>

		<div className="container relative px-4 pt-20 pb-12 mx-auto">
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
				{/* Brand Section */}
				<div className="space-y-4">
					<div className="flex items-center">
						<div className="w-10 h-10 mr-2 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold">
							AI
						</div>
						<span className="text-xl font-bold text-primary-dark">
							{siteConfig.title}
						</span>
					</div>
					<p className="text-text">
						Empowering businesses with AI-driven solutions for enhanced
						productivity and innovation.
					</p>
					<div className="flex space-x-4">
						{socialLinks.map((item) => (
							<a
								key={item.name}
								href={item.href}
								className="text-text hover:text-primary transition-colors"
							>
								<span className="sr-only">{item.name}</span>
								<item.icon className="w-6 h-6" aria-hidden="true" />
							</a>
						))}
					</div>
				</div>

				{/* Quick Links */}
				<div>
					<h3 className="mb-4 text-lg font-semibold text-primary-dark">
						Quick Links
					</h3>
					<ul className="space-y-2">
						{siteConfig.nav.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									className="text-text hover:text-primary transition-colors"
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* Legal Links */}
				<div>
					<h3 className="mb-4 text-lg font-semibold text-primary-dark">
						Legal
					</h3>
					<ul className="space-y-2">
						<li>
							<Link
								href="/privacy"
								className="text-text hover:text-primary transition-colors"
							>
								Privacy Policy
							</Link>
						</li>
						<li>
							<Link
								href="/terms"
								className="text-text hover:text-primary transition-colors"
							>
								Terms of Service
							</Link>
						</li>
						<li>
							<Link
								href="/security"
								className="text-text hover:text-primary transition-colors"
							>
								Security
							</Link>
						</li>
					</ul>
				</div>

				{/* Contact Info */}
				<div>
					<h3 className="mb-4 text-lg font-semibold text-primary-dark">
						Contact
					</h3>
					<ul className="space-y-2">
						<li className="flex items-center text-text">
							<svg
								className="w-5 h-5 mr-2 text-primary"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
							support@yourdomain.com
						</li>
						<li className="flex items-center text-text">
							<svg
								className="w-5 h-5 mr-2 text-primary"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								/>
							</svg>
							+1 (234) 567-8900
						</li>
					</ul>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="pt-8 mt-12 border-t border-text-2/10">
				<div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
					<p className="text-sm text-text">
						© {new Date().getFullYear()} {siteConfig.title}. All rights
						reserved.
					</p>
					<div className="flex items-center space-x-4">
						<span className="text-sm text-text">
							Made with ❤️ in South Africa
						</span>
					</div>
				</div>
			</div>
		</div>
	</footer>
);

export default Footer;
