import React, { useState } from 'react';
import { ClipboardDocumentIcon, CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function UnixTimestampConverterPage() {
  const [timestampInput, setTimestampInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [conversionResult, setConversionResult] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);


  const handleTimestampToDate = () => {
    setError('');
    setConversionResult('');
    const num = parseInt(timestampInput, 10);
    if (isNaN(num)) {
      setError('Invalid timestamp. Please enter a number.');
      return;
    }
    // Assuming seconds. If it's likely milliseconds, adjust (e.g., if num > 3000000000)
    const date = new Date(num * 1000);
    if (isNaN(date.getTime())) {
        setError('Invalid date from timestamp.');
        return;
    }
    setConversionResult(date.toUTCString() + ` (Local: ${date.toLocaleString()})`);
  };

  const handleDateToTimestamp = () => {
    setError('');
    setConversionResult('');
    try {
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) {
        setError('Invalid date format. Try YYYY-MM-DDTHH:mm:ss or natural language.');
        return;
      }
      setConversionResult(Math.floor(date.getTime() / 1000).toString());
    } catch (e) {
      setError('Error parsing date.');
    }
  };

  const handleCurrentTimestamp = () => {
    setError('');
    const now = Math.floor(Date.now() / 1000);
    setTimestampInput(now.toString());
    handleTimestampToDate(); // Optionally convert it immediately
  };

  const handleCopyToClipboard = () => {
    if (conversionResult) {
      navigator.clipboard.writeText(conversionResult)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => console.error('Failed to copy: ', err));
    }
  };

  const clearFields = () => {
    setTimestampInput('');
    setDateInput('');
    setConversionResult('');
    setError('');
    setCopied(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">Unix Timestamp Converter</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="timestampInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unix Timestamp (seconds)</label>
          <input
            type="text"
            id="timestampInput"
            value={timestampInput}
            onChange={(e) => setTimestampInput(e.target.value)}
            placeholder="e.g., 1678886400"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <button onClick={handleTimestampToDate} className="mt-2 w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-sm">To Date</button>
        </div>
        <div>
          <label htmlFor="dateInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date & Time</label>
          <input
            type="text"
            id="dateInput"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            placeholder="e.g., 2023-03-15T12:00:00 or March 15, 2023 12:00 PM"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <button onClick={handleDateToTimestamp} className="mt-2 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm">To Timestamp</button>
        </div>
      </div>

      <div className="text-center mb-6">
        <button onClick={handleCurrentTimestamp} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm flex items-center mx-auto">
          <ArrowPathIcon className="h-5 w-5 mr-2" /> Get Current Timestamp
        </button>
      </div>

      { (conversionResult || error) && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Result</label>
          <div className="relative">
            <textarea
              value={error || conversionResult}
              readOnly
              className={`w-full h-24 p-3 border rounded-md shadow-sm resize-none ${error ? 'border-red-500 text-red-700 dark:text-red-300' : 'border-gray-300 dark:border-gray-600'} bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
            />
            {conversionResult && !error && (
              <button
                onClick={handleCopyToClipboard}
                title="Copy to Clipboard"
                className="absolute top-2 right-2 p-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-600 dark:text-gray-300"
              >
                {copied ? <CheckCircleIcon className="h-5 w-5 text-green-500" /> : <ClipboardDocumentIcon className="h-5 w-5" />}
              </button>
            )}
          </div>
        </div>
      )}
       <div className="text-center">
        <button onClick={clearFields} className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md">Clear</button>
      </div>
    </div>
  );
}