# Checklist — Card 03 Carrinho (`tela/carrinho`)

Spec: `specs/03-carrinho.md`. Marque cada item ao concluir.

- [ ] R-01 Lista de itens (nome, preço BRL, quantidade)
- [ ] R-02 Totais em BRL, USD e EUR
- [ ] R-03 Cotações ao abrir e a cada 5 min
- [ ] R-04 Loading das cotações
- [ ] R-05 Falha → "Cotação indisponível" sem travar (D-06)
- [ ] R-06 Remover item em cada linha
- [ ] R-07 "Confirmar Venda" → `/confirmacao` com total e cotações
- [ ] R-08 "Continuar Escaneando" → volta para `/caixa`
- [ ] R-09 Carrinho vazio → "Nenhum produto escaneado ainda"

Fechamento:

- [ ] Nenhum non-goal implementado
- [ ] `npx tsc --noEmit` passa
- [ ] Validado pelos passos de "Como validar"
- [ ] `/revisar` APROVADO
- [ ] PR aberto para `main`
