import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { CATEGORIAS, type Categoria, type Post } from '../data/posts';

interface TemplatesViewProps {
  posts: Post[];
  onOpenPost: (slug: string) => void;
}

export function TemplatesView({ posts, onOpenPost }: TemplatesViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<Categoria | 'Todos'>(
    'Todos'
  );

  const filtered =
    selectedCategory === 'Todos'
      ? posts
      : posts.filter((post) => post.categoria === selectedCategory);

  return (
    <section className="mx-auto max-w-5xl px-4 pt-10 pb-8 sm:px-6 sm:pt-14">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#18181B] dark:text-[#F3F4F6]">
          Templates prontos do Ecossistema Google
        </h1>
        <p className="mt-3 text-base leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
          Planilhas, modelos de documentos, prompts estruturados e scripts em
          Apps Script prontos para duplicar na sua conta e aplicar hoje mesmo.
        </p>
      </div>

      {/* Category Filter */}
      <div
        role="tablist"
        aria-label="Filtrar templates por categoria"
        className="mt-8 flex flex-wrap items-center gap-2"
      >
        {(['Todos', ...CATEGORIAS] as const).map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedCategory(cat)}
              className={`h-10 rounded-lg px-4 text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                active
                  ? 'bg-[#7C3AED] text-white dark:bg-[#8B5CF6]'
                  : 'border border-[#E4E4E7] bg-[#FFFFFF] text-[#52525B] hover:border-[#7C3AED]/50 hover:text-[#18181B] dark:border-[#2A243D] dark:bg-[#161321] dark:text-[#9CA3AF] dark:hover:border-[#8B5CF6]/60 dark:hover:text-[#F3F4F6]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Templates Grid */}
      {filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((post) => (
            <div
              key={post.id}
              className="flex flex-col justify-between rounded-xl border border-[#E4E4E7] bg-[#FFFFFF] p-6 transition-colors hover:border-[#7C3AED]/50 dark:border-[#2A243D] dark:bg-[#161321] dark:hover:border-[#8B5CF6]/60"
            >
              <div>
                <span className="inline-block rounded-md bg-[#EDE9FE] px-2.5 py-1 text-xs font-medium text-[#6D28D9] dark:bg-[#8B5CF6]/16 dark:text-[#C4B5FD]">
                  {post.categoria}
                </span>

                <h2 className="mt-4 font-display text-xl font-bold tracking-tight text-[#18181B] dark:text-[#F3F4F6]">
                  {post.tituloTemplate}
                </h2>

                <p className="mt-2.5 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                  {post.descricaoTemplate}
                </p>

                <ul className="mt-4 space-y-2 text-sm text-[#52525B] dark:text-[#9CA3AF]">
                  {post.itensTemplate.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#7C3AED] dark:text-[#8B5CF6]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#E4E4E7] pt-5 dark:border-[#2A243D]">
                <a
                  href={post.linkTemplate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#7C3AED] px-4 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#6D28D9] dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED] whitespace-nowrap"
                >
                  <span>Acessar Template</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() => onOpenPost(post.slug)}
                  className="inline-flex h-10 items-center gap-1.5 text-xs sm:text-sm font-medium text-[#52525B] transition-colors hover:text-[#7C3AED] dark:text-[#9CA3AF] dark:hover:text-[#C4B5FD] whitespace-nowrap cursor-pointer"
                >
                  <span>Ver tutorial passo a passo</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-xl border border-[#E4E4E7] bg-[#FFFFFF] px-6 py-12 text-center dark:border-[#2A243D] dark:bg-[#161321]">
          <p className="font-display text-lg font-semibold text-[#18181B] dark:text-[#F3F4F6]">
            Ainda não há itens publicados nesta categoria.
          </p>
          <p className="mt-2 text-sm text-[#52525B] dark:text-[#9CA3AF]">
            Novos recursos e atualizações do Google aparecerão aqui assim que
            forem publicados.
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory('Todos')}
            className="mt-5 inline-flex h-10 items-center rounded-lg bg-[#7C3AED] px-4 text-sm font-medium text-white transition-colors hover:bg-[#6D28D9] dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED] cursor-pointer"
          >
            Ver todos os templates
          </button>
        </div>
      )}
    </section>
  );
}
