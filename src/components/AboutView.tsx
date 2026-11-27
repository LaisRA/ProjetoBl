import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Cpu,
  GraduationCap,
  HardDrive,
  Heart,
  Mail,
  MessageCircle,
  Sparkles,
  Table2,
  Video,
  Youtube,
} from 'lucide-react';
import { useState, type CSSProperties } from 'react';
import { LINKS_SOCIAIS } from '../data/posts';

interface AboutViewProps {
  onBack: () => void;
}

/**
 * ============================================================================
 * LINKS CONFIGURÁVEIS DA PÁGINA "SOBRE MIM"
 * ============================================================================
 * Os links principais já vêm preenchidos com seus endereços oficiais definidos
 * em `src/data/posts.ts` (LINKS_SOCIAIS). Se quiser trocar o link de afiliada
 * do Google Workspace, redes sociais ou adicionar a URL da plataforma
 * "Trilhas da Informática", basta ajustar abaixo:
 */
const ABOUT_LINKS = {
  // Link oficial de afiliada do Google Workspace:
  googleWorkspaceAfiliada: LINKS_SOCIAIS.workspaceAfiliado,
  // WhatsApp para pedidos de cupom promocional ou contato:
  whatsappCupom: LINKS_SOCIAIS.whatsappCupom,
  // Redes sociais oficiais:
  youtube: LINKS_SOCIAIS.youtube,
  instagram: LINKS_SOCIAIS.instagram,
  // Projetos reais:
  planilhaLab: 'https://planilhalab02.vercel.app/',
  // Cole aqui o link da plataforma Trilhas da Informática quando quiser apontar para um domínio externo:
  trilhasInformatica: '',
};

interface WorkspaceTool {
  id: 'gmail' | 'drive' | 'meet' | 'agenda';
  name: string;
  tagline: string;
  description: string;
  accentHex: string;
  activeClass: string;
}

const WORKSPACE_TOOLS: WorkspaceTool[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    tagline: 'E-mail profissional com o seu domínio',
    description:
      'Filtros automáticos, marcadores inteligentes e apoio do Gemini para responder clientes com agilidade usando @suaempresa.com.br.',
    accentHex: '#EA4335',
    activeClass:
      'border-[#EA4335]/60 bg-[#EA4335]/8 text-[#18181B] dark:border-[#EA4335]/60 dark:bg-[#EA4335]/15 dark:text-[#F3F4F6]',
  },
  {
    id: 'drive',
    name: 'Google Drive',
    tagline: 'Planilhas inteligentes e colaboração em tempo real',
    description:
      'Centralize arquivos, Planilhas, Docs e Apresentações na nuvem sem versões duplicadas, com acesso rápido de qualquer lugar.',
    accentHex: '#34A853',
    activeClass:
      'border-[#34A853]/60 bg-[#34A853]/8 text-[#18181B] dark:border-[#34A853]/60 dark:bg-[#34A853]/15 dark:text-[#F3F4F6]',
  },
  {
    id: 'meet',
    name: 'Google Meet',
    tagline: 'Reuniões rápidas e organizadas',
    description:
      'Chamadas estáveis em 1 clique direto no navegador, gravação no Drive e anotações assistidas por IA para não perder nada.',
    accentHex: '#FBBC05',
    activeClass:
      'border-[#FBBC05]/70 bg-[#FBBC05]/10 text-[#18181B] dark:border-[#FBBC05]/60 dark:bg-[#FBBC05]/15 dark:text-[#F3F4F6]',
  },
  {
    id: 'agenda',
    name: 'Google Agenda',
    tagline: 'Rotina sob controle com agenda integrada',
    description:
      'Blocos de foco, lembretes automáticos e links de agendamento sincronizados com o Meet e o Gmail.',
    accentHex: '#4285F4',
    activeClass:
      'border-[#4285F4]/60 bg-[#4285F4]/8 text-[#18181B] dark:border-[#4285F4]/60 dark:bg-[#4285F4]/15 dark:text-[#F3F4F6]',
  },
];

const WORKSPACE_BENEFITS = [
  'E-mail profissional e agenda integrada;',
  'Planilhas inteligentes e colaboração em tempo real no Drive;',
  'Produtividade turbinada com Inteligência Artificial integrada ao dia a dia.',
];

function WorkspaceToolIcon({ id }: { id: WorkspaceTool['id'] }) {
  if (id === 'gmail') {
    return <Mail className="h-4 w-4 text-[#EA4335]" aria-hidden="true" />;
  }
  if (id === 'drive') {
    return <HardDrive className="h-4 w-4 text-[#34A853]" aria-hidden="true" />;
  }
  if (id === 'meet') {
    return <Video className="h-4 w-4 text-[#FBBC05]" aria-hidden="true" />;
  }
  return <Calendar className="h-4 w-4 text-[#4285F4]" aria-hidden="true" />;
}

export function AboutView({ onBack }: AboutViewProps) {
  const [selectedToolId, setSelectedToolId] =
    useState<WorkspaceTool['id']>('gmail');
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [portraitImgFailed, setPortraitImgFailed] = useState(false);

  const selectedTool =
    WORKSPACE_TOOLS.find((t) => t.id === selectedToolId) ?? WORKSPACE_TOOLS[0];

  const scrollToProjects = () => {
    const el = document.getElementById('meus-projetos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pt-8 pb-10 sm:px-6 sm:pt-12">
      {/* Back to blog */}
      <div className="mb-8">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-10 items-center gap-2 text-sm font-medium text-[#52525B] transition-colors duration-150 hover:text-[#7C3AED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] dark:text-[#9CA3AF] dark:hover:text-[#C4B5FD] cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Voltar para os tutoriais</span>
        </button>
      </div>

      {/* 1. HERO / CABEÇALHO (with Image 1 — Studio Setup) */}
      <section aria-labelledby="sobre-hero-title">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="hero-enter hero-delay-1 text-xs sm:text-sm font-medium text-[#7C3AED] dark:text-[#C4B5FD]">
              Afiliada Google Workspace · Google Fan Girl
            </p>

            <h1
              id="sobre-hero-title"
              className="hero-enter hero-delay-2 mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.12] tracking-tight text-[#18181B] dark:text-[#F3F4F6]"
            >
              Olá! Eu sou a{' '}
              <span className="notranslate text-gradient-animated">
                Lais Raniele
              </span>
            </h1>

            <p className="hero-enter hero-delay-3 mt-5 text-base sm:text-lg leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
              Transformo planilhas, automação comercial e Inteligência Artificial
              em ferramentas simples para organizar finanças, economizar tempo e
              gerar resultados reais — sem precisar gastar fortunas com softwares
              pagos.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="hero-enter hero-delay-4 mt-7 flex flex-wrap items-center gap-3">
              <a
                href={ABOUT_LINKS.googleWorkspaceAfiliada}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="btn-cta-gradient btn-tactile inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] whitespace-nowrap"
              >
                <span>Conhecer o Google Workspace</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={scrollToProjects}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#E4E4E7] bg-[#FFFFFF] px-5 text-sm font-medium text-[#18181B] transition-colors duration-150 hover:border-[#7C3AED]/60 hover:text-[#7C3AED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] dark:border-[#2A243D] dark:bg-[#161321] dark:text-[#F3F4F6] dark:hover:border-[#8B5CF6]/60 dark:hover:text-[#C4B5FD] whitespace-nowrap cursor-pointer"
              >
                <span>Ver meus projetos</span>
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Image 1: Setup Banner */}
          <div className="hero-enter hero-delay-3 lg:col-span-6">
            <div className="card-interactive group overflow-hidden rounded-2xl border border-[#E4E4E7] bg-[#FFFFFF] shadow-sm dark:border-[#2A243D] dark:bg-[#161321]">
              {/* Subtle Google 4-color top hairline */}
              <div aria-hidden="true" className="grid h-[3px] w-full grid-cols-4">
                <span className="bg-[#4285F4]" />
                <span className="bg-[#EA4335]" />
                <span className="bg-[#FBBC05]" />
                <span className="bg-[#34A853]" />
              </div>

              <div className="aspect-video w-full overflow-hidden bg-[#120F1E]">
                {!heroImgFailed ? (
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/Gemini_Generated_Image_fa0gefa0gefa0gef__1__db809f31.jpg`}
                    alt="Ilustração de Lais Raniele em seu setup com Google Workspace, Gemini, Gmail, Drive, Meet e Agenda"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgFailed(true)}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-[#F3F4F6]">
                    <Sparkles
                      className="h-7 w-7 text-[#C4B5FD]"
                      aria-hidden="true"
                    />
                    <p className="mt-2 font-display text-base font-semibold">
                      Setup Lais Raniele · Google Workspace &amp; Gemini
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-xs text-[#52525B] dark:text-[#9CA3AF]">
                <span>Bastidores &amp; Setup</span>
                <span className="font-mono text-[11px] text-[#7C3AED] dark:text-[#C4B5FD]">
                  Workspace · Gemini · Planilhas · IA
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MINHA HISTÓRIA (with Image 2 — Standing Character) */}
      <section
        data-reveal=""
        aria-labelledby="minha-historia-title"
        className="mt-16 border-t border-[#E4E4E7] pt-14 dark:border-[#2A243D]"
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Image 2: Standing Character Card */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-[#E4E4E7] bg-[#FFFFFF] dark:border-[#2A243D]">
              <div className="relative flex aspect-[3/4] w-full items-end justify-center overflow-hidden bg-[#FFFFFF] px-4 pt-6">
                {!portraitImgFailed ? (
                  <img
                    src={`${import.meta.env.BASE_URL}assets/aistudio/Gemini_Generated_Image_7jc9ym7jc9ym7jc9_c0961775.jpg`}
                    alt="Personagem ilustrada da Lais Raniele em pé com blazer bege, óculos e jeans"
                    referrerPolicy="no-referrer"
                    onError={() => setPortraitImgFailed(true)}
                    className="h-full w-full object-contain object-bottom transition-transform duration-300 hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center text-center text-[#52525B]">
                    <Heart
                      className="h-7 w-7 text-[#7C3AED]"
                      aria-hidden="true"
                    />
                    <p className="mt-2 font-display text-base font-semibold text-[#18181B]">
                      Lais Raniele
                    </p>
                  </div>
                )}
              </div>
              <div className="border-t border-[#E4E4E7] bg-[#FAFAFC] px-4 py-3 text-center text-xs text-[#52525B] dark:border-[#2A243D] dark:bg-[#161321] dark:text-[#9CA3AF]">
                <span className="font-semibold text-[#18181B] dark:text-[#F3F4F6]">
                  Lais Raniele
                </span>{' '}
                · Criadora, mãe de duas e entusiasta de IA
              </div>
            </div>
          </div>

          {/* Real Story Prose */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <p className="text-xs sm:text-sm font-medium text-[#7C3AED] dark:text-[#C4B5FD]">
              Minha História
            </p>
            <h2
              id="minha-historia-title"
              className="mt-2 font-display text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-[#18181B] dark:text-[#F3F4F6]"
            >
              Tecnologia na prática, do zero ao resultado
            </h2>

            <div className="mt-5 space-y-4 text-sm sm:text-base leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
              <p>
                Sou criadora de conteúdo, entusiasta de tecnologia e apaixonada
                por resolver problemas reais com ferramentas digitais. No meu
                canal do YouTube e aqui no{' '}
                <strong className="font-semibold text-[#18181B] dark:text-[#F3F4F6]">
                  laisraniele.com.br
                </strong>
                , compartilho tutoriais práticos de{' '}
                <strong className="font-semibold text-[#18181B] dark:text-[#F3F4F6]">
                  gestão financeira, automação comercial, Excel, Google Planilhas
                  e Inteligência Artificial
                </strong>
                .
              </p>

              <p>
                Minha filosofia é simples: você não precisa de um computador
                superpotente nem de assinaturas caras para criar projetos
                incríveis. Eu mesma construo sistemas, automações em Python e
                aplicativos web usando ferramentas gratuitas e o poder da nuvem
                — do{' '}
                <strong className="font-semibold text-[#18181B] dark:text-[#F3F4F6]">
                  Google AI Studio
                </strong>{' '}
                e{' '}
                <strong className="font-semibold text-[#18181B] dark:text-[#F3F4F6]">
                  Google Colab
                </strong>{' '}
                ao{' '}
                <strong className="font-semibold text-[#18181B] dark:text-[#F3F4F6]">
                  GitHub Pages
                </strong>{' '}
                e{' '}
                <strong className="font-semibold text-[#18181B] dark:text-[#F3F4F6]">
                  Vercel
                </strong>
                .
              </p>

              <p>
                Por trás das telas, também sou mãe de duas meninas — minha maior
                motivação para buscar produtividade de verdade, aquela que libera
                tempo para viver o que importa.
              </p>
            </div>

            {/* Clean unboxed stack strip */}
            <div className="mt-6 border-t border-[#E4E4E7] pt-5 dark:border-[#2A243D]">
              <p className="text-xs font-medium text-[#52525B] dark:text-[#9CA3AF]">
                Ferramentas na nuvem que uso no dia a dia:
              </p>
              <p className="mt-1.5 font-mono text-xs leading-relaxed text-[#6D28D9] dark:text-[#C4B5FD]">
                Google Workspace · Gemini · Google AI Studio · Google Colab ·
                Apps Script · Python · GitHub Pages · Vercel
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GOOGLE FAN GIRL & AFILIADA GOOGLE WORKSPACE (Card de Destaque) */}
      <section
        data-reveal=""
        aria-labelledby="google-fangirl-title"
        className="mt-16 overflow-hidden rounded-2xl border border-[#E4E4E7] bg-[#FFFFFF] dark:border-[#2A243D] dark:bg-[#161321]"
      >
        {/* Subtle Google 4-color top hairline */}
        <div aria-hidden="true" className="grid h-[3px] w-full grid-cols-4">
          <span className="bg-[#4285F4]" />
          <span className="bg-[#EA4335]" />
          <span className="bg-[#FBBC05]" />
          <span className="bg-[#34A853]" />
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <p className="text-xs sm:text-sm font-medium text-[#7C3AED] dark:text-[#C4B5FD]">
                Google Fan Girl · Afiliada Oficial Google Workspace
              </p>
              <h2
                id="google-fangirl-title"
                className="mt-2 font-display text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-[#18181B] dark:text-[#F3F4F6]"
              >
                Sim, eu sou fã de carteirinha do ecossistema Google
              </h2>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                Se tem inovação do Google, eu já estou testando. Do{' '}
                <strong className="font-semibold text-[#18181B] dark:text-[#F3F4F6]">
                  Gemini
                </strong>{' '}
                e{' '}
                <strong className="font-semibold text-[#18181B] dark:text-[#F3F4F6]">
                  Google AI Studio
                </strong>{' '}
                ao{' '}
                <strong className="font-semibold text-[#18181B] dark:text-[#F3F4F6]">
                  Google Planilhas
                </strong>{' '}
                e{' '}
                <strong className="font-semibold text-[#18181B] dark:text-[#F3F4F6]">
                  Google Trends
                </strong>
                , vivo explorando como conectar essas ferramentas para
                automatizar tarefas e multiplicar resultados.
              </p>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                Como{' '}
                <strong className="font-semibold text-[#18181B] dark:text-[#F3F4F6]">
                  afiliada oficial do Google Workspace
                </strong>
                , ajudo profissionais, freelancers e negócios a saírem do
                amadorismo e estruturarem sua rotina com:
              </p>

              <ul className="mt-4 space-y-2.5 text-sm sm:text-[15px] text-[#18181B] dark:text-[#F3F4F6]">
                {WORKSPACE_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#34A853]"
                      aria-hidden="true"
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={ABOUT_LINKS.googleWorkspaceAfiliada}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="btn-cta-gradient btn-tactile inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED] whitespace-nowrap"
                >
                  <span>Assinar Google Workspace com meu link de afiliada</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>

                <a
                  href={ABOUT_LINKS.whatsappCupom}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile inline-flex h-11 items-center gap-2 rounded-xl border border-[#E4E4E7] bg-[#FAFAFC] px-4 text-sm font-medium text-[#18181B] transition-colors hover:border-[#7C3AED]/60 hover:text-[#7C3AED] dark:border-[#2A243D] dark:bg-[#0D0B14] dark:text-[#F3F4F6] dark:hover:border-[#8B5CF6]/60 dark:hover:text-[#C4B5FD] whitespace-nowrap"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Pedir cupom no WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Interactive Google Workspace Tool Switcher */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-[#E4E4E7] bg-[#FAFAFC] p-5 dark:border-[#2A243D] dark:bg-[#0D0B14]">
                <p className="text-xs font-medium text-[#52525B] dark:text-[#9CA3AF]">
                  Explore o ecossistema na prática:
                </p>

                <div
                  role="tablist"
                  aria-label="Ferramentas do Google Workspace"
                  className="mt-3 grid grid-cols-2 gap-2"
                >
                  {WORKSPACE_TOOLS.map((tool) => {
                    const isSelected = tool.id === selectedTool.id;
                    return (
                      <button
                        key={tool.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setSelectedToolId(tool.id)}
                        className={`inline-flex h-10 items-center gap-2 rounded-lg border px-3 text-xs font-semibold transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                          isSelected
                            ? tool.activeClass
                            : 'border-[#E4E4E7] bg-[#FFFFFF] text-[#52525B] hover:text-[#18181B] dark:border-[#2A243D] dark:bg-[#161321] dark:text-[#9CA3AF] dark:hover:text-[#F3F4F6]'
                        }`}
                      >
                        <WorkspaceToolIcon id={tool.id} />
                        <span>{tool.name}</span>
                      </button>
                    );
                  })}
                </div>

                <div
                  role="tabpanel"
                  className="mt-4 border-t border-[#E4E4E7] pt-4 dark:border-[#2A243D]"
                >
                  <p className="font-display text-sm font-bold text-[#18181B] dark:text-[#F3F4F6]">
                    {selectedTool.tagline}
                  </p>
                  <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                    {selectedTool.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. O QUE EU CONSTRUO (Grade de Projetos Reais) */}
      <section
        id="meus-projetos"
        aria-labelledby="projetos-title"
        className="mt-16 scroll-mt-24 border-t border-[#E4E4E7] pt-14 dark:border-[#2A243D]"
      >
        <div data-reveal="" className="max-w-2xl">
          <p className="text-xs sm:text-sm font-medium text-[#7C3AED] dark:text-[#C4B5FD]">
            Projetos Reais
          </p>
          <h2
            id="projetos-title"
            className="mt-2 font-display text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-[#18181B] dark:text-[#F3F4F6]"
          >
            O Que Eu Construo
          </h2>
          <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
            Aplicativos, plataformas, tutoriais e automações feitos na nuvem com
            foco em utilidade real no dia a dia.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Projeto 1: Planilha Lab */}
          <a
            data-reveal=""
            href={ABOUT_LINKS.planilhaLab}
            target="_blank"
            rel="noopener noreferrer"
            className="card-interactive group flex flex-col justify-between rounded-2xl border border-[#E4E4E7] bg-[#FFFFFF] p-6 dark:border-[#2A243D] dark:bg-[#161321]"
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#34A853]/12 text-[#15803D] dark:bg-[#34A853]/18 dark:text-[#86EFAC]">
                  <Table2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs text-[#52525B] dark:text-[#9CA3AF]">
                  planilhalab02.vercel.app
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-[#18181B] transition-colors group-hover:text-[#7C3AED] dark:text-[#F3F4F6] dark:group-hover:text-[#C4B5FD]">
                Planilha Lab
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                Aplicativo web interativo com trilhas organizadas de aulas
                gratuitas de Excel, do básico ao avançado.
              </p>
            </div>
            <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#7C3AED] dark:text-[#C4B5FD]">
              <span>Acessar aplicativo</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </a>

          {/* Projeto 2: Trilhas da Informática */}
          {ABOUT_LINKS.trilhasInformatica ? (
            <a
              data-reveal=""
              style={{ '--reveal-delay': '0.1s' } as CSSProperties}
              href={ABOUT_LINKS.trilhasInformatica}
              target="_blank"
              rel="noopener noreferrer"
              className="card-interactive group flex flex-col justify-between rounded-2xl border border-[#E4E4E7] bg-[#FFFFFF] p-6 dark:border-[#2A243D] dark:bg-[#161321]"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#4285F4]/12 text-[#1D4ED8] dark:bg-[#4285F4]/18 dark:text-[#93C5FD]">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs text-[#52525B] dark:text-[#9CA3AF]">
                    Educação &amp; Prática
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-[#18181B] transition-colors group-hover:text-[#7C3AED] dark:text-[#F3F4F6] dark:group-hover:text-[#C4B5FD]">
                  Trilhas da Informática
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                  Plataforma educacional voltada para Informática, Excel e
                  Inteligência Artificial na prática.
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#7C3AED] dark:text-[#C4B5FD]">
                <span>Conhecer plataforma</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </a>
          ) : (
            <button
              data-reveal=""
              style={{ '--reveal-delay': '0.1s' } as CSSProperties}
              type="button"
              onClick={onBack}
              className="card-interactive group flex flex-col justify-between rounded-2xl border border-[#E4E4E7] bg-[#FFFFFF] p-6 text-left dark:border-[#2A243D] dark:bg-[#161321] cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#4285F4]/12 text-[#1D4ED8] dark:bg-[#4285F4]/18 dark:text-[#93C5FD]">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs text-[#52525B] dark:text-[#9CA3AF]">
                    Educação &amp; Prática
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-[#18181B] transition-colors group-hover:text-[#7C3AED] dark:text-[#F3F4F6] dark:group-hover:text-[#C4B5FD]">
                  Trilhas da Informática
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                  Plataforma educacional voltada para Informática, Excel e
                  Inteligência Artificial na prática.
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#7C3AED] dark:text-[#C4B5FD]">
                <span>Explorar conteúdos no blog</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </button>
          )}

          {/* Projeto 3: Blog & Canal Lais Raniele */}
          <a
            data-reveal=""
            href={ABOUT_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="card-interactive group flex flex-col justify-between rounded-2xl border border-[#E4E4E7] bg-[#FFFFFF] p-6 dark:border-[#2A243D] dark:bg-[#161321]"
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#EA4335]/12 text-[#B91C1C] dark:bg-[#EA4335]/18 dark:text-[#FCA5A5]">
                  <Youtube className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs text-[#52525B] dark:text-[#9CA3AF]">
                  @laisranieletech
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-[#18181B] transition-colors group-hover:text-[#7C3AED] dark:text-[#F3F4F6] dark:group-hover:text-[#C4B5FD]">
                Blog &amp; Canal Lais Raniele
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                Tutoriais passo a passo sobre gestão financeira, automação
                comercial, Google Trends e como usar o Gemini para trabalhar
                melhor e gerar renda.
              </p>
            </div>
            <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#7C3AED] dark:text-[#C4B5FD]">
              <span>Assistir no YouTube</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </a>

          {/* Projeto 4: Automações & Experimentos com IA */}
          <button
            data-reveal=""
            style={{ '--reveal-delay': '0.1s' } as CSSProperties}
            type="button"
            onClick={onBack}
            className="card-interactive group flex flex-col justify-between rounded-2xl border border-[#E4E4E7] bg-[#FFFFFF] p-6 text-left dark:border-[#2A243D] dark:bg-[#161321] cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#FBBC05]/15 text-[#A16207] dark:bg-[#FBBC05]/18 dark:text-[#FDE047]">
                  <Cpu className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-xs text-[#52525B] dark:text-[#9CA3AF]">
                  Python · Apps Script · Web
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-[#18181B] transition-colors group-hover:text-[#7C3AED] dark:text-[#F3F4F6] dark:group-hover:text-[#C4B5FD]">
                Automações &amp; Experimentos com IA
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
                Fluxos criativos, scripts em Python e sistemas web leves criados
                para facilitar a rotina de quem empreende ou cria conteúdo.
              </p>
            </div>
            <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#7C3AED] dark:text-[#C4B5FD]">
              <span>Ver tutoriais e scripts prontos</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </button>
        </div>
      </section>

      {/* 5. SEÇÃO FINAL / CHAMADA PARA AÇÃO */}
      <section
        data-reveal=""
        aria-labelledby="cta-final-title"
        className="mt-16 rounded-2xl border border-[#E4E4E7] bg-[#EDE9FE]/55 p-6 sm:p-8 lg:p-10 dark:border-[#2A243D] dark:bg-[#161321]"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs sm:text-sm font-medium text-[#7C3AED] dark:text-[#C4B5FD]">
              Vamos conversar
            </p>
            <h2
              id="cta-final-title"
              className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B] dark:text-[#F3F4F6]"
            >
              Vamos construir algo inteligente juntos?
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#52525B] dark:text-[#9CA3AF]">
              Seja para profissionalizar sua empresa com o Google Workspace,
              aprender planilhas sem complicação ou descobrir como usar a IA a
              seu favor, você está no lugar certo.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={ABOUT_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile inline-flex h-11 items-center gap-2 rounded-xl border border-[#E4E4E7] bg-[#FFFFFF] px-4 text-sm font-semibold text-[#18181B] transition-colors hover:border-[#EA4335]/60 hover:text-[#B91C1C] dark:border-[#2A243D] dark:bg-[#0D0B14] dark:text-[#F3F4F6] dark:hover:border-[#EA4335]/60 dark:hover:text-[#FCA5A5] whitespace-nowrap"
            >
              <Youtube className="h-4 w-4 text-[#EA4335]" aria-hidden="true" />
              <span>YouTube</span>
            </a>

            <button
              type="button"
              onClick={onBack}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#E4E4E7] bg-[#FFFFFF] px-4 text-sm font-semibold text-[#18181B] transition-colors hover:border-[#7C3AED]/60 hover:text-[#7C3AED] dark:border-[#2A243D] dark:bg-[#0D0B14] dark:text-[#F3F4F6] dark:hover:border-[#8B5CF6]/60 dark:hover:text-[#C4B5FD] whitespace-nowrap cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-[#7C3AED] dark:text-[#C4B5FD]" aria-hidden="true" />
              <span>Blog</span>
            </button>

            <a
              href={ABOUT_LINKS.googleWorkspaceAfiliada}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn-cta-gradient btn-tactile inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-white whitespace-nowrap"
            >
              <span>Google Workspace</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
