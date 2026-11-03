// DRAFT / NOT ACTIVE — 3.2.0 candidate structural test.
// Dependency-free Node 18+ test. Run from any working directory:
//   node draft/3.2.0/tests/check-protocol.mjs

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../../..');
const draftDir = resolve(repoRoot, 'draft/3.2.0');
const changelog = resolve(repoRoot, 'CHANGELOG.md');

let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(path) {
  return readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
}

function sha256(path) {
  return createHash('sha256').update(read(path), 'utf8').digest('hex');
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = resolve(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) out.push(...walk(path));
    else out.push(path);
  }
  return out;
}

function check(name, fn) {
  const number = passed + failed + 1;
  try {
    const detail = fn();
    passed += 1;
    console.log('ok ' + number + ' - ' + name + (detail ? ' [' + detail + ']' : ''));
  } catch (error) {
    failed += 1;
    failures.push(name + ': ' + error.message);
    console.log('not ok ' + number + ' - ' + name + ' :: ' + error.message);
  }
}

const markdownFiles = () => walk(draftDir).filter((p) => p.endsWith('.md'));

function parseFrontmatter(text) {
  assert(text.startsWith('---\n'), 'missing opening frontmatter');
  const end = text.indexOf('\n---', 4);
  assert(end !== -1, 'missing closing frontmatter');
  const lines = text.slice(4, end).split('\n');
  const top = {};
  const metadata = {};
  let current = null;
  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    if (/^\s{2,}/.test(line) && current === 'metadata') {
      const m = line.match(/^\s+([A-Za-z0-9_-]+):\s*(.*)$/);
      if (m) metadata[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
      continue;
    }
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    assert(m, 'unparsed frontmatter line: ' + line);
    current = m[1];
    top[current] = m[2].replace(/^["']|["']$/g, '').trim();
  }
  return { top, metadata, body: text.slice(end + 4) };
}

function localLinks(text) {
  const links = [];
  const re = /\[[^\]]+\]\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(text)) !== null) links.push(m[1]);
  return links;
}

function checkLocalLinks(file) {
  const text = read(file);
  const links = localLinks(text);
  const missing = [];
  for (const raw of links) {
    let target = raw.trim();
    if (target.startsWith('<') && target.endsWith('>')) target = target.slice(1, -1);
    if (/^(https?:|mailto:|tel:|#)/i.test(target)) continue;
    target = target.split('#')[0].split('?')[0];
    if (!target) continue;
    const abs = target.startsWith('/')
      ? resolve(repoRoot, '.' + target)
      : resolve(dirname(file), target);
    if (!existsSync(abs)) missing.push(raw + ' -> ' + abs);
  }
  assert(missing.length === 0, 'missing local link targets: ' + missing.join('; '));
  return links.length + ' local links';
}

const required = [
  'CHANGELOG.md',
  'SKILL.md',
  'README.md',
  'LICENSE',
  'draft/3.2.0/README.md',
  'draft/3.2.0/SKILL.md',
  'draft/3.2.0/DESIGN.md',
  'draft/3.2.0/COMPATIBILITY.md',
  'draft/3.2.0/reuse-radar.md',
  'draft/3.2.0/decisions/README.md',
  'draft/3.2.0/records/README.md',
  'draft/3.2.0/references/README.md',
  'draft/3.2.0/references/global-search.md',
  'draft/3.2.0/references/evidence-and-scoring.md',
  'draft/3.2.0/references/resource-inventory.md',
  'draft/3.2.0/references/cost-control.md',
  'draft/3.2.0/references/multi-agent-handoff.md',
  'draft/3.2.0/references/security-governance.md',
  'draft/3.2.0/references/validation.md',
  'draft/3.2.0/references/knowledge-retention.md',
  'draft/3.2.0/templates/README.md',
  'draft/3.2.0/templates/task-handoff.md',
  'draft/3.2.0/templates/resource-inventory.md',
  'draft/3.2.0/templates/cost-ledger.md',
  'draft/3.2.0/templates/validation-report.md',
  'draft/3.2.0/templates/reuse-radar.md',
  'draft/3.2.0/templates/decision-record.md',
  'draft/3.2.0/templates/task-record.md',
  'draft/3.2.0/tests/test-cases.md',
  'draft/3.2.0/tests/acceptance-criteria.md',
  'draft/3.2.0/tests/check-protocol.mjs',
  'draft/3.2.0/tests/TEST-REPORT.md'
];

const rootHashes = {
  'SKILL.md': '6ecfb1b7250156242c729e53e2f0cef67411d943f81abf6204cdae695ff8ae76',
  'README.md': '76c2d045f5491fb6c783e36db533485b557e5b67ea72c6c0ad755c2069dc5a60',
  'LICENSE': '7f18f7e3fcc2dc4f6d052ddb64a1ba303e9b56092d2166c5c107a814a2eb52aa'
};

check('required directory and file structure', () => {
  const missing = required.filter((p) => !existsSync(resolve(repoRoot, p)));
  assert(missing.length === 0, 'missing: ' + missing.join(', '));
  return required.length + ' required paths';
});

check('3.1.0 root files are byte-identical', () => {
  const bad = [];
  for (const [name, expected] of Object.entries(rootHashes)) {
    const actual = sha256(resolve(repoRoot, name));
    if (actual !== expected) bad.push(name + ' ' + actual);
  }
  assert(bad.length === 0, 'changed: ' + bad.join(', '));
  return '3 files match SHA-256';
});

check('root skill remains active 3.1.0', () => {
  const fm = parseFrontmatter(read(resolve(repoRoot, 'SKILL.md'))).top;
  assert(fm.version === '3.1.0', 'version is ' + fm.version);
  assert(fm.status === 'active', 'status is ' + fm.status);
  return 'version 3.1.0, status active';
});

check('every draft Markdown file carries DRAFT / NOT ACTIVE', () => {
  const bad = [];
  for (const file of markdownFiles()) {
    const head = read(file).split('\n').slice(0, 15).join('\n');
    if (!head.includes('DRAFT / NOT ACTIVE')) bad.push(relative(repoRoot, file));
  }
  assert(bad.length === 0, 'missing banner: ' + bad.join(', '));
  return markdownFiles().length + ' Markdown files';
});

check('draft SKILL frontmatter is standard and inactive', () => {
  const { top, metadata } = parseFrontmatter(read(resolve(draftDir, 'SKILL.md')));
  const allowed = new Set(['name', 'description', 'license', 'compatibility', 'metadata']);
  const extra = Object.keys(top).filter((k) => !allowed.has(k));
  assert(extra.length === 0, 'non-standard top-level fields: ' + extra.join(', '));
  assert(top.name === 'network-reuse-protocol', 'bad name');
  assert(top.license === 'MIT', 'bad license');
  assert(top.description.length > 0 && top.description.length <= 1024, 'description length');
  assert(top.compatibility.length > 0 && top.compatibility.length <= 500, 'compatibility length');
  assert(metadata.version === '3.2.0', 'metadata.version');
  assert(metadata.release_status === 'draft', 'metadata.release_status');
  assert(metadata.active === 'false', 'metadata.active');
  return 'name/description/license/compatibility/metadata valid';
});

check('draft SKILL body is within 100 lines and 5 KB', () => {
  const { body } = parseFrontmatter(read(resolve(draftDir, 'SKILL.md')));
  const lines = body.split('\n').filter((l, i, arr) => !(i === arr.length - 1 && l === '')).length;
  const bytes = Buffer.byteLength(body, 'utf8');
  assert(lines <= 100, 'body has ' + lines + ' lines');
  assert(bytes <= 5120, 'body has ' + bytes + ' bytes');
  return lines + ' lines, ' + bytes + ' bytes';
});

check('all local Markdown links resolve', () => {
  const files = [changelog, ...markdownFiles()];
  let count = 0;
  for (const file of files) {
    const detail = checkLocalLinks(file);
    count += Number(detail.split(' ')[0]);
  }
  assert(count >= 25, 'only ' + count + ' local links found');
  return count + ' links across ' + files.length + ' files';
});

check('Markdown fences, whitespace, and headings are clean', () => {
  const bad = [];
  for (const file of [changelog, ...markdownFiles()]) {
    const text = read(file);
    const lines = text.split('\n');
    if (lines.some((l) => /\s+$/.test(l))) bad.push(relative(repoRoot, file) + ': trailing whitespace');
    if (lines.some((l) => l.includes('\t'))) bad.push(relative(repoRoot, file) + ': tab');
    const fence = String.fromCharCode(96).repeat(3);
    const fences = lines.filter((l) => l.startsWith(fence) || l.startsWith('~~~')).length;
    if (fences % 2 !== 0) bad.push(relative(repoRoot, file) + ': unbalanced fence');
    if (!/^#\s+\S/m.test(text)) bad.push(relative(repoRoot, file) + ': no H1');
    let level = 0;
    for (const line of lines) {
      const m = line.match(/^(#{1,6})\s/);
      if (!m) continue;
      const n = m[1].length;
      if (level && n > level + 1) {
        bad.push(relative(repoRoot, file) + ': heading jump H' + level + ' to H' + n);
      }
      level = n;
    }
  }
  assert(bad.length === 0, bad.join('; '));
  return 'no fence, whitespace, tab, or heading errors';
});

check('eight capabilities are mapped in README and DESIGN', () => {
  const text = read(resolve(draftDir, 'README.md')) + read(resolve(draftDir, 'DESIGN.md'));
  const capabilities = [
    'Global mature-solution search',
    'Resource inventory',
    'AI cost control',
    'Multi-AI collaboration',
    'Execution and security governance',
    'L1–L4 acceptance',
    'Long-term knowledge retention',
    'Mature-solution decision'
  ];
  const missing = capabilities.filter((c) => !text.includes(c));
  assert(missing.length === 0, 'missing: ' + missing.join(', '));
  return capabilities.length + ' capabilities';
});

check('handoff fields and seven statuses are fixed', () => {
  const text = read(resolve(draftDir, 'references/multi-agent-handoff.md')) +
    read(resolve(draftDir, 'templates/task-handoff.md'));
  const fields = ['任务编号', '目标', '现有成果', '证据', '方案', '负责人', '当前状态', '阻塞问题', '验收标准', '下一步'];
  const statuses = ['待领取', '研究中', '待执行', '执行中', '待验收', '已完成', '阻塞'];
  const missing = fields.concat(statuses).filter((x) => !text.includes(x));
  assert(missing.length === 0, 'missing: ' + missing.join(', '));
  assert(text.includes('ten fields'), 'field count wording missing');
  return '10 fields and 7 statuses';
});

check('resource inventory template has duplicate and install gates', () => {
  const text = read(resolve(draftDir, 'templates/resource-inventory.md'));
  const requiredTerms = ['Duplicate check', 'Install gate', 'Last verified', 'Review by', 'Auth ref', 'Capability tags'];
  const missing = requiredTerms.filter((x) => !text.includes(x));
  assert(missing.length === 0, 'missing: ' + missing.join(', '));
  return requiredTerms.length + ' inventory fields/steps';
});

check('cost ledger separates actual and estimated cost', () => {
  const text = read(resolve(draftDir, 'templates/cost-ledger.md'));
  const requiredTerms = ['Actual or estimated', 'Measured saving', 'Baseline', 'Cap', 'Estimated total', 'Actual total'];
  const missing = requiredTerms.filter((x) => !text.includes(x));
  assert(missing.length === 0, 'missing: ' + missing.join(', '));
  assert(text.includes('A token count is not a currency amount'), 'missing token/currency warning');
  return requiredTerms.length + ' cost fields';
});

check('L1–L4 validation is defined and not inflated', () => {
  const text = read(resolve(draftDir, 'references/validation.md')) +
    read(resolve(draftDir, 'templates/validation-report.md')) +
    read(resolve(draftDir, 'tests/test-cases.md'));
  const requiredTerms = ['L1', 'L2', 'L3', 'L4', 'not tested', 'not claimable'];
  const missing = requiredTerms.filter((x) => !text.includes(x));
  assert(missing.length === 0, 'missing: ' + missing.join(', '));
  return 'four levels with limitation language';
});

check('three project scenarios are covered without production operation', () => {
  const text = read(resolve(draftDir, 'tests/test-cases.md'));
  const scenarios = ['东方有线', '小红书聚光', '描眉画目 GEO'];
  const missing = scenarios.filter((x) => !text.includes(x));
  assert(missing.length === 0, 'missing: ' + missing.join(', '));
  assert(text.includes('read-only'), 'read-only boundary missing');
  assert(text.includes('do not') || text.includes('Do not'), 'prohibition language missing');
  assert(text.includes('not authorized'), 'L3 authorization limit missing');
  return scenarios.length + ' scenarios';
});

check('test case count and global IDs are present', () => {
  const text = read(resolve(draftDir, 'tests/test-cases.md'));
  const ids = text.match(/^### [A-Z][0-9]+/gm) || [];
  assert(ids.length >= 20, 'only ' + ids.length + ' cases');
  assert(ids.some((x) => x.includes('G1')) && ids.some((x) => x.includes('X4')), 'missing case range');
  return ids.length + ' cases';
});

check('standards matrix covers all seven candidates', () => {
  const text = read(resolve(draftDir, 'COMPATIBILITY.md'));
  const standards = ['Agent Skills', 'AGENTS.md', 'MCP', 'A2A', 'Open Responses', 'OpenSandbox', 'OpenEnv'];
  const missing = standards.filter((x) => !text.includes(x));
  assert(missing.length === 0, 'missing: ' + missing.join(', '));
  assert(text.includes('No standard, package, server, or runtime is required'), 'dependency disclaimer missing');
  assert(text.includes('2026-11-03'), 'verification date missing');
  return standards.length + ' standards';
});

check('reuse radar has dated, expiring entries', () => {
  const text = read(resolve(draftDir, 'reuse-radar.md'));
  const ids = text.match(/RAD-[0-9]{3}/g) || [];
  const unique = new Set(ids);
  assert(unique.size >= 7, 'only ' + unique.size + ' radar entries');
  assert(text.includes('2026-11-03'), 'verification date missing');
  assert(text.includes('Review by'), 'review field missing');
  assert(text.includes('stale'), 'stale policy missing');
  return unique.size + ' entries';
});

check('no secrets, private keys, or absolute local paths', () => {
  const bad = [];
  for (const file of [changelog, ...markdownFiles()]) {
    const text = read(file);
    if (/sk-[A-Za-z0-9]{20,}/.test(text)) bad.push(relative(repoRoot, file) + ': sk- secret');
    if (/ghp_[A-Za-z0-9]{20,}/.test(text)) bad.push(relative(repoRoot, file) + ': ghp secret');
    if (/AKIA[0-9A-Z]{16}/.test(text)) bad.push(relative(repoRoot, file) + ': AWS key');
    if (/BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY/.test(text)) bad.push(relative(repoRoot, file) + ': private key');
    if (/[A-Za-z]:\\/.test(text)) bad.push(relative(repoRoot, file) + ': absolute Windows path');
    if (/\/Users\/[^/\s]+/.test(text) || /\/home\/[^/\s]+/.test(text)) bad.push(relative(repoRoot, file) + ': absolute home path');
  }
  assert(bad.length === 0, bad.join('; '));
  return 'no secret or absolute-path patterns';
});

check('no package manager or service dependency was added', () => {
  const forbidden = ['package.json', 'package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', 'requirements.txt', 'pyproject.toml', 'Cargo.toml'];
  const found = forbidden.filter((p) => existsSync(resolve(repoRoot, p)));
  assert(found.length === 0, 'unexpected dependency files: ' + found.join(', '));
  return 'Markdown and one Node test only';
});

check('draft status never claims active', () => {
  const bad = [];
  for (const file of markdownFiles()) {
    const text = read(file);
    if (/^(status|active):\s*(active|true)\s*$/mi.test(text)) bad.push(relative(repoRoot, file));
  }
  assert(bad.length === 0, 'active claim in: ' + bad.join(', '));
  return 'no active claims';
});

check('local main is not modified', () => {
  try {
    const main = execFileSync('git', ['rev-parse', 'main'], { cwd: repoRoot, encoding: 'utf8' }).trim();
    const origin = execFileSync('git', ['rev-parse', 'origin/main'], { cwd: repoRoot, encoding: 'utf8' }).trim();
    assert(main === origin, 'local main ' + main + ' != origin/main ' + origin);
    const changed = execFileSync('git', ['diff', '--name-only', 'main..HEAD', '--', 'SKILL.md', 'README.md', 'LICENSE'], { cwd: repoRoot, encoding: 'utf8' }).trim();
    assert(changed === '', 'root files differ from main: ' + changed);
    return 'main=' + main.slice(0, 7);
  } catch (error) {
    if (/not a git repository|unknown revision|ambiguous argument|Not a valid object name/i.test(error.message)) {
      return 'skipped: git main unavailable';
    }
    throw error;
  }
});

check('draft README links every capability reference', () => {
  const text = read(resolve(draftDir, 'README.md'));
  const references = [
    'references/global-search.md',
    'references/evidence-and-scoring.md',
    'references/resource-inventory.md',
    'references/cost-control.md',
    'references/multi-agent-handoff.md',
    'references/security-governance.md',
    'references/validation.md',
    'references/knowledge-retention.md'
  ];
  const missing = references.filter((x) => !text.includes(x));
  assert(missing.length === 0, 'missing: ' + missing.join(', '));
  return references.length + ' reference links';
});

check('acceptance criteria covers the twelve engineering tests', () => {
  const text = read(resolve(draftDir, 'tests/acceptance-criteria.md'));
  const rows = text.match(/^\| [0-9]+ \|/gm) || [];
  assert(rows.length >= 12, 'only ' + rows.length + ' engineering rows');
  for (const term of ['Skill file structure', 'Markdown format', 'relative paths', 'Directory structure', 'Resource inventory', 'Task handoff', 'Cost ledger', 'L1–L4', 'three project scenarios', '3.1.0', 'Cross-platform', 'Main not modified']) {
    assert(text.includes(term), 'missing test: ' + term);
  }
  return rows.length + ' engineering tests';
});

console.log('');
console.log('SUMMARY: ' + passed + ' passed, ' + failed + ' failed');
if (failed) {
  console.log('FAILURES:');
  for (const failure of failures) console.log('- ' + failure);
  process.exit(1);
}
console.log('RESULT: PASS (L1 structural; L2 local execution)');
