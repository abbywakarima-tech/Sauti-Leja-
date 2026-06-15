'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function NewTransaction() {
  const [recordType, setRecordType] = useState<'manual' | 'voice'>('manual');
  const [isRecording, setIsRecording] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    quantity: 1,
    sellingPrice: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: isNaN(value) ? value : parseInt(value) || parseFloat(value) };
      if (name === 'quantity' || name === 'sellingPrice') {
        updated.revenue = updated.quantity * updated.sellingPrice;
      }
      return updated;
    });
  };

  const handleStartRecording = async () => {
    setIsRecording(true);
    toast.success('Recording started... Speak in your preferred language');
    
    // Simulate recording for demo
    setTimeout(() => {
      setIsRecording(false);
      toast.success('Recording completed. Processing with AI...');
      
      // Simulate AI extraction
      setFormData(prev => ({
        ...prev,
        productName: 'Tomatoes',
        category: 'Food',
        quantity: 10,
        sellingPrice: 50,
        revenue: 500,
      }));
      toast.success('Transaction extracted from voice!');
    }, 3000);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, recordType }),
      });

      if (response.ok) {
        toast.success('Transaction saved successfully!');
        router.push('/transactions');
      } else {
        toast.error('Failed to save transaction');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold">Record Transaction</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Record Type Selector */}
        <div className="bg-white p-6 rounded-lg card-shadow mb-6">
          <h2 className="text-lg font-bold mb-4">How would you like to record this transaction?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => setRecordType('voice')}
              className={`p-6 rounded-lg border-2 transition ${
                recordType === 'voice' ? 'border-primary-600 bg-primary-50' : 'border-gray-300 hover:border-primary-600'
              }`}
            >
              <div className="text-4xl mb-2">🎤</div>
              <h3 className="font-bold">Voice Recording</h3>
              <p className="text-sm text-gray-600">Record in Swahili, Sheng, or English</p>
            </button>
            <button
              onClick={() => setRecordType('manual')}
              className={`p-6 rounded-lg border-2 transition ${
                recordType === 'manual' ? 'border-primary-600 bg-primary-50' : 'border-gray-300 hover:border-primary-600'
              }`}
            >
              <div className="text-4xl mb-2">✍️</div>
              <h3 className="font-bold">Manual Entry</h3>
              <p className="text-sm text-gray-600">Enter details manually</p>
            </button>
          </div>
        </div>

        {/* Voice Recording Section */}
        {recordType === 'voice' && (
          <div className="bg-white p-6 rounded-lg card-shadow mb-6">
            <h2 className="text-lg font-bold mb-4">Voice Recording</h2>
            <p className="text-gray-600 mb-4">Click the microphone icon and speak naturally</p>
            <div className="text-center">
              <button
                onClick={handleStartRecording}
                disabled={isRecording}
                className={`mx-auto p-8 rounded-full text-4xl transition ${
                  isRecording
                    ? 'bg-red-100 text-red-600 animate-pulse'
                    : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                }`}
              >
                🎤
              </button>
              <p className="mt-4 text-sm text-gray-600">
                {isRecording ? 'Recording... Speak now' : 'Click to start recording'}
              </p>
            </div>
            {formData.productName && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-800 font-medium mb-2">✓ Transaction extracted:</p>
                <p className="text-green-700"><strong>{formData.productName}</strong> - KES {formData.revenue}</p>
              </div>
            )}
          </div>
        )}

        {/* Transaction Details Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg card-shadow space-y-4">
          <h2 className="text-lg font-bold mb-4">Transaction Details</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Product Name *</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-600"
              placeholder="e.g., Tomatoes"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-600"
            >
              <option value="">Select Category</option>
              <option value="Food">Food & Vegetables</option>
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Selling Price (KES) *</label>
              <input
                type="number"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Total Revenue (KES)</label>
            <input
              type="number"
              value={formData.revenue}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-600"
            />
            <p className="text-sm text-gray-600 mt-1">Calculated automatically: Quantity × Selling Price</p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 font-medium disabled:bg-gray-400"
            >
              {loading ? 'Saving...' : 'Save Transaction'}
            </button>
            <Link href="/transactions" className="flex-1 border border-primary-600 text-primary-600 py-2 rounded-lg hover:bg-primary-50 font-medium text-center">
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
