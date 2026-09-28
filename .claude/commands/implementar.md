---
description: Implementa uma tela a partir da spec (SDD). Uso - /implementar login | caixa | carrinho | confirmacao
argument-hint: login | caixa | carrinho | confirmacao
---

Implemente a tela "$ARGUMENTS" seguindo Spec-Driven Development.

1. Leia, nesta ordem: `CLAUDE.md`, `specs/00-constituicao.md`, `specs/contratos.md`, `specs/decisoes.md` e a spec da tela (`specs/01-login.md`, `02-caixa.md`, `03-carrinho.md` ou `04-confirmacao.md`, conforme "$ARGUMENTS").
2. Confirme com `git branch --show-current` que o branch é `tela/$ARGUMENTS`. Se não for, pare e avise.
3. Confira que as dependências da spec existem (`services/*`, `context/*`, `types/*`). Se algo estiver faltando, pare e avise o Douglas. Não crie nem edite arquivos compartilhados.
4. Escreva em até 8 linhas o plano: arquivos que vai editar, estados da tela e chamadas que vai fazer.
5. Implemente somente nos arquivos da seção "Pode editar" da spec. Cumpra os acceptance criteria e nenhum non-goal.
6. Conforme cada critério ficar pronto, marque o `[x]` correspondente em `tasks/0N-<tela>.md`.
7. Rode `npx tsc --noEmit` e corrija os erros dentro do seu escopo.
8. Ao final, liste o que foi feito por ID de critério e o que ficou pendente. Depois sugira rodar `/revisar`.

Se a spec for ambígua ou conflitar com o código existente, pare e pergunte. Não decida sozinho.
