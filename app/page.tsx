'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            🎙️ SautiLeja
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 text-primary-600 hover:text-primary-700">
              Login
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Empower Your Business with Voice
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              SautiLeja helps women entrepreneurs manage finances, inventory, and grow their business with AI-powered insights. Record transactions with voice in Swahili, Sheng, or English.
            </p>
            <div className="flex gap-4">
              <Link href="/signup" className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium">
                Get Started Free
              </Link>
              <button className="px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 font-medium">
                Learn More
              </button>
            </div>
          </div>
          <div className="bg-primary-100 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-gray-600">Financial Dashboard Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why SautiLeja?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🎙️', title: 'Voice Recording', desc: 'Record transactions in your preferred language' },
              { icon: '📈', title: 'AI Insights', desc: 'Get smart recommendations to grow your business' },
              { icon: '💳', title: 'Reports & Analytics', desc: 'Download professional financial reports' },
              { icon: '🤖', title: 'AI Assistant', desc: 'Chat with SautiBot for business advice' },
              { icon: '📊', title: 'Inventory Tracking', desc: 'Manage stock and get restock alerts' },
              { icon: '💰', title: 'Build Credit', desc: 'Create financial records for loans' },
            ].map((item, idx) => (
              <div key={idx} className="p-6 border rounded-lg hover:shadow-lg transition">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Free', price: '0', features: ['Manual entry', 'Basic dashboard', '100 transactions/month'] },
              { name: 'Starter', price: '299', features: ['Unlimited transactions', 'Voice recording', 'Weekly reports', 'Basic insights'], popular: true },
              { name: 'Business', price: '699', features: ['Everything in Starter', 'Advanced insights', 'Credit readiness', 'SautiBot access'] },
            ].map((plan, idx) => (
              <div key={idx} className={`p-8 rounded-lg ${plan.popular ? 'border-2 border-primary-600 shadow-xl' : 'border'}`}>
                {plan.popular && <div className="text-primary-600 font-bold mb-2">MOST POPULAR</div>}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-4">KES {plan.price}<span className="text-lg text-gray-600">/mo</span></div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2 rounded-lg font-medium transition ${plan.popular ? 'bg-primary-600 text-white hover:bg-primary-700' : 'border border-primary-600 text-primary-600 hover:bg-primary-50'}`}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 SautiLeja. Empowering women entrepreneurs in Kenya.</p>
        </div>
      </footer>
    </div>
  );
}
