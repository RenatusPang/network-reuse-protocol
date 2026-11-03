// DRAFT / NOT ACTIVE — build a self-contained candidate package in a temp directory.
// Usage: node draft/3.2.0/tests/build-package.mjs [output-parent-dir]

import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../../..');
const draftDir = resolve(repoRoot, 'draft/3.2.0');
const outputParent = process.argv[2]
  ? resolve(process.argv[2])
  : mkdtempSync(join(tmpdir(), 'nrp-candidate-'));
const packageRoot = join(outputParent, 'network-reuse-protocol');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function copyDir(source, target) {
  mkdirSync(target, { recursive: true });
  for (const name of readdirSync(source)) {
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
  copyDir(draftDir, packageRoot);

  // The builder is maintainer-only and must not become an installed runtime file.
  rmSync(join(packageRoot, 'tests/build-package.mjs'), { force: true });
  copyFileSync(join(repoRoot, 'LICENSE'), join(packageRoot, 'LICENSE'));
  copyFileSync(join(repoRoot, 'CHANGELOG.md'), join(packageRoot, 'CHANGELOG.md'));

  const readmePath = join(packageRoot, 'README.md');
  const readme = readFileSync(readmePath, 'utf8')
    .replaceAll('[../../SKILL.md](../../SKILL.md)', '`SKILL.md` (repository root 3.1.0)')
    .replaceAll('[../../README.md](../../README.md)', '`README.md` (repository root 3.1.0)')
    .replaceAll('[../../LICENSE](../../LICENSE)', '[LICENSE](LICENSE)')
    .replaceAll('[../../CHANGELOG.md](../../CHANGELOG.md)', '[CHANGELOG.md](CHANGELOG.md)');
  writeFileSync(readmePath, readme, 'utf8');

  const designPath = join(packageRoot, 'DESIGN.md');
  const design = readFileSync(designPath, 'utf8')
    .replaceAll('- Root [../../SKILL.md](../../SKILL.md) remains 3.1.0, status active.', '- Repository root `SKILL.md` remains 3.1.0, status active; it is outside this isolated package.')
    .replaceAll('- Root [../../README.md](../../README.md) and [../../LICENSE](../../LICENSE) remain unchanged.', '- Repository root `README.md` and `LICENSE` remain unchanged; this package includes the same license text.');
  writeFileSync(designPath, design, 'utf8');

  const changelogPath = join(packageRoot, 'CHANGELOG.md');
  const changelog = readFileSync(changelogPath, 'utf8')
    .replaceAll('[draft/3.2.0/README.md](draft/3.2.0/README.md)', '[README.md](README.md)')
    .replaceAll('Keeps [SKILL.md](SKILL.md), [README.md](README.md), and [LICENSE](LICENSE) byte-identical to 3.1.0.', 'Keeps the repository-root 3.1.0 `SKILL.md`, `README.md`, and [LICENSE](LICENSE) byte-identical to 3.1.0.');
  writeFileSync(changelogPath, changelog, 'utf8');

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

  console.log('PASS - candidate package built');
  console.log('package=' + packageRoot);
  console.log('name=' + basename(packageRoot));
  console.log('files=' + files.length);
  console.log('SKILL.sha256=' + sha256(join(packageRoot, 'SKILL.md')));
  console.log('LICENSE.sha256=' + sha256(join(packageRoot, 'LICENSE')));
} catch (error) {
  rmSync(packageRoot, { recursive: true, force: true });
  throw error;
}
