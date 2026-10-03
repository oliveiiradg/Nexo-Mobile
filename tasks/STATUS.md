# Status do projeto

Atualizado por: Douglas · Última atualização: 03/10/2026 (MVP das 4 telas concluído e validado em dispositivo real: fluxo completo Login → Caixa → Carrinho → Confirmação, venda confirmada no Firestore)

| Card | Tela               | Branch             | Responsável | Status   | PR |
|------|--------------------|--------------------|-------------|----------|----|
| 00   | Scaffold + base    | `main`             | Douglas     | Concluído |    |
| 01   | Login              | `tela/login`       | Douglas     | Concluído |    |
| 02   | Caixa (Scanner)    | `tela/caixa`       | Douglas     | Concluído |    |
| 03   | Carrinho + Cotações| `tela/carrinho`    | Douglas     | Concluído |    |
| 04   | Confirmação        | `tela/confirmacao` | Douglas     | Concluído |    |

Status possíveis: A fazer · Em andamento · Em revisão · Concluído

## Ordem de trabalho

1. Douglas fecha o card 00 (scaffold). Nada das telas começa antes.
2. Com a base pronta, os quatro cards podem andar em paralelo. As telas só dependem dos contratos (`specs/contratos.md`), não umas das outras.
3. Para testar Caixa, Carrinho e Confirmação isoladamente, use os placeholders do scaffold e produtos de teste no Firestore.
4. Integração final: fluxo completo Login → Caixa → Carrinho → Confirmação em aparelho real.
