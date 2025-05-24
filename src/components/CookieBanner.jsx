import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookieConsent')) {
      setVisible(true);
      // Default to denied before consent
      window.gtag('consent', 'default', {
        ad_storage: 'denied',
        analytics_storage: 'denied'
      });
    }
  }, []);

  const updateConsent = (adStorage, analyticsStorage) => {
    window.gtag('consent', 'update', {
      ad_storage: adStorage,
      analytics_storage: analyticsStorage
    });
    localStorage.setItem('cookieConsent', JSON.stringify({ adStorage, analyticsStorage }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm mb-3">
          We use cookies for essential functionality and analytics. 
          <a href="/privacy" className="text-purple-400 hover:underline ml-1">Learn more</a>.
        </p>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => updateConsent('granted', 'granted')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm"
          >
            Accept All
          </button>
          <button 
            onClick={() => updateConsent('denied', 'denied')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
          >
            Reject All
          </button>
          <button 
            onClick={() => updateConsent('denied', 'granted')}
            className="border border-gray-400 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
          >
            Analytics Only
          </button>
        </div>
      </div>
    </div>
  );
}