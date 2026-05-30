
# Exportar preview como HTML navegável

## Objetivo
Gerar uma versão estática e navegável do app Actus (todas as rotas atuais) empacotada em um único arquivo `.zip` (ou pasta) disponível em `/mnt/documents/` para download.

## Abordagem
Usar o próprio build de produção do Vite com `HashRouter` temporário para que funcione abrindo `index.html` diretamente do disco (sem servidor), e empacotar em zip.

### Passos
1. Rodar `bun run build` para gerar `dist/`.
2. Como o app usa `BrowserRouter`, criar um pequeno wrapper de build alternativo:
   - Copiar `dist/` para `/tmp/actus-preview/`
   - Criar `dist/404.html` = `index.html` (fallback) e ajustar `base` para `./` no `vite.config.ts` apenas para esse build, OU
   - Mais simples: trocar temporariamente `BrowserRouter` por `HashRouter` em `src/App.tsx`, buildar, reverter.
3. Verificar abrindo localmente (curl + headless) que as rotas principais carregam.
4. Zipar em `/mnt/documents/actus-preview.zip`.
5. Entregar via `<presentation-artifact>`.

## Limitações a sinalizar ao usuário
- Dados continuam vindo do Supabase em tempo real (precisa de internet); se o usuário quiser snapshot 100% offline, seria outro trabalho (mock estático).
- Funcionalidades que dependem de auth/Supabase exigirão as mesmas credenciais embutidas no bundle (que já são publishable keys, ok).
- Rotas usarão `#/` (hash) para funcionar via `file://`.

## Pergunta antes de implementar
Confirma essas duas decisões?
- (a) Hash routing (`actus.html#/clientes`) para abrir direto do disco — ok?
- (b) Manter chamadas reais ao Supabase (online) vs. congelar com dados mock (mais trabalhoso)?
