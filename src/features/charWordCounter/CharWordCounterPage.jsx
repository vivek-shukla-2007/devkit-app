import React, { useState, useEffect } from 'react';

export default function CharWordCounterPage() {
  const [text, setText] = useState('');
  const [counts, setCounts] = useState({
    characters: 0,
    words: 0,
    lines: 0,
    sentences: 0,
  });

  useEffect(() => {
    const characters = text.length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const lines = text.split('\n').length;
    // Basic sentence count, might not be perfect for all cases
    const sentences = text.trim() === '' ? 0 : (text.match(/[.!?]+(\s|$)/g) || []).length;
    
    setCounts({ characters, words, lines, sentences });
  }, [text]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">Character & Word Counter</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-y mb-6"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{counts.characters}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Characters</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{counts.words}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Words</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{counts.lines}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Lines</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{counts.sentences}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Sentences</p>
        </div>
      </div>
       <div className="text-center mt-6">
        <button 
          onClick={() => setText('')} 
          className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-150"
        >
          Clear Text
        </button>
      </div>
    </div>
  );
}