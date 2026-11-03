# Reuse Radar — Network Reuse Protocol 3.2.0

> **Active 3.2.0 guidance.** Starter radar for the protocol itself. Adopters should keep their own `.nrp/reuse-radar.md`; do not copy vendor facts without re-verification.

## How to read this

Each entry records a capability, the candidate, the decision, the evidence level, the verification date, and the next review. A radar is not a catalog of everything installed. It is a short list of reusable choices that affect future work.

## Entries

| ID | Capability | Candidate | Decision | Status | Evidence | Verified | Review by | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RAD-001 | Portable skill packaging | Agent Skills specification | ADAPT | active | E1 primary spec | 2026-11-03 | 2027-02-03 | high |
| RAD-002 | Repository agent instructions | AGENTS.md | ADAPT | active | E1 official site | 2026-11-03 | 2027-05-03 | high |
| RAD-003 | Tool and resource exposure | MCP 2026-07-28 | COMPOSE | active | E1 official spec | 2026-11-03 | 2027-01-03 | medium |
| RAD-004 | Agent-to-agent tasks | A2A 1.0.0 | ADAPT | active | E1 official spec | 2026-11-03 | 2027-02-03 | medium |
| RAD-005 | Provider-neutral model calls | Open Responses | — | WATCH | E1 official spec | 2026-11-03 | 2026-12-03 | low |
| RAD-006 | Isolated code execution | OpenSandbox | — | WATCH | E1 repository + docs | 2026-11-03 | 2026-12-03 | low |
| RAD-007 | Reproducible agent environments | OpenEnv RFC 002 | — | WATCH | E1 RFC in review | 2026-11-03 | 2026-12-03 | low |

## Notes

**WATCH** is a review status, not a fifth decision. A dash means no adoption decision yet.

- **RAD-001**: Native frontmatter and directory layout; no executable runtime dependency. Loading still consumes context and may consume plan or API usage. Re-check field rules before promotion.
- **RAD-002**: Use a short project gate, not a full protocol copy. Nested files may add stricter rules.
- **RAD-003**: Inventory servers before adding another. Tool descriptions and outputs are untrusted data.
- **RAD-004**: Mapping is lossy; A2A has no native "awaiting acceptance" state. Preserve NRP status in metadata.
- **RAD-005**: Optional adapter only. Verify provider support and schema stability.
- **RAD-006**: Optional high-risk execution layer. Requires a separate license, security, and operations review.
- **RAD-007**: RFC is in review. Do not add it as a dependency.

## Expiry policy

- Fast-moving standards and tools: 30 days.
- Stable specifications and platforms: 90 days.
- Slow standards and legal texts: 180 days or one year.
- Any version change, security advisory, or failed production check triggers immediate review.

An expired entry is not deleted automatically. Mark it `stale`, state what changed, and decide whether to re-verify, replace, or remove it.

## Entry template

See [templates/reuse-radar.md](templates/reuse-radar.md). The minimum fields are ID, capability, candidate, decision, status, scope, version, source, evidence level, last verified, review by, confidence, owner, and notes.
