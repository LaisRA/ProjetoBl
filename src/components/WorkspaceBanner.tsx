import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { LINKS_SOCIAIS } from '../data/posts';

export function WorkspaceTopBar() {
  return (
    <div className="border-b border-[#E4E4E7] bg-[#EDE9FE]/65 dark:border-[#2A243D] dark:bg-[#161321]">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-3.5 py-2.5 text-xs sm:gap-x-6 sm:px-6 sm:text-[13px]">
        <p className="min-w-0 leading-snug text-[#18181B] dark:text-[#F3F4F6]">
          <span className="font-semibold text-[#6D28D9] dark:text-[#C4B5FD]">
            Google Workspace + Gemini:
          </span>{' '}
          <span className="text-[#52525B] dark:text-[#9CA3AF]">
            conheça os planos e peça um código promocional comigo.
          </span>
        </p>

        <div className="flex min-w-0 max-w-full flex-wrap items-center gap-x-3 gap-y-1.5 sm:gap-x-4">
          <a
            href={LINKS_SOCIAIS.workspaceAfiliado}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1 font-semibold text-[#7C3AED] transition-colors hover:text-[#6D28D9] dark:text-[#C4B5FD] dark:hover:text-[#F3F4F6] whitespace-nowrap"
          >
            <span>Conhecer Workspace</span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </a>

          <span
            aria-hidden="true"
            className="hidden text-[#E4E4E7] sm:inline dark:text-[#2A243D]"
          >
            |
          </span>

          <a
            href={LINKS_SOCIAIS.whatsappCupom}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-[#52525B] transition-colors hover:text-[#18181B] dark:text-[#9CA3AF] dark:hover:text-[#F3F4F6] whitespace-nowrap"
          >
            <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Pedir cupom no WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
