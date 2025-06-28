import React from 'react';
import clsx from 'clsx';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const contactInfo = [
	{
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
					d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
				/>
			</svg>
		),
		title: 'Email Us',
		content: 'support@yourcompany.com',
		link: 'mailto:support@yourcompany.com',
	},
	{
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
					d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
				/>
			</svg>
		),
		title: 'Call Us',
		content: '+1 (234) 567-8900',
		link: 'tel:+12345678900',
	},
	{
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
					d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
				/>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
				/>
			</svg>
		),
		title: 'Visit Us',
		content: 'Cape Town, South Africa',
		link: 'https://maps.google.com',
	},
];

const ContactSection = () => {
	return (
		<section className="py-20 bg-gradient-light overflow-hidden">
			<div className="container px-4 mx-auto">
				<SectionHeading
					subtitle="Contact Us"
					title="Get in Touch"
					description="Have questions? We're here to help you. Let us know how we can assist you."
					center
					className="mb-16"
				/>

				<div className="grid lg:grid-cols-2 gap-16 items-start">
					{/* Contact Form */}
					<div className="relative">
						<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 blur-3xl -z-10" />
						<div className="relative p-8 bg-white/80 backdrop-blur-xl rounded-2xl animate-fade-up">
							<form className="space-y-6">
								<div className="grid sm:grid-cols-2 gap-6">
									<div className="animate-fade-up [animation-delay:100ms]">
										<label className="block text-sm font-medium text-primary-dark mb-2">
											First Name
										</label>
										<input
											type="text"
											className="w-full px-4 py-3 rounded-xl bg-white/50 border border-text-2/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
											placeholder="John"
										/>
									</div>
									<div className="animate-fade-up [animation-delay:200ms]">
										<label className="block text-sm font-medium text-primary-dark mb-2">
											Last Name
										</label>
										<input
											type="text"
											className="w-full px-4 py-3 rounded-xl bg-white/50 border border-text-2/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
											placeholder="Doe"
										/>
									</div>
								</div>

								<div className="animate-fade-up [animation-delay:300ms]">
									<label className="block text-sm font-medium text-primary-dark mb-2">
										Email Address
									</label>
									<input
										type="email"
										className="w-full px-4 py-3 rounded-xl bg-white/50 border border-text-2/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
										placeholder="john@example.com"
									/>
								</div>

								<div className="animate-fade-up [animation-delay:400ms]">
									<label className="block text-sm font-medium text-primary-dark mb-2">
										Message
									</label>
									<textarea
										rows={4}
										className="w-full px-4 py-3 rounded-xl bg-white/50 border border-text-2/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
										placeholder="How can we help you?"
									/>
								</div>

								<div className="animate-fade-up [animation-delay:500ms]">
									<Button type="submit" size="lg" fullWidth>
										Send Message
									</Button>
								</div>
							</form>
						</div>
					</div>

					{/* Contact Information */}
					<div className="lg:pl-8">
						{/* Contact Cards */}
						<div className="grid gap-8">
							{contactInfo.map((info, idx) => (
								<a
									key={idx}
									href={info.link}
									className={clsx(
										'flex items-center p-6 rounded-2xl bg-white/80 backdrop-blur-xl',
										'transition-all duration-300 hover:-translate-y-1 hover:shadow-nexux',
										'animate-fade-up',
										`[animation-delay:${(idx + 6) * 100}ms]`
									)}
								>
									<div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
										{info.icon}
									</div>
									<div className="ml-4">
										<h3 className="text-lg font-semibold text-primary-dark">
											{info.title}
										</h3>
										<p className="text-text mt-1">
											{info.content}
										</p>
									</div>
									<div className="ml-auto text-primary">
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
												d="M14 5l7 7m0 0l-7 7m7-7H3"
											/>
										</svg>
									</div>
								</a>
							))}
						</div>

						{/* Social Links */}
						<div className="mt-8 p-6 rounded-2xl bg-primary-dark text-white animate-fade-up [animation-delay:900ms]">
							<h3 className="text-xl font-semibold mb-4">Follow Us</h3>
							<div className="flex space-x-4">
								{['Twitter', 'LinkedIn', 'GitHub'].map((platform, idx) => (
									<a
										key={platform}
										href="#"
										className={clsx(
											'p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors duration-200',
											'animate-fade-up',
											`[animation-delay:${(idx + 10) * 100}ms]`
										)}
									>
										<span className="sr-only">{platform}</span>
										{platform === 'Twitter' && (
											<svg
												className="w-5 h-5"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
											</svg>
										)}
										{platform === 'LinkedIn' && (
											<svg
												className="w-5 h-5"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
											</svg>
										)}
										{platform === 'GitHub' && (
											<svg
												className="w-5 h-5"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"
												/>
											</svg>
										)}
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
