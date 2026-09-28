# Constituição do NEXO Mobile

Regras que valem para todas as telas. Em conflito, esta ordem de precedência: `contratos.md` > `decisoes.md` > spec da tela > `CLAUDE.md`.

## Princípios

1. **A spec é a fonte da verdade.** Código que não está na spec não entra. Spec que o código não consegue cumprir vira pergunta para o Douglas, não gambiarra.
2. **Escopo fechado.** Um card, uma tela, os arquivos listados em "Pode editar". Nada além.
3. **Contratos são lei.** Tipos, assinaturas, rotas e params estão em `contratos.md`. Ninguém muda sozinho.
4. **TypeScript estrito.** Sem `any` em contratos públicos. `npx tsc --noEmit` precisa passar.
5. **Operador nunca vê erro técnico.** Toda falha vira mensagem legível em pt-BR. O detalhe técnico vai só para o `console`.
6. **Toda chamada assíncrona tem loading e erro.** Botões que disparam chamada ficam desabilitados enquanto ela roda (evita clique duplo).
7. **Sem credenciais no repositório.** Config do Firebase só via `EXPO_PUBLIC_*` no `.env` local. Os dados de Firebase da web não são segredo, mas o `.env` não sobe mesmo assim.
8. **As regras do Firestore são o backend de segurança.** O app fala direto com o Firestore, então as Rules (em `tasks/00-scaffold.md`) são a única barreira. Ninguém as afrouxa sem falar com o Douglas.
9. **Sem dependências novas.** Só o stack do `CLAUDE.md`. Feedback visual (toast, banner) é feito com componentes nativos do React Native.
10. **Cotação nunca direto na tela.** Passa por `services/exchange.ts`.

## Definition of Done (por tela)

- [ ] Todos os acceptance criteria da spec estão atendidos e marcados em `tasks/0N-<tela>.md`
- [ ] Nenhum non-goal foi implementado
- [ ] Só arquivos da lista "Pode editar" foram alterados
- [ ] `npx tsc --noEmit` passa
- [ ] Testado manualmente pelos passos de "Como validar" da spec (Expo Go em aparelho real ou emulador)
- [ ] `/revisar` retornou APROVADO
- [ ] PR aberto para `main` a partir do branch `tela/<nome>`

## Quando parar e perguntar

- A spec é ambígua ou contradiz outra spec
- Falta uma função, tipo ou arquivo que a spec diz que existe
- A tela precisa de algo de um arquivo fora do seu escopo
- Um acceptance criteria parece impossível de cumprir como está escrito
