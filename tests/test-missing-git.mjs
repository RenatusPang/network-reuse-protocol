// Regression test for skipped Git checks in a non-Git fixture.
// Run with: node tests/test-missing-git.mjs

import { copyFileSync, mkdirSync, mkdtempSync, readdirSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..');
const fixture = mkdtempSync(join(tmpdir(), 'nrp-missing-git-'));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function copyDir(source, target) {
  mkdirSync(target, { recursive: true });
  for (const name of readdirSync(source)) {
    if (name === '.git' || name === 'node_modules') continue;
    const from = join(source, name);
    const to = join(target, name);
    if (statSync(from).isDirectory()) copyDir(from, to);
    else copyFileSync(from, to);
  }
}

try {
  copyDir(repoRoot, fixture);

  const result = spawnSync(
    process.execPath,
    [join(fixture, 'tests/check-protocol.mjs')],
    {
      cwd: fixture,
      encoding: 'utf8',
      env: { ...process.env, GIT_CEILING_DIRECTORIES: fixture }
    }
  );

  const output = (result.stdout || '') + (result.stderr || '');
  assert(result.status === 2, 'expected exit 2 for incomplete suite, got ' + result.status);
  assert(/SKIP \d+ - remote main is independently verified/m.test(output), 'remote main was not SKIP');
  assert(/SKIP \d+ - local Git and rollback tag are consistent/m.test(output), 'local Git check was not SKIP');
  assert(!/PASS \d+ - (remote main is independently verified|local Git and rollback tag are consistent)/m.test(output), 'a Git check was counted as PASS');
  assert(/SUMMARY: \d+ passed, 0 failed, 2 skipped/m.test(output), 'summary did not preserve SKIP count');
  assert(/RESULT: INCOMPLETE/.test(output), 'incomplete result was not reported');
  assert(!/RESULT: PASS/.test(output), 'incomplete suite reported PASS');

  const passed = Number((output.match(/SUMMARY: (\d+) passed/) || [])[1] || 0);
  assert(passed >= 18, 'too few structural checks ran: ' + passed);
  console.log('PASS - missing Git environment is reported as SKIP, not PASS');
  console.log('fixture ' + (output.match(/SUMMARY: .*/) || ['SUMMARY: unavailable'])[0]);
  console.log('fixture ' + (output.match(/RESULT: .*/) || ['RESULT: unavailable'])[0]);
  console.log('fixture=' + fixture);
  console.log('SUMMARY: 1 regression passed, 0 failed, 0 skipped');
} finally {
  rmSync(fixture, { recursive: true, force: true });
}
