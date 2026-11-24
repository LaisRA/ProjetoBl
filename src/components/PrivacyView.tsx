import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { LINKS_SOCIAIS } from '../data/posts';

interface PrivacyViewProps {
  onBack: () => void;
  onResetCookies: () => void;
}

export function PrivacyView({ onBack, onResetCookies }: PrivacyViewProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-8 pb-8 sm:px-6 sm:pt-12">
      <div className="mb-8">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#E4E4E7] bg-[#FFFFFF] px-3.5 text-sm font-medium text-[#18181B] transition-colors hover:border-[#7C3AED]/60 hover:text-[#7C3AED] dark:border-[#2A243D] dark:bg-[#161321] dark:text-[#F3F4F6] dark:hover:border-[#8B5CF6]/60 dark:hover:text-[#C4B5FD] cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Voltar para o blog</span>
        </button>
      </div>

      <header className="border-b border-[#E4E4E7] pb-8 dark:border-[#2A243D]">
        <div className="inline-flex items-center gap-2 rounded-md bg-[#EDE9FE] px-3 py-1 text-xs font-medium text-[#6D28D9] dark:bg-[#8B5CF6]/16 dark:text-[#C4B5FD]">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          <span>LGPD &amp; Transparência</span>
        </div>

        <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#18181B] dark:text-[#F3F4F6]">
          Política de Privacidade e Cookies
        </h1>

        <p className="mt-3 text-sm text-[#52525B] dark:text-[#9CA3AF]">
          Última atualização: 23 de novembro de 2026 · laisraniele.com.br
        </p>
      </header>

      <div className="mt-8 space-y-8 text-[15px] sm:text-base leading-7 text-[#52525B] dark:text-[#9CA3AF]">
        <section>
          <h2 className="mb-3 font-display text-xl font-bold text-[#18181B] dark:text-[#F3F4F6]">
            1. Sobre este site
          </h2>
          <p>
            O blog <strong className="font-semibold text-[#18181B] dark:text-[#F3F4F6]">Lais Raniele</strong>{' '}
            (<code className="rounded bg-[#EDE9FE]/80 px-1.5 py-0.5 font-mono text-xs text-[#6D28D9] dark:bg-[#8B5CF6]/16 dark:text-[#C4B5FD]">laisraniele.com.br</code>) é um
            espaço independente dedicado a tutoriais práticos de Inteligência
            Artificial, Gestão Financeira e Automação Comercial usando o
            Ecossistema Google. Levamos sua privacidade a sério e seguimos as
            diretrizes da Lei Geral de Proteção de Dados (LGPD — Lei nº
            13.709/2018).
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl font-bold text-[#18181B] dark:text-[#F3F4F6]">
            2. Quais dados coletamos
          </h2>
          <p>
            Este site é <strong className="font-semibold text-[#18181B] dark:text-[#F3F4F6]">100% estático</strong> e não
            exige cadastro, login, senha ou envio de dados bancários para ler os
            artigos. As únicas informações armazenadas ou processadas durante a
            navegação são:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-[#7C3AED] dark:marker:text-[#8B5CF6]">
            <li>
              <strong className="font-semibold text-[#18181B] dark:text-[#F3F4F6]">Preferências locais do navegador:</strong>{' '}
              guardamos localmente (<code className="font-mono text-xs">localStorage</code>) sua escolha de
              tema (Modo Claro ou Escuro) e sua decisão sobre o aviso de cookies.
            </li>
            <li>
              <strong className="font-semibold text-[#18181B] dark:text-[#F3F4F6]">Métricas agregadas de acesso (Google Analytics 4):</strong>{' '}
              quando autorizado, coletamos dados estatísticos anônimos (como
              páginas mais lidas, tipo de dispositivo e origem do acesso) para
              entender quais tutoriais ajudam mais nossos leitores.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl font-bold text-[#18181B] dark:text-[#F3F4F6]">
            3. Cookies, YouTube e Publicidade (Google AdSense)
          </h2>
          <p>
            Podemos utilizar serviços de terceiros confiáveis do Google para
            medição, incorporação de vídeos e exibição de anúncios:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-[#7C3AED] dark:marker:text-[#8B5CF6]">
            <li>
              <strong className="font-semibold text-[#18181B] dark:text-[#F3F4F6]">Google Analytics 4 (GA4):</strong>{' '}
              utiliza cookies de medição para gerar relatórios agregados de
              audiência sem identificar você pessoalmente.
            </li>
            <li>
              <strong className="font-semibold text-[#18181B] dark:text-[#F3F4F6]">Google AdSense (anúncios):</strong>{' '}
              fornecedores terceirizados, incluindo o Google, podem usar cookies
              para exibir anúncios relevantes com base em visitas anteriores a
              este ou a outros sites. Você pode desativar a personalização de
              anúncios a qualquer momento nas{' '}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#7C3AED] hover:underline dark:text-[#C4B5FD]"
              >
                Configurações de anúncios do Google
              </a>
              .
            </li>
            <li>
              <strong className="font-semibold text-[#18181B] dark:text-[#F3F4F6]">Vídeos incorporados do YouTube:</strong>{' '}
              utilizamos o domínio <code className="font-mono text-xs">youtube-nocookie.com</code>{' '}
              (modo de privacidade aprimorada) para reduzir o rastreamento antes
              de você dar play.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl font-bold text-[#18181B] dark:text-[#F3F4F6]">
            4. Transparência sobre links de afiliados
          </h2>
          <p>
            Lais Raniele participa do{' '}
            <strong className="font-semibold text-[#18181B] dark:text-[#F3F4F6]">
              Programa de Afiliados do Google Workspace
            </strong>
            . Alguns links publicados no site e nos tutoriais são links de
            indicação (marcados como patrocinados). Caso você contrate o Google
            Workspace através desses links, podemos receber uma comissão sem
            nenhum custo adicional para você — inclusive disponibilizando
            códigos promocionais de desconto quando solicitados via WhatsApp.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl font-bold text-[#18181B] dark:text-[#F3F4F6]">
            5. Seus direitos na LGPD e controle de cookies
          </h2>
          <p>
            Você pode gerenciar ou desativar cookies diretamente nas
            configurações do seu navegador ou alterar sua escolha neste site a
            qualquer momento clicando no botão abaixo:
          </p>

          <div className="mt-4">
            <button
              type="button"
              onClick={onResetCookies}
              className="inline-flex h-10 items-center rounded-lg border border-[#E4E4E7] bg-[#FFFFFF] px-4 text-sm font-medium text-[#18181B] transition-colors hover:border-[#7C3AED] hover:text-[#7C3AED] dark:border-[#2A243D] dark:bg-[#161321] dark:text-[#F3F4F6] dark:hover:border-[#8B5CF6] dark:hover:text-[#C4B5FD] cursor-pointer"
            >
              Alterar minha preferência de cookies
            </button>
          </div>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl font-bold text-[#18181B] dark:text-[#F3F4F6]">
            6. Contato
          </h2>
          <p>
            Em caso de dúvidas sobre esta Política de Privacidade ou solicitações
            relacionadas aos seus dados, entre em contato diretamente pelos
            canais oficiais:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-[#7C3AED] dark:marker:text-[#8B5CF6]">
            <li>
              WhatsApp:{' '}
              <a
                href={LINKS_SOCIAIS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#7C3AED] hover:underline dark:text-[#C4B5FD]"
              >
                {LINKS_SOCIAIS.whatsappNumero}
              </a>
            </li>
            <li>
              Instagram:{' '}
              <a
                href={LINKS_SOCIAIS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#7C3AED] hover:underline dark:text-[#C4B5FD]"
              >
                @laisdeanjos
              </a>
            </li>
            <li>
              YouTube:{' '}
              <a
                href={LINKS_SOCIAIS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#7C3AED] hover:underline dark:text-[#C4B5FD]"
              >
                @laisranieletech
              </a>
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
