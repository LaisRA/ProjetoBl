import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface CodeBlockProps {
  linguagem: string;
  titulo?: string;
  conteudo: string;
}

export function CodeBlock({ linguagem, titulo, conteudo }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(conteudo);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = conteudo;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopied(true);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-[#E4E4E7] bg-[#FFFFFF] dark:border-[#2A243D] dark:bg-[#161321]">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-4 border-b border-[#E4E4E7] bg-[#FAFAFC] px-4 py-2.5 dark:border-[#2A243D] dark:bg-[#110E1B]">
        <div className="flex min-w-0 items-center gap-2.5 text-xs">
          <span className="font-mono font-medium text-[#6D28D9] dark:text-[#C4B5FD] whitespace-nowrap shrink-0">
            {linguagem}
          </span>
          {titulo && (
            <>
              <span
                aria-hidden="true"
                className="text-[#E4E4E7] dark:text-[#2A243D]"
              >
                /
              </span>
              <span className="truncate text-[#52525B] dark:text-[#9CA3AF]">
                {titulo}
              </span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-live="polite"
          className={`inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] whitespace-nowrap shrink-0 cursor-pointer ${
            copied
              ? 'bg-[#10B981] text-white'
              : 'border border-[#E4E4E7] bg-[#FFFFFF] text-[#18181B] hover:border-[#7C3AED] hover:text-[#7C3AED] dark:border-[#2A243D] dark:bg-[#161321] dark:text-[#F3F4F6] dark:hover:border-[#8B5CF6] dark:hover:text-[#C4B5FD]'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* Code / Prompt Body */}
      {(() => {
        const isPrompt = linguagem.toLowerCase().includes('prompt');
        return (
          <pre
            translate={isPrompt ? 'yes' : 'no'}
            className={`code-scroll overflow-x-auto p-4 sm:p-5 text-[13px] sm:text-sm leading-relaxed text-[#18181B] dark:text-[#F3F4F6] ${
              isPrompt ? '' : 'notranslate'
            }`}
          >
            <code className="font-mono whitespace-pre">{conteudo}</code>
          </pre>
        );
      })()}
    </div>
  );
}
