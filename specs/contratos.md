# Contratos

Tudo que atravessa a fronteira entre telas e serviços. Mudou aqui, muda para todos: só o Douglas altera.

## Tipos — `types/index.ts`

```ts
export type Produto = {
  id: string
  nome: string
  preco_brl: number
  codigo_barras: string
  categoria: string
}

// Linha do carrinho e item da venda têm o mesmo formato
export type ItemCarrinho = {
  produto_id: string
  nome: string
  preco_brl: number
  quantidade: number
}

export type Cotacoes = {
  usd: number
  eur: number
}

export type Venda = {
  operador_id: string
  total_brl: number
  cotacao_usd: number // snapshot da cotação usada
  cotacao_eur: number // snapshot da cotação usada
  itens: ItemCarrinho[]
}
```

## Serviços

```ts
// services/firebase.ts
export const auth: Auth
export const db: Firestore
export const buscarProdutoPorCodigo: (codigo: string) => Promise<Produto | null>
// coleção "produtos", campo "codigo_barras"; null se não encontrar

// services/auth.ts
export const login: (email: string, password: string) => Promise<UserCredential>
export const logout: () => Promise<void>
export const observarSessao: (callback: (user: User | null) => void) => Unsubscribe

// services/exchange.ts
export const buscarCotacoes: () => Promise<Cotacoes>   // lança erro se a API falhar
export const converter: (valorBRL: number, cotacao: number) => string // 2 casas decimais

// services/vendas.ts
export const salvarVenda: (venda: Venda) => Promise<DocumentReference>
// grava em "vendas" e acrescenta created_at: serverTimestamp()
```

## Context — `context/CarrinhoContext.tsx`

```ts
type CarrinhoContextValue = {
  itens: ItemCarrinho[]
  quantidadeTotal: number                 // soma das quantidades
  totalBRL: number                        // soma de preco_brl * quantidade, arredondado a 2 casas
  adicionarItem: (produto: Produto) => void // se já existe, quantidade + 1
  removerItem: (produtoId: string) => void  // remove a linha inteira
  limparCarrinho: () => void
}

export const CarrinhoProvider: React.FC<{ children: React.ReactNode }>
export const useCarrinho: () => CarrinhoContextValue
```

## Rotas (Expo Router)

| Rota            | Arquivo               | Params                                                        |
|-----------------|-----------------------|---------------------------------------------------------------|
| `/`             | `app/index.tsx`       | nenhum (redireciona: sessão ativa → `/caixa`, senão `/login`) |
| `/login`        | `app/login.tsx`       | nenhum                                                        |
| `/caixa`        | `app/caixa.tsx`       | nenhum                                                        |
| `/carrinho`     | `app/carrinho.tsx`    | nenhum                                                        |
| `/confirmacao`  | `app/confirmacao.tsx` | `totalBRL`, `cotacaoUSD`, `cotacaoEUR` (todos string)         |

Params de rota chegam como string. Na Confirmação, converter com `Number(...)`. Os itens **não** vão por rota: vêm de `useCarrinho()` (decisão D-02).

Navegação:

- Login → Caixa: `router.replace('/caixa')`
- Logout → Login: `router.replace('/login')`
- Caixa → Carrinho: `router.push('/carrinho')`
- Carrinho "Continuar Escaneando": `router.back()`
- Carrinho → Confirmação: `router.push({ pathname: '/confirmacao', params: { totalBRL, cotacaoUSD, cotacaoEUR } })`
- Confirmação "Voltar": `router.back()`
- Confirmação após salvar: `router.replace('/caixa')`

## Firestore

Modelo completo no vault (`NEXO Mobile - 03 - Modelo de Dados Firebase`). Resumo:

- `produtos/{id}`: `nome`, `preco_brl`, `codigo_barras`, `categoria`
- `vendas/{id}`: `operador_id`, `created_at`, `total_brl`, `cotacao_usd`, `cotacao_eur`, `itens[]`

## Variáveis de ambiente

`EXPO_PUBLIC_FIREBASE_API_KEY`, `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`, `EXPO_PUBLIC_FIREBASE_PROJECT_ID`, `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`, `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`, `EXPO_PUBLIC_FIREBASE_APP_ID`.

## Arquivos compartilhados (dono: Douglas)

| Arquivo                       | O que é                                                       |
|-------------------------------|---------------------------------------------------------------|
| `services/firebase.ts`         | Init do Firebase, `auth`, `db`, `buscarProdutoPorCodigo`      |
| `services/auth.ts`             | login, logout, observarSessao                                 |
| `services/exchange.ts`         | buscarCotacoes, converter                                     |
| `services/vendas.ts`           | salvarVenda                                                   |
| `context/CarrinhoContext.tsx`  | Estado global do carrinho                                     |
| `app/index.tsx`                | Roteamento inicial                                            |
| `app/_layout.tsx`              | Layout raiz (Stack + `CarrinhoProvider`)                      |
| `types/index.ts`               | Tipos acima                                                   |
| `constants/moedas.ts`          | Moedas suportadas (USD, EUR)                                  |
| `.env.example`, `package.json`, `app.json`, `tsconfig.json` | Configuração                    |

## Quem edita o quê nas telas

| Branch             | Pode editar                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `tela/login`       | `app/login.tsx`                                                             |
| `tela/caixa`       | `app/caixa.tsx`                                                             |
| `tela/carrinho`    | `app/carrinho.tsx`, `components/ProdutoCard.tsx`, `components/CotacaoTag.tsx` |
| `tela/confirmacao` | `app/confirmacao.tsx`                                                       |

Cada tela pode **importar** (somente leitura) os serviços, o Context, os tipos e, no caso da Confirmação, os componentes da tela de Carrinho.
