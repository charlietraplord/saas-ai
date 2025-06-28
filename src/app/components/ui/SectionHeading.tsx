import React from 'react';
import clsx from 'clsx';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  description?: string;
  center?: boolean;
  light?: boolean;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  description,
  center = false,
  light = false,
  className = '',
}) => {
  return (
    <div className={clsx(
      'max-w-3xl',
      center && 'mx-auto text-center',
      'animate-fade-up',
      className
    )}>
      {subtitle && (
        <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full animate-fade-up [animation-delay:100ms]"
          style={{
            background: light ? 'rgba(255,255,255,0.1)' : 'rgba(79,96,250,0.1)',
            color: light ? 'white' : 'var(--primary)',
          }}
        >
          <span className="w-2 h-2 mr-2 rounded-full animate-pulse"
            style={{
              background: light ? 'var(--accent)' : 'var(--primary)',
            }}
          ></span>
          {subtitle}
        </div>
      )}
      
      <h2 className={clsx(
        'text-3xl font-bold leading-tight md:text-4xl lg:text-5xl mb-6',
        light ? 'text-white' : 'text-primary-dark',
        'animate-fade-up [animation-delay:200ms]'
      )}>
        {title}
      </h2>

      {description && (
        <p className={clsx(
          'text-lg',
          light ? 'text-text-3/80' : 'text-text',
          'animate-fade-up [animation-delay:300ms]'
        )}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
