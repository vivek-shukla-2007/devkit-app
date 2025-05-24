import React, { useState, useEffect } from 'react';

// Import feature pages
import JsonFormatterPage from './features/jsonFormatter/JsonFormatterPage';
import DateCalculatorPage from './features/dateCalculator/DateCalculatorPage';
import CronGeneratorPage from './features/cronGenerator/CronGeneratorPage';
import RegexTesterPage from './features/regexTester/RegexTesterPage';
import TextDiffPage from './features/textDiff/TextDiffPage';


// TODO: Import other feature pages as they are created/moved

// Main App component
function App() {
    // State to manage the current page/tool displayed
    const [currentPage, setCurrentPage] = useState('home');
    // State to manage the theme (light/dark)
    const [theme, setTheme] = useState(() => {
        // Initialize theme from localStorage or system preference
        if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            return 'dark';
        }
        return 'light';
    });

    // Effect to apply theme class to documentElement
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme); // Save theme preference
    }, [theme]);

    // Function to toggle theme
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Function to navigate to a specific tool page
    const navigateToTool = (toolId) => {
        setCurrentPage(toolId);
    };

    // Render content based on currentPage state
    const renderContent = () => {
        switch (currentPage) {
            case 'home':
                return (
                    <>
                        {/* Hero Section */}
                        <section className="bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-700 dark:to-indigo-800 text-white py-16 px-4 sm:px-6 lg:px-8 text-center rounded-lg my-8 mx-4 md:mx-auto max-w-6xl shadow-xl">
                            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
                                Your Essential Online Dev Tools
                            </h2>
                            <p className="text-lg sm:text-xl mb-8 opacity-90">
                                Fast, Free, and Reliable Utilities for Everyday Coding Tasks.
                            </p>
                            <div className="max-w-xl mx-auto">
                                <div className="relative">
                                    <input type="text" placeholder="Search for a tool (e.g., JSON, Date, Regex)..." className="w-full p-3 pl-10 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-lg" />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-search text-gray-400"></i>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Tools Grid */}
                        <main className="flex-grow container mx-auto px-4 py-8">
                            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">Explore Our Tools</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {/* JSON Formatter Tool Card */}
                                <a href="#" onClick={() => navigateToTool('json-formatter')} className="tool-card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700">
                                    <i className="fas fa-code text-purple-500 text-4xl mb-4"></i>
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">JSON Formatter</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">Beautify and validate JSON documents quickly and easily.</p>
                                </a>

                                {/* Date Calculator Tool Card */}
                                <a href="#" onClick={() => navigateToTool('date-calculator')} className="tool-card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700">
                                    <i className="fas fa-calendar-alt text-blue-500 text-4xl mb-4"></i>
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Date Calculator</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">Calculate date differences, add/subtract days, and more.</p>
                                </a>

                                {/* Cron Generator Tool Card */}
                                <a href="#" onClick={() => navigateToTool('cron-generator')} className="tool-card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700">
                                    <i className="fas fa-clock text-green-500 text-4xl mb-4"></i>
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Cron Generator</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">Visually build complex cron expressions for scheduling.</p>
                                </a>

                                {/* RegEx Tester Tool Card */}
                                <a href="#" onClick={() => navigateToTool('regex-tester')} className="tool-card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700">
                                    <i className="fas fa-terminal text-red-500 text-4xl mb-4"></i>
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">RegEx Tester</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">Test and debug regular expressions with real-time results.</p>
                                </a>

                                {/* Text Diff Tool Card */}
                                <a href="#" onClick={() => navigateToTool('text-diff')} className="tool-card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700">
                                    <i className="fas fa-exchange-alt text-yellow-500 text-4xl mb-4"></i>
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Text Diff</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">Compare two text snippets to find differences easily.</p>
                                </a>

                                {/* CSV to JSON Tool Card */}
                                <a href="#" onClick={() => navigateToTool('csv-to-json')} className="tool-card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700">
                                    <i className="fas fa-file-csv text-teal-500 text-4xl mb-4"></i>
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">CSV to JSON</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">Convert CSV data into a valid JSON format.</p>
                                </a>

                                {/* JSON to CSV Tool Card */}
                                <a href="#" onClick={() => navigateToTool('json-to-csv')} className="tool-card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700">
                                    <i className="fas fa-file-code text-indigo-500 text-4xl mb-4"></i>
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">JSON to CSV</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">Transform JSON data back into a CSV format.</p>
                                </a>

                                {/* URL Encoder/Decoder Tool Card */}
                                <a href="#" onClick={() => navigateToTool('url-encoder-decoder')} className="tool-card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700">
                                    <i className="fas fa-link text-orange-500 text-4xl mb-4"></i>
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">URL Encoder/Decoder</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">Encode or decode URL components for web safety.</p>
                                </a>

                                {/* Base64 Encoder/Decoder Tool Card */}
                                <a href="#" onClick={() => navigateToTool('base64-encoder-decoder')} className="tool-card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700">
                                    <i className="fas fa-lock text-pink-500 text-4xl mb-4"></i>
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Base64 Encoder/Decoder</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">Encode or decode strings to/from Base64 format.</p>
                                </a>

                                {/* Markdown Previewer Tool Card */}
                                <a href="#" onClick={() => navigateToTool('markdown-previewer')} className="tool-card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700">
                                    <i className="fab fa-markdown text-gray-500 text-4xl mb-4"></i>
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Markdown Previewer</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">Write Markdown and see the HTML output in real-time.</p>
                                </a>
                            </div>
                        </main>

                        {/* Why Choose DevKit Section */}
                        <section className="bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-center mt-12 rounded-lg mx-4 md:mx-auto max-w-6xl shadow-inner">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Why Choose DevKit?</h3>
                            <div className="flex flex-col md:flex-row justify-center items-start md:space-x-8 space-y-6 md:space-y-0">
                                <div className="flex flex-col items-center">
                                    <i className="fas fa-bolt text-purple-500 text-3xl mb-3"></i>
                                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Blazing Fast</p>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Instant results with client-side processing.</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <i className="fas fa-shield-alt text-green-500 text-3xl mb-3"></i>
                                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Privacy-Focused</p>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Your data stays in your browser. No server uploads.</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <i className="fas fa-infinity text-blue-500 text-3xl mb-3"></i>
                                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Always Free</p>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Access all tools without any cost or subscriptions.</p>
                                </div>
                            </div>
                        </section>
                    </>
                );
            case 'json-formatter':
                return <JsonFormatterPage />;
            case 'date-calculator':
                return <DateCalculatorPage />;
            case 'cron-generator':
                return <CronGeneratorPage  />;
            case 'regex-tester':
                return <RegexTesterPage  />;
            case 'text-diff':
                return <TextDiffPage />;
            case 'csv-to-json':
                return <CsvToJson />;
            case 'json-to-csv':
                return <JsonToCsv />;
            case 'url-encoder-decoder':
                return <UrlEncoderDecoder />;
            case 'base64-encoder-decoder':
                return <Base64EncoderDecoder />;
            case 'markdown-previewer':
                return <MarkdownPreviewer />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col transition-colors duration-300 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex items-center justify-between rounded-b-lg">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigateToTool('home')}>
                    <i className="fas fa-tools text-purple-600 dark:text-purple-400 text-2xl"></i>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">DevKit</h1>
                </div>

                <nav className="flex items-center space-x-4">
                    <a href="#" onClick={() => navigateToTool('home')} className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium hidden md:block">Home</a>
                    {/* Placeholder for About and Contact - can be simple modals or separate sections */}
                    <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium hidden md:block">About</a>
                    <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium hidden md:block">Contact</a>

                    <button
                        id="theme-toggle"
                        aria-label="Toggle theme"
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300"
                    >
                        {theme === 'dark' ? (
                            <i className="fas fa-sun"></i>
                        ) : (
                            <i className="fas fa-moon"></i>
                        )}
                    </button>
                </nav>
            </header>

            {renderContent()}

            {/* Footer */}
            <footer className="bg-gray-800 dark:bg-gray-900 text-gray-300 py-6 px-4 sm:px-6 lg:px-8 mt-8 rounded-t-lg">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>&copy; 2025 DevKit. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors duration-200">Suggest a Tool</a>
                        <a href="https://github.com/yourusername/your-repo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
                            <i className="fab fa-github text-lg"></i>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// CSV to JSON Component
function CsvToJson() {
    const [csvInput, setCsvInput] = useState('');
    const [jsonOutput, setJsonOutput] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const convertCsvToJson = async () => {
        setMessage('');
        setError('');
        if (!csvInput.trim()) {
            setError('Please enter CSV data.');
            setJsonOutput('');
            return;
        }

        try {
            // Dynamically import csv-parse if not already available
            if (typeof window.csvParse === 'undefined' || typeof window.csvParse.parse === 'undefined') {
                // Load csv-parse library from CDN
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/npm/csv-parse@5.5.3/dist/cjs/index.min.js';
                    script.onload = () => {
                        // The library exposes 'parse' function globally as window.csvParse.parse
                        // We need to re-assign it to a more accessible name if it's not directly on window.
                        // For this specific CDN, it seems to attach to window.csvParse.parse, so we'll assume that.
                        if (typeof window.csvParse === 'undefined' || typeof window.csvParse.parse === 'undefined') {
                            console.warn("csv-parse loaded but 'parse' function not found on window.csvParse. This may cause issues.");
                        }
                        resolve();
                    };
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }

            // Using csv-parse library for robust parsing
            const records = await new Promise((resolve, reject) => {
                window.csvParse.parse(csvInput, {
                    columns: true, // Treat first row as headers
                    skip_empty_lines: true
                }, (err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
            });

            setJsonOutput(JSON.stringify(records, null, 2));
        } catch (e) {
            setError(`Error converting CSV: ${e.message}`);
            setJsonOutput('');
        }
    };

    const clearFields = () => {
        setCsvInput('');
        setJsonOutput('');
        setError('');
        setMessage('');
    };

    const copyToClipboard = () => {
        if (jsonOutput) {
            const textarea = document.createElement('textarea');
            textarea.value = jsonOutput;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                setMessage('Copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy text: ', err);
                setMessage('Failed to copy.');
            }
            document.body.removeChild(textarea);
        } else {
            setMessage('Nothing to copy!');
        }
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">CSV to JSON Converter</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input CSV */}
                    <div>
                        <label htmlFor="csv-input" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Input CSV</label>
                        <textarea
                            id="csv-input"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-teal-500 focus:border-teal-500 h-64 resize-y font-mono text-sm"
                            placeholder={`Enter your CSV data here, e.g.:
name,age,city
John,30,New York
Jane,25,London`}
                            value={csvInput}
                            onChange={(e) => setCsvInput(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Output JSON */}
                    <div>
                        <label htmlFor="json-output" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Output JSON</label>
                        <textarea
                            id="json-output"
                            className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-64 resize-y font-mono text-sm ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                            value={jsonOutput}
                            readOnly
                            placeholder="Converted JSON will appear here..."
                        ></textarea>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={convertCsvToJson}
                        className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                    >
                        <i className="fas fa-sync-alt mr-2"></i> Convert to JSON
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
            </div>
        </main>
    );
}

// JSON to CSV Component
function JsonToCsv() {
    const [jsonInput, setJsonInput] = useState('');
    const [csvOutput, setCsvOutput] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const convertJsonToCsv = async () => {
        setMessage('');
        setError('');
        if (!jsonInput.trim()) {
            setError('Please enter JSON data.');
            setCsvOutput('');
            return;
        }

        try {
            const parsedJson = JSON.parse(jsonInput);

            // Dynamically import json-2-csv if not already available
            if (typeof window.json2csv === 'undefined') {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/npm/json-2-csv@5.0.0/dist/browser/json-2-csv.min.js';
                    script.onload = () => {
                        // The library attaches to window.json2csv
                        if (typeof window.json2csv === 'undefined') {
                            console.warn("json-2-csv loaded but not found on window.json2csv. This may cause issues.");
                        }
                        resolve();
                    };
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }

            // Using json-2-csv library for conversion
            const csv = await window.json2csv.json2csvAsync(parsedJson);
            setCsvOutput(csv);

        } catch (e) {
            setError(`Error converting JSON: ${e.message}`);
            setCsvOutput('');
        }
    };

    const clearFields = () => {
        setJsonInput('');
        setCsvOutput('');
        setError('');
        setMessage('');
    };

    const copyToClipboard = () => {
        if (csvOutput) {
            const textarea = document.createElement('textarea');
            textarea.value = csvOutput;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                setMessage('Copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy text: ', err);
                setMessage('Failed to copy.');
            }
            document.body.removeChild(textarea);
        } else {
            setMessage('Nothing to copy!');
        }
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">JSON to CSV Converter</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input JSON */}
                    <div>
                        <label htmlFor="json-input" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Input JSON</label>
                        <textarea
                            id="json-input"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 h-64 resize-y font-mono text-sm"
                            placeholder='Enter your JSON data here, e.g., [{"name": "John", "age": 30}]'
                            value={jsonInput}
                            onChange={(e) => setJsonInput(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Output CSV */}
                    <div>
                        <label htmlFor="csv-output" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Output CSV</label>
                        <textarea
                            id="csv-output"
                            className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-64 resize-y font-mono text-sm ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                            value={csvOutput}
                            readOnly
                            placeholder="Converted CSV will appear here..."
                        ></textarea>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={convertJsonToCsv}
                        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                    >
                        <i className="fas fa-sync-alt mr-2"></i> Convert to CSV
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
            </div>
        </main>
    );
}

// URL Encoder/Decoder Component
function UrlEncoderDecoder() {
    const [inputUrl, setInputUrl] = useState('');
    const [outputUrl, setOutputUrl] = useState('');
    const [message, setMessage] = useState('');

    const encodeUrl = () => {
        setMessage('');
        try {
            setOutputUrl(encodeURIComponent(inputUrl));
        } catch (e) {
            setOutputUrl(`Error encoding: ${e.message}`);
        }
    };

    const decodeUrl = () => {
        setMessage('');
        try {
            setOutputUrl(decodeURIComponent(inputUrl));
        } catch (e) {
            setOutputUrl(`Error decoding: ${e.message}`);
        }
    };

    const clearFields = () => {
        setInputUrl('');
        setOutputUrl('');
        setMessage('');
    };

    const copyToClipboard = () => {
        if (outputUrl) {
            const textarea = document.createElement('textarea');
            textarea.value = outputUrl;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                setMessage('Copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy text: ', err);
                setMessage('Failed to copy.');
            }
            document.body.removeChild(textarea);
        } else {
            setMessage('Nothing to copy!');
        }
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">URL Encoder/Decoder</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input URL */}
                    <div>
                        <label htmlFor="url-input" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Input URL/String</label>
                        <textarea
                            id="url-input"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-orange-500 focus:border-orange-500 h-64 resize-y font-mono text-sm"
                            placeholder="Enter the URL or string to encode/decode..."
                            value={inputUrl}
                            onChange={(e) => setInputUrl(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Output URL */}
                    <div>
                        <label htmlFor="url-output" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Output</label>
                        <textarea
                            id="url-output"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-64 resize-y font-mono text-sm"
                            value={outputUrl}
                            readOnly
                            placeholder="Encoded/Decoded output will appear here..."
                        ></textarea>
                        {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={encodeUrl}
                        className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                    >
                        <i className="fas fa-link mr-2"></i> Encode URL
                    </button>
                    <button
                        onClick={decodeUrl}
                        className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                    >
                        <i className="fas fa-unlink mr-2"></i> Decode URL
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
            </div>
        </main>
    );
}

// Base64 Encoder/Decoder Component
function Base64EncoderDecoder() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const encodeBase64 = () => {
        setMessage('');
        setError('');
        try {
            setOutputText(btoa(inputText));
        } catch (e) {
            setError(`Error encoding: ${e.message}`);
            setOutputText('');
        }
    };

    const decodeBase64 = () => {
        setMessage('');
        setError('');
        try {
            setOutputText(atob(inputText));
        } catch (e) {
            setError(`Error decoding: ${e.message}. Input might not be valid Base64.`);
            setOutputText('');
        }
    };

    const clearFields = () => {
        setInputText('');
        setOutputText('');
        setError('');
        setMessage('');
    };

    const copyToClipboard = () => {
        if (outputText) {
            const textarea = document.createElement('textarea');
            textarea.value = outputText;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                setMessage('Copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy text: ', err);
                setMessage('Failed to copy.');
            }
            document.body.removeChild(textarea);
        } else {
            setMessage('Nothing to copy!');
        }
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Base64 Encoder/Decoder</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input Text */}
                    <div>
                        <label htmlFor="base64-input" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Input Text/Base64</label>
                        <textarea
                            id="base64-input"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-pink-500 focus:border-pink-500 h-64 resize-y font-mono text-sm"
                            placeholder="Enter text or Base64 string to encode/decode..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Output Text */}
                    <div>
                        <label htmlFor="base64-output" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Output</label>
                        <textarea
                            id="base64-output"
                            className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-64 resize-y font-mono text-sm ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                            value={outputText}
                            readOnly
                            placeholder="Encoded/Decoded output will appear here..."
                        ></textarea>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={encodeBase64}
                        className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                    >
                        <i className="fas fa-lock mr-2"></i> Encode Base64
                    </button>
                    <button
                        onClick={decodeBase64}
                        className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                    >
                        <i className="fas fa-unlock mr-2"></i> Decode Base64
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
            </div>
        </main>
    );
}

// Markdown Previewer Component
function MarkdownPreviewer() {
    const [markdownInput, setMarkdownInput] = useState('');
    const [htmlOutput, setHtmlOutput] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const renderMarkdown = async () => {
            // Dynamically import markdown-it if not already available
            if (typeof window.markdownit === 'undefined') {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/markdown-it/14.1.0/markdown-it.min.js';
                    script.onload = () => {
                        // markdown-it attaches to window.markdownit
                        if (typeof window.markdownit === 'undefined') {
                            console.warn("markdown-it loaded but not found on window.markdownit. This may cause issues.");
                        }
                        resolve();
                    };
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }

            if (window.markdownit) {
                const md = window.markdownit();
                setHtmlOutput(md.render(markdownInput));
            }
        };
        renderMarkdown();
    }, [markdownInput]); // Re-render HTML whenever markdownInput changes

    const clearFields = () => {
        setMarkdownInput('');
        setHtmlOutput('');
        setMessage('');
    };

    const copyToClipboard = () => {
        if (htmlOutput) {
            const textarea = document.createElement('textarea');
            textarea.value = htmlOutput;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                setMessage('Copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy text: ', err);
                setMessage('Failed to copy.');
            }
            document.body.removeChild(textarea);
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
                            placeholder={`# Hello DevKit!
This is **Markdown**.
- Item 1
- Item 2`}
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

export default App;