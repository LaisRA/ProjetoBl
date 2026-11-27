import { useCallback, useEffect, useState } from 'react';

export type AppRoute =
  | { view: 'home' }
  | { view: 'article'; slug: string }
  | { view: 'prompts'; promptId?: string }
  | { view: 'about' }
  | { view: 'privacy' };

function normalizeTargetPath(rawTarget: string): string {
  const withoutHash = rawTarget.replace(/^#/, '').trim();
  if (!withoutHash || withoutHash === '/' || withoutHash === 'home' || withoutHash === '/home') {
    return '/home';
  }
  return withoutHash.startsWith('/') ? withoutHash : `/${withoutHash}`;
}

function parseLocationPath(pathname: string, search = ''): AppRoute {
  const cleanedPath = pathname.replace(/^#/, '').replace(/\/+$/, '').trim();
  if (!cleanedPath || cleanedPath === '/' || cleanedPath === '/home' || cleanedPath === 'home') {
    return { view: 'home' };
  }

  const queryParams = new URLSearchParams(search);
  const queryPromptId = queryParams.get('prompt')?.trim() || undefined;

  if (
    cleanedPath === '/prompts' ||
    cleanedPath === 'prompts' ||
    cleanedPath === '/hub-de-prompts' ||
    cleanedPath === 'hub-de-prompts'
  ) {
    return queryPromptId
      ? { view: 'prompts', promptId: queryPromptId }
      : { view: 'prompts' };
  }

  const promptMatch = cleanedPath.match(
    /^\/?(?:prompts|hub-de-prompts)\/([^/?#]+)/
  );
  if (promptMatch && promptMatch[1]) {
    return {
      view: 'prompts',
      promptId: decodeURIComponent(promptMatch[1]),
    };
  }

  if (
    cleanedPath === '/sobre' ||
    cleanedPath === 'sobre' ||
    cleanedPath === '/sobre-mim' ||
    cleanedPath === 'sobre-mim'
  ) {
    return { view: 'about' };
  }

  if (
    cleanedPath === '/privacidade' ||
    cleanedPath === 'privacidade' ||
    cleanedPath === '/politica-de-privacidade' ||
    cleanedPath === 'politica-de-privacidade'
  ) {
    return { view: 'privacy' };
  }

  const articleMatch = cleanedPath.match(/^\/?artigo\/([^/?#]+)/);
  if (articleMatch && articleMatch[1]) {
    return { view: 'article', slug: decodeURIComponent(articleMatch[1]) };
  }

  return { view: 'home' };
}

function getCanonicalPathForRoute(route: AppRoute): string {
  switch (route.view) {
    case 'home':
      return '/home';
    case 'prompts':
      return route.promptId
        ? `/prompts/${encodeURIComponent(route.promptId)}`
        : '/prompts';
    case 'about':
      return '/sobre';
    case 'privacy':
      return '/privacidade';
    case 'article':
      return `/artigo/${encodeURIComponent(route.slug)}`;
  }
}

function resolveInitialRoute(): AppRoute {
  if (typeof window === 'undefined') {
    return { view: 'home' };
  }

  // Gracefully migrate legacy hash URLs (e.g. /#/prompts -> /prompts, /#/ -> /home)
  const rawHash = window.location.hash.replace(/^#/, '').trim();
  if (rawHash.startsWith('/')) {
    const [hashPath, hashQuery = ''] = rawHash.split('?');
    const parsed = parseLocationPath(hashPath, hashQuery ? `?${hashQuery}` : '');
    const cleanPath = getCanonicalPathForRoute(parsed);
    try {
      window.history.replaceState(null, '', cleanPath);
    } catch {
      // Ignore history errors in restricted sandboxes
    }
    return parsed;
  }

  const parsed = parseLocationPath(
    window.location.pathname,
    window.location.search
  );

  // Normalize root "/" to "/home" cleanly without adding a history entry
  if (window.location.pathname === '/' || window.location.pathname === '') {
    try {
      window.history.replaceState(null, '', '/home');
    } catch {
      // Ignore history errors in restricted sandboxes
    }
  }

  return parsed;
}

export function useHashRoute() {
  const [route, setRoute] = useState<AppRoute>(resolveInitialRoute);

  useEffect(() => {
    const syncFromLocation = () => {
      const rawHash = window.location.hash.replace(/^#/, '').trim();
      if (rawHash.startsWith('/')) {
        const [hashPath, hashQuery = ''] = rawHash.split('?');
        const parsed = parseLocationPath(
          hashPath,
          hashQuery ? `?${hashQuery}` : ''
        );
        const cleanPath = getCanonicalPathForRoute(parsed);
        try {
          window.history.replaceState(null, '', cleanPath);
        } catch {
          // Ignore history errors
        }
        setRoute(parsed);
        window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }

      setRoute(
        parseLocationPath(window.location.pathname, window.location.search)
      );
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', syncFromLocation);
    window.addEventListener('hashchange', syncFromLocation);
    return () => {
      window.removeEventListener('popstate', syncFromLocation);
      window.removeEventListener('hashchange', syncFromLocation);
    };
  }, []);

  const navigate = useCallback((target: string) => {
    const normalized = normalizeTargetPath(target);
    const [nextPath, nextQuery = ''] = normalized.split('?');
    const nextRoute = parseLocationPath(
      nextPath,
      nextQuery ? `?${nextQuery}` : ''
    );
    const canonicalPath = getCanonicalPathForRoute(nextRoute);

    if (
      window.location.pathname === canonicalPath &&
      !window.location.search &&
      !window.location.hash
    ) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      window.history.pushState(null, '', canonicalPath);
    } catch {
      // Fallback if pushState is blocked
    }
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return { route, navigate };
}
