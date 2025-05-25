import React, { useState } from 'react';
import jsyaml from 'js-yaml'; // For YAML parsing and validation
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon, TrashIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function YamlValidatorPage() {
    const [yamlInput, setYamlInput] = useState('');
    const [validationResult, setValidationResult] = useState(null); // null, 'valid', or 'invalid'
    const [errorMessage, setErrorMessage] = useState('');

    const handleValidate = () => {
        if (!yamlInput.trim()) {
            setValidationResult(null);
            setErrorMessage("Input YAML cannot be empty.");
            return;
        }
        try {
            jsyaml.load(yamlInput); // js-yaml.load will throw an error on invalid YAML
            setValidationResult('valid');
            setErrorMessage('YAML is valid!');
        } catch (e) {
            setValidationResult('invalid');
            setErrorMessage(`Invalid YAML: ${e.message}`);
            console.error("YAML Validation Error:", e);
        }
    };

    const handleClear = () => {
        setYamlInput('');
        setValidationResult(null);
        setErrorMessage('');
    };

    const loadSampleYaml = () => {
        const sample = `
name: DevKit YAML Sample
version: 1.0
description: A sample YAML document for demonstration.

settings:
  theme: dark
  indentation: 2
  features:
    - validator
    - formatter (coming soon!)

data_points:
  - id: 1
    value: "Example A"
  - id: 2
    value: "Example B"
`;
        setYamlInput(sample.trim());
        setValidationResult(null); // Clear previous validation
        setErrorMessage('Sample YAML loaded. Click "Validate YAML" to check it.');
    };

    const getStatusColor = () => {
        if (validationResult === 'valid') return 'text-green-500 dark:text-green-400';
        if (validationResult === 'invalid') return 'text-red-500 dark:text-red-400';
        return 'text-gray-600 dark:text-gray-400';
    };

    const StatusIcon = () => {
        if (validationResult === 'valid') return <CheckCircleIcon className="h-6 w-6 mr-2 text-green-500" />;
        if (validationResult === 'invalid') return <XCircleIcon className="h-6 w-6 mr-2 text-red-500" />;
        return null;
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">YAML Validator</h2>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
                <label htmlFor="yaml-input" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Input YAML</label>
                <textarea
                    id="yaml-input"
                    rows="15"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 resize-y font-mono text-sm"
                    value={yamlInput}
                    onChange={(e) => {
                        setYamlInput(e.target.value);
                        setValidationResult(null); // Clear validation on input change
                        setErrorMessage('');
                    }}
                    placeholder="Paste your YAML here..."
                />

                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button onClick={handleValidate} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 flex items-center"><ArrowPathIcon className="h-5 w-5 mr-2" /> Validate YAML</button>
                    <button onClick={loadSampleYaml} className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 flex items-center">
                        <DocumentTextIcon className="h-5 w-5 mr-2" /> Load Sample
                    </button>
                    <button onClick={handleClear} className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 flex items-center"><TrashIcon className="h-5 w-5 mr-2" /> Clear</button>
                </div>
            </div>

            {errorMessage && (
                <div className={`mt-4 p-4 rounded-md flex items-center ${validationResult === 'valid' ? 'bg-green-100 dark:bg-green-900' : validationResult === 'invalid' ? 'bg-red-100 dark:bg-red-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
                    <StatusIcon />
                    <p className={`text-sm ${getStatusColor()}`}>{errorMessage}</p>
                </div>
            )}
        </main>
    );
}