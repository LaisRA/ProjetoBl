/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ArticleCard } from './components/ArticleCard';
import { ArticleView } from './components/ArticleView';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TemplatesView } from './components/TemplatesView';
import { WorkspaceTopBar } from './components/WorkspaceBanner';
import { CATEGORIAS, posts, type Categoria } from './data/posts';
import { useHashRoute } from './hooks/useHashRoute';
import { useSeo } from './hooks/useSeo';
import { useTheme } from './hooks/useTheme';

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { route, navigate } = useHashRoute();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Categoria | 'Todos'>(
    'Todos'
  );

  const filteredPosts = useMemo(() => {
    const query = normalizeText(searchQuery.trim());

    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'Todos' || post.categoria === selectedCategory;

      if (!matchesCategory) return false;
      if (!query) return true;

      const searchableBlocks = post.blocosDeConteudo
        .map((bloco) => {
          if (bloco.tipo === 'paragrafo' || bloco.tipo === 'subtitulo') {
            return bloco.texto;
          }
          if (bloco.tipo === 'lista') {
            return bloco.itens.join(' ');
          }
          if (bloco.tipo === 'codigo') {
            return `${bloco.linguagem} ${bloco.titulo ?? ''} ${bloco.conteudo}`;
          }
          if (bloco.tipo === 'dica') {
            return `${bloco.titulo} ${bloco.texto}`;
          }
          return `${bloco.titulo} ${bloco.texto}`;
        })
        .join(' ');

      const haystack = normalizeText(
        `${post.titulo} ${post.resumo} ${post.categoria} ${searchableBlocks}`
      );

      return haystack.includes(query);
    });
  }, [searchQuery, selectedCategory]);

  const activePost = useMemo(() => {
    if (route.view !== 'article') return null;
    return posts.find((post) => post.slug === route.slug) ?? null;
  }, [route]);

  useSeo(route, activePost);

  const openPost = (slug: string) => {
    navigate(`#/artigo/${slug}`);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todos');
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFC] text-[#18181B] transition-colors duration-200 dark:bg-[#0D0B14] dark:text-[#F3F4F6]">
      <WorkspaceTopBar />
      <Header
        route={route}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigate={navigate}
      />

      <main className="flex-1">
        {route.view === 'home' && (
          <div className="mx-auto max-w-5xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16">
            {/* Lean Editorial Hero */}
            <section className="max-w-2xl">
              <p className="text-xs sm:text-sm font-medium text-[#7C3AED] dark:text-[#C4B5FD]">
                Ecossistema Google · IA Aplicada · Finanças &amp; Vendas
              </p>
              <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold leading-[1.12] tracking-tight text-[#18181B] dark:text-[#F3F4F6]">
                Tutoriais práticos de IA, Gestão Financeira e Automação.
              </h1>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                Guias diretos ao ponto com fórmulas, prompts validados e scripts
                prontos para copiar no Google Sheets, Docs, Forms, Gmail e
                Gemini.
              </p>
            </section>

            {/* Search & Category Controls */}
            <section
              aria-label="Busca e filtros de artigos"
              className="mt-10 flex flex-col gap-4 border-y border-[#E4E4E7] py-6 dark:border-[#2A243D]"
            >
              {/* Search Bar */}
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#52525B] dark:text-[#9CA3AF]"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por título, fórmula, Apps Script, Gemini, CRM..."
                  aria-label="Buscar tutoriais por título ou palavra-chave"
                  className="h-11 w-full rounded-xl border border-[#E4E4E7] bg-[#FFFFFF] pr-10 pl-10 text-sm text-[#18181B] placeholder:text-[#52525B]/75 transition-colors focus:border-[#7C3AED] focus:outline-none dark:border-[#2A243D] dark:bg-[#161321] dark:text-[#F3F4F6] dark:placeholder:text-[#9CA3AF]/75 dark:focus:border-[#8B5CF6]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Limpar busca"
                    className="absolute top-1/2 right-2.5 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[#52525B] hover:bg-[#FAFAFC] hover:text-[#18181B] dark:text-[#9CA3AF] dark:hover:bg-[#0D0B14] dark:hover:text-[#F3F4F6] cursor-pointer"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* Category Filter Buttons & Count */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div
                  role="tablist"
                  aria-label="Filtrar artigos por categoria"
                  className="flex flex-wrap items-center gap-2"
                >
                  {(['Todos', ...CATEGORIAS] as const).map((categoria) => {
                    const isActive = selectedCategory === categoria;
                    return (
                      <button
                        key={categoria}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setSelectedCategory(categoria)}
                        className={`h-9 rounded-lg px-3.5 text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-[#7C3AED] text-white dark:bg-[#8B5CF6]'
                            : 'border border-[#E4E4E7] bg-[#FFFFFF] text-[#52525B] hover:border-[#7C3AED]/50 hover:text-[#18181B] dark:border-[#2A243D] dark:bg-[#161321] dark:text-[#9CA3AF] dark:hover:border-[#8B5CF6]/60 dark:hover:text-[#F3F4F6]'
                        }`}
                      >
                        {categoria}
                      </button>
                    );
                  })}
                </div>

                <span className="text-xs text-[#52525B] tabular-nums dark:text-[#9CA3AF]">
                  {filteredPosts.length}{' '}
                  {filteredPosts.length === 1
                    ? 'artigo encontrado'
                    : 'artigos encontrados'}
                </span>
              </div>
            </section>

            {/* Articles Responsive Grid */}
            <section aria-label="Lista de tutoriais" className="mt-8">
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {filteredPosts.map((post) => (
                    <ArticleCard
                      key={post.id}
                      post={post}
                      onOpen={openPost}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-[#E4E4E7] bg-[#FFFFFF] px-6 py-12 text-center dark:border-[#2A243D] dark:bg-[#161321]">
                  <p className="font-display text-lg font-semibold text-[#18181B] dark:text-[#F3F4F6]">
                    {selectedCategory === 'Últimas Atualizações' && !searchQuery
                      ? 'Novas atualizações do Google aparecerão aqui em breve.'
                      : 'Nenhum tutorial encontrado para essa busca.'}
                  </p>
                  <p className="mt-2 text-sm text-[#52525B] dark:text-[#9CA3AF]">
                    {selectedCategory === 'Últimas Atualizações' && !searchQuery
                      ? 'Esta seção recebe automaticamente as novidades oficiais de IA e Google Workspace aprovadas no GitHub.'
                      : 'Tente usar termos como “Sheets”, “Gemini”, “CRM” ou limpe os filtros.'}
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-5 inline-flex h-10 items-center rounded-lg bg-[#7C3AED] px-4 text-sm font-medium text-white transition-colors hover:bg-[#6D28D9] dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED] cursor-pointer"
                  >
                    {selectedCategory === 'Últimas Atualizações' && !searchQuery
                      ? 'Ver todos os tutoriais'
                      : 'Limpar filtros'}
                  </button>
                </div>
              )}
            </section>
          </div>
        )}

        {route.view === 'article' &&
          (activePost ? (
            <ArticleView
              post={activePost}
              allPosts={posts}
              onBack={() => navigate('#/')}
              onOpenPost={openPost}
            />
          ) : (
            <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
              <h1 className="font-display text-2xl font-bold text-[#18181B] dark:text-[#F3F4F6]">
                Artigo não encontrado
              </h1>
              <p className="mt-3 text-sm text-[#52525B] dark:text-[#9CA3AF]">
                O tutorial que você tentou acessar não existe ou teve o endereço
                alterado.
              </p>
              <button
                type="button"
                onClick={() => navigate('#/')}
                className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-[#7C3AED] px-4 text-sm font-medium text-white transition-colors hover:bg-[#6D28D9] dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED] cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Voltar para todos os artigos</span>
              </button>
            </div>
          ))}

        {route.view === 'templates' && (
          <TemplatesView posts={posts} onOpenPost={openPost} />
        )}
      </main>

      <Footer />
    </div>
  );
}
