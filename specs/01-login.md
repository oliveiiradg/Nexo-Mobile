# Spec 01 — Tela de Login

**Branch:** `tela/login` · **Depende de:** scaffold pronto (`tasks/00-scaffold.md`) · **Checklist:** `tasks/01-login.md`

## Escopo de arquivos

- **Pode editar:** `app/login.tsx`
- **Pode importar (só leitura):** `services/auth.ts` (`login`, `observarSessao`), `expo-router`

## Comportamento

Primeira tela do app. O operador entra com e-mail e senha cadastrados no Firebase Auth. Login OK → `/caixa`. Se já houver sessão ativa, vai direto para `/caixa`.

`app/index.tsx` (do Douglas) já roteia a abertura do app. A tela de Login também confere a sessão por conta própria, como pede o card. Os dois existem por design; não remova nenhum.

## Acceptance criteria

- **L-01** Campo de e-mail com teclado `email-address`
- **L-02** Campo de senha com `secureTextEntry`
- **L-03** Botão "Entrar" chama `login(email, password)`
- **L-04** Loading indicator enquanto o login processa
- **L-05** Mensagem de erro legível para e-mail/senha incorretos (nunca o erro técnico do Firebase)
- **L-06** Login com sucesso → `router.replace('/caixa')`
- **L-07** Sessão ativa ao abrir a tela → `/caixa` sem passar pelo login (via `observarSessao`, limpando a inscrição ao desmontar)
- **L-08** Botão "Entrar" desabilitado se algum campo estiver vazio

## Non-goals

- Cadastro de novo usuário (usuários são criados no Firebase Console)
- Recuperação de senha
- Login social

## Mensagens de erro (sugestão)

Mapear `error.code` do Firebase para texto pt-BR:

| Código                                                     | Mensagem                                    |
|------------------------------------------------------------|---------------------------------------------|
| `auth/invalid-credential`, `auth/wrong-password`, `auth/user-not-found` | "E-mail ou senha incorretos."   |
| `auth/invalid-email`                                       | "E-mail inválido."                          |
| `auth/too-many-requests`                                   | "Muitas tentativas. Tente novamente em instantes." |
| `auth/network-request-failed`                              | "Sem conexão. Verifique a internet."        |
| qualquer outro                                             | "Não foi possível entrar. Tente novamente." |

## Como validar

1. Usuário de teste criado no Firebase Console.
2. Campos vazios → botão desabilitado.
3. Senha errada → mensagem legível, sem texto técnico.
4. Credenciais corretas → vai para Caixa.
5. Fechar e reabrir o app logado → abre direto na Caixa.
6. Sem internet → mensagem de conexão.
