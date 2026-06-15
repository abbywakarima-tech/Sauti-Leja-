'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Insight {
  id: string;
  title: string;
  description: string;
  icon: string;
  priority: 'high' | 'medium' | 'low';
}

export default function Insights() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Mock insights data
    setTimeout(() => {
      setInsights([
        {
          id: '1',
          title: 'Top Selling Product',
          description: 'Tomatoes are your best-selling product with 100 units sold this month. Consider increasing stock levels.',
          icon: '📈',
          priority: 'high',
        },
        {
          id: '2',
          title: 'Restock Alert',
          description: 'Bananas are selling faster than average. Restock within 3 days to avoid running out.',
          icon: '⚠️',
          priority: 'high',
        },
        {
          id: '3',
          title: 'Slow Inventory Movement',
          description: 'Electronics inventory has slow movement. Consider a promotion or sale.',
          icon: '🐢',
          priority: 'medium',
        },
        {
          id: '4',
          title: 'Peak Sales Period',
          description: 'Your peak sales occur between 2-5 PM. Ensure adequate stock during these hours.',
          icon: '🕒',
          priority: 'medium',
        },
        {
          id: '5',
          title: 'Profit Margin Opportunity',
          description: 'You could increase margins on vegetables by 5% without losing customers.',
          icon: '💰',
          priority: 'low',
        },
      ]);
      setLoading(false);
    }, 500);
  }, [router]);

  const priorityColors = {
    high: 'bg-red-50 border-red-200 text-red-800',
    medium: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    low: 'bg-green-50 border-green-200 text-green-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold">🤖 AI Business Insights</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg card-shadow">
            <p className="text-gray-600 mb-2">Total Insights</p>
            <p className="text-3xl font-bold">{insights.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg card-shadow">
            <p className="text-gray-600 mb-2">High Priority</p>
            <p className="text-3xl font-bold text-red-600">{insights.filter(i => i.priority === 'high').length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg card-shadow">
            <p className="text-gray-600 mb-2">Revenue Trend</p>
            <p className="text-3xl font-bold text-success-500">↑ +12.5%</p>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white p-8 text-center rounded-lg">Loading insights...</div>
          ) : (
            insights.map(insight => (
              <div
                key={insight.id}
                className={`p-6 rounded-lg border-l-4 ${priorityColors[insight.priority]}`}
              >
                <div className="flex gap-4">
                  <div className="text-3xl">{insight.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{insight.title}</h3>
                    <p className="text-sm">{insight.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap self-start ${
                    insight.priority === 'high' ? 'bg-red-200 text-red-800' :
                    insight.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-green-200 text-green-800'
                  }`}>
                    {insight.priority.toUpperCase()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Analytics Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg card-shadow">
            <h3 className="font-bold text-lg mb-4">Revenue Trends</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Week 1</span>
                <div className="w-32 bg-gray-200 rounded h-2">
                  <div className="bg-primary-600 h-2 rounded" style={{width: '60%'}}></div>
                </div>
                <span>KES 95K</span>
              </div>
              <div className="flex justify-between">
                <span>Week 2</span>
                <div className="w-32 bg-gray-200 rounded h-2">
                  <div className="bg-primary-600 h-2 rounded" style={{width: '75%'}}></div>
                </div>
                <span>KES 112K</span>
              </div>
              <div className="flex justify-between">
                <span>Week 3</span>
                <div className="w-32 bg-gray-200 rounded h-2">
                  <div className="bg-primary-600 h-2 rounded" style={{width: '85%'}}></div>
                </div>
                <span>KES 128K</span>
              </div>
              <div className="flex justify-between">
                <span>Week 4</span>
                <div className="w-32 bg-gray-200 rounded h-2">
                  <div className="bg-success-500 h-2 rounded" style={{width: '100%'}}></div>
                </div>
                <span>KES 152K</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg card-shadow">
            <h3 className="font-bold text-lg mb-4">Product Performance</h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Tomatoes</span>
                  <span className="font-bold">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded h-2">
                  <div className="bg-red-500 h-2 rounded" style={{width: '45%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Onions</span>
                  <span className="font-bold">30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded h-2">
                  <div className="bg-yellow-500 h-2 rounded" style={{width: '30%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Bananas</span>
                  <span className="font-bold">20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded h-2">
                  <div className="bg-yellow-600 h-2 rounded" style={{width: '20%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Others</span>
                  <span className="font-bold">5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded h-2">
                  <div className="bg-gray-500 h-2 rounded" style={{width: '5%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
