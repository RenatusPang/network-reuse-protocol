// Build a self-contained 3.2.0 install package in a temp or isolated directory.
// Repository-only maintainer tool; it is not copied into the installed package.
// Usage: node tests/build-package.mjs [output-parent-dir]

import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..');
const outputParent = process.argv[2]
  ? resolve(process.argv[2])
  : mkdtempSync(join(tmpdir(), 'nrp-release-'));
const packageRoot = join(outputParent, 'network-reuse-protocol');

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

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

assert(basename(packageRoot) === 'network-reuse-protocol', 'package directory name mismatch');
if (existsSync(packageRoot)) {
  throw new Error('refusing to overwrite existing package: ' + packageRoot);
}

try {
  mkdirSync(outputParent, { recursive: true });
  copyDir(repoRoot, packageRoot);

  // The builder is repository-only and must not become an installed runtime file.
  rmSync(join(packageRoot, 'tests/build-package.mjs'), { force: true });

  const files = [];
  function walk(dir) {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else files.push(path);
    }
  }
  walk(packageRoot);
  files.sort();

  console.log('PASS - active 3.2.0 package built');
  console.log('package=' + packageRoot);
  console.log('name=' + basename(packageRoot));
  console.log('files=' + files.length);
  console.log('SKILL.sha256=' + sha256(join(packageRoot, 'SKILL.md')));
  console.log('LICENSE.sha256=' + sha256(join(packageRoot, 'LICENSE')));
} catch (error) {
  rmSync(packageRoot, { recursive: true, force: true });
  throw error;
}
