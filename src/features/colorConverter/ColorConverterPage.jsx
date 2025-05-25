import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { ClipboardDocumentIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function ColorConverterPage() {
    const [color, setColor] = useState({ hex: '#4A90E2', rgb: { r: 74, g: 144, b: 226, a: 1 }, hsl: { h: 217, s: 0.71, l: 0.59, a: 1 } });
    const [copiedValue, setCopiedValue] = useState(''); // hex, rgb, hsl
    const [manualInput, setManualInput] = useState({ hex: '#4A90E2', rgb: '74, 144, 226', hsl: '217, 71%, 59%' });

    const handleColorChange = (newColor) => {
        setColor(newColor);
        setManualInput({
            hex: newColor.hex,
            rgb: `${newColor.rgb.r}, ${newColor.rgb.g}, ${newColor.rgb.b}`,
            hsl: `${Math.round(newColor.hsl.h)}, ${Math.round(newColor.hsl.s * 100)}%, ${Math.round(newColor.hsl.l * 100)}%`
        });
    };

    const handleManualInputChange = (type, value) => {
        const newManualInput = { ...manualInput, [type]: value };
        setManualInput(newManualInput);

        try {
            if (type === 'hex') {
                if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
                    setColor({ ...color, hex: value });
                }
            } else if (type === 'rgb') {
                const parts = value.split(',').map(p => parseInt(p.trim(), 10));
                if (parts.length === 3 && parts.every(p => !isNaN(p) && p >= 0 && p <= 255)) {
                    setColor({ ...color, rgb: { r: parts[0], g: parts[1], b: parts[2], a: 1 } });
                }
            } else if (type === 'hsl') {
                const parts = value.split(',').map(p => parseFloat(p.replace('%', '').trim()));
                if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && parts[1] >= 0 && parts[1] <= 100 && !isNaN(parts[2]) && parts[2] >= 0 && parts[2] <= 100) {
                    setColor({ ...color, hsl: { h: parts[0], s: parts[1] / 100, l: parts[2] / 100, a: 1 } });
                }
            }
        } catch (e) {
            console.error("Error parsing manual color input:", e);
        }
    };

    const copyToClipboard = async (text, type) => {
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
            setCopiedValue(type);
            setTimeout(() => setCopiedValue(''), 2000);
        } catch (err) {
            console.error(`Failed to copy ${type}: `, err);
        }
    };

    const colorToRgbString = (rgb) => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    const colorToHslString = (hsl) => `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`;

    // Update manual inputs when color object changes (e.g. from SketchPicker)
    useEffect(() => {
        setManualInput({
            hex: color.hex,
            rgb: `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`,
            hsl: `${Math.round(color.hsl.h)}, ${Math.round(color.hsl.s * 100)}%, ${Math.round(color.hsl.l * 100)}%`
        });
    }, [color.hex, color.rgb, color.hsl]);


    const renderColorInput = (label, type, value, example) => (
        <div className="mb-4">
            <label htmlFor={`color-input-${type}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <div className="mt-1 flex rounded-md shadow-sm">
                <input
                    type="text"
                    id={`color-input-${type}`}
                    value={manualInput[type]}
                    onChange={(e) => handleManualInputChange(type, e.target.value)}
                    placeholder={`e.g. ${example}`}
                    className="flex-1 block w-full min-w-0 rounded-none rounded-l-md p-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                    onClick={() => copyToClipboard(type === 'hex' ? color.hex : type === 'rgb' ? colorToRgbString(color.rgb) : colorToHslString(color.hsl), type)}
                    className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500"
                >
                    {copiedValue === type ? <CheckCircleIcon className="h-5 w-5 text-green-500" /> : <ClipboardDocumentIcon className="h-5 w-5" />}
                </button>
            </div>
        </div>
    );

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Color Picker & Converter</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700 flex flex-col items-center">
                    <SketchPicker
                        color={color.rgb} // SketchPicker works well with RGB
                        onChangeComplete={handleColorChange}
                        width="100%"
                        className="max-w-xs shadow-none border-none"
                        styles={{ default: { picker: { boxShadow: 'none', background: 'transparent', padding: '0' } } }}
                        presetColors={[
                            '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321',
                            '#4A90E2', '#BD10E0', '#9013FE', '#4A4A4A', '#000000',
                            '#FFFFFF',
                        ]}
                    />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color Values</h3>
                    <div className="mb-3 p-3 rounded-lg h-20" style={{ backgroundColor: color.hex }}>
                        <p className="text-center text-lg font-medium" style={{ color: color.hsl.l > 0.5 ? '#000' : '#FFF' }}>
                            Preview
                        </p>
                    </div>
                    {renderColorInput("HEX", "hex", color.hex, "#4A90E2")}
                    {renderColorInput("RGB", "rgb", colorToRgbString(color.rgb), "74, 144, 226")}
                    {renderColorInput("HSL", "hsl", colorToHslString(color.hsl), "217, 71%, 59%")}
                </div>
            </div>
        </main>
    );
}