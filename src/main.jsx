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

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  
  // Initialize gtag and set default consent
  gtag('js', new Date());
  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500 // Milliseconds to wait for consent update before sending hits
  });

  // Check for existing consent from localStorage (likely set by CookieBanner)
  const savedConsent = localStorage.getItem('cookieConsent');
  if (savedConsent) {
    const { ad_storage, analytics_storage } = JSON.parse(savedConsent); // Ensure keys match what CookieBanner saves
    gtag('consent', 'update', { ad_storage, analytics_storage });
  }

  gtag('config', gaMeasurementId);
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