"use client"
import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function GoogleAnalytics() {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    // Check localStorage for consent
    const cookieConsent = localStorage.getItem('cookiesAccepted');
    setConsent(cookieConsent === 'true');

    // Listen for consent changes
    const handleConsentChange = () => {
      const updatedConsent = localStorage.getItem('cookiesAccepted');
      setConsent(updatedConsent === 'true');
    };

    // Custom event listener for consent updates
    window.addEventListener('cookieConsentUpdated', handleConsentChange);
    
    return () => {
      window.removeEventListener('cookieConsentUpdated', handleConsentChange);
    };
  }, []);

  useEffect(() => {
    if (consent !== null && typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as { gtag: (...args: unknown[]) => void }).gtag;
      
      if (consent) {
        // Grant consent
        gtag('consent', 'update', {
          ad_storage: 'granted',
          analytics_storage: 'granted',
          functionality_storage: 'granted',
          personalization_storage: 'granted',
          security_storage: 'granted'
        });
      } else {
        // Deny consent
        gtag('consent', 'update', {
          ad_storage: 'denied',
          analytics_storage: 'denied',
          functionality_storage: 'denied',
          personalization_storage: 'denied',
          security_storage: 'granted' // Security storage typically always granted
        });
      }
    }
  }, [consent]);

  return (
    <>
      {/* Google Analytics - gtag.js */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-V6XDC1NVB6"
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Default consent to denied
            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'denied',
              personalization_storage: 'denied',
              security_storage: 'granted'
            });
            
            gtag('config', 'G-V6XDC1NVB6', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      {/* Google Ads - gtag.js */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17648364616"
        strategy="afterInteractive"
      />
      <Script
        id="google-ads-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            gtag('config', 'AW-17648364616');
          `,
        }}
      />
    </>
  );
}
