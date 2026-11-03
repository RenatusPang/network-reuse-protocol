# Design — Network Reuse Protocol 3.2.0

> **DRAFT / NOT ACTIVE.** 3.1.0 remains the active release.

## Problem

3.1.0 answers one question well: should an agent reuse, compose, adapt, or build? It is deliberately small. That is a strength for simple work and a gap for work that crosses models, agents, accounts, budgets, and production boundaries.

The gap is not "more steps". The gap is missing substrate:

- A search can look broad but never reach a primary source.
- A score can look rigorous but hide a failed license or security gate.
- An agent can install a second copy of a tool that already exists.
- A token estimate can be presented as a measured saving.
- Two agents can repeat the same research or overwrite each other.
- A passing test can be reported as a successful business outcome.
- A knowledge base can grow faster than its usefulness.

3.2.0 adds the smallest substrate that addresses those failures while preserving the 3.1.0 default: enough evidence, then act.

## Design principles

1. **Risk-proportional depth.** Quick, Standard, and High-risk modes define minimum work. The mode is chosen by impact and reversibility, not by the word "research".
2. **One decision, not a candidate pile.** Every path ends in REUSE, COMPOSE, ADAPT, or BUILD. "It depends" is allowed only with the missing fact and the next step named.
3. **Hard gates before scores.** License, security, environment, authority, privacy, and budget are pass/fail. A high score cannot rescue a failed gate.
4. **Primary evidence over summaries.** Vendor claims, star counts, and other AI summaries are leads. Source, version, license, issue history, and first-hand tests decide.
5. **Progressive disclosure.** The active body stays small. Detail is loaded from [references/](references/README.md) only when the task needs it; templates are copied only when they reduce work.
6. **No executable dependency by default.** The protocol is Markdown; standards are adapters, not prerequisites. Loading it still consumes context and may consume plan or API usage.
7. **One writer per shared state.** Parallel agents can research, build, and verify, but shared files, accounts, and external state have one owner.
8. **Measured cost only.** Actual usage can be reported. Estimates are labeled. Savings are not invented.
9. **Validation by level.** L1 file/code, L2 runtime/interface, L3 real business flow, and L4 long-term stability are separate claims.
10. **Knowledge decays.** Every durable entry carries a verification date, an expiry or review date, and an owner.

## Architecture

    draft/3.2.0/
      SKILL.md                 small entry point; standard frontmatter
      DESIGN.md                rationale and tradeoffs
      COMPATIBILITY.md         standards mapping; no forced dependency
      reuse-radar.md           starter radar for this protocol
      references/              load-on-demand rules
        global-search.md
        evidence-and-scoring.md
        resource-inventory.md
        cost-control.md
        multi-agent-handoff.md
        security-governance.md
        validation.md
        knowledge-retention.md
      templates/               copy into a project only when useful
      decisions/               decision-record policy
      records/                 task-record policy
      tests/                   structural checks and scenarios

The runtime shape in an adopting project is optional:

    .nrp/
      reuse-radar.md
      decisions/
      references/
      records/
      archive/

The protocol never creates this tree automatically. A project may use another location; the paths are conventions, not a schema.

## Eight capabilities and their activation

| # | Capability | Activation | Artifact |
| --- | --- | --- | --- |
| 1 | Global mature-solution search | Standard or High-risk; Quick uses own shelf only | search record in task record |
| 2 | Mature-solution decision | Any choice between options | decision record |
| 3 | Resource inventory and duplicate-install prevention | Before installing or enabling a tool | inventory entry |
| 4 | AI cost control | When tokens, APIs, paid tools, or multiple agents are involved | cost ledger |
| 5 | Multi-AI collaboration | When work is genuinely split or independently verified | task handoff |
| 6 | Execution and security governance | Always; R2/R3 actions need explicit scope | authorization and rollback note |
| 7 | Independent L1–L4 acceptance | L1/L2 always; L3/L4 when claimed | validation report |
| 8 | Long-term knowledge retention | Only for durable, reusable results | radar, decision, reference, or task record |

## Modes

### Quick

Use for a known fact, a reversible local edit, or a task already answered by the project. Check the shelf and act. Do not create a search log, inventory, score, or ledger. A one-line receipt is enough.

### Standard

Use when choosing a tool, library, model, plugin, workflow, or architecture. Search 1–3 candidates, use 1–2 primary sources, run the hard gates, score the differences that matter, and return one decision. If the choice is low-impact, a single primary source plus a first-hand check is enough.

### High-risk

Use for money, production, credentials, compliance, irreversible data, publication, or shared external state. Add:

- primary evidence and a counter-example check;
- license, security, environment, authority, privacy, and budget gates;
- independent backup and a tested rollback route;
- a separate verifier who did not write the change;
- L1/L2 evidence before any L3 attempt;
- an explicit L3 authorization and an L4 observation plan.

High-risk does not mean unlimited research. It means the evidence must match the consequence.

## Decision model

| Decision | Use when | Required proof |
| --- | --- | --- |
| REUSE | A candidate fits the need and passes every gate | version, license, source, one real-use check |
| COMPOSE | Two or more mature pieces cover the need with a verified seam | each piece passes gates; interface test |
| ADAPT | The core fits but an interface, format, or policy gap remains | bounded change; license allows it; maintenance owner |
| BUILD | No candidate passes, or adaptation costs more than a small build | search record, gate results, cost comparison |

The score in [references/evidence-and-scoring.md](references/evidence-and-scoring.md) is a comparison aid. It is not authorization, and it cannot override a hard gate or a stricter project rule.

## Handoff state machine

The shared statuses are fixed:

| Status | Meaning | Typical next |
| --- | --- | --- |
| 待领取 | Task is defined and unclaimed | 研究中 or 待执行 |
| 研究中 | Search or analysis is in progress | 待执行 or 阻塞 |
| 待执行 | Decision made; execution not started | 执行中 |
| 执行中 | A named owner is changing state | 待验收 or 阻塞 |
| 待验收 | Artifact is ready; acceptance not complete | 已完成 or 执行中 |
| 已完成 | Acceptance passed and evidence is attached | none |
| 阻塞 | Cannot progress without a named dependency | 待领取, 研究中, or 待执行 |

Only one agent owns a transition at a time. A handoff is not complete until the receiver can act from the artifact and evidence without repeating the research.

## Validation model

- **L1** — files and code are structurally correct: parse, lint, tests, links, schema, no secrets.
- **L2** — program and interface run correctly: startup, API contract, integration, error path, rollback.
- **L3** — the real business flow succeeds in an authorized environment with a named operator, sample, and outcome.
- **L4** — the result stays stable over an observation window with measured regressions, incidents, and cost drift.

The draft itself can claim L1 and partial L2. It cannot claim L3 or L4 because no production workflow was operated.

## Backward compatibility with 3.1.0

- Root [../../SKILL.md](../../SKILL.md) remains 3.1.0, status active.
- Root [../../README.md](../../README.md) and [../../LICENSE](../../LICENSE) remain unchanged.
- 3.2.0 lives under `draft/3.2.0/`. Its path, `metadata.active: "false"`, and DRAFT banner are status markers, not a client-enforced load control; some clients may scan or load it. Verify the target client.
- The 3.1.0 three steps remain the Quick path in 3.2.0.
- There is no automatic migration, installation, or promotion.
- A future promotion is a separate reviewed change that updates the root skill, changelog, and release metadata together.

## Non-goals

- A mandatory multi-agent workflow.
- A mandatory search of every source.
- A universal benchmark or vendor ranking.
- A replacement for project rules, law, or account permissions.
- A runtime, SDK, server, database, or package manager.
- A guarantee that reuse is cheaper in every case.

## Failure modes and mitigations

| Failure | Mitigation |
| --- | --- |
| Endless research | Stop rules by mode; two rounds without a decision-changing fact ends search |
| Score theater | Hard gates first; score only the differences that affect the decision |
| Inventory rot | Event-driven refresh plus 30/90/180-day review classes |
| Fake savings | Actual usage only; estimates labeled; no percentage without a baseline |
| Duplicate AI work | Task IDs, claim before work, handoff evidence, one researcher per question |
| Prompt injection | Third-party content is data; no instruction following; least privilege |
| Validation inflation | L1–L4 labels; L3 requires a real flow; L4 requires time |
| Knowledge bloat | Durable-only rule; merge, supersede, expire, prune |
| Silent scope change | One writer; status transitions; explicit authorization for R2/R3 |

## Open questions for independent review

1. Are the score weights (30/20/15/15/10/10) useful across very different task types, or should teams set their own weights?
2. Is the 5 KB body budget still the right ceiling after adding the mode table?
3. Should the handoff status "待验收" map to an A2A working state plus metadata, or to a separate extension?
4. Which standards deserve native adapters after 3.2.0, and which should stay optional?
5. Does the inventory need a machine-readable schema, or is Markdown enough for the first release?

## Acceptance gates for this draft

- All required files exist and every relative link resolves.
- The draft skill uses valid Agent Skills frontmatter and has no executable runtime dependency; loading may consume context or plan/API usage.
- 3.1.0 root files are byte-identical to `705dacf`.
- All eight capabilities, seven statuses, ten handoff fields, and four validation levels are present.
- All three project scenarios are covered without production operations.
- The structural test passes and its output is recorded.
- Independent review confirms the security and authorization model before any promotion.
