import React, { useState } from 'react';
import { format } from 'sql-formatter';
import { ClipboardDocumentIcon, CheckCircleIcon, ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline';

const dialects = ["sql", "bigquery", "db2", "hive", "mariadb", "mysql", "n1ql", "plsql", "postgresql", "redshift", "singlestoredb", "snowflake", "spark", "sqlite", "transactsql", "trino", "tsql"];

export default function SqlFormatterPage() {
    const [sqlInput, setSqlInput] = useState('');
    const [formattedSql, setFormattedSql] = useState('');
    const [dialect, setDialect] = useState('sql'); // Default to standard SQL
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const [message, setMessage] = useState('');

    const handleFormat = () => {
        if (!sqlInput.trim()) {
            setError("Input SQL cannot be empty.");
            setFormattedSql('');
            return;
        }
        setError('');
        setMessage('');
        try {
            const result = format(sqlInput, { language: dialect, tabWidth: 2 });
            setFormattedSql(result);
            setMessage('SQL successfully formatted.');
        } catch (e) {
            console.error("SQL Formatting Error:", e);
            setError(`Formatting Error: ${e.message}. Try a different dialect or check syntax.`);
            setFormattedSql('');
        }
        setCopied(false);
    };

    const handleCopyOutput = async () => {
        if (!formattedSql) {
            setMessage('Nothing to copy.');
            setCopied(false);
            return;
        }
        try {
            await navigator.clipboard.writeText(formattedSql);
            setMessage('Formatted SQL copied to clipboard!');
            setCopied(true);
            setTimeout(() => {
                setMessage('SQL successfully formatted.');
                setCopied(false);
            }, 2500);
        } catch (err) {
            setMessage('Failed to copy to clipboard.');
            setCopied(false);
        }
    };

    const handleClear = () => {
        setSqlInput('');
        setFormattedSql('');
        setError('');
        setMessage('');
        setCopied(false);
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">SQL Formatter</h2> 
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
                <div className="mb-4">
                    <label htmlFor="sql-dialect" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SQL Dialect:</label>
                    <select id="sql-dialect" value={dialect} onChange={(e) => setDialect(e.target.value)} className="w-full sm:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500">
                        {dialects.map(d => <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
                    </select>
                </div>
                <label htmlFor="sql-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Input SQL</label>
                <textarea id="sql-input" rows="10" value={sqlInput} onChange={(e) => setSqlInput(e.target.value)} placeholder="Paste your SQL query here..." className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 resize-y font-mono text-sm" />
                {error && <p className="mt-2 text-sm text-red-500 dark:text-red-400">{error}</p>}
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                    <button onClick={handleFormat} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 flex items-center"><ArrowPathIcon className="h-5 w-5 mr-2" /> Format SQL</button>
                    <button onClick={handleCopyOutput} disabled={!formattedSql || !!error} className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed">{copied ? <CheckCircleIcon className="h-5 w-5 mr-2" /> : <ClipboardDocumentIcon className="h-5 w-5 mr-2" />} Copy Formatted</button>
                    <button onClick={handleClear} className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 flex items-center"><TrashIcon className="h-5 w-5 mr-2" /> Clear</button>
                </div>
            </div>
            {formattedSql && !error && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
                    <label htmlFor="sql-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Formatted SQL</label>
                    <pre id="sql-output" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-80 md:h-96 overflow-auto font-mono text-sm">{formattedSql}</pre>
                </div>
            )}
            {message && <p className={`mt-2 text-sm text-center ${copied ? 'text-green-500 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>{message}</p>}
        </main>
    );
}