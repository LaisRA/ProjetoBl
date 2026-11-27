/**
 * ============================================================================
 * GUIA RÁPIDO: COMO ADICIONAR UM NOVO PROMPT AO HUB
 * ============================================================================
 *
 * PASSO 1: Copie um bloco completo dentro de `promptsData` abaixo (do `{` até `},`)
 *          e cole no TOPO da lista para ele aparecer em destaque primeiro.
 *
 * PASSO 2: Preencha os campos:
 *          - `id`: identificador único em texto (ex: "prompt-9")
 *          - `titulo`: nome curto e claro do prompt
 *          - `descricao`: resumo de 1 linha explicando o que ele resolve
 *          - `categoria`: escolha uma das opções de `PromptCategoria`
 *          - `ferramenta`: nome da ferramenta principal (ex: "Gemini", "Google Planilhas", "Gmail", "Apps Script", "Google Docs")
 *          - `corGoogle`: toque sutil de cor ("blue" | "green" | "red" | "yellow")
 *          - `prompt`: texto completo do prompt. Tudo que estiver entre [COLCHETES]
 *            será destacado automaticamente e virará campo preenchível no botão "Personalizar"!
 *
 * PASSO 3: Salve o arquivo e envie para o GitHub para publicar no laisraniele.com.br.
 * ============================================================================
 */

export type PromptCategoria =
  | 'Google Planilhas & Excel'
  | 'Gestão Financeira'
  | 'Google Workspace'
  | 'Automação & Apps Script'
  | 'Gemini & Produtividade';

export type GoogleAccent = 'blue' | 'green' | 'red' | 'yellow';

export interface PromptItem {
  id: string;
  titulo: string;
  descricao: string;
  categoria: PromptCategoria;
  ferramenta: string;
  corGoogle: GoogleAccent;
  prompt: string;
  /** Opcional: liste apenas os campos entre [COLCHETES] que o usuário deve preencher no modal Personalizar */
  variaveis?: string[];
}

export const PROMPT_CATEGORIAS: PromptCategoria[] = [
  'Google Planilhas & Excel',
  'Gestão Financeira',
  'Google Workspace',
  'Automação & Apps Script',
  'Gemini & Produtividade',
];

export const promptsData: PromptItem[] = [
  {
    id: 'arquiteto-dashboard-saas-react',
    titulo: 'Arquiteto de Dashboards SaaS (React, Tailwind & UX de Dados)',
    descricao:
      'Cria dashboards modernos com React, Tailwind e TypeScript aplicando leis de UX, acessibilidade WCAG e foco em performance.',
    categoria: 'Gemini & Produtividade',
    ferramenta: 'Google AI Studio',
    corGoogle: 'blue',
    prompt: `papel: >
  Você é um engenheiro front-end sênior especializado em design de dashboards SaaS,
  visualização de dados e arquitetura da informação. Você tem profundo domínio em
  React, Tailwind CSS e na criação de interfaces ricas em dados que continuam fáceis
  de escanear mesmo sob alta carga cognitiva.

contexto:
  produto: [EX: APLICAÇÃO SAAS MULTI-TENANT / SISTEMA FINANCEIRO / MINI-CRM]
  stack: [EX: REACT 19, NEXT.JS APP ROUTER, TAILWIND CSS, TYPESCRIPT STRICT MODE]
  escopo_metricas:
    - [EX: MÉTRICAS DE USUÁRIOS (USUÁRIOS ATIVOS, CADASTROS, CHURN)]
    - [EX: RECEITA (MRR, ARR, ARPU)]
    - [EX: ESTATÍSTICAS DE USO (ADOÇÃO DE RECURSOS, DURAÇÃO DA SESSÃO, CHAMADAS DE API)]

instrucoes:
  - >
    Aplique o princípio da proximidade de Gestalt para criar grupos de métricas
    visualmente distintos: agrupe cada categoria em zonas espaciais separadas,
    com espaçamento interno consistente e espaçamento maior entre grupos.
  - >
    Siga a Lei de Miller: limite cada grupo a no máximo 5 a 7 itens. Se uma categoria
    passar de 7 métricas, aplique divulgação progressiva mostrando as 5 principais
    com um botão expansível "Ver tudo".
  - >
    Aplique a Lei de Hick na hierarquia de informação: apresente 3 cards de KPIs
    principais no topo (um por categoria) e os detalhamentos abaixo. Reduza a carga
    de decisão definindo o período padrão mais comum ([EX: ÚLTIMOS 30 DIAS]) em vez
    de exigir seleção inicial.
  - >
    Use codificações visuais baseadas em posição para dados comparativos (gráficos
    de barras, gráficos de pontos) seguindo a hierarquia de precisão perceptual de
    Cleveland & McGill. Reserve gráficos de área apenas para tendências ao longo do tempo.
  - >
    Implemente uma hierarquia visual clara: KPIs principais com tipografia Display/Headline,
    métricas de apoio em escala Body e indicadores de variação (% positivo/negativo)
    em escala Label com código de cores.
  - >
    Construa cada seção do dashboard como um React Server Component para busca de dados
    sem pesar no bundle do cliente. Envolva cada seção em Suspense com placeholders
    (skeletons) que correspondam exatamente às dimensões finais do layout.

restricoes:
  obrigatorio:
    - Atender ao contraste WCAG 2.2 AA (4.5:1 para texto normal, 3:1 para texto grande)
    - Respeitar prefers-reduced-motion em todas as animações de gráficos
    - Usar HTML semântico com landmarks ARIA (role="main", navigation, complementary para filtros laterais)
  nunca:
    - Usar gráficos de pizza para comparar valores de métricas entre categorias
    - Ultrapassar 7 métricas por grupo visível sem divulgação progressiva
  sempre:
    - Fornecer estados de carregamento (skeleton) com dimensões fiéis ao layout final para evitar CLS
    - Incluir tooltips de gráficos navegáveis por teclado com regiões aria-live

formato_saida:
  - Diagrama da árvore de componentes (quais componentes e relação pai-filho)
  - Interfaces TypeScript para a estrutura de dados (DashboardProps, MetricGroup, KPICard)
  - Componente principal da página do dashboard (RSC, busca assíncrona de dados)
  - Um componente de grupo de métricas reutilizável entre todas as categorias
  - Layout responsivo com Tailwind (1 coluna no mobile, 2 colunas no tablet, 3 colunas no desktop)
  - Todos os componentes em TypeScript com tipos de retorno explícitos

criterios_sucesso:
  - LCP < 2.5s (Core Web Vitals)
  - CLS < 0.1 (sem deslocamento de layout ao carregar gráficos)
  - INP < 200ms (filtros respondem instantaneamente)
  - Acessibilidade no Lighthouse >= 90
  - Dashboard escaneável em até 5 segundos (Teste do Porta-Malas de Krug)
  - Cada grupo de métricas carregável de forma independente via Suspense

ancoras_conhecimento:
  - Princípios de Gestalt (proximidade, similaridade, agrupamento)
  - Lei de Miller (7 mais ou menos 2 blocos)
  - Lei de Hick (tempo de decisão vs. quantidade de opções)
  - Cleveland & McGill (hierarquia de precisão perceptual)
  - Core Web Vitals (LCP, INP, CLS)`,
  },
  {
    id: 'analista-inteligencia-mercado-b2b',
    titulo: 'Analista de Inteligência de Mercado B2B (Relatório de Conta)',
    descricao:
      'Gera um relatório executivo completo sobre uma empresa-alvo para preparação de vendas, parcerias, posicionamento ou expansão.',
    categoria: 'Gestão Financeira',
    ferramenta: 'Gemini',
    corGoogle: 'blue',
    variaveis: [
      'NOME DA EMPRESA E URL DO SITE',
      'EX: PREPARAÇÃO PARA REUNIÃO DE VENDAS, AVALIAÇÃO DE PARCERIA, POSICIONAMENTO COMPETITIVO OU EXPANSÃO DE CONTA',
    ],
    prompt: `# PAPEL
Você é um analista sênior de inteligência de mercado B2B. Todo relatório que você produz serve a um leitor específico que está tomando uma decisão específica. Um relatório bonito que não ajuda nessa decisão é um relatório falho.

# ENTRADAS
- Empresa-alvo (nome e site principal): [NOME DA EMPRESA E URL DO SITE]
- Objetivo / Decisão que este relatório apoia: [EX: PREPARAÇÃO PARA REUNIÃO DE VENDAS, AVALIAÇÃO DE PARCERIA, POSICIONAMENTO COMPETITIVO OU EXPANSÃO DE CONTA]

(Se apenas o nome ou apenas o site for fornecido, encontre o outro antes de prosseguir. Se o objetivo estiver faltando, pergunte antes de escrever.)

# MAPA DE ÊNFASE POR OBJETIVO
Cubra todas as seções, mas aprofunde conforme o objetivo:
- Preparação para vendas ou prospecção: dores, personas compradoras, ângulos de abordagem, palavras-chave e gatilhos recentes.
- Avaliação de aquisição ou parceria: liderança, modelo de negócios, diferencial competitivo, riscos e sinergia de integração.
- Posicionamento competitivo: diferenciais, lacunas de recursos e mensagens, tendências de mercado.
- Expansão de conta existente: novidades recentes, vetores de crescimento e casos de uso ainda não explorados.

# REGRAS DE OPERAÇÃO
1. Sem invenções: nunca invente números, nomes, citações, datas ou fatos. Escreva "Não encontrado" em vez de estimar.
2. Classifique todo dado não óbvio com uma tag:
   - [Confirmado]: declarado em fonte oficial ou primária.
   - [Secundário - Fonte]: inferido ou vindo de fonte secundária (cite a fonte).
   - [Não confirmado]: pesquisado, mas sem confirmação.
3. Hierarquia de fontes (da melhor para a pior): site oficial e documentos públicos, página da empresa no LinkedIn, imprensa confiável e publicações do setor, diretórios. Ignore fóruns e páginas sem data.
4. Janela de atualidade: dados sensíveis ao tempo dos últimos 12 meses; notícias dos últimos 6 meses.
5. Dados conflitantes: mostre ambos os números com suas fontes e diga qual é mais confiável e por quê.
6. Concorrentes devem ser empresas reais e nomeadas. Se menos de 2 puderem ser verificadas, omita a tabela e registre em Lacunas de Informação.
7. Registre qualquer premissa assumida em Lacunas de Informação.
8. Faça a pesquisa internamente. A resposta final deve conter apenas o relatório pronto, sem narração do processo ou comentários extras.

# FASES DE PESQUISA
- Fase 1 (Fontes primárias): site oficial e LinkedIn. Extraia identidade (nome, setor, sede, ano de fundação), porte, liderança, ofertas, proposta de valor, segmentos-alvo, cases e publicações dos últimos 6 meses.
- Fase 2 (Contexto de mercado): 2 a 4 concorrentes reais e seu posicionamento, tendências do setor e ecossistema de integrações.
- Fase 3 (Síntese): diferenciais, dores e gatilhos de compra, palavras-chave de geração de leads, ângulos de abordagem e resposta direta ao objetivo.

# FORMATO DE SAÍDA
Entregue apenas o relatório finalizado na estrutura abaixo (entre 900 e 1.300 palavras). Substitua todos os campos por conteúdo real ou "Não encontrado".

# Relatório de Pesquisa de Conta: [NOME DA EMPRESA]
**Data do relatório:** [Data atual] | **Fonte principal:** [URL] | **Objetivo:** [Resumo do objetivo em 1 linha]

## Resumo Executivo
[3 a 5 frases: o que a empresa faz, quem atende, posição de mercado e por que isso importa para o objetivo.]

## Perfil da Empresa
| Atributo | Detalhes |
|---|---|
| Nome da empresa | |
| Setor | |
| Sede | |
| Fundação | |
| Funcionários | |
| Liderança | |
| Contato | |

**Missão e escala:** [1 parágrafo]

## Produtos e Serviços
**Ofertas principais:** [2 a 4 ofertas, com público e valor entregue]
**Principais diferenciais:** [o que a separa das alternativas, com fatos específicos]
**Stack tecnológico e integrações:** [plataformas conhecidas ou "Não encontrado"]

## Mercado-Alvo
**Segmentos:** [setores, porte de empresas, geografia]
**Personas compradoras:** [decisores e usuários finais]
**Modelo de negócios:** [B2B/B2C, modelo de precificação se visível]

## Casos de Uso e Dores
[3 a 5 problemas específicos resolvidos e por que importam para o comprador]

## Cenário Competitivo
| Concorrente | Pontos fortes | Como a empresa-alvo se diferencia |
|---|---|---|
[2 a 4 linhas, apenas empresas reais]

**Resumo de posicionamento:** [2 a 3 frases]

## Dinâmica do Setor
**Tendências:** [2 a 3 tendências e o impacto na empresa]
**Oportunidades:** [onde podem crescer]
**Desafios:** [riscos e obstáculos]

## Novidades Recentes
[Rodadas de investimento, parcerias, lançamentos ou mudanças de liderança dos últimos 6 meses, com fonte e data, ou "Nenhuma encontrada"]

## Inteligência para Geração de Leads
(Para objetivos que não sejam vendas, adapte para critérios de parceria, alertas de risco ou sinais de expansão.)
**Palavras-chave:** [8 a 12 termos para segmentação, SEO ou prospecção]
**Ângulos de abordagem:** [2 a 3 ângulos ligados a achados específicos acima]
**Alvos de parceria:** [3 a 5 empresas com justificativa de 1 linha, ou omita se não fizer sentido]

## Lacunas de Informação
[O que não pôde ser confirmado e quaisquer premissas assumidas]

## Conclusão e Recomendações
[Resposta direta ao objetivo: pelo menos 3 ações recomendadas, prioridades e riscos para monitorar]`,
  },
  {
    id: 'youtube-roteiro-retencao',
    titulo: 'Roteirista de Vídeos para YouTube (Foco em Retenção)',
    descricao:
      'Cria roteiros completos de YouTube estruturados com gancho, loops de curiosidade e quebra de padrão para segurar a audiência.',
    categoria: 'Gemini & Produtividade',
    ferramenta: 'YouTube + Gemini',
    corGoogle: 'red',
    prompt: `Atue como um estrategista de conteúdo para YouTube especializado em retenção e engajamento de audiência.

Sua tarefa é escrever um roteiro completo de vídeo para o YouTube com base nas informações abaixo:

- Tema: [TEMA DO VÍDEO]
- Público-alvo: [SEU PÚBLICO-ALVO]
- Estilo do vídeo: [EX: TUTORIAL PRÁTICO, VLOG, ANÁLISE, LISTA]
- Tom de voz: [EX: DIDÁTICO, DESCONTRAÍDO, DIRETO AO PONTO]
- Objetivo da chamada para ação (CTA): [EX: INSCREVER-SE, BAIXAR PLANILHA, CLICAR NO LINK DA DESCRIÇÃO]

Estruture o roteiro seguindo exatamente esta sequência:

1. Gancho (0–10 segundos)
   - Comece com uma afirmação forte baseada em curiosidade ou em um problema real.
   - Evite saudações ("Oi pessoal", "Tudo bem?") e introduções demoradas.

2. Contexto / Setup (10–30 segundos)
   - Deixe claro sobre o que é o vídeo.
   - Explique por que isso importa para o público-alvo.

3. Blocos Principais de Conteúdo
   - Divida em 3 a 5 seções claras.
   - Cada seção deve:
     • Apresentar uma ideia central;
     • Entregar valor de forma direta e concisa;
     • Incluir uma transição ou loop de curiosidade puxando para o próximo ponto.

4. Momento de Reengajamento
   - Quebra de padrão no meio do roteiro (uma pergunta direta, uma afirmação ousada ou um insight inesperado).

5. Insight Final / Resumo
   - Reforce os principais aprendizados de forma clara e simples.

6. Chamada para Ação (CTA)
   - Alinhada ao objetivo do CTA informado acima.
   - Natural e conectada ao conteúdo do vídeo.

Regras:
- Mantenha o tom de voz [EX: DIDÁTICO, DESCONTRAÍDO, DIRETO AO PONTO] do início ao fim.
- Evite enchimento de linguiça e frases genéricas.
- Escreva frases conversacionais e fáceis de falar em voz alta.
- Não inclua direções de cena/câmera, a menos que seja estritamente necessário.
- Não explique a estrutura na resposta — entregue apenas o roteiro pronto para gravar.`,
  },
  {
    id: 'youtube-analisador-seguranca-infantil',
    titulo: 'Analisador de Vídeos do YouTube para Pais (Segurança Infantil)',
    descricao:
      'Avalia links, transcrições ou resumos de vídeos do YouTube e gera um relatório de classificação indicativa e riscos para crianças.',
    categoria: 'Gemini & Produtividade',
    ferramenta: 'YouTube + Gemini',
    corGoogle: 'red',
    variaveis: ['COLE AQUI O LINK DO YOUTUBE, TRANSCRIÇÃO OU RESUMO DO VÍDEO'],
    prompt: `Objetivo:
Analise o link do vídeo do YouTube, a transcrição ou o resumo fornecido abaixo e determine se o conteúdo é apropriado para crianças. Produza um relatório factual, estruturado e de fácil leitura em português para pais e responsáveis.

Regras de Análise:
- Baseie a avaliação apenas em evidências observáveis. Não especule nem invente detalhes.
- Se apenas um link for fornecido e você não conseguir acessar o conteúdo do vídeo, informe claramente que não é possível fazer uma avaliação confiável sem a transcrição ou resumo.
- Diferencie claramente fatos observados, inferências razoáveis e informações indisponíveis.
- Considere o contexto: diferencie ficção/animação/paródia de comportamento realista e avalie se comportamentos de risco são incentivados ou desencorajados.
- Atribua uma nota de risco de 0 a 5 para cada categoria (0 = Nenhum, 1 = Muito Baixo, 2 = Baixo, 3 = Moderado, 4 = Alto, 5 = Muito Alto).
- Prioridade na decisão: 1) Segurança infantil, 2) Impacto psicológico/emocional, 3) Conteúdo explícito/inadequado, 4) Frequência e intensidade, 5) Valor educativo (o valor educativo nunca deve superar riscos graves).
- Regra de idade: na dúvida entre duas faixas etárias, recomende a mais conservadora (mais velha).

Use exatamente esta estrutura na resposta:

# 🎯 AVALIAÇÃO GERAL
**Vídeo:** [Título, se disponível]
**Veredito:** (Escolha: ✅ Adequado | ⚠️ Requer Atenção | ❌ Não Recomendado)
**Nível Geral de Risco:** (Escolha: 🟢 Baixo | 🟡 Médio | 🔴 Alto)
**Idade Recomendada:** (Escolha: Livre / 3+ / 6+ / 9+ / 12+ / 14+ / 16+ / 18+)
[Explicação geral curta em 2 a 3 frases]

---

# 📝 RESUMO DO CONTEÚDO
[Resuma o vídeo em 1 ou 2 parágrafos curtos]

---

# 🔍 ANÁLISE DE RISCO
## 🗣️ Linguagem e Palavrões
- Avaliação:
- Nota de Risco: X/5

## 🥊 Violência e Medo (Sustinhos, Terror, Intensidade Emocional)
- Avaliação:
- Nota de Risco: X/5

## ❤️ Conteúdo Sexual ou Sugestivo
- Avaliação:
- Nota de Risco: X/5

## 🚬 Álcool, Cigarro ou Drogas
- Avaliação:
- Nota de Risco: X/5

## 🧠 Comportamentos Negativos (Desafios Perigosos / Más Influências)
- Avaliação:
- Nota de Risco: X/5

## 🚫 Bullying, Discriminação ou Discurso de Ódio
- Avaliação:
- Nota de Risco: X/5

## 🌟 Mensagens Positivas e Valor Educativo
- Avalie: educação, empatia, cooperação, resolução de problemas e criatividade.

---

# ⚠️ ALERTAS DE CONTEÚDO
[Liste apenas os alertas aplicáveis com emojis, ex: 😱 Cenas de susto, 🔊 Sons altos, ⚔️ Lutas. Se não houver nenhum, escreva: "Não há alertas de conteúdo relevantes."]

---

# 👨👩👧 SUPERVISÃO PARENTAL
Escolha uma opção e explique em 1 a 2 frases:
- ✅ Pode assistir sozinho.
- 👨👩👧 Recomendado assistir acompanhado de um adulto.
- ⛔ Não recomendado para crianças pequenas.

---

# 🌍 CLASSIFICAÇÃO INDICATIVA EQUIVALENTE (Aproximada)
[Indique a equivalência aproximada no padrão brasileiro (L, 10, 12, 14, 16, 18) e internacional (ESRB/PEGI), deixando claro que é uma estimativa.]

---

# 🧠 NÍVEL DE CONFIANÇA DA ANÁLISE
Escolha: 🟢 Alta Confiança (transcrição completa) | 🟡 Confiança Média (informações parciais) | 🔴 Baixa Confiança (dados muito limitados) e explique brevemente o motivo.

---

# ✨ CONCLUSÃO E RECOMENDAÇÃO PARA OS PAIS
[Conselho prático sobre adequação, supervisão, crianças mais sensíveis e se o valor educativo compensa eventuais riscos.]

Conteúdo para analisar:
[COLE AQUI O LINK DO YOUTUBE, TRANSCRIÇÃO OU RESUMO DO VÍDEO]`,
  },
  {
    id: 'prompt-1',
    titulo: 'Criador de Fórmulas para Google Planilhas e Excel',
    descricao:
      'Gera fórmulas complexas explicadas passo a passo sem precisar decorar sintaxe.',
    categoria: 'Google Planilhas & Excel',
    ferramenta: 'Google Planilhas',
    corGoogle: 'green',
    prompt:
      'Atue como um especialista em Google Planilhas e Excel. Preciso de uma fórmula para [DESCREVA O QUE VOCÊ QUER CALCULAR]. Meus dados estão nas colunas [EX: A2:A100 para datas e B2:B100 para valores]. Me dê a fórmula pronta para copiar, explique como ela funciona em termos simples e aponte possíveis erros comuns.',
  },
  {
    id: 'prompt-2',
    titulo: 'Diagnóstico de Fluxo de Caixa para Pequenos Negócios',
    descricao:
      'Analisa receitas e despesas para encontrar gargalos e oportunidades de economia.',
    categoria: 'Gestão Financeira',
    ferramenta: 'Gemini',
    corGoogle: 'blue',
    prompt:
      'Atue como um consultor de gestão financeira para pequenas empresas. Vou colar abaixo o resumo das minhas receitas e despesas do mês de [MÊS/ANO] do meu negócio de [SEU RAMO]. Analise os números, identifique os 3 maiores gargalos de custo, calcule minha margem de lucro aproximada e sugira um plano de ação prático para os próximos 30 dias. Dados: [COLE OS DADOS AQUI]',
  },
  {
    id: 'prompt-3',
    titulo: 'Gerador de Script em Google Apps Script',
    descricao:
      'Cria automações gratuitas conectando Planilhas, Gmail e Google Agenda.',
    categoria: 'Automação & Apps Script',
    ferramenta: 'Apps Script',
    corGoogle: 'yellow',
    prompt:
      'Atue como um desenvolvedor especialista em Google Apps Script. Escreva um código limpo e comentado para automatizar a seguinte tarefa no Google Workspace: [EX: enviar um e-mail automático pelo Gmail sempre que uma linha da planilha tiver o status "Atrasado"]. Inclua o passo a passo exato de onde colar o código e como configurar o acionador (trigger).',
  },
  {
    id: 'prompt-4',
    titulo: 'E-mail Comercial Profissional no Gmail',
    descricao:
      'Escreve propostas e follow-ups persuasivos e diretos para fechar clientes.',
    categoria: 'Google Workspace',
    ferramenta: 'Gmail',
    corGoogle: 'red',
    prompt:
      'Escreva um e-mail comercial profissional, direto e cordial para enviar a um potencial cliente do ramo de [RAMO DO CLIENTE]. O objetivo é apresentar meu serviço de [SEU SERVIÇO] focando no benefício de [PRINCIPAL BENEFÍCIO]. Inclua 3 opções de assunto com alta taxa de abertura e uma chamada para ação simples para agendar uma conversa no Google Meet.',
  },
  {
    id: 'prompt-5',
    titulo: 'Estrutura de Planilha Financeira do Zero',
    descricao:
      'Desenha abas, colunas e indicadores para montar uma planilha completa.',
    categoria: 'Gestão Financeira',
    ferramenta: 'Google Planilhas',
    corGoogle: 'green',
    prompt:
      'Quero criar uma planilha de controle financeiro no Google Planilhas para [USO PESSOAL OU TIPO DE EMPRESA]. Liste as abas recomendadas, o nome exato das colunas de cada aba, quais indicadores (KPIs) devem aparecer no Dashboard principal e quais gráficos funcionam melhor para visualizar esses dados.',
  },
  {
    id: 'prompt-6',
    titulo: 'Pesquisa de Tendências com Google Trends + Gemini',
    descricao:
      'Transforma termos em alta no Google Trends em pautas de conteúdo ou produtos.',
    categoria: 'Gemini & Produtividade',
    ferramenta: 'Gemini',
    corGoogle: 'blue',
    prompt:
      'Com base no tema em alta "[TEMA DO GOOGLE TRENDS]" voltado para o público de [SEU PÚBLICO-ALVO], gere: 5 ideias de vídeos para YouTube com títulos chamativos, 3 ideias de artigos para blog otimizados para SEO e 1 ideia de produto digital ou planilha que resolva a principal dor desse público.',
  },
  {
    id: 'prompt-7',
    titulo: 'Organizador de Reuniões no Google Docs e Meet',
    descricao:
      'Transforma anotações soltas ou transcrições em atas organizadas com responsáveis.',
    categoria: 'Google Workspace',
    ferramenta: 'Google Docs',
    corGoogle: 'blue',
    prompt:
      'Transforme as anotações da reunião abaixo em uma ata executiva pronta para colar no Google Docs. Organize em: 1) Resumo em 3 linhas, 2) Decisões tomadas, 3) Lista de tarefas em tabela com as colunas [Tarefa | Responsável | Prazo]. Anotações: [COLE AS ANOTAÇÕES AQUI]',
  },
  {
    id: 'prompt-8',
    titulo: 'Padronizador de Dados Bagunçados',
    descricao:
      'Limpa listas de clientes, telefones ou textos para importar direto em planilhas.',
    categoria: 'Google Planilhas & Excel',
    ferramenta: 'Google Planilhas',
    corGoogle: 'green',
    prompt:
      'Organize os dados bagunçados abaixo em formato de tabela limpa (CSV separado por vírgula) pronta para colar no Google Planilhas. Padronize nomes com iniciais maiúsculas, formate datas como DD/MM/AAAA e remova duplicatas. Dados: [COLE OS DADOS AQUI]',
  },

  // --- GOOGLE PLANILHAS & EXCEL ---
  {
    id: 'planilha-corrigir-erro',
    titulo: 'Corretor de Erros em Fórmulas (#REF!, #N/A, #VALUE!)',
    descricao:
      'Identifica por que uma fórmula quebrou e devolve a versão corrigida.',
    categoria: 'Google Planilhas & Excel',
    ferramenta: 'Google Planilhas',
    corGoogle: 'green',
    prompt:
      'Atue como especialista em Google Planilhas e Excel. Minha fórmula [COLE A FÓRMULA AQUI] está retornando o erro [EX: #N/A ou #VALUE!]. O meu objetivo com ela é [EXPLIQUE O QUE ELA DEVERIA FAZER]. Me diga exatamente qual é a causa do erro, me dê a fórmula corrigida pronta para copiar e sugira como usar SEERRO para deixar a célula limpa.',
  },
  {
    id: 'planilha-query-sql',
    titulo: 'Gerador de Fórmula QUERY no Google Planilhas',
    descricao:
      'Cria filtros e resumos avançados usando a função QUERY sem precisar saber SQL.',
    categoria: 'Google Planilhas & Excel',
    ferramenta: 'Google Planilhas',
    corGoogle: 'green',
    prompt:
      "Crie uma fórmula QUERY do Google Planilhas para a aba chamada '[NOME DA ABA]', intervalo [EX: A1:F500]. Eu quero selecionar as colunas [EX: A, C e F], filtrar apenas onde a coluna [EX: D] for igual a '[CRITÉRIO]', e ordenar pela coluna [EX: F] do maior para o menor. Explique brevemente cada parte da fórmula.",
  },
  {
    id: 'planilha-formatacao-condicional',
    titulo: 'Regras de Formatação Condicional Inteligente',
    descricao:
      'Cria fórmulas personalizadas para colorir linhas inteiras automaticamente.',
    categoria: 'Google Planilhas & Excel',
    ferramenta: 'Google Planilhas',
    corGoogle: 'green',
    prompt:
      'Quero criar uma regra de Formatação Condicional no Google Planilhas para pintar a linha inteira (de [EX: A2 até G100]) da cor [COR] sempre que [CONDIÇÃO, EX: a data na coluna E já tiver vencido e a coluna F estiver vazia]. Me dê a fórmula personalizada exata com os cifrões ($) no lugar certo e o passo a passo de onde clicar.',
  },

  // --- GESTÃO FINANCEIRA ---
  {
    id: 'financas-precificacao-servico',
    titulo: 'Calculadora de Preço para Freelancers e Serviços',
    descricao:
      'Ajuda a definir o valor/hora e o preço fechado de um serviço sem levar prejuízo.',
    categoria: 'Gestão Financeira',
    ferramenta: 'Gemini',
    corGoogle: 'blue',
    prompt:
      'Atue como um consultor financeiro para freelancers. Quero precificar meu serviço de [TIPO DE SERVIÇO]. Minha meta de faturamento mensal líquido é R$ [META MENSAL], meus custos fixos mensais são R$ [CUSTOS FIXOS] e trabalho [HORAS] horas por dia, [DIAS] dias por semana. Calcule meu valor/hora mínimo, o valor ideal com margem de segurança de [EX: 25%] e sugira 3 pacotes (Básico, Intermediário e Premium) para apresentar ao cliente.',
  },
  {
    id: 'financas-ponto-equilibrio',
    titulo: 'Cálculo de Ponto de Equilíbrio e Meta de Vendas',
    descricao:
      'Descobre exatamente quanto você precisa vender no mês para cobrir todos os custos.',
    categoria: 'Gestão Financeira',
    ferramenta: 'Gemini',
    corGoogle: 'blue',
    prompt:
      'Calcule o ponto de equilíbrio do meu negócio de [SEU RAMO]. Meus custos fixos mensais somam R$ [CUSTOS FIXOS], meu ticket médio por venda é R$ [TICKET MÉDIO] e o custo variável por venda (impostos, taxas, insumos) é de [PORCENTAGEM]%. Me diga quantas vendas preciso fazer no mês para empatar, quantas preciso para lucrar R$ [META DE LUCRO] e sugira 3 ações para melhorar essa margem.',
  },
  {
    id: 'financas-cobranca-elegante',
    titulo: 'Mensagens de Cobrança Elegantes (WhatsApp e E-mail)',
    descricao:
      'Cria textos educados e firmes para cobrar faturas em atraso sem perder o cliente.',
    categoria: 'Gestão Financeira',
    ferramenta: 'Gmail',
    corGoogle: 'red',
    prompt:
      'Escreva 3 modelos de mensagem de cobrança educada e profissional para um cliente que está com o pagamento de [SERVIÇO/PRODUTO] no valor de R$ [VALOR] atrasado há [NÚMERO] dias: 1) Lembrete amigável para WhatsApp, 2) Cobrança formal para e-mail no Gmail, 3) Mensagem firme oferecendo opção de parcelamento ou nova data limite.',
  },

  // --- GOOGLE WORKSPACE ---
  {
    id: 'workspace-proposta-docs',
    titulo: 'Estrutura de Proposta Comercial no Google Docs',
    descricao:
      'Monta o texto completo de uma proposta irrecusável pronta para virar PDF.',
    categoria: 'Google Workspace',
    ferramenta: 'Google Docs',
    corGoogle: 'blue',
    prompt:
      'Escreva o conteúdo completo de uma proposta comercial moderna para eu diagramar no Google Docs. Meu serviço é [SEU SERVIÇO] para o cliente [NOME OU RAMO DO CLIENTE]. O problema principal que vou resolver é [DOR DO CLIENTE]. Estruture com: Capa, Diagnóstico Rápido, Escopo Detalhado, Cronograma de Entregas, Investimento (R$ [VALOR]) e Próximos Passos.',
  },
  {
    id: 'workspace-formulario-briefing',
    titulo: 'Criador de Briefing de Clientes no Google Forms',
    descricao:
      'Gera as perguntas certas para coletar informações do cliente antes de começar um projeto.',
    categoria: 'Google Workspace',
    ferramenta: 'Google Forms',
    corGoogle: 'yellow',
    prompt:
      'Crie um roteiro de formulário no Google Forms para fazer o briefing inicial de novos clientes do meu serviço de [SEU SERVIÇO]. Divida em seções lógicas, indique qual tipo de resposta usar em cada pergunta (resposta curta, múltipla escolha, upload de arquivo) e inclua uma mensagem final de boas-vindas.',
  },
  {
    id: 'workspace-organizacao-drive',
    titulo: 'Arquitetura de Pastas Profissional no Google Drive',
    descricao:
      'Desenha uma estrutura numerada de pastas para nunca mais perder arquivos.',
    categoria: 'Google Workspace',
    ferramenta: 'Google Drive',
    corGoogle: 'green',
    prompt:
      'Crie uma estrutura de pastas e subpastas organizada (usando numeração 01, 02, 03...) para eu implementar no meu Google Drive. Meu perfil é [EX: freelancer / pequena empresa / criadora de conteúdo] na área de [SUA ÁREA]. Inclua um padrão simples de nomenclatura de arquivos para manter tudo fácil de encontrar.',
  },
  {
    id: 'workspace-rotina-agenda',
    titulo: 'Planejamento de Blocos de Tempo no Google Agenda',
    descricao:
      'Organiza sua semana com blocos de foco, reuniões e tempo pessoal.',
    categoria: 'Google Workspace',
    ferramenta: 'Google Agenda',
    corGoogle: 'blue',
    prompt:
      'Atue como especialista em produtividade. Organize minha semana no Google Agenda usando a técnica de Time Blocking (blocos de tempo). Eu trabalho das [HORA INÍCIO] às [HORA FIM], preciso encaixar [LISTE SUAS TAREFAS PRINCIPAIS, EX: gravação, atendimento a clientes, financeiro] e quero manter [EX: sextas à tarde livres para planejamento]. Sugira as cores para cada categoria de bloco.',
  },

  // --- AUTOMAÇÃO & APPS SCRIPT ---
  {
    id: 'automacao-pdf-automatico',
    titulo: 'Gerar PDF do Google Docs a partir de Planilha (Apps Script)',
    descricao:
      'Automatiza a criação de contratos, recibos ou certificados em lote.',
    categoria: 'Automação & Apps Script',
    ferramenta: 'Apps Script',
    corGoogle: 'yellow',
    prompt:
      'Escreva um código em Google Apps Script que leia a última linha preenchida de uma planilha no Google Planilhas (colunas: [EX: Nome, CPF, Valor, Data]), substitua as tags {{Nome}}, {{CPF}}, {{Valor}} e {{Data}} em um modelo do Google Docs, salve uma cópia em PDF em uma pasta específica do Google Drive e insira o link do PDF de volta na planilha. Explique onde colar os IDs da pasta e do documento.',
  },
  {
    id: 'automacao-alerta-vencimento',
    titulo: 'Robô de Alerta de Contas a Vencer por E-mail',
    descricao:
      'Envia um resumo diário no seu Gmail com as contas que vencem hoje ou amanhã.',
    categoria: 'Automação & Apps Script',
    ferramenta: 'Apps Script',
    corGoogle: 'yellow',
    prompt:
      "Crie um script em Google Apps Script para uma planilha de contas a pagar com as colunas: Descrição (A), Valor (B), Vencimento (C) e Status (D). O script deve rodar todo dia às 8h, verificar quais linhas têm Status diferente de 'Pago' e vencem nos próximos 2 dias, e enviar um único e-mail organizado para [MEU E-MAIL] listando essas contas.",
  },
  {
    id: 'automacao-menu-personalizado',
    titulo: 'Criar Menu Personalizado no Google Planilhas',
    descricao:
      'Adiciona um botão próprio no topo da sua planilha para rodar suas automações com 1 clique.',
    categoria: 'Automação & Apps Script',
    ferramenta: 'Apps Script',
    corGoogle: 'yellow',
    prompt:
      "Escreva a função onOpen() em Google Apps Script para criar um menu personalizado chamado '[NOME DO MENU]' na barra superior do Google Planilhas, com os botões '[BOTÃO 1]' (que chama a função funcao1) e '[BOTÃO 2]' (que chama a função funcao2), incluindo uma janela de confirmação antes de executar.",
  },

  // --- GEMINI & PRODUTIVIDADE ---
  {
    id: 'gemini-conteudo-1-para-5',
    titulo: 'Multiplicador de Conteúdo (Fluxo 1 para 5)',
    descricao:
      'Transforma 1 ideia ou roteiro de vídeo em posts para Blog, Instagram, Shorts e LinkedIn.',
    categoria: 'Gemini & Produtividade',
    ferramenta: 'Gemini',
    corGoogle: 'blue',
    prompt:
      'A partir do tema/roteiro abaixo, crie um pacote de conteúdo 1 para 5 mantendo um tom didático e prático: 1) Resumo otimizado para artigo de blog, 2) Roteiro curto de até 45 segundos para Reels/Shorts com gancho forte, 3) Carrossel de 6 slides para Instagram, 4) Post direto para LinkedIn, 5) 3 ideias de títulos clicáveis para YouTube. Conteúdo base: [COLE SEU TEXTO OU TEMA AQUI]',
  },
  {
    id: 'gemini-prompt-ai-studio',
    titulo: 'Gerador de Prompt para Criar Apps no Google AI Studio',
    descricao:
      'Estrutura a especificação técnica perfeita para o AI Studio gerar um sistema sem erros.',
    categoria: 'Gemini & Produtividade',
    ferramenta: 'Google AI Studio',
    corGoogle: 'blue',
    prompt:
      'Atue como Product Manager e Engenheiro Front-end. Quero criar um aplicativo web gratuito e estático no Google AI Studio para [DESCREVA A IDEIA DO APP]. Transforme minha ideia em um prompt detalhado e pronto para colar no AI Studio, especificando: telas necessárias, funcionalidades principais, uso de localStorage (sem backend pago), layout responsivo com modo claro/escuro e estrutura de dados.',
  },
  {
    id: 'gemini-catalogo-servicos',
    titulo: 'Criador de Serviços com IA para Freelancers',
    descricao:
      'Transforma suas habilidades atuais em serviços vendáveis usando ferramentas do Google.',
    categoria: 'Gemini & Produtividade',
    ferramenta: 'Gemini',
    corGoogle: 'blue',
    prompt:
      'Eu sei usar [LISTE SUAS HABILIDADES, EX: Google Planilhas, Gemini, Canva, Google Workspace] e quero prestar serviços como freelancer para [TIPO DE CLIENTE, EX: pequenos comércios, dentistas, infoprodutores]. Liste 5 serviços práticos que posso oferecer, o problema que cada um resolve, uma faixa de preço sugerida no Brasil e um texto curto de abordagem para oferecer o serviço.',
  },

  /* =====================================================================
     MODELO PARA VOCÊ ADICIONAR SEUS PRÓPRIOS PROMPTS DEPOIS:
     (Basta copiar o bloco abaixo, tirar os comentários e preencher)
  =====================================================================
  {
    id: 'id-unico-sem-espacos',
    titulo: 'Título do Seu Prompt',
    descricao: 'Resumo de 1 linha explicando o que esse prompt faz.',
    categoria: 'Gemini & Produtividade',
    ferramenta: 'Gemini',
    corGoogle: 'blue',
    prompt:
      'Escreva o seu prompt aqui usando [COLCHETES] nas partes que o usuário deve personalizar.',
  },
  */
];
