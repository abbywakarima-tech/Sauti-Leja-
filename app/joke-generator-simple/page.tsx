'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Joke {
  id: number;
  type: string;
  setup?: string;
  delivery?: string;
  joke?: string;
}

export default function JokeGeneratorSimple() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/jokes');
      const data = await response.json();
      setJoke(data);
      toast.success('Got a joke! 🎉');
    } catch (error) {
      toast.error('Failed to fetch joke');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl mb-2">😂</h1>
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Random Joke</h2>

        <div className="bg-gray-50 rounded-xl p-6 mb-8 min-h-32 flex items-center justify-center">
          {joke ? (
            <p className="text-lg text-gray-700 font-semibold">
              {joke.type === 'single' ? joke.joke : `${joke.setup}\n\n${joke.delivery}`}
            </p>
          ) : (
            <p className="text-gray-500">Loading joke...</p>
          )}
        </div>

        <button
          onClick={fetchJoke}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition"
        >
          {loading ? '⏳ Loading...' : '🎲 Next Joke'}
        </button>

        <Link href="/joke-generator" className="block mt-4 text-blue-600 hover:text-blue-700 font-medium">
          → Advanced Mode
        </Link>
      </div>
    </div>
  );
}
