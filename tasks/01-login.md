# Checklist — Card 01 Login (`tela/login`)

Spec: `specs/01-login.md`. Marque cada item ao concluir.

- [ ] L-01 E-mail com teclado `email-address`
- [ ] L-02 Senha com `secureTextEntry`
- [ ] L-03 "Entrar" chama `login(email, password)`
- [ ] L-04 Loading enquanto processa
- [ ] L-05 Erro legível para credenciais erradas
- [ ] L-06 Sucesso → `router.replace('/caixa')`
- [ ] L-07 Sessão ativa → direto para `/caixa`
- [ ] L-08 "Entrar" desabilitado com campo vazio

Fechamento:

- [ ] Nenhum non-goal implementado
- [ ] `npx tsc --noEmit` passa
- [ ] Validado pelos passos de "Como validar"
- [ ] `/revisar` APROVADO
- [ ] PR aberto para `main`
