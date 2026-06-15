'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SautiBot() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      }
    } catch (error) {
      toast.error('Failed to get response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">🤖 SautiBot - Business Assistant</h1>
          <Link href="/dashboard" className="text-primary-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg card-shadow h-96 mb-4 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500 text-center">
              <div>
                <p className="text-3xl mb-2">🤖</p>
                <p className="font-medium">Hi! I'm SautiBot, your AI business assistant.</p>
                <p className="text-sm mt-2">Ask me anything about your business performance, inventory, or sales!</p>
                <div className="mt-4 text-sm text-left inline-block">
                  <p className="font-medium mb-2">Try asking:</p>
                  <ul className="space-y-1">
                    <li>• How much did I sell this week?</li>
                    <li>• What is my best-selling product?</li>
                    <li>• Which products should I restock?</li>
                    <li>• Show my monthly revenue</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your business..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-600"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium disabled:bg-gray-400"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}
