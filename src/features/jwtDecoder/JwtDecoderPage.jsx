import React, { useState } from 'react';
import { ClipboardDocumentIcon, CheckCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function JwtDecoderPage() {
    const [jwtInput, setJwtInput] = useState('');
    const [decodedHeader, setDecodedHeader] = useState(null);
    const [decodedPayload, setDecodedPayload] = useState(null);
    const [error, setError] = useState('');
    const [copiedSection, setCopiedSection] = useState(''); // 'header' or 'payload'

    const decodeJwtPart = (part) => {
        try {
            const base64Url = part.replace(/-/g, '+').replace(/_/g, '/');
            const base64 = base64Url.padEnd(base64Url.length + (4 - base64Url.length % 4) % 4, '=');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error("Error decoding JWT part:", e);
            throw new Error("Invalid Base64Url encoding or JSON content in JWT part.");
        }
    };

    const handleDecode = () => {
        setError('');
        setDecodedHeader(null);
        setDecodedPayload(null);
        setCopiedSection('');

        if (!jwtInput.trim()) {
            setError("JWT input cannot be empty.");
            return;
        }

        const parts = jwtInput.split('.');
        if (parts.length !== 3) {
            setError("Invalid JWT structure. A JWT must have three parts separated by dots.");
            return;
        }

        try {
            const header = decodeJwtPart(parts[0]);
            const payload = decodeJwtPart(parts[1]);
            setDecodedHeader(header);
            setDecodedPayload(payload);
        } catch (e) {
            setError(e.message);
        }
    };

    const handleCopyToClipboard = async (data, sectionName) => {
        if (!data) return;
        try {
            await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
            setCopiedSection(sectionName);
            setTimeout(() => setCopiedSection(''), 2000);
        } catch (err) {
            console.error(`Failed to copy ${sectionName}: `, err);
            setError(`Failed to copy ${sectionName}.`);
        }
    };

    const handleClear = () => {
        setJwtInput('');
        setDecodedHeader(null);
        setDecodedPayload(null);
        setError('');
        setCopiedSection('');
    };

    const renderJsonOutput = (title, data, sectionKey) => {
        if (!data) return null;
        return (
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
                    <button onClick={() => handleCopyToClipboard(data, sectionKey)} title={`Copy ${title}`} className="p-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300">
                        {copiedSection === sectionKey ? <CheckCircleIcon className="h-5 w-5 text-green-500" /> : <ClipboardDocumentIcon className="h-5 w-5" />}
                    </button>
                </div>
                <pre className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 overflow-auto font-mono text-sm">
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>
        );
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">JWT Decoder</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
                <label htmlFor="jwt-input" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Encoded JWT</label>
                <textarea id="jwt-input" rows="6" value={jwtInput} onChange={(e) => setJwtInput(e.target.value)} placeholder="Paste your JWT here..." className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 resize-y font-mono text-sm" />
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button onClick={handleDecode} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">Decode JWT</button>
                    <button onClick={handleClear} className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 flex items-center"><TrashIcon className="h-5 w-5 mr-2" /> Clear</button>
                </div>
            </div>

            {error && <p className="my-4 text-sm text-red-500 dark:text-red-400 text-center">{error}</p>}

            {(decodedHeader || decodedPayload) && !error && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    {renderJsonOutput("Decoded Header", decodedHeader, "header")}
                    {renderJsonOutput("Decoded Payload", decodedPayload, "payload")}
                    <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">Note: Signature verification is not performed by this client-side decoder.</p>
                </div>
            )}
        </main>
    );
}