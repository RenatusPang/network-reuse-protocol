# Network Reuse Protocol 3.3.0 candidate · 全网复用模式

**DRAFT / NOT ACTIVE.** This branch proposes 3.3.0. Published main and the installed Skill remain 3.2.0. The protocol is a portable work protocol for choosing proven solutions before building. It keeps the compact 3.1.0 reuse rule as the default for simple work and adds bounded discipline for high-risk, multi-agent, cost-sensitive, and long-lived work.

The canonical skill is [SKILL.md](SKILL.md). It uses Agent Skills frontmatter and has no executable runtime dependency. Loading its rules and optional references may consume context, plan quota, or API usage. No comparable measurement exists, so no savings percentage is claimed.

## Status

| Item | State |
| --- | --- |
| Version | 3.3.0 candidate |
| Channel | draft / not active |
| Supersedes | 3.2.0 only after approval |
| Rollback baseline | annotated Git tag `v3.2.0` at `da1a716`; earlier `v3.1.0` also retained |
| License | MIT |
| Published baseline | `v3.2.0` at `da1a716`; no 3.3.0 release tag |
| Production systems touched | none |

## What changes from 3.2.0

3.2.0 already encouraged problem-based search. 3.3.0 makes a user-named source a required actual retrieval or an explicit incomplete check; translates the goal into useful professional terms; checks for closer candidates before stopping; and distinguishes opened sources, search-only leads, prior knowledge, and inference. A general search is not a silent substitute.

Quick remains direct. Standard keeps 1–3 focused candidates and uses at most one targeted follow-up only for a decision-changing gap. No new tool, service, model, permission, or runtime is required. Evidence and limits are in [tests/BEHAVIOR-EVIDENCE.md](tests/BEHAVIOR-EVIDENCE.md).

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

1. [SKILL.md](SKILL.md) — the candidate protocol body.
2. [DESIGN.md](DESIGN.md) — design rationale, modes, and tradeoffs.
3. [COMPATIBILITY.md](COMPATIBILITY.md) — Agent Skills, AGENTS.md, MCP, A2A, Open Responses, OpenSandbox, and OpenEnv mappings.
4. [references/README.md](references/README.md) — load only the reference the task needs.
5. [templates/README.md](templates/README.md) — copy a template into a project only when it reduces work.
6. [tests/TEST-REPORT.md](tests/TEST-REPORT.md), [tests/BEHAVIOR-EVIDENCE.md](tests/BEHAVIOR-EVIDENCE.md), [tests/test-cases.md](tests/test-cases.md), and [tests/acceptance-criteria.md](tests/acceptance-criteria.md) — verification evidence and limits.

## Candidate packaging

Do not replace the active Skill with this branch before release approval. For isolated review, build a directory named `network-reuse-protocol`; the directory name must match the Skill `name`. The complete package contains:

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

Document structure, isolated package references, and candidate status are checked by [tests/check-protocol.mjs](tests/check-protocol.mjs) and [tests/check-package.mjs](tests/check-package.mjs). The 3.3.0 behavior test explicitly read candidate files in an isolated Codex CLI session; it did not install the candidate or prove automatic discovery. These are separate claims from business success and long-term stability.

The five new scenario expectations were observed, including actual GitHub discovery of a direct existing-site redesign solution after a focused repair. A separate efficiency check failed because the client repeated successful reads/queries. X content access was unavailable. The evidence report preserves both failures and limits; this is not an all-pass behavior or savings claim.

Historical 3.2.0 evidence: the four short behavior scenarios were run against the reviewed candidate in Codex CLI `0.166.0-alpha.5.1` with `deepseek/deepseek-flash`; they were not rerun for promotion. Other clients, automatic enforcement, real business flow (L3), long-term stability (L4), and savings remain unverified. The three project scenarios in [tests/test-cases.md](tests/test-cases.md) are read-only designs; no production account, ad plan, work order, or GEO publication was operated. See [tests/BEHAVIOR-EVIDENCE.md](tests/BEHAVIOR-EVIDENCE.md).

## Rollback

This candidate has not changed main or the installed 3.2.0 Skill, so no active rollback is needed. The baseline is annotated tag `v3.2.0` at `da1a716`. The complete earlier 3.1.0 release remains at annotated tag `v3.1.0` (`705dacf`). If a future approved release must be withdrawn, revert its promotion commit without rewriting shared history and restore the corresponding verified local Skill snapshot.

## License

MIT. See [LICENSE](LICENSE).
