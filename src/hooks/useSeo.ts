import { useEffect } from 'react';
import { LINKS_SOCIAIS, type Post } from '../data/posts';
import type { AppRoute } from './useHashRoute';

const SITE_NAME = 'Lais Raniele';
const DEFAULT_TITLE = 'Lais Raniele — IA, Gestão Financeira e Automação Google';
const DEFAULT_DESCRIPTION =
  'Tutoriais práticos de Inteligência Artificial, Gestão Financeira e Automação Comercial no Ecossistema Google, com fórmulas, prompts e scripts prontos.';
const DEFAULT_OG_IMAGE_PATH = '/src/assets/images/og_lais_raniele_1795476967262.jpg';

const PT_MONTHS: Record<string, string> = {
  jan: '01',
  fev: '02',
  mar: '03',
  abr: '04',
  mai: '05',
  jun: '06',
  jul: '07',
  ago: '08',
  set: '09',
  out: '10',
  nov: '11',
  dez: '12',
};

function parsePortugueseDateToIso(dateStr: string): string | undefined {
  const match = dateStr.trim().match(/^(\d{1,2})\s+([a-zA-ZçÇ]{3})\s+(\d{4})$/);
  if (!match) return undefined;
  const day = match[1].padStart(2, '0');
  const month = PT_MONTHS[match[2].toLowerCase()];
  const year = match[3];
  if (!month) return undefined;
  return `${year}-${month}-${day}`;
}

function upsertMeta(
  attr: 'name' | 'property',
  key: string,
  content: string
) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeMeta(attr: 'name' | 'property', key: string) {
  const el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (el) el.remove();
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function upsertJsonLd(data: Record<string, unknown>) {
  let script = document.getElementById('seo-jsonld') as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = 'seo-jsonld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

function getBaseUrl(): string {
  if (typeof window === 'undefined') return `${LINKS_SOCIAIS.site}/`;
  const base = `${window.location.origin}${window.location.pathname}`;
  return base.endsWith('/') ? base : `${base}/`;
}

function resolveDefaultOgImage(): string {
  if (typeof window === 'undefined') {
    return `${LINKS_SOCIAIS.site}${DEFAULT_OG_IMAGE_PATH}`;
  }
  return new URL(
    DEFAULT_OG_IMAGE_PATH.replace(/^\//, ''),
    getBaseUrl()
  ).toString();
}

function resolvePostImage(post: Post): string {
  if (post.imagemOg && post.imagemOg.trim() !== '') {
    const raw = post.imagemOg.trim();
    if (/^https?:\/\//i.test(raw)) return raw;
    return new URL(raw.replace(/^\//, ''), getBaseUrl()).toString();
  }
  if (post.youtubeId && post.youtubeId.trim() !== '') {
    return `https://i.ytimg.com/vi/${post.youtubeId.trim()}/hqdefault.jpg`;
  }
  return resolveDefaultOgImage();
}

export function useSeo(route: AppRoute, activePost: Post | null) {
  useEffect(() => {
    const baseUrl = getBaseUrl();
    const defaultImage = resolveDefaultOgImage();

    let title = DEFAULT_TITLE;
    let description = DEFAULT_DESCRIPTION;
    let canonicalUrl = baseUrl;
    let ogType: 'website' | 'article' = 'website';
    let ogImage = defaultImage;
    let ogImageAlt = DEFAULT_TITLE;
    let pagePath = '/';

    if (route.view === 'article' && activePost) {
      title = `${activePost.titulo} | ${SITE_NAME}`;
      description = activePost.resumo;
      canonicalUrl = `${baseUrl}#/artigo/${activePost.slug}`;
      ogType = 'article';
      ogImage = resolvePostImage(activePost);
      ogImageAlt = activePost.titulo;
      pagePath = `/artigo/${activePost.slug}`;
    } else if (route.view === 'about') {
      title = `Sobre Mim — ${SITE_NAME} | Afiliada Google Workspace & IA na Prática`;
      description =
        'Conheça a Lais Raniele: criadora do Planilha Lab, afiliada oficial do Google Workspace e criadora de tutoriais práticos de gestão financeira, Excel, Google Planilhas, automação e IA.';
      canonicalUrl = `${baseUrl}#/sobre`;
      ogType = 'website';
      ogImage = new URL(
        'assets/aistudio/Gemini_Generated_Image_fa0gefa0gefa0gef__1__db809f31.jpg',
        baseUrl
      ).toString();
      ogImageAlt = 'Lais Raniele — Afiliada Google Workspace e Criadora de Projetos com IA';
      pagePath = '/sobre';
    } else if (route.view === 'privacy') {
      title = `Política de Privacidade e Cookies | ${SITE_NAME}`;
      description =
        'Saiba como o blog laisraniele.com.br trata cookies, Google Analytics 4, links de afiliados e seus direitos conforme a LGPD.';
      canonicalUrl = `${baseUrl}#/privacidade`;
      ogType = 'website';
      ogImage = defaultImage;
      ogImageAlt = title;
      pagePath = '/privacidade';
    }

    // Standard SEO
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertCanonical(canonicalUrl);

    // OpenGraph
    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', 'pt_BR');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:image:alt', ogImageAlt);

    // Twitter / X
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);

    // Article-specific OpenGraph & JSON-LD
    if (route.view === 'article' && activePost) {
      const isoDate = parsePortugueseDateToIso(activePost.data);
      upsertMeta('property', 'article:section', activePost.categoria);
      upsertMeta('property', 'article:author', SITE_NAME);
      if (isoDate) {
        upsertMeta('property', 'article:published_time', isoDate);
      }

      upsertJsonLd({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: activePost.titulo,
        description: activePost.resumo,
        image: [ogImage],
        inLanguage: 'pt-BR',
        articleSection: activePost.categoria,
        ...(isoDate ? { datePublished: isoDate, dateModified: isoDate } : {}),
        author: {
          '@type': 'Person',
          name: SITE_NAME,
          url: LINKS_SOCIAIS.site,
          sameAs: [LINKS_SOCIAIS.youtube, LINKS_SOCIAIS.instagram],
        },
        publisher: {
          '@type': 'Person',
          name: SITE_NAME,
          url: LINKS_SOCIAIS.site,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
      });
    } else {
      removeMeta('property', 'article:section');
      removeMeta('property', 'article:author');
      removeMeta('property', 'article:published_time');

      const schemaType =
        route.view === 'privacy'
          ? 'WebPage'
          : route.view === 'about'
            ? 'AboutPage'
            : 'Blog';

      upsertJsonLd({
        '@context': 'https://schema.org',
        '@type': schemaType,
        name: title,
        url: canonicalUrl,
        inLanguage: 'pt-BR',
        description,
        author: {
          '@type': 'Person',
          name: SITE_NAME,
          url: LINKS_SOCIAIS.site,
          sameAs: [LINKS_SOCIAIS.youtube, LINKS_SOCIAIS.instagram],
        },
      });
    }

    // Respeita a preferência de cookies do visitante antes de enviar page_view ao GA4
    let analyticsAllowed = true;
    try {
      const consent = window.localStorage.getItem('laisraniele_cookie_consent');
      if (consent === 'essential') {
        analyticsAllowed = false;
      }
    } catch {
      // Ignore storage errors
    }

    const gtagFn = (window as Window & { gtag?: (...args: unknown[]) => void })
      .gtag;
    if (analyticsAllowed && typeof gtagFn === 'function') {
      gtagFn('event', 'page_view', {
        page_title: title,
        page_path: pagePath,
        page_location: window.location.href,
      });
    }
  }, [route, activePost]);
}
