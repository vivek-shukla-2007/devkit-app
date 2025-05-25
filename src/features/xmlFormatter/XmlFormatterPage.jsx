import React, { useState } from 'react';
import { ClipboardDocumentIcon, CheckCircleIcon, ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function XmlFormatterPage() {
    const [xmlInput, setXmlInput] = useState('');
    const [formattedXml, setFormattedXml] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const [message, setMessage] = useState('');

    const prettyPrintXML = (xmlString) => {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "application/xml");

            // Check for parsing errors
            const parserError = xmlDoc.getElementsByTagName("parsererror");
            if (parserError.length > 0) {
                throw new Error(parserError[0].textContent || "Invalid XML structure.");
            }

            const xsltDoc = parser.parseFromString([
                '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
                '  <xsl:output method="xml" indent="yes" encoding="UTF-8"/>',
                '  <xsl:strip-space elements="*"/>',
                '  <xsl:template match="/">',
                '    <xsl:copy-of select="."/>',
                '  </xsl:template>',
                '</xsl:stylesheet>',
            ].join('\n'), "application/xml");

            const xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsltDoc);
            const resultDoc = xsltProcessor.transformToDocument(xmlDoc);

            const serializer = new XMLSerializer();
            return serializer.serializeToString(resultDoc);

        } catch (e) {
            console.error("XML Formatting Error:", e);
            setError(`Formatting Error: ${e.message}`);
            return null;
        }
    };

    const handleFormat = () => {
        if (!xmlInput.trim()) {
            setError("Input XML cannot be empty.");
            setFormattedXml('');
            return;
        }
        setError('');
        setMessage('');
        const result = prettyPrintXML(xmlInput);
        if (result) {
            setFormattedXml(result);
            setMessage('XML successfully formatted.');
        } else {
            setFormattedXml(''); // Clear previous output on error
        }
        setCopied(false);
    };

    const handleCopyOutput = async () => {
        if (!formattedXml) {
            setMessage('Nothing to copy.');
            setCopied(false);
            return;
        }
        try {
            await navigator.clipboard.writeText(formattedXml);
            setMessage('Formatted XML copied to clipboard!');
            setCopied(true);
            setTimeout(() => {
                setMessage('XML successfully formatted.');
                setCopied(false);
            }, 2500);
        } catch (err) {
            setMessage('Failed to copy to clipboard.');
            setCopied(false);
        }
    };

    const handleClear = () => {
        setXmlInput('');
        setFormattedXml('');
        setError('');
        setMessage('');
        setCopied(false);
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">XML Formatter</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
                <label htmlFor="xml-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Input XML</label>
                <textarea id="xml-input" rows="10" value={xmlInput} onChange={(e) => setXmlInput(e.target.value)} placeholder="Paste your XML here..." className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 resize-y font-mono text-sm" />
                {error && <p className="mt-2 text-sm text-red-500 dark:text-red-400">{error}</p>}
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                    <button onClick={handleFormat} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 flex items-center"><ArrowPathIcon className="h-5 w-5 mr-2" /> Format XML</button>
                    <button onClick={handleCopyOutput} disabled={!formattedXml || !!error} className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed">{copied ? <CheckCircleIcon className="h-5 w-5 mr-2" /> : <ClipboardDocumentIcon className="h-5 w-5 mr-2" />} Copy Formatted</button>
                    <button onClick={handleClear} className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 flex items-center"><TrashIcon className="h-5 w-5 mr-2" /> Clear</button>
                </div>
            </div>
            {formattedXml && !error && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
                    <label htmlFor="xml-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Formatted XML</label>
                    <pre id="xml-output" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-80 md:h-96 overflow-auto font-mono text-sm">{formattedXml}</pre>
                </div>
            )}
            {message && <p className={`mt-2 text-sm text-center ${copied ? 'text-green-500 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>{message}</p>}
        </main>
    );
}