# Network Reuse Protocol 3.2.0 — DRAFT / NOT ACTIVE

> **DRAFT / NOT ACTIVE.** This folder is a review candidate. The active release is still 3.1.0 at the repository root. Do not install, announce, publish, or apply this candidate until independent review and explicit approval.

## What this is

3.2.0 turns the compact 3.1.0 reuse rule into a portable work protocol for different AI clients, models, agents, and execution environments. It keeps the original principle and adds enough structure for high-risk work without turning simple tasks into research ceremonies.

The canonical draft skill is [SKILL.md](SKILL.md). It uses standard Agent Skills frontmatter and has no executable runtime dependency. Loading its rules and optional references may consume context, plan quota, or API usage. No comparable measurement exists yet, so no savings percentage is claimed. Detail lives in [references/README.md](references/README.md) and is loaded only when the task needs it.

## Status

| Item | State |
| --- | --- |
| Version | 3.2.0 |
| Channel | draft |
| Active | no |
| Supersedes | 3.1.0 only after approval |
| Branch | `draft/nrp-3.2.0` |
| 3.1.0 root files | unchanged |
| External tools installed | none |
| Production systems touched | none |

## Eight capabilities

| Capability | Where it lives | Default depth |
| --- | --- | --- |
| Global mature-solution search | [references/global-search.md](references/global-search.md) | Standard and high-risk |
| Evidence, gates, and scoring | [references/evidence-and-scoring.md](references/evidence-and-scoring.md) | Standard and high-risk |
| Resource inventory and duplicate-install prevention | [references/resource-inventory.md](references/resource-inventory.md) | Before any install |
| AI cost control | [references/cost-control.md](references/cost-control.md) | When tokens, APIs, or paid tools are involved |
| Multi-AI collaboration | [references/multi-agent-handoff.md](references/multi-agent-handoff.md) | Only when work is actually split |
| Execution and security governance | [references/security-governance.md](references/security-governance.md) | Always; depth follows risk |
| Independent L1–L4 acceptance | [references/validation.md](references/validation.md) | L1/L2 always; L3/L4 when claimed |
| Long-term knowledge retention | [references/knowledge-retention.md](references/knowledge-retention.md) | Only for durable, reusable results |

## Read order

1. [SKILL.md](SKILL.md) — the 3.2.0 draft rules.
2. [DESIGN.md](DESIGN.md) — why the protocol is shaped this way and what changed.
3. [COMPATIBILITY.md](COMPATIBILITY.md) — Agent Skills, AGENTS.md, MCP, A2A, Open Responses, OpenSandbox, OpenEnv.
4. [references/README.md](references/README.md) — load only the reference the task needs.
5. [templates/README.md](templates/README.md) — copy a template into a project only when it adds value.
6. [tests/TEST-REPORT.md](tests/TEST-REPORT.md), [tests/BEHAVIOR-EVIDENCE.md](tests/BEHAVIOR-EVIDENCE.md), [tests/test-cases.md](tests/test-cases.md), and [tests/acceptance-criteria.md](tests/acceptance-criteria.md) — review evidence and limits.

## Install preview, not an install

Do not copy this folder into an active skills directory while it is draft. After approval, the intended package is a directory named `network-reuse-protocol` containing [SKILL.md](SKILL.md), [README.md](README.md), [DESIGN.md](DESIGN.md), [COMPATIBILITY.md](COMPATIBILITY.md), [reuse-radar.md](reuse-radar.md), [decisions/](decisions/README.md), [records/](records/README.md), [references/](references/README.md), [templates/](templates/README.md), and `LICENSE`; the `tests/` folder is maintainer material. AGENTS.md, MCP, and A2A users can reference the same files without installing anything.

## Evidence limits

This candidate has passed document and package-reference checks, plus a minimal explicit-file-load and four-scenario behavior run in Codex CLI `0.166.0-alpha.5.1` with `deepseek/deepseek-flash`. Other clients and automatic discovery remain unverified. It has not been run through a real business workflow (L3) or a long observation window (L4). The three project scenarios in [tests/test-cases.md](tests/test-cases.md) are read-only designs; no production account, ad plan, work order, or GEO publication was operated. See [tests/BEHAVIOR-EVIDENCE.md](tests/BEHAVIOR-EVIDENCE.md).

## Review focus

- Does the 3.2.0 body stay light enough for simple tasks?
- Are the hard gates and authorization boundaries strict enough?
- Are the score weights useful or falsely precise?
- Do the handoff fields and statuses survive a real multi-agent run?
- Are the standards mappings accurate and optional?
- Is every claimed test backed by a command or artifact?

## Relation to 3.1.0

[../../SKILL.md](../../SKILL.md), [../../README.md](../../README.md), and [../../LICENSE](../../LICENSE) are the active 3.1.0 release and are not edited by this draft. See [../../CHANGELOG.md](../../CHANGELOG.md) for the version record. Promotion is a separate change after review.

## License

MIT. See [../../LICENSE](../../LICENSE).
