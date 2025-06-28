'use client';

import React from 'react';
import HeroSection from './components/shared/HeroSection';
import AboutSection from './components/shared/AboutSection';
import FeatureList from './components/shared/FeatureList';
import PricingTable from './components/shared/PricingTable';
import TestimonialList from './components/shared/TestimonialList';
import ContactSection from './components/shared/ContactSection';
import { siteConfig } from '../config/site';

const features = [
  {
    icon: <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/></svg>,
    title: 'AI-Powered Automation',
    description: 'Automate workflows and tasks with advanced AI agents tailored for your business.'
  },
  {
    icon: <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 21v-2a4 4 0 00-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: 'Multi-Tenant Ready',
    description: 'Serve multiple clients securely with robust tenant isolation and management.'
  },
  {
    icon: <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: 'Easy Integration',
    description: 'Connect with your favorite tools and platforms using our flexible API.'
  }
];

const plans = [
  {
    name: 'Starter',
    price: 'R299/mo',
    features: [
      '1 AI Agent',
      'Up to 3 tenants',
      'Basic support',
    ],
    cta: 'Start Free',
  },
  {
    name: 'Pro',
    price: 'R499/mo',
    features: [
      'Up to 5 AI Agents',
      'Unlimited tenants',
      'Priority support',
    ],
    cta: 'Upgrade Now',
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    features: [
      'Custom AI Agents',
      'Unlimited tenants',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
  },
];

const testimonials = [
  { name: 'Alice', role: 'CTO @ Acme', quote: 'This AI platform blew our minds.' },
  { name: 'Bob', role: 'CEO @ BetaCorp', quote: 'Our productivity soared 5x.' },
];

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <section id="features" className="section container">
        <FeatureList features={features} />
      </section>
      <section id="pricing" className="section section-bg">
        <PricingTable plans={plans} />
      </section>
      <section className="section container">
        <TestimonialList testimonials={testimonials} />
      </section>
      <ContactSection />
    </>
  );
};

export default HomePage;
