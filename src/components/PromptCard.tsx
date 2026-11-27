import {
  Check,
  Copy,
  ExternalLink,
  SlidersHorizontal,
  Sparkles,
  Star,
} from 'lucide-react';
import { Fragment } from 'react';
import type { GoogleAccent, PromptItem } from '../data/prompts';

function getGoogleAccentTextClass(accent: GoogleAccent): string {
  switch (accent) {
    case 'green':
      return 'text-[#15803D] dark:text-[#86EFAC]';
    case 'blue':
      return 'text-[#1D4ED8] dark:text-[#93C5FD]';
    case 'red':
      return 'text-[#B91C1C] dark:text-[#FCA5A5]';
    case 'yellow':
      return 'text-[#A16207] dark:text-[#FDE047]';
  }
}

export function HighlightedPromptText({
  text,
  allowedVariables,
  customValues,
}: {
  text: string;
  allowedVariables?: string[];
  customValues?: Record<string, string>;
}) {
  const parts = text.split(/(\[[^\]]+\])/g);
  const allowedSet = allowedVariables ? new Set(allowedVariables) : null;

  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith('[') && part.endsWith(']')) {
          const key = part.slice(1, -1);
          if (allowedSet && !allowedSet.has(key)) {
            return <Fragment key={idx}>{part}</Fragment>;
          }
          const customValue = customValues?.[key]?.trim();

          if (customValue) {
            return (
              <mark
                key={idx}
                className="rounded bg-[#10B981]/15 px-1 py-0.5 font-medium text-[#047857] dark:bg-[#10B981]/20 dark:text-[#6EE7B7]"
              >
                {customValue}
              </mark>
            );
          }

          return (
            <span
              key={idx}
              className="rounded bg-[#EDE9FE] px-1 py-0.5 font-mono text-[0.9em] font-medium text-[#6D28D9] dark:bg-[#8B5CF6]/20 dark:text-[#C4B5FD]"
            >
              {part}
            </span>
          );
        }

        return <Fragment key={idx}>{part}</Fragment>;
      })}
    </>
  );
}

interface PromptCardProps {
  item: PromptItem;
  isFavorited: boolean;
  isCopied: boolean;
  variableCount: number;
  geminiUrl: string;
  onToggleFavorite: (id: string) => void;
  onCopy: (item: PromptItem) => void;
  onCustomize: (item: PromptItem) => void;
}

export function PromptCard({
  item,
  isFavorited,
  isCopied,
  variableCount,
  geminiUrl,
  onToggleFavorite,
  onCopy,
  onCustomize,
}: PromptCardProps) {
  return (
    <article className="flex flex-col justify-between rounded-xl border border-[#E4E4E7] bg-[#FFFFFF] p-3 transition-colors duration-150 hover:border-[#7C3AED]/45 dark:border-[#2A243D] dark:bg-[#161321] dark:hover:border-[#8B5CF6]/55">
      <div>
        {/* Compact Metadata Row + Favorite Button */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1 text-[11px] font-medium leading-none">
            <span
              className={`truncate ${getGoogleAccentTextClass(item.corGoogle)}`}
            >
              {item.ferramenta}
            </span>
            <span
              aria-hidden="true"
              className="shrink-0 text-[#D4D4D8] dark:text-[#3F3A52]"
            >
              ·
            </span>
            <span className="truncate text-[#52525B] dark:text-[#9CA3AF]">
              {item.categoria}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onToggleFavorite(item.id)}
            aria-label={
              isFavorited
                ? `Remover "${item.titulo}" dos favoritos`
                : `Salvar "${item.titulo}" nos favoritos`
            }
            aria-pressed={isFavorited}
            title={
              isFavorited ? 'Remover dos favoritos' : 'Salvar nos favoritos'
            }
            className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#7C3AED] cursor-pointer ${
              isFavorited
                ? 'border-[#FBBC05]/50 bg-[#FBBC05]/12 text-[#D97706] dark:text-[#FDE047]'
                : 'border-[#E4E4E7] bg-[#FAFAFC] text-[#52525B] hover:border-[#FBBC05]/60 hover:text-[#D97706] dark:border-[#2A243D] dark:bg-[#0D0B14] dark:text-[#9CA3AF] dark:hover:text-[#FDE047]'
            }`}
          >
            <Star
              className={`h-3 w-3 ${isFavorited ? 'fill-current' : ''}`}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Compact Title & Description */}
        <h3
          title={item.titulo}
          className="mt-1.5 font-display text-[13.5px] font-bold leading-[1.3] text-[#18181B] line-clamp-2 dark:text-[#F3F4F6]"
        >
          {item.titulo}
        </h3>
        <p className="mt-1 text-[11.5px] leading-[1.4] text-[#52525B] line-clamp-2 dark:text-[#A1A1AA]">
          {item.descricao}
        </p>

        {/* Compact Scrollable Prompt Preview */}
        <div className="mt-2 h-[68px] overflow-y-auto code-scroll whitespace-pre-line rounded-lg border border-[#E4E4E7]/90 bg-[#FAFAFC] px-2.5 py-1.5 text-[11px] leading-[1.42] text-[#27272A] dark:border-[#2A243D] dark:bg-[#0D0B14] dark:text-[#D4D4D8]">
          <HighlightedPromptText
            text={item.prompt}
            allowedVariables={item.variaveis}
          />
        </div>
      </div>

      {/* Compact Single-Row Action Bar */}
      <div className="mt-2.5 flex items-center justify-between gap-1.5 border-t border-[#E4E4E7]/75 pt-2 dark:border-[#2A243D]/75">
        <div className="flex min-w-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => onCopy(item)}
            className={`inline-flex h-7 items-center gap-1 rounded-md px-2.5 text-[11px] font-semibold text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#7C3AED] whitespace-nowrap shrink-0 cursor-pointer ${
              isCopied
                ? 'bg-[#10B981]'
                : 'bg-[#7C3AED] hover:bg-[#6D28D9] dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED]'
            }`}
          >
            {isCopied ? (
              <>
                <Check className="h-3 w-3" aria-hidden="true" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" aria-hidden="true" />
                <span>Copiar</span>
              </>
            )}
          </button>

          {variableCount > 0 && (
            <button
              type="button"
              onClick={() => onCustomize(item)}
              className="inline-flex h-7 items-center gap-1 rounded-md border border-[#E4E4E7] bg-[#FFFFFF] px-2 text-[11px] font-medium text-[#18181B] transition-colors duration-150 hover:border-[#7C3AED]/60 hover:text-[#7C3AED] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#7C3AED] dark:border-[#2A243D] dark:bg-[#0D0B14] dark:text-[#F3F4F6] dark:hover:border-[#8B5CF6]/60 dark:hover:text-[#C4B5FD] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <SlidersHorizontal className="h-3 w-3" aria-hidden="true" />
              <span>Personalizar</span>
            </button>
          )}
        </div>

        <a
          href={geminiUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Abrir no Gemini"
          className="inline-flex h-7 items-center gap-1 rounded-md px-1.5 text-[11px] font-medium text-[#52525B] transition-colors hover:text-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#4285F4] dark:text-[#9CA3AF] dark:hover:text-[#93C5FD] whitespace-nowrap shrink-0"
        >
          <Sparkles className="h-3 w-3 text-[#4285F4]" aria-hidden="true" />
          <span>Gemini</span>
          <ExternalLink className="h-2.5 w-2.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
