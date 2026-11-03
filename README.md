# Network Reuse Protocol 3.2.0 · 全网复用模式

**Active release.** 3.2.0 is a portable work protocol for choosing proven solutions before building. It keeps the compact 3.1.0 reuse rule as the default for simple work and adds bounded discipline for high-risk, multi-agent, cost-sensitive, and long-lived work.

The canonical skill is [SKILL.md](SKILL.md). It uses Agent Skills frontmatter and has no executable runtime dependency. Loading its rules and optional references may consume context, plan quota, or API usage. No comparable measurement exists, so no savings percentage is claimed.

## Status

| Item | State |
| --- | --- |
| Version | 3.2.0 |
| Channel | active |
| Supersedes | 3.1.0 |
| Rollback | annotated Git tag `v3.1.0` at `705dacf` |
| License | MIT |
| Release tag | `v3.2.0` |
| Production systems touched | none |

## Eight capabilities

| Capability | Where it lives | Default depth |
| --- | --- | --- |
| Global mature-solution search | [references/global-search.md](references/global-search.md) | Standard and high-risk |
| Mature-solution decision | [references/evidence-and-scoring.md](references/evidence-and-scoring.md) | Any choice between options |
| Resource inventory and duplicate-install prevention | [references/resource-inventory.md](references/resource-inventory.md) | Before any install |
| AI cost control | [references/cost-control.md](references/cost-control.md) | When tokens, APIs, or paid tools are involved |
| Multi-AI collaboration | [references/multi-agent-handoff.md](references/multi-agent-handoff.md) | Only when work is actually split |
| Execution and security governance | [references/security-governance.md](references/security-governance.md) | Always; depth follows risk |
| Independent L1–L4 acceptance | [references/validation.md](references/validation.md) | L1/L2 always; L3/L4 when claimed |
| Long-term knowledge retention | [references/knowledge-retention.md](references/knowledge-retention.md) | Only for durable, reusable results |

## Read order

1. [SKILL.md](SKILL.md) — the active protocol body.
2. [DESIGN.md](DESIGN.md) — design rationale, modes, and tradeoffs.
3. [COMPATIBILITY.md](COMPATIBILITY.md) — Agent Skills, AGENTS.md, MCP, A2A, Open Responses, OpenSandbox, and OpenEnv mappings.
4. [references/README.md](references/README.md) — load only the reference the task needs.
5. [templates/README.md](templates/README.md) — copy a template into a project only when it reduces work.
6. [tests/TEST-REPORT.md](tests/TEST-REPORT.md), [tests/BEHAVIOR-EVIDENCE.md](tests/BEHAVIOR-EVIDENCE.md), [tests/test-cases.md](tests/test-cases.md), and [tests/acceptance-criteria.md](tests/acceptance-criteria.md) — verification evidence and limits.

## Installation

Install a directory named `network-reuse-protocol`; the directory name must match the Skill `name`. The complete package contains:

    network-reuse-protocol/
      SKILL.md
      README.md
      DESIGN.md
      COMPATIBILITY.md
      reuse-radar.md
      CHANGELOG.md
      LICENSE
      decisions/
      records/
      references/
      templates/
      tests/

The repository-only file `tests/build-package.mjs` is a maintainer builder and is not included in the installed package. No MCP server, SDK, runtime, plugin, or paid service is required. AGENTS.md, MCP, and A2A users can reference the same Markdown files without installing the Skill.

## Verification status

Document structure, isolated package references, and the active version are checked by [tests/check-protocol.mjs](tests/check-protocol.mjs) and [tests/check-package.mjs](tests/check-package.mjs). A target-client load check uses the actual installed path and records the client and model. Those are separate claims from behavior, business success, and long-term stability.

The four short behavior scenarios were run against the reviewed candidate in Codex CLI `0.166.0-alpha.5.1` with `deepseek/deepseek-flash`; they were not rerun for promotion. Other clients, automatic enforcement, real business flow (L3), long-term stability (L4), and savings remain unverified. The three project scenarios in [tests/test-cases.md](tests/test-cases.md) are read-only designs; no production account, ad plan, work order, or GEO publication was operated. See [tests/BEHAVIOR-EVIDENCE.md](tests/BEHAVIOR-EVIDENCE.md).

## Rollback

The complete 3.1.0 release is preserved by annotated tag `v3.1.0` at `705dacf`. To roll back, check out that tag and restore the pre-promotion local Skill snapshot. Restart the client and confirm 3.1.0 from the canonical path. If a remote withdrawal is required, revert the promotion commit; do not rewrite shared `main` history.

## License

MIT. See [LICENSE](LICENSE).
