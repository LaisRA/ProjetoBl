import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  FileSpreadsheet,
  Lightbulb,
  Share2,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { BlocoConteudo, Post } from '../data/posts';
import { CodeBlock } from './CodeBlock';
import { RichText } from './RichText';

interface ArticleViewProps {
  post: Post;
  allPosts: Post[];
  onBack: () => void;
  onOpenPost: (slug: string) => void;
}

export function ArticleView({
  post,
  allPosts,
  onBack,
  onOpenPost,
}: ArticleViewProps) {
  const [progress, setProgress] = useState(0);
  const [linkCopied, setLinkCopied] = useState(false);
  const shareTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post.slug]);

  useEffect(() => {
    return () => {
      if (shareTimeoutRef.current !== null) {
        window.clearTimeout(shareTimeoutRef.current);
      }
    };
  }, []);

  const handleShareLink = async () => {
    const directUrl = `${window.location.origin}${window.location.pathname}#/artigo/${post.slug}`;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(directUrl);
      } else {
        const input = document.createElement('input');
        input.value = directUrl;
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.focus();
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setLinkCopied(true);
      if (shareTimeoutRef.current !== null) {
        window.clearTimeout(shareTimeoutRef.current);
      }
      shareTimeoutRef.current = window.setTimeout(() => {
        setLinkCopied(false);
      }, 2500);
    } catch {
      // Ignore if clipboard blocked
    }
  };

  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex >= 0 && currentIndex < allPosts.length - 1
      ? allPosts[currentIndex + 1]
      : null;

  const renderBlock = (bloco: BlocoConteudo, index: number) => {
    switch (bloco.tipo) {
      case 'subtitulo':
        return (
          <h2
            key={index}
            className="mt-10 mb-4 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#18181B] dark:text-[#F3F4F6]"
          >
            {bloco.texto}
          </h2>
        );

      case 'paragrafo':
        return (
          <p
            key={index}
            className="mb-5 text-[15px] sm:text-base leading-7 text-[#52525B] dark:text-[#9CA3AF]"
          >
            <RichText text={bloco.texto} />
          </p>
        );

      case 'lista':
        if (bloco.ordenada) {
          return (
            <ol
              key={index}
              className="my-5 space-y-3 pl-5 list-decimal text-[15px] sm:text-base leading-7 text-[#52525B] marker:font-semibold marker:text-[#7C3AED] dark:text-[#9CA3AF] dark:marker:text-[#8B5CF6]"
            >
              {bloco.itens.map((item, i) => (
                <li key={i} className="pl-1">
                  <RichText text={item} />
                </li>
              ))}
            </ol>
          );
        }
        return (
          <ul
            key={index}
            className="my-5 space-y-3 pl-5 list-disc text-[15px] sm:text-base leading-7 text-[#52525B] marker:text-[#7C3AED] dark:text-[#9CA3AF] dark:marker:text-[#8B5CF6]"
          >
            {bloco.itens.map((item, i) => (
              <li key={i} className="pl-1">
                <RichText text={item} />
              </li>
            ))}
          </ul>
        );

      case 'codigo':
        return (
          <CodeBlock
            key={index}
            linguagem={bloco.linguagem}
            titulo={bloco.titulo}
            conteudo={bloco.conteudo}
          />
        );

      case 'dica':
        return (
          <aside
            key={index}
            className="my-7 rounded-xl border border-[#E4E4E7] bg-[#FFFFFF] p-5 dark:border-[#2A243D] dark:bg-[#161321]"
          >
            <div className="flex items-start gap-3.5">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EDE9FE] text-[#6D28D9] dark:bg-[#8B5CF6]/16 dark:text-[#C4B5FD]">
                <Lightbulb className="h-4 w-4" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold text-[#18181B] dark:text-[#F3F4F6]">
                  {bloco.titulo}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                  <RichText text={bloco.texto} />
                </p>
              </div>
            </div>
          </aside>
        );

      case 'cta':
        return (
          <div
            key={index}
            className="my-8 rounded-xl border border-[#7C3AED]/30 bg-[#EDE9FE]/50 p-6 dark:border-[#8B5CF6]/30 dark:bg-[#8B5CF6]/10"
          >
            <h3 className="font-display text-lg font-bold text-[#18181B] dark:text-[#F3F4F6]">
              {bloco.titulo}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
              <RichText text={bloco.texto} />
            </p>
            <a
              href={bloco.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#7C3AED] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#6D28D9] dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED]"
            >
              <span>{bloco.textoBotao}</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        );
    }
  };

  return (
    <>
      {/* Subtle reading progress indicator */}
      <div
        aria-hidden="true"
        className="fixed top-16 left-0 z-30 h-0.5 w-full bg-transparent"
      >
        <div
          className="h-full bg-[#7C3AED] transition-transform duration-100 origin-left dark:bg-[#8B5CF6]"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>

      <article className="mx-auto max-w-3xl px-4 pt-8 pb-8 sm:px-6 sm:pt-12">
        {/* Top Action Row */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#E4E4E7] bg-[#FFFFFF] px-3.5 text-sm font-medium text-[#18181B] transition-colors hover:border-[#7C3AED]/60 hover:text-[#7C3AED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] dark:border-[#2A243D] dark:bg-[#161321] dark:text-[#F3F4F6] dark:hover:border-[#8B5CF6]/60 dark:hover:text-[#C4B5FD] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Voltar para artigos</span>
          </button>

          <button
            type="button"
            onClick={handleShareLink}
            aria-live="polite"
            className={`inline-flex h-10 items-center gap-2 rounded-lg px-3.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              linkCopied
                ? 'bg-[#10B981] text-white'
                : 'border border-[#E4E4E7] bg-[#FFFFFF] text-[#52525B] hover:border-[#7C3AED]/60 hover:text-[#18181B] dark:border-[#2A243D] dark:bg-[#161321] dark:text-[#9CA3AF] dark:hover:border-[#8B5CF6]/60 dark:hover:text-[#F3F4F6]'
            }`}
          >
            {linkCopied ? (
              <>
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Link copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Compartilhar</span>
              </>
            )}
          </button>
        </div>

        {/* Article Header */}
        <header className="border-b border-[#E4E4E7] pb-8 dark:border-[#2A243D]">
          <span className="inline-block rounded-md bg-[#EDE9FE] px-3 py-1 text-xs font-medium text-[#6D28D9] dark:bg-[#8B5CF6]/16 dark:text-[#C4B5FD]">
            {post.categoria}
          </span>

          <h1 className="mt-4 font-display text-2xl sm:text-4xl font-bold leading-tight tracking-tight text-[#18181B] dark:text-[#F3F4F6]">
            {post.titulo}
          </h1>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
            {post.resumo}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#52525B] tabular-nums dark:text-[#9CA3AF]">
            <span className="font-medium text-[#18181B] dark:text-[#F3F4F6]">
              Lais Raniele
            </span>
            <span aria-hidden="true">·</span>
            <span>{post.data}</span>
            <span aria-hidden="true">·</span>
            <span>{post.tempoLeitura}</span>
          </div>
        </header>

        {/* Optional Responsive YouTube Player */}
        {post.youtubeId && post.youtubeId.trim() !== '' && (
          <section aria-label="Vídeo do tutorial" className="mt-8">
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-[#E4E4E7] bg-[#18181B] dark:border-[#2A243D]">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${post.youtubeId.trim()}`}
                title={`Vídeo tutorial: ${post.titulo}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="h-full w-full border-0"
              />
            </div>
          </section>
        )}

        {/* Formatted Article Body */}
        <div className="mt-8">
          {post.blocosDeConteudo.map((bloco, index) =>
            renderBlock(bloco, index)
          )}
        </div>

        {/* Optional End-of-Article Highlight CTA Box (exibido apenas quando o artigo tiver linkTemplate) */}
        {post.linkTemplate && post.linkTemplate.trim() !== '' && (
          <section
            aria-labelledby="template-cta-heading"
            className="mt-12 rounded-2xl border border-[#7C3AED]/30 bg-[#FFFFFF] p-6 sm:p-8 dark:border-[#8B5CF6]/35 dark:bg-[#161321]"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-md bg-[#EDE9FE] px-2.5 py-1 text-xs font-medium text-[#6D28D9] dark:bg-[#8B5CF6]/16 dark:text-[#C4B5FD]">
                  <FileSpreadsheet className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Template Pronto para Copiar</span>
                </div>

                {post.tituloTemplate && (
                  <h2
                    id="template-cta-heading"
                    className="mt-3 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#18181B] dark:text-[#F3F4F6]"
                  >
                    {post.tituloTemplate}
                  </h2>
                )}

                {post.descricaoTemplate && (
                  <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                    {post.descricaoTemplate}
                  </p>
                )}

                {post.itensTemplate && post.itensTemplate.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm text-[#52525B] dark:text-[#9CA3AF]">
                    {post.itensTemplate.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#7C3AED] dark:text-[#8B5CF6]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[#E4E4E7] pt-6 dark:border-[#2A243D]">
              <a
                href={post.linkTemplate}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#7C3AED] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#6D28D9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED] whitespace-nowrap"
              >
                <span>Acessar Template Pronto</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
              <span className="text-xs text-[#52525B] dark:text-[#9CA3AF]">
                Compatível com contas Google gratuitas e Workspace.
              </span>
            </div>
          </section>
        )}

        {/* End-of-article Share Row */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E4E4E7] bg-[#FFFFFF] px-5 py-4 dark:border-[#2A243D] dark:bg-[#161321]">
          <p className="text-sm text-[#52525B] dark:text-[#9CA3AF]">
            Achou este tutorial útil? Compartilhe o link direto com quem precisa.
          </p>
          <button
            type="button"
            onClick={handleShareLink}
            className={`inline-flex h-10 items-center gap-2 rounded-lg px-4 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] dark:focus-visible:outline-[#8B5CF6] ${
              linkCopied
                ? 'bg-[#10B981] text-white'
                : 'bg-[#7C3AED] text-white hover:bg-[#6D28D9] dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED]'
            }`}
          >
            {linkCopied ? (
              <>
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Link copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Compartilhar tutorial</span>
              </>
            )}
          </button>
        </div>

        {/* Previous / Next Article Navigation */}
        {(prevPost || nextPost) && (
          <nav
            aria-label="Navegação entre artigos"
            className="mt-12 grid grid-cols-1 gap-4 border-t border-[#E4E4E7] pt-8 sm:grid-cols-2 dark:border-[#2A243D]"
          >
            {prevPost ? (
              <button
                type="button"
                onClick={() => onOpenPost(prevPost.slug)}
                className="group flex flex-col items-start rounded-xl border border-[#E4E4E7] bg-[#FFFFFF] p-4 text-left transition-colors hover:border-[#7C3AED]/60 dark:border-[#2A243D] dark:bg-[#161321] dark:hover:border-[#8B5CF6]/60 cursor-pointer"
              >
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#52525B] dark:text-[#9CA3AF]">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  Tutorial anterior
                </span>
                <span className="mt-1.5 font-display text-sm font-semibold text-[#18181B] group-hover:text-[#7C3AED] dark:text-[#F3F4F6] dark:group-hover:text-[#C4B5FD]">
                  {prevPost.titulo}
                </span>
              </button>
            ) : (
              <div className="hidden sm:block" />
            )}

            {nextPost && (
              <button
                type="button"
                onClick={() => onOpenPost(nextPost.slug)}
                className="group flex flex-col items-end rounded-xl border border-[#E4E4E7] bg-[#FFFFFF] p-4 text-right transition-colors hover:border-[#7C3AED]/60 dark:border-[#2A243D] dark:bg-[#161321] dark:hover:border-[#8B5CF6]/60 cursor-pointer"
              >
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#52525B] dark:text-[#9CA3AF]">
                  Próximo tutorial
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="mt-1.5 font-display text-sm font-semibold text-[#18181B] group-hover:text-[#7C3AED] dark:text-[#F3F4F6] dark:group-hover:text-[#C4B5FD]">
                  {nextPost.titulo}
                </span>
              </button>
            )}
          </nav>
        )}
      </article>

      {/* Brief floating toast notification when tutorial link is copied */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-200 ${
          linkCopied
            ? 'translate-y-0 opacity-100'
            : 'translate-y-3 opacity-0'
        }`}
      >
        <div className="inline-flex items-center gap-2 rounded-xl border border-[#10B981]/30 bg-[#18181B] px-4 py-2.5 text-sm font-medium text-white shadow-lg dark:border-[#10B981]/40 dark:bg-[#1E1A2E]">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#10B981] text-white">
            <Check className="h-3 w-3" aria-hidden="true" />
          </span>
          <span>Link copiado!</span>
        </div>
      </div>
    </>
  );
}
