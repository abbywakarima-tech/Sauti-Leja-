'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const PLANS = [
  {
    name: 'Free',
    price: '0',
    description: 'Get started with basic features',
    features: [
      'Manual transaction entry',
      'Basic dashboard',
      'Up to 100 transactions/month',
      'Basic inventory management',
      'Limited reports',
    ],
    restrictions: [
      'No voice recording',
      'No report downloads',
      'No SautiBot',
      'No advanced insights',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Starter',
    price: '299',
    description: 'Perfect for growing businesses',
    badge: 'MOST POPULAR',
    features: [
      'Unlimited transactions',
      'Voice transaction recording',
      'AI transaction extraction',
      'Inventory management',
      'Weekly and monthly reports',
      'Download reports (PDF, Excel, CSV)',
      'Basic AI insights',
      'Email support',
    ],
    restrictions: [],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Business',
    price: '699',
    description: 'For established businesses',
    features: [
      'Everything in Starter',
      'Advanced AI insights',
      'Revenue forecasting',
      'Credit readiness analysis',
      'Full SautiBot access',
      'Multilingual AI support',
      'Advanced analytics',
      'Unlimited report downloads',
      'Priority support',
    ],
    restrictions: [],
    cta: 'Start Free Trial',
  },
];

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold">💳 Subscription Plans</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-300">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 font-medium transition ${
                billingPeriod === 'monthly'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-4 py-2 font-medium transition ${
                billingPeriod === 'annual'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual (Save 15%)
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {PLANS.map((plan, idx) => {
            const annualPrice = Math.round(parseInt(plan.price) * 12 * 0.85);
            const displayPrice = billingPeriod === 'monthly' ? plan.price : String(Math.round(annualPrice / 12));

            return (
              <div
                key={idx}
                className={`rounded-lg card-shadow overflow-hidden transition transform hover:scale-105 ${
                  plan.popular ? 'border-2 border-primary-600 md:scale-105' : 'bg-white'
                }`}
              >
                <div className={`p-6 ${
                  plan.popular ? 'bg-gradient-primary text-white' : 'bg-white'
                }`}>
                  {plan.badge && (
                    <div className="text-xs font-bold mb-2 opacity-90">{plan.badge}</div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className={`text-sm mb-4 ${
                    plan.popular ? 'text-white/90' : 'text-gray-600'
                  }`}>
                    {plan.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">KES {displayPrice}</span>
                    <span className={`text-sm ${
                      plan.popular ? 'text-white/80' : 'text-gray-600'
                    }`}>/month</span>
                  </div>
                  <Link
                    href={plan.price === '0' ? '/signup' : '/checkout'}
                    className={`block w-full py-2 rounded font-medium text-center transition ${
                      plan.popular
                        ? 'bg-white text-primary-600 hover:bg-gray-50'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>

                <div className="p-6">
                  <h4 className="font-bold mb-4 text-sm text-gray-900">Included Features:</h4>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <span className="text-green-600 font-bold">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.restrictions.length > 0 && (
                    <>
                      <h4 className="font-bold mb-4 text-sm text-gray-900">Not Included:</h4>
                      <ul className="space-y-2">
                        {plan.restrictions.map((restriction, i) => (
                          <li key={i} className="flex gap-2 text-sm">
                            <span className="text-gray-400 font-bold">✗</span>
                            <span className="text-gray-500">{restriction}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison */}
        <div className="bg-white rounded-lg card-shadow p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-bold">Feature</th>
                  <th className="text-center py-3 font-bold">Free</th>
                  <th className="text-center py-3 font-bold">Starter</th>
                  <th className="text-center py-3 font-bold">Business</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Manual Transaction Entry', true, true, true],
                  ['Voice Recording', false, true, true],
                  ['Inventory Management', true, true, true],
                  ['Basic Reports', true, true, true],
                  ['Advanced Reports', false, true, true],
                  ['AI Insights', false, true, true],
                  ['SautiBot', false, false, true],
                  ['Credit Readiness', false, false, true],
                  ['Report Downloads', false, true, true],
                  ['Priority Support', false, false, true],
                ].map((row, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900">{row[0]}</td>
                    <td className="py-3 text-center">{row[1] ? '✓' : '✗'}</td>
                    <td className="py-3 text-center">{row[2] ? '✓' : '✗'}</td>
                    <td className="py-3 text-center">{row[3] ? '✓' : '✗'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-lg card-shadow p-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I change my plan anytime?', a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.' },
              { q: 'Do you offer refunds?', a: 'We offer a 30-day money-back guarantee for all plans. No questions asked.' },
              { q: 'Is there a free trial?', a: 'Yes! Starter and Business plans come with a 14-day free trial. No credit card required.' },
              { q: 'What support do you provide?', a: 'All plans include email support. Business plan includes priority support with faster response times.' },
            ].map((item, idx) => (
              <div key={idx} className="border-b pb-4">
                <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
