import React, { useState, useCallback, useRef } from 'react';
import Cropper from 'react-easy-crop';
import {
    CloudArrowUpIcon,
    ArrowPathIcon,
    ArrowDownTrayIcon,
    CheckCircleIcon,
    ArrowLeftIcon,
    ScissorsIcon,
    PrinterIcon,
    InformationCircleIcon
} from '@heroicons/react/24/outline';
import confetti from 'canvas-confetti';

const PHOTO_SPECS = [
    { id: 'usa', name: 'USA (2×2 inch / 51×51mm)', width: 51, height: 51, label: 'USA' },
    { id: 'uk', name: 'UK (35×45 mm)', width: 35, height: 45, label: 'UK' },
    { id: 'india', name: 'India (2×2 inch / 51×51mm)', width: 51, height: 51, label: 'India' },
    { id: 'schengen', name: 'Schengen (35×45 mm)', width: 35, height: 45, label: 'Schengen' },
    { id: 'canada', name: 'Canada (50×70 mm)', width: 50, height: 70, label: 'Canada' },
    { id: 'australia', name: 'Australia (35×45 mm)', width: 35, height: 45, label: 'Australia' },
    { id: 'china', name: 'China (33×48 mm)', width: 33, height: 48, label: 'China' },
    { id: 'japan', name: 'Japan (35×45 mm)', width: 35, height: 45, label: 'Japan' },
];

const PAPER_SIZES = [
    { id: 'a4', name: 'A4 (210×297 mm)', width: 210, height: 297 },
    { id: 'a5', name: 'A5 (148×210 mm)', width: 148, height: 210 },
    { id: 'a6', name: 'A6 (105×148 mm)', width: 105, height: 148 },
    { id: '4x6', name: '4×6 inch (102×152 mm)', width: 102, height: 152 },
    { id: '5x7', name: '5×7 inch (127×178 mm)', width: 127, height: 178 },
    { id: '8x10', name: '8×10 inch (203×254 mm)', width: 203, height: 254 },
    { id: 'letter', name: 'Letter (216×279 mm)', width: 216, height: 279 },
];

export default function PassportPhotoMakerPage() {
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [selectedSpec, setSelectedSpec] = useState(PHOTO_SPECS[0]);
    const [step, setStep] = useState('upload'); // upload, crop, download
    const [selectedPaper, setSelectedPaper] = useState(PAPER_SIZES[0]);
    const [downloadMode, setDownloadMode] = useState('single'); // single, multiple
    const [isProcessing, setIsProcessing] = useState(false);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
                setStep('crop');
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

    const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const maxSize = Math.max(image.width, image.height);
        const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

        canvas.width = safeArea;
        canvas.height = safeArea;

        ctx.translate(safeArea / 2, safeArea / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-safeArea / 2, -safeArea / 2);

        ctx.drawImage(
            image,
            safeArea / 2 - image.width * 0.5,
            safeArea / 2 - image.height * 0.5
        );

        const data = ctx.getImageData(0, 0, safeArea, safeArea);

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.putImageData(
            data,
            Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
            Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
        );

        return canvas.toDataURL('image/jpeg');
    };

    const handleCropSave = async () => {
        setStep('download');
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    };

    const downloadSingle = async () => {
        setIsProcessing(true);
        try {
            const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
            const link = document.createElement('a');
            link.download = `passport-photo-${selectedSpec.id}.jpg`;
            link.href = croppedImage;
            link.click();
        } catch (e) {
            console.error(e);
        }
        setIsProcessing(false);
    };

    const downloadMultiple = async () => {
        setIsProcessing(true);
        try {
            const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
            const img = await createImage(croppedImage);
            
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // DPI calculation (assuming 300 DPI)
            const dpi = 300;
            const mmToInch = 25.4;
            const paperWidthPx = (selectedPaper.width / mmToInch) * dpi;
            const paperHeightPx = (selectedPaper.height / mmToInch) * dpi;
            const photoWidthPx = (selectedSpec.width / mmToInch) * dpi;
            const photoHeightPx = (selectedSpec.height / mmToInch) * dpi;
            
            canvas.width = paperWidthPx;
            canvas.height = paperHeightPx;
            
            // Fill white background
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            const margin = 20; // px
            const cols = Math.floor((paperWidthPx - margin) / (photoWidthPx + margin));
            const rows = Math.floor((paperHeightPx - margin) / (photoHeightPx + margin));
            
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = margin + c * (photoWidthPx + margin);
                    const y = margin + r * (photoHeightPx + margin);
                    ctx.drawImage(img, x, y, photoWidthPx, photoHeightPx);
                    
                    // Draw light border
                    ctx.strokeStyle = '#eee';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(x, y, photoWidthPx, photoHeightPx);
                }
            }
            
            const link = document.createElement('a');
            link.download = `passport-print-sheet-${selectedPaper.id}.jpg`;
            link.href = canvas.toDataURL('image/jpeg', 0.9);
            link.click();
        } catch (e) {
            console.error(e);
        }
        setIsProcessing(false);
    };

    return (
        <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Passport Photo Maker</h2>
                {step !== 'upload' && (
                    <button 
                        onClick={() => {
                            if (step === 'download') setStep('crop');
                            else {
                                setImage(null);
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
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 border-2 border-dashed border-gray-300 dark:border-gray-700 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                            <CloudArrowUpIcon className="h-12 w-12 text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Upload your photo</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">Select a clear portrait photo. All processing happens in your browser.</p>
                    <label className="cursor-pointer inline-flex items-center px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-purple-500/25">
                        <span>Choose Photo</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                            <div className="flex items-center mb-2 text-purple-600 dark:text-purple-400">
                                <InformationCircleIcon className="h-5 w-5 mr-2" />
                                <span className="font-medium">Clear Face</span>
                            </div>
                            <p className="text-xs text-gray-500">Look straight at the camera with a neutral expression.</p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                            <div className="flex items-center mb-2 text-purple-600 dark:text-purple-400">
                                <InformationCircleIcon className="h-5 w-5 mr-2" />
                                <span className="font-medium">Good Lighting</span>
                            </div>
                            <p className="text-xs text-gray-500">Avoid shadows on your face or in the background.</p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                            <div className="flex items-center mb-2 text-purple-600 dark:text-purple-400">
                                <InformationCircleIcon className="h-5 w-5 mr-2" />
                                <span className="font-medium">Plain Background</span>
                            </div>
                            <p className="text-xs text-gray-500">Use a white or off-white background for best results.</p>
                        </div>
                    </div>
                </div>
            )}

            {step === 'crop' && (
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center space-x-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Format:</label>
                                <select 
                                    value={selectedSpec.id}
                                    onChange={(e) => setSelectedSpec(PHOTO_SPECS.find(s => s.id === e.target.value))}
                                    className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 p-2"
                                >
                                    {PHOTO_SPECS.map(spec => (
                                        <option key={spec.id} value={spec.id}>{spec.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-500">Zoom</span>
                                    <input
                                        type="range"
                                        value={zoom}
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        aria-labelledby="Zoom"
                                        onChange={(e) => setZoom(e.target.value)}
                                        className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-500">Rotate</span>
                                    <button onClick={() => setRotation(r => (r + 90) % 360)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                        <ArrowPathIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[500px] w-full bg-gray-900">
                            <Cropper
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                rotation={rotation}
                                aspect={selectedSpec.width / selectedSpec.height}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                showGrid={true}
                            />
                            {/* Guideline Overlay */}
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                <div 
                                    className="border-2 border-white/50 rounded-full"
                                    style={{
                                        width: '40%',
                                        height: '55%',
                                        marginTop: '-5%'
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 dark:bg-gray-900/50 flex justify-center">
                            <button 
                                onClick={handleCropSave}
                                className="flex items-center px-10 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-green-500/25"
                            >
                                <ScissorsIcon className="h-5 w-5 mr-2" /> Crop & Continue
                            </button>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 flex items-start">
                        <InformationCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5" />
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                            Position your face within the oval guideline. Ensure your head is centered and there's some space above your hair.
                        </p>
                    </div>
                </div>
            )}

            {step === 'download' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center mb-6">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                                <CheckCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Single Photo</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">Download a single high-quality photo for online applications.</p>
                        <button 
                            onClick={downloadSingle}
                            disabled={isProcessing}
                            className="w-full flex items-center justify-center px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 disabled:opacity-50"
                        >
                            <ArrowDownTrayIcon className="h-5 w-5 mr-2" /> 
                            {isProcessing ? 'Processing...' : 'Download JPG'}
                        </button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center mb-6">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-4">
                                <PrinterIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Print Sheet</h3>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Paper Size:</label>
                            <select 
                                value={selectedPaper.id}
                                onChange={(e) => setSelectedPaper(PAPER_SIZES.find(p => p.id === e.target.value))}
                                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 p-3"
                            >
                                {PAPER_SIZES.map(paper => (
                                    <option key={paper.id} value={paper.id}>{paper.name}</option>
                                ))}
                            </select>
                        </div>
                        <button 
                            onClick={downloadMultiple}
                            disabled={isProcessing}
                            className="w-full flex items-center justify-center px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-purple-500/25 disabled:opacity-50"
                        >
                            <PrinterIcon className="h-5 w-5 mr-2" />
                            {isProcessing ? 'Processing...' : 'Download Print Sheet'}
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
