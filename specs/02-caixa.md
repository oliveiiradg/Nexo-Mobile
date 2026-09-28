# Spec 02 — Tela de Caixa (Scanner)

**Branch:** `tela/caixa` · **Depende de:** Spec 01 (login) e scaffold · **Checklist:** `tasks/02-caixa.md`

## Escopo de arquivos

- **Pode editar:** `app/caixa.tsx`
- **Pode importar (só leitura):** `expo-camera` (`CameraView`, `useCameraPermissions`), `services/firebase.ts` (`buscarProdutoPorCodigo`), `services/auth.ts` (`logout`), `context/CarrinhoContext.tsx` (`useCarrinho`), `expo-router`

## Comportamento

Tela principal do operador: câmera pronta para escanear. Ao ler um código, busca o produto no Firestore e adiciona ao carrinho. O operador escaneia vários produtos e depois vai ao Carrinho.

- Tipos de código a aceitar: `ean13`, `ean8`, `upc_a`, `upc_e`, `code128`.
- Trava o scanner assim que detecta um código e libera 1,5 s depois de concluir o processamento (evita leitura dupla).
- Produto já no carrinho: incrementa a quantidade (D-07).
- Feedback ("Produto adicionado" / "Produto não cadastrado") com componente nativo do RN, sem lib de toast. Limpar timers ao desmontar.

## Acceptance criteria

- **C-01** Câmera em tela cheia com foco em código de barras
- **C-02** Ao detectar código válido, `buscarProdutoPorCodigo(codigo)`
- **C-03** Produto encontrado → `adicionarItem(produto)` e feedback visual "Produto adicionado"
- **C-04** Produto não encontrado → mensagem "Produto não cadastrado"
- **C-05** Depois de escanear, o scanner volta a ler sozinho após 1,5 s
- **C-06** Botão "Ver Carrinho" fixo no rodapé, mostrando `quantidadeTotal`, navega para `/carrinho`
- **C-07** Botão de logout no canto superior direito (`logout()` e depois `router.replace('/login')`)
- **C-08** Permissão de câmera solicitada corretamente; se negada, mensagem orientando o operador (com botão para pedir de novo)

Extra de robustez (não é AC, mas vale): falha na consulta ao Firestore mostra "Não foi possível consultar o produto" e libera o scanner.

## Non-goals

- Adicionar produto manualmente por nome
- Cadastrar produto novo pelo app

## Como validar

1. Ao abrir pela primeira vez, o app pede permissão de câmera. Negar → mensagem orientando.
2. Escanear produto cadastrado → feedback "Produto adicionado" e contador do rodapé sobe.
3. Escanear o mesmo produto de novo → contador sobe (quantidade 2), sem ler duas vezes seguidas.
4. Escanear código não cadastrado → "Produto não cadastrado".
5. "Ver Carrinho" leva ao Carrinho. Logout leva ao Login.
6. Sem internet → mensagem de falha e o scanner volta a funcionar.
