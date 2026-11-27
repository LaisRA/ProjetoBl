import { useEffect } from 'react';

/**
 * Lightweight Vanilla IntersectionObserver hook for once-per-element scroll reveal.
 * Automatically picks up dynamically rendered [data-reveal] elements (e.g. route changes
 * or category filtering) via MutationObserver and respects prefers-reduced-motion.
 */
export function useScrollReveal(routeKey: string) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const revealImmediately = (root: ParentNode = document) => {
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        el.classList.add('is-revealed');
      });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealImmediately();
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add('is-revealed');
            // Clear stagger delay after reveal finishes so hover micro-interactions stay instant
            obs.unobserve(target);
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -28px 0px',
      }
    );

    const observeElements = (root: ParentNode) => {
      if (root instanceof HTMLElement && root.matches('[data-reveal]')) {
        if (!root.classList.contains('is-revealed')) {
          observer.observe(root);
        }
      }
      root
        .querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)')
        .forEach((el) => observer.observe(el));
    };

    // Observe all current elements on the page
    observeElements(document);

    // Watch for newly added cards/sections (e.g. search/category filter changes)
    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement) {
            observeElements(node);
          }
        }
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [routeKey]);
}
