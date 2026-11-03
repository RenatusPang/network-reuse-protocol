# Test report — Network Reuse Protocol 3.2.0

> **Active release record.** This report separates document structure, isolated package references, target-client loading, behavior evidence, and business validation. Static checks are not client-load proof.

## Scope

| Field | Value |
| --- | --- |
| Date | 2026-11-03 |
| Candidate reviewed | `9becf28` on `draft/nrp-3.2.0` |
| Release branch | `release/3.2.0` |
| Rollback baseline | `705dacf`, annotated tag `v3.1.0` |
| Environment | Windows, PowerShell 7.6, Node v22.23.4, Codex CLI `0.166.0-alpha.5.1` |
| Runtime dependencies | no executable package; loading may consume context, plan quota, or API usage |
| Production systems touched | none |
| Tools installed or purchased | none |
| Other AI configuration changed | no |

## Commands

    node --check tests/check-protocol.mjs
    node tests/check-protocol.mjs
    node tests/test-missing-git.mjs
    node tests/build-package.mjs <temp-parent>   # repository checkout only
    node <temp-parent>/network-reuse-protocol/tests/check-package.mjs
    codex exec --ephemeral --skip-git-repo-check --json -m deepseek/deepseek-flash -C <temp-workspace> -

`check-protocol.mjs` prints separate `PASS`, `FAIL`, and `SKIP` lines. The remote check runs `git ls-remote origin refs/heads/main`; the local check runs `git rev-parse`, `git cat-file`, and `git branch`. A skipped check exits with code 2 and is never counted as a pass.

## Target-client load

One fresh ephemeral Codex CLI session used `deepseek/deepseek-flash` and a temporary working directory. It read the installed file explicitly; this is not proof of enforcement in another client.

    command: Get-Content -Raw -LiteralPath '%USERPROFILE%\.codex\skills\network-reuse-protocol\SKILL.md'
    path:    %USERPROFILE%\.codex\skills\network-reuse-protocol\SKILL.md
    version: "3.2.0"
    release_status: "active"
    active: "true"

The client reported input 44,278; cached input 36,864; output 628; reasoning 430. These are usage observations, not savings. An optional MCP endpoint returned HTTP 403 during the same CLI startup; the Skill read and final response completed with exit code 0. That endpoint is outside this protocol release.

## Engineering results

| # | Engineering test | Result | Evidence |
| --- | --- | --- | --- |
| 1 | Skill file structure | pass | standard active-3.2.0 frontmatter; required paths exist |
| 2 | Markdown format | pass | fences, whitespace, tabs, headings clean |
| 3 | File references and relative paths | pass | all local links resolve inside the release |
| 4 | Directory structure | pass | 36 required paths; stale candidate tree removed |
| 5 | Resource inventory template | pass | six duplicate/install fields |
| 6 | Task handoff template | pass | ten fields, seven statuses |
| 7 | Cost ledger template | pass | actual/estimated, baseline, cap fields |
| 8 | Four-level validation cases | pass | L1–L4 and limitation language |
| 9 | Three project scenarios | pass | 24 read-only cases |
| 10 | 3.1.0 rollback baseline | pass | annotated `v3.1.0` resolves to `705dacf` |
| 11 | Cross-platform compatibility | pass | seven standards; no forced dependency; cost caveat |
| 12 | Release tags and main | pass | evidence recorded after the release commit and push |

Release-tree structural run: **22 passed, 0 failed, 0 skipped**; exit 0. Remote and local Git checks are separate PASS lines.

Missing-Git regression: **1 regression passed, 0 failed, 0 skipped**. The fixture suite reported **20 passed, 0 failed, 2 skipped**, `RESULT: INCOMPLETE`, exit 2. The two skips were the remote-main check and the local-Git check.

## Surface separation

| Surface | Result | Evidence |
| --- | --- | --- |
| Document structure | PASS | `check-protocol.mjs`: 22 passed, 0 failed, 0 skipped |
| Package references | PASS | isolated package check; links and directory name recorded below |
| Target-client load | PASS, one client | fresh Codex CLI session; canonical installed `SKILL.md`; returned 3.2.0 |
| Behavior tests | PASS, 4/4, one client and model | accepted candidate evidence; see [BEHAVIOR-EVIDENCE.md](BEHAVIOR-EVIDENCE.md) |
| Business flow (L3) | NOT TESTED | no authorized production workflow |
| Long-term stability (L4) | NOT TESTED | no observation window |
| Other clients and models | UNVERIFIED | no test |
| Savings | NOT MEASURED | no baseline comparison |

The four behavior scenarios were not rerun during promotion. Their evidence is from the reviewed candidate, explicitly labeled pre-release in [BEHAVIOR-EVIDENCE.md](BEHAVIOR-EVIDENCE.md).

## Isolated package

Package directory name: `network-reuse-protocol`. The package checker verifies every local link, required runtime reference, decision record, template, test document, license, changelog, and the active version. The repository-only `tests/build-package.mjs` is excluded from the package.

Final isolated package: **35 files, 31 Markdown files, 114 local links**; `SKILL.md` SHA-256 `f439fc742c5d9b61c7f495ea310cb1c483a9832b680277064ba1b8e989ebc3cf`. No package check read protocol files from the original repository to make a link pass.

## Rollback integrity

The 3.1.0 release files normalized to LF have these SHA-256 values at `v3.1.0`:

    SKILL.md  6ecfb1b7250156242c729e53e2f0cef67411d943f81abf6204cdae695ff8ae76
    README.md 76c2d045f5491fb6c783e36db533485b557e5b67ea72c6c0ad755c2069dc5a60
    LICENSE   7f18f7e3fcc2dc4f6d052ddb64a1ba303e9b56092d2166c5c107a814a2eb52aa

The annotated tag is the rollback source of truth. The local pre-promotion Skill snapshot is a separate personal-state backup, not a second repository baseline.

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
| L1 | pass | structure, links, templates, package references, scenarios |
| L2 | partial | Node checks and one Codex CLI installed-path load; behavior evidence from four candidate scenarios |
| L3 | not tested | no authorized real business flow |
| L4 | not claimable | no observation window |

## Limitations

- The handoff is tested as a document, not in a live multi-agent runtime.
- One client and one model were tested. Automatic enforcement in other clients is unverified.
- The four behavior scenarios ran once each with one model; they are not a statistical guarantee.
- Score weights are a default, not calibrated across projects.
- A2A has no native acceptance state; the mapping uses metadata.
- OpenEnv is an RFC in review and is not a dependency.
- The three project scenarios are read-only designs, not production evidence.
- No currency or quota saving was measured. Client token counts are usage observations, not savings.

## Conclusion

3.2.0 is the active release at L1 with limited, named L2 evidence. It is not a claim of L3 business success, L4 stability, cross-client enforcement, or measured savings. The formal commit and local load result are recorded in the release delivery receipt.
