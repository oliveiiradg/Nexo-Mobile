# Checklist — Card 04 Confirmação (`tela/confirmacao`)

Spec: `specs/04-confirmacao.md`. Marque cada item ao concluir.

- [ ] F-01 Total e cotações por rota, itens pelo Context
- [ ] F-02 Resumo com itens e totais nas 3 moedas
- [ ] F-03 "Confirmar e Salvar" grava a venda completa em `vendas`
- [ ] F-04 Loading enquanto salva
- [ ] F-05 Sucesso → limpa carrinho, "Venda registrada!", vai para `/caixa`
- [ ] F-06 Falha → erro exibido, dados mantidos
- [ ] F-07 "Voltar" cancela sem salvar

Fechamento:

- [ ] Nenhum non-goal implementado
- [ ] `npx tsc --noEmit` passa
- [ ] Validado pelos passos de "Como validar"
- [ ] `/revisar` APROVADO
- [ ] PR aberto para `main`
