import React, { useState, useEffect } from 'react';
import MarkdownIt from 'markdown-it'; // Import from npm package

function MarkdownPreviewerPage() {
    const [markdownInput, setMarkdownInput] = useState('');
    const [htmlOutput, setHtmlOutput] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Initialize MarkdownIt instance once
        // You can pass options to MarkdownIt constructor if needed, e.g., new MarkdownIt({ html: true })
        const md = new MarkdownIt();
        try {
            setHtmlOutput(md.render(markdownInput));
            setMessage(''); // Clear any previous message
        } catch (error) {
            console.error("Error rendering Markdown:", error);
            setHtmlOutput("<p>Error rendering Markdown. Please check your input.</p>");
            setMessage('Error rendering Markdown.');
        }
    }, [markdownInput]); // Re-render HTML whenever markdownInput changes

    const clearFields = () => {
        setMarkdownInput('');
        setHtmlOutput('');
        setMessage('');
    };

    const copyToClipboard = async () => {
        if (htmlOutput) {
            try {
                await navigator.clipboard.writeText(htmlOutput);
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
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Markdown Previewer</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input Markdown */}
                    <div>
                        <label htmlFor="markdown-input" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Input Markdown</label>
                        <textarea
                            id="markdown-input"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-gray-500 focus:border-gray-500 h-64 resize-y font-mono text-sm"
                            placeholder={`# Hello DevKit!\nThis is **Markdown**.\n- Item 1\n- Item 2`}
                            value={markdownInput}
                            onChange={(e) => setMarkdownInput(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Output HTML */}
                    <div>
                        <label htmlFor="html-output" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Rendered HTML</label>
                        <div
                            id="html-output"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-64 overflow-auto font-sans text-base"
                            dangerouslySetInnerHTML={{ __html: htmlOutput }}
                        ></div>
                        {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={copyToClipboard}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                    >
                        <i className="fas fa-copy mr-2"></i> Copy HTML
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

export default MarkdownPreviewerPage;