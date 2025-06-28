import React from 'react';
import clsx from 'clsx';
import SectionHeading from '../ui/SectionHeading';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureListProps {
  features: Feature[];
  className?: string;
  dark?: boolean;
}

const FeatureList: React.FC<FeatureListProps> = ({ features, className, dark = false }) => (
  <section className={clsx(
    'py-20',
    dark ? 'bg-gradient-primary text-white' : 'bg-gradient-light',
    className
  )}>
    <div className="container px-4 mx-auto">
      <SectionHeading
        subtitle="Key Features"
        title="Transform Your Workflow"
        description="Discover how our AI-powered platform can revolutionize your business operations"
        center
        light={dark}
        className="mb-16"
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={clsx(
              'p-6 transition-all duration-300 rounded-2xl backdrop-blur-xl animate-fade-up hover:-translate-y-1',
              dark ? 'bg-white/10 hover:bg-white/[0.15]' : 'bg-white hover:shadow-nexux',
              `[animation-delay:${idx * 100}ms]`
            )}
          >
            <div className={clsx(
              'flex items-center justify-center w-12 h-12 mb-6 rounded-xl',
              dark ? 'bg-accent text-white' : 'bg-primary/10 text-primary'
            )}>
              {feature.icon}
            </div>
            
            <h3 className={clsx(
              'mb-4 text-xl font-bold',
              dark ? 'text-white' : 'text-primary-dark'
            )}>
              {feature.title}
            </h3>
            
            <p className={clsx(
              'text-base leading-relaxed',
              dark ? 'text-text-3/80' : 'text-text'
            )}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureList;
