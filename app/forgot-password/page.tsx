'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
        toast.success('Check your email for password reset instructions');
      } else {
        toast.error('Email not found');
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
        <h1 className="text-3xl font-bold mb-2 text-center">🔐 Reset Password</h1>
        <p className="text-center text-gray-600 mb-8">Enter your email to receive reset instructions</p>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-green-800 font-medium mb-4">✓ Email sent successfully!</p>
            <p className="text-green-700 text-sm mb-6">Check your email for instructions to reset your password.</p>
            <Link href="/login" className="text-primary-600 font-medium hover:underline">
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-600"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 font-medium disabled:bg-gray-400"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <p className="text-center mt-6 text-gray-600">
          Remember your password? <Link href="/login" className="text-primary-600 font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
}
