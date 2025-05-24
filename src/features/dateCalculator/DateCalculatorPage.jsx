import React, { useState } from 'react';

// Date Calculator Component
function DateCalculatorPage() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [daysToAdd, setDaysToAdd] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const calculateDifference = () => {
        setMessage('');
        setError('');
        if (!startDate || !endDate) {
            setError('Please enter both start and end dates.');
            return;
        }
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            setError('Invalid date format. Please use YYYY-MM-DD.');
            return;
        }

        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setResult(`Difference: ${diffDays} days`);
    };

    const addSubtractDays = () => {
        setMessage('');
        setError('');
        if (!startDate || daysToAdd === '') {
            setError('Please enter a start date and days to add/subtract.');
            return;
        }
        const start = new Date(startDate);
        const days = parseInt(daysToAdd);

        if (isNaN(start.getTime())) {
            setError('Invalid start date format. Please use YYYY-MM-DD.');
            return;
        }
        if (isNaN(days)) {
            setError('Days to add/subtract must be a number.');
            return;
        }

        const newDate = new Date(start);
        newDate.setDate(start.getDate() + days);
        setResult(`New Date: ${newDate.toISOString().split('T')[0]}`);
    };

    const clearFields = () => {
        setStartDate('');
        setEndDate('');
        setDaysToAdd('');
        setResult('');
        setError('');
        setMessage('');
    };

    const copyToClipboard = async () => { // Made async
        if (result) {
            try {
                await navigator.clipboard.writeText(result);
                setMessage('Copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy text: ', err);
                setMessage('Failed to copy.');
            }
        } else {
            setMessage('Nothing to copy!');
        }
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Date Calculator</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date Difference Section */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Calculate Date Difference</h3>
                        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                        <input
                            type="date"
                            id="start-date"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 mb-3"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                        <input
                            type="date"
                            id="end-date"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 mb-4"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <button
                            onClick={calculateDifference}
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 w-full"
                        >
                            Calculate Difference
                        </button>
                    </div>

                    {/* Add/Subtract Days Section */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Add/Subtract Days</h3>
                        <label htmlFor="start-date-add" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                        <input
                            type="date"
                            id="start-date-add"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 mb-3"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <label htmlFor="days-to-add" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Days to Add/Subtract</label>
                        <input
                            type="number"
                            id="days-to-add"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 mb-4"
                            placeholder="e.g., 7 or -3"
                            value={daysToAdd}
                            onChange={(e) => setDaysToAdd(e.target.value)}
                        />
                        <button
                            onClick={addSubtractDays}
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 w-full"
                        >
                            Add/Subtract Days
                        </button>
                    </div>
                </div>

                {/* Result and Actions */}
                <div className="mt-6">
                    <label htmlFor="date-result" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Result</label>
                    <textarea
                        id="date-result"
                        className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-24 resize-y font-mono text-sm ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                        value={result}
                        readOnly
                        placeholder="Calculation result will appear here..."
                    ></textarea>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={copyToClipboard}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                    >
                        <i className="fas fa-copy mr-2"></i> Copy Result
                    </button>
                    <button
                        onClick={clearFields}
                        className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
                    >
                        <i className="fas fa-times mr-2"></i> Clear
                    </button>
                </div>
            </div>
        </main>
    );
}

export default DateCalculatorPage;