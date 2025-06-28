import React from 'react';
import Button from '../ui/Button';
import { siteConfig } from '../../../config/site';

const HeroSection = () => (
  <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-primary">
    {/* Background Animation */}
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#4f60fa,#232b6b)]" />
      <div className="absolute inset-0 backdrop-blur-[118px] bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.4)]" />
    </div>
    
    {/* Content */}
    <div className="container relative z-10 px-4 mx-auto text-center">
      <div className="max-w-5xl mx-auto">
        {/* Animated Badge */}
        <div className="inline-flex items-center px-4 py-2 mb-8 text-sm font-medium bg-white/10 backdrop-blur-xl rounded-full text-white animate-fade-up">
          <span className="w-2 h-2 mr-2 bg-accent rounded-full animate-pulse"></span>
          Powering Next-Gen AI Solutions
        </div>
        
        {/* Main Heading */}
        <h1 className="mb-8 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl animate-fade-up [animation-delay:200ms]">
          Transform Your Business with 
          <span className="relative inline-block px-2 ml-2 before:absolute before:inset-0 before:bg-accent/30 before:skew-x-12">
            AI-Powered
          </span> Solutions
        </h1>
        
        {/* Subheading */}
        <p className="max-w-2xl mx-auto mb-10 text-xl text-text-3/80 animate-fade-up [animation-delay:400ms]">
          Automate workflows, enhance productivity, and unlock new possibilities with our cutting-edge AI platform
        </p>
        
        {/* CTA Form */}
        <div className="max-w-md mx-auto animate-fade-up [animation-delay:600ms]">
          <form className="flex flex-col gap-4 p-2 sm:flex-row sm:p-1 bg-white/10 backdrop-blur-xl rounded-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 px-6 text-white bg-transparent border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-white/20 placeholder:text-white/60"
            />
            <Button type="submit" className="h-12 px-8 text-primary-dark bg-white rounded-full hover:bg-text-3 transition-colors duration-300">
              Get Started
            </Button>
          </form>
        </div>
        
        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-white/60 animate-fade-up [animation-delay:800ms]">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Enterprise Ready</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>ISO 27001 Certified</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span>10k+ Users</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
