---
name: nexo-deploy
description: Entrega do NEXO Mobile — preflight na main, build de teste Android via EAS e validação do app instalado. Só Douglas.
---

# Deploy — NEXO Mobile

Só o Douglas roda isto (`NEXO_OWNER=1`), na `main`.

## Sequência obrigatória

### 1. Preflight

```bash
git branch --show-current
git fetch && git status -sb
npx tsc --noEmit
npx expo-doctor
git ls-files .env
grep -rn "AIza" app services context components
```

Esperado: branch `main`, sincronizada e sem pendências; `tsc` sem erro; `expo-doctor` sem erro crítico; `git ls-files .env` vazio; nenhuma chave escrita no código.

Conferir em `tasks/STATUS.md` que as 4 telas estão "Concluído" e os PRs mergeados. Se qualquer item falhar, parar e investigar antes de continuar.

### 2. Validar dependências externas

```bash
curl -s "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL" || echo "AwesomeAPI fora"
```

A resposta deve trazer `USDBRL` e `EURBRL`. Perguntar ao Douglas se as Firestore Rules de `tasks/00-scaffold.md` estão publicadas.

### 3. Build de teste (só com "sim" explícito do Douglas)

Roda na nuvem da Expo e consome a cota da conta. Sempre confirmar antes.

```bash
npx eas-cli whoami
```

Se `eas.json` não existir, mostrar o conteúdo abaixo e perguntar se pode criá-lo:

```json
{
  "cli": { "version": ">= 12.0.0" },
  "build": {
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" }
    }
  }
}
```

```bash
npx eas-cli build --platform android --profile preview
```

### 4. Validar o build instalado

Em aparelho real, fluxo completo: Login → Caixa (escanear) → Carrinho (cotações carregam) → Confirmação. Depois conferir no Firestore o documento novo em `vendas`: `operador_id`, `created_at` do servidor, `total_brl`, `cotacao_usd`/`cotacao_eur` iguais às exibidas e `itens`. Este é o equivalente do health check.

### 5. Fechamento

Registrar em `tasks/STATUS.md` a data e o link do build.

## Rollback

Se o build novo quebrou:
- Reinstalar o APK do build anterior (histórico no painel do EAS)
- Reverter o commit problemático na `main` via PR: `git revert <sha>`. Nunca `git reset --hard`.

## Referências

- Cotação: `https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL`
- Coleções do Firestore: `produtos`, `vendas`
- Build: painel do EAS (expo.dev)
