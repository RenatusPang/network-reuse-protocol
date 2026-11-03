# Test report — Network Reuse Protocol 3.2.0

> **DRAFT / NOT ACTIVE.** This report covers the 3.2.0 candidate only. It is not a release record.

## Scope

| Field | Value |
| --- | --- |
| Date | 2026-11-03 |
| Branch | `draft/nrp-3.2.0` |
| Base main | `705dacf` |
| Environment | Windows, PowerShell 7.6, Node v22.23.4 |
| Runtime dependencies | none |
| Production systems touched | none |
| Tools installed or purchased | none |

## Commands

    node --check draft/3.2.0/tests/check-protocol.mjs
    node draft/3.2.0/tests/check-protocol.mjs

The second command is dependency-free and is the L1/L2 structural gate. It also checks that the local `main` equals `origin/main` and that root `SKILL.md`, `README.md`, and `LICENSE` are unchanged.

## Result

| # | Engineering test | Result | Evidence |
| --- | --- | --- | --- |
| 1 | Skill file structure | pass | frontmatter and required files |
| 2 | Markdown format | pass | fences, whitespace, headings |
| 3 | File references and relative paths | pass | all local links resolve |
| 4 | Directory structure | pass | 32 required paths |
| 5 | Resource inventory template | pass | duplicate and install gates |
| 6 | Task handoff template | pass | 10 fields, 7 statuses |
| 7 | Cost ledger template | pass | actual/estimated and baseline |
| 8 | Four-level validation cases | pass | L1–L4 and limits |
| 9 | Three project scenarios | pass | 24 cases, read-only boundaries |
| 10 | 3.1.0 vs 3.2.0 diff | pass | root files unchanged |
| 11 | Cross-platform compatibility | pass | 7 standards, no dependency |
| 12 | Main not modified | pass | main = origin/main = `705dacf` |

Latest local run: **23 checks passed, 0 failed**. The per-check `ok` lines and the final `RESULT: PASS` line are reproduced by the command above.

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
| L2 | partial | Node test runs from a clean process; no target-client install |
| L3 | not tested | no authorized real business flow |
| L4 | not claimable | no observation window |

## Limitations

- The handoff is tested as a document, not in a live multi-agent runtime.
- The draft skill was not installed into a client; Agent Skills frontmatter is checked against the published spec.
- Score weights are a default, not calibrated across projects.
- A2A has no native acceptance state; the mapping uses metadata.
- OpenEnv is an RFC in review and is not a dependency.
- The three scenarios are read-only designs, not production evidence.

## Conclusion

The candidate is ready for independent review at L1 and partial L2. It is **not** released, not promoted, and not a business success. Promotion requires a separate approved change.
