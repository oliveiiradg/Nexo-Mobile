# Checklist — Card 03 Carrinho (`tela/carrinho`)

Spec: `specs/03-carrinho.md`. Marque cada item ao concluir.

- [x] R-01 Lista de itens (nome, preço BRL, quantidade)
- [x] R-02 Totais em BRL, USD e EUR
- [x] R-03 Cotações ao abrir, com cache de 1h no serviço (D-01 revisada)
- [x] R-04 Loading das cotações
- [x] R-05 Falha → "Cotação indisponível" sem travar (D-06)
- [x] R-06 Remover item em cada linha
- [x] R-07 "Confirmar Venda" → `/confirmacao` com total e cotações
- [x] R-08 "Continuar Escaneando" → volta para `/caixa`
- [x] R-09 Carrinho vazio → "Nenhum produto escaneado ainda"

Fechamento:

- [x] Nenhum non-goal implementado
- [x] `npx tsc --noEmit` passa
- [ ] Validado pelos passos de "Como validar"
- [x] `/revisar` APROVADO
- [ ] PR aberto para `main`
