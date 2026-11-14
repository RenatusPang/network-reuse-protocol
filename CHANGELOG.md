# Changelog

All notable changes to Network Reuse Protocol are recorded here. A changelog entry records the change; it does not by itself prove installation or business effect.

## 3.3.1 — 2026-11-14

Owner-authorized maintenance patch following a direct discussion with desktop Gemini. Rollback baseline: `v3.3.0` (`65319b4`).

- Add a concise quick start with distinct Codex and Claude Code directories; Node remains maintainer-only.
- Front-load retrieval reuse and bounded follow-ups without banning necessary partial, changed, post-write, or freshness reads.
- Keep source opening distinct from a new search round and stop after agreed acceptance, not after an ever-growing test checklist.
- Add targeted static and mutation regressions; do not reinterpret historical behavior failures as passes or claim measured Token savings.
- Preserve private client extensions, shared pointers, old local checkouts, and unrelated configuration; do not publish private files.

## 3.3.0 — 2026-11-04

Owner-authorized release of candidate `26db7d8`. Published as `v3.3.0`; rollback baseline `v3.2.0` (`da1a716`). Synchronize the complete package to the current Codex Skill without changing DSH or global configuration. The recorded duplicate-retrieval failure and X-access skip remain disclosed; promotion does not turn them into passes.

- Honor user-specified sources through actual retrieval; report access failures and label alternatives.
- Translate intent into professional vocabulary, failure modes, solution types, and environment before searching.
- Check core fit, closer peers, environment, existing capabilities, and evidence before concluding; allow at most one targeted follow-up for a remaining gap.
- Separate opened/checked sources, search-result-only leads, prior knowledge, and unverified inference.
- Preserve Quick mode, 1–3 focused candidates, existing authorization, security, cost, validation, and collaboration rules.
- Add five targeted search scenarios and candidate/package/status regressions; retain historical 3.2.0 evidence as history.

## 3.2.0 — 2026-11-03

Promoted from the independently reviewed candidate on branch `draft/nrp-3.2.0`. The formal release is tagged `v3.2.0`; the rollback baseline is annotated tag `v3.1.0` at `705dacf`.

- Adds a risk-proportional Universal AI Work Protocol while keeping the 3.1.0 three-step default for simple work.
- Adds bounded global search, evidence levels, hard gates, a weighted score, and four decisions: REUSE / COMPOSE / ADAPT / BUILD.
- Adds a shared resource inventory and a duplicate-install check covering models, skills, plugins, MCP servers, projects, APIs, and tools.
- Adds model routing, budget guards, a cost ledger, and a ban on invented savings percentages.
- Adds a ten-field multi-agent handoff, seven shared statuses, one-writer rules, and A2A mapping notes.
- Adds operation classes, prompt-injection handling, supply-chain review, secret hygiene, backup, and rollback.
- Adds L1–L4 acceptance and an explicit rule that passing code is not business success.
- Adds reuse-radar, decisions, references, task records, and expiry review guidance.
- Adds three read-only project scenarios and a dependency-free structural test.
- Preserves the pinned 3.1.0 release by tag and keeps the 3.1.0 three-step path as Quick mode. No production system is touched.
- Records promotion, package, client-load, behavior, and unresolved compatibility evidence separately in [tests/TEST-REPORT.md](tests/TEST-REPORT.md) and [tests/BEHAVIOR-EVIDENCE.md](tests/BEHAVIOR-EVIDENCE.md).

## 3.1.0 — 2026-10-27

Initial public release at commit `2e21d98`: a compact three-step protocol with risk-proportional depth, hard safety boundaries, and a size budget.

## 3.1.0 license correction — 2026-10-27

Commit `705dacf` corrected the copyright holder in [LICENSE](LICENSE) to RenatusPang. No protocol text changed.

## Version policy

- A release becomes active only after review, approval, a promotion change, and release checks.
- A rollback baseline is an annotated Git tag; `v3.1.0` is the rollback tag for 3.2.0.
- Changelog entries describe what changed; they do not prove installation, adoption, savings, or business effect.
