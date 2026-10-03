# Onboarding — NEXO Mobile

Guia para quem está entrando no projeto agora. Em 10 minutos você tem o app rodando no seu celular.

---

## 1. Pré-requisitos

- **Node.js** instalado (LTS mais recente) — [nodejs.org](https://nodejs.org)
- **Git** instalado
- **Celular Android** (iPhone não funciona para desenvolvimento local — ver nota no fim)
- **VS Code** (ou outro editor) com terminal

## 2. Clonar e instalar

```bash
git clone https://github.com/oliveiiradg/Nexo-Mobile.git
cd Nexo-Mobile
npm install
```

## 3. Colocar o `.env`

O `.env` **não vem no repositório** de propósito (tem as chaves de configuração do Firebase, e não deve ficar público). Você recebeu esse arquivo separadamente (grupo do WhatsApp).

Coloca o arquivo `.env` **direto na raiz do projeto** — mesma pasta onde está o `package.json`. Não precisa editar nada nele, já vem preenchido.

Confirma que deu certo: deve existir `Nexo-Mobile/.env` (visível no VS Code; se não aparecer, ative "mostrar arquivos ocultos" — alguns editores escondem arquivos que começam com ponto).

## 4. Instalar o Expo Go — versão certa (SDK 54)

**Importante:** o Expo Go da Play Store normalmente já está em uma versão mais nova que a nossa (SDK 57+). Se você instalar o da loja direto, vai dar erro `Project is incompatible with this version of Expo Go`.

1. Se já tiver o Expo Go instalado, desinstala.
2. Instala pela versão certa: **https://expo.dev/go?sdkVersion=54&platform=android&device=true**

## 5. Rodar o projeto

```bash
npx expo start
```

Vai aparecer um QR code no terminal. Abre o Expo Go (o da versão certa) no celular e escaneia.

**Celular e PC precisam estar na mesma rede Wi-Fi.** Se não estiverem (ex.: testando de redes diferentes), usa:

```bash
npx expo start --tunnel
```

## 6. Login de teste

- **E-mail:** `douglas@nexo.com`
- **Senha:** peça no grupo

Ou, se você já tem seu próprio usuário operador criado no Firebase, usa o seu.

## 7. Acesso ao Firebase e GitHub

Você já deve ter recebido convite por e-mail para:
- **Firebase** (console.firebase.google.com) — projeto `nexo-mobile-unesa`
- **GitHub** (github.com/oliveiiradg/Nexo-Mobile) — aceita o convite de colaborador para poder dar push

Se não recebeu nenhum dos dois, avisa no grupo.

---

## Problemas comuns

| Sintoma | Causa | Solução |
|---|---|---|
| `Project is incompatible with this version of Expo Go` | Expo Go na versão errada | Reinstala pelo link do passo 4 |
| Tela fica em branco / trava no loading | Bundle desatualizado no celular | Fecha o app no celular (desliza pra fora dos recentes) e escaneia o QR de novo |
| `Erro ao buscar cotações` / "Cotação indisponível" | API de câmbio fora do ar ou limite de uso temporário | Normal acontecer às vezes; espera alguns minutos. Se persistir, avisa no grupo — já trocamos de provedor uma vez por causa disso (ver `specs/decisoes.md`, D-01) |
| `npm install` falha | Versão de Node muito antiga | Atualiza o Node para a LTS mais recente |
| Câmera não abre / pede permissão toda hora | Permissão negada no Android | Vai em Configurações do celular → Apps → Expo Go → Permissões → Câmera → Permitir |

## Sobre iPhone

O Expo Go para iOS só instala a versão mais recente (SDK mais novo), e não dá pra forçar uma versão antiga como no Android. Então **não dá pra testar localmente em iPhone** com esse fluxo. Alternativa: pedir para alguém com Android testar, ou gerar um build de desenvolvimento via EAS (fala com o Douglas sobre isso).

---

*Dúvidas? Fala no grupo. Documentação técnica completa em [`README.md`](./README.md) e nas specs em [`specs/`](./specs/).*
