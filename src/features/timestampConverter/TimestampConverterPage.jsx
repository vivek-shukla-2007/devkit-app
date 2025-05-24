import React, { useState, useEffect } from 'react';

function TimestampConverterPage() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [error, setError] = useState('');
  const [conversionMode, setConversionMode] = useState('timestampToDate'); // 'timestampToDate' or 'dateToTimestamp'

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleModeChange = (event) => {
    setConversionMode(event.target.value);
    // Clear input/output/error when mode changes for a cleaner UX
    setInputValue('');
    setOutputValue('');
    setError('');
  };

  useEffect(() => {
    if (!inputValue.trim()) {
      setOutputValue('');
      setError('');
      return;
    }

    try {
      setError(''); // Clear previous error
      if (conversionMode === 'timestampToDate') {
        const numValue = Number(inputValue);
        if (isNaN(numValue)) {
          throw new Error('Timestamp must be a valid number.');
        }
        // Heuristic: if timestamp has 10 digits, assume seconds; otherwise, milliseconds.
        // More robust solutions might involve user input for precision or checking a specific date range.
        const date = new Date(numValue * (String(Math.abs(Math.floor(numValue))).length === 10 ? 1000 : 1));
        if (isNaN(date.getTime())) { // Check if date is valid
          throw new Error('Invalid timestamp value resulting in an invalid date.');
        }
        setOutputValue(date.toLocaleString()); // Or use toISOString(), toUTCString(), etc.
      } else { // dateToTimestamp
        const date = new Date(inputValue);
        if (isNaN(date.getTime())) { // Check if date is valid
          throw new Error('Invalid date string. Please use a format recognized by JavaScript Date constructor (e.g., YYYY-MM-DD HH:MM:SS).');
        }
        // Output timestamp in seconds (common for Unix timestamps)
        // For milliseconds, just use date.getTime()
        setOutputValue(String(Math.floor(date.getTime() / 1000)));
      }
    } catch (e) {
      setError(e.message);
      setOutputValue('');
    }
  }, [inputValue, conversionMode]);


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Timestamp Converter</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Conversion Mode:</label>
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center dark:text-gray-300">
            <input
              type="radio"
              className="form-radio text-indigo-600 dark:text-indigo-400 dark:bg-gray-700 dark:border-gray-600"
              name="conversionMode"
              value="timestampToDate"
              checked={conversionMode === 'timestampToDate'}
              onChange={handleModeChange}
            />
            <span className="ml-2">Timestamp to Date</span>
          </label>
          <label className="inline-flex items-center dark:text-gray-300">
            <input
              type="radio"
              className="form-radio text-indigo-600 dark:text-indigo-400 dark:bg-gray-700 dark:border-gray-600"
              name="conversionMode"
              value="dateToTimestamp"
              checked={conversionMode === 'dateToTimestamp'}
              onChange={handleModeChange}
            />
            <span className="ml-2">Date to Timestamp</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="timestamp-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {conversionMode === 'timestampToDate' ? 'Enter Unix Timestamp (seconds or milliseconds):' : 'Enter Date String (e.g., YYYY-MM-DD HH:MM:SS):'}
        </label>
        <input
          type="text"
          id="timestamp-input"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={conversionMode === 'timestampToDate' ? 'e.g., 1678886400 or 1678886400000' : 'e.g., 2023-03-15 12:00:00'}
        />
      </div>

      {error && <p className="text-red-500 dark:text-red-400 mb-2">{error}</p>}
      {outputValue && <p className="text-green-600 dark:text-green-400 font-semibold">Result: {outputValue}</p>}
    </div>
  );
}

export default TimestampConverterPage;