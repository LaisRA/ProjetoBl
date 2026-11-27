import { useCallback, useEffect, useState } from 'react';

export type AppRoute =
  | { view: 'home' }
  | { view: 'article'; slug: string }
  | { view: 'prompts' }
  | { view: 'about' }
  | { view: 'privacy' };

function parseHash(hash: string): AppRoute {
  const cleaned = hash.replace(/^#/, '').trim();
  if (!cleaned || cleaned === '/') {
    return { view: 'home' };
  }

  if (
    cleaned === '/prompts' ||
    cleaned === 'prompts' ||
    cleaned === '/hub-de-prompts' ||
    cleaned === 'hub-de-prompts'
  ) {
    return { view: 'prompts' };
  }

  if (
    cleaned === '/sobre' ||
    cleaned === 'sobre' ||
    cleaned === '/sobre-mim' ||
    cleaned === 'sobre-mim'
  ) {
    return { view: 'about' };
  }

  if (
    cleaned === '/privacidade' ||
    cleaned === 'privacidade' ||
    cleaned === '/politica-de-privacidade' ||
    cleaned === 'politica-de-privacidade'
  ) {
    return { view: 'privacy' };
  }

  const articleMatch = cleaned.match(/^\/?artigo\/([^/?#]+)/);
  if (articleMatch && articleMatch[1]) {
    return { view: 'article', slug: decodeURIComponent(articleMatch[1]) };
  }

  return { view: 'home' };
}

export function useHashRoute() {
  const [route, setRoute] = useState<AppRoute>(() =>
    typeof window !== 'undefined' ? parseHash(window.location.hash) : { view: 'home' }
  );

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((targetHash: string) => {
    const normalized = targetHash.startsWith('#') ? targetHash : `#${targetHash}`;
    if (window.location.hash === normalized) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = normalized;
  }, []);

  return { route, navigate };
}
