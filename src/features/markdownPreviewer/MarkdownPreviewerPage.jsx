// Assuming this file exists and has a similar structure
import React, { useState, useEffect } from 'react';
import { ClipboardDocumentIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
// You might be using a library like markdown-it or marked
// For this example, let's assume a simple setup

export default function MarkdownPreviewerPage() {
    const [markdownInput, setMarkdownInput] = useState('## Hello DevKit!\n\nThis is **Markdown**.\n\n*   List item 1\n*   List item 2\n\n```javascript\nconsole.log("Hello from Markdown!");\n```');
    const [htmlOutput, setHtmlOutput] = useState('');
    const [message, setMessage] = useState('');

    // Placeholder for markdown rendering logic (you'd use a library here)
    useEffect(() => {
        // Simulating markdown to HTML conversion
        // In a real app, use a library like markdown-it or marked.js
        // Example: const md = window.markdownit(); setHtmlOutput(md.render(markdownInput));
        // Basic simulation:
        let tempHtml = markdownInput
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/```javascript\n([\s\S]*?)\n```/g, '<pre><code class="language-javascript">$1</code></pre>')
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            .replace(/^\* (.*$)/gim, '<li>$1</li>')
            .replace(/\n/g, '<br/>');
        // Crude list handling
        tempHtml = tempHtml.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>').replace(/<\/ul><br\/><ul>/g, '');


        setHtmlOutput(tempHtml);
    }, [markdownInput]);

    const clearFields = () => {
        setMarkdownInput('');
        setHtmlOutput('');
        setMessage('');
    };

    const copyToClipboard = async () => {
        if (htmlOutput) {
            try {
                await navigator.clipboard.writeText(htmlOutput);
                setMessage('HTML Output copied to clipboard!');
                setTimeout(() => setMessage(''), 2000);
            } catch (err) {
                console.error('Failed to copy HTML: ', err);
                setMessage('Failed to copy HTML.');
            }
        } else {
            setMessage('Nothing to copy.');
        }
    };


    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Markdown Previewer</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="markdown-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Input Markdown</label>
                        <textarea
                            id="markdown-input"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 h-64 resize-y font-mono text-sm"
                            placeholder="## Hello DevKit!\nThis is **Markdown**."
                            value={markdownInput}
                            onChange={(e) => setMarkdownInput(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="html-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rendered HTML (Preview)</label>
                        <div
                            id="html-output"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-64 overflow-auto font-sans text-sm prose dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: htmlOutput }}
                        ></div>
                    </div>
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                    <button onClick={copyToClipboard} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 flex items-center">
                        <ClipboardDocumentIcon className="h-5 w-5 mr-2" /> Copy HTML
                    </button>
                    <button onClick={clearFields} className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 flex items-center">
                        <TrashIcon className="h-5 w-5 mr-2" /> Clear
                    </button>
                </div>
                {message && <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">{message}</p>}
            </div>
        </main>
    );
}
