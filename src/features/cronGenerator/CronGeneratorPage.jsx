import React, { useState } from 'react';
import { ClockIcon, ClipboardDocumentIcon, CheckCircleIcon, TrashIcon } from '@heroicons/react/24/outline'; // Example icons

export default function CronGeneratorPage() {
    // Simplified state for demonstration
    // In a real app, you'd have more complex state for each cron part (minute, hour, day, etc.)
    const [cronExpression, setCronExpression] = useState('* * * * *'); // Default to every minute
    const [copied, setCopied] = useState(false);
    // const [message, setMessage] = useState(''); // For feedback

    // Placeholder for actual cron generation logic
    // This would involve UI elements to select times/dates and then build the cron string
    // const handleGenerateCron = () => { ... }

    const handleCopyToClipboard = async () => {
        if (!cronExpression) return;
        try {
            await navigator.clipboard.writeText(cronExpression);
            setCopied(true);
            // setMessage('Cron expression copied!');
            setTimeout(() => {
                setCopied(false);
                // setMessage('');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy cron: ', err);
            // setMessage('Failed to copy.');
        }
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Cron Expression Generator</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Configure Schedule:</label>
                    <p className="text-sm text-gray-500 dark:text-gray-400"> (Cron UI elements would go here - e.g., dropdowns for minute, hour, day, etc. This is a placeholder.)</p>
                    {/* Example: <input type="text" placeholder="Minute (0-59)" className="w-full p-3 border rounded-lg mb-2" /> */}
                </div>

                <div className="mt-4">
                    <label htmlFor="cron-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Generated Cron Expression:</label>
                    <div className="flex rounded-md shadow-sm">
                        <input
                            id="cron-output"
                            type="text"
                            readOnly
                            value={cronExpression}
                            className="flex-1 block w-full min-w-0 rounded-none rounded-l-md p-2 border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 font-mono text-sm"
                        />
                        <button onClick={handleCopyToClipboard} className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500">
                            {copied ? <CheckCircleIcon className="h-5 w-5 text-green-500" /> : <ClipboardDocumentIcon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                     <button onClick={() => {setCronExpression('* * * * *'); setCopied(false);}} className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 flex items-center text-sm">
                        <TrashIcon className="h-4 w-4 mr-1" /> Reset
                    </button>
                </div>
            </div>
        </main>
    );
}
