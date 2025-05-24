import React, { useState } from 'react';
import { diffArrays, diffLines } from 'diff'; // Import diffArrays for side-by-side, diffLines for copy

function TextDiffPage() {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [diffOutput, setDiffOutput] = useState('');
    const [message, setMessage] = useState('');
    const [diffCalculated, setDiffCalculated] = useState(false);

    const calculateDiff = () => {
        setMessage('');
        setDiffCalculated(true);

        const oldLines = text1.split('\n');
        const newLines = text2.split('\n');
        const diffResult = diffArrays(oldLines, newLines);

        let finalLeftHtml = '';
        let finalRightHtml = '';

        diffResult.forEach(part => {
            const lines = part.value; // part.value is an array of strings (lines)
            lines.forEach(lineContent => {
                // Basic sanitization for display
                const sanitizedLine = lineContent.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                if (part.added) {
                    finalLeftHtml += `<div class="h-6 px-1 text-gray-400 dark:text-gray-500">&nbsp;</div>`; // Placeholder on left
                    finalRightHtml += `<div class="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 px-1 py-0.5"><span class="font-bold mr-1">+</span>${sanitizedLine}</div>`;
                } else if (part.removed) {
                    finalLeftHtml += `<div class="bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 px-1 py-0.5"><span class="font-bold mr-1">-</span>${sanitizedLine}</div>`;
                    finalRightHtml += `<div class="h-6 px-1 text-gray-400 dark:text-gray-500">&nbsp;</div>`; // Placeholder on right
                } else { // common
                    finalLeftHtml += `<div class="px-1 py-0.5"><span class="text-gray-400 dark:text-gray-500 mr-1">&nbsp;&nbsp;</span>${sanitizedLine}</div>`;
                    finalRightHtml += `<div class="px-1 py-0.5"><span class="text-gray-400 dark:text-gray-500 mr-1">&nbsp;&nbsp;</span>${sanitizedLine}</div>`;
                }
            });
        });

        const combinedHtml = `
            <div class="flex w-full">
                <div class="w-1/2 pr-1 border-r border-gray-300 dark:border-gray-600">${finalLeftHtml}</div>
                <div class="w-1/2 pl-1">${finalRightHtml}</div>
            </div>
        `;
        setDiffOutput(combinedHtml);
    };

    const getUnifiedDiffForCopy = () => {
        const differences = diffLines(text1, text2); // Use diffLines for unified patch format
        return differences.map(part => {
            const prefix = part.added ? '+ ' : part.removed ? '- ' : '  ';
            return part.value.split('\n').map((line, index, arr) => {
                if (index === arr.length - 1 && line === '' && part.value.endsWith('\n')) return prefix.trim() === '' ? '' : prefix.trim(); // Handle trailing newline for empty common lines
                return prefix + line;
            }).join('\n');
        }).join('\n').replace(/\n+$/, ''); // Remove trailing newlines from the whole diff
    };


    const clearFields = () => {
        setText1('');
        setText2('');
        setDiffOutput('');
        setMessage('');
        setDiffCalculated(false);
    };

    const copyToClipboard = async () => {
        if (diffCalculated && (text1 || text2)) { // Check if diff has been calculated and there's input
            const unifiedDiffText = getUnifiedDiffForCopy();
            try {
                await navigator.clipboard.writeText(unifiedDiffText);
                setMessage('Unified diff copied to clipboard!');
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
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Text Diff</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input Text 1 */}
                    <div>
                        <label htmlFor="text1-input" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Original Text</label>
                        <textarea
                            id="text1-input"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-yellow-500 focus:border-yellow-500 h-64 resize-y font-mono text-sm"
                            placeholder="Enter the first text snippet here..."
                            value={text1}
                            onChange={(e) => setText1(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Input Text 2 */}
                    <div>
                        <label htmlFor="text2-input" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Modified Text</label>
                        <textarea
                            id="text2-input"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-yellow-500 focus:border-yellow-500 h-64 resize-y font-mono text-sm"
                            placeholder="Enter the second text snippet here..."
                            value={text2}
                            onChange={(e) => setText2(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={calculateDiff}
                        className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                    >
                        <i className="fas fa-exchange-alt mr-2"></i> Compare
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

                {/* Output Section */}
                <div className="mt-6">
                    <label htmlFor="diff-output" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Differences</label>
                    <div // Changed from <pre> to <div> to allow flex layout for side-by-side
                        id="diff-output"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-64 overflow-auto font-mono text-sm whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: diffOutput }}
                    ></div>
                    {/* Fallback or message if diffOutput is empty and not an error */}
                    {!diffCalculated && !message && <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Enter text in both fields and click 'Compare' to see differences.</p>}
                    {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
                </div>
            </div>
        </main>
    );
}

export default TextDiffPage;