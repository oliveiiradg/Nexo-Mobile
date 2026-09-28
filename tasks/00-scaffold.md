# Card 00 — Scaffold e base compartilhada (Douglas)

Executar no Claude Code com `NEXO_OWNER=1`. Objetivo: deixar o projeto rodando com as partes compartilhadas prontas e placeholders nas telas, para os 4 cards andarem em paralelo.

**Prompt sugerido:**
> Leia CLAUDE.md, specs/00-constituicao.md, specs/contratos.md e specs/decisoes.md. Execute tasks/00-scaffold.md item a item, marcando cada `[x]` ao concluir. Pare e pergunte se algo conflitar com os contratos.

## Repositório

- [x] `git init`, branch `main`, commit inicial com o harness (CLAUDE.md, specs, tasks, .claude)
- [ ] Criar o repositório remoto e dar push
- [ ] Proteger a `main` no GitHub (exigir PR para merge)

## Projeto Expo (D-09)

- [x] Gerar em pasta temporária sem sobrescrever o harness: `npx create-expo-app@latest _app --template blank-typescript@sdk-54`
- [x] Mover o conteúdo de `_app` para a raiz, mantendo os nossos `.gitignore`, `README.md` e `CLAUDE.md`; apagar `_app`
- [x] Instalar: `npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar expo-camera firebase @react-native-async-storage/async-storage`
- [x] Configurar Expo Router: `"main": "expo-router/entry"` no `package.json`, `"scheme": "nexo-mobile"` no `app.json`, remover `App.tsx` e `index.ts` do template
- [x] `tsconfig.json` com `strict: true`
- [x] Permissão de câmera no `app.json` (plugin do `expo-camera` com texto em pt-BR)

## Base compartilhada (conforme `specs/contratos.md`)

- [x] `types/index.ts`
- [x] `services/firebase.ts`: init com `process.env.EXPO_PUBLIC_*`, exporta `auth`, `db` e `buscarProdutoPorCodigo`
  - Auth com persistência em AsyncStorage (`initializeAuth` + `getReactNativePersistence`). Sem isso a sessão se perde ao fechar o app e o critério L-07 (sessão ativa vai direto para Caixa) não funciona
  - Evitar reinicialização em Fast Refresh (`getApps().length ? getApp() : initializeApp(...)`)
  - Se o TypeScript reclamar do export `getReactNativePersistence`, resolver pela documentação da versão instalada do Firebase
- [x] `services/auth.ts`
- [x] `services/exchange.ts` (URL da AwesomeAPI, `parseFloat` do `bid`, erro lançado se a resposta vier inválida)
- [x] `services/vendas.ts`
- [x] `context/CarrinhoContext.tsx` (regras D-07; `totalBRL` arredondado a 2 casas)
- [x] `constants/moedas.ts` (USD, EUR)
- [x] `app/_layout.tsx` (Stack + `CarrinhoProvider`)
- [x] `app/index.tsx` (loading enquanto `observarSessao` resolve; depois `replace('/caixa')` ou `replace('/login')`)
- [x] Placeholders: `app/login.tsx`, `app/caixa.tsx`, `app/carrinho.tsx`, `app/confirmacao.tsx` com título e um botão temporário para a próxima rota (cada dono substitui)
- [x] `components/ProdutoCard.tsx` e `components/CotacaoTag.tsx` como stubs simples

## Firebase (Console)

- [ ] Criar o projeto Firebase e o app Web; copiar a config para o `.env` local (nunca commitar)
- [ ] Ativar Authentication (e-mail/senha) e criar 2 ou 3 usuários operadores de teste
- [ ] Criar o Firestore
- [ ] Cadastrar 5 produtos de teste em `produtos` (D-05), usando códigos de barras de produtos físicos que o grupo tem em mãos (latinha, garrafa, snack). Campos: `nome`, `preco_brl` (number), `codigo_barras` (string), `categoria`
- [ ] Publicar as Firestore Rules abaixo

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Produtos: leitura para operador logado; escrita só pelo Console/admin
    match /produtos/{id} {
      allow read: if request.auth != null;
      allow write: if false;
    }
    // Vendas: operador cria a própria venda e lê só as suas
    match /vendas/{id} {
      allow create: if request.auth != null
                    && request.resource.data.operador_id == request.auth.uid;
      allow read: if request.auth != null
                  && resource.data.operador_id == request.auth.uid;
      allow update, delete: if false;
    }
  }
}
```

## Verificação final

- [x] `npx tsc --noEmit` passa
- [ ] `npx expo start` abre no Expo Go, navega pelos placeholders e loga com um usuário de teste
- [ ] Commit na `main` e push
- [ ] Atualizar `tasks/STATUS.md` (card 00 = Concluído) e avisar o grupo
