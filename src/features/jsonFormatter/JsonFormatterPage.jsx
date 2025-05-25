import React, { useState, useEffect } from 'react';
import ReactJson from 'react-json-view'; // For the tree view
import {
    ClipboardDocumentIcon,
    CheckCircleIcon,
    TrashIcon,       // For Clear All
    ChevronDownIcon, // For collapsing input
    ChevronUpIcon,   // For expanding input
    // EyeIcon,         // Old For Expand All (Tree)
    // EyeSlashIcon,    // Old For Collapse All (Tree)
    ArrowsPointingOutIcon, // New for Expand All (Tree)
    ArrowsPointingInIcon,  // New for Collapse All (Tree)
    Bars3Icon,       // For Text View mode
    ShareIcon,       // New for Tree View mode (was TableCellsIcon)
    DocumentTextIcon, // For Load Sample
    MinusCircleIcon  // For Minify JSON
} from '@heroicons/react/24/outline';

function JsonFormatterPage() {
  const [inputJson, setInputJson] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [jsonObject, setJsonObject] = useState(null); // To store the parsed JSON object for the tree view
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // For user feedback (e.g., copied to clipboard)
  const [copied, setCopied] = useState(false);

  // New states for UI enhancements
  const [isInputCollapsed, setIsInputCollapsed] = useState(false);
  const [outputViewMode, setOutputViewMode] = useState('text'); // 'text' or 'tree'
  const [treeViewCollapsed, setTreeViewCollapsed] = useState(2); // Default collapse depth for tree view

  // Effect to auto-format JSON when inputJson changes
  useEffect(() => {
    if (!inputJson.trim()) {
      setFormattedJson('');
      setJsonObject(null);
      setError('');
      return;
    }

    try {
      const parsedJson = JSON.parse(inputJson);
      setFormattedJson(JSON.stringify(parsedJson, null, 2)); // 2 spaces for indentation
      setJsonObject(parsedJson);
      setError(''); // Clear any previous error
      setIsInputCollapsed(true); // Auto-collapse input section on successful format
    } catch (e) {
      setError('Invalid JSON: ' + e.message);
      setFormattedJson(''); // Clear previous formatted output
      setJsonObject(null);
      setIsInputCollapsed(false); // Ensure input is expanded if there's an error
    }
  }, [inputJson]);

  const handleInputChange = (event) => {
    setInputJson(event.target.value);
    // Clear message on new input
    setMessage('');
    setCopied(false);
  };

  const handleCopyOutput = async (textToCopy, type = "Formatted JSON") => {
    if (!textToCopy) {
      setMessage(`Nothing to copy.`);
      setCopied(false);
      return;
    }
    if (textToCopy) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setMessage(`${type} copied to clipboard!`);
        setCopied(true);
        setTimeout(() => {
          setMessage('');
          setCopied(false);
        }, 2500);
      } catch (err) {
        console.error('Failed to copy text: ', err);
        setMessage('Failed to copy to clipboard.');
        setCopied(false);
      }
    }
  };

  const handleClearAll = () => {
    setInputJson('');
    // formattedJson and error will be cleared by the useEffect hook
    setMessage('');
    setCopied(false);
    setIsInputCollapsed(false);
  };

  const loadSampleJson = () => {
    const sample = {
      "name": "DevKit Sample JSON", "version": "1.0.0", "status": "active",
      "data": { "id": 123, "value": "Test Data", "nestedArray": [1, 2, {"key": "value"}], "isValid": true },
      "settings": {"theme": "dark", "notifications": false, "features": ["formatter", "validator", "treeView"]}
    };
    setInputJson(JSON.stringify(sample, null, 2)); // Prettify the sample for the input field too
    setMessage('Sample JSON loaded.');
    setIsInputCollapsed(false); // Ensure input is visible when sample is loaded
  };

  const handleMinifyJson = () => {
    if (!inputJson.trim()) {
      setError("Input JSON cannot be empty to minify.");
      setFormattedJson('');
      setJsonObject(null);
      return;
    }
    try {
      const parsedJson = JSON.parse(inputJson);
      setFormattedJson(JSON.stringify(parsedJson)); // Minify (no pretty-print args)
      setJsonObject(parsedJson); // Keep object for tree view
      setError('');
      setIsInputCollapsed(true); // Auto-collapse input
      setMessage('JSON successfully minified.');
    } catch (e) {
      setError('Invalid JSON: ' + e.message);
    }
  };
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">JSON Formatter & Validator</h2>
      
      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Input JSON</h3>
          <button
            onClick={() => setIsInputCollapsed(!isInputCollapsed)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title={isInputCollapsed ? "Show Input" : "Hide Input"}
          >
            {isInputCollapsed ? <ChevronDownIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" /> : <ChevronUpIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />}
          </button>
        </div>

        {!isInputCollapsed && (
          <textarea
            id="json-input"
            rows="10"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 resize-y font-mono text-sm"
            value={inputJson}
            onChange={handleInputChange}
            placeholder='Paste your JSON string here...'
          />
        )}

        {error && (
          <div className="mt-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md dark:bg-red-900 dark:border-red-700 dark:text-red-300" role="alert">
            <p>{error}</p>
          </div>
        )}
        {!error && formattedJson && !isInputCollapsed && <p className="mt-2 text-sm text-green-500 dark:text-green-400">JSON appears to be valid.</p>}

        <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4">
            <button
                onClick={loadSampleJson}
                className="px-5 py-2.5 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 flex items-center"
            >
                <DocumentTextIcon className="h-5 w-5 mr-2" /> Load Sample
            </button>
            <button
                onClick={handleMinifyJson}
                className="px-5 py-2.5 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 flex items-center"
            >
                <MinusCircleIcon className="h-5 w-5 mr-2" /> Minify JSON
            </button>
            <button
                onClick={handleClearAll}
                className="px-5 py-2.5 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 flex items-center"
            >
                <TrashIcon className="h-5 w-5 mr-2" /> Clear All
            </button>
        </div>
      </div>

      {/* Output Section - Show if there's formatted JSON or a JSON object for tree view, and no critical error */}
      {(formattedJson || jsonObject) && !error && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Formatted Output</h3>
            <div className="flex items-center gap-2">
              {/* View Mode Toggle */}
              <button
                onClick={() => setOutputViewMode('text')}
                className={`p-2 rounded-md transition-colors ${outputViewMode === 'text' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                title="Text View"
              >
                <Bars3Icon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setOutputViewMode('tree')}
                className={`p-2 rounded-md transition-colors ${outputViewMode === 'tree' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                title="Tree View"
              >
                <ShareIcon className="h-5 w-5" />
              </button>

              {/* Tree View Controls - shown only in tree mode and if jsonObject exists */}
              {outputViewMode === 'tree' && jsonObject && (
                <>
                  <button
                    onClick={() => setTreeViewCollapsed(true)} // true typically collapses all
                    className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    title="Collapse All"
                  >
                    <ArrowsPointingInIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => setTreeViewCollapsed(false)} // false typically expands all
                    className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    title="Expand All"
                  >
                    <ArrowsPointingOutIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </>
              )}
            </div>
          </div>

          {outputViewMode === 'text' && formattedJson && (
            <pre className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-80 md:h-96 overflow-auto font-mono text-sm">
              {formattedJson}
            </pre>
          )}

          {outputViewMode === 'tree' && jsonObject && (
            <div className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-auto min-h-[20rem] md:min-h-[24rem] max-h-[40rem] overflow-auto text-sm">
              <ReactJson
                src={jsonObject}
                name={null} // No root name for the JSON object itself
                theme={document.documentElement.classList.contains('dark') ? "ashes" : "rjv-default"} // Dynamically set theme
                collapsed={treeViewCollapsed} // Control collapse state
                indentWidth={2}
                displayObjectSize={false}
                displayDataTypes={false}
                enableClipboard={false} // Use our own copy button
                style={{ backgroundColor: 'transparent' }}
              />
            </div>
          )}

          <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4">
            <button
              onClick={() => handleCopyOutput(formattedJson)}
              disabled={!formattedJson}
              className="px-5 py-2.5 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copied ? <CheckCircleIcon className="h-5 w-5 mr-2" /> : <ClipboardDocumentIcon className="h-5 w-5 mr-2" />}
              Copy Formatted JSON
            </button>
          </div>
          {message && <p className={`mt-3 text-sm text-center ${copied ? 'text-green-500 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>{message}</p>}
        </div>
      )}
    </main>
  );
}

export default JsonFormatterPage;