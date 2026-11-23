# Automação Gratuita de Artigos no GitHub Pages

Seu blog já está configurado com um robô **100% gratuito** rodando no **GitHub Actions** que monitora diariamente os feeds oficiais do Google:

- **Google Workspace Updates** (novidades do Sheets, Docs, Forms, Gmail, Drive e Apps Script)
- **Google AI Blog (The Keyword)** (lançamentos de Gemini e IA)
- **Google Workspace Blog** (dicas e recursos de produtividade)

Ele cria rascunhos formatados em `src/data/autoPosts.json` (sem nunca mexer nos seus tutoriais manuais de `src/data/posts.ts`) e abre um **Pull Request** no GitHub para você revisar e publicar com 1 clique.

---

## Como ativar em 4 passos simples

### 1. Suba este projeto para um repositório no GitHub
Crie um repositório (ex: `blog-laisraniele`) e envie os arquivos na branch `main`.

### 2. Ative o GitHub Pages
No seu repositório no GitHub:
1. Vá em **Settings → Pages**.
2. Em **Build and deployment → Source**, escolha **GitHub Actions**.
3. (Opcional) Em **Custom domain**, informe `laisraniele.com.br`.

### 3. Ative a reescrita automática em português com IA (Opcional e Grátis)
Sem chave de API o robô já funciona criando um resumo estruturado. Se quiser que ele traduza e reescreva cada novidade no seu estilo didático completo:
1. Gere uma chave gratuita no **Google AI Studio** (camada gratuita).
2. No GitHub, vá em **Settings → Secrets and variables → Actions → New repository secret**.
3. Crie o secret com o nome `GEMINI_API_KEY` e cole sua chave.

### 4. Permita que o GitHub Actions abra Pull Requests
1. No GitHub, vá em **Settings → Actions → General**.
2. Role até **Workflow permissions**.
3. Marque **Read and write permissions** e **Allow GitHub Actions to create and approve pull requests**, depois clique em **Save**.

---

## Como testar agora mesmo
1. Abra a aba **Actions** no seu repositório.
2. Clique em **Sincronizar Novidades Oficiais do Google** no menu esquerdo.
3. Clique em **Run workflow** (botão azul à direita).
4. Em menos de 1 minuto, um Pull Request novo aparecerá na aba **Pull requests** com os rascunhos prontos para você aprovar (**Merge**) ou descartar!

> **Dica extra:** Se no futuro quiser adicionar também um feed RSS de perfis do X (Twitter), basta ir em **Settings → Secrets and variables → Actions → Variables** e criar a variável `EXTRA_RSS_FEEDS` com a URL do feed RSS.
