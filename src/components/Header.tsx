import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { LINKS_SOCIAIS } from '../data/posts';
import type { AppRoute } from '../hooks/useHashRoute';
import type { LanguageOption } from '../hooks/useLanguage';
import type { Theme } from '../hooks/useTheme';
import { LanguageSelector } from './LanguageSelector';

interface HeaderProps {
  route: AppRoute;
  theme: Theme;
  currentLanguage: LanguageOption;
  languages: LanguageOption[];
  onSelectLanguage: (code: string) => void;
  onToggleTheme: () => void;
  onNavigate: (hash: string) => void;
}

export function Header({
  route,
  theme,
  currentLanguage,
  languages,
  onSelectLanguage,
  onToggleTheme,
  onNavigate,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (hash: string) => {
    setMobileMenuOpen(false);
    onNavigate(hash);
  };

  const isTutorialsActive = route.view === 'home' || route.view === 'article';
  const isPromptsActive = route.view === 'prompts';
  const isAboutActive = route.view === 'about';

  return (
    <header className="sticky top-0 z-40 border-b border-[#E4E4E7] bg-[#FAFAFC]/90 backdrop-blur-md transition-colors duration-200 dark:border-[#2A243D] dark:bg-[#0D0B14]/90">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-2 px-3 sm:gap-6 sm:px-6 md:gap-8">
        {/* Zone 1: Brand Logo & Wordmark */}
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            handleNav('#/');
          }}
          translate="no"
          className="notranslate inline-flex min-w-0 items-center gap-1.5 font-display text-lg font-bold tracking-tight text-[#18181B] transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C3AED] sm:gap-2.5 sm:text-xl dark:text-[#F3F4F6] dark:focus-visible:outline-[#8B5CF6] whitespace-nowrap shrink-0"
        >
          <span
            aria-hidden="true"
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center sm:h-8 sm:w-8"
          >
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt=""
              width={32}
              height={32}
              className="h-7 w-7 object-contain sm:h-8 sm:w-8 dark:brightness-125"
            />
          </span>
          <span>
            Lais Raniele<span className="text-[#7C3AED] dark:text-[#8B5CF6]">.</span>
          </span>
        </a>

        {/* Zone 2: Clean Single-Line Navigation */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              handleNav('#/');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors duration-150 ${
              isTutorialsActive
                ? 'text-[#7C3AED] dark:text-[#8B5CF6]'
                : 'text-[#52525B] hover:text-[#18181B] dark:text-[#9CA3AF] dark:hover:text-[#F3F4F6]'
            }`}
          >
            Tutoriais
          </a>
          <a
            href="#/prompts"
            onClick={(e) => {
              e.preventDefault();
              handleNav('#/prompts');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors duration-150 ${
              isPromptsActive
                ? 'text-[#7C3AED] dark:text-[#8B5CF6]'
                : 'text-[#52525B] hover:text-[#18181B] dark:text-[#9CA3AF] dark:hover:text-[#F3F4F6]'
            }`}
          >
            Prompts
          </a>
          <a
            href="#/sobre"
            onClick={(e) => {
              e.preventDefault();
              handleNav('#/sobre');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors duration-150 ${
              isAboutActive
                ? 'text-[#7C3AED] dark:text-[#8B5CF6]'
                : 'text-[#52525B] hover:text-[#18181B] dark:text-[#9CA3AF] dark:hover:text-[#F3F4F6]'
            }`}
          >
            Sobre Mim
          </a>
          <a
            href={LINKS_SOCIAIS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap shrink-0 text-[#52525B] transition-colors duration-150 hover:text-[#18181B] dark:text-[#9CA3AF] dark:hover:text-[#F3F4F6]"
          >
            YouTube
          </a>
          <a
            href={LINKS_SOCIAIS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            title={`WhatsApp ${LINKS_SOCIAIS.whatsappNumero}`}
            className="whitespace-nowrap shrink-0 text-[#52525B] transition-colors duration-150 hover:text-[#18181B] dark:text-[#9CA3AF] dark:hover:text-[#F3F4F6]"
          >
            WhatsApp
          </a>
        </nav>

        {/* Zone 3: Language Switcher + Theme Toggle (+ mobile menu trigger) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <LanguageSelector
            currentLanguage={currentLanguage}
            languages={languages}
            onSelectLanguage={onSelectLanguage}
          />

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              theme === 'light'
                ? 'Alternar para modo escuro'
                : 'Alternar para modo claro'
            }
            title={
              theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'
            }
            className="inline-flex h-9 w-9 items-center justify-center gap-2 rounded-lg border border-[#E4E4E7] bg-[#FFFFFF] text-xs font-medium text-[#18181B] transition-colors duration-150 hover:border-[#7C3AED]/50 hover:text-[#7C3AED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] sm:h-10 sm:w-auto sm:px-3 dark:border-[#2A243D] dark:bg-[#161321] dark:text-[#F3F4F6] dark:hover:border-[#8B5CF6]/60 dark:hover:text-[#C4B5FD] dark:focus-visible:outline-[#8B5CF6] whitespace-nowrap shrink-0 cursor-pointer"
          >
            {theme === 'light' ? (
              <>
                <Moon className="h-4 w-4 text-[#52525B]" aria-hidden="true" />
                <span className="hidden sm:inline">Escuro</span>
              </>
            ) : (
              <>
                <Sun className="h-4 w-4 text-[#C4B5FD]" aria-hidden="true" />
                <span className="hidden sm:inline">Claro</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E4E4E7] bg-[#FFFFFF] text-[#18181B] transition-colors sm:h-10 sm:w-10 md:hidden dark:border-[#2A243D] dark:bg-[#161321] dark:text-[#F3F4F6] cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navegação mobile"
          className="border-t border-[#E4E4E7] bg-[#FFFFFF] px-4 py-3 md:hidden dark:border-[#2A243D] dark:bg-[#161321]"
        >
          <div className="flex flex-col gap-1">
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                handleNav('#/');
              }}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isTutorialsActive
                  ? 'bg-[#EDE9FE] text-[#6D28D9] dark:bg-[#8B5CF6]/16 dark:text-[#C4B5FD]'
                  : 'text-[#52525B] hover:bg-[#FAFAFC] hover:text-[#18181B] dark:text-[#9CA3AF] dark:hover:bg-[#0D0B14] dark:hover:text-[#F3F4F6]'
              }`}
            >
              Tutoriais
            </a>
            <a
              href="#/prompts"
              onClick={(e) => {
                e.preventDefault();
                handleNav('#/prompts');
              }}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isPromptsActive
                  ? 'bg-[#EDE9FE] text-[#6D28D9] dark:bg-[#8B5CF6]/16 dark:text-[#C4B5FD]'
                  : 'text-[#52525B] hover:bg-[#FAFAFC] hover:text-[#18181B] dark:text-[#9CA3AF] dark:hover:bg-[#0D0B14] dark:hover:text-[#F3F4F6]'
              }`}
            >
              Hub de Prompts
            </a>
            <a
              href="#/sobre"
              onClick={(e) => {
                e.preventDefault();
                handleNav('#/sobre');
              }}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isAboutActive
                  ? 'bg-[#EDE9FE] text-[#6D28D9] dark:bg-[#8B5CF6]/16 dark:text-[#C4B5FD]'
                  : 'text-[#52525B] hover:bg-[#FAFAFC] hover:text-[#18181B] dark:text-[#9CA3AF] dark:hover:bg-[#0D0B14] dark:hover:text-[#F3F4F6]'
              }`}
            >
              Sobre Mim
            </a>
            <a
              href={LINKS_SOCIAIS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#52525B] transition-colors hover:bg-[#FAFAFC] hover:text-[#18181B] dark:text-[#9CA3AF] dark:hover:bg-[#0D0B14] dark:hover:text-[#F3F4F6]"
            >
              YouTube
            </a>
            <a
              href={LINKS_SOCIAIS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#52525B] transition-colors hover:bg-[#FAFAFC] hover:text-[#18181B] dark:text-[#9CA3AF] dark:hover:bg-[#0D0B14] dark:hover:text-[#F3F4F6]"
            >
              WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
