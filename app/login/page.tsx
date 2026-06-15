'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          [loginMethod === 'email' ? 'email' : 'phoneNumber']: email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        toast.success('Login successful!');
        router.push('/dashboard');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2 text-center">🎙️ SautiLeja</h1>
        <p className="text-center text-gray-600 mb-8">Welcome back</p>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setLoginMethod('email')}
            className={`flex-1 py-2 rounded-lg font-medium transition ${loginMethod === 'email' ? 'bg-primary-600 text-white' : 'border border-gray-300'}`}
          >
            Email
          </button>
          <button
            onClick={() => setLoginMethod('phone')}
            className={`flex-1 py-2 rounded-lg font-medium transition ${loginMethod === 'phone' ? 'bg-primary-600 text-white' : 'border border-gray-300'}`}
          >
            Phone
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type={loginMethod === 'email' ? 'email' : 'tel'}
            placeholder={loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-600"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-600"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 font-medium disabled:bg-gray-400"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="my-6 text-center">
          <Link href="/forgot-password" className="text-primary-600 text-sm font-medium hover:underline">
            Forgot Password?
          </Link>
        </div>

        <p className="text-center text-gray-600">
          Don't have an account? <Link href="/signup" className="text-primary-600 font-medium">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
