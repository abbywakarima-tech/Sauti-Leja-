'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface InventoryItem {
  id: string;
  productName: string;
  category: string;
  stockQuantity: number;
  costPrice: number;
  sellingPrice: number;
  profitMargin: number;
  unitsSold: number;
  remainingStock: number;
}

export default function Inventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchInventory = async () => {
      try {
        const response = await fetch('/api/inventory', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (response.ok) {
          setInventory(await response.json());
        }
      } catch (error) {
        toast.error('Failed to load inventory');
      } finally {
        setLoading(false);
      }
    };

    // Mock data for demo
    setTimeout(() => {
      setInventory([
        { id: '1', productName: 'Tomatoes', category: 'Food', stockQuantity: 50, costPrice: 20, sellingPrice: 30, profitMargin: 33, unitsSold: 100, remainingStock: 50 },
        { id: '2', productName: 'Onions', category: 'Food', stockQuantity: 30, costPrice: 15, sellingPrice: 25, profitMargin: 40, unitsSold: 80, remainingStock: 30 },
        { id: '3', productName: 'Bananas', category: 'Food', stockQuantity: 10, costPrice: 5, sellingPrice: 10, profitMargin: 50, unitsSold: 120, remainingStock: 10 },
      ]);
      setLoading(false);
    }, 500);
  }, [router]);

  const deleteItem = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    setInventory(inventory.filter(i => i.id !== id));
    toast.success('Item deleted');
  };

  const lowStockItems = inventory.filter(i => i.stockQuantity < 15);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            + Add Item
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg card-shadow">
            <p className="text-gray-600 mb-2">Total Items</p>
            <p className="text-3xl font-bold">{inventory.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg card-shadow">
            <p className="text-gray-600 mb-2">Total Stock Value</p>
            <p className="text-3xl font-bold text-primary-600">KES {inventory.reduce((sum, i) => sum + (i.stockQuantity * i.costPrice), 0).toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg card-shadow">
            <p className="text-gray-600 mb-2">Low Stock Items</p>
            <p className="text-3xl font-bold text-warning-500">{lowStockItems.length}</p>
          </div>
        </div>

        {/* Low Stock Alerts */}
        {lowStockItems.length > 0 && (
          <div className="bg-warning-50 border-l-4 border-warning-500 p-4 rounded mb-6">
            <h3 className="font-bold text-warning-900 mb-2">⚠️ Low Stock Alert</h3>
            <ul className="text-sm text-warning-800">
              {lowStockItems.map(item => (
                <li key={item.id}>• <strong>{item.productName}</strong>: {item.stockQuantity} units remaining. Restock soon!</li>
              ))}
            </ul>
          </div>
        )}

        {/* Inventory Table */}
        <div className="bg-white rounded-lg card-shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">Loading inventory...</div>
          ) : inventory.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 mb-4">No inventory items yet</p>
              <button className="text-primary-600 font-medium">Add your first item</button>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Product</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Stock</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Cost Price</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Selling Price</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Profit Margin</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Units Sold</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {inventory.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{item.productName}</td>
                    <td className="px-6 py-4 text-sm">{item.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.stockQuantity < 15 ? 'bg-warning-100 text-warning-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {item.stockQuantity} units
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">KES {item.costPrice}</td>
                    <td className="px-6 py-4 text-sm">KES {item.sellingPrice}</td>
                    <td className="px-6 py-4 text-sm font-bold text-success-500">{item.profitMargin}%</td>
                    <td className="px-6 py-4 text-sm">{item.unitsSold}</td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-primary-600 hover:underline mr-3">Edit</button>
                      <button onClick={() => deleteItem(item.id)} className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
