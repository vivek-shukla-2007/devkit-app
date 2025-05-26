import React, { useState } from 'react';
import { ArrowPathIcon, ClipboardDocumentIcon, CheckCircleIcon, TrashIcon } from '@heroicons/react/24/outline'; // Example icons
// You might use a library like 'papaparse' for robust CSV parsing

export default function CsvToJsonPage() {
    const [csvInput, setCsvInput] = useState('');
    const [jsonOutput, setJsonOutput] = useState('');
    const [copied, setCopied] = useState(false);
    // const [message, setMessage] = useState(''); // For feedback

    // Basic CSV to JSON conversion
    const handleConvert = () => {
        if (!csvInput.trim()) {
            // setMessage("CSV input cannot be empty.");
            setJsonOutput('');
            return;
        }
        try {
            const lines = csvInput.trim().split('\n');
            const headers = lines[0].split(',').map(header => header.trim());
            const jsonData = [];
            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',').map(value => value.trim());
                if (values.length === headers.length) {
                    const entry = {};
                    headers.forEach((header, index) => {
                        entry[header] = values[index];
                    });
                    jsonData.push(entry);
                }
            }
            setJsonOutput(JSON.stringify(jsonData, null, 2)); // Pretty print JSON
            // setMessage("CSV converted to JSON successfully.");
        } catch (e) {
            // setMessage("Error converting CSV to JSON. Check format.");
            setJsonOutput('');
            console.error("CSV to JSON conversion error:", e);
        }
        setCopied(false);
    };

    const handleCopyToClipboard = async () => {
        if (!jsonOutput) return;
        try {
            await navigator.clipboard.writeText(jsonOutput);
            setCopied(true);
            // setMessage('JSON output copied to clipboard!');
            setTimeout(() => {
                setCopied(false);
                // setMessage('');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy JSON: ', err);
            // setMessage('Failed to copy JSON.');
        }
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">CSV to JSON Converter</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
                <div className="mb-3">
                    <label htmlFor="csv-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CSV Input:</label>
                    <textarea 
                        id="csv-input" 
                        rows="10" 
                        value={csvInput} 
                        onChange={(e) => setCsvInput(e.target.value)} 
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="name,age,city\nAlice,30,New York\nBob,24,Paris"
                    />
                </div>
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                    <button onClick={handleConvert} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 flex items-center">
                        <ArrowPathIcon className="h-5 w-5 mr-2" /> Convert to JSON
                    </button>
                    <button onClick={() => {setCsvInput(''); setJsonOutput(''); setCopied(false);}} className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 flex items-center">
                        <TrashIcon className="h-5 w-5 mr-2" /> Clear
                    </button>
                </div>
                {jsonOutput && (
                    <div>
                        <label htmlFor="json-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">JSON Output:</label>
                        <div className="relative group">
                            <textarea 
                                id="json-output" 
                                rows="10" 
                                readOnly 
                                value={jsonOutput} 
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-100 font-mono text-sm"
                            />
                            <button onClick={handleCopyToClipboard} title="Copy JSON" className="absolute top-1 right-1 p-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                {copied ? <CheckCircleIcon className="h-5 w-5 text-green-500" /> : <ClipboardDocumentIcon className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                )}
                {/* {message && <p className={`mt-2 text-sm text-center ${copied ? 'text-green-500' : 'text-gray-600'}`}>{message}</p>} */}
            </div>
        </main>
    );
}
