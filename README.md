# NEXO Mobile

App PDV mobile para comércio turístico: o operador escaneia o produto e o app mostra o preço em BRL, USD e EUR em tempo real, e registra a venda no Firebase. Projeto de extensão da disciplina PDM (ARA4711), Estácio 2026.2.

**Novo no projeto?** Comece pelo [`ONBOARDING.md`](./ONBOARDING.md) — tem o passo a passo completo para rodar o app no seu celular.

---

## Status

**MVP completo e validado** (03/10/2026): as 4 telas (Login, Caixa, Carrinho, Confirmação) implementadas, revisadas e testadas em dispositivo real, com fluxo completo de ponta a ponta — login, scanner de produto, conversão de moeda ao vivo, e gravação da venda no Firestore.

Próxima fase: polimento visual (logo, cores, tipografia) e, depois, build de distribuição via EAS.

Acompanhamento detalhado em [`tasks/STATUS.md`](./tasks/STATUS.md).

---

## Stack

| O quê | Tecnologia |
|---|---|
| Framework | React Native + Expo SDK 54 (TypeScript) |
| Navegação | Expo Router (file-based routing) |
| Autenticação | Firebase Auth (e-mail + senha) |
| Banco de dados | Firebase Firestore |
| Cotação de câmbio | [open.er-api.com](https://www.exchangerate-api.com/docs/free) (ExchangeRate-API, endpoint aberto, sem chave) |
| Câmera / Scanner | `expo-camera` (`CameraView`, leitura nativa de código de barras) |
| Estado global | React Context API |

## Rodar

```bash
npm install
cp .env.example .env     # preencher com os dados do projeto Firebase (peça no grupo)
npx expo start
```

Veja o [`ONBOARDING.md`](./ONBOARDING.md) para o passo a passo completo, incluindo a versão certa do Expo Go (SDK 54).

---

## O app em 4 telas

```
LOGIN → CAIXA (scanner) → CARRINHO (cotação ao vivo) → CONFIRMAÇÃO (grava a venda)
```

1. **Login** — e-mail/senha via Firebase Auth. Sessão persiste entre aberturas do app.
2. **Caixa** — câmera em tela cheia, lê código de barras (EAN-13/EAN-8/UPC-A/UPC-E/Code128), busca o produto no Firestore e adiciona ao carrinho.
3. **Carrinho** — lista os itens escaneados, busca a cotação de câmbio (com cache de 1h) e mostra o total em BRL, USD e EUR.
4. **Confirmação** — resumo da venda, grava no Firestore com snapshot da cotação usada, limpa o carrinho e volta para a Caixa.

## Estrutura de pastas

```
app/            telas (index, _layout, login, caixa, carrinho, confirmacao)
components/     ProdutoCard, CotacaoTag
services/       firebase, auth, exchange, vendas — toda chamada externa passa por aqui
context/        CarrinhoContext — estado global do carrinho
types/          tipos compartilhados (Produto, ItemCarrinho, Venda, Cotacoes)
specs/          especificações de cada tela, contratos e decisões técnicas (fonte da verdade)
tasks/          status do projeto e checklist de cada card
.claude/        configuração do Claude Code (hooks, agente de revisão, comandos)
```

## Firebase — estrutura dos dados

### Coleção `produtos`
```
produtos/{id}
  nome: string
  preco_brl: number
  codigo_barras: string
  categoria: string
```
Cadastro é manual, direto no Console do Firebase (o app só lê, nunca escreve em `produtos`).

### Coleção `vendas`
```
vendas/{id}
  operador_id: string       (uid do Firebase Auth)
  created_at: timestamp     (gerado pelo servidor)
  total_brl: number
  cotacao_usd: number       (snapshot da cotação usada na venda)
  cotacao_eur: number       (snapshot da cotação usada na venda)
  itens: [{ produto_id, nome, preco_brl, quantidade }]
```
Cada operador só lê as próprias vendas (ver Firestore Rules). Uma vez criada, a venda não pode ser editada nem apagada.

### Regras de segurança (Firestore Rules)
Só usuário autenticado lê `produtos`; ninguém escreve via app. Vendas só são criadas pelo próprio operador (`operador_id` tem que bater com quem está logado); cada um só lê as suas; sem update/delete.

## Decisões técnicas importantes

Histórico completo em [`specs/decisoes.md`](./specs/decisoes.md). As mais relevantes para quem for mexer no código:

- **Cotação de câmbio:** já trocamos de provedor uma vez (de AwesomeAPI para open.er-api.com) porque a primeira API ficava fora do ar por sobrecarga global, mesmo com pouco uso nosso. Tem cache de 1h para evitar repetir chamada à toa.
- **Itens da venda** vêm do Context, não são passados pela rota de navegação (rota só leva total e cotações).
- **Scanner** usa só `expo-camera`, sem biblioteca extra.
- **Produto repetido** no scanner incrementa quantidade, não duplica linha.

## Como continuar desenvolvendo

O projeto segue um fluxo de **spec primeiro, código depois** (SDD — Spec-Driven Development), com o Claude Code como ferramenta de implementação:

1. Toda tela/funcionalidade tem uma spec em `specs/` com contexto, critérios de aceite e o que **não** fazer (non-goals). Leia a spec antes de mexer.
2. Trabalhe em um branch próprio: `git checkout -b tela/nome-da-mudanca`.
3. Abra o Claude Code na pasta do projeto — ele carrega `CLAUDE.md` e as specs automaticamente.
4. Depois de implementar: rode `npx tsc --noEmit` para checar tipos.
5. Antes do PR: peça uma revisão (o projeto tem um comando/agente de revisão configurado, veja `.claude/commands/` e `.claude/agents/`) que confere contra os critérios da spec.
6. Abra o Pull Request para `main`.

**Arquivos protegidos:** `services/`, `context/`, `types/`, `app/index.tsx`, `app/_layout.tsx` e a pasta `specs/` têm um "dono" (Douglas) e mudanças neles devem ser conversadas antes — eles são a base que todas as telas usam, então uma mudança ali afeta todo mundo.

Regras completas em [`CLAUDE.md`](./CLAUDE.md) e [`specs/00-constituicao.md`](./specs/00-constituicao.md).

## Problemas já resolvidos (não repita o mesmo caminho)

- **Expo Go incompatível:** o projeto está fixo em SDK 54; o Expo Go da loja vem em versão mais nova. Instale pela versão certa — ver `ONBOARDING.md`.
- **Rate limit de API de câmbio:** se "Cotação indisponível" aparecer com frequência, não é bug — é limite temporário da API gratuita. Já tem cache implementado; evite testar o mesmo endpoint manualmente em rajada (navegador + app contam para o mesmo limite).
- **Safe area (Android):** conteúdo no rodapé das telas respeita a barra de navegação do sistema (`SafeAreaView`/`useSafeAreaInsets`). Se adicionar algo no rodapé de uma tela nova, siga o mesmo padrão.

## Equipe

Douglas, Diego, Felipe, Gabriel, Lucas — PDM 2026.2.
