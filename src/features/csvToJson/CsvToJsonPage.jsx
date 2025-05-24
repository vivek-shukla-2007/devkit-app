import React, { useState } from 'react';
import { parse } from 'csv-parse/browser/esm/sync'; // Import from npm package

function CsvToJsonPage() {
    const [csvInput, setCsvInput] = useState('');
    const [jsonOutput, setJsonOutput] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const convertCsvToJson = async () => {
        setMessage('');
        setError('');
        if (!csvInput.trim()) {
            setError('Please enter CSV data.');
            setJsonOutput('');
            return;
        }

        try {
            // Using the imported 'parse' function directly
            // The 'parse' function from 'csv-parse/browser/esm/sync' is synchronous
            const records = parse(csvInput, {
                columns: true,           // Treat first row as headers
                skip_empty_lines: true,
                trim: true,              // Trim whitespace from fields
                relax_column_count: true // Allows varying number of columns per row
            });

            setJsonOutput(JSON.stringify(records, null, 2));
        } catch (e) {
            // Ensure e.message is a string, provide a fallback if not
            setError(`Error converting CSV: ${e.message || 'An unexpected error occurred during parsing.'}`);
            setJsonOutput('');
        }
    };

    const clearFields = () => {
        setCsvInput('');
        setJsonOutput('');
        setError('');
        setMessage('');
    };

    const copyToClipboard = async () => {
        if (jsonOutput) {
            try {
                await navigator.clipboard.writeText(jsonOutput);
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
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">CSV to JSON Converter</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input CSV */}
                    <div>
                        <label htmlFor="csv-input" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Input CSV</label>
                        <textarea
                            id="csv-input"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-teal-500 focus:border-teal-500 h-64 resize-y font-mono text-sm"
                            placeholder={`Enter your CSV data here, e.g.:
name,age,city
John,30,New York
Jane,25,London`}
                            value={csvInput}
                            onChange={(e) => setCsvInput(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Output JSON */}
                    <div>
                        <label htmlFor="json-output" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Output JSON</label>
                        <textarea
                            id="json-output"
                            className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-64 resize-y font-mono text-sm ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                            value={jsonOutput}
                            readOnly
                            placeholder="Converted JSON will appear here..."
                        ></textarea>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={convertCsvToJson}
                        className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                    >
                        <i className="fas fa-sync-alt mr-2"></i> Convert to JSON
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

export default CsvToJsonPage;