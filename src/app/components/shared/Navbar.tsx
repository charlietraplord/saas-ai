'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '../../../config/site';
import Button from '../ui/Button';
import clsx from 'clsx';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/"
            className="relative flex items-center gap-2 text-2xl font-extrabold tracking-tight group"
          >
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-primary rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-white rounded-xl flex items-center justify-center">
                <span className="bg-gradient-primary bg-clip-text text-transparent">AI</span>
              </div>
            </div>
            <span className="relative">
              <span className="text-primary-dark">{siteConfig.title}</span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-primary rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-text hover:text-primary relative group py-2"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" size="sm" className="min-w-[100px]">
              Login
            </Button>
            <Button variant="primary" size="sm" className="min-w-[100px]">
              {siteConfig.cta.label}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary/5 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 relative">
              <span className={clsx(
                'absolute left-0 block h-0.5 w-6 bg-primary-dark transform transition duration-500 ease-in-out',
                isMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-2'
              )} />
              <span className={clsx(
                'absolute left-0 block h-0.5 w-6 bg-primary-dark transform transition duration-500 ease-in-out',
                isMenuOpen && 'opacity-0'
              )} />
              <span className={clsx(
                'absolute left-0 block h-0.5 w-6 bg-primary-dark transform transition duration-500 ease-in-out',
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-2'
              )} />
            </div>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={clsx(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}>
          <nav className="py-4 px-4 bg-white/50 backdrop-blur-xl rounded-2xl mb-4">
            <ul className="flex flex-col gap-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-2 px-4 text-text hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 mt-4 p-4 border-t border-text-2/10">
              <Button variant="outline" fullWidth>
                Login
              </Button>
              <Button variant="primary" fullWidth>
                {siteConfig.cta.label}
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
