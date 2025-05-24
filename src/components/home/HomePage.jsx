import React from 'react';
import ToolCard from './ToolCard'; // Import ToolCard

export default function HomePage({ toolData, onNavigate, searchTerm, onSearchChange }) {
  const filteredTools = toolData.filter(tool =>
    (tool.name && tool.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (tool.description && tool.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-700 dark:to-indigo-800 text-white py-16 px-4 sm:px-6 lg:px-8 text-center rounded-lg my-8 mx-4 md:mx-auto max-w-6xl shadow-xl">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
          Your Essential Online Dev Tools
        </h2>
        <p className="text-lg sm:text-xl mb-8 opacity-90">
          Fast, Free, and Reliable Utilities for Everyday Coding Tasks.
        </p>
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a tool (e.g., JSON, Date, Regex)..."
              className="w-full p-3 pl-10 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-lg"
              value={searchTerm}
              onChange={onSearchChange}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">Explore Our Tools</h2>
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} onNavigate={onNavigate} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400 text-xl">No tools found matching your search.</p>
        )}
      </main>

      {/* Why Choose DevKit Section */}
      <section className="bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-center mt-12 rounded-lg mx-4 md:mx-auto max-w-6xl shadow-inner">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Why Choose DevKit?</h3>
        <div className="flex flex-col md:flex-row justify-center items-start md:space-x-8 space-y-6 md:space-y-0">
          <div className="flex flex-col items-center">
            <i className="fas fa-bolt text-purple-500 text-3xl mb-3"></i>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Blazing Fast</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Instant results with client-side processing.</p>
          </div>
          <div className="flex flex-col items-center">
            <i className="fas fa-shield-alt text-green-500 text-3xl mb-3"></i>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Privacy-Focused</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Your data stays in your browser. No server uploads.</p>
          </div>
          <div className="flex flex-col items-center">
            <i className="fas fa-infinity text-blue-500 text-3xl mb-3"></i>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Always Free</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Access all tools without any cost or subscriptions.</p>
          </div>
        </div>
      </section>
    </>
  );
}