import React, { useState } from 'react';
import { ClipboardDocumentIcon, CheckCircleIcon, ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline';
import md5 from 'md5'; // For MD5 hashing

export default function HashGeneratorPage() {
    const [inputText, setInputText] = useState('');
    const [hashes, setHashes] = useState({ md5: '', sha1: '', sha256: '', sha512: '' });
    const [copiedHash, setCopiedHash] = useState(''); // Stores the key of the copied hash e.g. 'md5'
    const [message, setMessage] = useState('');

    const generateShaHash = async (algorithm, text) => {
        const upperAlgorithm = algorithm.toUpperCase();
        if (!['SHA-1', 'SHA-256', 'SHA-512'].includes(upperAlgorithm)) {
            throw new Error('Invalid SHA algorithm');
        }
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest(upperAlgorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    };

    const handleGenerateHashes = async () => {
        if (!inputText) {
            setMessage("Input text cannot be empty.");
            setHashes({ md5: '', sha1: '', sha256: '', sha512: '' });
            return;
        }
        setMessage('');
        setCopiedHash('');
        try {
            const md5Hash = md5(inputText);
            const sha1Hash = await generateShaHash('SHA-1', inputText);
            const sha256Hash = await generateShaHash('SHA-256', inputText);
            const sha512Hash = await generateShaHash('SHA-512', inputText);
            setHashes({ md5: md5Hash, sha1: sha1Hash, sha256: sha256Hash, sha512: sha512Hash });
            setMessage("Hashes generated successfully.");
        } catch (error) {
            console.error("Error generating hashes:", error);
            setMessage("Error generating hashes. See console for details.");
            setHashes({ md5: '', sha1: '', sha256: '', sha512: '' });
        }
    };

    const handleCopyToClipboard = async (textToCopy, hashKey) => {
        if (!textToCopy) return;
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopiedHash(hashKey);
            setMessage(`${hashKey.toUpperCase()} hash copied!`);
            setTimeout(() => {
                setCopiedHash('');
                if (hashes.md5) setMessage("Hashes generated successfully."); // Reset message if hashes exist
            }, 2000);
        } catch (err) {
            console.error(`Failed to copy ${hashKey}: `, err);
            setMessage(`Failed to copy ${hashKey}.`);
        }
    };

    const handleClear = () => {
        setInputText('');
        setHashes({ md5: '', sha1: '', sha256: '', sha512: '' });
        setCopiedHash('');
        setMessage('');
    };

    const renderHashOutput = (label, hashValue, hashKey) => {
        return (
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                        type="text"
                        readOnly
                        value={hashValue}
                        className="flex-1 block w-full min-w-0 rounded-none rounded-l-md p-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                        onClick={() => handleCopyToClipboard(hashValue, hashKey)}
                        disabled={!hashValue}
                        className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500 disabled:opacity-50"
                    >
                        {copiedHash === hashKey ? <CheckCircleIcon className="h-5 w-5 text-green-500" /> : <ClipboardDocumentIcon className="h-5 w-5" />}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Hash Generator</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
                <label htmlFor="input-text" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Input Text</label>
                <textarea id="input-text" rows="5" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Enter text to hash..." className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 resize-y font-mono text-sm" />
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button onClick={handleGenerateHashes} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 flex items-center"><ArrowPathIcon className="h-5 w-5 mr-2" /> Generate Hashes</button>
                    <button onClick={handleClear} className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 flex items-center"><TrashIcon className="h-5 w-5 mr-2" /> Clear</button>
                </div>
            </div>

            {message && <p className="my-4 text-sm text-center text-gray-600 dark:text-gray-400">{message}</p>}

            {(hashes.md5 || hashes.sha1 || hashes.sha256 || hashes.sha512) && (
                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Generated Hashes</h3>
                    {renderHashOutput("MD5", hashes.md5, "md5")}
                    {renderHashOutput("SHA-1", hashes.sha1, "sha1")}
                    {renderHashOutput("SHA-256", hashes.sha256, "sha256")}
                    {renderHashOutput("SHA-512", hashes.sha512, "sha512")}
                </div>
            )}
        </main>
    );
}