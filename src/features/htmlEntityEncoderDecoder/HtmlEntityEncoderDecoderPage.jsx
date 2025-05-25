import React, { useState } from 'react';
import { ClipboardDocumentIcon, CheckCircleIcon, ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function HtmlEntityEncoderDecoderPage() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [operation, setOperation] = useState(''); // 'encode' or 'decode'
    const [copied, setCopied] = useState(false);
    const [message, setMessage] = useState('');

    const encodeEntities = (text) => {
        let encoded = text.replace(/&/g, '&amp;');
        encoded = encoded.replace(/</g, '&lt;');
        encoded = encoded.replace(/>/g, '&gt;');
        encoded = encoded.replace(/"/g, '&quot;');
        encoded = encoded.replace(/'/g, '&#39;'); // or &apos;
        // Optional: encode non-ASCII characters
        // encoded = encoded.replace(/[^\x00-\x7F]/g, char => `&#${char.charCodeAt(0)};`);
        return encoded;
    };

    const decodeEntities = (text) => {
        try {
            const textarea = document.createElement('textarea');
            textarea.innerHTML = text;
            return textarea.value;
        } catch (e) {
            console.error("Error decoding HTML entities:", e);
            setMessage("Error during decoding. Input might contain invalid sequences.");
            return text; // Return original text on error
        }
    };

    const handleEncode = () => {
        if (!inputText.trim()) {
            setMessage("Input cannot be empty.");
            setOutputText('');
            return;
        }
        setOutputText(encodeEntities(inputText));
        setOperation('Encoded');
        setMessage('Text successfully encoded.');
        setCopied(false);
    };

    const handleDecode = () => {
        if (!inputText.trim()) {
            setMessage("Input cannot be empty.");
            setOutputText('');
            return;
        }
        setOutputText(decodeEntities(inputText));
        setOperation('Decoded');
        setMessage('Text successfully decoded.');
        setCopied(false);
    };

    const handleCopyOutput = async () => {
        if (!outputText) {
            setMessage('Nothing to copy.');
            setCopied(false);
            return;
        }
        try {
            await navigator.clipboard.writeText(outputText);
            setMessage(`${operation} text copied to clipboard!`);
            setCopied(true);
            setTimeout(() => {
                setMessage(operation ? `Text successfully ${operation.toLowerCase()}.` : '');
                setCopied(false);
            }, 2500);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            setMessage('Failed to copy to clipboard.');
            setCopied(false);
        }
    };

    const handleClear = () => {
        setInputText('');
        setOutputText('');
        setOperation('');
        setMessage('');
        setCopied(false);
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">HTML Entity Encoder/Decoder</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Input Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
                    <label htmlFor="input-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Input Text</label>
                    <textarea
                        id="input-text"
                        rows="8"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 resize-y font-mono text-sm"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter text with entities or to be encoded..."
                    />
                </div>
                {/* Output Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
                    <label htmlFor="output-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {operation ? `${operation} Text` : 'Output Text'}
                    </label>
                    <textarea
                        id="output-text"
                        rows="8"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 resize-y font-mono text-sm"
                        value={outputText}
                        readOnly
                        placeholder="Result will appear here..."
                    />
                </div>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
                <button onClick={handleEncode} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 flex items-center"><ArrowPathIcon className="h-5 w-5 mr-2 transform rotate-90" /> Encode Entities</button>
                <button onClick={handleDecode} className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 flex items-center"><ArrowPathIcon className="h-5 w-5 mr-2 transform -rotate-90" /> Decode Entities</button>
                <button onClick={handleCopyOutput} disabled={!outputText} className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
                    {copied ? <CheckCircleIcon className="h-5 w-5 mr-2" /> : <ClipboardDocumentIcon className="h-5 w-5 mr-2" />} Copy Output
                </button>
                <button onClick={handleClear} className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 flex items-center"><TrashIcon className="h-5 w-5 mr-2" /> Clear</button>
            </div>
            {message && <p className={`mt-2 text-sm text-center ${copied ? 'text-green-500 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>{message}</p>}
        </main>
    );
}