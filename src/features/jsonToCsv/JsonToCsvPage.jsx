import React, { useState } from 'react';
import { json2csv } from 'json-2-csv'; // Import from npm package


function JsonToCsvPage() {
    const [jsonInput, setJsonInput] = useState('');
    const [csvOutput, setCsvOutput] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const convertJsonToCsv = async () => {
        setMessage('');
        setError('');
        if (!jsonInput.trim()) {
            setError('Please enter JSON data.');
            setCsvOutput('');
            return;
        }

        try {
            const parsedJson = JSON.parse(jsonInput);

           
            // Using the imported json2csv function (it's asynchronous)
            // Note: The library's main export might be an object containing json2csvAsync,
            // or json2csv might be the async function itself.
            // Based on common patterns, 'json2csv' itself is often the async function.
            // If it's nested, it might be json2csv.json2csvAsync(parsedJson)
            // For this library, json2csv is the async function.
            const csv = await json2csv(parsedJson);
            setCsvOutput(csv);

        } catch (e) {
            setError(`Error converting JSON: ${e.message || 'An unexpected error occurred during conversion.'}`);
            setCsvOutput('');
        }
    };

    const clearFields = () => {
        setJsonInput('');
        setCsvOutput('');
        setError('');
        setMessage('');
    };

    const copyToClipboard = async () => {
        if (csvOutput) {
            try {
                await navigator.clipboard.writeText(csvOutput);
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
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">JSON to CSV Converter</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input JSON */}
                    <div>
                        <label htmlFor="json-input" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Input JSON</label>
                        <textarea
                            id="json-input"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 h-64 resize-y font-mono text-sm"
                            placeholder='Enter your JSON data here, e.g., [{"name": "John", "age": 30}]'
                            value={jsonInput}
                            onChange={(e) => setJsonInput(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Output CSV */}
                    <div>
                        <label htmlFor="csv-output" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Output CSV</label>
                        <textarea
                            id="csv-output"
                            className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-64 resize-y font-mono text-sm ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                            value={csvOutput}
                            readOnly
                            placeholder="Converted CSV will appear here..."
                        ></textarea>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={convertJsonToCsv}
                        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                    >
                        <i className="fas fa-sync-alt mr-2"></i> Convert to CSV
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                    >
                        <i className="fas fa-copy mr-2"></i> Copy Output
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

export default JsonToCsvPage;