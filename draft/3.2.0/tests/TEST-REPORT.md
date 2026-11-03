# Test report — Network Reuse Protocol 3.2.0

> **DRAFT / NOT ACTIVE.** This report covers the 3.2.0 candidate only. It is not a release record.

## Scope

| Field | Value |
| --- | --- |
| Date | 2026-11-03 |
| Branch | `draft/nrp-3.2.0` |
| Base main | `705dacf` |
| Environment | Windows, PowerShell 7.6, Node v22.23.4, Codex CLI `0.166.0-alpha.5.1` |
| Runtime dependencies | no executable package; loading may consume context, plan quota, or API usage |
| Production systems touched | none |
| Tools installed or purchased | none |
| Global AI config changed | no |
| Formal global skill replaced | no |

## Commands

    node --check draft/3.2.0/tests/check-protocol.mjs
    node draft/3.2.0/tests/check-protocol.mjs
    node draft/3.2.0/tests/test-missing-git.mjs
    node draft/3.2.0/tests/build-package.mjs <temp-parent>
    node <temp-parent>/network-reuse-protocol/tests/check-package.mjs
    codex exec --ephemeral --skip-git-repo-check --json -m deepseek/deepseek-flash -C <temp-workspace> -

`check-protocol.mjs` is the L1 structural gate. It prints separate `PASS`, `FAIL`, and `SKIP` lines. The remote check runs `git ls-remote origin refs/heads/main`; the local check runs `git rev-parse` and compares local `main`, `origin/main`, and the three root files. A skipped check exits with code 2 and is never counted as a pass.

## Result

| # | Engineering test | Result | Evidence |
| --- | --- | --- | --- |
| 1 | Skill file structure | pass | frontmatter and required files |
| 2 | Markdown format | pass | fences, whitespace, headings |
| 3 | File references and relative paths | pass | all local links resolve |
| 4 | Directory structure | pass | 36 required repository paths |
| 5 | Resource inventory template | pass | duplicate and install gates |
| 6 | Task handoff template | pass | 10 fields, 7 statuses |
| 7 | Cost ledger template | pass | actual/estimated and baseline |
| 8 | Four-level validation cases | pass | L1–L4 and limits |
| 9 | Three project scenarios | pass | 24 cases, read-only boundaries |
| 10 | 3.1.0 vs 3.2.0 diff | pass | root files unchanged |
| 11 | Cross-platform compatibility | pass | 7 standards; no executable dependency; cost caveat recorded |
| 12 | Main not modified | pass | remote `705dacf`; local `main = origin/main = 705dacf` |

Latest repository run: **24 passed, 0 failed, 0 skipped**; exit 0. The remote and local Git checks appear as separate PASS lines with `remote main=705dacf` and `local main=origin/main=705dacf`.

Missing-Git regression: **1 regression passed, 0 failed, 0 skipped**; the copied fixture suite reported **22 passed, 0 failed, 2 skipped** and `RESULT: INCOMPLETE`; exit 2. The two skipped checks were the remote main check and the local Git check.

Isolated package check: **PASS**; 34 files, 30 Markdown files, 111 local links, package directory name `network-reuse-protocol`; `SKILL.md` SHA-256 `16b845e75533483f01252674fb91c93b98eb083c392c3004ca0a685c7478a2b8`. No package link escaped to the repository.

## Surface separation

| Surface | Result | Evidence |
| --- | --- | --- |
| Document structure | PASS | `check-protocol.mjs`: 24 passed, 0 failed, 0 skipped |
| Package references | PASS | isolated package: 111 links; no `../../` or absolute local link target |
| Target-client load | PASS, one client | Codex CLI `0.166.0-alpha.5.1`; explicit candidate path; returned `version=3.2.0`, `release_status=draft` |
| Behavior tests | PASS, 4/4, one client and model | Codex CLI with `deepseek/deepseek-flash`; see [BEHAVIOR-EVIDENCE.md](BEHAVIOR-EVIDENCE.md) |
| Automatic discovery and other clients | UNVERIFIED | no test; do not infer from file location or metadata |

The client-load result is separate from the static checks. The behavior runs are separate from both. No static check is reported as a target-client test.

## 3.1.0 integrity

Normalized SHA-256 (LF) of the active root files:

    SKILL.md  6ecfb1b7250156242c729e53e2f0cef67411d943f81abf6204cdae695ff8ae76
    README.md 76c2d045f5491fb6c783e36db533485b557e5b67ea72c6c0ad755c2069dc5a60
    LICENSE   7f18f7e3fcc2dc4f6d052ddb64a1ba303e9b56092d2166c5c107a814a2eb52aa

The test compares these values after normalizing CRLF to LF, so a Windows or Unix checkout gives the same result.

## Scenario coverage

| Scenario | Cases | Production boundary |
| --- | --- | --- |
| 东方有线工作台 | A1–A4 | personal checkout only; no dispatch, close, or production submit |
| 小红书聚光 | B1–B4 | paid account read-only; no login, draft, plan, budget, or spend |
| 描眉画目 GEO | C1–C4 | no publication, price claim, or ranking fabrication |

No scenario was executed against a live account, work order, ad plan, or public page.

## Validation level

| Level | Claim | Evidence |
| --- | --- | --- |
| L1 | pass | structural test, links, templates, scenarios, hashes |
| L2 | partial | Node checks and isolated package load run; one Codex CLI explicit-file-load and four behavior scenarios passed; auto-discovery and other clients untested |
| L3 | not tested | no authorized real business flow |
| L4 | not claimable | no observation window |

## Limitations

- The handoff is tested as a document, not in a live multi-agent runtime.
- The client test used an explicit candidate path in Codex CLI. It did not prove automatic discovery, and other clients are unverified.
- The four behavior scenarios ran once each with one model; they are not a statistical guarantee.
- Score weights are a default, not calibrated across projects.
- A2A has no native acceptance state; the mapping uses metadata.
- OpenEnv is an RFC in review and is not a dependency.
- The three scenarios are read-only designs, not production evidence.
- No currency or quota saving was measured. Client token counts are usage observations, not savings.

## Conclusion

The candidate is ready for independent review at L1 and partial L2. The package, one-client load, and four short behavior scenarios passed; L3 and L4 remain unverified. It is **not** released, not promoted, and not a business success. Promotion requires a separate approved change.
