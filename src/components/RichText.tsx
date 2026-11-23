import { Fragment } from 'react';

interface RichTextProps {
  text: string;
}

/**
 * Parses **bold** and `inline code` safely into React elements without HTML injection.
 */
export function RichText({ text }: RichTextProps) {
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

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
              className="rounded bg-[#EDE9FE]/80 px-1.5 py-0.5 font-mono text-[0.875em] text-[#6D28D9] dark:bg-[#8B5CF6]/16 dark:text-[#C4B5FD]"
            >
              {token.slice(1, -1)}
            </code>
          );
        }

        return <Fragment key={idx}>{token}</Fragment>;
      })}
    </>
  );
}
