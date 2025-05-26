import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, InformationCircleIcon, TrashIcon } from '@heroicons/react/24/outline'; // Example icons

export default function RegexTesterPage() {
    const [regexInput, setRegexInput] = useState('');
    const [testString, setTestString] = useState('');
    const [matches, setMatches] = useState([]);
    // const [error, setError] = useState(''); // For RegEx syntax errors

    useEffect(() => {
        if (!regexInput || !testString) {
            setMatches([]);
            return;
        }
        try {
            // Attempt to create a RegExp object. This will throw an error for invalid syntax.
            const regex = new RegExp(regexInput, 'g'); // 'g' for global search
            const currentMatches = [];
            let match;
            while ((match = regex.exec(testString)) !== null) {
                currentMatches.push(match[0]); // Store the matched string
            }
            setMatches(currentMatches);
            // setError('');
        } catch (e) {
            // setError(`Invalid RegEx: ${e.message}`);
            setMatches([]); // Clear matches on error
        }
    }, [regexInput, testString]);

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">RegEx Tester</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
                <div className="mb-3">
                    <label htmlFor="regex-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Regular Expression:</label>
                    <input 
                        type="text" 
                        id="regex-input" 
                        value={regexInput} 
                        onChange={(e) => setRegexInput(e.target.value)} 
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg font-mono bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 text-sm" 
                        placeholder="/your-regex/flags"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="test-string" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Test String:</label>
                    <textarea 
                        id="test-string" 
                        rows="5" 
                        value={testString} 
                        onChange={(e) => setTestString(e.target.value)} 
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Enter string to test against..."
                    />
                </div>
                <div className="mt-4 flex justify-end">
                     <button onClick={() => {setRegexInput(''); setTestString(''); setMatches([]);}} className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 flex items-center text-sm">
                        <TrashIcon className="h-4 w-4 mr-1" /> Clear Fields
                    </button>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <h3 className="text-base font-medium mb-2 text-gray-700 dark:text-gray-300">Matches:</h3>
                    {matches.length > 0 ? (
                        <ul className="list-disc pl-5 text-sm">
                            {matches.map((match, index) => <li key={index}>{typeof match === 'string' ? match : JSON.stringify(match)}</li>)}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">No matches found or invalid RegEx.</p>
                    )}
                </div>
            </div>
        </main>
    );
}
