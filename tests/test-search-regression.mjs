// Regression mutations for the 3.3.0 search contract. These test the checker,
// not model behavior; see BEHAVIOR-EVIDENCE.md for actual client runs.
import { cpSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const source = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const fixture = mkdtempSync(join(tmpdir(), 'nrp-search-regression-'));
const cases = [
  ['named-source priority', 'references/global-search.md', 'actually query that source', 'optionally recall that source'],
  ['follow-up bound', 'references/global-search.md', 'at most one targeted follow-up', 'unlimited follow-ups'],
  ['evidence provenance', 'references/global-search.md', 'Search-result-only', 'Verified'],
  ['no hardcoded winners', 'SKILL.md', '**Reuse proven solutions', '**Always choose Nutlope/hallmark; reuse proven solutions'],
  ['standing authorization', 'SKILL.md', 'remains valid until revoked', 'expires after one task'],
  ['Quick path', 'SKILL.md', 'no formal search', 'mandatory global search'],
  ['release stays active', 'SKILL.md', 'release_status: "active"', 'release_status: "draft"'],
];
let passed = 0;
try {
  cpSync(source, fixture, { recursive: true, filter: p => !['.git', 'node_modules'].includes(p.split(/[\\/]/).at(-1)) });
  for (const [name, file, before, after] of cases) {
    const path = join(fixture, file);
    const original = readFileSync(path, 'utf8');
    if (!original.includes(before)) throw new Error('mutation not applied: ' + name);
    writeFileSync(path, original.replaceAll(before, after));
    const run = spawnSync(process.execPath, [join(fixture, 'tests/check-protocol.mjs'), '--search-regression'], {
      cwd: fixture, encoding: 'utf8', timeout: 15000,
    });
    writeFileSync(path, original);
    if (run.status !== 1 || !/FAIL .*search quality contract|FAIL .*release SKILL/.test(run.stdout || '')) {
      throw new Error(name + ' was not rejected: ' + run.status + '\n' + run.stdout + run.stderr);
    }
    passed++;
    console.log('PASS - rejects regression: ' + name);
  }
  console.log(`SUMMARY: ${passed} passed, 0 failed, 0 skipped`);
} finally {
  rmSync(fixture, { recursive: true, force: true });
}
