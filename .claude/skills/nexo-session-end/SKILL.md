---
name: nexo-session-end
description: Checklist obrigatório de fim de sessão do NEXO Mobile. Tipos, checklist da tela, STATE no vault, decisões, commit limpo e (só Douglas) deploy.
---

# Session End — NEXO Mobile

Execute cada passo em ordem. Não pular nenhum.

## 0. Contexto

```bash
git branch --show-current
git status --short
echo $NEXO_OWNER
```

Identifique a tela pelo branch (`tela/<nome>`). Os passos marcados **(dono)** só valem com `NEXO_OWNER=1` (Douglas). Sem isso, o guard bloqueia a edição: inclua o texto sugerido no relatório final.

## 1. Tipos

```bash
npx tsc --noEmit
```

- O projeto não tem suíte de testes automatizados. A validação é `tsc` mais os passos de "Como validar" da spec da tela.
- Erro de tipo dentro do escopo da tela: corrigir antes de continuar.
- Erro em arquivo compartilhado (`services/*`, `context/*`, `types/*`): não mexer. Reportar ao Douglas.

## 2. Checklist da tela

Ler `specs/0N-<tela>.md` e `tasks/0N-<tela>.md`. Para cada ID de critério, confirmar no código e marcar `[x]` apenas o que foi verificado. O que ficou pela metade continua `[ ]`.

## 3. Atualizar STATE no vault (dono)

Arquivo: `01 - Projetos/Pessoal/NEXO Mobile/NEXO Mobile - STATE.md`

Atualizar:
- Data em `atualizado:`
- Seção "Estado Atual" com o que mudou nesta sessão
- Seção "Pontos a alinhar": adicionar novos, fechar resolvidos
- Seção "Próximos Passos": atualizar pendências

Atualizar também `tasks/STATUS.md` (status da tela e data).

Se o MCP do Obsidian não estiver disponível, imprimir o bloco pronto para colar.

## 4. Registro de decisão (dono, se necessário)

Acrescentar uma linha em `specs/decisoes.md` (próximo `D-NN`: tema, decisão, origem) quando:
- Mudou contrato, rota ou arquitetura
- Tomou decisão que vai afetar sessões futuras
- Reverteu ou corrigiu uma decisão anterior

Numeração: verificar o maior `D-NN` existente e incrementar. Sem ser dono, propor o texto no relatório para o Douglas.

## 5. Clean code

Nos arquivos modificados nesta sessão:
- Sem `console.log` de debug, código morto ou comentado, imports não usados
- Sem `any` em contrato público
- Sem TODO sem dono

## 6. Logging

- Falha técnica vai para `console.error` com contexto (ex.: `[caixa] falha ao buscar produto`) e nunca aparece para o operador
- Nenhum dado sensível em log (senha, token, credenciais)
- Nenhum log de debug no commit

## 7. Commit

```bash
git add -A
git diff --staged --stat
```

Conferir: só arquivos do escopo da tela e nenhum `.env` no stage.

Mensagem no padrão do grupo: `tela/<nome>: descrição curta e objetiva` (fora de tela: `fix:`, `docs:` ou `chore:`).

```bash
git commit -m "tela/<nome>: descrição curta e objetiva"
```

Nunca incluir: "Claude", "AI", "generated", "as discussed", "as per our conversation". Nunca push na `main`.

## 8. Deploy (dono)

Só se estiver na `main` com as telas mergeadas: chamar `/nexo-deploy`. Caso contrário, pular e informar.

## 9. Confirmar

Reportar: se o `tsc` passou, critérios atendidos e pendentes por ID, o que foi commitado, o que ficou para o Douglas atualizar (STATE, STATUS, decisões) e próximos passos para a sessão seguinte.
