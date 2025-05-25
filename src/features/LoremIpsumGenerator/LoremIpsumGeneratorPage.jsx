import React, { useState } from 'react';
import { ClipboardDocumentIcon, CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const loremIpsumText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?";

export default function LoremIpsumGeneratorPage() {
    const [numParagraphs, setNumParagraphs] = useState(3);
    const [generatedText, setGeneratedText] = useState('');
    const [copied, setCopied] = useState(false);
    const [message, setMessage] = useState('');

    const generateText = () => {
        if (numParagraphs <= 0) {
            setMessage("Number of paragraphs must be greater than 0.");
            setGeneratedText('');
            return;
        }
        // Simple generation: repeat sections of the lorem ipsum text
        // For more variety, one could split the base text into sentences and shuffle/select them.
        const baseParagraphs = loremIpsumText.split(/\.\s+/); // Split by sentences ending with a period and space
        let output = [];
        for (let i = 0; i < numParagraphs; i++) {
            // Create paragraphs by joining a few sentences.
            // This is a basic approach; more sophisticated generation would be needed for true "unique" paragraphs.
            let paragraphSentences = [];
            for(let j=0; j < 3 + Math.floor(Math.random() * 3) ; j++) { // 3-5 sentences per paragraph
                 paragraphSentences.push(baseParagraphs[Math.floor(Math.random() * baseParagraphs.length)]);
            }
            output.push(paragraphSentences.join(". ") + ".");
        }
        setGeneratedText(output.join('\n\n'));
        setMessage(`${numParagraphs} paragraph(s) of Lorem Ipsum generated.`);
        setCopied(false);
    };

    const handleCopyToClipboard = async () => {
        if (!generatedText) {
            setMessage('Nothing to copy.');
            return;
        }
        try {
            await navigator.clipboard.writeText(generatedText);
            setCopied(true);
            setMessage('Lorem Ipsum text copied to clipboard!');
            setTimeout(() => {
                setCopied(false);
                if(generatedText) setMessage(`${numParagraphs} paragraph(s) of Lorem Ipsum generated.`);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            setMessage('Failed to copy text.');
        }
    };

    // Generate initial text on load
    useState(() => {
        generateText();
    }, []);

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Lorem Ipsum Generator</h2>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
                <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
                    <label htmlFor="num-paragraphs" className="text-lg font-medium text-gray-700 dark:text-gray-300">Number of Paragraphs:</label>
                    <input
                        type="number"
                        id="num-paragraphs"
                        value={numParagraphs}
                        onChange={(e) => setNumParagraphs(Math.max(1, parseInt(e.target.value, 10) || 1))}
                        min="1"
                        className="w-24 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button onClick={generateText} className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 flex items-center"><ArrowPathIcon className="h-5 w-5 mr-2" /> Generate</button>
                </div>

                {generatedText && (
                    <div className="mb-4">
                        <label htmlFor="lorem-output" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Generated Text:</label>
                        <textarea
                            id="lorem-output"
                            rows="12"
                            readOnly
                            value={generatedText}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-y font-serif text-base"
                        />
                    </div>
                )}
                <div className="mt-6 flex justify-center">
                    <button onClick={handleCopyToClipboard} disabled={!generatedText} className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
                        {copied ? <CheckCircleIcon className="h-5 w-5 mr-2" /> : <ClipboardDocumentIcon className="h-5 w-5 mr-2" />} Copy Text
                    </button>
                </div>
                 {message && <p className={`mt-4 text-sm text-center ${copied ? 'text-green-500 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>{message}</p>}
            </div>
        </main>
    );
}