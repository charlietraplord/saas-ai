import React from 'react';
import clsx from 'clsx';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'glass';
  hover?: boolean;
  animate?: boolean;
}

const Card: React.FC<CardProps> = ({
  className = '',
  children,
  variant = 'default',
  hover = true,
  animate = false,
}) => {
  const baseStyles = 'rounded-2xl p-6 transition-all duration-300';

  const variants = {
    default: 'bg-white shadow-nexux',
    gradient: 'bg-gradient-primary text-white',
    glass: 'bg-white/80 backdrop-blur-xl',
  };

  return (
    <div
      className={clsx(
        baseStyles,
        variants[variant],
        hover && 'hover:-translate-y-1 hover:shadow-nexux-2',
        animate && 'animate-fade-up',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
