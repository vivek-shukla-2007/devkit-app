import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import CookieBanner from './components/CookieBanner';

// Initialize Google Analytics / Google Tag
const gaMeasurementId = 'G-RLG50KJ8KR';
const gtagScriptId = 'google-analytics-gtag-script';

if (gaMeasurementId && !document.getElementById(gtagScriptId)) {
  const gtagScript = document.createElement('script');
  gtagScript.id = gtagScriptId;
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
  document.head.appendChild(gtagScript);

  // Ensure dataLayer and gtag are defined on the window object
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { // Explicitly assign the shim to window.gtag
    window.dataLayer.push(arguments);
  };
  
  // Initialize gtag and set default consent
  window.gtag('js', new Date());
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500 // Milliseconds to wait for consent update before sending hits
  });

  // Check for existing consent from localStorage (likely set by CookieBanner)
  const savedConsent = localStorage.getItem('cookieConsent');
  if (savedConsent) {
    // Ensure keys match what CookieBanner saves, e.g., ad_storage or adStorage
    const consentState = JSON.parse(savedConsent); 
    window.gtag('consent', 'update', { 
      ad_storage: consentState.ad_storage || consentState.adStorage, 
      analytics_storage: consentState.analytics_storage || consentState.analyticsStorage 
    });
  }

  window.gtag('config', gaMeasurementId);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookieBanner />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);