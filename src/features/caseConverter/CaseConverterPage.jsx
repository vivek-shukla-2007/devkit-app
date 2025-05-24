import React, { useState } from 'react';
import { ClipboardDocumentIcon, CheckCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function CaseConverterPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  const toCamelCase = (str) => str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  const toPascalCase = (str) => {
    const camel = toCamelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
  };
  const toSnakeCase = (str) => str.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
  const toKebabCase = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const toTitleCase = (str) => str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const conversions = [
    { name: 'camelCase', func: toCamelCase },
    { name: 'PascalCase', func: toPascalCase },
    { name: 'snake_case', func: toSnakeCase },
    { name: 'kebab-case', func: toKebabCase },
    { name: 'Title Case', func: toTitleCase },
    { name: 'UPPERCASE', func: (str) => str.toUpperCase() },
    { name: 'lowercase', func: (str) => str.toLowerCase() },
  ];

  const handleConvert = (conversionFunc) => {
    setOutputText(conversionFunc(inputText));
  };

  const handleCopyToClipboard = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => console.error('Failed to copy: ', err));
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setCopied(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">Case Converter</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Input Text</label>
          <textarea
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to convert..."
            className="w-full h-48 p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-y"
          />
        </div>
        <div>
          <label htmlFor="outputText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Output Text</label>
          <div className="relative">
            <textarea
              id="outputText"
              value={outputText}
              readOnly
              placeholder="Converted text will appear here..."
              className="w-full h-48 p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-y"
            />
            {outputText && (
              <button
                onClick={handleCopyToClipboard}
                title="Copy to Clipboard"
                className="absolute top-2 right-2 p-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md text-gray-600 dark:text-gray-300"
              >
                {copied ? <CheckCircleIcon className="h-5 w-5 text-green-500" /> : <ClipboardDocumentIcon className="h-5 w-5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">Convert to:</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {conversions.map(conv => (
            <button
              key={conv.name}
              onClick={() => handleConvert(conv.func)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-150 text-sm"
            >
              {conv.name}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button 
          onClick={handleClear} 
          className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-150 flex items-center mx-auto"
        >
          <TrashIcon className="h-5 w-5 mr-2" /> Clear Fields
        </button>
      </div>
    </div>
  );
}