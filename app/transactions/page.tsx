'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Transaction {
  id: string;
  productName: string;
  category: string;
  quantity: number;
  revenue: number;
  date: string;
  recordType: string;
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (response.ok) {
          setTransactions(await response.json());
        }
      } catch (error) {
        toast.error('Failed to load transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [router]);

  const filteredTransactions = transactions
    .filter(t => t.productName.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(t => !filterCategory || t.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'revenue') return b.revenue - a.revenue;
      return 0;
    });

  const deleteTransaction = async (id: string) => {
    if (!confirm('Delete this transaction?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        setTransactions(transactions.filter(t => t.id !== id));
        toast.success('Transaction deleted');
      }
    } catch (error) {
      toast.error('Failed to delete transaction');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Transactions</h1>
          <Link href="/transactions/new" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            + Record Transaction
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg card-shadow mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-600"
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-600"
            >
              <option value="">All Categories</option>
              <option value="Food">Food & Vegetables</option>
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
              <option value="Other">Other</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-600"
            >
              <option value="date">Sort by Date</option>
              <option value="revenue">Sort by Revenue</option>
            </select>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-lg card-shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">Loading transactions...</div>
          ) : filteredTransactions.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 mb-4">No transactions yet</p>
              <Link href="/transactions/new" className="text-primary-600 font-medium">
                Record your first transaction
              </Link>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Product</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Quantity</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Revenue</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredTransactions.map(transaction => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{new Date(transaction.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-medium">{transaction.productName}</td>
                    <td className="px-6 py-4 text-sm">{transaction.category}</td>
                    <td className="px-6 py-4 text-sm">{transaction.quantity}</td>
                    <td className="px-6 py-4 font-bold text-primary-600">KES {transaction.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${transaction.recordType === 'voice' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {transaction.recordType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Link href={`/transactions/${transaction.id}/edit`} className="text-primary-600 hover:underline mr-3">
                        Edit
                      </Link>
                      <button onClick={() => deleteTransaction(transaction.id)} className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Export */}
        <div className="mt-6 flex gap-4">
          <button className="px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 font-medium">
            📥 Export CSV
          </button>
          <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 font-medium">
            📊 Export Excel
          </button>
        </div>
      </main>
    </div>
  );
}
