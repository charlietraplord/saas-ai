import React from 'react';
import clsx from 'clsx';
import SectionHeading from '../ui/SectionHeading';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
  rating?: number;
}

const TestimonialList: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => {
  return (
    <section className="py-20 bg-gradient-primary text-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <SectionHeading
          subtitle="Testimonials"
          title="What Our Clients Say"
          description="Don't just take our word for it. Hear from some of our amazing customers who are using our platform to transform their businesses."
          center
          light
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className={clsx(
                'relative p-8 rounded-2xl bg-white/10 backdrop-blur-xl',
                'transition-all duration-300 hover:-translate-y-1',
                'animate-fade-up',
                `[animation-delay:${idx * 100}ms]`
              )}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-2 text-accent/20">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10.4 16.2c-.8-1.5-2.4-2.4-4.1-2.4-2.6 0-4.7 2.1-4.7 4.7 0 2.6 2.1 4.7 4.7 4.7 2.4 0 4.3-1.7 4.7-4h.2c0-5.4-1.9-10.2-4.7-13.6l2.4-1.4c3.4 4 5.6 9.5 5.6 15.5 0 4.4-3.6 8-8 8-4.4 0-8-3.6-8-8s3.6-8 8-8c1.5 0 3 .4 4.2 1.2l-.3.3zM29.4 16.2c-.8-1.5-2.4-2.4-4.1-2.4-2.6 0-4.7 2.1-4.7 4.7 0 2.6 2.1 4.7 4.7 4.7 2.4 0 4.3-1.7 4.7-4h.2c0-5.4-1.9-10.2-4.7-13.6l2.4-1.4c3.4 4 5.6 9.5 5.6 15.5 0 4.4-3.6 8-8 8-4.4 0-8-3.6-8-8s3.6-8 8-8c1.5 0 3 .4 4.2 1.2l-.3.3z" />
                </svg>
              </div>

              {/* Rating Stars */}
              {testimonial.rating && (
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={clsx(
                        'w-5 h-5',
                        i < (testimonial.rating || 5) ? 'text-accent' : 'text-white/20'
                      )}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}

              {/* Quote */}
              <blockquote className="mb-6 text-lg leading-relaxed text-text-3">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mr-4">
                    <span className="text-xl font-semibold text-accent">
                      {testimonial.name[0]}
                    </span>
                  </div>
                )}
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-text-3/80">
                    {testimonial.role} · {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-16 border-t border-white/10">
          <div className="text-center mb-8 animate-fade-up">
            <div className="text-sm font-medium text-text-3/60 uppercase tracking-wider">
              Trusted by Leading Companies
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
            {['Company 1', 'Company 2', 'Company 3', 'Company 4', 'Company 5'].map((company, idx) => (
              <div
                key={company}
                className={clsx(
                  'text-white/40 hover:text-white/60 transition-colors duration-200',
                  'animate-fade-up',
                  `[animation-delay:${(idx + 8) * 100}ms]`
                )}
              >
                {/* Replace with actual company logos */}
                <div className="h-8 flex items-center">
                  {company}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialList;
