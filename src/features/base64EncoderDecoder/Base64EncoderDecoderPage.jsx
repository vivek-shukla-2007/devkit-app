import React, { useState } from 'react';

function Base64EncoderDecoderPage() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const encodeBase64 = () => {
        setMessage('');
        setError('');
        try {
            setOutputText(btoa(inputText));
        } catch (e) {
            setError(`Error encoding: ${e.message}`);
            setOutputText('');
        }
    };

    const decodeBase64 = () => {
        setMessage('');
        setError('');
        try {
            setOutputText(atob(inputText));
        } catch (e) {
            setError(`Error decoding: ${e.message}. Input might not be valid Base64.`);
            setOutputText('');
        }
    };

    const clearFields = () => {
        setInputText('');
        setOutputText('');
        setError('');
        setMessage('');
    };

    const copyToClipboard = async () => {
        if (outputText) {
            try {
                await navigator.clipboard.writeText(outputText);
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
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Base64 Encoder/Decoder</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input Text */}
                    <div>
                        <label htmlFor="base64-input" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Input Text/Base64</label>
                        <textarea
                            id="base64-input"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-pink-500 focus:border-pink-500 h-64 resize-y font-mono text-sm"
                            placeholder="Enter text or Base64 string to encode/decode..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Output Text */}
                    <div>
                        <label htmlFor="base64-output" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Output</label>
                        <textarea
                            id="base64-output"
                            className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-64 resize-y font-mono text-sm ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                            value={outputText}
                            readOnly
                            placeholder="Encoded/Decoded output will appear here..."
                        ></textarea>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={encodeBase64}
                        className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                    >
                        <i className="fas fa-lock mr-2"></i> Encode Base64
                    </button>
                    <button
                        onClick={decodeBase64}
                        className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                    >
                        <i className="fas fa-unlock mr-2"></i> Decode Base64
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

export default Base64EncoderDecoderPage;