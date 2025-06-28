import React from 'react';
import Link from 'next/link';
import { User } from 'next-auth';

interface TopBarProps {
  user: User;
}

const TopBar: React.FC<TopBarProps> = ({ user }) => {
  return (
    <div className="h-20 bg-white/80 backdrop-blur-xl border-b border-text-2/10 sticky top-0 z-10">
      <div className="h-full px-8 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search agents, chats, or settings..."
              className="w-full pl-10 pr-4 py-2 bg-white/50 border border-text-2/20 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-text"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-6">
          {/* Notifications */}
          <button className="relative p-2 text-text hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
          </button>

          {/* Help */}
          <button className="p-2 text-text hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
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
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-medium text-primary-dark">
                {user.name}
              </div>
              <div className="text-xs text-text truncate max-w-[150px]">
                {user.email}
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-gradient-primary text-white font-semibold flex items-center justify-center">
              {user.name?.[0]?.toUpperCase() || 'U'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
