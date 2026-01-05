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
import HtmlEntityEncoderDecoderPage from './features/htmlEntityEncoderDecoder/HtmlEntityEncoderDecoderPage';
import XmlFormatterPage from './features/xmlFormatter/XmlFormatterPage'; // Added import
import YamlValidatorPage from './features/yamlValidator/YamlValidatorPage'; // Added import
import JwtDecoderPage from './features/jwtDecoder/JwtDecoderPage';
import HashGeneratorPage from './features/hashGenerator/HashGeneratorPage';
import UuidGeneratorPage from './features/uuidGenerator/UuidGeneratorPage';
import NumberBaseConverterPage from './features/numberBaseConverter/NumberBaseConverterPage';
import ColorConverterPage from './features/colorConverter/ColorConverterPage';
import SqlFormatterPage from './features/sqlFormatter/SqlFormatterPage';
import LoremIpsumGeneratorPage from './features/loremIpsumGenerator/LoremIpsumGeneratorPage';
import PassportPhotoMakerPage from './features/passportPhotoMaker/PassportPhotoMakerPage';
import BackgroundRemoverPage from './features/backgroundRemover/BackgroundRemoverPage';

import CookieBanner from './components/CookieBanner';
import HomePage from './components/home/HomePage'; // Moved HomePage
import ToolCard from './components/home/ToolCard'; // Moved ToolCard (if HomePage doesn't import it directly)

const pageMetadata = {
  home: {
    title: 'Dev Gear Hub - Your Essential Online Dev Tools',
    description: 'A collection of fast, free, and reliable utilities for everyday coding tasks. JSON formatter, date calculator, cron generator, Base64, URL tools, and more on DevGearHub.',
  },
  'json-formatter': {
    title: 'Online JSON Formatter & Validator - Dev Gear Hub',
    description: 'Beautify, validate, and format your JSON documents quickly and easily with our online JSON formatter tool on DevGearHub.',
  },
  'date-calculator': {
    title: 'Date Calculator - Add, Subtract, Find Difference | Dev Gear Hub',
    description: 'Calculate date differences, add or subtract days, weeks, or months from a date with our versatile date calculator on DevGearHub.',
  },
  'cron-generator': {
    title: 'Cron Expression Generator - Visual Builder | Dev Gear Hub',
    description: 'Visually build and understand complex cron expressions for scheduling tasks with our easy-to-use cron generator on DevGearHub.',
  },
  'regex-tester': {
    title: 'Online RegEx Tester & Debugger | Dev Gear Hub',
    description: 'Test and debug your regular expressions in real-time with highlighting and explanations using our online RegEx tester on DevGearHub.',
  },
  'text-diff': {
    title: 'Text Compare Tool - Find Differences | Dev Gear Hub',
    description: 'Easily compare two text snippets to find differences. Our text diff tool highlights additions and removals side-by-side on DevGearHub.',
  },
  'csv-to-json': {
    title: 'CSV to JSON Converter - Online Tool | Dev Gear Hub',
    description: 'Convert your CSV data into a structured JSON format quickly and accurately with our online CSV to JSON converter on DevGearHub.',
  },
  'json-to-csv': {
    title: 'JSON to CSV Converter - Online Tool | Dev Gear Hub',
    description: 'Transform JSON data, including arrays of objects, into CSV format with our reliable online JSON to CSV converter on DevGearHub.',
  },
  'url-encoder-decoder': {
    title: 'URL Encoder & Decoder - Online Tool | Dev Gear Hub',
    description: 'Encode or decode URLs and strings for web safety and data transmission with our easy-to-use URL tool on DevGearHub.',
  },
  'base64-encoder-decoder': {
    title: 'Base64 Encoder & Decoder - Online Tool | Dev Gear Hub',
    description: 'Quickly encode text to Base64 or decode Base64 strings back to text with our simple online Base64 tool on DevGearHub.',
  },
  'markdown-previewer': {
    title: 'Markdown Previewer - Real-time HTML Output | Dev Gear Hub',
    description: 'Write Markdown and see the live HTML preview instantly. Our Markdown editor supports standard syntax for easy document creation on DevGearHub.',
  } ,
  'contact': {
    title: 'Contact Us - Dev Gear Hub',
    description: 'Get in touch with the DevKit team. Share your feedback, suggestions, or report issues to help us improve our free online developer tools on DevGearHub.',
  },
  'about': {
    title: 'About Dev Gear Hub - Our Mission & Values',
    description: 'Learn more about DevKit, our mission to provide free developer tools, our core values like privacy and speed, and the technology behind DevGearHub.',
  },
  'privacy-policy': {
    title: 'Privacy Policy - Dev Gear Hub',
    description: 'Read the Privacy Policy for DevGearHub to understand how we handle your information when you use our online developer tools.',
  },
  'terms-of-service': {
    title: 'Terms of Service - Dev Gear Hub',
    description: 'Review the Terms of Service for using DevGearHub. Your access and use of our services are conditioned upon your acceptance of these terms.',
  },
  'disclaimer': {
    title: 'Disclaimer - Dev Gear Hub',
    description: 'Disclaimer for DevGearHub. Information provided on this site is for general purposes only. Use our tools at your own risk.',
  },
  'case-converter': {
    title: 'Case Converter - Online Text Tool | Dev Gear Hub',
    description: 'Convert text between various case styles like camelCase, PascalCase, snake_case, kebab-case, and more with our free online tool on DevGearHub.',
  },
  'char-word-counter': {
    title: 'Character & Word Counter - Online Tool | Dev Gear Hub',
    description: 'Quickly count characters, words, lines, and sentences in your text. A handy free utility for writers and developers on DevGearHub.',
  },
  'unix-timestamp-converter': {
    title: 'Unix Timestamp Converter - Online Tool | Dev Gear Hub',
    description: 'Convert Unix timestamps (seconds or milliseconds) to human-readable dates and vice-versa. Includes current timestamp generation on DevGearHub.',
  },
  'html-entity-encoder-decoder': {
    title: 'HTML Entity Encoder & Decoder - Online Tool | Dev Gear Hub',
    description: 'Easily encode text to HTML entities or decode HTML entities back to text. Essential for web development and data sanitization on DevGearHub.',
  },
  'xml-formatter': {
    title: 'XML Formatter - Online Tool | Dev Gear Hub',
    description: 'Format and beautify your XML data online. Makes XML readable and helps in debugging structures on DevGearHub.',
  },
  'yaml-validator': {
    title: 'YAML Validator - Online Lint Tool | Dev Gear Hub',
    description: 'Validate your YAML syntax online. Quickly check for errors and ensure your YAML files are well-formed on DevGearHub.',
  },
  'jwt-decoder': {
    title: 'JWT Decoder - Online Tool | Dev Gear Hub',
    description: 'Decode JSON Web Tokens (JWTs) online. View the header and payload of your JWTs for debugging and verification on DevGearHub.',
  },
  'hash-generator': {
    title: 'Hash Generator (MD5, SHA1, SHA256, SHA512) | Dev Gear Hub',
    description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from your text input online. Useful for data integrity checks on DevGearHub.',
  },
  'uuid-generator': {
    title: 'UUID/GUID Generator - Online Tool | Dev Gear Hub',
    description: 'Generate universally unique identifiers (UUIDs/GUIDs) version 4 online with a single click on DevGearHub.',
  },
  'number-base-converter': {
    title: 'Number Base Converter (Bin, Oct, Dec, Hex) | Dev Gear Hub',
    description: 'Convert numbers between binary, octal, decimal, and hexadecimal bases with our easy-to-use online converter on DevGearHub.',
  },
 'color-converter': {
    title: 'Color Picker & Converter (HEX, RGB, HSL) | Dev Gear Hub',
    description: 'Pick colors and convert between HEX, RGB, and HSL formats. An essential tool for web developers and designers on DevGearHub.',
  },
  'sql-formatter': {
    title: 'SQL Formatter - Online Beautifier | Dev Gear Hub',
    description: 'Format and beautify your SQL queries online for various dialects. Improve readability and maintainability of your SQL code on DevGearHub.',
  },
  'lorem-ipsum-generator': {
    title: 'Lorem Ipsum Generator - Placeholder Text | Dev Gear Hub',
    description: 'Generate Lorem Ipsum placeholder text for your designs and mockups. Specify the number of paragraphs needed on DevGearHub.',
  },
  'passport-photo-maker': {
    title: 'Passport Photo Maker - Create & Print Online | Dev Gear Hub',
    description: 'Create professional passport photos online for free. Support for USA, UK, India, and more. Client-side processing for maximum privacy.',
  },
  'background-remover': {
    title: 'Background Image Remover - Remove BG Online | Dev Gear Hub',
    description: 'Remove image backgrounds instantly with client-side processing. Download as PNG with transparent background or JPG with white background.',
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
  },
  {
    id: 'html-entity-encoder-decoder',
    name: 'HTML Entity Encoder/Decoder',
    description: "Encode or decode text for HTML, preventing XSS and rendering issues.",
    icon: <i className="fas fa-code-branch text-3xl text-red-400"></i>, // Example icon
    category: "Web Utilities" // Corrected category
  },
  {
    id: 'xml-formatter',
    name: 'XML Formatter',
    description: "Format and beautify XML data to make it readable.",
    icon: <i className="fas fa-file-code text-3xl text-orange-400"></i>, 
    category: "Data Converters"
  },
  {
    id: 'yaml-validator',
    name: 'YAML Validator',
    description: "Validate YAML syntax to ensure it's well-formed.",
    icon: <i className="fas fa-check-double text-3xl text-sky-500"></i>, 
    category: "Utilities"
  },
  {
    id: 'color-converter',
    name: 'Color Picker & Converter',
    description: "Pick colors and convert between HEX, RGB, HSL.",
    icon: <i className="fas fa-palette text-3xl text-pink-400"></i>,
    category: "Web Utilities"
  },
  {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    description: "Format and beautify SQL queries for readability.",
    icon: <i className="fas fa-database text-3xl text-blue-400"></i>,
    category: "Data Converters"
  },
{
    id: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for designs and mockups.',
    icon: <i className="fas fa-paragraph text-3xl text-teal-400"></i>,
    category: "Text Manipulation"
  },
  {
    id: 'passport-photo-maker',
    name: 'Passport Photo Maker',
    description: 'Create and format passport photos for various countries.',
    icon: <i className="fas fa-id-card text-3xl text-indigo-600"></i>,
    category: "Utilities"
  },
  {
    id: 'background-remover',
    name: 'Background Remover',
    description: 'Remove image backgrounds instantly with intelligent color detection.',
    icon: <i className="fas fa-wand-magic-sparkles text-3xl text-cyan-500"></i>,
    category: "Image Processing"
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    description: "Decode and inspect JSON Web Tokens (header and payload).",
    icon: <i className="fas fa-key text-3xl text-yellow-600"></i>,
    category: "Web Utilities"
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: "Generate MD5, SHA1, SHA256, SHA512 hashes from text.",
    icon: <i className="fas fa-fingerprint text-3xl text-gray-500"></i>,
    category: "Encoders & Decoders"
  },
  {
    id: 'uuid-generator',
    name: 'UUID/GUID Generator',
    description: "Generate universally unique identifiers (UUID v4).",
    icon: <i className="fas fa-dice-d6 text-3xl text-green-600"></i>,
    category: "Utilities"
  },
  {
    id: 'number-base-converter',
    name: 'Number Base Converter',
    description: "Convert numbers between binary, octal, decimal, and hex.",
    icon: <i className="fas fa-exchange-alt text-3xl text-purple-400 transform rotate-90"></i>,
    category: "Utilities"
  }
];

// Main App component
function App() {
    // State to manage the current page/tool displayed
    // Initialize currentPage from the browser's URL path
    const [currentPage, setCurrentPage] = useState(() => {
        const path = window.location.pathname.replace(/^\//, ''); // Remove leading '/'
        return path || 'home'; // Default to 'home' if path is empty or just '/'
    });
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
    // This effect also handles initial URL setting on page load if currentPage was derived from path
    useEffect(() => {
        const pathParts = currentPage.split('/');
        const basePage = pathParts[0];
        const subPage = pathParts[1] || null;

        // Scroll to top whenever the page changes
        window.scrollTo(0, 0);

        // Update browser URL if it doesn't match currentPage
        // This ensures direct navigation or refresh loads the correct view and URL
        let currentPathInBrowser = window.location.pathname.replace(/^\//, '');
        if (currentPathInBrowser === '') currentPathInBrowser = 'home';

        // For targetPathForState, if currentPage is 'home', target is empty string for root URL.
        // Otherwise, it's the full currentPage string (which might include sub-paths like 'regex-tester/builder').
        const targetPathForState = basePage === 'home' ? '' : currentPage;

        if (currentPathInBrowser !== targetPathForState) {
            const newUrl = currentPage === 'home' ? '/' : `/${currentPage}`;
            window.history.pushState({ page: currentPage }, '', newUrl);
        }

        const metadata = pageMetadata[basePage] || pageMetadata.home; // Use basePage for metadata lookup
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

    // Effect to handle browser back/forward navigation
    useEffect(() => {
        const handlePopState = (event) => {
            // When browser back/forward is used, event.state might be null or contain our state
            let path = window.location.pathname.replace(/^\//, '');
            if (path === '') path = 'home'; // Ensure root path maps to 'home'
            // path might now be 'regex-tester/builder'

            // Scroll to top on popstate as well
            window.scrollTo(0, 0);
            setCurrentPage(path);
        };

        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []); // Empty dependency array ensures this runs only once on mount and unmount

    // Function to toggle theme
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Function to navigate to a specific tool page
    const navigateToTool = (toolId) => {
        // toolId might be 'regex-tester/builder' or just 'json-formatter'
        const baseToolId = toolId.split('/')[0]; // e.g., 'regex-tester' or 'home'

        const newUrl = baseToolId === 'home' ? '/' : `/${toolId}`; // Use full toolId for URL
        
        // Only push state if the URL is actually changing
        if (window.location.pathname !== newUrl) {
            window.history.pushState({ page: toolId }, '', newUrl);
        }
        // Setting currentPage will trigger the other useEffect to update metadata
        setCurrentPage(toolId); 
        // Clear search only if navigating to a base tool, not a sub-tab of the same tool
        if (!toolId.includes('/')) { // Simple check, might need refinement if URLs get more complex
            setSearchTerm(''); 
        }
    };

    const handleAcceptCookies = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        setShowCookieBanner(false);
     };

    // Render content based on currentPage state
    const renderContent = () => {
        const pageKey = currentPage.split('/')[0]; // Get the base page for the switch statement

        switch (pageKey) {
            case 'home':
                return <HomePage toolData={toolData} onNavigate={navigateToTool} searchTerm={searchTerm} onSearchChange={handleSearchChange} />;
            case 'json-formatter':
                return <JsonFormatterPage />;
            case 'date-calculator':
                return <DateCalculatorPage />;
            case 'cron-generator':
                return <CronGeneratorPage  />;
            case 'regex-tester': // RegexTesterPage will handle its own sub-routes for tabs
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
            case 'html-entity-encoder-decoder':
                return <HtmlEntityEncoderDecoderPage />;
            case 'xml-formatter':
                return <XmlFormatterPage />;
            case 'yaml-validator':
                return <YamlValidatorPage />;
            case 'jwt-decoder':
                return <JwtDecoderPage />;
            case 'hash-generator':
                return <HashGeneratorPage />;
            case 'uuid-generator':
                return <UuidGeneratorPage />;
            case 'number-base-converter':
                return <NumberBaseConverterPage />;
            case 'color-converter':
                return <ColorConverterPage />;
            case 'sql-formatter':
                return <SqlFormatterPage />;
            case 'lorem-ipsum-generator':
                return <LoremIpsumGeneratorPage />;
            case 'passport-photo-maker':
                return <PassportPhotoMakerPage />;
            case 'background-remover':
                return <BackgroundRemoverPage />;          
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col transition-colors duration-300 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-md p-3 sm:p-4 flex items-center justify-between rounded-b-lg sticky top-0 z-50">
                {/* Logo and Title */}
                <div className="cursor-pointer flex items-center" onClick={() => navigateToTool('home')}>
                    <div className="flex items-center justify-center sm:justify-start space-x-2">
                        {/* Replaced Font Awesome icon with inline SVG */}
                        <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.73-.664 1.203-.826M11.42 15.17L6.07 19.673c-.24.24-.586.24-.826 0l-1.112-1.111a.625.625 0 010-.826l8.098-8.098a.625.625 0 01.826 0l1.112 1.111c.24.24.24.586 0 .826L11.42 15.17zM14.25 10.75l2.104-2.104a.625.625 0 000-.884l-1.06-1.06a.625.625 0 00-.884 0l-2.104 2.104M4.5 16.25L6 14.75M6 14.75l2.496-3.03c.317-.384.73-.664 1.203-.826M6 14.75L1.826 18.924a.625.625 0 01-.826 0l-1.112-1.111a.625.625 0 010-.826L6 11.42m8.25 2.828l2.496-3.03c.317-.384.73-.664 1.203-.826M14.25 14.25L18.924 9.576a.625.625 0 000-.826l-1.112-1.111a.625.625 0 00-.826 0L14.25 10.75M14.25 10.75L11.42 8.646M11.42 8.646L8.646 11.42" />
                        </svg>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dev Gear Hub</h1>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex items-center space-x-4">
                    {/* Home Icon Link - Always Visible */}
                    <button
                        onClick={() => navigateToTool('home')}
                        className={`p-2 rounded-md transition-colors ${currentPage === 'home' ? 'bg-purple-600 text-white dark:bg-purple-500' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        aria-label="Home"
                    >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                    </button>

                    {/* About and Contact Links - Hidden on small screens */}
                    {/* About and Contact links moved to footer */}
                    {/* <a href="#" onClick={(e) => { e.preventDefault(); navigateToTool('about'); }} className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium hidden md:block">About</a> */}
                    {/* <a href="#" onClick={(e) => { e.preventDefault(); navigateToTool('contact'); }} className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium hidden md:block">Contact</a> */}

                    {/* Theme Toggle Button */}
                    <button
                        id="theme-toggle"
                        aria-label="Toggle theme"
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300"
                    >
                        {theme === 'dark' ? (
                            // Sun icon SVG
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
                            </svg>
                        ) : (
                            // Moon icon SVG
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.455 2.104a.75.75 0 00-.965.965 5.5 5.5 0 006.385 6.385.75.75 0 00.965-.965A7.001 7.001 0 018.13 1.67a.75.75 0 00-.675.434zM11.5 6.5a5.503 5.503 0 01-5.455 5.455A7.001 7.001 0 0013.33 3.87a.75.75 0 00-.434-.675A5.503 5.503 0 0111.5 6.5z" clipRule="evenodd" />
                            </svg>
                        )}
                    </button>
                </nav>
            </header>

            {renderContent()}

            {/* Footer */}
            <footer className="bg-gray-800 dark:bg-gray-900 text-gray-300 py-6 px-3 sm:px-6 lg:px-8 mt-8 rounded-t-lg">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Dev Gear Hub. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateToTool('about'); }} className="hover:text-white transition-colors duration-200">About</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateToTool('contact'); }} className="hover:text-white transition-colors duration-200">Contact</a>
                        <a href="#" onClick={() => navigateToTool('privacy-policy')} className="hover:text-white transition-colors duration-200">Privacy Policy</a>
                        <a href="#" onClick={() => navigateToTool('terms-of-service')} className="hover:text-white transition-colors duration-200">Terms of Service</a>
                        <a href="mailto:timesbytes@gmail.com?subject=Dev Gear Hub Tool Suggestion" className="hover:text-white transition-colors duration-200">Suggest a Tool</a>
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