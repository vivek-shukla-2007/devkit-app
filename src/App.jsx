import React, { useState, useEffect } from 'react';

// Import feature pages
import JsonFormatterPage from './features/jsonFormatter/JsonFormatterPage';
import DateCalculatorPage from './features/dateCalculator/DateCalculatorPage';
import CronGeneratorPage from './features/cronGenerator/CronGeneratorPage';
import RegexTesterPage from './features/regexTester/RegexTesterPage';
import TextDiffPage from './features/textDiff/TextDiffPage';
import CsvToJsonPage from './features/csvToJson/CsvToJsonPage';
import JsonToCsvPage from './features/jsonToCsv/JsonToCsvPage';
import UrlEncoderDecoderPage from './features/urlEncoderDecoder/UrlEncoderDecoderPage';
import Base64EncoderDecoderPage from './features/base64EncoderDecoder/Base64EncoderDecoderPage';
import MarkdownPreviewerPage from './features/markdownPreviewer/MarkdownPreviewerPage';

const pageMetadata = {
  home: {
    title: 'DevKit - Your Essential Online Dev Tools | DevGearHub',
    description: 'A collection of fast, free, and reliable utilities for everyday coding tasks. JSON formatter, date calculator, cron generator, Base64, URL tools, and more on DevGearHub.',
  },
  'json-formatter': {
    title: 'Online JSON Formatter & Validator - DevKit | DevGearHub',
    description: 'Beautify, validate, and format your JSON documents quickly and easily with our online JSON formatter tool on DevGearHub.',
  },
  'date-calculator': {
    title: 'Date Calculator - Add, Subtract, Find Difference | DevKit | DevGearHub',
    description: 'Calculate date differences, add or subtract days, weeks, or months from a date with our versatile date calculator on DevGearHub.',
  },
  'cron-generator': {
    title: 'Cron Expression Generator - Visual Builder | DevKit | DevGearHub',
    description: 'Visually build and understand complex cron expressions for scheduling tasks with our easy-to-use cron generator on DevGearHub.',
  },
  'regex-tester': {
    title: 'Online RegEx Tester & Debugger | DevKit | DevGearHub',
    description: 'Test and debug your regular expressions in real-time with highlighting and explanations using our online RegEx tester on DevGearHub.',
  },
  'text-diff': {
    title: 'Text Compare Tool - Find Differences | DevKit | DevGearHub',
    description: 'Easily compare two text snippets to find differences. Our text diff tool highlights additions and removals side-by-side on DevGearHub.',
  },
  'csv-to-json': {
    title: 'CSV to JSON Converter - Online Tool | DevKit | DevGearHub',
    description: 'Convert your CSV data into a structured JSON format quickly and accurately with our online CSV to JSON converter on DevGearHub.',
  },
  'json-to-csv': {
    title: 'JSON to CSV Converter - Online Tool | DevKit | DevGearHub',
    description: 'Transform JSON data, including arrays of objects, into CSV format with our reliable online JSON to CSV converter on DevGearHub.',
  },
  'url-encoder-decoder': {
    title: 'URL Encoder & Decoder - Online Tool | DevKit | DevGearHub',
    description: 'Encode or decode URLs and strings for web safety and data transmission with our easy-to-use URL tool on DevGearHub.',
  },
  'base64-encoder-decoder': {
    title: 'Base64 Encoder & Decoder - Online Tool | DevKit | DevGearHub',
    description: 'Quickly encode text to Base64 or decode Base64 strings back to text with our simple online Base64 tool on DevGearHub.',
  },
  'markdown-previewer': {
    title: 'Markdown Previewer - Real-time HTML Output | DevKit | DevGearHub',
    description: 'Write Markdown and see the live HTML preview instantly. Our Markdown editor supports standard syntax for easy document creation on DevGearHub.',
  } // Removed comma and extra closing brace
  // Add other tools as they are refactored
};

const toolData = [
  { id: 'json-formatter', title: 'JSON Formatter', description: 'Beautify and validate JSON documents quickly and easily.', icon: 'fas fa-code', color: 'text-purple-500' },
  { id: 'date-calculator', title: 'Date Calculator', description: 'Calculate date differences, add/subtract days, and more.', icon: 'fas fa-calendar-alt', color: 'text-blue-500' },
  { id: 'cron-generator', title: 'Cron Generator', description: 'Visually build complex cron expressions for scheduling.', icon: 'fas fa-clock', color: 'text-green-500' },
  { id: 'regex-tester', title: 'RegEx Tester', description: 'Test and debug regular expressions with real-time results.', icon: 'fas fa-terminal', color: 'text-red-500' },
  { id: 'text-diff', title: 'Text Diff', description: 'Compare two text snippets to find differences easily.', icon: 'fas fa-exchange-alt', color: 'text-yellow-500' },
  { id: 'csv-to-json', title: 'CSV to JSON', description: 'Convert CSV data into a valid JSON format.', icon: 'fas fa-file-csv', color: 'text-teal-500' },
  { id: 'json-to-csv', title: 'JSON to CSV', description: 'Transform JSON data back into a CSV format.', icon: 'fas fa-file-code', color: 'text-indigo-500' },
  { id: 'url-encoder-decoder', title: 'URL Encoder/Decoder', description: 'Encode or decode URL components for web safety.', icon: 'fas fa-link', color: 'text-orange-500' },
  { id: 'base64-encoder-decoder', title: 'Base64 Encoder/Decoder', description: 'Encode or decode strings to/from Base64 format.', icon: 'fas fa-lock', color: 'text-pink-500' },
  { id: 'markdown-previewer', title: 'Markdown Previewer', description: 'Write Markdown and see the HTML output in real-time.', icon: 'fab fa-markdown', color: 'text-gray-500' },
  // Add TimestampConverter once its page is created
  // { id: 'timestamp-converter', title: 'Timestamp Converter', description: 'Convert Unix timestamps to human-readable dates and vice-versa.', icon: 'fas fa-history', color: 'text-cyan-500' },
];

function ToolCard({ tool, onNavigate }) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onNavigate(tool.id);
      }}
      className="tool-card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700"
    >
      <i className={`${tool.icon} ${tool.color} text-4xl mb-4`}></i>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{tool.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{tool.description}</p>
    </a>
  );
}

function HomePage({ onNavigate, searchTerm, onSearchChange }) {
  const filteredTools = toolData.filter(tool =>
    tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <input
              type="text"
              placeholder="Search for a tool (e.g., JSON, Date, Regex)..."
              className="w-full p-3 pl-10 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-lg"
              value={searchTerm}
              onChange={onSearchChange}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">Explore Our Tools</h2>
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} onNavigate={onNavigate} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400 text-xl">No tools found matching your search.</p>
        )}
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
};

// Main App component
function App() {
    // State to manage the current page/tool displayed
    const [currentPage, setCurrentPage] = useState('home');
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term
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

    // Effect to update page title and meta description
    useEffect(() => {
        const metadata = pageMetadata[currentPage] || pageMetadata.home; // Fallback to home metadata
        document.title = metadata.title;

        let metaDescriptionTag = document.querySelector('meta[name="description"]');
        if (!metaDescriptionTag) {
            // If it doesn't exist, create it
            metaDescriptionTag = document.createElement('meta');
            metaDescriptionTag.setAttribute('name', 'description');
            document.head.appendChild(metaDescriptionTag);
        }
        metaDescriptionTag.setAttribute('content', metadata.description);
    }, [currentPage]);

    // Function to toggle theme
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Function to navigate to a specific tool page
    const navigateToTool = (toolId) => {
        setCurrentPage(toolId);
        setSearchTerm(''); // Clear search when navigating to a tool
     };

    // Render content based on currentPage state
    const renderContent = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage onNavigate={navigateToTool} searchTerm={searchTerm} onSearchChange={handleSearchChange} />;
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
                return <CsvToJsonPage />;
            case 'json-to-csv':
                return <JsonToCsvPage />;
            case 'url-encoder-decoder':
                return <UrlEncoderDecoderPage />;
            case 'base64-encoder-decoder':
                return <Base64EncoderDecoderPage />;
            case 'markdown-previewer':
                return <MarkdownPreviewerPage />;
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