# Spec 04 — Tela de Confirmação

**Branch:** `tela/confirmacao` · **Depende de:** Spec 03 (total e cotações por parâmetro) e scaffold · **Checklist:** `tasks/04-confirmacao.md`

## Escopo de arquivos

- **Pode editar:** `app/confirmacao.tsx`
- **Pode importar (só leitura):** `services/vendas.ts` (`salvarVenda`), `services/firebase.ts` (`auth`, para o UID do operador), `context/CarrinhoContext.tsx` (`useCarrinho`), `types/index.ts`, `components/ProdutoCard.tsx` e `components/CotacaoTag.tsx` (se fizer sentido), `expo-router` (`useLocalSearchParams`)

## Comportamento

Tela final da venda. Recebe total e cotações por parâmetro, pega os itens do Context (D-02), mostra o resumo e, ao confirmar, grava a venda no Firestore. Depois limpa o carrinho e volta para a Caixa.

- Params (`useLocalSearchParams`) chegam como string: converter com `Number(...)`.
- `operador_id` = `auth.currentUser?.uid`. Se vier nulo, `router.replace('/login')`.
- O objeto enviado a `salvarVenda` segue o tipo `Venda` de `types/index.ts`. `created_at` é do servidor (`salvarVenda` cuida).
- Sucesso: `limparCarrinho()`, feedback "Venda registrada!" e `router.replace('/caixa')` (D-04).
- Falha: mostra erro legível e **mantém tudo na tela** para tentar de novo. Não limpa o carrinho.
- Botão fica desabilitado durante o salvamento (evita venda duplicada).

## Acceptance criteria

- **F-01** Recebe `totalBRL`, `cotacaoUSD`, `cotacaoEUR` por rota e `itens` pelo Context
- **F-02** Resumo: lista de itens, total em BRL, USD e EUR
- **F-03** "Confirmar e Salvar" grava em `vendas` com `operador_id`, `created_at` (servidor), `total_brl`, `cotacao_usd` (snapshot), `cotacao_eur` (snapshot) e `itens` (nome, preço, quantidade)
- **F-04** Loading enquanto salva
- **F-05** Sucesso → `limparCarrinho()`, "Venda registrada!" e navega para `/caixa`
- **F-06** Falha ao salvar → erro exibido, dados mantidos na tela
- **F-07** "Voltar" cancela sem salvar e volta ao Carrinho

## Non-goals

- Imprimir comprovante
- Enviar e-mail
- Emitir nota fiscal

## Como validar

1. Fluxo completo: escanear, carrinho, confirmar. Conferir no Firestore o documento em `vendas` com todos os campos e `created_at` de servidor.
2. As cotações gravadas são exatamente as exibidas no Carrinho.
3. Após salvar, o carrinho está vazio e o app está na Caixa.
4. Modo avião ao confirmar → erro legível, itens e totais continuam na tela, e dá para tentar de novo depois de reconectar sem duplicar a venda.
5. "Voltar" retorna ao Carrinho sem gravar nada.
