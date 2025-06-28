'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Button from '../components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (res?.error) setError('Invalid credentials');
    if (res?.ok) window.location.href = '/dashboard';
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark to-primary">
      <form onSubmit={handleLogin} className="bg-white rounded-xl shadow-nexux p-8 w-full max-w-md space-y-6">
        <h1 className="h2 text-center mb-2">Sign In</h1>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:outline-primary"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-lg px-4 py-3 border border-gray-300 focus:outline-primary"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="btn-primary w-full">Sign In</Button>
        <Button type="button" className="btn-secondary w-full" onClick={() => signIn('google')}>Sign in with Google</Button>
        <div className="text-center text-sm mt-2">
          Don&apos;t have an account? <a href="#" className="text-primary">Register</a>
        </div>
      </form>
    </div>
  );
}
