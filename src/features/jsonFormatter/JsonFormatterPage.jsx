import React, { useState, useEffect } from 'react';

function JsonFormatterPage() {
  const [inputJson, setInputJson] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [error, setError] = useState('');

  // Effect to auto-format JSON when inputJson changes
  useEffect(() => {
    if (!inputJson.trim()) {
      setFormattedJson('');
      setError('');
      return;
    }

    try {
      const parsedJson = JSON.parse(inputJson);
      setFormattedJson(JSON.stringify(parsedJson, null, 2)); // 2 spaces for indentation
      setError(''); // Clear any previous error
    } catch (e) {
      setError('Invalid JSON: ' + e.message);
      setFormattedJson(''); // Clear previous formatted output
    }
  }, [inputJson]);

  const handleInputChange = (event) => {
    setInputJson(event.target.value);
  };

  const handleCopyOutput = async () => {
    if (formattedJson) {
      try {
        await navigator.clipboard.writeText(formattedJson);
        alert('Formatted JSON copied to clipboard!'); // Replace with a more subtle notification if desired
      } catch (err) {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy to clipboard.');
      }
    }
  };

  const handleClearAll = () => {
    setInputJson('');
    // formattedJson and error will be cleared by the useEffect hook
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">JSON Formatter</h1>
      
      <div className="mb-4">
        <label htmlFor="json-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 cursor-pointer">
          Enter JSON here:
        </label>
        <textarea
          id="json-input"
          rows="10"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={inputJson}
          onChange={handleInputChange}
          placeholder='Paste your JSON string here...'
        />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md dark:bg-red-900 dark:border-red-700 dark:text-red-300" role="alert">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {formattedJson && !error && (
        <div className="mb-4">
          <label htmlFor="json-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Formatted JSON:
          </label>
          <div className="relative group">
            <textarea
              id="json-output"
              rows="15"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              value={formattedJson}
              readOnly
            />
            <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button onClick={handleCopyOutput} title="Copy to Clipboard" className="p-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300">
                <i className="fas fa-copy"></i>
              </button>
              <button onClick={handleClearAll} title="Clear All" className="p-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300">
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JsonFormatterPage;