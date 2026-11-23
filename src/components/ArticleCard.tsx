import { ArrowRight, PlayCircle } from 'lucide-react';
import type { Post } from '../data/posts';

interface ArticleCardProps {
  post: Post;
  onOpen: (slug: string) => void;
}

export function ArticleCard({ post, onOpen }: ArticleCardProps) {
  return (
    <article className="group flex flex-col justify-between rounded-xl border border-[#E4E4E7] bg-[#FFFFFF] p-6 transition-colors duration-150 hover:border-[#7C3AED]/60 dark:border-[#2A243D] dark:bg-[#161321] dark:hover:border-[#8B5CF6]/70">
      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="inline-block rounded-md bg-[#EDE9FE] px-2.5 py-1 text-xs font-medium text-[#6D28D9] dark:bg-[#8B5CF6]/16 dark:text-[#C4B5FD] whitespace-nowrap">
            {post.categoria}
          </span>
          {post.youtubeId && (
            <span className="inline-flex items-center gap-1 text-xs text-[#52525B] dark:text-[#9CA3AF] whitespace-nowrap">
              <PlayCircle className="h-3.5 w-3.5 text-[#7C3AED] dark:text-[#8B5CF6]" aria-hidden="true" />
              Vídeo
            </span>
          )}
        </div>

        <h2 className="font-display text-lg sm:text-xl font-semibold leading-snug tracking-tight text-[#18181B] transition-colors duration-150 group-hover:text-[#7C3AED] dark:text-[#F3F4F6] dark:group-hover:text-[#C4B5FD]">
          <a
            href={`#/artigo/${post.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onOpen(post.slug);
            }}
            className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C3AED] dark:focus-visible:outline-[#8B5CF6]"
          >
            {post.titulo}
          </a>
        </h2>

        <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
          {post.resumo}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#E4E4E7] pt-4 dark:border-[#2A243D]">
        <div className="flex items-center gap-2 text-xs text-[#52525B] tabular-nums dark:text-[#9CA3AF]">
          <span>{post.data}</span>
          <span aria-hidden="true">·</span>
          <span>{post.tempoLeitura}</span>
        </div>

        <button
          type="button"
          onClick={() => onOpen(post.slug)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7C3AED] transition-colors group-hover:text-[#6D28D9] dark:text-[#8B5CF6] dark:group-hover:text-[#C4B5FD] whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Ler tutorial</span>
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  );
}
