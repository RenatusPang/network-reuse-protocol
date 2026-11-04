// Draft 3.3.0 structural checks; preserve the published 3.2.0 baseline.
// Dependency-free Node 18+ test. Run from any working directory:
//   node tests/check-protocol.mjs

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..');
const changelog = resolve(repoRoot, 'CHANGELOG.md');
const baselineMain = 'da1a7160204ba5412db7efd881a96b925cdd7494';

let passed = 0;
let failed = 0;
let skipped = 0;
const failures = [];
const skips = [];

class Skip extends Error {
  constructor(message) {
    super(message);
    this.name = 'Skip';
  }
}

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
    if (name === '.git' || name === 'node_modules') continue;
    const path = resolve(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) out.push(...walk(path));
    else out.push(path);
  }
  return out;
}

function check(name, fn) {
  // The mutation suite targets these two checks only; no repeated network checks.
  if (process.argv.includes('--search-regression') &&
    !['candidate SKILL frontmatter is standard and inactive', 'search quality contract and five regression scenarios'].includes(name)) return;
  const number = passed + failed + skipped + 1;
  try {
    const detail = fn();
    passed += 1;
    console.log('PASS ' + number + ' - ' + name + (detail ? ' [' + detail + ']' : ''));
  } catch (error) {
    if (error instanceof Skip) {
      skipped += 1;
      skips.push(name + ': ' + error.message);
      console.log('SKIP ' + number + ' - ' + name + ' :: ' + error.message);
      return;
    }
    failed += 1;
    failures.push(name + ': ' + error.message);
    console.log('FAIL ' + number + ' - ' + name + ' :: ' + error.message);
  }
}

function git(args) {
  return execFileSync('git', args, {
    cwd: repoRoot,
    encoding: 'utf8',
    timeout: 30000,
    stdio: ['ignore', 'pipe', 'pipe']
  }).trim();
}

function unavailable(action, error) {
  const firstLine = String(error.message || error).split('\n')[0].trim();
  return new Skip(action + ' unavailable: ' + firstLine);
}

const markdownFiles = () => walk(repoRoot).filter((p) => p.endsWith('.md'));

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
    assert(!target.startsWith('/'), 'absolute local link in ' + relative(repoRoot, file) + ': ' + raw);
    const abs = resolve(dirname(file), target);
    const rel = relative(repoRoot, abs);
    assert(rel && !rel.startsWith('..') && !isAbsolute(rel), 'link escapes repository: ' + raw + ' in ' + relative(repoRoot, file));
    if (!existsSync(abs)) missing.push(raw + ' -> ' + abs);
  }
  assert(missing.length === 0, 'missing local link targets: ' + missing.join('; '));
  return links.length;
}

const required = [
  'CHANGELOG.md',
  'SKILL.md',
  'README.md',
  'LICENSE',
  'DESIGN.md',
  'COMPATIBILITY.md',
  'reuse-radar.md',
  'decisions/README.md',
  'decisions/2026-11-03-keep-3.1.0-active.md',
  'decisions/2026-11-03-promote-3.2.0.md',
  'records/README.md',
  'references/README.md',
  'references/global-search.md',
  'references/evidence-and-scoring.md',
  'references/resource-inventory.md',
  'references/cost-control.md',
  'references/multi-agent-handoff.md',
  'references/security-governance.md',
  'references/validation.md',
  'references/knowledge-retention.md',
  'templates/README.md',
  'templates/task-handoff.md',
  'templates/resource-inventory.md',
  'templates/cost-ledger.md',
  'templates/validation-report.md',
  'templates/reuse-radar.md',
  'templates/decision-record.md',
  'templates/task-record.md',
  'tests/test-cases.md',
  'tests/acceptance-criteria.md',
  'tests/check-protocol.mjs',
  'tests/TEST-REPORT.md',
  'tests/BEHAVIOR-EVIDENCE.md',
  'tests/build-package.mjs',
  'tests/check-package.mjs',
  'tests/test-missing-git.mjs',
  'tests/test-search-regression.mjs'
];

check('required release directory and file structure', () => {
  const missing = required.filter((p) => !existsSync(resolve(repoRoot, p)));
  assert(missing.length === 0, 'missing: ' + missing.join(', '));
  assert(!existsSync(resolve(repoRoot, 'draft/3.2.0')), 'stale draft directory still present');
  return required.length + ' required paths; draft tree removed';
});

check('candidate SKILL frontmatter is standard and inactive', () => {
  const { top, metadata } = parseFrontmatter(read(resolve(repoRoot, 'SKILL.md')));
  const allowed = new Set(['name', 'description', 'license', 'compatibility', 'metadata']);
  const extra = Object.keys(top).filter((k) => !allowed.has(k));
  assert(extra.length === 0, 'non-standard top-level fields: ' + extra.join(', '));
  assert(top.name === 'network-reuse-protocol', 'bad name');
  assert(top.license === 'MIT', 'bad license');
  assert(top.description.length > 0 && top.description.length <= 1024, 'description length');
  assert(top.compatibility.length > 0 && top.compatibility.length <= 500, 'compatibility length');
  assert(metadata.version === '3.3.0', 'metadata.version');
  assert(metadata.release_status === 'draft', 'metadata.release_status');
  assert(metadata.active === 'false', 'metadata.active');
  assert(metadata.supersedes === '3.2.0', 'metadata.supersedes');
  return 'name/description/license/compatibility/metadata valid; draft 3.3.0';
});

check('SKILL body is within 100 lines and 5 KB', () => {
  const { body } = parseFrontmatter(read(resolve(repoRoot, 'SKILL.md')));
  const lines = body.split('\n').filter((l, i, arr) => !(i === arr.length - 1 && l === '')).length;
  const bytes = Buffer.byteLength(body, 'utf8');
  assert(lines <= 100, 'body has ' + lines + ' lines');
  assert(bytes <= 5120, 'body has ' + bytes + ' bytes');
  return lines + ' lines, ' + bytes + ' bytes';
});

check('candidate status is explicit; historical records stay historical', () => {
  const bad = [];
  for (const file of markdownFiles()) {
    const text = read(file);
    if (/^  release_status: ["']active["']$/m.test(text)) bad.push(relative(repoRoot, file) + ': active candidate');
  }
  const readme = read(resolve(repoRoot, 'README.md'));
  assert(readme.includes('DRAFT / NOT ACTIVE'), 'README candidate statement missing');
  assert(read(resolve(repoRoot, 'SKILL.md')).includes('DRAFT / NOT ACTIVE'), 'SKILL candidate statement missing');
  assert(readme.includes('`v3.1.0`'), 'README rollback tag missing');
  assert(bad.length === 0, bad.join('; '));
  return 'candidate status checked across ' + markdownFiles().length + ' Markdown files';
});

check('all local Markdown links resolve', () => {
  const files = markdownFiles();
  let count = 0;
  for (const file of files) count += checkLocalLinks(file);
  assert(count >= 50, 'only ' + count + ' local links found');
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
  const text = read(resolve(repoRoot, 'README.md')) + read(resolve(repoRoot, 'DESIGN.md'));
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
  const text = read(resolve(repoRoot, 'references/multi-agent-handoff.md')) +
    read(resolve(repoRoot, 'templates/task-handoff.md'));
  const fields = ['任务编号', '目标', '现有成果', '证据', '方案', '负责人', '当前状态', '阻塞问题', '验收标准', '下一步'];
  const statuses = ['待领取', '研究中', '待执行', '执行中', '待验收', '已完成', '阻塞'];
  const missing = fields.concat(statuses).filter((x) => !text.includes(x));
  assert(missing.length === 0, 'missing: ' + missing.join(', '));
  assert(text.includes('ten fields'), 'field count wording missing');
  return '10 fields and 7 statuses';
});

check('resource inventory template has duplicate and install gates', () => {
  const text = read(resolve(repoRoot, 'templates/resource-inventory.md'));
  const requiredTerms = ['Duplicate check', 'Install gate', 'Last verified', 'Review by', 'Auth ref', 'Capability tags'];
  const missing = requiredTerms.filter((x) => !text.includes(x));
  assert(missing.length === 0, 'missing: ' + missing.join(', '));
  return requiredTerms.length + ' inventory fields/steps';
});

check('cost ledger separates actual and estimated cost', () => {
  const text = read(resolve(repoRoot, 'templates/cost-ledger.md'));
  const requiredTerms = ['Actual or estimated', 'Measured saving', 'Baseline', 'Cap', 'Estimated total', 'Actual total'];
  const missing = requiredTerms.filter((x) => !text.includes(x));
  assert(missing.length === 0, 'missing: ' + missing.join(', '));
  assert(text.includes('A token count is not a currency amount'), 'missing token/currency warning');
  return requiredTerms.length + ' cost fields';
});

check('L1–L4 validation is defined and not inflated', () => {
  const text = read(resolve(repoRoot, 'references/validation.md')) +
    read(resolve(repoRoot, 'templates/validation-report.md')) +
    read(resolve(repoRoot, 'tests/test-cases.md'));
  const requiredTerms = ['L1', 'L2', 'L3', 'L4', 'not tested', 'not claimable'];
  const missing = requiredTerms.filter((x) => !text.includes(x));
  assert(missing.length === 0, 'missing: ' + missing.join(', '));
  return 'four levels with limitation language';
});

check('three project scenarios are covered without production operation', () => {
  const text = read(resolve(repoRoot, 'tests/test-cases.md'));
  const scenarios = ['东方有线', '小红书聚光', '描眉画目 GEO'];
  const missing = scenarios.filter((x) => !text.includes(x));
  assert(missing.length === 0, 'missing: ' + missing.join(', '));
  assert(text.includes('read-only'), 'read-only boundary missing');
  assert(text.includes('do not') || text.includes('Do not'), 'prohibition language missing');
  assert(text.includes('not authorized'), 'L3 authorization limit missing');
  return scenarios.length + ' scenarios';
});

check('test case count and global IDs are present', () => {
  const text = read(resolve(repoRoot, 'tests/test-cases.md'));
  const ids = text.match(/^### [A-Z][0-9]+/gm) || [];
  assert(ids.length >= 20, 'only ' + ids.length + ' cases');
  assert(ids.some((x) => x.includes('G1')) && ids.some((x) => x.includes('X4')), 'missing case range');
  return ids.length + ' cases';
});

check('standards matrix covers all seven candidates', () => {
  const text = read(resolve(repoRoot, 'COMPATIBILITY.md'));
  const standards = ['Agent Skills', 'AGENTS.md', 'MCP', 'A2A', 'Open Responses', 'OpenSandbox', 'OpenEnv'];
  const missing = standards.filter((x) => !text.includes(x));
  assert(missing.length === 0, 'missing: ' + missing.join(', '));
  assert(text.includes('No standard, package, server, or runtime is required'), 'dependency disclaimer missing');
  assert(text.includes('2026-11-03'), 'verification date missing');
  return standards.length + ' standards';
});

check('reuse radar has dated, expiring entries', () => {
  const text = read(resolve(repoRoot, 'reuse-radar.md'));
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
  return 'Markdown and dependency-free Node tests only';
});

check('candidate changelog preserves release history', () => {
  const changes = read(changelog);
  assert(changes.includes('## 3.3.0 — Unreleased'), '3.3.0 candidate entry missing');
  assert(changes.includes('## 3.2.0 — 2026-11-03'), '3.2.0 changelog entry missing');
  assert(changes.includes('`v3.1.0`'), 'rollback tag missing from changelog');
  const decisions = read(resolve(repoRoot, 'decisions/README.md'));
  assert(decisions.includes('Promote 3.2.0 to the active release'), 'promotion decision index entry missing');
  assert(decisions.includes('| accepted |'), 'promotion decision status missing');
  assert(decisions.includes('| superseded |'), 'old decision is not marked superseded');
  return '3.2.0 active; prior decision superseded';
});

check('remote main is independently verified', () => {
  let output;
  let head;
  try {
    output = git(['ls-remote', 'origin', 'refs/heads/main']);
    head = git(['rev-parse', 'HEAD']);
  } catch (error) {
    throw unavailable('remote main check', error);
  }
  const line = output.split('\n').find((item) => item.trim());
  assert(line, 'remote returned no main ref');
  const [sha, ref] = line.trim().split(/\s+/);
  assert(ref === 'refs/heads/main', 'unexpected ref: ' + ref);
  assert(sha === baselineMain, 'remote main changed from published 3.2.0: ' + sha);
  return 'remote main=' + sha.slice(0, 7) + (sha === baselineMain ? ' (rollback baseline)' : ' (release head)');
});

check('local Git and rollback tag are consistent', () => {
  let main;
  let origin;
  let head;
  let tagType;
  let tagCommit;
  let branch;
  try {
    main = git(['rev-parse', 'main']);
    origin = git(['rev-parse', 'origin/main']);
    head = git(['rev-parse', 'HEAD']);
    tagType = git(['cat-file', '-t', 'v3.2.0']);
    tagCommit = git(['rev-parse', 'v3.2.0^{commit}']);
    branch = git(['branch', '--show-current']);
  } catch (error) {
    throw unavailable('local Git check', error);
  }
  assert(main === origin, 'local main ' + main + ' != origin/main ' + origin);
  assert(main === baselineMain, 'local main changed from published 3.2.0');
  assert(branch !== 'main', 'candidate must be checked on an independent branch');
  if (branch === 'main') assert(main === head, 'on main but HEAD differs from main');
  assert(tagType === 'tag', 'v3.2.0 is not an annotated tag');
  assert(tagCommit === baselineMain, 'v3.2.0 ' + tagCommit + ' != rollback baseline ' + baselineMain);
  return 'local main=origin/main=' + main.slice(0, 7) + '; v3.2.0=' + tagCommit.slice(0, 7);
});

check('README links every capability reference', () => {
  const text = read(resolve(repoRoot, 'README.md'));
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

check('search quality contract and five regression scenarios', () => {
  const search = read(resolve(repoRoot, 'references/global-search.md'));
  for (const term of ['User-specified source takes priority', 'actually query that source',
    'Key-candidate omission check', 'at most one targeted follow-up',
    'Opened and checked', 'Search-result-only', 'Prior knowledge', 'Unverified inference',
    'An unresolved direct-fit peer', 'do not reread the same README']) {
    assert(search.includes(term), 'missing search contract: ' + term);
  }
  const skill = read(resolve(repoRoot, 'SKILL.md'));
  for (const term of ['Search the requested source first', 'Check omissions, then decide',
    'remains valid until revoked', 'no formal search', 'scope growth, new fees, or material risk']) {
    assert(skill.includes(term), 'core rule missing: ' + term);
  }
  assert(!/Nutlope|hallmark|Leonxlnx|taste-skill|pbakaus|impeccable/i.test(skill + search), 'project names hardcoded in runtime rules');
  const cases = read(resolve(repoRoot, 'tests/test-cases.md'));
  for (const id of ['S1', 'S2', 'S3', 'S4', 'S5']) assert(cases.includes('### ' + id + ' —'), 'missing scenario ' + id);
  return 'static contract only; client behavior is recorded separately';
});

check('acceptance criteria covers the twelve engineering tests', () => {
  const text = read(resolve(repoRoot, 'tests/acceptance-criteria.md'));
  const rows = text.match(/^\| [0-9]+ \|/gm) || [];
  assert(rows.length >= 12, 'only ' + rows.length + ' engineering rows');
  for (const term of ['Skill file structure', 'Markdown format', 'relative paths', 'Directory structure', 'Resource inventory', 'Task handoff', 'Cost ledger', 'L1–L4', 'three project scenarios', 'rollback baseline', 'Cross-platform', 'Release tags and main']) {
    assert(text.includes(term), 'missing test: ' + term);
  }
  return rows.length + ' engineering tests';
});

console.log('');
console.log('SUMMARY: ' + passed + ' passed, ' + failed + ' failed, ' + skipped + ' skipped');
if (failed) {
  console.log('FAILURES:');
  for (const failure of failures) console.log('- ' + failure);
  console.log('RESULT: FAIL');
  process.exit(1);
}
if (skipped) {
  console.log('SKIPPED:');
  for (const item of skips) console.log('- ' + item);
  console.log('RESULT: INCOMPLETE (skipped checks did not run; not all checks passed)');
  process.exit(2);
}
console.log('RESULT: PASS (L1 structural; L2 local execution)');
