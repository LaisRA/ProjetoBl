import { Check, ChevronDown, Globe } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { LanguageOption } from '../hooks/useLanguage';

interface LanguageSelectorProps {
  currentLanguage: LanguageOption;
  languages: LanguageOption[];
  onSelectLanguage: (code: string) => void;
}

export function LanguageSelector({
  currentLanguage,
  languages,
  onSelectLanguage,
}: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative notranslate" translate="no">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Selecionar idioma do site"
        title="Idioma / Language"
        className="inline-flex h-9 items-center gap-1 rounded-lg border border-[#E4E4E7] bg-[#FFFFFF] px-2 text-xs font-medium text-[#18181B] transition-colors duration-150 hover:border-[#7C3AED]/50 hover:text-[#7C3AED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] sm:h-10 sm:gap-1.5 sm:px-2.5 dark:border-[#2A243D] dark:bg-[#161321] dark:text-[#F3F4F6] dark:hover:border-[#8B5CF6]/60 dark:hover:text-[#C4B5FD] dark:focus-visible:outline-[#8B5CF6] whitespace-nowrap shrink-0 cursor-pointer"
      >
        <Globe
          className="h-3.5 w-3.5 text-[#52525B] dark:text-[#9CA3AF]"
          aria-hidden="true"
        />
        <span>{currentLanguage.shortLabel}</span>
        <ChevronDown
          className={`h-3 w-3 text-[#52525B] transition-transform duration-150 dark:text-[#9CA3AF] ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Idiomas disponíveis"
          className="absolute right-0 mt-2 w-44 rounded-xl border border-[#E4E4E7] bg-[#FFFFFF] p-1.5 shadow-lg z-50 dark:border-[#2A243D] dark:bg-[#161321]"
        >
          {languages.map((lang) => {
            const isSelected = lang.code === currentLanguage.code;
            return (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setOpen(false);
                  onSelectLanguage(lang.code);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#EDE9FE] text-[#6D28D9] dark:bg-[#8B5CF6]/16 dark:text-[#C4B5FD]'
                    : 'text-[#18181B] hover:bg-[#FAFAFC] dark:text-[#F3F4F6] dark:hover:bg-[#0D0B14]'
                }`}
              >
                <span>{lang.nativeName}</span>
                {isSelected && (
                  <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
