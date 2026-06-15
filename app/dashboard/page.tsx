'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface DashboardData {
  user: any;
  todaySales: number;
  weeklySales: number;
  monthlySales: number;
  inventoryCount: number;
  lowStockAlerts: number;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchDashboard = async () => {
      try {
        const response = await fetch('/api/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (response.ok) {
          setData(await response.json());
        } else if (response.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
        }
      } catch (error) {
        toast.error('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">🎙️ SautiLeja</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {data?.user?.fullName}</span>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                router.push('/');
              }}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sales Metrics */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Sales Metrics</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg card-shadow">
              <p className="text-gray-600">Today's Sales</p>
              <p className="text-3xl font-bold text-primary-600">KES {data?.todaySales?.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-lg card-shadow">
              <p className="text-gray-600">Weekly Sales</p>
              <p className="text-3xl font-bold text-primary-600">KES {data?.weeklySales?.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-lg card-shadow">
              <p className="text-gray-600">Monthly Sales</p>
              <p className="text-3xl font-bold text-primary-600">KES {data?.monthlySales?.toLocaleString()}</p>
            </div>
          </div>
        </section>

        {/* Inventory Metrics */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Inventory Status</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg card-shadow">
              <p className="text-gray-600">Current Stock Items</p>
              <p className="text-3xl font-bold text-success-500">{data?.inventoryCount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg card-shadow">
              <p className="text-gray-600">Low Stock Alerts</p>
              <p className="text-3xl font-bold text-warning-500">{data?.lowStockAlerts}</p>
            </div>
          </div>
        </section>

        {/* Navigation Cards */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/transactions/new" className="bg-white p-6 rounded-lg card-shadow hover:shadow-lg transition cursor-pointer">
              <div className="text-4xl mb-2">💬</div>
              <h3 className="font-bold">Record Transaction</h3>
              <p className="text-gray-600 text-sm">Voice or manual entry</p>
            </Link>
            <Link href="/inventory" className="bg-white p-6 rounded-lg card-shadow hover:shadow-lg transition cursor-pointer">
              <div className="text-4xl mb-2">📦</div>
              <h3 className="font-bold">Inventory</h3>
              <p className="text-gray-600 text-sm">Manage stock</p>
            </Link>
            <Link href="/reports" className="bg-white p-6 rounded-lg card-shadow hover:shadow-lg transition cursor-pointer">
              <div className="text-4xl mb-2">📊</div>
              <h3 className="font-bold">Reports</h3>
              <p className="text-gray-600 text-sm">Financial insights</p>
            </Link>
            <Link href="/insights" className="bg-white p-6 rounded-lg card-shadow hover:shadow-lg transition cursor-pointer">
              <div className="text-4xl mb-2">🤖</div>
              <h3 className="font-bold">AI Insights</h3>
              <p className="text-gray-600 text-sm">Business recommendations</p>
            </Link>
            <Link href="/financial-profile" className="bg-white p-6 rounded-lg card-shadow hover:shadow-lg transition cursor-pointer">
              <div className="text-4xl mb-2">💳</div>
              <h3 className="font-bold">Financial Profile</h3>
              <p className="text-gray-600 text-sm">Credit readiness</p>
            </Link>
            <Link href="/pricing" className="bg-white p-6 rounded-lg card-shadow hover:shadow-lg transition cursor-pointer">
              <div className="text-4xl mb-2">⭐</div>
              <h3 className="font-bold">Upgrade Plan</h3>
              <p className="text-gray-600 text-sm">Unlock features</p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
