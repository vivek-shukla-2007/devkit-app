import React, { useState } from 'react';
import { LinkIcon, ClipboardDocumentIcon, CheckCircleIcon, ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline'; // Example icons

export default function UrlEncoderDecoderPage() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [copied, setCopied] = useState(false);
    const [message, setMessage] = useState(''); // For feedback

    const handleEncode = () => {
        if (!inputText.trim()) {
            setMessage("Input cannot be empty for encoding.");
            setOutputText('');
            return;
        }
        try {
            setOutputText(encodeURIComponent(inputText));
            setMessage('String successfully URL encoded.');
        } catch (e) {
            setMessage('Error during URL encoding.');
            setOutputText('');
        }
        setCopied(false);
    };

    const handleDecode = () => {
        if (!inputText.trim()) {
            setMessage("Input cannot be empty for decoding.");
            setOutputText('');
            return;
        }
        try {
            setOutputText(decodeURIComponent(inputText));
            setMessage('String successfully URL decoded.');
        } catch (e) {
            // This can happen if the input string is not a valid URI component (e.g., contains loose % signs)
            setMessage('Error during URL decoding. Ensure input is valid URL encoded string.');
            setOutputText('');
        }
        setCopied(false);
    };

    const handleCopyToClipboard = async () => {
        if (!outputText) {
            setMessage('Nothing to copy.');
            return;
        }
        try {
            await navigator.clipboard.writeText(outputText);
            setCopied(true);
            setMessage('Output copied to clipboard!');
            setTimeout(() => {
                setCopied(false);
                setMessage(outputText ? 'Last operation successful.' : ''); // Reset message
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            setMessage('Failed to copy text.');
        }
    };

    const handleClear = () => {
        setInputText('');
        setOutputText('');
        setCopied(false);
        setMessage('');
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">URL Encoder / Decoder</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
                <div className="mb-3">
                    <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Input String:</label>
                    <textarea 
                        id="url-input" 
                        rows="5" 
                        value={inputText} 
                        onChange={(e) => setInputText(e.target.value)} 
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Enter URL or string to encode/decode..."
                    />
                </div>
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                    <button onClick={handleEncode} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 flex items-center">Encode</button>
                    <button onClick={handleDecode} className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 flex items-center">Decode</button>
                    <button onClick={handleClear} className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 flex items-center">
                        <TrashIcon className="h-5 w-5 mr-2" /> Clear
                    </button>
                </div>
                {outputText && (
                    <div>
                        <label htmlFor="url-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Output String:</label>
                        <div className="relative group">
                            <textarea 
                                id="url-output" 
                                rows="5" 
                                readOnly 
                                value={outputText} 
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-100 text-sm"
                            />
                            <button onClick={handleCopyToClipboard} title="Copy Output" className="absolute top-1 right-1 p-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                {copied ? <CheckCircleIcon className="h-5 w-5 text-green-500" /> : <ClipboardDocumentIcon className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                )}
                {message && <p className={`mt-2 text-sm text-center ${copied ? 'text-green-500 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>{message}</p>}
            </div>
        </main>
    );
}
