# NEXO Mobile

App PDV mobile do NEXO: escaneia o produto e mostra o preço em BRL, USD e EUR em tempo real. Projeto de extensão da disciplina PDM (ARA4711), Estácio 2026.2.

## Rodar

```bash
npm install
cp .env.example .env     # preencher com os dados do projeto Firebase
npx expo start
```

## Como o grupo trabalha

Desenvolvimento guiado por spec (SDD) com Claude Code:

1. Pegue um card na reunião e crie o branch `tela/<nome>`.
2. Abra o Claude Code na pasta do projeto e rode `/implementar <tela>`.
3. Antes do PR: `npx tsc --noEmit` e `/revisar`.
4. Abra o PR para `main`.
5. Ao terminar de trabalhar, rode `/nexo-session-end` para atualizar o checklist e fechar a sessão.

Toda a regra do jogo está em `CLAUDE.md` e `specs/`. Acompanhamento em `tasks/STATUS.md`.
