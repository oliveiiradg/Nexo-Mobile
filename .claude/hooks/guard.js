#!/usr/bin/env node
// Guarda de escopo do NEXO Mobile (roda antes de Edit/Write/MultiEdit).
// Exit 2 = bloqueia e devolve a mensagem para o Claude.
// Douglas libera tudo (exceto .env) abrindo o Claude Code com NEXO_OWNER=1.

const { execSync } = require('child_process');
const path = require('path');

// Arquivos liberados por branch de tela.
const TELAS = {
  'tela/login': ['app/login.tsx', 'tasks/01-login.md'],
  'tela/caixa': ['app/caixa.tsx', 'tasks/02-caixa.md'],
  'tela/carrinho': [
    'app/carrinho.tsx',
    'components/ProdutoCard.tsx',
    'components/CotacaoTag.tsx',
    'tasks/03-carrinho.md',
  ],
  'tela/confirmacao': ['app/confirmacao.tsx', 'tasks/04-confirmacao.md'],
};

// Protegidos em qualquer branch que não seja de tela (ex.: fix/...).
const PROTEGIDOS = [
  'CLAUDE.md',
  'README.md',
  '.gitignore',
  '.env.example',
  'package.json',
  'package-lock.json',
  'app.json',
  'tsconfig.json',
  'services/firebase.ts',
  'services/auth.ts',
  'services/exchange.ts',
  'services/vendas.ts',
  'context/CarrinhoContext.tsx',
  'constants/moedas.ts',
  'types/index.ts',
  'app/index.tsx',
  'app/_layout.tsx',
  'tasks/STATUS.md',
  'tasks/00-scaffold.md',
];
const PROTEGIDOS_PREFIXOS = ['.claude/', 'specs/'];

let raw = '';
process.stdin.on('data', (c) => (raw += c)).on('end', () => {
  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    process.exit(0);
  }

  const alvo = (input.tool_input && (input.tool_input.file_path || input.tool_input.path)) || '';
  if (!alvo) process.exit(0);

  const root = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
  const rel = path.relative(root, alvo).split('\\').join('/');
  if (rel.startsWith('..')) process.exit(0);

  const bloquear = (msg) => {
    console.error('BLOQUEADO pelo guard do NEXO Mobile: ' + msg);
    process.exit(2);
  };

  // .env nunca é editado por agente, nem pelo dono.
  if (rel === '.env' || (rel.startsWith('.env.') && rel !== '.env.example')) {
    bloquear('.env não pode ser lido nem editado por agente. Credenciais ficam só na máquina de cada pessoa.');
  }

  if (process.env.NEXO_OWNER === '1') process.exit(0);

  let branch = '';
  try {
    branch = execSync('git branch --show-current', { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    branch = '';
  }

  if (branch === 'main') {
    bloquear('edição direta na main. Crie um branch tela/<nome> (ex.: git checkout -b tela/login).');
  }

  if (branch.startsWith('tela/')) {
    const permitidos = TELAS[branch] || [];
    if (permitidos.includes(rel)) process.exit(0);
    bloquear(
      `"${rel}" está fora do escopo do branch ${branch}. Arquivos permitidos: ${
        permitidos.join(', ') || '(nenhum: branch de tela desconhecido)'
      }. Precisa de mudança em outro arquivo? Fale com o Douglas.`
    );
  }

  if (PROTEGIDOS.includes(rel) || PROTEGIDOS_PREFIXOS.some((p) => rel.startsWith(p))) {
    bloquear(`"${rel}" é arquivo compartilhado/protegido (dono: Douglas). Peça a mudança a ele.`);
  }

  process.exit(0);
});
