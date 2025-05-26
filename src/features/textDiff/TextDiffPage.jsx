import React, { useState } from 'react';
import { ArrowsRightLeftIcon, TrashIcon } from '@heroicons/react/24/outline'; // Example icon
// You would typically use a library like 'diff' or 'diff-match-patch'
// For this example, we'll do a very basic line-by-line comparison placeholder

export default function TextDiffPage() {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [diffResult, setDiffResult] = useState('Differences will be shown here.');

    // Placeholder for actual diff logic
    const handleCompare = () => {
        // This is a very simplified diff. A real implementation would use a proper diff library.
        if (text1 === text2) {
            setDiffResult("Texts are identical.");
            return;
        }
        
        const lines1 = text1.split('\n');
        const lines2 = text2.split('\n');
        let result = '';
        const maxLength = Math.max(lines1.length, lines2.length);

        for (let i = 0; i < maxLength; i++) {
            if (lines1[i] !== lines2[i]) {
                result += `Line ${i + 1}:\n`;
                result += `- ${lines1[i] || '(empty)'}\n`;
                result += `+ ${lines2[i] || '(empty)'}\n\n`;
            }
        }
        setDiffResult(result || "No textual differences found on a line-by-line basis (could be whitespace or identical).");
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Text Difference Checker</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="text-input-1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Text 1:</label>
                        <textarea 
                            id="text-input-1" 
                            rows="8" 
                            value={text1} 
                            onChange={(e) => setText1(e.target.value)} 
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="text-input-2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Text 2:</label>
                        <textarea 
                            id="text-input-2" 
                            rows="8" 
                            value={text2} 
                            onChange={(e) => setText2(e.target.value)} 
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                    <button onClick={handleCompare} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 flex items-center">
                        <ArrowsRightLeftIcon className="h-5 w-5 mr-2" /> Compare Texts
                    </button>
                    <button onClick={() => {setText1(''); setText2(''); setDiffResult('Differences will be shown here.');}} className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 flex items-center">
                        <TrashIcon className="h-5 w-5 mr-2" /> Clear
                    </button>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="text-base font-medium mb-2 text-gray-700 dark:text-gray-300">Differences:</h3>
                <pre className="whitespace-pre-wrap text-sm p-2 bg-gray-50 dark:bg-gray-700 rounded-lg overflow-auto h-60">{diffResult}</pre>
            </div>
        </main>
    );
}
