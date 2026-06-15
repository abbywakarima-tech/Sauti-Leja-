'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CreditProfile {
  creditReadinessScore: number;
  businessGrowthScore: number;
  recordConsistencyScore: number;
  inventoryStabilityScore: number;
}

export default function FinancialProfile() {
  const [profile, setProfile] = useState<CreditProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Mock data
    setTimeout(() => {
      setProfile({
        creditReadinessScore: 78,
        businessGrowthScore: 65,
        recordConsistencyScore: 85,
        inventoryStabilityScore: 72,
      });
      setLoading(false);
    }, 500);
  }, [router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold">💳 Financial Profile & Credit Readiness</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Credit Score */}
        <div className="bg-gradient-primary rounded-lg p-8 text-white mb-8 card-shadow">
          <p className="text-white/80 mb-2">Your Overall Credit Readiness Score</p>
          <div className="flex items-center justify-between">
            <h2 className="text-5xl font-bold">{profile?.creditReadinessScore}%</h2>
            <div className="text-right">
              <p className="text-lg font-medium">Ready for Microfinance</p>
              <p className="text-sm text-white/80">Based on your transaction history</p>
            </div>
          </div>
        </div>

        {/* Credit Profile Message */}
        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded mb-8">
          <h3 className="font-bold text-green-900 mb-2">✓ Profile Assessment</h3>
          <p className="text-green-800">
            Based on your transaction history, your business demonstrates consistent financial activity. 
            Your record-keeping and inventory management show strong potential for business credit access. 
            You may be eligible for microfinance services and business loans.
          </p>
        </div>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg card-shadow">
            <h3 className="font-bold mb-4">Business Growth Score</h3>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{profile?.businessGrowthScore}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-primary-600 h-3 rounded-full transition-all"
                  style={{width: `${profile?.businessGrowthScore}%`}}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">Your business shows positive growth trends with increasing revenue month-over-month.</p>
          </div>

          <div className="bg-white p-6 rounded-lg card-shadow">
            <h3 className="font-bold mb-4">Record Consistency Score</h3>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{profile?.recordConsistencyScore}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-success-500 h-3 rounded-full transition-all"
                  style={{width: `${profile?.recordConsistencyScore}%`}}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">You maintain excellent record-keeping practices with regular transaction entries.</p>
          </div>

          <div className="bg-white p-6 rounded-lg card-shadow">
            <h3 className="font-bold mb-4">Inventory Stability Score</h3>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{profile?.inventoryStabilityScore}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all"
                  style={{width: `${profile?.inventoryStabilityScore}%`}}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">Your inventory management is well-organized with stable stock levels.</p>
          </div>

          <div className="bg-white p-6 rounded-lg card-shadow">
            <h3 className="font-bold mb-4">Financial Stability</h3>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">82%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-purple-500 h-3 rounded-full"
                  style={{width: '82%'}}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">Your cash flow demonstrates financial stability and predictability.</p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white p-6 rounded-lg card-shadow">
          <h3 className="font-bold text-lg mb-4">Next Steps to Improve Your Score</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>Maintain consistent daily transaction records</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>Increase transaction frequency to demonstrate business activity</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>Use digital payments for all transactions when possible</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>Generate monthly reports to track business performance</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>Maintain healthy profit margins and inventory levels</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
