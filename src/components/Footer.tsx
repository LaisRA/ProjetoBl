import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { LINKS_SOCIAIS } from '../data/posts';

interface FooterProps {
  onNavigate: (hash: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="mt-20 border-t border-[#E4E4E7] bg-[#FAFAFC] dark:border-[#2A243D] dark:bg-[#0D0B14]">
      <div className="mx-auto max-w-5xl px-4 pt-12 pb-8 sm:px-6">
        {/* Google Workspace Affiliate CTA Card */}
        <section
          aria-labelledby="workspace-footer-cta"
          className="mb-10 rounded-2xl border border-[#E4E4E7] bg-[#FFFFFF] p-6 sm:p-8 dark:border-[#2A243D] dark:bg-[#161321]"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-medium text-[#7C3AED] dark:text-[#C4B5FD]">
                Indicação oficial · Google Workspace
              </p>
              <h2
                id="workspace-footer-cta"
                className="mt-2 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#18181B] dark:text-[#F3F4F6]"
              >
                Use o Google Workspace com Gemini no seu negócio
              </h2>
              <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                Tenha e-mail profissional com seu domínio, Google Drive,
                Planilhas, Docs e Gemini integrados. Tenho{' '}
                <strong className="font-semibold text-[#18181B] dark:text-[#F3F4F6]">
                  códigos promocionais exclusivos
                </strong>{' '}
                — me chame no WhatsApp para garantir o desconto.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={LINKS_SOCIAIS.workspaceAfiliado}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#7C3AED] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#6D28D9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED] whitespace-nowrap"
              >
                <span>Conhecer o Workspace</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href={LINKS_SOCIAIS.whatsappCupom}
                target="_blank"
                rel="noopener noreferrer"
                title={`Pedir código promocional pelo WhatsApp ${LINKS_SOCIAIS.whatsappNumero}`}
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#E4E4E7] bg-[#FAFAFC] px-4 text-sm font-medium text-[#18181B] transition-colors hover:border-[#7C3AED]/60 hover:text-[#7C3AED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] dark:border-[#2A243D] dark:bg-[#0D0B14] dark:text-[#F3F4F6] dark:hover:border-[#8B5CF6]/60 dark:hover:text-[#C4B5FD] whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Pedir cupom no WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* Brand Logo, Copyright & Social Links */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-[#E4E4E7] pt-6 sm:flex-row sm:items-center dark:border-[#2A243D]">
          <div className="flex items-center gap-3">
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#/');
              }}
              aria-label="Lais Raniele — Início"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] dark:focus-visible:outline-[#8B5CF6]"
            >
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="Logo Lais Raniele"
                width={32}
                height={32}
                className="h-7 w-7 object-contain dark:brightness-125"
              />
            </a>
            <p
              translate="no"
              className="notranslate text-sm text-[#52525B] dark:text-[#9CA3AF]"
            >
              © 2026 Lais Raniele — laisraniele.com.br
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
            <a
              href="#/sobre"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#/sobre');
              }}
              className="text-[#52525B] transition-colors hover:text-[#7C3AED] dark:text-[#9CA3AF] dark:hover:text-[#C4B5FD]"
            >
              Sobre Mim
            </a>
            <a
              href="#/privacidade"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#/privacidade');
              }}
              className="text-[#52525B] transition-colors hover:text-[#7C3AED] dark:text-[#9CA3AF] dark:hover:text-[#C4B5FD]"
            >
              Privacidade
            </a>
            <a
              href={LINKS_SOCIAIS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#52525B] transition-colors hover:text-[#7C3AED] dark:text-[#9CA3AF] dark:hover:text-[#C4B5FD]"
            >
              YouTube
            </a>
            <a
              href={LINKS_SOCIAIS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#52525B] transition-colors hover:text-[#7C3AED] dark:text-[#9CA3AF] dark:hover:text-[#C4B5FD]"
            >
              Instagram
            </a>
            <a
              href={LINKS_SOCIAIS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              title={`WhatsApp ${LINKS_SOCIAIS.whatsappNumero}`}
              className="text-[#52525B] transition-colors hover:text-[#7C3AED] dark:text-[#9CA3AF] dark:hover:text-[#C4B5FD]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
