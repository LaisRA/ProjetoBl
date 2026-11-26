/**
 * ============================================================================
 * GUIA RÁPIDO: COMO ADICIONAR UM NOVO ARTIGO EM 3 PASSOS
 * ============================================================================
 *
 * PASSO 1: Copie um bloco completo de artigo dentro do array `posts` abaixo
 *          (do `{` até o `},`) e cole no TOPO da lista para ele aparecer primeiro.
 *
 * PASSO 2: Atualize os dados básicos:
 *          - `id`: um número único em texto (ex: "6")
 *          - `slug`: URL amigável sem espaços ou acentos (ex: "meu-novo-tutorial")
 *          - `titulo`, `resumo`, `data` e `tempoLeitura`
 *          - `categoria`: escolha entre "Gestão Financeira", "Automação Comercial" ou "IA & Google"
 *          - `youtubeId`: (opcional) cole apenas o código de 11 caracteres do vídeo
 *            (ex: em youtube.com/watch?v=ABC123xyz00, use "ABC123xyz00"). Deixe "" se não tiver vídeo.
 *          - `linkTemplate`: (opcional) cole o link do template apenas quando o artigo tiver um arquivo pronto para baixar; deixe "" para ocultar a caixa de template.
 *
 * PASSO 3: Edite o array `blocosDeConteudo` usando os tipos disponíveis:
 *          - { tipo: "subtitulo", texto: "..." }
 *          - { tipo: "paragrafo", texto: "..." }  -> aceita **negrito** e `código inline`
 *          - { tipo: "lista", ordenada: true/false, itens: ["...", "..."] }
 *          - { tipo: "codigo", linguagem: "Google Apps Script", titulo: "Arquivo.gs", conteudo: `...` }
 *          - { tipo: "dica", titulo: "...", texto: "..." }
 *          - { tipo: "cta", titulo: "...", texto: "...", textoBotao: "...", link: "..." }
 *
 * Depois salve o arquivo e faça o commit/push para o GitHub Pages atualizar automaticamente!
 * ============================================================================
 */

export type Categoria =
  | 'Gestão Financeira'
  | 'Automação Comercial'
  | 'IA & Google';

export type BlocoConteudo =
  | {
      tipo: 'paragrafo';
      texto: string;
    }
  | {
      tipo: 'subtitulo';
      texto: string;
    }
  | {
      tipo: 'lista';
      ordenada?: boolean;
      itens: string[];
    }
  | {
      tipo: 'codigo';
      linguagem: string;
      titulo?: string;
      conteudo: string;
    }
  | {
      tipo: 'dica';
      titulo: string;
      texto: string;
    }
  | {
      tipo: 'cta';
      titulo: string;
      texto: string;
      textoBotao: string;
      link: string;
    };

export interface Post {
  id: string;
  slug: string;
  titulo: string;
  resumo: string;
  categoria: Categoria;
  data: string;
  tempoLeitura: string;
  youtubeId?: string;
  imagemOg?: string;
  linkTemplate?: string;
  tituloTemplate?: string;
  descricaoTemplate?: string;
  itensTemplate?: string[];
  blocosDeConteudo: BlocoConteudo[];
}

export const CATEGORIAS: Categoria[] = [
  'Gestão Financeira',
  'Automação Comercial',
  'IA & Google',
];

export const LINKS_SOCIAIS = {
  youtube: 'https://www.youtube.com/@laisranieletech',
  instagram: 'https://www.instagram.com/laisdeanjos/',
  whatsapp: 'https://wa.me/5537999046824',
  whatsappCupom:
    'https://wa.me/5537999046824?text=Ol%C3%A1%20Lais!%20Quero%20um%20c%C3%B3digo%20promocional%20do%20Google%20Workspace.',
  whatsappNumero: '(37) 99904-6824',
  workspaceAfiliado: 'https://sharegoogleworkspace.advocate.impact.com/mzZ2zF7',
  site: 'https://laisraniele.com.br',
};

export const posts: Post[] = [
  {
    id: '8',
    slug: 'planilhalab-app-gratuito-estudar-excel-offline',
    titulo:
      'PlanilhaLab: o aplicativo gratuito e offline para estudar Excel do básico ao avançado',
    resumo:
      'Conheça o PlanilhaLab, app gratuito e offline para praticar Excel com mini planilha interativa, gerador de dados fictícios, guia de fórmulas, timer de foco e anotações. Disponível atualmente apenas em português.',
    categoria: 'Gestão Financeira',
    data: '26 Nov 2026',
    tempoLeitura: '5 min de leitura',
    youtubeId: '',
    linkTemplate: '',
    blocosDeConteudo: [
      {
        tipo: 'paragrafo',
        texto:
          'Quem tenta aprender Excel sozinho quase sempre esbarra nos mesmos problemas: assistir a horas de vídeo sem colocar a mão na massa, não ter bases de dados realistas para treinar ou ficar sem saber qual fórmula estudar primeiro.',
      },
      {
        tipo: 'paragrafo',
        texto:
          'O [PlanilhaLab](https://planilhalab02.vercel.app/) foi criado justamente para resolver isso. Ele é um aplicativo web **100% gratuito, local e offline** que reúne trilha de estudos, exercícios práticos em uma mini planilha interativa, gerador de dados fictícios, guia rápido de fórmulas, timer de foco e caderno de anotações — tudo direto no navegador, sem precisar criar conta nem pagar licença.',
      },
      {
        tipo: 'dica',
        titulo: 'Aviso importante sobre o idioma',
        texto:
          'No momento, o PlanilhaLab está disponível **apenas em português (PT-BR)** — toda a interface, os enunciados dos exercícios, as dicas e o guia de fórmulas estão em português. Caso você esteja acessando o blog de fora do Brasil com a tradução automática ativada, tenha em mente que o aplicativo externo ainda não possui versão em outros idiomas.',
      },
      {
        tipo: 'cta',
        titulo: 'Quer testar o PlanilhaLab agora mesmo?',
        texto:
          'Acesse o aplicativo gratuitamente pelo navegador do computador ou celular. Seus progressos e anotações ficam salvos localmente no seu dispositivo e funcionam até sem internet.',
        textoBotao: 'Acessar o PlanilhaLab',
        link: 'https://planilhalab02.vercel.app/',
      },
      {
        tipo: 'subtitulo',
        texto: 'O que você encontra dentro do PlanilhaLab',
      },
      {
        tipo: 'paragrafo',
        texto:
          'O aplicativo é dividido em **5 áreas principais** pensadas para transformar estudo passivo em prática real:',
      },
      {
        tipo: 'lista',
        ordenada: false,
        itens: [
          '**Trilha & Aulas:** um roteiro organizado em 4 módulos — “01. Fundamentos e Produtividade”, “02. Lógica, Condições e Texto”, “03. Cruzamento de Bases e Tabelas Dinâmicas” e “04. Dashboards, Power Query e Automação” (incluindo introdução a Macros e VBA) — integrado a aulas avulsas do YouTube.',
          '**Prática (Mini Planilha Interativa):** 10 exercícios práticos corrigidos automaticamente na hora. Você digita a fórmula direto na célula e recebe feedback imediato, dicas progressivas e explicação da solução.',
          '**Gerador de Dados Fictícios:** cria tabelas realistas prontas para praticar cenários de mercado, como **Vendas** (pedidos por região, vendedor, categoria, desconto e faturamento líquido), **Estoque** (SKUs, armazéns, nível mínimo e reposição) e **Suporte** (chamados técnicos, prioridade, tempo de resolução e nota CSAT).',
          '**Guia Offline:** biblioteca rápida de consulta com sintaxes em português, armadilhas mais comuns (como erro `#VALOR!` ou números com aspas) e resumo de atalhos essenciais para consultar mesmo sem conexão.',
          '**Caderno, Lembretes e Timer de Foco:** espaço para salvar seus resumos de estudo, configurar lembretes diários ou pontuais e estudar com timer integrado nos modos **Pomodoro 25m**, **Imersão 50m**, **Pausa 5m** e **Pausa 10m**.',
        ],
      },
      {
        tipo: 'subtitulo',
        texto: 'Quais fórmulas você pratica na mini planilha interativa?',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Os exercícios práticos cobrem exatamente as funções mais cobradas em entrevistas de emprego e na rotina de gestão financeira e comercial:',
      },
      {
        tipo: 'lista',
        ordenada: true,
        itens: [
          'Básico essencial: `SOMA`, `MÉDIA` e reajuste com **Referência Absoluta** (`$`).',
          'Lógica e agregação condicional: `SE`, `SOMASE` (receita por região) e `CONT.SE` (contagem de pedidos por status).',
          'Tratamento de texto: extração de prefixos com `ESQUERDA`, além de conteúdos sobre `DIREITA` e `CONCAT`.',
          'Cruzamento de tabelas e proteção de erros: consulta de preço com `PROCV`, busca à esquerda com `PROCX` e margem blindada com `SEERRO`.',
        ],
      },
      {
        tipo: 'subtitulo',
        texto: 'Funciona sem internet e pode ser instalado como aplicativo',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Um dos grandes diferenciais do [PlanilhaLab](https://planilhalab02.vercel.app/) é ser um **PWA (Progressive Web App)**. Isso significa que você pode instalá-lo na tela inicial do celular ou como aplicativo no computador pelo Chrome, Edge ou Safari e continuar resolvendo exercícios, consultando o guia de fórmulas e escrevendo no seu caderno mesmo quando estiver offline — como no transporte ou em viagens.',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Além disso, como o armazenamento é **100% local**, suas anotações, lembretes e progresso nos módulos não dependem de login nem ficam expostos em servidores externos.',
      },
      {
        tipo: 'subtitulo',
        texto: 'Como começar a estudar hoje em 3 passos',
      },
      {
        tipo: 'lista',
        ordenada: true,
        itens: [
          'Abra o link [planilhalab02.vercel.app](https://planilhalab02.vercel.app/) no navegador.',
          'Ative o timer no modo **Pomodoro 25m** e escolha o primeiro tema da **Trilha & Aulas** ou vá direto para a aba **Prática** para testar seu nível atual.',
          'Gere uma base fictícia na aba **Gerador de Dados** para levar o que aprendeu para o Excel ou para o Google Sheets e montar seus próprios gráficos e dashboards.',
        ],
      },
      {
        tipo: 'cta',
        titulo: 'Comece a praticar Excel agora no PlanilhaLab',
        texto:
          'Gratuito, sem cadastro, funciona offline e traz exercícios corrigidos na hora. Lembrete: atualmente disponível somente em português (PT-BR).',
        textoBotao: 'Abrir PlanilhaLab grátis',
        link: 'https://planilhalab02.vercel.app/',
      },
    ],
  },
  {
    id: '7',
    slug: 'planilha-financeira-2027-google-sheets-automatica',
    titulo:
      'Como Criar uma Planilha Financeira Automática para 2027 em 1 Clique (Google Sheets Grátis)',
    resumo:
      'Crie uma planilha de controle financeiro para 2027 no Google Sheets em 1 clique. Copie o código pronto em Apps Script (testado) e gere abas, fórmulas e dashboard automaticamente.',
    categoria: 'Gestão Financeira',
    data: '24 Nov 2026',
    tempoLeitura: '7 min de leitura',
    // Cole aqui o ID de 11 caracteres do vídeo do YouTube assim que publicar (ex: "W6Jh1k85fjY"):
    youtubeId: '',
    linkTemplate: '',
    blocosDeConteudo: [
      {
        tipo: 'paragrafo',
        texto:
          'Começar o ano prometendo organizar o dinheiro é fácil; difícil é manter uma planilha funcionando quando você precisa perder horas criando fórmulas, arrumando gráficos quebrados e formatando células na mão.',
      },
      {
        tipo: 'paragrafo',
        texto:
          'A boa notícia é que você não precisa saber Excel avançado nem pagar por aplicativos financeiros para ter um painel profissional em 2027. Usando um **código pronto em Google Apps Script** (criado com ajuda de IA e já testado), você constrói sua planilha inteira — com abas, cores, menus suspensos, fórmulas automáticas e gráfico — em **menos de 10 segundos**.',
      },
      {
        tipo: 'subtitulo',
        texto: 'O que essa planilha financeira de 2027 faz sozinha?',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Ao executar o código abaixo no seu Google Sheets, a planilha nasce pronta com:',
      },
      {
        tipo: 'lista',
        ordenada: false,
        itens: [
          '**Aba `Lancamentos`**: cabeçalho estilizado e congelado, formatação automática em Reais (`R$`), menus suspensos para Categorias, Tipo (Entrada/Saída) e Forma de Pagamento, além de cores automáticas (verde para entradas e vermelho para saídas).',
          '**Aba `Dashboard 2027`**: visual limpo sem linhas de grade, 3 cartões de resumo automático (Total de Entradas, Total de Saídas e Saldo Atual), tabela de Gastos por Categoria com Total Geral e um Gráfico de Rosca que se atualiza em tempo real.',
          '**Dados de teste**: 10 lançamentos fictícios de janeiro de 2027 para você testar tudo antes de colocar seus números reais.',
        ],
      },
      {
        tipo: 'subtitulo',
        texto: 'Passo 1: Copie o código pronto (Apps Script)',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Clique no botão **Copiar** no bloco abaixo para pegar o script completo:',
      },
      {
        tipo: 'codigo',
        linguagem: 'Google Apps Script',
        titulo: 'PlanilhaFinanceira2027.gs',
        conteudo: `/**
 * Gera automaticamente uma Planilha de Controle Financeiro Pessoal para 2027
 * com aba de Lançamentos estruturada e Dashboard interativo.
 */
function criarPlanilhaFinanceira2027() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  // =========================================================================
  // 1. ESTRUTURA DE ABAS
  // =========================================================================
  const nomeAbaLancamentos = "Lancamentos";
  const nomeAbaDashboard = "Dashboard 2027";

  const abaTemp = ss.insertSheet("Temp_Setup_" + new Date().getTime());

  const abasParaRemover = [
    nomeAbaLancamentos,
    "Lançamentos",
    nomeAbaDashboard,
    "Página1",
    "Sheet1"
  ];
  abasParaRemover.forEach(nome => {
    const aba = ss.getSheetByName(nome);
    if (aba) ss.deleteSheet(aba);
  });

  const sheetDash = ss.insertSheet(nomeAbaDashboard, 0);
  const sheetLanc = ss.insertSheet(nomeAbaLancamentos, 1);

  ss.deleteSheet(abaTemp);
  sheetDash.setHiddenGridlines(true);

  // =========================================================================
  // 2. ABA "LANÇAMENTOS" (aba nomeada "Lancamentos" para evitar problemas com acentos em fórmulas)
  // =========================================================================
  const cabecalhos = [["Data", "Descrição", "Categoria", "Tipo", "Forma de Pagamento", "Valor"]];
  const rangeCabecalho = sheetLanc.getRange("A1:F1");

  rangeCabecalho
    .setValues(cabecalhos)
    .setBackground("#1E293B")
    .setFontColor("#FFFFFF")
    .setFontWeight("bold")
    .setFontFamily("Inter")
    .setFontSize(10)
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");

  sheetLanc.setRowHeight(1, 35);
  sheetLanc.setFrozenRows(1);

  const categorias = [
    "Moradia", "Alimentação", "Transporte", "Saúde",
    "Lazer", "Educação", "Investimentos", "Salário", "Renda Extra"
  ];
  const tipos = ["Entrada", "Saída"];
  const formasPagamento = ["Pix", "Cartão de Crédito", "Débito", "Dinheiro", "Boleto"];

  const regraCategoria = SpreadsheetApp.newDataValidation()
    .requireValueInList(categorias, true)
    .setAllowInvalid(false)
    .build();

  const regraTipo = SpreadsheetApp.newDataValidation()
    .requireValueInList(tipos, true)
    .setAllowInvalid(false)
    .build();

  const regraPagamento = SpreadsheetApp.newDataValidation()
    .requireValueInList(formasPagamento, true)
    .setAllowInvalid(false)
    .build();

  sheetLanc.getRange("C2:C500").setDataValidation(regraCategoria);
  sheetLanc.getRange("D2:D500").setDataValidation(regraTipo);
  sheetLanc.getRange("E2:E500").setDataValidation(regraPagamento);

  const rangeTipo = sheetLanc.getRange("D2:D500");

  const regraEntrada = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Entrada")
    .setBackground("#DCFCE7")
    .setFontColor("#166534")
    .setBold(true)
    .setRanges([rangeTipo])
    .build();

  const regraSaida = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Saída")
    .setBackground("#FEE2E2")
    .setFontColor("#991B1B")
    .setBold(true)
    .setRanges([rangeTipo])
    .build();

  sheetLanc.setConditionalFormatRules([regraEntrada, regraSaida]);

  sheetLanc.getRange("A2:A500").setNumberFormat("dd/mm/yyyy").setHorizontalAlignment("center");
  sheetLanc.getRange("B2:B500").setHorizontalAlignment("left");
  sheetLanc.getRange("C2:E500").setHorizontalAlignment("center");
  sheetLanc.getRange("F2:F500").setNumberFormat("R$ #,##0.00").setHorizontalAlignment("right");
  sheetLanc.getRange("A2:F500").setFontFamily("Inter").setFontSize(10).setVerticalAlignment("middle");

  const dadosExemplo = [
    [new Date(2027, 0, 5),  "Salário Mensal - Empresa",       "Salário",       "Entrada", "Pix",               6500.00],
    [new Date(2027, 0, 6),  "Aluguel + Condomínio",           "Moradia",       "Saída",   "Boleto",            2150.00],
    [new Date(2027, 0, 8),  "Supermercado Mensal",            "Alimentação",   "Saída",   "Cartão de Crédito",  845.90],
    [new Date(2027, 0, 10), "Aporte Tesouro Selic",            "Investimentos", "Saída",   "Pix",               1000.00],
    [new Date(2027, 0, 12), "Abastecimento / Combustível",    "Transporte",    "Saída",   "Débito",             220.00],
    [new Date(2027, 0, 15), "Consultoria Freelance UI/UX",    "Renda Extra",   "Entrada", "Pix",               1200.00],
    [new Date(2027, 0, 18), "Plano de Saúde + Farmácia",      "Saúde",         "Saída",   "Cartão de Crédito",  480.50],
    [new Date(2027, 0, 21), "Curso de Especialização Online", "Educação",      "Saída",   "Cartão de Crédito",  199.90],
    [new Date(2027, 0, 25), "Jantar e Cinema Fim de Semana",  "Lazer",         "Saída",   "Cartão de Crédito",  260.00],
    [new Date(2027, 0, 28), "Conta de Energia e Internet",    "Moradia",       "Saída",   "Boleto",             310.40]
  ];

  sheetLanc.getRange(2, 1, dadosExemplo.length, 6).setValues(dadosExemplo);

  sheetLanc.getRange("A1:F11").setBorder(true, true, true, true, true, true, "#E2E8F0", SpreadsheetApp.BorderStyle.SOLID);
  sheetLanc.autoResizeColumns(1, 6);
  for (let col = 1; col <= 6; col++) {
    sheetLanc.setColumnWidth(col, sheetLanc.getColumnWidth(col) + 25);
  }

  // =========================================================================
  // 3. ABA "DASHBOARD 2027"
  // =========================================================================
  sheetDash.getRange("A1:J35").setBackground("#F8FAFC").setFontFamily("Inter");

  const rangeTitulo = sheetDash.getRange("B2:H3");
  rangeTitulo.merge()
    .setValue("CONTROLE FINANCEIRO 2027")
    .setBackground("#1E293B")
    .setFontColor("#FFFFFF")
    .setFontSize(18)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");

  sheetDash.setRowHeight(1, 20);
  sheetDash.setRowHeight(2, 25);
  sheetDash.setRowHeight(3, 25);
  sheetDash.setRowHeight(4, 20);

  function criarCardKPI(colInicio, titulo, formula, corFundo, corTextoTitulo, corValor) {
    const rangeLabel = sheetDash.getRange(5, colInicio, 1, 2);
    const rangeValor = sheetDash.getRange(6, colInicio, 2, 2);
    const rangeCardTotal = sheetDash.getRange(5, colInicio, 3, 2);

    rangeLabel.merge()
      .setValue(titulo)
      .setBackground(corFundo)
      .setFontColor(corTextoTitulo)
      .setFontSize(10)
      .setFontWeight("bold")
      .setHorizontalAlignment("center")
      .setVerticalAlignment("bottom");

    rangeValor.merge()
      .setFormula(formula)
      .setBackground(corFundo)
      .setFontColor(corValor)
      .setFontSize(18)
      .setFontWeight("bold")
      .setNumberFormat("R$ #,##0.00")
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle");

    rangeCardTotal.setBorder(true, true, true, true, false, false, "#CBD5E1", SpreadsheetApp.BorderStyle.SOLID);
  }

  sheetDash.setRowHeight(5, 28);
  sheetDash.setRowHeight(6, 25);
  sheetDash.setRowHeight(7, 25);

  // Cartão 1: Total de Entradas (B6)
  criarCardKPI(
    2,
    "TOTAL DE ENTRADAS",
    '=SUMIF(' + nomeAbaLancamentos + '!D2:D500; "Entrada"; ' + nomeAbaLancamentos + '!F2:F500)',
    "#FFFFFF", "#475569", "#16A34A"
  );

  // Cartão 2: Total de Saídas (E6)
  criarCardKPI(
    5,
    "TOTAL DE SAÍDAS",
    '=SUMIF(' + nomeAbaLancamentos + '!D2:D500; "Saída"; ' + nomeAbaLancamentos + '!F2:F500)',
    "#FFFFFF", "#475569", "#DC2626"
  );

  // Cartão 3: Saldo Atual (H6)
  criarCardKPI(
    8,
    "SALDO ATUAL",
    "=B6-E6",
    "#FFFFFF", "#475569", "#1E293B"
  );

  sheetDash.setRowHeight(8, 25);

  const tituloTabela = sheetDash.getRange("B9:C9");
  tituloTabela.merge()
    .setValue("GASTOS POR CATEGORIA")
    .setBackground("#1E293B")
    .setFontColor("#FFFFFF")
    .setFontSize(11)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");
  sheetDash.setRowHeight(9, 32);

  sheetDash.getRange("B10:C10")
    .setValues([["Categoria", "Total Gasto"]])
    .setBackground("#E2E8F0")
    .setFontColor("#1E293B")
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");
  sheetDash.setRowHeight(10, 26);

  const categoriasDespesa = [
    ["Moradia"],
    ["Alimentação"],
    ["Transporte"],
    ["Saúde"],
    ["Lazer"],
    ["Educação"],
    ["Investimentos"]
  ];

  const linhaInicialCat = 11;
  const qtdCat = categoriasDespesa.length;

  sheetDash.getRange(linhaInicialCat, 2, qtdCat, 1)
    .setValues(categoriasDespesa)
    .setBackground("#FFFFFF")
    .setFontColor("#334155")
    .setFontWeight("medium")
    .setHorizontalAlignment("left")
    .setVerticalAlignment("middle");

  const formulasCategorias = [];
  for (let i = 0; i < qtdCat; i++) {
    const linhaAtual = linhaInicialCat + i;
    formulasCategorias.push([
      \`=SUMIFS(\${nomeAbaLancamentos}!$F$2:$F$500; \${nomeAbaLancamentos}!$C$2:$C$500; B\${linhaAtual}; \${nomeAbaLancamentos}!$D$2:$D$500; "Saída")\`
    ]);
    sheetDash.setRowHeight(linhaAtual, 25);
  }

  sheetDash.getRange(linhaInicialCat, 3, qtdCat, 1)
    .setFormulas(formulasCategorias)
    .setBackground("#FFFFFF")
    .setFontColor("#0F172A")
    .setNumberFormat("R$ #,##0.00")
    .setHorizontalAlignment("right")
    .setVerticalAlignment("middle");

  const linhaTotalTabela = linhaInicialCat + qtdCat;
  sheetDash.getRange(linhaTotalTabela, 2).setValue("TOTAL GERAL");
  sheetDash.getRange(linhaTotalTabela, 3).setFormula(\`=SUM(C\${linhaInicialCat}:C\${linhaTotalTabela - 1})\`);

  sheetDash.getRange(linhaTotalTabela, 2, 1, 2)
    .setBackground("#F1F5F9")
    .setFontColor("#1E293B")
    .setFontWeight("bold")
    .setVerticalAlignment("middle");
  sheetDash.getRange(linhaTotalTabela, 3).setNumberFormat("R$ #,##0.00");
  sheetDash.setRowHeight(linhaTotalTabela, 28);

  sheetDash.getRange(9, 2, qtdCat + 3, 2)
    .setBorder(true, true, true, true, true, true, "#CBD5E1", SpreadsheetApp.BorderStyle.SOLID);

  sheetDash.setColumnWidth(1, 25);
  sheetDash.setColumnWidth(2, 160);
  sheetDash.setColumnWidth(3, 140);
  sheetDash.setColumnWidth(4, 25);
  sheetDash.setColumnWidth(5, 140);
  sheetDash.setColumnWidth(6, 140);
  sheetDash.setColumnWidth(7, 25);
  sheetDash.setColumnWidth(8, 140);
  sheetDash.setColumnWidth(9, 140);
  sheetDash.setColumnWidth(10, 25);

  SpreadsheetApp.flush();

  const rangeDadosGrafico = sheetDash.getRange(linhaInicialCat, 2, qtdCat, 2);

  const chart = sheetDash.newChart()
    .setChartType(Charts.ChartType.PIE)
    .addRange(rangeDadosGrafico)
    .setNumHeaders(0)
    .setOption("title", "Distribuição de Gastos por Categoria")
    .setOption("pieHole", 0.5)
    .setOption("colors", ["#1E293B", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"])
    .setOption("backgroundColor", "#FFFFFF")
    .setOption("legend", { position: "right", textStyle: { color: "#334155", fontSize: 11 } })
    .setOption("titleTextStyle", { color: "#1E293B", fontSize: 13, bold: true })
    .setOption("chartArea", { left: 20, top: 45, width: "90%", height: "75%" })
    .setPosition(9, 5, 0, 0)
    .setOption("width", 610)
    .setOption("height", 265)
    .build();

  sheetDash.insertChart(chart);

  ss.setActiveSheet(sheetDash);

  ui.alert("Sucesso!", "Sua Planilha Financeira 2027 foi criada com sucesso!", ui.ButtonSet.OK);
}`,
      },
      {
        tipo: 'subtitulo',
        texto: 'Passo 2: Cole e execute no Google Sheets',
      },
      {
        tipo: 'lista',
        ordenada: true,
        itens: [
          'Acesse `sheets.new` para abrir uma planilha em branco no Google Sheets.',
          'No menu superior, clique em **Extensões → Apps Script**.',
          'Na tela que abrir, apague todo o texto padrão (`function myFunction() { }`).',
          'Cole o código que você copiou no Passo 1.',
          'Clique no ícone de **Salvar projeto** (disquete) no topo e depois clique em **Executar**.',
        ],
      },
      {
        tipo: 'subtitulo',
        texto: 'Passo 3: Como liberar a permissão do Google (sem medo)',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Na primeira vez que você rodar um script próprio, o Google exibirá um aviso de segurança padrão. Veja como liberar em segundos:',
      },
      {
        tipo: 'lista',
        ordenada: true,
        itens: [
          'Clique em **Revisar permissões** e selecione sua conta Google.',
          'Na tela *"O Google não verificou este app"*, clique em **Avançado** (no canto inferior esquerdo).',
          'Clique em **Acessar Projeto sem título (não seguro)**.',
          'Clique em **Permitir**.',
        ],
      },
      {
        tipo: 'dica',
        titulo: 'Por que esse aviso aparece?',
        texto:
          'Porque o script está rodando diretamente dentro da sua própria planilha e não passou por uma loja pública de aplicativos. Ele só tem acesso a esse arquivo.',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Volte para a aba da planilha e clique em **OK** na mensagem *"Sua Planilha Financeira 2027 foi criada com sucesso!"*. Quando for usar para valer, basta apagar as 10 linhas de exemplo na aba `Lancamentos` (linhas 2 a 11) e registrar os seus dados.',
      },
      {
        tipo: 'subtitulo',
        texto: 'Bônus: Use a IA como seu consultor financeiro mensal',
      },
      {
        tipo: 'paragrafo',
        texto:
          'No último dia de cada mês, selecione a tabela de **Gastos por Categoria** na aba `Dashboard 2027`, copie (`Ctrl + C`) e cole no **Google Gemini** junto com este comando:',
      },
      {
        tipo: 'codigo',
        linguagem: 'Prompt Gemini',
        titulo: 'Consultor financeiro mensal no Google Gemini',
        conteudo: `Atue como um consultor financeiro prático e direto. Abaixo está o resumo dos meus gastos deste mês. Analise os números, aponte os 2 maiores vazamentos de dinheiro do meu orçamento e me dê 3 ações concretas e realistas para reduzir esses custos no mês que vem.`,
      },
      {
        tipo: 'paragrafo',
        texto:
          'Em segundos, você terá um plano de ação baseado na sua realidade financeira, sem precisar pagar por consultoria ou aplicativos por assinatura.',
      },
      {
        tipo: 'cta',
        titulo: 'Quer levar o Google Workspace com Gemini para o seu negócio?',
        texto:
          'Conheça os planos oficiais do Google Workspace pelo meu link de indicação. Eu também tenho **códigos promocionais exclusivos** — me chame no WhatsApp **(37) 99904-6824** para garantir o seu desconto.',
        textoBotao: 'Conhecer o Google Workspace',
        link: 'https://sharegoogleworkspace.advocate.impact.com/mzZ2zF7',
      },
      {
        tipo: 'subtitulo',
        texto: 'Perguntas Frequentes',
      },
      {
        tipo: 'paragrafo',
        texto:
          '**Funciona no celular?** Para rodar o Apps Script pela primeira vez, você precisa de um computador. Depois que a planilha é criada, você pode abrir e lançar seus gastos normalmente pelo aplicativo do Google Sheets no celular.',
      },
      {
        tipo: 'paragrafo',
        texto:
          '**Posso mudar as categorias?** Sim! Basta editar os nomes dentro da lista `categorias` e `categoriasDespesa` no código antes de clicar em **Executar** novamente.',
      },
    ],
  },
  {
    id: '6',
    slug: 'app-web-financas-pessoais-google-planilhas',
    titulo:
      'Como criar um App Web de Finanças Pessoais ligado ao Google Planilhas (grátis)',
    resumo:
      'Transforme sua planilha de gastos em um aplicativo web rápido para usar no celular ou computador, salvando entradas, saídas e saldo em tempo real direto no Google Sheets.',
    categoria: 'Gestão Financeira',
    data: '23 Nov 2026',
    tempoLeitura: '8 min de leitura',
    youtubeId: 'W6Jh1k85fjY',
    linkTemplate: '',
    tituloTemplate: 'App Web de Finanças Pessoais + Planilha Google Integrada',
    descricaoTemplate:
      'Receba a planilha pronta com o código completo de Apps Script e a interface HTML responsiva já configurada para publicar seu app financeiro em menos de 5 minutos.',
    itensTemplate: [
      'Planilha Google estruturada com aba Lançamentos e resumo automático',
      'Código Codigo.gs pronto para gravar lançamentos e calcular saldo',
      'Interface web responsiva (Index.html) pronta para fixar na tela do celular',
    ],
    blocosDeConteudo: [
      {
        tipo: 'paragrafo',
        texto:
          'Anotar gastos no dia a dia abrindo uma planilha pequena no celular quase sempre vira motivo para desistir do controle financeiro. A solução mais prática — e **100% gratuita** — é criar um **App Web ligado diretamente ao Google Planilhas** usando o Google Apps Script.',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Assista ao vídeo acima para ver o aplicativo funcionando na prática e siga o passo a passo abaixo com os códigos prontos para montar o seu próprio app de finanças pessoais.',
      },
      {
        tipo: 'subtitulo',
        texto: '1. Prepare a planilha base no Google Sheets',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Crie uma nova planilha no Google Drive, renomeie a primeira aba para `Lancamentos` e adicione exatamente estas 6 colunas na linha 1:',
      },
      {
        tipo: 'lista',
        ordenada: true,
        itens: [
          'Coluna A: `Data`',
          'Coluna B: `Tipo` (Entrada ou Saída)',
          'Coluna C: `Categoria` (Moradia, Alimentação, Transporte, Lazer, Salário, Extra...)',
          'Coluna D: `Descrição`',
          'Coluna E: `Valor`',
          'Coluna F: `Pagamento` (Pix, Cartão de Crédito, Débito, Dinheiro)',
        ],
      },
      {
        tipo: 'subtitulo',
        texto: '2. Crie o backend gratuito no Google Apps Script (Codigo.gs)',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Na sua planilha, clique em **Extensões → Apps Script**, apague o código padrão do arquivo `Codigo.gs` e cole o script abaixo. Ele abre a tela do app (`doGet`), salva cada novo lançamento na última linha e devolve os totais atualizados de entradas, saídas e saldo.',
      },
      {
        tipo: 'codigo',
        linguagem: 'Google Apps Script',
        titulo: 'Codigo.gs — Conexão entre App Web e Google Planilhas',
        conteudo: `/**
 * Exibe a interface HTML quando o link do App Web for aberto.
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Minhas Finanças — App Web')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Grava um novo lançamento na aba "Lancamentos" e retorna o resumo atualizado.
 */
function salvarLancamento(dados) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const aba = ss.getSheetByName('Lancamentos');

  if (!aba) {
    throw new Error('Aba "Lancamentos" não encontrada na planilha.');
  }

  const valorNumerico = parseFloat(String(dados.valor).replace(',', '.'));
  if (isNaN(valorNumerico) || valorNumerico <= 0) {
    throw new Error('Informe um valor numérico válido maior que zero.');
  }

  aba.appendRow([
    dados.data || Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'yyyy-MM-dd'),
    dados.tipo,
    dados.categoria,
    dados.descricao,
    valorNumerico,
    dados.pagamento
  ]);

  return buscarResumoFinanceiro();
}

/**
 * Calcula total de entradas, saídas, saldo atual e últimos 5 lançamentos.
 */
function buscarResumoFinanceiro() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const aba = ss.getSheetByName('Lancamentos');
  const linhas = aba.getDataRange().getValues();

  let entradas = 0;
  let saidas = 0;
  const recentes = [];

  for (let i = 1; i < linhas.length; i++) {
    const [data, tipo, categoria, descricao, valor, pagamento] = linhas[i];
    const num = Number(valor) || 0;

    if (tipo === 'Entrada') {
      entradas += num;
    } else if (tipo === 'Saída') {
      saidas += num;
    }

    recentes.push({
      data: data instanceof Date
        ? Utilities.formatDate(data, 'America/Sao_Paulo', 'dd/MM/yyyy')
        : String(data),
      tipo,
      categoria,
      descricao,
      valor: num,
      pagamento
    });
  }

  return {
    entradas,
    saidas,
    saldo: entradas - saidas,
    recentes: recentes.slice(-5).reverse()
  };
}`,
      },
      {
        tipo: 'subtitulo',
        texto: '3. Crie a tela do aplicativo (Index.html)',
      },
      {
        tipo: 'paragrafo',
        texto:
          'No menu esquerdo do Apps Script, clique no botão **+** ao lado de **Arquivos**, escolha **HTML** e dê o nome exato de `Index`. Cole o código abaixo para ter um formulário rápido com resumo de saldo no topo.',
      },
      {
        tipo: 'codigo',
        linguagem: 'HTML / JavaScript',
        titulo: 'Index.html — Interface do App Web de Finanças',
        conteudo: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: system-ui, sans-serif; background: #FAFAFC; color: #18181B; margin: 0; padding: 16px; }
    .container { max-width: 480px; margin: 0 auto; }
    .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px; }
    .card { background: #fff; border: 1px solid #E4E4E7; border-radius: 10px; padding: 12px; }
    .card small { color: #52525B; font-size: 11px; display: block; }
    .card strong { font-size: 15px; }
    form { background: #fff; border: 1px solid #E4E4E7; border-radius: 12px; padding: 16px; display: grid; gap: 10px; }
    input, select, button { padding: 10px; border-radius: 8px; border: 1px solid #E4E4E7; font-size: 14px; }
    button { background: #7C3AED; color: #fff; border: none; font-weight: 600; cursor: pointer; }
    button:disabled { opacity: 0.6; }
    #status { font-size: 13px; color: #10B981; min-height: 18px; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Minhas Finanças</h2>

    <div class="cards">
      <div class="card"><small>Entradas</small><strong id="entradas">R$ 0,00</strong></div>
      <div class="card"><small>Saídas</small><strong id="saidas">R$ 0,00</strong></div>
      <div class="card"><small>Saldo</small><strong id="saldo">R$ 0,00</strong></div>
    </div>

    <form id="formFinancas">
      <input type="date" id="data" required />
      <select id="tipo">
        <option value="Saída">Saída (Despesa)</option>
        <option value="Entrada">Entrada (Receita)</option>
      </select>
      <select id="categoria">
        <option>Alimentação</option>
        <option>Moradia</option>
        <option>Transporte</option>
        <option>Assinaturas</option>
        <option>Lazer</option>
        <option>Salário / Receita</option>
        <option>Outros</option>
      </select>
      <input type="text" id="descricao" placeholder="Descrição (ex: Mercado)" required />
      <input type="number" step="0.01" id="valor" placeholder="Valor (ex: 85.50)" required />
      <select id="pagamento">
        <option>Pix</option>
        <option>Cartão de Crédito</option>
        <option>Débito</option>
        <option>Dinheiro</option>
      </select>
      <button type="submit" id="btnSalvar">Registrar lançamento</button>
      <div id="status"></div>
    </form>
  </div>

  <script>
    const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    function atualizarCards(resumo) {
      document.getElementById('entradas').textContent = fmt(resumo.entradas);
      document.getElementById('saidas').textContent = fmt(resumo.saidas);
      document.getElementById('saldo').textContent = fmt(resumo.saldo);
    }

    document.getElementById('data').valueAsDate = new Date();
    google.script.run.withSuccessHandler(atualizarCards).buscarResumoFinanceiro();

    document.getElementById('formFinancas').addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = document.getElementById('btnSalvar');
      const status = document.getElementById('status');
      btn.disabled = true;
      status.textContent = 'Salvando na planilha...';

      const payload = {
        data: document.getElementById('data').value,
        tipo: document.getElementById('tipo').value,
        categoria: document.getElementById('categoria').value,
        descricao: document.getElementById('descricao').value,
        valor: document.getElementById('valor').value,
        pagamento: document.getElementById('pagamento').value
      };

      google.script.run
        .withSuccessHandler(function (resumo) {
          atualizarCards(resumo);
          document.getElementById('descricao').value = '';
          document.getElementById('valor').value = '';
          status.textContent = 'Lançamento salvo no Google Planilhas!';
          btn.disabled = false;
        })
        .withFailureHandler(function (err) {
          status.style.color = '#EF4444';
          status.textContent = 'Erro: ' + err.message;
          btn.disabled = false;
        })
        .salvarLancamento(payload);
    });
  </script>
</body>
</html>`,
      },
      {
        tipo: 'subtitulo',
        texto: '4. Publique como App da Web e adicione na tela inicial do celular',
      },
      {
        tipo: 'lista',
        ordenada: true,
        itens: [
          'No canto superior direito do Apps Script, clique em **Implantar → Nova implantação**.',
          'Clique na engrenagem e selecione o tipo **App da Web**.',
          'Em **Executar como**, deixe sua conta Google. Em **Quem pode acessar**, escolha **Somente eu** para manter seus dados financeiros 100% privados.',
          'Clique em **Implantar**, autorize o acesso à planilha e copie a URL gerada.',
          'Abra esse link no navegador do seu celular (Chrome ou Safari) e toque em **Adicionar à tela inicial** para usá-lo como um aplicativo nativo.',
        ],
      },
      {
        tipo: 'dica',
        titulo: 'Privacidade e evolução do seu app',
        texto:
          'Como todos os dados ficam na sua própria conta do Google Drive, você não depende de aplicativos pagos nem compartilha senhas bancárias. E se quiser deixar o controle ainda mais inteligente, basta combinar essa planilha com o tutorial de análise de finanças usando Gemini.',
      },
    ],
  },
  {
    id: '1',
    slug: 'gemini-funcao-ai-google-sheets-financas-gratis',
    titulo:
      'Como usar o Gemini e a função =AI no Google Sheets para analisar suas finanças grátis',
    resumo:
      'Aprenda a estruturar uma planilha de gastos limpa, categorizar despesas automaticamente com fórmulas de IA e gerar um diagnóstico mensal de onde cortar custos.',
    categoria: 'Gestão Financeira',
    data: '18 Nov 2026',
    tempoLeitura: '7 min de leitura',
    // Cole aqui o ID de 11 caracteres do YouTube (ex: "dQw4w9WgXcQ") para exibir o vídeo no topo:
    youtubeId: '',
    linkTemplate: '',
    tituloTemplate: 'Planilha de Controle Financeiro com IA no Google Sheets',
    descricaoTemplate:
      'Baixe a estrutura pronta com as abas Lançamentos, Resumo Mensal e os prompts configurados para classificar gastos e encontrar vazamentos no orçamento em segundos.',
    itensTemplate: [
      'Aba Lançamentos padronizada para importação de extrato CSV/OFX',
      'Fórmulas =AI prontas para categorização automática de despesas',
      'Painel de diagnóstico mensal com alertas de gastos fora da média',
    ],
    blocosDeConteudo: [
      {
        tipo: 'paragrafo',
        texto:
          'A maioria das planilhas financeiras é abandonada na segunda semana por um motivo simples: **categorizar linha por linha dá trabalho demais**. Quando você combina o Google Sheets com o Gemini — seja pela nova função nativa `=AI()` ou pelo fluxo gratuito no Gemini Web — o trabalho braçal desaparece e sobra tempo para decidir onde cortar custos.',
      },
      {
        tipo: 'subtitulo',
        texto: '1. Estruture a aba de gastos do jeito que a IA entende melhor',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Antes de escrever qualquer fórmula, crie uma aba chamada `Lancamentos` com colunas curtas e sem células mescladas. A inteligência artificial lê tabelas planas com muito mais precisão do que planilhas cheias de cores e subtítulos no meio das linhas.',
      },
      {
        tipo: 'lista',
        ordenada: true,
        itens: [
          'Coluna A: `Data` (formato DD/MM/AAAA)',
          'Coluna B: `Descrição` (exatamente como vem no extrato do banco ou cartão, ex: "UBER *TRIP", "IFOOD *REST")',
          'Coluna C: `Valor` (número positivo para entradas e negativo para saídas, ou coluna separada de Tipo)',
          'Coluna D: `Pagamento` (Pix, Cartão Crédito, Débito, Boleto)',
          'Coluna E: `Categoria IA` (onde nossa fórmula vai trabalhar automaticamente)',
        ],
      },
      {
        tipo: 'subtitulo',
        texto: '2. Categorize despesas automaticamente com a função =AI',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Na célula `E2`, você passa duas informações para a função `=AI()`: o **prompt com a lista fechada de categorias** e o **intervalo da linha** que ela deve analisar. Fechar a lista de categorias evita que a IA invente variações como "Comida", "Alimentação" e "Restaurante" para gastos parecidos.',
      },
      {
        tipo: 'codigo',
        linguagem: 'Google Sheets',
        titulo: 'Fórmula na célula E2 (arraste para baixo)',
        conteudo: `=AI(
  "Classifique a despesa em APENAS UMA destas categorias exatas: Moradia, Alimentação, Transporte, Assinaturas, Saúde, Lazer, Educação, Impostos ou Outros. Responda apenas o nome da categoria, sem ponto final.",
  B2:C2
)`,
      },
      {
        tipo: 'dica',
        titulo: 'Não tem acesso à função =AI na sua conta gratuita ainda?',
        texto:
          'A função `=AI()` exige um plano Google Workspace com Gemini ou Google One AI Pro. Se você usa uma conta Gmail 100% gratuita, use o mesmo método sem pagar nada: selecione as colunas A:D, copie e cole no gemini.google.com junto com o prompt de diagnóstico abaixo.',
      },
      {
        tipo: 'subtitulo',
        texto: '3. Crie um resumo mensal automático de onde cortar custos',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Depois de categorizar os gastos, crie uma tabela dinâmica ou use `SOMASE` na aba `Resumo` para somar o total por categoria (`A2:B10`). Em seguida, use uma segunda célula com `=AI()` para gerar um plano direto de redução de custos baseado nos seus números reais.',
      },
      {
        tipo: 'codigo',
        linguagem: 'Google Sheets',
        titulo: 'Diagnóstico mensal automático na aba Resumo',
        conteudo: `=AI(
  "Você é um analista financeiro direto ao ponto. Analise este resumo mensal de gastos em reais (R$). Liste: 1) As 2 categorias que mais pesaram no orçamento com o percentual estimado; 2) Onde existem sinais de gastos invisíveis ou assinaturas acumuladas; 3) Três ações práticas para economizar pelo menos 15% no próximo mês.",
  A2:B10
)`,
      },
      {
        tipo: 'subtitulo',
        texto: '4. Prompt pronto para usar no Gemini Gratuito (sem pagar assinatura)',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Se preferir exportar o extrato em CSV do seu banco e jogar direto no Gemini gratuito, copie este prompt estruturado. Ele devolve uma tabela pronta para colar de volta no Google Sheets já categorizada.',
      },
      {
        tipo: 'codigo',
        linguagem: 'Prompt Gemini',
        titulo: 'Análise completa de extrato no gemini.google.com',
        conteudo: `Atue como meu analista financeiro pessoal. Abaixo estão meus lançamentos do mês (Data, Descrição, Valor).

Execute estas 3 tarefas:
1. Retorne uma tabela pronta para copiar no Google Sheets com as colunas: Data | Descrição | Valor | Categoria | Essencial (Sim/Não).
   Use apenas as categorias: Moradia, Alimentação, Transporte, Assinaturas, Saúde, Lazer, Educação, Trabalho, Outros.
2. Identifique cobranças recorrentes ou pequenos gastos frequentes (ex: delivery, apps, taxas) que somados passam de R$ 200 no mês.
3. Escreva um plano objetivo de 3 cortes imediatos para o próximo mês, estimando quantos reais eu economizo com cada corte.

Meus dados:
[COLE AQUI AS LINHAS DO SEU EXTRATO OU PLANILHA]`,
      },
      {
        tipo: 'subtitulo',
        texto: '5. Rotina de 10 minutos no dia 1º de cada mês',
      },
      {
        tipo: 'lista',
        ordenada: true,
        itens: [
          'Baixe o extrato CSV do banco e do cartão de crédito do mês anterior.',
          'Cole na aba `Lancamentos` e rode a categorização automática.',
          'Confira apenas os itens classificados como "Outros" para ajustar exceções.',
          'Leia o diagnóstico gerado pela IA e defina 1 teto de gasto por categoria para o mês seguinte.',
        ],
      },
    ],
  },
  {
    id: '2',
    slug: 'gerador-automatico-propostas-pdf-forms-docs-gemini',
    titulo:
      'Gerador Automático de Propostas Comerciais em PDF com Google Forms, Docs e Gemini',
    resumo:
      'Monte um fluxo 100% automatizado que lê as respostas de um formulário, usa o Gemini para personalizar o texto da proposta, gera o PDF no Google Docs e envia por Gmail.',
    categoria: 'Automação Comercial',
    data: '12 Nov 2026',
    tempoLeitura: '9 min de leitura',
    youtubeId: '',
    linkTemplate: '',
    tituloTemplate: 'Kit Gerador de Propostas PDF (Forms + Docs + Apps Script)',
    descricaoTemplate:
      'Receba o modelo de documento no Google Docs com todos os marcadores configurados, o formulário de briefing e o código Apps Script pronto para copiar e ativar.',
    itensTemplate: [
      'Modelo profissional de Proposta Comercial no Google Docs com variáveis {{}}',
      'Google Forms de briefing comercial conectado à planilha',
      'Código Google Apps Script comentado com envio automático de PDF via Gmail',
    ],
    blocosDeConteudo: [
      {
        tipo: 'paragrafo',
        texto:
          'Demorar dois dias para enviar uma proposta comercial esfria o cliente e faz você perder vendas fáceis. Com ferramentas gratuitas do Ecossistema Google, você pode transformar um formulário de briefing de 2 minutos em uma **proposta personalizada em PDF enviada direto no e-mail do cliente em menos de 30 segundos**.',
      },
      {
        tipo: 'subtitulo',
        texto: 'Como funciona a arquitetura do fluxo',
      },
      {
        tipo: 'lista',
        ordenada: true,
        itens: [
          '**Google Forms**: você (ou o próprio lead) preenche Nome, Empresa, E-mail, Desafio Principal, Serviço e Valor.',
          '**Google Sheets**: recebe automaticamente cada resposta do formulário como uma nova linha.',
          '**Gemini API via Apps Script**: lê o desafio do cliente e escreve um diagnóstico executivo e escopo sob medida.',
          '**Google Docs**: clona seu modelo visual, substitui variáveis como `{{CLIENTE}}` e `{{DIAGNOSTICO_IA}}` e exporta em PDF.',
          '**Gmail**: dispara o e-mail com o PDF anexado e salva o link da proposta na planilha.',
        ],
      },
      {
        tipo: 'subtitulo',
        texto: 'Passo 1: Prepare o modelo no Google Docs',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Crie um documento bonito com sua identidade visual e coloque os seguintes marcadores exatamente onde o texto deve mudar: `{{DATA}}`, `{{CLIENTE}}`, `{{EMPRESA}}`, `{{DIAGNOSTICO_IA}}`, `{{SERVICO}}` e `{{VALOR}}`. Copie o ID do documento na URL (o código entre `/d/` e `/edit`).',
      },
      {
        tipo: 'subtitulo',
        texto: 'Passo 2: Cole o código no Google Apps Script',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Na planilha vinculada ao seu Google Forms, clique em **Extensões → Apps Script**, apague o código inicial e cole o script completo abaixo. Guarde sua chave da API do Gemini nas **Propriedades do Script** (`GEMINI_API_KEY`) para manter o projeto seguro.',
      },
      {
        tipo: 'codigo',
        linguagem: 'Google Apps Script',
        titulo: 'Codigo.gs — Gerador de Proposta PDF com Gemini',
        conteudo: `/**
 * Acionado automaticamente ao enviar o Google Forms.
 * Configure o acionador em: Acionadores -> Adicionar -> Ao enviar formulário.
 */
const TEMPLATE_DOC_ID = 'COLE_AQUI_O_ID_DO_SEU_GOOGLE_DOCS';
const PASTA_DESTINO_ID = 'COLE_AQUI_O_ID_DA_PASTA_NO_DRIVE';

function gerarPropostaAutomatica(e) {
  const respostas = e.namedValues;

  const cliente = respostas['Nome do Cliente']?.[0] || 'Cliente';
  const empresa = respostas['Empresa']?.[0] || 'Sua Empresa';
  const email = respostas['E-mail']?.[0];
  const desafio = respostas['Principal Desafio']?.[0] || '';
  const servico = respostas['Serviço Indicado']?.[0] || '';
  const valor = respostas['Valor Investimento']?.[0] || '';

  if (!email) {
    throw new Error('E-mail do cliente não preenchido no formulário.');
  }

  // 1. Gera o texto persuasivo personalizado com o Gemini
  const diagnosticoIA = chamarGeminiParaProposta(cliente, empresa, desafio, servico);

  // 2. Clona o documento modelo na pasta de propostas
  const pasta = DriveApp.getFolderById(PASTA_DESTINO_ID);
  const modelo = DriveApp.getFileById(TEMPLATE_DOC_ID);
  const nomeArquivo = 'Proposta Comercial - ' + empresa + ' (' + Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'dd-MM-yyyy') + ')';
  const copiaArquivo = modelo.makeCopy(nomeArquivo, pasta);

  // 3. Substitui os marcadores no Google Docs
  const doc = DocumentApp.openById(copiaArquivo.getId());
  const corpo = doc.getBody();

  corpo.replaceText('{{DATA}}', Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'dd/MM/yyyy'));
  corpo.replaceText('{{CLIENTE}}', cliente);
  corpo.replaceText('{{EMPRESA}}', empresa);
  corpo.replaceText('{{SERVICO}}', servico);
  corpo.replaceText('{{VALOR}}', valor);
  corpo.replaceText('{{DIAGNOSTICO_IA}}', diagnosticoIA);
  doc.saveAndClose();

  // 4. Converte para PDF e envia por Gmail
  const pdfBlob = copiaArquivo.getAs(MimeType.PDF).setName(nomeArquivo + '.pdf');
  const arquivoPdf = pasta.createFile(pdfBlob);

  GmailApp.sendEmail(
    email,
    'Proposta Comercial — ' + empresa,
    'Olá, ' + cliente + '!\\n\\nConforme conversamos, segue em anexo a proposta comercial personalizada para a ' + empresa + '.\\n\\nFico à disposição para alinharmos os próximos passos.\\n\\nUm abraço,\\nLais Raniele',
    { attachments: [pdfBlob] }
  );

  // 5. Registra o link do PDF na última coluna da planilha
  const aba = e.range.getSheet();
  aba.getRange(e.range.getRow(), aba.getLastColumn()).setValue(arquivoPdf.getUrl());
}

function chamarGeminiParaProposta(cliente, empresa, desafio, servico) {
  const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + apiKey;

  const prompt = [
    'Escreva um parágrafo executivo de diagnóstico e proposta de valor (máximo 120 palavras) em português do Brasil.',
    'Tom: consultivo, claro, profissional e sem clichês.',
    'Cliente: ' + cliente + ' (' + empresa + ')',
    'Desafio relatado: ' + desafio,
    'Solução proposta: ' + servico,
    'Estruture em 2 parágrafos curtos: cenário atual e impacto prático da solução.'
  ].join('\\n');

  const payload = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });

  const json = JSON.parse(response.getContentText());
  return json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
    'Estruturamos um plano sob medida para resolver o cenário atual da ' + empresa + ' com foco em eficiência operacional.';
}`,
      },
      {
        tipo: 'subtitulo',
        texto: 'Passo 3: Ative o acionador automático (Trigger)',
      },
      {
        tipo: 'lista',
        ordenada: true,
        itens: [
          'No Apps Script, clique no ícone de engrenagem (**Configurações do projeto**) e adicione a propriedade de script `GEMINI_API_KEY` com sua chave do Google AI Studio.',
          'Clique no ícone de relógio (**Acionadores**) no menu esquerdo e clique em **Adicionar acionador**.',
          'Escolha a função `gerarPropostaAutomatica`, origem **Da planilha** e tipo de evento **Ao enviar formulário**.',
          'Salve, autorize as permissões da sua conta Google e faça um envio de teste com seu próprio e-mail.',
        ],
      },
      {
        tipo: 'dica',
        titulo: 'Quer revisar antes de enviar para o cliente?',
        texto:
          'Troque `GmailApp.sendEmail(...)` por `GmailApp.createDraft(...)` no código acima. Assim a automação cria o e-mail completo com o PDF anexado direto na sua pasta Rascunhos do Gmail para você só conferir e clicar em Enviar.',
      },
    ],
  },
  {
    id: '3',
    slug: 'como-criar-gems-gemini-automatizar-vendas-atendimento',
    titulo:
      'Como criar Assistentes de IA (Gems) no Gemini para automatizar vendas e atendimento',
    resumo:
      'Guia direto para configurar um Gem vendedor e atendente no Gemini com sua base de produtos, regras de qualificação e respostas prontas para objeções.',
    categoria: 'Automação Comercial',
    data: '05 Nov 2026',
    tempoLeitura: '6 min de leitura',
    youtubeId: '',
    linkTemplate: '',
    tituloTemplate: 'Pacote de Instruções + Base de Conhecimento para Gems de Vendas',
    descricaoTemplate:
      'Copie o documento modelo de Base de Conhecimento (FAQ, tabela de preços e objeções) formatado para fazer upload no seu Gem e dobrar a qualidade das respostas.',
    itensTemplate: [
      'Prompt mestre validado para atendimento consultivo e fechamento',
      'Modelo de arquivo Base_Comercial.md para anexar no Gem',
      'Checklist com 12 perguntas de teste para calibrar antes de usar',
    ],
    blocosDeConteudo: [
      {
        tipo: 'paragrafo',
        texto:
          'Se você repete as mesmas explicações todos os dias no WhatsApp, Instagram ou e-mail — preço, prazo, como funciona, por que vale a pena — um **Gem no Gemini** resolve 80% desse trabalho em segundos. Diferente de um chat comum onde você precisa reexplicar o contexto toda vez, um Gem guarda permanentemente suas instruções, seu tom de voz e seus documentos comerciais.',
      },
      {
        tipo: 'subtitulo',
        texto: 'O que você precisa antes de criar seu Gem',
      },
      {
        tipo: 'lista',
        ordenada: false,
        itens: [
          'Um arquivo simples (Google Docs ou PDF) chamado `Base_Comercial` contendo: descrição dos produtos/serviços, preços, formas de pagamento, prazos e as 10 dúvidas mais frequentes.',
          'Definição clara do próximo passo que o cliente deve dar (ex: agendar reunião, clicar no link de checkout ou preencher formulário).',
          'Regras rígidas do que a IA **não** pode prometer (descontos não autorizados, prazos impossíveis ou informações fora do documento).',
        ],
      },
      {
        tipo: 'subtitulo',
        texto: 'Passo a passo para montar no Gemini',
      },
      {
        tipo: 'lista',
        ordenada: true,
        itens: [
          'Acesse `gemini.google.com` e clique em **Gerenciador de Gems** no menu lateral esquerdo.',
          'Clique em **Novo Gem** e dê um nome objetivo, como `Assistente Comercial — Atendimento & Vendas`.',
          'Cole o prompt estruturado abaixo no campo **Instruções**.',
          'Em **Conhecimento**, clique em adicionar arquivo e conecte o Google Docs com sua tabela de serviços e FAQ.',
          'Use o painel de pré-visualização à direita para simular 3 clientes difíceis (um com pressa, um achando caro e um comparando com concorrente) e clique em **Salvar**.',
        ],
      },
      {
        tipo: 'subtitulo',
        texto: 'Prompt estruturado pronto para copiar nas instruções do Gem',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Substitua apenas os trechos entre colchetes `[ ]` pelas informações do seu negócio. A estrutura em blocos garante respostas curtas, humanas e prontas para copiar e colar no WhatsApp ou Direct.',
      },
      {
        tipo: 'codigo',
        linguagem: 'Prompt Gem',
        titulo: 'Instruções do Gem Vendedor / Atendente',
        conteudo: `# PAPEL E OBJETIVO
Você é o assistente comercial sênior da marca [NOME DA EMPRESA / SUA MARCA].
Seu trabalho é redigir respostas prontas para eu enviar aos clientes no WhatsApp, Instagram Direct ou e-mail, conduzindo a conversa com clareza até o próximo passo: [EX: AGENDAR DIAGNÓSTICO GRATUITO / FINALIZAR COMPRA NO LINK].

# TOM DE VOZ E FORMATO
- Escreva em português do Brasil natural, direto e acolhedor (sem parecer robô e sem exagerar em emojis).
- Respostas para WhatsApp/Direct devem ter no máximo 3 parágrafos curtos.
- Termine SEMPRE com uma única pergunta aberta ou chamada clara para o próximo passo.
- Nunca use frases genéricas como "Espero que esteja bem" ou "Qualquer dúvida estou à disposição".

# REGRAS DE QUALIFICAÇÃO (ANTES DE FALAR PREÇO)
Se o cliente perguntar apenas "qual o valor?", responda de forma educada apresentando o que está incluso em 1 frase e faça 1 pergunta curta para entender o cenário dele (ex: tamanho da equipe, objetivo principal ou urgência), usando os dados da Base de Conhecimento anexada.

# TRATAMENTO DE OBJEÇÕES
- "Está caro": valide a preocupação, reforce o retorno prático ou economia de tempo da oferta e ofereça a condição de parcelamento prevista na Base de Conhecimento.
- "Vou pensar": pergunte gentilmente qual ponto específico ainda gerou dúvida (escopo, prazo ou investimento) para ajudar na decisão.
- "Não tenho tempo agora": mostre como a implementação é rápida e proponha deixar um horário reservado para a próxima semana.

# LIMITES RÍGIDOS (GUARDRAILS)
- Consulte EXCLUSIVAMENTE os preços, prazos e condições do arquivo anexado em Conhecimento.
- NUNCA invente descontos, bônus ou garantias que não estejam no documento.
- Se faltar alguma informação técnica na base, avise: "[PRECISA DE CONFIRMAÇÃO HUMANA]" e sugira uma resposta segura enquanto eu verifico.

# COMO EU VOU USAR VOCÊ
Quando eu colar a mensagem de um cliente e o canal (ex: "WhatsApp: o cliente disse X"), entregue:
1. **Resposta pronta para enviar** (texto limpo para copiar e colar).
2. **Estratégia em 1 linha** (por que essa resposta ajuda a avançar a venda).`,
      },
      {
        tipo: 'dica',
        titulo: 'Truque de produtividade no dia a dia',
        texto:
          'Mantenha o arquivo de Base de Conhecimento no Google Drive (Google Docs). Sempre que você mudar um preço ou lançar uma oferta nova, basta atualizar o documento e re-sincronizar no Gem — não precisa reescrever o prompt inteiro.',
      },
    ],
  },
  {
    id: '4',
    slug: 'crm-gratuito-google-sheets-follow-up-automatico-ia',
    titulo:
      'CRM Gratuito no Google Sheets que escreve e-mails de follow-up sozinho com IA',
    resumo:
      'Construa um funil de vendas enxuto no Google Sheets com script pronto que lê o histórico de cada lead e gera rascunhos personalizados de follow-up no Gmail.',
    categoria: 'Automação Comercial',
    data: '28 Out 2026',
    tempoLeitura: '8 min de leitura',
    youtubeId: '',
    linkTemplate: '',
    tituloTemplate: 'Planilha CRM Comercial + Script de Follow-up com Gemini',
    descricaoTemplate:
      'Copie o CRM completo no Google Sheets com formatação condicional de leads atrasados, menu personalizado "IA Comercial" e gerador automático de rascunhos no Gmail.',
    itensTemplate: [
      'Aba Funil de Vendas com status em lista suspensa e alerta de dias sem contato',
      'Menu nativo "IA Comercial" dentro do Google Sheets',
      'Script pronto que grava o texto na planilha e cria rascunho no Gmail',
    ],
    blocosDeConteudo: [
      {
        tipo: 'paragrafo',
        texto:
          'A maior parte das vendas B2B e de serviços não é fechada no primeiro contato — ela acontece entre o **3º e o 5º follow-up**. O problema é lembrar de cobrar cada lead sem mandar aquele clássico *"Oi, conseguiu ver a proposta?"* que ninguém responde. Vamos montar um CRM gratuito no Google Sheets que cria rascunhos de follow-up contextuais com um clique.',
      },
      {
        tipo: 'subtitulo',
        texto: '1. Monte as colunas exatas do funil na aba CRM',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Crie uma aba chamada `CRM` com a linha 1 contendo exatamente estes cabeçalhos (colunas A até H). Quanto mais objetivo for o campo `Contexto`, melhor ficará o e-mail escrito pela IA.',
      },
      {
        tipo: 'lista',
        ordenada: false,
        itens: [
          'Coluna A: `Lead` (Nome do contato)',
          'Coluna B: `Empresa`',
          'Coluna C: `E-mail`',
          'Coluna D: `Status` (Lista suspensa: Novo, Proposta Enviada, Em Negociação, Ganho, Perdido)',
          'Coluna E: `Último Contato` (Data)',
          'Coluna F: `Contexto / Dor do Lead` (ex: "Quer automatizar envio de boletos, gostou do prazo mas precisa validar com sócio")',
          'Coluna G: `Próxima Ação` (ex: "Enviar follow-up" ou "Rascunho criado")',
          'Coluna H: `Rascunho Follow-up IA` (preenchido automaticamente pelo script)',
        ],
      },
      {
        tipo: 'subtitulo',
        texto: '2. Adicione o script com menu personalizado no Google Sheets',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Vá em **Extensões → Apps Script**, cole o código abaixo e salve. Ao recarregar a planilha, um novo menu chamado **IA Comercial** aparecerá no topo. Ele percorre apenas as linhas marcadas como `Proposta Enviada` ou `Em Negociação` que estão com a coluna `Rascunho Follow-up IA` vazia.',
      },
      {
        tipo: 'codigo',
        linguagem: 'Google Apps Script',
        titulo: 'CRM_FollowUp_IA.gs',
        conteudo: `/**
 * Cria o menu personalizado "IA Comercial" ao abrir a planilha.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('IA Comercial')
    .addItem('Gerar rascunhos de follow-up (Planilha + Gmail)', 'gerarFollowUpsComIA')
    .addToUi();
}

function gerarFollowUpsComIA() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const aba = ss.getSheetByName('CRM');
  if (!aba) {
    SpreadsheetApp.getUi().alert('Crie uma aba chamada exatamente "CRM".');
    return;
  }

  const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  if (!apiKey) {
    SpreadsheetApp.getUi().alert('Configure a propriedade GEMINI_API_KEY em Configurações do projeto.');
    return;
  }

  const dados = aba.getDataRange().getValues();
  let processados = 0;

  // Começa na linha 2 (índice 1) para pular o cabeçalho
  for (let i = 1; i < dados.length; i++) {
    const [lead, empresa, email, status, ultimoContato, contexto, proximaAcao, rascunhoAtual] = dados[i];

    const precisaFollowUp =
      (status === 'Proposta Enviada' || status === 'Em Negociação') &&
      email &&
      !rascunhoAtual;

    if (!precisaFollowUp) continue;

    const dataFormatada = ultimoContato instanceof Date
      ? Utilities.formatDate(ultimoContato, 'America/Sao_Paulo', 'dd/MM/yyyy')
      : String(ultimoContato || 'recentemente');

    const resultado = gerarEmailGemini(apiKey, {
      lead,
      empresa,
      status,
      dataFormatada,
      contexto,
      proximaAcao
    });

    // Salva o texto completo na coluna H (coluna 8)
    aba.getRange(i + 1, 8).setValue('Assunto: ' + resultado.assunto + '\\n\\n' + resultado.corpo);

    // Atualiza a coluna Próxima Ação (coluna 7)
    aba.getRange(i + 1, 7).setValue('Revisar rascunho no Gmail');

    // Cria automaticamente o rascunho pronto na sua conta do Gmail
    GmailApp.createDraft(email, resultado.assunto, resultado.corpo);
    processados++;
  }

  SpreadsheetApp.getUi().alert(
    processados > 0
      ? processados + ' rascunho(s) de follow-up criados na planilha e no seu Gmail!'
      : 'Nenhum lead pendente de follow-up encontrado.'
  );
}

function gerarEmailGemini(apiKey, info) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + apiKey;

  const prompt = [
    'Escreva um e-mail curto de follow-up comercial em português do Brasil (máximo 90 palavras).',
    'Regras: tom consultivo, humano, sem pressão exagerada e SEM usar "só passando para saber se viu".',
    'Lead: ' + info.lead + ' | Empresa: ' + info.empresa,
    'Etapa do funil: ' + info.status + ' | Último contato: ' + info.dataFormatada,
    'Contexto da conversa: ' + info.contexto,
    'Objetivo da próxima ação: ' + info.proximaAcao,
    'Retorne EXATAMENTE neste formato:',
    'ASSUNTO: <linha de assunto curta e natural>',
    'CORPO: <texto do e-mail pronto para envio>'
  ].join('\\n');

  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    muteHttpExceptions: true
  });

  const texto = JSON.parse(response.getContentText())
    ?.candidates?.[0]?.content?.parts?.[0]?.text || '';

  const matchAssunto = texto.match(/ASSUNTO:\\s*(.*)/i);
  const matchCorpo = texto.match(/CORPO:\\s*([\\s\\S]*)/i);

  return {
    assunto: matchAssunto ? matchAssunto[1].trim() : 'Próximos passos — ' + info.empresa,
    corpo: matchCorpo ? matchCorpo[1].trim() : texto.trim()
  };
}`,
      },
      {
        tipo: 'subtitulo',
        texto: '3. Fórmula bônus para destacar leads esquecidos há mais de 5 dias',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Quer saber visualmente quem precisa de atenção hoje? Adicione uma regra de **Formatação Condicional** na coluna `E` (`Último Contato`) usando a fórmula personalizada abaixo para destacar automaticamente os leads parados há mais de 5 dias úteis.',
      },
      {
        tipo: 'codigo',
        linguagem: 'Google Sheets',
        titulo: 'Formatação condicional para leads parados (> 5 dias)',
        conteudo: `=E(E2<>""; HOJE()-E2>=5; OU(D2="Proposta Enviada"; D2="Em Negociação"))`,
      },
    ],
  },
  {
    id: '5',
    slug: 'google-trends-com-gemini-descobrir-tendencias-clientes-2026',
    titulo:
      'Como usar o Google Trends com Gemini para descobrir tendências e atrair clientes em 2026',
    resumo:
      'Pare de produzir conteúdo no achismo: use o painel de IA do Google Trends combinado com o Gemini para validar produtos digitais, temas de vídeo e palavras-chave com demanda real.',
    categoria: 'IA & Google',
    data: '21 Out 2026',
    tempoLeitura: '6 min de leitura',
    youtubeId: '',
    linkTemplate: '',
    tituloTemplate: 'Radar de Tendências & Pauta de Conteúdo (Google Sheets + Prompts)',
    descricaoTemplate:
      'Planilha pronta para registrar termos em ascensão do Google Trends, calcular prioridade de pauta e transformar buscas reais em vídeos, artigos e ofertas.',
    itensTemplate: [
      'Matriz de Validação de Demanda no Google Sheets',
      'Prompts prontos para decodificar buscas em "Aumento Repentino"',
      'Calendário editorial de 30 dias orientado a intenção de compra',
    ],
    blocosDeConteudo: [
      {
        tipo: 'paragrafo',
        texto:
          'Um dos erros mais caros para quem cria conteúdo ou vende produtos digitais é gravar 10 vídeos e montar um curso inteiro antes de confirmar se **alguém está realmente procurando por aquilo no Google**. Em 2026, combinar os dados reais de busca do **Google Trends** com a capacidade de síntese do **Gemini** permite enxergar oportunidades semanas antes da concorrência.',
      },
      {
        tipo: 'subtitulo',
        texto: '1. O filtro certo no Google Trends para achar demanda compradora',
      },
      {
        tipo: 'paragrafo',
        texto:
          'A maioria das pessoas entra no Google Trends, digita uma palavra ampla e olha apenas o gráfico azul. O ouro está escondido nos filtros e na caixa **Pesquisas relacionadas → Em ascensão (Aumento repentino)**.',
      },
      {
        tipo: 'lista',
        ordenada: true,
        itens: [
          'Acesse `trends.google.com.br` e defina o local como **Brasil**.',
          'Ajuste o período para **Últimos 90 dias** (para vídeos e tendências rápidas) e depois compare com **Últimos 12 meses** (para saber se não é apenas um pico passageiro).',
          'Alterne o filtro de origem entre **Pesquisa na Web** (intenção de leitura/compra) e **Pesquisa do YouTube** (intenção de tutorial em vídeo).',
          'Exporte o CSV de **Consultas relacionadas em ascensão** clicando na setinha de download no canto superior direito do bloco.',
        ],
      },
      {
        tipo: 'subtitulo',
        texto: '2. Use o Gemini para separar curiosidade de intenção de compra',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Nem todo termo em alta gera clientes. Buscas com palavras como *"como fazer"*, *"planilha"*, *"template"*, *"automação"* e *"melhor ferramenta"* indicam dor prática — exatamente o perfil de quem baixa seus templates e compra consultorias ou produtos digitais. Suba o CSV exportado do Google Trends no Gemini e rode este prompt:',
      },
      {
        tipo: 'codigo',
        linguagem: 'Prompt Gemini',
        titulo: 'Prompt de Validação de Tendências e Ofertas',
        conteudo: `Atue como estrategista de SEO, YouTube e produtos digitais para o mercado brasileiro.
Estou enviando uma lista de consultas em ascensão extraídas do Google Trends no meu nicho: [SEU NICHO, EX: IA, GESTÃO FINANCEIRA E AUTOMAÇÃO COM GOOGLE].

Analise os termos e entregue:
1. **Top 5 termos com maior intenção prática/comercial** (descarte curiosidades genéricas ou notícias passageiras).
2. Para cada um dos 5 termos, sugira:
   - Um título de tutorial no YouTube com alta taxa de clique (claro, específico e sem clickbait vazio).
   - Um título de artigo técnico otimizado para o Google.
   - Uma ideia de isca digital ou template pago que resolve exatamente a dor de quem fez essa busca.
3. Aponte 2 lacunas (ângulos que quase ninguém está cobrindo bem ainda) para eu sair na frente nos próximos 30 dias.`,
      },
      {
        tipo: 'subtitulo',
        texto: '3. Fórmula simples no Google Sheets para priorizar o que produzir primeiro',
      },
      {
        tipo: 'paragrafo',
        texto:
          'Para não acumular dezenas de ideias soltas, jogue os temas validados numa aba `Pautas` com notas de 1 a 5 para **Crescimento no Trends (`B2`)**, **Intenção de Compra (`C2`)** e **Facilidade de Produção (`D2`)**. A fórmula abaixo dá peso dobrado para intenção de compra e ordena automaticamente o que você deve publicar esta semana:',
      },
      {
        tipo: 'codigo',
        linguagem: 'Google Sheets',
        titulo: 'Score de Prioridade Editorial na célula E2',
        conteudo: `=SE(B2=""; ""; ARRED((B2*0,35) + (C2*0,45) + (D2*0,20); 2))`,
      },
      {
        tipo: 'dica',
        titulo: 'Regra prática antes de lançar um produto digital',
        texto:
          'Publique primeiro 1 tutorial gratuito no YouTube e 1 artigo escrito atacando o termo com maior Score. Se o público comentar pedindo o template pronto ou tirar dúvidas sobre implementação, você acabou de validar seu próximo produto com risco zero.',
      },
    ],
  },
];

