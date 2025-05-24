import React, { useState, useEffect } from 'react';

function CronGeneratorPage() {
    const [minute, setMinute] = useState('*');
    const [hour, setHour] = useState('*');
    const [dayOfMonth, setDayOfMonth] = useState('*');
    const [month, setMonth] = useState('*');
    const [dayOfWeek, setDayOfWeek] = useState('*');
    const [cronExpression, setCronExpression] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Update cron expression whenever any input changes
        setCronExpression(`${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`);
    }, [minute, hour, dayOfMonth, month, dayOfWeek]);

    const clearFields = () => {
        setMinute('*');
        setHour('*');
        setDayOfMonth('*');
        setMonth('*');
        setDayOfWeek('*');
        setMessage('');
    };

    const copyToClipboard = async () => {
        if (cronExpression) {
            try {
                await navigator.clipboard.writeText(cronExpression);
                setMessage('Copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy text: ', err);
                setMessage('Failed to copy.');
            }
        } else {
            setMessage('Nothing to copy!');
        }
    };

    const cronOptions = {
        minutes: ['*', ...Array(60).keys()].map(String),
        hours: ['*', ...Array(24).keys()].map(String),
        daysOfMonth: ['*', ...Array(31).keys()].map(i => String(i + 1)),
        months: ['*', '1 (Jan)', '2 (Feb)', '3 (Mar)', '4 (Apr)', '5 (May)', '6 (Jun)', '7 (Jul)', '8 (Aug)', '9 (Sep)', '10 (Oct)', '11 (Nov)', '12 (Dec)'].map((val, idx) => idx === 0 ? val : String(idx)),
        daysOfWeek: ['*', '0 (Sun)', '1 (Mon)', '2 (Tue)', '3 (Wed)', '4 (Thu)', '5 (Fri)', '6 (Sat)'].map((val, idx) => idx === 0 ? val : String(idx - 1)),
    };


    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Cron Expression Generator</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Minute */}
                    <div>
                        <label htmlFor="minute" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Minute (0-59)</label>
                        <select
                            id="minute"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
                            value={minute}
                            onChange={(e) => setMinute(e.target.value)}
                        >
                            {cronOptions.minutes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                    {/* Hour */}
                    <div>
                        <label htmlFor="hour" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Hour (0-23)</label>
                        <select
                            id="hour"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
                            value={hour}
                            onChange={(e) => setHour(e.target.value)}
                        >
                            {cronOptions.hours.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                    {/* Day of Month */}
                    <div>
                        <label htmlFor="dayOfMonth" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Day of Month (1-31)</label>
                        <select
                            id="dayOfMonth"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
                            value={dayOfMonth}
                            onChange={(e) => setDayOfMonth(e.target.value)}
                        >
                            {cronOptions.daysOfMonth.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                    {/* Month */}
                    <div>
                        <label htmlFor="month" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Month (1-12)</label>
                        <select
                            id="month"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        >
                            {cronOptions.months.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                    {/* Day of Week */}
                    <div>
                        <label htmlFor="dayOfWeek" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Day of Week (0-6 Sun-Sat)</label>
                        <select
                            id="dayOfWeek"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
                            value={dayOfWeek}
                            onChange={(e) => setDayOfWeek(e.target.value)}
                        >
                            {cronOptions.daysOfWeek.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                </div>

                {/* Result and Actions */}
                <div className="mt-6">
                    <label htmlFor="cron-result" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Cron Expression</label>
                    <textarea
                        id="cron-result"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-24 resize-y font-mono text-sm"
                        value={cronExpression}
                        readOnly
                        placeholder="Your cron expression will appear here..."
                    ></textarea>
                    {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={copyToClipboard}
                        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                    >
                        <i className="fas fa-copy mr-2"></i> Copy Expression
                    </button>
                    <button
                        onClick={clearFields}
                        className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
                    >
                        <i className="fas fa-times mr-2"></i> Reset
                    </button>
                </div>
            </div>
        </main>
    );
}

export default CronGeneratorPage;