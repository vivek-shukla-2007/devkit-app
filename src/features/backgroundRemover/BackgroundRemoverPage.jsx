import React, { useState, useRef, useEffect } from 'react';
import {
    CloudArrowUpIcon,
    ArrowDownTrayIcon,
    ArrowPathIcon,
    CheckCircleIcon,
    ArrowLeftIcon,
    SparklesIcon,
    InformationCircleIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import confetti from 'canvas-confetti';

export default function BackgroundRemoverPage() {
    const [image, setImage] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [step, setStep] = useState('upload'); // upload, processing, download
    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
                setProcessedImage(null);
                setStep('upload');
            };
            reader.readAsDataURL(file);
        }
    };

    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.setAttribute('crossOrigin', 'anonymous');
            image.src = url;
        });

    const removeBackground = async () => {
        setIsProcessing(true);
        setStep('processing');

        try {
            const img = await createImage(image);
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            // Draw the image
            ctx.drawImage(img, 0, 0);

            // Get image data
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Simple color-based background removal
            // This removes pixels that are similar to the most common color (background)
            const colorFrequency = {};
            let maxColor = null;
            let maxCount = 0;

            // Count color frequencies (sample every 4th pixel for performance)
            for (let i = 0; i < data.length; i += 16) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const colorKey = `${r},${g},${b}`;

                colorFrequency[colorKey] = (colorFrequency[colorKey] || 0) + 1;

                if (colorFrequency[colorKey] > maxCount) {
                    maxCount = colorFrequency[colorKey];
                    maxColor = [r, g, b];
                }
            }

            // If no background detected, use white as default
            if (!maxColor) {
                maxColor = [255, 255, 255];
            }

            // Remove background by making similar colors transparent
            const threshold = 50; // Color similarity threshold
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                // Calculate color distance
                const distance = Math.sqrt(
                    Math.pow(r - maxColor[0], 2) +
                    Math.pow(g - maxColor[1], 2) +
                    Math.pow(b - maxColor[2], 2)
                );

                // If color is similar to background, make it transparent
                if (distance < threshold) {
                    data[i + 3] = 0; // Set alpha to 0 (transparent)
                }
            }

            ctx.putImageData(imageData, 0, 0);
            const result = canvas.toDataURL('image/png');
            setProcessedImage(result);
            setStep('download');

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } catch (error) {
            console.error('Error removing background:', error);
            alert('Error processing image. Please try again.');
        }

        setIsProcessing(false);
    };

    const downloadImage = () => {
        const link = document.createElement('a');
        link.download = 'image-no-background.png';
        link.href = processedImage;
        link.click();
    };

    const downloadWithWhiteBackground = async () => {
        try {
            const img = await createImage(processedImage);
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            // Draw white background
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw the processed image on top
            ctx.drawImage(img, 0, 0);

            const link = document.createElement('a');
            link.download = 'image-white-background.jpg';
            link.href = canvas.toDataURL('image/jpeg', 0.95);
            link.click();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Background Image Remover</h2>
                {step !== 'upload' && (
                    <button
                        onClick={() => {
                            if (step === 'download') setStep('upload');
                            else {
                                setImage(null);
                                setProcessedImage(null);
                                setStep('upload');
                            }
                        }}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                        <ArrowLeftIcon className="h-4 w-4 mr-1" /> Back
                    </button>
                )}
            </div>

            {step === 'upload' && (
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 border-2 border-dashed border-gray-300 dark:border-gray-700 text-center">
                        <div className="mb-6 flex justify-center">
                            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                <CloudArrowUpIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Upload your image</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">Select an image with a clear background. Works best with solid color backgrounds.</p>
                        <label className="cursor-pointer inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-blue-500/25">
                            <span>Choose Image</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                                <div className="flex items-center mb-2 text-blue-600 dark:text-blue-400">
                                    <InformationCircleIcon className="h-5 w-5 mr-2" />
                                    <span className="font-medium">Solid Background</span>
                                </div>
                                <p className="text-xs text-gray-500">Works best with uniform background colors like white or blue.</p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                                <div className="flex items-center mb-2 text-blue-600 dark:text-blue-400">
                                    <InformationCircleIcon className="h-5 w-5 mr-2" />
                                    <span className="font-medium">Clear Subject</span>
                                </div>
                                <p className="text-xs text-gray-500">Ensure your subject is well-defined and distinct from the background.</p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                                <div className="flex items-center mb-2 text-blue-600 dark:text-blue-400">
                                    <InformationCircleIcon className="h-5 w-5 mr-2" />
                                    <span className="font-medium">High Quality</span>
                                </div>
                                <p className="text-xs text-gray-500">Higher resolution images produce better results.</p>
                            </div>
                        </div>
                    </div>

                    {image && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Preview</h3>
                            <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-4 flex justify-center max-h-96 overflow-auto">
                                <img src={image} alt="Preview" className="max-w-full max-h-full rounded-lg" />
                            </div>
                            <button
                                onClick={removeBackground}
                                disabled={isProcessing}
                                className="w-full mt-6 flex items-center justify-center px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-blue-500/25 disabled:opacity-50"
                            >
                                <SparklesIcon className="h-5 w-5 mr-2" />
                                {isProcessing ? 'Processing...' : 'Remove Background'}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {step === 'processing' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center border border-gray-200 dark:border-gray-700">
                    <div className="mb-6 flex justify-center">
                        <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full animate-spin">
                            <SparklesIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Processing your image</h3>
                    <p className="text-gray-600 dark:text-gray-400">Removing background... This may take a moment.</p>
                </div>
            )}

            {step === 'download' && processedImage && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Original</h3>
                            <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-4 flex justify-center max-h-80 overflow-auto">
                                <img src={image} alt="Original" className="max-w-full max-h-full rounded-lg" />
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Background Removed</h3>
                            <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 rounded-xl p-4 flex justify-center max-h-80 overflow-auto">
                                <img src={processedImage} alt="Processed" className="max-w-full max-h-full rounded-lg" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button
                            onClick={downloadImage}
                            className="flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/25"
                        >
                            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                            Download as PNG (Transparent)
                        </button>

                        <button
                            onClick={downloadWithWhiteBackground}
                            className="flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-green-500/25"
                        >
                            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                            Download as JPG (White BG)
                        </button>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 flex items-start">
                        <InformationCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5" />
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                            The background removal uses intelligent color detection. For best results with complex backgrounds, consider using dedicated AI tools like remove.bg.
                        </p>
                    </div>
                </div>
            )}
        </main>
    );
}
