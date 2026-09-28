# Decisões

Pontos em que os documentos originais (arquitetura e cards) se contradiziam ou eram omissos. Decisões fechadas em 28/09/2026. Só o Douglas altera.

## Fechadas

| ID   | Tema                        | Decisão                                                                                                                                        | Origem do conflito                                                                 |
|------|-----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| D-01 | Atualização das cotações    | Busca ao abrir o Carrinho **e** a cada 5 minutos enquanto a tela estiver aberta (limpar o intervalo ao sair).                                  | Arquitetura dizia 5 min; Card 03 só "ao abrir".                                    |
| D-02 | Itens na Confirmação        | Vêm do Context (`useCarrinho().itens`), não da rota. A rota leva só `totalBRL`, `cotacaoUSD`, `cotacaoEUR`.                                    | Card 04 dizia "via rota"; Card 03 só passava total e cotações.                     |
| D-03 | Lib do scanner              | Só `expo-camera` (`CameraView` com `onBarcodeScanned`). Sem `expo-barcode-scanner`.                                                            | Card 02 citava as duas; a instalação da arquitetura só tinha `expo-camera`.        |
| D-04 | Pós-venda                   | Mostra "Venda registrada!" e volta para `/caixa`. Sem botão "Nova venda".                                                                      | Arquitetura falava em "Nova venda"; Card 04 navega direto para `/caixa`.           |
| D-05 | Carga de `produtos`         | Douglas cadastra manualmente no Firestore (Console) alguns produtos de teste. O app não cadastra.                                              | Nenhum card cobria isso.                                                           |

## Derivadas (consequência direta de decisões e ACs; validar com o grupo)

| ID   | Tema                            | Decisão                                                                                                                                                                                                             |
|------|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| D-06 | Falha na cotação                | Se a primeira busca falhar: mostrar "Cotação indisponível", totais em USD/EUR como "—" e **desabilitar "Confirmar Venda"** (a venda precisa do snapshot). Se um refresh de 5 min falhar depois de já haver cotação: manter a última e mostrar aviso discreto "Cotação desatualizada". O snapshot salvo é sempre a cotação exibida. |
| D-07 | Mesmo produto escaneado de novo | Incrementa `quantidade` da linha existente em 1. Por isso o tipo tem `quantidade`. O Carrinho não altera quantidade (só remove a linha inteira, conforme non-goal do Card 03).                                      |
| D-08 | Arquivos compartilhados extras  | `buscarProdutoPorCodigo` fica em `services/firebase.ts` (como no Card 02). Além dos listados nos cards, são do Douglas: `app/_layout.tsx`, `types/index.ts`, `constants/moedas.ts`.                                  |
| D-09 | Projeto em TypeScript           | Template `blank-typescript@sdk-54` (o comando original usava `blank`, que gera JS, mas os cards pedem `.tsx`).                                                                                                      |
