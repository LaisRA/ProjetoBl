import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  RotateCcw,
  Search,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { LINKS_SOCIAIS } from '../data/posts';
import {
  PROMPT_CATEGORIAS,
  promptsData,
  type PromptCategoria,
  type PromptItem,
} from '../data/prompts';
import { HighlightedPromptText, PromptCard } from './PromptCard';

interface PromptsHubViewProps {
  onBack: () => void;
}

type CategoryFilter = 'Todos' | PromptCategoria | 'Favoritos';

const FAVORITES_STORAGE_KEY = 'laisraniele_prompt_favorites';
const GEMINI_APP_URL = 'https://gemini.google.com/app';

/**
 * ============================================================================
 * LINK DE AFILIADA DO GOOGLE WORKSPACE (BANNER DO HUB DE PROMPTS)
 * ============================================================================
 * Já conectado ao seu link oficial definido em `src/data/posts.ts`.
 * Caso queira usar uma URL diferente apenas neste banner, substitua abaixo:
 */
const WORKSPACE_AFFILIATE_URL = LINKS_SOCIAIS.workspaceAfiliado;

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function extractVariables(item: PromptItem): string[] {
  if (item.variaveis && item.variaveis.length > 0) {
    return item.variaveis;
  }
  const matches = item.prompt.match(/\[[^\]]+\]/g) ?? [];
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const token of matches) {
    const inner = token.slice(1, -1);
    if (!seen.has(inner)) {
      seen.add(inner);
      unique.push(inner);
    }
  }
  return unique;
}

function buildCustomizedPrompt(
  template: string,
  values: Record<string, string>
): string {
  return template.replace(/\[([^\]]+)\]/g, (full, key: string) => {
    const filled = values[key]?.trim();
    return filled ? filled : full;
  });
}

function isLongField(label: string): boolean {
  const upper = label.toUpperCase();
  return (
    upper.includes('COLE') ||
    upper.includes('DESCREVA') ||
    upper.includes('DADOS') ||
    upper.includes('ANOTAÇÕES') ||
    upper.includes('EX:')
  );
}


async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch {
      return false;
    }
  }
}

function WorkspaceAffiliateCard() {
  return (
    <aside
      aria-labelledby="prompts-workspace-banner"
      className="overflow-hidden rounded-2xl border border-[#E4E4E7] bg-[#FFFFFF] dark:border-[#2A243D] dark:bg-[#161321]"
    >
      <div aria-hidden="true" className="grid h-[3px] w-full grid-cols-4">
        <span className="bg-[#4285F4]" />
        <span className="bg-[#EA4335]" />
        <span className="bg-[#FBBC05]" />
        <span className="bg-[#34A853]" />
      </div>

      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
        <div className="max-w-xl">
          <p className="text-[11px] font-medium text-[#7C3AED] dark:text-[#C4B5FD]">
            Indicação oficial · Google Workspace + Gemini
          </p>
          <h2
            id="prompts-workspace-banner"
            className="mt-1 font-display text-base sm:text-lg font-bold tracking-tight text-[#18181B] dark:text-[#F3F4F6]"
          >
            Quer usar o Gemini integrado direto no seu Gmail, Docs e Planilhas?
          </h2>
          <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
            Conheça o Google Workspace com meu link de afiliada e leve esses
            prompts para dentro das ferramentas que você já usa todos os dias.
          </p>
        </div>

        <a
          href={WORKSPACE_AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-4 text-xs sm:text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#6D28D9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED] whitespace-nowrap"
        >
          <span>Conhecer o Google Workspace</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
}

interface CustomizeModalProps {
  promptItem: PromptItem;
  onClose: () => void;
}

function CustomizePromptModal({ promptItem, onClose }: CustomizeModalProps) {
  const variables = useMemo(() => extractVariables(promptItem), [promptItem]);

  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  const finalPrompt = useMemo(
    () => buildCustomizedPrompt(promptItem.prompt, values),
    [promptItem.prompt, values]
  );

  const filledCount = variables.filter((v) => values[v]?.trim()).length;

  const handleCopyCustomized = async () => {
    const ok = await copyToClipboard(finalPrompt);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="customize-modal-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-0 backdrop-blur-xs sm:items-center sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-[#E4E4E7] bg-[#FFFFFF] shadow-2xl sm:rounded-2xl dark:border-[#2A243D] dark:bg-[#161321]">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#E4E4E7] px-5 py-4 sm:px-6 dark:border-[#2A243D]">
          <div>
            <p className="text-xs font-medium text-[#7C3AED] dark:text-[#C4B5FD]">
              Personalizar prompt · {promptItem.ferramenta}
            </p>
            <h2
              id="customize-modal-title"
              className="mt-1 font-display text-lg sm:text-xl font-bold text-[#18181B] dark:text-[#F3F4F6]"
            >
              {promptItem.titulo}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela de personalização"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E4E4E7] bg-[#FAFAFC] text-[#52525B] transition-colors hover:text-[#18181B] dark:border-[#2A243D] dark:bg-[#0D0B14] dark:text-[#9CA3AF] dark:hover:text-[#F3F4F6] cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-6">
          {/* Variable Form Inputs */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-[#18181B] dark:text-[#F3F4F6]">
                Preencha os campos ({filledCount}/{variables.length})
              </p>
              {filledCount > 0 && (
                <button
                  type="button"
                  onClick={() => setValues({})}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#52525B] transition-colors hover:text-[#7C3AED] dark:text-[#9CA3AF] dark:hover:text-[#C4B5FD] cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" aria-hidden="true" />
                  <span>Limpar campos</span>
                </button>
              )}
            </div>

            <div className="mt-3 space-y-3.5">
              {variables.map((variable, index) => {
                const inputId = `prompt-var-${index}`;
                const long = isLongField(variable);
                return (
                  <div key={variable}>
                    <label
                      htmlFor={inputId}
                      className="block font-mono text-xs font-medium text-[#6D28D9] dark:text-[#C4B5FD]"
                    >
                      [{variable}]
                    </label>
                    {long ? (
                      <textarea
                        id={inputId}
                        rows={3}
                        value={values[variable] ?? ''}
                        onChange={(e) =>
                          setValues((prev) => ({
                            ...prev,
                            [variable]: e.target.value,
                          }))
                        }
                        placeholder={`Digite aqui: ${variable.toLowerCase()}...`}
                        className="mt-1.5 w-full rounded-xl border border-[#E4E4E7] bg-[#FAFAFC] px-3.5 py-2.5 text-sm text-[#18181B] placeholder:text-[#52525B]/65 transition-colors focus:border-[#7C3AED] focus:bg-[#FFFFFF] focus:outline-none dark:border-[#2A243D] dark:bg-[#0D0B14] dark:text-[#F3F4F6] dark:placeholder:text-[#9CA3AF]/60 dark:focus:border-[#8B5CF6]"
                      />
                    ) : (
                      <input
                        id={inputId}
                        type="text"
                        value={values[variable] ?? ''}
                        onChange={(e) =>
                          setValues((prev) => ({
                            ...prev,
                            [variable]: e.target.value,
                          }))
                        }
                        placeholder={`Digite aqui: ${variable.toLowerCase()}...`}
                        className="mt-1.5 h-10 w-full rounded-xl border border-[#E4E4E7] bg-[#FAFAFC] px-3.5 text-sm text-[#18181B] placeholder:text-[#52525B]/65 transition-colors focus:border-[#7C3AED] focus:bg-[#FFFFFF] focus:outline-none dark:border-[#2A243D] dark:bg-[#0D0B14] dark:text-[#F3F4F6] dark:placeholder:text-[#9CA3AF]/60 dark:focus:border-[#8B5CF6]"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Preview */}
          <div>
            <p className="text-xs font-semibold text-[#18181B] dark:text-[#F3F4F6]">
              Prévia pronta para copiar
            </p>
            <div className="mt-2 max-h-60 overflow-y-auto code-scroll whitespace-pre-line rounded-xl border border-[#E4E4E7] bg-[#FAFAFC] p-4 text-sm leading-relaxed text-[#18181B] dark:border-[#2A243D] dark:bg-[#0D0B14] dark:text-[#E5E7EB]">
              <HighlightedPromptText
                text={promptItem.prompt}
                allowedVariables={promptItem.variaveis}
                customValues={values}
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E4E4E7] bg-[#FAFAFC] px-5 py-4 sm:px-6 dark:border-[#2A243D] dark:bg-[#0D0B14]">
          <a
            href={GEMINI_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[#E4E4E7] bg-[#FFFFFF] px-3.5 text-xs sm:text-sm font-medium text-[#18181B] transition-colors hover:border-[#4285F4]/60 hover:text-[#1D4ED8] dark:border-[#2A243D] dark:bg-[#161321] dark:text-[#F3F4F6] dark:hover:border-[#4285F4]/60 dark:hover:text-[#93C5FD] whitespace-nowrap"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#4285F4]" aria-hidden="true" />
            <span>Abrir no Gemini</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={handleCopyCustomized}
            className={`inline-flex h-10 items-center gap-2 rounded-lg px-4 text-xs sm:text-sm font-semibold text-white transition-colors duration-150 whitespace-nowrap cursor-pointer ${
              copied
                ? 'bg-[#10B981]'
                : 'bg-[#7C3AED] hover:bg-[#6D28D9] dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED]'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Copiado! ✓</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" aria-hidden="true" />
                <span>Copiar prompt personalizado</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function PromptsHubView({ onBack }: PromptsHubViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>('Todos');
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed)
        ? parsed.filter((item): item is string => typeof item === 'string')
        : [];
    } catch {
      return [];
    }
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [customizingPrompt, setCustomizingPrompt] = useState<PromptItem | null>(
    null
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favoriteIds)
      );
    } catch {
      // Ignore storage errors
    }
  }, [favoriteIds]);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopyPrompt = async (item: PromptItem) => {
    const ok = await copyToClipboard(item.prompt);
    if (ok) {
      setCopiedId(item.id);
      window.setTimeout(() => {
        setCopiedId((current) => (current === item.id ? null : current));
      }, 2000);
    }
  };

  const filteredPrompts = useMemo(() => {
    const query = normalizeText(searchQuery.trim());

    return promptsData.filter((item) => {
      if (selectedCategory === 'Favoritos') {
        if (!favoriteIds.includes(item.id)) return false;
      } else if (
        selectedCategory !== 'Todos' &&
        item.categoria !== selectedCategory
      ) {
        return false;
      }

      if (!query) return true;

      const haystack = normalizeText(
        `${item.titulo} ${item.descricao} ${item.ferramenta} ${item.categoria} ${item.prompt}`
      );
      return haystack.includes(query);
    });
  }, [searchQuery, selectedCategory, favoriteIds]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todos');
  };

  const categories: CategoryFilter[] = [
    'Todos',
    ...PROMPT_CATEGORIAS,
    'Favoritos',
  ];

  const firstBatch =
    filteredPrompts.length > 12
      ? filteredPrompts.slice(0, 12)
      : filteredPrompts;
  const secondBatch =
    filteredPrompts.length > 12 ? filteredPrompts.slice(12) : [];

  const renderPromptCard = (item: PromptItem) => (
    <PromptCard
      key={item.id}
      item={item}
      isFavorited={favoriteIds.includes(item.id)}
      isCopied={copiedId === item.id}
      variableCount={extractVariables(item).length}
      geminiUrl={GEMINI_APP_URL}
      onToggleFavorite={toggleFavorite}
      onCopy={handleCopyPrompt}
      onCustomize={setCustomizingPrompt}
    />
  );

  return (
    <div className="mx-auto max-w-7xl px-4 pt-5 pb-10 sm:px-6 sm:pt-6">
      {/* Back navigation */}
      <div className="mb-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-8 items-center gap-1.5 text-xs sm:text-sm font-medium text-[#52525B] transition-colors duration-150 hover:text-[#7C3AED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] dark:text-[#9CA3AF] dark:hover:text-[#C4B5FD] cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Voltar para os tutoriais</span>
        </button>
      </div>

      {/* Compact Header / Hero */}
      <section className="max-w-3xl">
        <p className="text-[11px] sm:text-xs font-medium text-[#7C3AED] dark:text-[#C4B5FD]">
          Diretório Prático · Gemini · Google Workspace · Planilhas &amp; Finanças
        </p>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold leading-[1.15] tracking-tight text-[#18181B] dark:text-[#F3F4F6]">
          Hub de Prompts da Lais Raniele
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
          Prompts prontos e testados para copiar, personalizar com seus dados e
          colar direto no Gemini, Google Planilhas, Gmail, Docs e Apps Script.
        </p>
      </section>

      {/* Real-Time Search & Category Filters */}
      <section
        aria-label="Busca e filtros de prompts"
        className="mt-4 flex flex-col gap-3 border-y border-[#E4E4E7] py-3.5 dark:border-[#2A243D]"
      >
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#52525B] dark:text-[#9CA3AF]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por fórmula, fluxo de caixa, Apps Script, Gmail, Trends..."
            aria-label="Buscar prompts por título, ferramenta ou palavra-chave"
            className="h-10 w-full rounded-xl border border-[#E4E4E7] bg-[#FFFFFF] pr-10 pl-10 text-sm text-[#18181B] placeholder:text-[#52525B]/75 transition-colors focus:border-[#7C3AED] focus:outline-none dark:border-[#2A243D] dark:bg-[#161321] dark:text-[#F3F4F6] dark:placeholder:text-[#9CA3AF]/75 dark:focus:border-[#8B5CF6]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Limpar busca de prompts"
              className="absolute top-1/2 right-2.5 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[#52525B] hover:bg-[#FAFAFC] hover:text-[#18181B] dark:text-[#9CA3AF] dark:hover:bg-[#0D0B14] dark:hover:text-[#F3F4F6] cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div
            role="tablist"
            aria-label="Filtrar prompts por categoria"
            className="flex flex-wrap items-center gap-1.5"
          >
            {categories.map((categoria) => {
              const isActive = selectedCategory === categoria;
              const isFavTab = categoria === 'Favoritos';
              return (
                <button
                  key={categoria}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(categoria)}
                  className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#7C3AED] text-white dark:bg-[#8B5CF6]'
                      : 'border border-[#E4E4E7] bg-[#FFFFFF] text-[#52525B] hover:border-[#7C3AED]/50 hover:text-[#18181B] dark:border-[#2A243D] dark:bg-[#161321] dark:text-[#9CA3AF] dark:hover:border-[#8B5CF6]/60 dark:hover:text-[#F3F4F6]'
                  }`}
                >
                  {isFavTab && (
                    <Star
                      className={`h-3 w-3 ${
                        isActive ? 'fill-white text-white' : 'text-[#D97706] dark:text-[#FDE047]'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  <span>{categoria}</span>
                  {isFavTab && favoriteIds.length > 0 && (
                    <span className="tabular-nums opacity-85">
                      ({favoriteIds.length})
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <span className="text-xs text-[#52525B] tabular-nums dark:text-[#9CA3AF]">
            {filteredPrompts.length}{' '}
            {filteredPrompts.length === 1
              ? 'prompt encontrado'
              : 'prompts encontrados'}
          </span>
        </div>
      </section>

      {/* Compact Prompts Directory Grid */}
      <section aria-label="Lista de prompts" className="mt-5 space-y-5">
        {filteredPrompts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {firstBatch.map(renderPromptCard)}
            </div>

            {/* Discreet Affiliate Banner */}
            <WorkspaceAffiliateCard />

            {secondBatch.length > 0 && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {secondBatch.map(renderPromptCard)}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="rounded-2xl border border-[#E4E4E7] bg-[#FFFFFF] px-6 py-12 text-center dark:border-[#2A243D] dark:bg-[#161321]">
              <p className="font-display text-lg font-semibold text-[#18181B] dark:text-[#F3F4F6]">
                {selectedCategory === 'Favoritos' && !searchQuery
                  ? 'Você ainda não salvou nenhum prompt nos favoritos.'
                  : 'Nenhum prompt encontrado para essa busca.'}
              </p>
              <p className="mt-2 text-sm text-[#52525B] dark:text-[#9CA3AF]">
                {selectedCategory === 'Favoritos' && !searchQuery
                  ? 'Clique no ícone de estrela em qualquer card para guardar seus prompts preferidos aqui.'
                  : 'Tente buscar por “fórmula”, “fluxo de caixa”, “Gmail”, “Apps Script” ou limpe os filtros.'}
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 inline-flex h-10 items-center rounded-lg bg-[#7C3AED] px-4 text-sm font-medium text-white transition-colors hover:bg-[#6D28D9] dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED] cursor-pointer"
              >
                {selectedCategory === 'Favoritos' && !searchQuery
                  ? 'Ver todos os prompts'
                  : 'Limpar filtros'}
              </button>
            </div>

            <WorkspaceAffiliateCard />
          </>
        )}
      </section>

      {/* Personalizar Modal */}
      {customizingPrompt && (
        <CustomizePromptModal
          promptItem={customizingPrompt}
          onClose={() => setCustomizingPrompt(null)}
        />
      )}
    </div>
  );
}
