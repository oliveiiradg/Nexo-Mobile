# Spec 03 — Tela de Carrinho + Cotações

**Branch:** `tela/carrinho` · **Depende de:** Spec 02 (itens no Context) e scaffold · **Checklist:** `tasks/03-carrinho.md`

## Escopo de arquivos

- **Pode editar:** `app/carrinho.tsx`, `components/ProdutoCard.tsx`, `components/CotacaoTag.tsx`
- **Pode importar (só leitura):** `services/exchange.ts` (`buscarCotacoes`, `converter`), `context/CarrinhoContext.tsx` (`useCarrinho`), `types/index.ts`, `expo-router`

`ProdutoCard` é a linha de produto no carrinho. `CotacaoTag` é o selo com o valor convertido (USD/EUR).

## Comportamento

O operador vê os itens escaneados e o total convertido. Cotações via `buscarCotacoes()` ao montar a tela e a cada 5 min (D-01), com limpeza do intervalo ao sair. Falhas seguem D-06.

- Total em BRL vem de `totalBRL` do Context. Total USD/EUR: `converter(totalBRL, cotacao)`.
- "Confirmar Venda" navega com `router.push({ pathname: '/confirmacao', params: { totalBRL, cotacaoUSD, cotacaoEUR } })`, todos como string. Os itens **não** vão por rota (D-02).
- Formatação monetária consistente entre as três moedas.

## Acceptance criteria

- **R-01** Lista os itens do carrinho com nome, preço em BRL e quantidade
- **R-02** Total em BRL, USD e EUR no rodapé
- **R-03** Cotações buscadas ao abrir a tela (e a cada 5 min, D-01)
- **R-04** Loading indicator enquanto as cotações carregam
- **R-05** API falhou → "Cotação indisponível", sem travar o app (regras de D-06)
- **R-06** Botão de remover em cada linha (remove a linha inteira)
- **R-07** "Confirmar Venda" navega para `/confirmacao` com `totalBRL`, `cotacaoUSD`, `cotacaoEUR`
- **R-08** "Continuar Escaneando" volta para `/caixa` (`router.back()`)
- **R-09** Carrinho vazio → "Nenhum produto escaneado ainda" (e "Confirmar Venda" desabilitado)

## Non-goals

- Alterar quantidade (só remover a linha)
- Aplicar desconto
- Selecionar forma de pagamento

## Como validar

1. Carrinho vazio → mensagem e botão de confirmar desabilitado.
2. Com itens: nome, preço e quantidade corretos; totais em BRL, USD e EUR batem com `converter`.
3. Remover item → total recalcula.
4. Modo avião ao abrir → "Cotação indisponível", USD/EUR como "—", confirmar desabilitado, app não trava.
5. Com cotação carregada → "Confirmar Venda" abre a Confirmação com os três valores.
6. Ficar na tela por mais de 5 min (ou reduzir o intervalo temporariamente em teste) → cotação atualiza.
