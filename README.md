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

## Expo Go — versão certa (SDK 54)

O projeto usa Expo SDK 54 (decisão D-09 em `specs/decisoes.md`). O Expo Go da loja costuma vir em uma versão mais nova (ex.: SDK 57), o que trava a abertura com o erro "Project is incompatible with this version of Expo Go".

Antes de escanear o QR code:

1. Desinstale o Expo Go atual do celular (se já tiver).
2. Instale a versão certa: https://expo.dev/go?sdkVersion=54&platform=android&device=true
3. Rode `npx expo start` e escaneie o QR code com esse Expo Go.

Só funciona assim em Android. Em iPhone físico não dá para instalar uma versão antiga do Expo Go — use um Android para testar, ou peça para o Douglas sobre alternativa (development build).
