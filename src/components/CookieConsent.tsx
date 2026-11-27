import { useEffect, useState } from 'react';

const CONSENT_STORAGE_KEY = 'laisraniele_cookie_consent';
const GA_DISABLE_KEY = 'ga-disable-G-1MBKS4BRMS';

export type CookieChoice = 'accepted' | 'essential' | null;

function readStoredConsent(): CookieChoice {
  if (typeof window === 'undefined') return null;
  try {
    const val = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (val === 'accepted' || val === 'essential') return val;
  } catch {
    // Ignore storage access errors
  }
  return null;
}

function applyAnalyticsPreference(choice: CookieChoice) {
  if (typeof window === 'undefined') return;
  const win = window as unknown as Record<string, unknown>;
  win[GA_DISABLE_KEY] = choice === 'essential';
}

interface CookieConsentProps {
  resetSignal: number;
  onOpenPrivacy: () => void;
}

export function CookieConsent({
  resetSignal,
  onOpenPrivacy,
}: CookieConsentProps) {
  const [choice, setChoice] = useState<CookieChoice>(readStoredConsent);

  useEffect(() => {
    applyAnalyticsPreference(choice);
  }, [choice]);

  useEffect(() => {
    if (resetSignal > 0) {
      try {
        window.localStorage.removeItem(CONSENT_STORAGE_KEY);
      } catch {
        // Ignore storage errors
      }
      setChoice(null);
    }
  }, [resetSignal]);

  const handleSelect = (selected: 'accepted' | 'essential') => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, selected);
    } catch {
      // Ignore storage errors
    }
    applyAnalyticsPreference(selected);
    setChoice(selected);

    if (selected === 'accepted') {
      const gtagFn = (window as Window & { gtag?: (...args: unknown[]) => void })
        .gtag;
      if (typeof gtagFn === 'function') {
        gtagFn('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
        });
      }
    }
  };

  if (choice !== null) {
    return null;
  }

  return (
    <aside
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed right-4 bottom-4 left-4 z-50 mx-auto max-w-md rounded-xl border border-[#E4E4E7] bg-[#FFFFFF] p-4 shadow-lg sm:left-auto dark:border-[#2A243D] dark:bg-[#161321]"
    >
      <p className="text-xs sm:text-[13px] leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
        Usamos cookies de medição (Google Analytics) para melhorar nossos
        tutoriais. Leia nossa{' '}
        <a
          href="/privacidade"
          onClick={(e) => {
            e.preventDefault();
            onOpenPrivacy();
          }}
          className="font-medium text-[#7C3AED] hover:underline dark:text-[#C4B5FD]"
        >
          Política de Privacidade
        </a>
        .
      </p>

      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => handleSelect('essential')}
          className="h-9 rounded-lg border border-[#E4E4E7] bg-[#FAFAFC] px-3 text-xs font-medium text-[#52525B] transition-colors hover:border-[#7C3AED]/50 hover:text-[#18181B] dark:border-[#2A243D] dark:bg-[#0D0B14] dark:text-[#9CA3AF] dark:hover:border-[#8B5CF6]/60 dark:hover:text-[#F3F4F6] whitespace-nowrap cursor-pointer"
        >
          Apenas essenciais
        </button>
        <button
          type="button"
          onClick={() => handleSelect('accepted')}
          className="h-9 rounded-lg bg-[#7C3AED] px-3.5 text-xs font-semibold text-white transition-colors hover:bg-[#6D28D9] dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED] whitespace-nowrap cursor-pointer"
        >
          Aceitar cookies
        </button>
      </div>
    </aside>
  );
}
