import React, { useState } from 'react';

function UrlEncoderDecoderPage() {
    const [inputUrl, setInputUrl] = useState('');
    const [outputUrl, setOutputUrl] = useState('');
    const [message, setMessage] = useState('');

    const encodeUrl = () => {
        setMessage('');
        try {
            setOutputUrl(encodeURIComponent(inputUrl));
        } catch (e) {
            setOutputUrl(`Error encoding: ${e.message}`);
        }
    };

    const decodeUrl = () => {
        setMessage('');
        try {
            setOutputUrl(decodeURIComponent(inputUrl));
        } catch (e) {
            setOutputUrl(`Error decoding: ${e.message}`);
        }
    };

    const clearFields = () => {
        setInputUrl('');
        setOutputUrl('');
        setMessage('');
    };

    const copyToClipboard = async () => {
        if (outputUrl) {
            try {
                await navigator.clipboard.writeText(outputUrl);
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
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">URL Encoder/Decoder</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input URL */}
                    <div>
                        <label htmlFor="url-input" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Input URL/String</label>
                        <textarea
                            id="url-input"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-orange-500 focus:border-orange-500 h-64 resize-y font-mono text-sm"
                            placeholder="Enter the URL or string to encode/decode..."
                            value={inputUrl}
                            onChange={(e) => setInputUrl(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Output URL */}
                    <div>
                        <label htmlFor="url-output" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Output</label>
                        <textarea
                            id="url-output"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-64 resize-y font-mono text-sm"
                            value={outputUrl}
                            readOnly
                            placeholder="Encoded/Decoded output will appear here..."
                        ></textarea>
                        {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={encodeUrl}
                        className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                    >
                        <i className="fas fa-link mr-2"></i> Encode URL
                    </button>
                    <button
                        onClick={decodeUrl}
                        className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                    >
                        <i className="fas fa-unlink mr-2"></i> Decode URL
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

export default UrlEncoderDecoderPage;