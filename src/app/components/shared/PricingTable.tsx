import React from 'react';
import clsx from 'clsx';
import Button from '../ui/Button';
import SectionHeading from '../ui/SectionHeading';

interface Plan {
  name: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

const PricingTable: React.FC<{ plans: Plan[] }> = ({ plans }) => {
  return (
    <section className="py-20 bg-gradient-light overflow-hidden">
      <div className="container px-4 mx-auto">
        <SectionHeading
          subtitle="Pricing Plans"
          title="Choose the Perfect Plan"
          description="Start with our free plan and upgrade as you grow. All plans come with a 14-day money-back guarantee."
          center
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 relative">
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-3xl opacity-50 -z-10" />

          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={clsx(
                'relative p-0.5 rounded-2xl transition-transform duration-300 hover:-translate-y-2 animate-fade-up',
                plan.popular ? 'bg-gradient-primary' : 'bg-white/50',
                `[animation-delay:${idx * 100}ms]`
              )}
            >
              <div className={clsx(
                'h-full p-8 rounded-2xl backdrop-blur-xl',
                plan.popular ? 'bg-primary-dark' : 'bg-white/80'
              )}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="inline-flex items-center px-4 py-1 text-sm font-semibold text-white bg-accent rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={clsx(
                    'text-2xl font-bold mb-2',
                    plan.popular ? 'text-white' : 'text-primary-dark'
                  )}>
                    {plan.name}
                  </h3>
                  <div className={clsx(
                    'flex items-baseline',
                    plan.popular ? 'text-white' : 'text-primary-dark'
                  )}>
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    {plan.period && (
                      <span className={clsx(
                        'ml-2 text-sm',
                        plan.popular ? 'text-text-3/80' : 'text-text'
                      )}>
                        /{plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className={clsx(
                        'flex items-start',
                        plan.popular ? 'text-text-3/90' : 'text-text'
                      )}
                    >
                      <svg
                        className={clsx(
                          'w-5 h-5 mr-3 flex-shrink-0',
                          plan.popular ? 'text-accent' : 'text-primary'
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? 'secondary' : 'primary'}
                  size="lg"
                  fullWidth
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-16">
          <div className="flex items-center text-text">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            14-Day Money Back
          </div>
          <div className="flex items-center text-text">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Secure Payment
          </div>
          <div className="flex items-center text-text">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            24/7 Support
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
