'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Joke {
  id: number;
  type: string;
  setup?: string;
  delivery?: string;
  joke?: string;
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
  explicit: boolean;
}

export default function JokeGenerator() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [jokeHistory, setJokeHistory] = useState<Joke[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('any');
  const [filters, setFilters] = useState({
    nsfw: false,
    religious: false,
    political: false,
    racist: false,
    sexist: false,
    explicit: false,
  });

  const categories = [
    { value: 'any', label: '🎭 Any Category' },
    { value: 'general', label: '😄 General' },
    { value: 'knock-knock', label: '🚪 Knock-Knock' },
    { value: 'programming', label: '💻 Programming' },
    { value: 'spooky', label: '👻 Spooky' },
  ];

  const fetchJoke = async () => {
    setLoading(true);
    try {
      let url = 'https://v2.jokeapi.dev/joke/';

      // Build URL based on category
      if (selectedCategory === 'any') {
        url += 'Any';
      } else {
        url += selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
      }

      // Add filter parameters
      const filterParams = [];
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          filterParams.push(key);
        }
      });

      if (filterParams.length > 0) {
        url += `?contains=${filterParams.join(',')}`;
      } else {
        url += '?safe-mode';
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        toast.error('Failed to fetch joke. Try again!');
        return;
      }

      setJoke(data);
      setJokeHistory([data, ...jokeHistory.slice(0, 9)]);
      toast.success('Got a fresh joke! 🎉');
    } catch (error) {
      toast.error('Error fetching joke. Check your internet connection.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const displayJoke = () => {
    if (!joke) return 'No joke loaded yet';
    if (joke.type === 'single') {
      return joke.joke;
    } else {
      return `${joke.setup}\n\n${joke.delivery}`;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(displayJoke());
    toast.success('Joke copied to clipboard! 📋');
  };

  const shareJoke = () => {
    const text = encodeURIComponent(displayJoke());
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&hashtags=joke,humor`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              😂 Joke Generator
            </h1>
            <p className="text-gray-600 text-sm">Get random jokes delivered fresh daily</p>
          </div>
          <Link href="/dashboard" className="text-purple-600 hover:text-purple-700 font-medium">
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Joke Display */}
          <div className="md:col-span-2 space-y-6">
            {/* Joke Display Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 min-h-96 flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  {joke && (
                    <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {joke.type === 'single' ? '📝 Single' : '🎬 Two-Part'}
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {displayJoke()}
                </p>
              </div>
              {joke && (
                <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    📋 Copy
                  </button>
                  <button
                    onClick={shareJoke}
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    🐦 Share
                  </button>
                </div>
              )}
            </div>

            {/* Category Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800">📚 Select Category</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`py-2 px-4 rounded-lg font-medium transition ${
                      selectedCategory === cat.value
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={fetchJoke}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl text-lg transition shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin">⏳</div>
                  Loading Joke...
                </span>
              ) : (
                '🎲 Get a Joke!'
              )}
            </button>
          </div>

          {/* Sidebar - Filters & History */}
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800">🔒 Content Filters</h3>
              <div className="space-y-3">
                {[
                  { key: 'nsfw', label: '🔞 NSFW', icon: '❌' },
                  { key: 'religious', label: '✝️ Religious', icon: '❌' },
                  { key: 'political', label: '🏛️ Political', icon: '❌' },
                  { key: 'racist', label: '⚠️ Racist', icon: '❌' },
                  { key: 'sexist', label: '⚠️ Sexist', icon: '❌' },
                  { key: 'explicit', label: '🔊 Explicit', icon: '❌' },
                ].map(filter => (
                  <label key={filter.key} className="flex items-center cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition">
                    <input
                      type="checkbox"
                      checked={filters[filter.key as keyof typeof filters]}
                      onChange={() => handleFilterChange(filter.key)}
                      className="w-4 h-4 rounded cursor-pointer"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">{filter.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4 italic">
                💡 Check filters to exclude these types from your jokes
              </p>
            </div>

            {/* Joke History */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">📜 History</h3>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-purple-600 hover:text-purple-700 font-semibold"
                >
                  {showHistory ? '▼' : '▶'}
                </button>
              </div>
              {showHistory && (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {jokeHistory.length === 0 ? (
                    <p className="text-gray-500 text-sm">No jokes yet. Generate one!</p>
                  ) : (
                    jokeHistory.map((h, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 cursor-pointer hover:shadow-md transition"
                        onClick={() => setJoke(h)}
                      >
                        <p className="text-sm font-medium text-gray-700 line-clamp-2">
                          {h.type === 'single' ? h.joke : h.setup}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">#{h.id}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4">📊 Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Fetched:</span>
                  <span className="font-bold">{jokeHistory.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-bold capitalize">{selectedCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Type:</span>
                  <span className="font-bold">{joke?.type || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="mb-2">Powered by 😂 JokeAPI - Always a good laugh!</p>
          <p className="text-gray-400 text-sm">Keep smiling! Your daily dose of laughter.</p>
        </div>
      </footer>
    </div>
  );
}
