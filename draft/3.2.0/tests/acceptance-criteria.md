# Acceptance criteria — Network Reuse Protocol 3.2.0

> **DRAFT / NOT ACTIVE.** These criteria decide whether the draft is ready for independent review, not whether it is released.

## Engineering tests

| # | Test | Command or method | Pass condition |
| --- | --- | --- | --- |
| 1 | Skill file structure | [check-protocol.mjs](check-protocol.mjs) | frontmatter parses; required fields and files exist |
| 2 | Markdown format | [check-protocol.mjs](check-protocol.mjs) | fences balanced; no trailing whitespace or tabs; headings present |
| 3 | File references and relative paths | [check-protocol.mjs](check-protocol.mjs) | every local Markdown link resolves |
| 4 | Directory structure | [check-protocol.mjs](check-protocol.mjs) | required paths exist; no 3.2.0 content at root |
| 5 | Resource inventory template | [check-protocol.mjs](check-protocol.mjs) | all inventory fields and duplicate-check steps present |
| 6 | Task handoff template | [check-protocol.mjs](check-protocol.mjs) | ten fields, seven statuses, transitions present |
| 7 | Cost ledger template | [check-protocol.mjs](check-protocol.mjs) | actual/estimated, baseline, evidence, cap fields present |
| 8 | Four-level validation cases | [check-protocol.mjs](check-protocol.mjs) | L1–L4 definitions and at least four cases present |
| 9 | Three project scenarios | [check-protocol.mjs](check-protocol.mjs) | 东方有线, 小红书聚光, 描眉画目 GEO all covered |
| 10 | 3.1.0 vs 3.2.0 diff | git diff and hash check | root SKILL.md, README.md, LICENSE unchanged |
| 11 | Cross-platform compatibility | [../COMPATIBILITY.md](../COMPATIBILITY.md) review | seven standards mapped; no forced dependency; limits stated |
| 12 | Main not modified | git rev-parse and diff | local main equals origin/main; no root release file changed |

## Structural acceptance

- [ ] 3.2.0 lives under [../](../README.md) and is marked **DRAFT / NOT ACTIVE**.
- [ ] Root `../../SKILL.md` remains 3.1.0, status active.
- [ ] Root `../../README.md` and `../../LICENSE` are byte-identical to `705dacf`.
- [ ] [../SKILL.md](../SKILL.md) uses standard Agent Skills frontmatter and no executable runtime dependency; loading may consume context or plan/API usage.
- [ ] The body stays within 100 lines and 5 KB after frontmatter.
- [ ] All eight capabilities are mapped in [../README.md](../README.md) and [../DESIGN.md](../DESIGN.md).
- [ ] All seven statuses and ten handoff fields appear in the reference and template.
- [ ] All four validation levels appear in the reference, template, and cases.
- [ ] All three scenarios appear with production boundaries.
- [ ] Every local link resolves.
- [ ] No secrets, private keys, absolute local paths, or customer data.
- [ ] No package manager, plugin, service, or paid dependency is added.

## Evidence acceptance

- [ ] The test command's exit code is recorded.
- [ ] The output identifies pass/fail per check.
- [ ] The 3.1.0 hashes are recorded.
- [ ] The diff scope is recorded.
- [ ] The branch and commit are recorded.
- [ ] Limitations are stated: L3 not tested, L4 not claimable.
- [ ] The three project scenarios were not executed against production.

## Release gate

The draft may enter independent review when:

1. All twelve engineering tests pass, or every exception has a written, accepted reason.
2. No root 3.1.0 file changed.
3. No production account, ad plan, work order, or GEO publication was touched.
4. No tool, plugin, or service was installed or purchased.
5. A reviewer who did not write the draft confirms the security and authorization model.
6. The branch is pushed as `draft/nrp-3.2.0` and no PR is merged.
7. The 3.2.0 status remains draft and active: false.

The draft is **not** released when these pass. Promotion is a separate change.

## L1–L4 acceptance

| Level | Required for this draft | Current evidence |
| --- | --- | --- |
| L1 | yes | structural test, links, hashes, scenarios |
| L2 | partial | Node script runs; no target-client install test |
| L3 | no | not authorized; read-only scenario designs |
| L4 | no | no observation window |

## Known limitations

- No real multi-agent runtime was run; the handoff is tested as a document.
- No target client was used to load the draft skill; frontmatter compatibility is checked against the published spec, not every client.
- Score weights are a default, not calibrated across projects.
- A2A has no native acceptance state; the mapping is deliberately lossy.
- OpenEnv is an RFC in review and is not a dependency.
- The three scenarios are designs; they do not prove production behavior.

## Sign-off

| Role | Name | Date | Result | Note |
| --- | --- | --- | --- | --- |
| Author | <name> | <date> | draft | <scope> |
| Independent reviewer | <name> | <date> | pending | security and authorization |
| Release owner | <name> | <date> | not requested | promotion is separate |
