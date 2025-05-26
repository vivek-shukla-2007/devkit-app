import React, { useState } from 'react';
import { ClipboardDocumentIcon, CheckCircleIcon, ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline'; // Example icons

export default function CaseConverterPage() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [copied, setCopied] = useState(false);
    // const [message, setMessage] = useState(''); // Can be used for feedback

    const handleConvert = (caseType) => {
        // Basic conversion logic, can be expanded
        let result = inputText;
        switch (caseType) {
            case 'uppercase':
                result = inputText.toUpperCase();
                break;
            case 'lowercase':
                result = inputText.toLowerCase();
                break;
            case 'sentencecase':
                result = inputText.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
                break;
            case 'titlecase':
                result = inputText.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                break;
            // Add more cases: camelCase, PascalCase, snake_case, kebab-case
            default:
                break;
        }
        setOutputText(result);
        setCopied(false);
        // setMessage(`Converted to ${caseType}`);
    };

    const handleCopyToClipboard = async () => {
        if (!outputText) return;
        try {
            await navigator.clipboard.writeText(outputText);
            setCopied(true);
            // setMessage('Output copied to clipboard!');
            setTimeout(() => {
                setCopied(false);
                // setMessage('');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            // setMessage('Failed to copy text.');
        }
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Case Converter</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
                <div className="mb-3">
                    <label htmlFor="case-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Input Text:</label>
                    <textarea 
                        id="case-input" 
                        rows="5" 
                        value={inputText} 
                        onChange={(e) => setInputText(e.target.value)} 
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Enter text to convert..."
                    />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                    {/* Example conversion buttons - you'd have more */}
                    <button onClick={() => handleConvert('uppercase')} className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs sm:text-sm">UPPERCASE</button>
                    <button onClick={() => handleConvert('lowercase')} className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs sm:text-sm">lowercase</button>
                    <button onClick={() => handleConvert('sentencecase')} className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs sm:text-sm">Sentence case</button>
                    <button onClick={() => handleConvert('titlecase')} className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs sm:text-sm">Title Case</button>
                    {/* Add more buttons for camelCase, PascalCase, snake_case, kebab-case etc. */}
                </div>
                <div className="flex justify-end mb-4">
                    <button onClick={() => {setInputText(''); setOutputText(''); setCopied(false);}} className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 flex items-center text-sm">
                        <TrashIcon className="h-4 w-4 mr-1" /> Clear
                    </button>
                </div>
                {outputText && (
                    <div>
                        <label htmlFor="case-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Output Text:</label>
                        <div className="relative group">
                            <textarea 
                                id="case-output" 
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
                {/* {message && <p className={`mt-2 text-sm text-center ${copied ? 'text-green-500' : 'text-gray-600'}`}>{message}</p>} */}
            </div>
        </main>
    );
}
