import React from 'react';
import clsx from 'clsx';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

const stats = [
  { value: '10k+', label: 'Active Users' },
  { value: '95%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'Support Available' },
  { value: '40+', label: 'AI Models' },
];

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Lightning Fast',
    description: 'Get instant responses and process content in real-time',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Enterprise Ready',
    description: 'Built for scale with enterprise-grade security',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    title: 'Multi-Language',
    description: 'Support for 50+ languages and regional contexts',
  }
];

const AboutSection = () => {
  return (
    <section className="py-20 bg-gradient-light overflow-hidden">
      <div className="container px-4 mx-auto">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={clsx(
                'text-center p-6 rounded-2xl bg-white/80 backdrop-blur-xl',
                'animate-fade-up hover:shadow-nexux transition-all duration-300',
                `[animation-delay:${idx * 100}ms]`
              )}
            >
              <div className="text-3xl font-bold text-primary-dark mb-2">{stat.value}</div>
              <div className="text-text">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="max-w-xl">
            <SectionHeading
              subtitle="About Our Platform"
              title="Revolutionizing Business with AI"
              description="We're building the future of AI-powered automation, helping businesses scale their operations with intelligent solutions."
            />

            <div className="space-y-6 mt-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    'flex items-start animate-fade-up',
                    `[animation-delay:${(idx + 4) * 100}ms]`
                  )}
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-primary-dark mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-text">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 animate-fade-up [animation-delay:800ms]">
              <Button size="lg">
                Learn More
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="relative lg:h-[600px] animate-fade-up [animation-delay:600ms]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 blur-3xl" />
            <div className="relative h-full rounded-2xl overflow-hidden bg-white/80 backdrop-blur-xl p-8">
              {/* Add your illustration or image here */}
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="space-y-4">
                  <div className="h-1/2 rounded-xl bg-gradient-primary animate-pulse" />
                  <div className="h-1/2 rounded-xl bg-gradient-accent" />
                </div>
                <div className="space-y-4">
                  <div className="h-2/3 rounded-xl bg-primary/10" />
                  <div className="h-1/3 rounded-xl bg-accent/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
