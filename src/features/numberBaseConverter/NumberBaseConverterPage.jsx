import React, { useState } from 'react';
import { ArrowPathIcon, ClipboardDocumentIcon, CheckCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

const bases = [
    { label: 'Binary (Base 2)', value: 2, example: '101101' },
    { label: 'Octal (Base 8)', value: 8, example: '55' },
    { label: 'Decimal (Base 10)', value: 10, example: '45' },
    { label: 'Hexadecimal (Base 16)', value: 16, example: '2D' },
];

export default function NumberBaseConverterPage() {
    const [inputValue, setInputValue] = useState('');
    const [fromBase, setFromBase] = useState(10);
    const [toBase, setToBase] = useState(16);
    const [outputValue, setOutputValue] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const isValidForBase = (value, base) => {
        if (base < 2 || base > 36) return false; // Standard range for parseInt/toString
        const validChars = '0123456789abcdefghijklmnopqrstuvwxyz'.substring(0, base);
        const regex = new RegExp(`^[${validChars}]+$`, 'i');
        return regex.test(value);
    };

    const handleConvert = () => {
        setError('');
        setCopied(false);
        if (!inputValue.trim()) {
            setError("Input value cannot be empty.");
            setOutputValue('');
            return;
        }
        if (!isValidForBase(inputValue, fromBase)) {
            setError(`Input value "${inputValue}" is not valid for base ${fromBase}.`);
            setOutputValue('');
            return;
        }

        try {
            const decimalValue = parseInt(inputValue, fromBase);
            if (isNaN(decimalValue)) {
                throw new Error("Invalid input for the selected base.");
            }
            setOutputValue(decimalValue.toString(toBase).toUpperCase());
        } catch (e) {
            setError(e.message);
            setOutputValue('');
        }
    };

    const handleCopyToClipboard = async () => {
        if (!outputValue) return;
        try {
            await navigator.clipboard.writeText(outputValue);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            setError('Failed to copy output.');
        }
    };

    const handleClear = () => {
        setInputValue('');
        setOutputValue('');
        setError('');
        setCopied(false);
        // Optionally reset bases to default
        // setFromBase(10);
        // setToBase(16);
    };

    const renderBaseSelect = (id, value, onChange, label) => (
        <div className="flex-1">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
            <select id={id} value={value} onChange={onChange} className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500">
                {bases.map(base => <option key={base.value} value={base.value}>{base.label}</option>)}
            </select>
        </div>
    );

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Number Base Converter</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6 border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
                <div className="mb-4">
                    <label htmlFor="input-value" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Input Value</label>
                    <input type="text" id="input-value" value={inputValue} onChange={(e) => setInputValue(e.target.value.toLowerCase())} placeholder={`e.g. ${bases.find(b => b.value === fromBase)?.example || '101'}`} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm" />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    {renderBaseSelect("from-base", fromBase, (e) => setFromBase(parseInt(e.target.value)), "From Base")}
                    <div className="flex items-end justify-center sm:pt-6">
                        <button onClick={() => { const temp = fromBase; setFromBase(toBase); setToBase(temp); handleConvert(); }} title="Swap Bases" className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                            <ArrowPathIcon className="h-6 w-6 transform transition-transform duration-300 hover:rotate-180" />
                        </button>
                    </div>
                    {renderBaseSelect("to-base", toBase, (e) => setToBase(parseInt(e.target.value)), "To Base")}
                </div>
                <div className="flex justify-center mb-4">
                    <button onClick={handleConvert} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">Convert</button>
                </div>
                {error && <p className="mb-3 text-sm text-red-500 dark:text-red-400 text-center">{error}</p>}
                {outputValue && !error && (
                    <div className="mb-4">
                        <label htmlFor="output-value" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Converted Value</label>
                        <div className="flex rounded-md shadow-sm">
                            <input type="text" id="output-value" value={outputValue} readOnly className="flex-1 block w-full min-w-0 rounded-none rounded-l-md p-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-blue-500 focus:border-blue-500" />
                            <button onClick={handleCopyToClipboard} className="inline-flex items-center px-2.5 rounded-r-md border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600">
                                {copied ? <CheckCircleIcon className="h-5 w-5 text-green-500" /> : <ClipboardDocumentIcon className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                )}
                 <div className="mt-4 flex justify-end">
                    <button onClick={handleClear} className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 flex items-center text-sm"><TrashIcon className="h-4 w-4 mr-1" /> Clear</button>
                </div>
            </div>
        </main>
    );
}