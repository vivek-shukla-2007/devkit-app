import React, { useState } from 'react';

function RegexTesterPage() {
    const [regexPattern, setRegexPattern] = useState('');
    const [testString, setTestString] = useState('');
    const [matchResult, setMatchResult] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const testRegex = () => {
        setMessage('');
        setError('');
        if (!regexPattern) {
            setError('Please enter a RegEx pattern.');
            setMatchResult('');
            return;
        }

        try {
            // Remove leading/trailing slashes if present, and extract flags
            let pattern = regexPattern;
            let flags = '';
            const lastSlash = pattern.lastIndexOf('/');
            if (pattern.startsWith('/') && lastSlash > 0) {
                flags = pattern.substring(lastSlash + 1);
                pattern = pattern.substring(1, lastSlash);
            }

            const regex = new RegExp(pattern, flags);
            const matches = testString.match(regex);

            if (matches) {
                setMatchResult(`Matches found: ${matches.length}\n\n${matches.join('\n')}`);
            } else {
                setMatchResult('No matches found.');
            }
        } catch (e) {
            setError(`Invalid RegEx: ${e.message}`);
            setMatchResult('');
        }
    };

    const clearFields = () => {
        setRegexPattern('');
        setTestString('');
        setMatchResult('');
        setError('');
        setMessage('');
    };

    const copyToClipboard = async () => {
        if (matchResult) {
            try {
                await navigator.clipboard.writeText(matchResult);
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
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">RegEx Tester</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input Section */}
                    <div>
                        <label htmlFor="regex-pattern" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">RegEx Pattern</label>
                        <input
                            type="text"
                            id="regex-pattern"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 font-mono text-sm"
                            placeholder="e.g., /abc/gi or ^\d{3}$"
                            value={regexPattern}
                            onChange={(e) => setRegexPattern(e.target.value)}
                        />
                        <label htmlFor="test-string" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2 mt-4">Test String</label>
                        <textarea
                            id="test-string"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-red-500 focus:border-red-500 h-40 resize-y font-mono text-sm"
                            placeholder="Enter text to test against the RegEx pattern..."
                            value={testString}
                            onChange={(e) => setTestString(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Output Section */}
                    <div>
                        <label htmlFor="match-result" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Match Result</label>
                        <textarea
                            id="match-result"
                            className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-64 resize-y font-mono text-sm ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                            value={matchResult}
                            readOnly
                            placeholder="Matching results will appear here..."
                        ></textarea>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={testRegex}
                        className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                    >
                        <i className="fas fa-play mr-2"></i> Test RegEx
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                    >
                        <i className="fas fa-copy mr-2"></i> Copy Result
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

export default RegexTesterPage;