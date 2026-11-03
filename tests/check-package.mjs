// Active 3.2.0 release - verify the isolated install package.
// Run from inside the package: node tests/check-package.mjs

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(here, '..');
const packageName = basename(packageRoot);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(path) {
  return readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...walk(path));
    else out.push(path);
  }
  return out;
}

function frontmatterName(text) {
  assert(text.startsWith('---\n'), 'SKILL.md has no frontmatter');
  const end = text.indexOf('\n---', 4);
  assert(end !== -1, 'SKILL.md frontmatter is not closed');
  const match = text.slice(4, end).match(/^name:\s*(\S+)\s*$/m);
  assert(match, 'SKILL.md has no name');
  return match[1].replace(/^['"]|['"]$/g, '');
}

function checkLinks(file) {
  const text = read(file);
  const re = /\[[^\]]+\]\(([^)]+)\)/g;
  const links = [];
  let match;
  while ((match = re.exec(text)) !== null) links.push(match[1]);
  for (const raw of links) {
    let target = raw.trim();
    if (target.startsWith('<') && target.endsWith('>')) target = target.slice(1, -1);
    if (/^(https?:|mailto:|tel:|#)/i.test(target)) continue;
    target = target.split('#')[0].split('?')[0];
    if (!target) continue;
    assert(!target.startsWith('/'), 'absolute local link in ' + relative(packageRoot, file) + ': ' + raw);
    const abs = resolve(dirname(file), target);
    const rel = relative(packageRoot, abs);
    assert(rel && !rel.startsWith('..') && !isAbsolute(rel), 'link escapes package: ' + raw + ' in ' + relative(packageRoot, file));
    assert(existsSync(abs), 'missing link target: ' + raw + ' in ' + relative(packageRoot, file));
  }
  return links.length;
}

const required = [
  'SKILL.md',
  'README.md',
  'DESIGN.md',
  'COMPATIBILITY.md',
  'reuse-radar.md',
  'LICENSE',
  'CHANGELOG.md',
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
  'tests/check-protocol.mjs',
  'tests/check-package.mjs',
  'tests/test-cases.md',
  'tests/acceptance-criteria.md',
  'tests/test-missing-git.mjs',
  'tests/TEST-REPORT.md',
  'tests/BEHAVIOR-EVIDENCE.md'
];

const missing = required.filter((path) => !existsSync(join(packageRoot, path)));
assert(missing.length === 0, 'missing package files: ' + missing.join(', '));
assert(packageName === 'network-reuse-protocol', 'directory name must equal skill name, got ' + packageName);

const skill = read(join(packageRoot, 'SKILL.md'));
assert(frontmatterName(skill) === packageName, 'SKILL.md name does not match directory name');
assert(skill.includes('version: "3.2.0"'), 'SKILL.md version missing');
assert(skill.includes('release_status: "active"'), 'SKILL.md active release status missing');
assert(skill.includes('active: "true"'), 'SKILL.md active flag missing');
assert(!skill.includes('DRAFT / NOT ACTIVE'), 'SKILL.md still carries a draft banner');
assert(skill.includes('loading consumes context and may consume plan/API usage'), 'cost caveat missing');
assert(skill.includes('[reuse-radar.md](reuse-radar.md)'), 'reuse-radar runtime link missing');
assert(skill.includes('[decisions/](decisions/README.md)'), 'decisions runtime link missing');

const compatibility = read(join(packageRoot, 'COMPATIBILITY.md'));
assert(compatibility.includes('informational status field'), 'status-field limitation missing');
assert(compatibility.includes('not a universal load control'), 'client-load limitation missing');
assert(compatibility.includes('tests/check-protocol.mjs'), 'test reference missing');
assert(!read(join(packageRoot, 'README.md')).includes('[../../SKILL.md]'), 'package README still escapes to repository root');
assert(!read(join(packageRoot, 'DESIGN.md')).includes('[../../LICENSE]'), 'package DESIGN still escapes to repository root');

const markdown = walk(packageRoot).filter((path) => path.endsWith('.md'));
let linkCount = 0;
for (const file of markdown) linkCount += checkLinks(file);

for (const file of ['tests/check-protocol.mjs', 'tests/check-package.mjs', 'tests/test-missing-git.mjs']) {
  const result = spawnSync(process.execPath, ['--check', join(packageRoot, file)], { encoding: 'utf8' });
  assert(result.status === 0, 'syntax error in ' + file + ': ' + (result.stderr || '').trim());
}

const files = walk(packageRoot);
const skillHash = createHash('sha256').update(readFileSync(join(packageRoot, 'SKILL.md'))).digest('hex');
assert(files.some((path) => path.replaceAll('\\', '/').endsWith('tests/check-package.mjs')), 'package checker missing');
assert(!files.some((path) => path.replaceAll('\\', '/').endsWith('tests/build-package.mjs')), 'maintainer builder leaked into package');

console.log('PASS - isolated active 3.2.0 package references and layout');
console.log('package=' + packageRoot);
console.log('name=' + packageName);
console.log('files=' + files.length + ', markdown=' + markdown.length + ', links=' + linkCount);
console.log('SKILL.sha256=' + skillHash);
