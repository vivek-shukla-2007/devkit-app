import React from 'react';
import ToolCard from './ToolCard'; // Import ToolCard

export default function HomePage({ toolData, onNavigate, searchTerm, onSearchChange }) {
  const filteredTools = toolData.filter(tool =>
    (tool.name && tool.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (tool.description && tool.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      {/* Hero Section - Revised for better alignment */}
      <section className="py-8 md:py-10 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 dark:from-purple-700 dark:via-pink-600 dark:to-red-600 text-white text-center rounded-b-xl shadow-xl flex flex-col items-center justify-center">
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-6"> {/* Title is visible and smaller */}
          Your Essential Online Dev Gear Hub
        </h2>
        {/* Search Bar - Inside Hero, below title */}
        <div className="w-full max-w-xl px-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a tool (e.g., JSON, Date...)" // Standard search placeholder
              className="w-full p-3 pl-10 rounded-full text-gray-800 dark:text-gray-200 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 shadow-lg placeholder-gray-500 dark:placeholder-gray-400"
              value={searchTerm}
              onChange={onSearchChange}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* Replaced Font Awesome icon with inline SVG for better self-containment */}
              <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid Section */}
      <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
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
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Why Choose Dev Gear Hub?</h3>
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
