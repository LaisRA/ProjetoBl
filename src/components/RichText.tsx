import { Fragment } from 'react';

interface RichTextProps {
  text: string;
}

/**
 * Parses **bold**, `inline code`, and [label](https://...) links safely into React elements without HTML injection.
 */
export function RichText({ text }: RichTextProps) {
  const tokens = text.split(
    /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g
  );

  return (
    <>
      {tokens.map((token, idx) => {
        if (token.startsWith('**') && token.endsWith('**')) {
          return (
            <strong
              key={idx}
              className="font-semibold text-[#18181B] dark:text-[#F3F4F6]"
            >
              {token.slice(2, -2)}
            </strong>
          );
        }

        if (token.startsWith('`') && token.endsWith('`')) {
          return (
            <code
              key={idx}
              translate="no"
              className="notranslate rounded bg-[#EDE9FE]/80 px-1.5 py-0.5 font-mono text-[0.875em] text-[#6D28D9] dark:bg-[#8B5CF6]/16 dark:text-[#C4B5FD]"
            >
              {token.slice(1, -1)}
            </code>
          );
        }

        const linkMatch = token.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
        if (linkMatch) {
          const [, label, href] = linkMatch;
          return (
            <a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#7C3AED] underline decoration-[#7C3AED]/40 underline-offset-4 transition-colors hover:text-[#6D28D9] hover:decoration-[#6D28D9] dark:text-[#C4B5FD] dark:decoration-[#C4B5FD]/40 dark:hover:text-[#F3F4F6]"
            >
              {label}
            </a>
          );
        }

        return <Fragment key={idx}>{token}</Fragment>;
      })}
    </>
  );
}
