import { useCallback, useEffect, useState } from 'react';

export interface LanguageOption {
  code: string;
  shortLabel: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'pt', shortLabel: 'PT', nativeName: 'Português' },
  { code: 'en', shortLabel: 'EN', nativeName: 'English' },
  { code: 'es', shortLabel: 'ES', nativeName: 'Español' },
  { code: 'fr', shortLabel: 'FR', nativeName: 'Français' },
  { code: 'de', shortLabel: 'DE', nativeName: 'Deutsch' },
  { code: 'it', shortLabel: 'IT', nativeName: 'Italiano' },
  { code: 'nl', shortLabel: 'NL', nativeName: 'Nederlands' },
  { code: 'ja', shortLabel: 'JA', nativeName: '日本語' },
  { code: 'zh-CN', shortLabel: 'ZH', nativeName: '中文' },
  { code: 'hi', shortLabel: 'HI', nativeName: 'हिन्दी' },
];

const STORAGE_KEY = 'laisraniele_lang';
const SUPPORTED_CODES = new Set(SUPPORTED_LANGUAGES.map((l) => l.code));

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages?: string;
            autoDisplay?: boolean;
          },
          elementId: string
        ) => unknown;
      };
    };
  }
}

function setGoogTransCookie(langCode: string) {
  if (typeof document === 'undefined') return;
  const host = window.location.hostname;
  const isLocal =
    host === 'localhost' || host === '127.0.0.1' || !host.includes('.');

  if (langCode === 'pt') {
    const expired = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = `googtrans=; ${expired}; path=/`;
    if (!isLocal) {
      document.cookie = `googtrans=; ${expired}; path=/; domain=.${host}`;
      document.cookie = `googtrans=; ${expired}; path=/; domain=${host}`;
    }
    return;
  }

  const value = `/pt/${langCode}`;
  document.cookie = `googtrans=${value}; path=/; SameSite=Lax`;
  if (!isLocal) {
    document.cookie = `googtrans=${value}; path=/; domain=.${host}; SameSite=Lax`;
  }
}

function detectBrowserLanguage(): string {
  if (typeof navigator === 'undefined') return 'pt';
  const raw = (navigator.language || 'pt').trim();
  const lower = raw.toLowerCase();

  if (lower.startsWith('pt')) return 'pt';
  if (lower.startsWith('zh')) return 'zh-CN';

  const base = lower.split('-')[0];
  if (SUPPORTED_CODES.has(base)) return base;

  // Fallback for other international visitors: English
  return 'en';
}

function getInitialLanguage(): string {
  if (typeof window === 'undefined') return 'pt';
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_CODES.has(saved)) {
      return saved;
    }
  } catch {
    // Ignore storage access errors
  }
  return detectBrowserLanguage();
}

let translateScriptRequested = false;

function ensureGoogleTranslateLoaded() {
  if (typeof window === 'undefined' || translateScriptRequested) return;
  translateScriptRequested = true;

  window.googleTranslateElementInit = () => {
    const container = document.getElementById('google_translate_element');
    if (!container || !window.google?.translate?.TranslateElement) return;
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'pt',
        includedLanguages: SUPPORTED_LANGUAGES.map((l) => l.code).join(','),
        autoDisplay: false,
      },
      'google_translate_element'
    );
  };

  const script = document.createElement('script');
  script.src =
    'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.head.appendChild(script);
}

function triggerGoogleTranslateCombo(langCode: string): boolean {
  const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (!select) return false;
  select.value = langCode;
  select.dispatchEvent(new Event('change'));
  return true;
}

export function useLanguage() {
  const [language, setLanguageState] = useState<string>(getInitialLanguage);

  useEffect(() => {
    if (language !== 'pt') {
      setGoogTransCookie(language);
      ensureGoogleTranslateLoaded();

      // If widget is already mounted, apply immediately; otherwise Google reads the cookie on init
      const applied = triggerGoogleTranslateCombo(language);
      if (!applied) {
        const timer = window.setTimeout(() => {
          triggerGoogleTranslateCombo(language);
        }, 1200);
        return () => window.clearTimeout(timer);
      }
    } else {
      setGoogTransCookie('pt');
    }
  }, [language]);

  const setLanguage = useCallback(
    (nextLang: string) => {
      if (!SUPPORTED_CODES.has(nextLang) || nextLang === language) return;

      try {
        window.localStorage.setItem(STORAGE_KEY, nextLang);
      } catch {
        // Ignore storage write errors
      }

      setGoogTransCookie(nextLang);
      setLanguageState(nextLang);

      if (nextLang === 'pt') {
        // Reload cleanly so React restores untouched Portuguese DOM without leftover translate nodes
        window.location.reload();
        return;
      }

      ensureGoogleTranslateLoaded();
      const applied = triggerGoogleTranslateCombo(nextLang);
      if (!applied) {
        window.setTimeout(() => {
          const retried = triggerGoogleTranslateCombo(nextLang);
          if (!retried) {
            window.location.reload();
          }
        }, 900);
      }
    },
    [language]
  );

  const currentLanguage =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) ??
    SUPPORTED_LANGUAGES[0];

  return {
    language,
    currentLanguage,
    languages: SUPPORTED_LANGUAGES,
    setLanguage,
  };
}
