# Changelog

All notable changes to Network Reuse Protocol are recorded here. Draft entries are not releases.

## 3.2.0 — DRAFT / NOT ACTIVE (2026-11-03)

Candidate branch: `draft/nrp-3.2.0`. Review package: [draft/3.2.0/README.md](draft/3.2.0/README.md).

- Adds a risk-proportional Universal AI Work Protocol while keeping the 3.1.0 three-step default for simple work.
- Adds bounded global search, evidence levels, hard gates, a weighted score, and four decisions: REUSE / COMPOSE / ADAPT / BUILD.
- Adds a shared resource inventory and a duplicate-install check covering models, skills, plugins, MCP servers, projects, APIs, and tools.
- Adds model routing, budget guards, a cost ledger, and a ban on invented savings percentages.
- Adds a ten-field multi-agent handoff, seven shared statuses, one-writer rules, and A2A mapping notes.
- Adds operation classes, prompt-injection handling, supply-chain review, secret hygiene, backup, and rollback.
- Adds L1–L4 acceptance and an explicit rule that passing code is not business success.
- Adds reuse-radar, decisions, references, task records, and expiry review guidance.
- Adds three read-only project scenarios and a dependency-free structural test.
- Keeps [SKILL.md](SKILL.md), [README.md](README.md), and [LICENSE](LICENSE) byte-identical to 3.1.0. No production system is touched.

## 3.1.0 — 2026-10-27

Initial public release at commit `2e21d98`: a compact three-step protocol with risk-proportional depth, hard safety boundaries, and a size budget.

## 3.1.0 license correction — 2026-10-27

Commit `705dacf` corrected the copyright holder in [LICENSE](LICENSE) to RenatusPang. No protocol text changed.

## Version policy

- `draft/` holds unapproved candidates and is never active by location alone.
- A release becomes active only after review, approval, and a separate promotion change.
- Changelog entries describe what changed; they do not prove installation, adoption, or business effect.
