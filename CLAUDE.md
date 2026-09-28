# NEXO Mobile — Contexto fixo do Claude Code

PDV mobile para comércio turístico do Rio: o operador escaneia o produto e o app mostra o total em BRL, USD e EUR com cotação ao vivo, e registra a venda no Firebase.
Projeto de extensão da disciplina PDM (ARA4711), Estácio 2026.2. Grupo: Douglas, Diego, Freitas, Gabriel, Lucas.

## Fluxo obrigatório (Spec-Driven Development)

Antes de escrever qualquer código, leia nesta ordem:

1. `specs/00-constituicao.md`
2. `specs/contratos.md`
3. `specs/decisoes.md`
4. A spec do seu card: `specs/01-login.md` … `specs/04-confirmacao.md`

Depois: `/implementar <tela>` → `/revisar` → commit → PR para `main`.

**A spec manda.** Se o código precisar divergir dela, PARE e avise o Douglas. Não improvise assinatura, rota, tipo ou comportamento.

## Stack

React Native + Expo SDK 54 (TypeScript) · Expo Router · Firebase Auth + Firestore · AwesomeAPI (cotações) · `expo-camera` (`CameraView` para o scanner) · React Context.

## Estrutura

```
app/            index, _layout, login, caixa, carrinho, confirmacao
components/     ProdutoCard, CotacaoTag
services/       firebase, auth, exchange, vendas
context/        CarrinhoContext
constants/      moedas
types/          index.ts
specs/          fonte da verdade (constituição, contratos, decisões, uma spec por tela)
tasks/          STATUS.md, scaffold e checklist por tela
.claude/        hooks, agente reviewer e comandos
```

## Regras inegociáveis

1. Um branch = um card = uma tela. Não edite fora do escopo do card (o hook `.claude/hooks/guard.js` bloqueia).
2. Arquivos compartilhados são do Douglas (lista em `specs/contratos.md`). Precisa de mudança neles? Peça a ele.
3. Nunca coloque credenciais no código nem leia/edite `.env`. Config do Firebase só via `process.env.EXPO_PUBLIC_*`.
4. Cotação só via `services/exchange.ts`. Tela nunca chama `fetch` direto.
5. Contratos (tipos, assinaturas, rotas, params) são lei.
6. Sem dependências novas além do stack. `package.json` é do Douglas.
7. Texto de UI em pt-BR. Nomes de funções e campos exatamente como nos contratos.
8. Toda chamada assíncrona tem loading e tratamento de erro. Nunca mostre erro técnico ao operador.
9. Não implemente non-goals.
10. Sem commit direto na `main`.

## Comandos

```bash
npx expo start          # rodar
npx tsc --noEmit        # checar tipos (obrigatório antes do PR)
```

Comandos do Claude Code: `/implementar <tela>`, `/revisar`, `/nexo-session-end` (fim da sessão) e `/nexo-deploy` (só Douglas).

## Modo dono (só Douglas)

Para editar arquivos compartilhados, specs ou a `main`, abra o Claude Code com a variável `NEXO_OWNER=1`:

```powershell
$env:NEXO_OWNER = "1"; claude
```
