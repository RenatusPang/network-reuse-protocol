# Network Reuse Protocol 3.3.1 · 全网复用模式

**Active release.** 3.3.1 is an owner-authorized maintenance patch over 3.3.0, following a direct desktop Gemini review. The protocol is a portable work protocol for choosing proven solutions before building. It keeps the compact 3.1.0 reuse rule as the default for simple work and adds bounded discipline for high-risk, multi-agent, cost-sensitive, and long-lived work.

The canonical skill is [SKILL.md](SKILL.md). It uses Agent Skills frontmatter and has no executable runtime dependency. Loading its rules and optional references may consume context, plan quota, or API usage. No comparable measurement exists, so no savings percentage is claimed.

## Quick start

1. Download the complete tagged release, unpack it, and name the folder `network-reuse-protocol`. Keep its supporting files; `SKILL.md` must be directly inside that folder. No new model, MCP server, API key, or paid service is required by this package.
2. Use the directory supported by your client; choose one scope, not duplicate copies:

| Client | Current project | All projects for this user |
| --- | --- | --- |
| Codex | `.agents/skills/network-reuse-protocol/` | `~/.agents/skills/network-reuse-protocol/` |
| Claude Code | `.claude/skills/network-reuse-protocol/` | `~/.claude/skills/network-reuse-protocol/` |

On Windows, `~` means your user home directory. Inspect an existing installation or shared pointer before copying: do not rename another client's Skill, overwrite local records, or silently replace a customized copy. Older or customized clients may use a different path; follow the installed client's supported layout.

3. In a new session, explicitly ask the agent to use `network-reuse-protocol` and report the path and version it actually read. Other clients can use their supported Skill import or read [SKILL.md](SKILL.md) with accessible references. File readability is not proof of automatic discovery or enforcement.

**Node.js is only needed for maintainer checks**, not for reading the protocol. Maintainers can run `node tests/check-protocol.mjs` from a Git checkout or `node tests/check-package.mjs` from a complete package directory named `network-reuse-protocol`. Do not install Node solely to use this Markdown Skill.

Directory references, checked 2026-11-14: [OpenAI local Skill locations](https://developers.openai.com/codex/skills), [Claude Code Skill locations](https://code.claude.com/docs/en/skills), and the [Agent Skills package specification](https://agentskills.io/specification). These document layout, not a claim that every client was tested here.

## Status

| Item | State |
| --- | --- |
| Version | 3.3.1 |
| Channel | active |
| Supersedes | 3.3.0 |
| Rollback baseline | annotated Git tag `v3.3.0` at `65319b4`; earlier tags retained |
| License | MIT |
| Release tag | `v3.3.1` |
| Production systems touched | none |

## What changes in 3.3.1

This patch adds the client-specific quick start and moves bounded retrieval rules ahead of the search workflow. Complete unchanged reads are reused; partial reads, changed sources, post-write checks, and explicit freshness requests retain narrow exceptions. Source opening is distinct from another search round. No measured savings or new all-client compatibility claim is added.

### Inherited 3.3.0 improvements

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

1. [SKILL.md](SKILL.md) — the active protocol body.
2. [DESIGN.md](DESIGN.md) — design rationale, modes, and tradeoffs.
3. [COMPATIBILITY.md](COMPATIBILITY.md) — Agent Skills, AGENTS.md, MCP, A2A, Open Responses, OpenSandbox, and OpenEnv mappings.
4. [references/README.md](references/README.md) — load only the reference the task needs.
5. [templates/README.md](templates/README.md) — copy a template into a project only when it reduces work.
6. [tests/TEST-REPORT.md](tests/TEST-REPORT.md), [tests/BEHAVIOR-EVIDENCE.md](tests/BEHAVIOR-EVIDENCE.md), [tests/test-cases.md](tests/test-cases.md), and [tests/acceptance-criteria.md](tests/acceptance-criteria.md) — verification evidence and limits.

## Complete release package

Build the complete release in a directory named `network-reuse-protocol`; the directory name must match the Skill `name`. Update only the intended client path and preserve local records and rollback data. The complete package contains:

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

Document structure, isolated package references, and release status are checked by [tests/check-protocol.mjs](tests/check-protocol.mjs) and [tests/check-package.mjs](tests/check-package.mjs). The 3.3.0 behavior test explicitly read candidate files in an isolated Codex CLI session; it did not install the candidate or prove automatic discovery. These are separate claims from business success and long-term stability.

The five new scenario expectations were observed, including actual GitHub discovery of a direct existing-site redesign solution after a focused repair. A separate efficiency check failed because the client repeated successful reads/queries. X content access was unavailable. The evidence report preserves both failures and limits; this is not an all-pass behavior or savings claim.

Historical 3.2.0 evidence: the four short behavior scenarios were run against the reviewed candidate in Codex CLI `0.166.0-alpha.5.1` with `deepseek/deepseek-flash`; they were not rerun for promotion. Other clients, automatic enforcement, real business flow (L3), long-term stability (L4), and savings remain unverified. The three project scenarios in [tests/test-cases.md](tests/test-cases.md) are read-only designs; no production account, ad plan, work order, or GEO publication was operated. See [tests/BEHAVIOR-EVIDENCE.md](tests/BEHAVIOR-EVIDENCE.md).

## Rollback

The rollback baseline is annotated tag `v3.3.0` at `65319b4`; `v3.2.0` is also retained. The earlier 3.1.0 release remains at `v3.1.0` (`705dacf`). Restore a verified pre-update local snapshot; remove only files listed as newly added by that installation. Keep local records and other clients intact. To withdraw the remote release, revert the promotion merge in a new commit; never reset shared history or move published tags.

## License

MIT. See [LICENSE](LICENSE).
