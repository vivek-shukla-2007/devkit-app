import React, { useEffect } from 'react';

/**
 * AdSpace Component
 * Placeholder for Google AdSense ads
 * Maintains proper spacing and layout for ad placements
 * Replace the adSlot and clientId with your actual AdSense values
 */
export default function AdSpace({ 
    slot = '0000000000',
    format = 'auto',
    responsive = true,
    className = ''
}) {
    useEffect(() => {
        // Push ads when component mounts
        if (window.adsbygoogle) {
            try {
                window.adsbygoogle.push({});
            } catch (e) {
                console.error('AdSense error:', e);
            }
        }
    }, []);

    return (
        <div className={`my-6 flex justify-center ${className}`}>
            <ins
                className="adsbygoogle"
                style={{
                    display: 'block',
                    minHeight: '250px',
                    width: '100%',
                    maxWidth: '728px'
                }}
                data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive}
            ></ins>
        </div>
    );
}
