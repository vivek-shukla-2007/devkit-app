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
import ContactPage from './pages/ContactPage'; // Assuming ContactPage.jsx is in src/pages/
import AboutPage from './pages/AboutPage'; // Corrected import path
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import DisclaimerPage from './pages/DisclaimerPage';
// Import new tool pages
import CaseConverterPage from './features/caseConverter/CaseConverterPage';
import CharWordCounterPage from './features/charWordCounter/CharWordCounterPage';
import UnixTimestampConverterPage from './features/unixTimestampConverter/UnixTimestampConverterPage';

import CookieBanner from './components/CookieBanner';
import HomePage from './components/home/HomePage'; // Moved HomePage
import ToolCard from './components/home/ToolCard'; // Moved ToolCard (if HomePage doesn't import it directly)

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
  } ,
  'contact': {
    title: 'Contact Us - DevKit | DevGearHub',
    description: 'Get in touch with the DevKit team. Share your feedback, suggestions, or report issues to help us improve our free online developer tools on DevGearHub.',
  },
  'about': {
    title: 'About DevKit - Our Mission & Values | DevGearHub',
    description: 'Learn more about DevKit, our mission to provide free developer tools, our core values like privacy and speed, and the technology behind DevGearHub.',
  },
  'privacy-policy': {
    title: 'Privacy Policy - DevKit | DevGearHub',
    description: 'Read the Privacy Policy for DevGearHub to understand how we handle your information when you use our online developer tools.',
  },
  'terms-of-service': {
    title: 'Terms of Service - DevKit | DevGearHub',
    description: 'Review the Terms of Service for using DevGearHub. Your access and use of our services are conditioned upon your acceptance of these terms.',
  },
  'disclaimer': {
    title: 'Disclaimer - DevKit | DevGearHub',
    description: 'Disclaimer for DevGearHub. Information provided on this site is for general purposes only. Use our tools at your own risk.',
  },
  'case-converter': {
    title: 'Case Converter - Online Text Tool | DevKit | DevGearHub',
    description: 'Convert text between various case styles like camelCase, PascalCase, snake_case, kebab-case, and more with our free online tool on DevGearHub.',
  },
  'char-word-counter': {
    title: 'Character & Word Counter - Online Tool | DevKit | DevGearHub',
    description: 'Quickly count characters, words, lines, and sentences in your text. A handy free utility for writers and developers on DevGearHub.',
  },
  'unix-timestamp-converter': {
    title: 'Unix Timestamp Converter - Online Tool | DevKit | DevGearHub',
    description: 'Convert Unix timestamps (seconds or milliseconds) to human-readable dates and vice-versa. Includes current timestamp generation on DevGearHub.',
  },
  'json-formatter': { // Assuming this was missed in the previous context, adding it back if needed.
    title: 'JSON Formatter & Validator - Online Tool | DevKit | DevGearHub',
    description: 'Easily format, pretty-print, and validate your JSON data online. Our tool helps ensure your JSON is well-formed and readable on DevGearHub.',
  }

};

const toolData = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Beautify and validate JSON documents quickly and easily.',
    icon: <i className="fas fa-code text-3xl text-purple-500"></i>,
    category: "Data Converters"
  },
  {
    id: 'date-calculator',
    name: 'Date Calculator',
    description: 'Calculate date differences, add/subtract days, and more.',
    icon: <i className="fas fa-calendar-alt text-3xl text-blue-500"></i>,
    category: "Date & Time"
  },
  {
    id: 'cron-generator',
    name: 'Cron Generator',
    description: 'Visually build complex cron expressions for scheduling.',
    icon: <i className="fas fa-clock text-3xl text-green-500"></i>,
    category: "Utilities"
  },
  {
    id: 'regex-tester',
    name: 'RegEx Tester',
    description: 'Test and debug regular expressions with real-time results.',
    icon: <i className="fas fa-terminal text-3xl text-red-500"></i>,
    category: "Text Manipulation"
  },
  {
    id: 'text-diff',
    name: 'Text Diff',
    description: 'Compare two text snippets to find differences easily.',
    icon: <i className="fas fa-exchange-alt text-3xl text-yellow-500"></i>,
    category: "Text Manipulation"
  },
  {
    id: 'csv-to-json',
    name: 'CSV to JSON',
    description: 'Convert CSV data into a valid JSON format.',
    icon: <i className="fas fa-file-csv text-3xl text-teal-500"></i>,
    category: "Data Converters"
  },
  {
    id: 'json-to-csv',
    name: 'JSON to CSV',
    description: 'Transform JSON data back into a CSV format.',
    icon: <i className="fas fa-file-code text-3xl text-indigo-500"></i>,
    category: "Data Converters"
  },
  {
    id: 'url-encoder-decoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode or decode URL components for web safety.',
    icon: <i className="fas fa-link text-3xl text-orange-500"></i>,
    category: "Web Utilities"
  },
  {
    id: 'base64-encoder-decoder',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode or decode strings to/from Base64 format.',
    icon: <i className="fas fa-lock text-3xl text-pink-500"></i>,
    category: "Encoders & Decoders"
  },
  {
    id: 'markdown-previewer',
    name: 'Markdown Previewer',
    description: 'Write Markdown and see the HTML output in real-time.',
    icon: <i className="fab fa-markdown text-3xl text-gray-600 dark:text-gray-400"></i>,
    category: "Text Manipulation"
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: "Convert text between various case styles (camelCase, PascalCase, snake_case, etc.).",
    icon: <i className="fas fa-font text-3xl text-lime-500"></i>, // Changed icon for variety
    category: "Text Manipulation"
  },
  {
    id: 'char-word-counter',
    name: 'Character & Word Counter',
    description: "Count characters, words, lines, and sentences in your text.",
    icon: <i className="fas fa-calculator text-3xl text-amber-500"></i>, // Changed icon for variety
    category: "Text Manipulation"
  },
  {
    id: 'unix-timestamp-converter',
    name: 'Unix Timestamp Converter',
    description: "Convert Unix timestamps to human-readable dates and vice-versa.",
    icon: <i className="fas fa-history text-3xl text-cyan-500"></i>, // Changed icon for variety
    category: "Date & Time"
  }
];

// Main App component
function App() {
    // State to manage the current page/tool displayed
    const [currentPage, setCurrentPage] = useState('home');
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term
    const [showCookieBanner, setShowCookieBanner] = useState(false);
      // State to manage the theme (light/dark)
    const [theme, setTheme] = useState(() => {
        // Initialize theme from localStorage or system preference
        if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            return 'dark';
        }
        return 'light';
    });

    useEffect(() => {
        // Check if cookies have already been accepted
        if (!localStorage.getItem('cookiesAccepted')) {
            setShowCookieBanner(true);
        }
    }, []);

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

    const handleAcceptCookies = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        setShowCookieBanner(false);
     };

    // Render content based on currentPage state
    const renderContent = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage toolData={toolData} onNavigate={navigateToTool} searchTerm={searchTerm} onSearchChange={handleSearchChange} />;
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
            case 'contact':
                return <ContactPage />;
            case 'about':
                return <AboutPage />;    
            case 'privacy-policy':
                return <PrivacyPolicyPage />;
            case 'terms-of-service':
                return <TermsOfServicePage />;
            case 'disclaimer':
                return <DisclaimerPage />;
            case 'case-converter':
                return <CaseConverterPage />;
            case 'char-word-counter':
                return <CharWordCounterPage />;
            case 'unix-timestamp-converter':
                return <UnixTimestampConverterPage />;
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
                   <a href="#" onClick={(e) => { e.preventDefault(); navigateToTool('about'); }} className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium hidden md:block">About</a>
                    <a href="#" onClick={() => navigateToTool('contact')} className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium hidden md:block">Contact</a>

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
                    <p>&copy; {new Date().getFullYear()} DevKit. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" onClick={() => navigateToTool('privacy-policy')} className="hover:text-white transition-colors duration-200">Privacy Policy</a>
                        <a href="#" onClick={() => navigateToTool('terms-of-service')} className="hover:text-white transition-colors duration-200">Terms of Service</a>
                        <a href="mailto:timesbytes@gmail.com?subject=DevKit Tool Suggestion" className="hover:text-white transition-colors duration-200">Suggest a Tool</a>
                        <a href="https://github.com/vivekbyte/devkit-app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200"> {/* Replace with your actual repo URL */}
                            <i className="fab fa-github text-lg"></i>
                        </a>
                    </div>
                </div>
            </footer>
            {showCookieBanner && (
                <CookieBanner
                    onAccept={handleAcceptCookies}
                />
            )}
        </div>
    );
}

export default App;