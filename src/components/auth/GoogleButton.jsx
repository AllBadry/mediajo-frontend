import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';

// تحميل مكتبة Google Identity Services مرة واحدة فقط
let gsiPromise = null;
function loadGsi() {
  if (window.google?.accounts?.id) return Promise.resolve(true);
  if (gsiPromise) return gsiPromise;
  gsiPromise = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
  return gsiPromise;
}

// فك تشفير الحمولة من توكن Google (JWT)
function decodeJwt(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = new TextDecoder().decode(Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)));
    return JSON.parse(json);
  } catch {
    return {};
  }
}

// زر تسجيل الدخول الرسمي من Google (يعمل بدون Secret على العميل)
export default function GoogleButton({ onSuccess, text = 'signin_with', width = 320 }) {
  const { lang } = useLanguage();
  const btnRef = useRef(null);
  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  useEffect(() => {
    let cancelled = false;

    loadGsi().then((ok) => {
      if (!ok || cancelled || !window.google?.accounts?.id) return;
      const g = window.google.accounts.id;

      if (!window.__gsiInitialized) {
        g.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          itp_support: true,
          callback: (response) => {
            const payload = decodeJwt(response.credential);
            onSuccessRef.current({
              name: payload.name || payload.email?.split('@')[0] || '',
              email: payload.email || '',
              idToken: response.credential,
            });
          },
        });
        window.__gsiInitialized = true;
      }

      g.renderButton(btnRef.current, {
        type: 'standard',
        text,
        theme: 'outline',
        size: 'large',
        shape: 'pill',
        width,
        logo_alignment: 'left',
        locale: lang === 'ar' ? 'ar' : 'en',
      });
    });

    return () => {
      cancelled = true;
    };
  }, [lang, text, width]);

  return <div ref={btnRef} className="w-full flex justify-center"></div>;
}