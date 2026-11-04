# Release report — 3.3.0

> **Active release, owner-authorized on 2026-11-04.** Promotes candidate `26db7d8` from PR #1. The existing efficiency FAIL and X-access SKIP remain disclosed; the owner authorized publication after receiving that report.

## Release-only verification

Version/status, README, CHANGELOG, complete reference headers, promotion decision, and release checks are synchronized. Search behavior is unchanged from the reviewed candidate except the release banner; no new research, model change, or repeated A–E behavior suite.

Release-only results: structural suite **23 PASS / 0 FAIL / 0 SKIP**; search-contract regression **7 PASS / 0 FAIL / 0 SKIP**; missing-Git regression **1 PASS**, with its fixture correctly returning exit 2 and **21 PASS / 0 FAIL / 2 SKIP**. The isolated release package passed with **37 files, 32 Markdown files, and 132 links**. All commands exited 0 except the deliberately incomplete missing-Git fixture. The final evidence edit is checked separately for Markdown, links, and synchronized copies rather than rerunning behavior.

One fresh ephemeral Codex CLI session made exactly one shell command to read `%USERPROFILE%/.codex/skills/network-reuse-protocol/SKILL.md`. Actual output contained `version: "3.3.0"`, `release_status: "active"`, and `active: "true"`; exit 0. It inherited the unchanged model setting without an override. This proves explicit-path reading, not universal automatic discovery or enforcement.

Measured CLI usage: input 41741; cached input 17920; output 124; reasoning output 0. Charges and account-quota impact: not measured. Raw stdout SHA-256: `d4e6d2d0d6f2e98f4c4d8a3b6d6c69a1f70349d7abc0b92b99eb81b1819a8b04`. Raw logs remain in local `nrp-330-release-evidence`, outside the repository. Installed SKILL SHA-256: `bc98a854a78c6f4f31fe0fcf29704a4b4f6f03c02447cdf56a543fb23639f6fc`.

The Windows atomic replacement of SKILL.md initially returned error 5. After verifying the backup, destination hash, independent path, and single file link, a direct write succeeded without ACL changes; the final hash matches the release. The local CHANGELOG history and operational-radar pointer are preserved as overlays. Other local records, DSH contents, and the Codex configuration retain their pre-install hashes.

Main/PR/tag publication is independently checked after the promotion commit. No other AI configuration or production system is part of this release.

## Rollback and retained limits

`v3.2.0` at `da1a7160204ba5412db7efd881a96b925cdd7494` is the remote rollback baseline; `v3.1.0` is retained. One external pre-3.3.0 snapshot preserves only the existing Codex files affected by this installation and records newly added files. Local history, proposals, operational radar, DSH, and Codex configuration are preserved. Restore that manifest-selected snapshot for local rollback; revert the promotion merge in a new commit for remote withdrawal.

Candidate evidence below remains historical. Five scenario expectations passed, an additional efficiency check failed, and X-post retrieval was skipped. Other clients, exhaustive recall, L3/L4, and savings remain unverified. Publication changes status, not these evidence limits.

## Historical 3.3.0 candidate report

The following report records the pre-release candidate. Statements about inactive status and pending approval describe that stage, not the released version.

# Test report — 3.3.0 candidate

> **DRAFT / NOT ACTIVE.** Candidate based on main `da1a7160204ba5412db7efd881a96b925cdd7494` and `v3.2.0`. Date: 2026-11-04. No active Skill or other AI configuration is changed.

## Scope and commands

Focused search-policy change; existing safety, cost, inventory, authorization, L1–L4, and collaboration files are retained. Run one relevant acceptance pass; repeat only failures or checks directly affected by later edits.

    node tests/check-protocol.mjs
    node tests/test-missing-git.mjs
    node tests/test-search-regression.mjs
    node tests/build-package.mjs <isolated-parent>
    node <isolated-parent>/network-reuse-protocol/tests/check-package.mjs
    git diff --check

Client behavior and measured usage: [BEHAVIOR-EVIDENCE.md](BEHAVIOR-EVIDENCE.md). Static terms and mutation checks do not substitute for model execution.

## Current results

| Check | PASS | FAIL | SKIP | Exit / evidence |
| --- | --- | --- | --- | --- |
| Full relevant structural suite | 23 | 0 | 0 | Exit 0; 37 required paths, 31 Markdown files, 29 scenarios; before final evidence-only edits |
| Missing-Git regression | 1 | 0 | 0 | Wrapper exit 0; fixture correctly exits 2 with 21 PASS / 0 FAIL / 2 SKIP |
| Search-policy mutation regression | 7 | 0 | 0 | Exit 0; named source, follow-up bound, provenance, no hardcoded products, ongoing authorization, Quick, and draft state |
| Isolated package references/layout | 1 | 0 | 0 | Exit 0; 36 files, 31 Markdown files, 126 Markdown links; no repository fallback |
| Git whitespace/diff check | 1 | 0 | 0 | `git diff --check`, exit 0 |
| Candidate explicit-path load | 1 | 0 | 0 | Candidate 3.3.0 rules appear in actual Codex CLI command output |
| A–E core behavior expectations | 5 | 0 | 0 | Actual client traces; E is simulated access failure, B passes honest-limit handling |
| Additional A efficiency check | 0 | 1 | 0 | Duplicate successful local read and GitHub query batch remain in the repaired run |
| Successful X-post retrieval | 0 | 0 | 1 | Actual X request returned HTTP 403; not silently replaced |

Static/regression checks and behavioral observations are separate. This is **not** an all-pass behavior report. Other clients, automatic candidate discovery, real candidate Windows execution, L3, L4, and savings were not verified.

The first mutation-suite run exposed a fixture bug: replacing one repeated phrase left the second occurrence intact. The fixture now removes both occurrences with `replaceAll`; only that suite was rerun. Initial behavior A also failed its omission check. One targeted rule repair was followed by A only; the original failure remains documented, not overwritten. No new general research or full behavioral cycle followed.

### Baseline protection and package

- Remote evidence: `git ls-remote origin refs/heads/main` returned `da1a7160204ba5412db7efd881a96b925cdd7494`.
- Independent local evidence: local `main`, `origin/main`, and annotated `v3.2.0` resolve to that same commit; the working branch is `codex/nrp-3.3.0-search-quality`.
- The retained annotated `v3.1.0` resolves to `705dacfcc281ab5b28267be2ca54e7f49171ba31`. No tag was created or moved.
- The current installed 3.2.0 `SKILL.md` equals main after line-ending normalization. No global Skill or AI configuration was modified.
- A complete candidate was copied outside the checkout into `nrp-330-evidence/package/network-reuse-protocol`. All package Markdown references resolve within that directory; LICENSE, reuse radar, decisions, compatibility, templates, and references are included. This is an isolated package check, not an installation.
- Candidate `SKILL.md` SHA-256: `3efb13ab965ae3682454771fdca900a89be918626fb81eb519de1e8cce9abd35`. Final search-reference SHA-256: `3bef67417a10c205942111f0ac4fc90e1f68b68f4360ebe22c2a6280af29ca63`. These identify the repaired-A snapshot.

### Context cost and release readiness

The normalized Skill body is 5094 bytes / 56 lines, versus 5108 bytes previously; the whole entry file is 5748 versus 5762 bytes. The on-demand search reference grows from 6764 to 11320 bytes. No new runtime dependency or obligatory Quick-mode search was added. Loading the expanded reference still consumes additional context; the observed duplicate calls add unnecessary work. No comparable before/after token measurement, fee measurement, or savings percentage exists.

The candidate is ready for PR review, not represented as unconditionally ready to publish. Its specific remaining behavior defect is duplicate successful retrieval in A; Hallmark was only found by a seeded evaluator check, so exhaustive recall is also unproven. The PR must disclose these limits. Main and the installed Skill stay 3.2.0 pending the user's release decision. The tests do not create another approval gate for ordinary protocol tasks.

## Historical 3.2.0 evidence

The report below records the earlier release only. Its pass counts, installed-path evidence, and sign-off are not 3.3.0 results.

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
