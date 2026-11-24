/**
 * Robô gratuito de curadoria de novidades oficiais do Google (Workspace, IA & Gemini).
 * Executado automaticamente pelo GitHub Actions (.github/workflows/auto-posts-google.yml).
 *
 * - Lê feeds RSS oficiais e gratuitos do Google (sem custo de API do X).
 * - Filtra notícias relevantes para IA, Gestão Financeira e Automação Comercial.
 * - Se GEMINI_API_KEY estiver configurada nos Secrets do GitHub, gera um artigo completo
 *   em português no estilo didático da Lais Raniele.
 * - Se não houver chave configurada, cria um rascunho estruturado pronto para edição.
 * - Salva novos artigos em src/data/autoPosts.json sem alterar seus artigos manuais em posts.ts.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUTO_POSTS_PATH = path.resolve(__dirname, '../src/data/autoPosts.json');

const DEFAULT_FEEDS = [
  {
    nome: 'Google Workspace Updates',
    url: 'https://workspaceupdates.googleblog.com/feeds/posts/default?alt=rss',
  },
  {
    nome: 'Google AI Blog (The Keyword)',
    url: 'https://blog.google/technology/ai/rss/',
  },
  {
    nome: 'Google Workspace Blog',
    url: 'https://blog.google/products/workspace/rss/',
  },
];

const EXTRA_FEEDS = (process.env.EXTRA_RSS_FEEDS || '')
  .split(',')
  .map((u) => u.trim())
  .filter(Boolean)
  .map((url, idx) => ({ nome: `Feed Personalizado ${idx + 1}`, url }));

const FEEDS = [...DEFAULT_FEEDS, ...EXTRA_FEEDS];
const MAX_NEW_POSTS = Math.max(1, Number(process.env.MAX_NEW_POSTS || 2));
const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || '').trim();
const GEMINI_MODEL = (process.env.GEMINI_MODEL || 'gemini-4-hydrogen').trim();

const KEYWORDS = [
  'gemini',
  'sheets',
  'planilhas',
  'docs',
  'forms',
  'gmail',
  'drive',
  'workspace',
  'apps script',
  'notebooklm',
  'vids',
  'ai',
  'ia',
  'automation',
  'workflow',
  'gems',
  'trends',
  'spreadsheet',
];

function decodeXmlEntities(text = '') {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTag(block, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = block.match(regex);
  return match ? decodeXmlEntities(match[1]) : '';
}

function extractAtomLink(block) {
  const alt = block.match(/<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["'][^>]*\/?>/i);
  if (alt) return alt[1].trim();
  const any = block.match(/<link[^>]*href=["']([^"']+)["'][^>]*\/?>/i);
  if (any) return any[1].trim();
  return extractTag(block, 'link');
}

function parseFeedItems(xml, fonteNome) {
  const items = [];
  const rssMatches = xml.match(/<item[\s\S]*?<\/item>/gi) || [];

  for (const block of rssMatches) {
    const title = extractTag(block, 'title');
    const link = extractTag(block, 'link');
    const description =
      extractTag(block, 'description') || extractTag(block, 'content:encoded');
    const pubDate = extractTag(block, 'pubDate');
    if (title && link) {
      items.push({ title, link, description, pubDate, fonteNome });
    }
  }

  if (items.length === 0) {
    const atomMatches = xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
    for (const block of atomMatches) {
      const title = extractTag(block, 'title');
      const link = extractAtomLink(block);
      const description =
        extractTag(block, 'summary') || extractTag(block, 'content');
      const pubDate = extractTag(block, 'published') || extractTag(block, 'updated');
      if (title && link) {
        items.push({ title, link, description, pubDate, fonteNome });
      }
    }
  }

  return items;
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
}

function formatPortugueseDate(dateInput) {
  const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
  ];
  const d = dateInput ? new Date(dateInput) : new Date();
  const valid = Number.isNaN(d.getTime()) ? new Date() : d;
  const day = String(valid.getDate()).padStart(2, '0');
  return `${day} ${months[valid.getMonth()]} ${valid.getFullYear()}`;
}

function isRelevant(item) {
  const text = `${item.title} ${item.description}`.toLowerCase();
  return KEYWORDS.some((kw) => text.includes(kw));
}

async function generatePostWithGemini(item) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    GEMINI_MODEL
  )}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;

  const prompt = `Você é a editora técnica do blog "Lais Raniele" (laisraniele.com.br), especialista em tutoriais práticos de Inteligência Artificial, Gestão Financeira e Automação Comercial usando o Ecossistema Google.

Transforme esta novidade oficial do Google em um artigo curto, prático e didático em português do Brasil (sem enrolação e sem termos genéricos).

NOTÍCIA ORIGINAL:
- Fonte: ${item.fonteNome}
- Título original: ${item.title}
- Link: ${item.link}
- Resumo original: ${item.description.slice(0, 1400)}

Retorne APENAS um JSON válido com esta estrutura exata:
{
  "titulo": "Título claro e atraente em português do Brasil (sem parênteses vazios)",
  "resumo": "Resumo de 1 a 2 frases focando no benefício prático",
  "categoria": "Últimas Atualizações",
  "tempoLeitura": "4 min de leitura",
  "tituloTemplate": "Nome curto de um recurso/checklist relacionado",
  "descricaoTemplate": "1 frase explicando o checklist prático",
  "itensTemplate": ["Item 1", "Item 2", "Item 3"],
  "blocosDeConteudo": [
    { "tipo": "paragrafo", "texto": "Introdução explicando o que mudou e por que importa." },
    { "tipo": "subtitulo", "texto": "O que há de novo na prática" },
    { "tipo": "lista", "ordenada": false, "itens": ["Ponto prático 1", "Ponto prático 2", "Ponto prático 3"] },
    { "tipo": "subtitulo", "texto": "Como testar hoje no seu dia a dia" },
    { "tipo": "paragrafo", "texto": "Explicação prática de uso." },
    { "tipo": "codigo", "linguagem": "Prompt Gemini", "titulo": "Prompt pronto para testar essa novidade", "conteudo": "Prompt prático em português pronto para o leitor copiar e testar." },
    { "tipo": "dica", "titulo": "Dica prática", "texto": "Uma recomendação direta de aplicação em negócios ou produtividade." }
  ]
}`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = await res.json();
  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!raw) throw new Error('Resposta vazia da API Gemini.');

  const parsed = JSON.parse(raw);
  const categoria = 'Últimas Atualizações';

  return {
    id: `auto-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    slug: slugify(parsed.titulo || item.title),
    titulo: String(parsed.titulo || item.title).trim(),
    resumo: String(parsed.resumo || item.description.slice(0, 180)).trim(),
    categoria,
    data: formatPortugueseDate(item.pubDate),
    tempoLeitura: String(parsed.tempoLeitura || '4 min de leitura'),
    youtubeId: '',
    fonteUrl: item.link,
    fonteNome: item.fonteNome,
    linkTemplate: '',
    tituloTemplate: String(
      parsed.tituloTemplate || `Guia Oficial: ${item.fonteNome}`
    ),
    descricaoTemplate: String(
      parsed.descricaoTemplate ||
        'Consulte o anúncio oficial completo do Google com todos os detalhes técnicos e disponibilidade.'
    ),
    itensTemplate:
      Array.isArray(parsed.itensTemplate) && parsed.itensTemplate.length > 0
        ? parsed.itensTemplate.slice(0, 4).map(String)
        : [
            'Resumo prático dos principais recursos anunciados',
            'Prompt pronto para aplicar a novidade no seu fluxo',
            'Link direto para a documentação oficial do Google',
          ],
    blocosDeConteudo:
      Array.isArray(parsed.blocosDeConteudo) && parsed.blocosDeConteudo.length > 0
        ? [...parsed.blocosDeConteudo, WORKSPACE_AFFILIATE_CTA]
        : buildFallbackBlocks(item),
  };
}

const WORKSPACE_AFFILIATE_CTA = {
  tipo: 'cta',
  titulo: 'Quer usar o Google Workspace + Gemini no seu negócio?',
  texto:
    'Conheça os planos oficiais do Google Workspace pelo meu link de indicação. Eu também tenho **códigos promocionais exclusivos** — me chame no WhatsApp **(37) 99904-6824** para garantir o seu desconto.',
  textoBotao: 'Conhecer o Google Workspace',
  link: 'https://sharegoogleworkspace.advocate.impact.com/mzZ2zF7',
};

function buildFallbackBlocks(item) {
  const excerpt =
    item.description.length > 360
      ? `${item.description.slice(0, 360).trim()}...`
      : item.description || 'Confira os detalhes desta atualização oficial do Google.';

  return [
    {
      tipo: 'paragrafo',
      texto: `O **${item.fonteNome}** publicou uma novidade relevante para quem usa ferramentas do Google no trabalho e nos negócios: **${item.title}**.`,
    },
    {
      tipo: 'subtitulo',
      texto: 'Resumo do anúncio oficial',
    },
    {
      tipo: 'paragrafo',
      texto: excerpt,
    },
    {
      tipo: 'subtitulo',
      texto: 'Prompt para explorar essa novidade com o Gemini',
    },
    {
      tipo: 'codigo',
      linguagem: 'Prompt Gemini',
      titulo: 'Como aplicar esta atualização na prática',
      conteudo: `Explique em português do Brasil, de forma prática e passo a passo, como posso usar a novidade "${item.title}" do Google para ganhar produtividade em finanças, vendas ou automação no Google Workspace. Inclua 3 casos de uso reais.`,
    },
    {
      tipo: 'dica',
      titulo: 'Rascunho automático para revisão',
      texto:
        'Configure o secret `GEMINI_API_KEY` (plano gratuito do Google AI Studio) nas configurações do seu repositório GitHub para que os próximos artigos sejam traduzidos e estruturados automaticamente em português completo.',
    },
    WORKSPACE_AFFILIATE_CTA,
  ];
}

function buildFallbackPost(item) {
  return {
    id: `auto-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    slug: slugify(item.title),
    titulo: `Novidade Google: ${item.title}`,
    resumo:
      item.description.slice(0, 180).trim() ||
      'Atualização oficial do Ecossistema Google coletada automaticamente para revisão.',
    categoria: 'Últimas Atualizações',
    data: formatPortugueseDate(item.pubDate),
    tempoLeitura: '3 min de leitura',
    youtubeId: '',
    fonteUrl: item.link,
    fonteNome: item.fonteNome,
    linkTemplate: '',
    tituloTemplate: `Comunicado Oficial — ${item.fonteNome}`,
    descricaoTemplate:
      'Acesse a publicação oficial do Google para conferir datas de liberação e requisitos da conta.',
    itensTemplate: [
      'Nota oficial completa em inglês/português no blog do Google',
      'Detalhes de disponibilidade para contas pessoais e Workspace',
      'Prompt pronto acima para adaptar ao seu fluxo de trabalho',
    ],
    blocosDeConteudo: buildFallbackBlocks(item),
  };
}

async function main() {
  const existing = fs.existsSync(AUTO_POSTS_PATH)
    ? JSON.parse(fs.readFileSync(AUTO_POSTS_PATH, 'utf8'))
    : [];

  const existingUrls = new Set(existing.map((p) => p.fonteUrl).filter(Boolean));
  const existingSlugs = new Set(existing.map((p) => p.slug));

  const collected = [];

  for (const feed of FEEDS) {
    try {
      const response = await fetch(feed.url, {
        headers: { 'User-Agent': 'LaisRanieleBlogBot/1.0 (+https://laisraniele.com.br)' },
      });
      if (!response.ok) {
        console.warn(`Aviso: falha ao ler ${feed.nome} (HTTP ${response.status})`);
        continue;
      }
      const xml = await response.text();
      const items = parseFeedItems(xml, feed.nome);
      collected.push(...items);
      console.log(`Lidos ${items.length} itens de ${feed.nome}`);
    } catch (err) {
      console.warn(`Aviso: erro ao acessar ${feed.nome}: ${err.message}`);
    }
  }

  // Ordena pelos mais recentes primeiro
  collected.sort((a, b) => {
    const da = new Date(a.pubDate || 0).getTime();
    const db = new Date(b.pubDate || 0).getTime();
    return db - da;
  });

  const candidates = collected.filter(
    (item) =>
      isRelevant(item) &&
      !existingUrls.has(item.link) &&
      !existingSlugs.has(slugify(item.title))
  );

  const selected = candidates.slice(0, MAX_NEW_POSTS);
  if (selected.length === 0) {
    console.log('Nenhuma novidade nova encontrada hoje.');
    return;
  }

  const created = [];

  for (const item of selected) {
    try {
      const post = GEMINI_API_KEY
        ? await generatePostWithGemini(item)
        : buildFallbackPost(item);

      if (existingSlugs.has(post.slug)) {
        post.slug = `${post.slug}-${Date.now().toString().slice(-4)}`;
      }
      existingSlugs.add(post.slug);
      existingUrls.add(item.link);
      created.push(post);
      console.log(`Novo rascunho criado: ${post.titulo}`);
    } catch (err) {
      console.warn(`Erro ao gerar com Gemini (${err.message}). Usando rascunho padrão.`);
      const fallback = buildFallbackPost(item);
      created.push(fallback);
    }
  }

  const updated = [...created, ...existing].slice(0, 50);
  fs.writeFileSync(AUTO_POSTS_PATH, `${JSON.stringify(updated, null, 2)}\n`, 'utf8');
  console.log(`Salvos ${created.length} novo(s) artigo(s) em src/data/autoPosts.json.`);
}

main().catch((err) => {
  console.error('Erro fatal na sincronização:', err);
  process.exit(1);
});
