import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, InformationCircleIcon, TrashIcon } from '@heroicons/react/24/outline'; // Example icons

export default function RegexTesterPage() {
    const [regexInput, setRegexInput] = useState('');
    const [testString, setTestString] = useState('');
    const [matches, setMatches] = useState([]);
    // State for RegEx Maker
    const [builderInputText, setBuilderInputText] = useState('');
    const [selectedTextForBuilder, setSelectedTextForBuilder] = useState(''); // For visual feedback
    const latestSelectionRef = useRef(''); // Ref to store the latest selection immediately
    const [generatedRegexByBuilder, setGeneratedRegexByBuilder] = useState('');
    // State for testing within the builder tab
    const [builderTestString, setBuilderTestString] = useState('');
    const [builderMatches, setBuilderMatches] = useState([]);
    // Determine initial tab from URL or default to 'tester'
    const [activeTab, setActiveTab] = useState(() => {
        const path = window.location.pathname;
        if (path.endsWith('/builder')) return 'builder';
        return 'tester';
    });
    const [builderWarning, setBuilderWarning] = useState('');
    const builderInputRef = useRef(null); // Ref for the builder input textarea

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        const basePath = '/regex-tester';
        const newUrl = tabName === 'builder' ? `${basePath}/builder` : basePath;
        if (window.location.pathname !== newUrl) {
            window.history.pushState({ tab: tabName }, '', newUrl);
        }
        // Clear inputs when switching tabs to avoid preserving values
        if (tabName === 'tester') {
            clearBuilderStates(); // Clear builder states when switching to tester
        } else {
            setBuilderWarning(''); // Clear builder warning
        }
    };

    useEffect(() => {
        if (!regexInput || !testString) {
            setMatches([]);
            return;
        }
        try {
            const regex = new RegExp(regexInput, 'g');
            const currentMatches = [];
            let match;
            while ((match = regex.exec(testString)) !== null) {
                currentMatches.push(match[0]);
            }
            setMatches(currentMatches);
        } catch (e) {
            setMatches([]);
        }
    }, [regexInput, testString]);

    useEffect(() => {
        if (!generatedRegexByBuilder || !builderTestString) {
            setBuilderMatches([]);
            return;
        }
        try {
            const regex = new RegExp(generatedRegexByBuilder, 'g');
            const currentMatches = [];
            let match;
            while ((match = regex.exec(builderTestString)) !== null) {
                currentMatches.push(match[0]);
            }
            setBuilderMatches(currentMatches);
        } catch (e) {
            setBuilderMatches([]);
        }
    }, [generatedRegexByBuilder, builderTestString]);

    const handleBuilderInputMouseUp = () => {
        // This function is crucial. It captures the selection when the mouse button
        // is released *over the textarea*.
        let currentTextareaSelection = '';
        if (builderInputRef.current) {
            const textarea = builderInputRef.current;
            const { value, selectionStart, selectionEnd } = textarea;
            
            // Log the state of the textarea's value and selection properties
            console.log(`[Textarea onMouseUp] Value: "${value}", Start: ${selectionStart}, End: ${selectionEnd}`);

            if (value && selectionStart !== selectionEnd) {
                currentTextareaSelection = value.substring(selectionStart, selectionEnd);
            }
        }
        console.log(`[Textarea onMouseUp] Captured selection: "${currentTextareaSelection}"`);
        setSelectedTextForBuilder(currentTextareaSelection); // For visual feedback
        latestSelectionRef.current = currentTextareaSelection; // Store in ref
    };
    
    const generateRegexFromSelection = () => {
        // The button's onClick handler now SOLELY relies on latestSelectionRef.current
        const textToUseForRegex = latestSelectionRef.current; 
        console.log("Generate Button Clicked - Text to use for regex (from latestSelectionRef.current):", `"${textToUseForRegex}"`);

        if (!textToUseForRegex || !textToUseForRegex.trim()) {
            const warningMsg = "Please select text from the 'Input String' area first to generate a RegEx.";
            if (textToUseForRegex && !textToUseForRegex.trim()) { 
                 console.log("Generate Clicked - Text from ref contains only whitespace.");
            } else { 
                 console.log("Generate Clicked - Text from ref is empty or null.");
            }
            setBuilderWarning(warningMsg);
            setGeneratedRegexByBuilder('');
            return;
        }

        setBuilderWarning(''); 
        const escapedText = textToUseForRegex.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        console.log("Generate Clicked - Proceeding with Selection from ref:", `"${textToUseForRegex}"`, "Escaped:", `"${escapedText}"`);
        setGeneratedRegexByBuilder(escapedText);
    };

    const clearBuilderStates = () => {
        setBuilderInputText('');
        setSelectedTextForBuilder('');
        latestSelectionRef.current = ''; 
        setGeneratedRegexByBuilder('');
        setBuilderTestString(''); 
        setBuilderMatches([]); 
        setBuilderWarning(''); 
    };

    const clearBuilder = () => {
        clearBuilderStates();
    };

    const useSampleForBuilder = () => {
        setBuilderInputText("Example: My email is user@example.com and my phone is 123-456-7890.");
        setBuilderTestString("Test this against: user@example.com or another_user@domain.org");
        setSelectedTextForBuilder(''); 
        latestSelectionRef.current = ''; 
        setGeneratedRegexByBuilder('');
        setBuilderMatches([]); 
        setBuilderWarning(''); 
    };
    
    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">RegEx Tool</h2>

            {/* Tab Navigation */}
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => handleTabChange('tester')}
                        className={`${
                            activeTab === 'tester'
                                ? 'border-purple-500 text-purple-600 dark:border-purple-400 dark:text-purple-300'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
                        } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
                    >
                        Tester
                    </button>
                    <button
                        onClick={() => handleTabChange('builder')}
                        className={`${
                            activeTab === 'builder'
                                ? 'border-purple-500 text-purple-600 dark:border-purple-400 dark:text-purple-300'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
                        } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
                    >
                        Builder
                    </button>
                </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'tester' && (
                <div id="tester-content">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
                        <div className="mb-3">
                            <label htmlFor="regex-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Regular Expression:</label>
                            <input
                                type="text"
                                id="regex-input"
                                value={regexInput}
                                onChange={(e) => setRegexInput(e.target.value)}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg font-mono bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="/your-regex/flags"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="test-string" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Test String:</label>
                            <textarea
                                id="test-string"
                                rows="5"
                                value={testString}
                                onChange={(e) => setTestString(e.target.value)}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="Enter string to test against..."
                            />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button onClick={() => { setRegexInput(''); setTestString(''); setMatches([]); }} className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 flex items-center text-sm">
                                <TrashIcon className="h-4 w-4 mr-1" /> Clear Fields
                            </button>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
                        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <h3 className="text-base font-medium mb-2 text-gray-700 dark:text-gray-300">Matches:</h3>
                            {matches.length > 0 ? (
                                <ul className="list-disc pl-5 text-sm">
                                    {matches.map((match, index) => <li key={index}>{typeof match === 'string' ? match : JSON.stringify(match)}</li>)}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400">No matches found or invalid RegEx.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'builder' && (
                <div id="builder-content">
                    {/* Temporarily hiding the Simple RegEx Maker section
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Simple RegEx Maker</h3>
                        <div className="mb-3">
                            <label htmlFor="builder-input-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                1. Paste your Input String (for building RegEx):
                            </label>
                            <textarea
                                id="builder-input-text"
                                rows="5"
                                ref={builderInputRef} 
                                value={builderInputText}
                                onChange={(e) => setBuilderInputText(e.target.value)}
                                onMouseUp={handleBuilderInputMouseUp} // Primary selection capture
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="Paste text here and select the part you want to match..."
                            />
                        </div>
                        {selectedTextForBuilder && ( 
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Selected: "<span className="font-semibold text-purple-600 dark:text-purple-400">{selectedTextForBuilder}</span>"</p>
                        )}
                        {builderWarning && <p className="text-sm text-red-500 dark:text-red-400 mb-2">{builderWarning}</p>}
                         <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">2. Test String (to check generated RegEx):</h4>
                            <div className="mb-3">
                                <label htmlFor="builder-test-string" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Test String:</label>
                                <textarea
                                    id="builder-test-string"
                                    rows="3"
                                    value={builderTestString}
                                    onChange={(e) => setBuilderTestString(e.target.value)}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="Paste string to test the generated RegEx against..."
                                />
                            </div>
                            {generatedRegexByBuilder && (
                                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                    <h3 className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Matches in Builder Test String:</h3>
                                    {builderMatches.length > 0 ? (
                                        <ul className="list-disc pl-5 text-xs">
                                            {builderMatches.map((match, index) => <li key={index}>{match}</li>)}
                                        </ul>
                                    ) : (
                                        <p className="text-xs text-gray-500 dark:text-gray-400">No matches found.</p>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                                // Removed onMouseDown, onClick is the primary trigger
                                onClick={generateRegexFromSelection} 
                                className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 text-sm"
                            >Generate Literal RegEx from Selection</button>
                            <button onClick={useSampleForBuilder} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 text-sm">Use Sample Data</button>
                            <button onClick={clearBuilder} className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 flex items-center text-sm"><TrashIcon className="h-4 w-4 mr-1" /> Clear Builder</button>
                        </div>
                    </div>
                    */}
                    <p className="text-center text-gray-500 dark:text-gray-400 p-8">The RegEx Builder feature is currently under construction. Please use the Tester tab for now.</p>
                </div>
            )}
        </main>
    );
}
