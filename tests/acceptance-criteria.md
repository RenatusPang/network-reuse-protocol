# Acceptance criteria — Network Reuse Protocol 3.3.0

> **Active release criteria.** Results and exact counts are recorded in [TEST-REPORT.md](TEST-REPORT.md). Passing these checks supports L1 and named L2 claims only.

## Engineering tests

| # | Test | Command or method | Pass condition |
| --- | --- | --- | --- |
| 1 | Skill file structure | [check-protocol.mjs](check-protocol.mjs) | frontmatter parses; required fields and files exist |
| 2 | Markdown format | [check-protocol.mjs](check-protocol.mjs) | fences balanced; no trailing whitespace or tabs; headings present |
| 3 | File references and relative paths | [check-protocol.mjs](check-protocol.mjs) | every local Markdown link resolves inside the release |
| 4 | Directory structure | [check-protocol.mjs](check-protocol.mjs) | required paths exist; stale candidate tree removed |
| 5 | Resource inventory template | [check-protocol.mjs](check-protocol.mjs) | all inventory fields and duplicate-check steps present |
| 6 | Task handoff template | [check-protocol.mjs](check-protocol.mjs) | ten fields, seven statuses, transitions present |
| 7 | Cost ledger template | [check-protocol.mjs](check-protocol.mjs) | actual/estimated, baseline, evidence, cap fields present |
| 8 | Four-level validation cases | [check-protocol.mjs](check-protocol.mjs) | L1–L4 definitions and at least four cases present |
| 9 | Three project scenarios | [check-protocol.mjs](check-protocol.mjs) | 东方有线, 小红书聚光, 描眉画目 GEO all covered |
| 10 | rollback baseline integrity | Git tag and commit check | annotated `v3.2.0` resolves to `da1a716`; no history rewrite |
| 11 | Cross-platform compatibility | [../COMPATIBILITY.md](../COMPATIBILITY.md) review | seven standards mapped; no forced dependency; limits stated |
| 12 | Release tags and main | git rev-parse and ls-remote | local and remote `main` agree; `v3.2.0` is the published baseline; release tag resolves |

## Structural acceptance

- [x] [../SKILL.md](../SKILL.md) is active 3.3.0 with standard Agent Skills frontmatter and no executable runtime dependency.
- [x] The body stays within 100 lines and 5 KB after frontmatter.
- [x] All eight capabilities are mapped in [../README.md](../README.md) and [../DESIGN.md](../DESIGN.md).
- [x] All seven statuses and ten handoff fields appear in the reference and template.
- [x] All four validation levels appear in the reference, template, and cases.
- [x] All three scenarios appear with production boundaries.
- [x] Every local link resolves inside the release package.
- [x] No secrets, private keys, absolute local paths, or customer data are present.
- [x] No package manager, plugin, service, or paid dependency is added.
- [x] The complete package is checked outside the repository with directory name `network-reuse-protocol`.

## Evidence acceptance

- [x] The test command's exit code is recorded.
- [x] PASS, FAIL, and SKIP are counted separately.
- [x] Remote-main and local-Git evidence are recorded separately.
- [x] Missing-Git behavior is covered by a regression test; skipped checks cannot produce an all-pass report.
- [x] The 3.2.0 baseline tag and commit are recorded.
- [x] The branch is recorded; the immutable release commit is the PR merge (or `git rev-parse HEAD` in this checkout).
- [x] Limitations are stated: other clients, L3, L4, and savings are not verified.
- [x] The three project scenarios were not executed against production.

## Release gate

1. Relevant structure, package and regression checks pass; report PASS/FAIL/SKIP separately.
2. Preserve `v3.2.0` at `da1a716`; publish the owner-approved 3.3.0 commit on main and tag it `v3.3.0`. Update only the intended Codex Skill path.
3. Record actual candidate reads and tool traces for S1–S5 in [BEHAVIOR-EVIDENCE.md](BEHAVIOR-EVIDENCE.md). Report additional observed rule violations separately even when a scenario's core expectation passes.
4. S1 must include actual GitHub retrieval, useful category terms, direct-fit candidates, environment/inventory checks and a decision. Known names need not all win, but a retrieved direct-fit peer cannot be silently ignored in favor of a general tool.
5. S2/S5 must preserve named-source requirements and label access limits and alternative evidence.
6. S3/S4 must stop without unnecessary search, installation, templates, or repeated verification.
7. Reviewers assess observed behavior separately from static assertions. A finite test cannot prove every AI follows the protocol.
8. No new services, runtime dependencies, model changes, permission expiry, or business operations.

The owner explicitly authorized publication after the candidate report disclosed the efficiency failure and X-access limit. Preserve those results without relabeling them PASS. No new approval step is imposed on ordinary protocol tasks.

## L1–L4 acceptance

| Level | Required for this release | Current evidence |
| --- | --- | --- |
| L1 | yes | structural test, links, templates, package references, scenario coverage |
| L2 | partial | Node checks; isolated candidate reads and S1–S5; see actual results |
| L3 | no | not authorized; read-only scenario designs |
| L4 | no | no observation window |

## Known limitations

- No real multi-agent runtime was run; the handoff is tested as a document.
- Only one client and model were used for the load and behavior evidence; other clients remain unverified.
- Score weights are a default, not calibrated across projects.
- A2A has no native acceptance state; the mapping is deliberately lossy.
- OpenEnv is an RFC in review and is not a dependency.
- The three scenarios are designs; they do not prove production behavior.
- Loading consumes context and may consume plan or API usage; no savings percentage was measured.

## Sign-off

Candidate implementation and tests: recorded in [TEST-REPORT.md](TEST-REPORT.md).
Formal release: owner-authorized. This is not a claim of new independent behavioral acceptance. Release-only checks and the installed-path read are recorded separately.
