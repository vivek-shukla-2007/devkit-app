import React, { useState, useEffect } from 'react';
import { ClipboardDocumentIcon, CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function UuidGeneratorPage() {
    const [generatedUuid, setGeneratedUuid] = useState('');
    const [copied, setCopied] = useState(false);
    const [message, setMessage] = useState('');

    const generateNewUuid = () => {
        // crypto.randomUUID() is the modern standard
        if (crypto.randomUUID) {
            setGeneratedUuid(crypto.randomUUID());
        } else {
            // Fallback for older browsers (less common now)
            setGeneratedUuid(generateUuidV4Fallback());
        }
        setCopied(false);
        setMessage('New UUID generated!');
    };

    // Fallback UUID v4 generator if crypto.randomUUID is not available
    const generateUuidV4Fallback = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    useEffect(() => {
        generateNewUuid(); // Generate one on initial load
    }, []);

    const handleCopyToClipboard = async () => {
        if (!generatedUuid) return;
        try {
            await navigator.clipboard.writeText(generatedUuid);
            setCopied(true);
            setMessage('UUID copied to clipboard!');
            setTimeout(() => {
                setCopied(false);
                setMessage('New UUID generated!'); // Reset message
            }, 2000);
        } catch (err) {
            console.error('Failed to copy UUID: ', err);
            setMessage('Failed to copy UUID.');
        }
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">UUID/GUID Generator</h2> {/* text-center is fine for this specific page layout */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700 w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="uuid-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Generated UUID (v4):</label>
                    <input
                        id="uuid-output"
                        type="text"
                        readOnly
                        value={generatedUuid}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-center text-sm"
                    />
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <button onClick={generateNewUuid} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 flex items-center justify-center"><ArrowPathIcon className="h-5 w-5 mr-2" /> Generate New UUID</button>
                    <button onClick={handleCopyToClipboard} disabled={!generatedUuid} className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                        {copied ? <CheckCircleIcon className="h-5 w-5 mr-2" /> : <ClipboardDocumentIcon className="h-5 w-5 mr-2" />} Copy UUID
                    </button>
                </div>
                {message && <p className={`mt-3 text-sm text-center ${copied ? 'text-green-500 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>{message}</p>}
            </div>
        </main>
    );
}