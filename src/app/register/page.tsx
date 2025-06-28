'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '../components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    tenantName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          tenantName: formData.tenantName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Redirect to login page after successful registration
      router.push('/login?registered=true');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark to-primary">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-nexux p-8 w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="h2 text-center mb-2">Create Account</h1>
          <p className="text-text-2">Get started with your AI assistant journey</p>
        </div>

        {error && (
          <div className="text-red-500 text-center">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:outline-primary focus:ring-2 focus:ring-primary/20"
          required
        />

        <input
          type="text"
          placeholder="Company/Organization Name"
          value={formData.tenantName}
          onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
          className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:outline-primary focus:ring-2 focus:ring-primary/20"
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:outline-primary focus:ring-2 focus:ring-primary/20"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:outline-primary focus:ring-2 focus:ring-primary/20"
          required
          minLength={8}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:outline-primary focus:ring-2 focus:ring-primary/20"
          required
          minLength={8}
        />

        <Button
          type="submit"
          variant="secondary"
          fullWidth
          loading={loading}
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </Button>

        <div className="text-center text-sm text-text-2">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:text-primary-dark">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
