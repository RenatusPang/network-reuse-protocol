# Evidence and scoring

> **Active 3.3.0 guidance.** A score supports judgment. It does not replace a hard gate or authorization.

## Separate four things

Always distinguish:

1. **What was actually done** — a command, test, deployment, or observed business outcome.
2. **What a primary source says** — specification, source code, release note, license, advisory.
3. **What someone claims** — vendor copy, star count, blog post, another AI's summary.
4. **What you infer** — a hypothesis that has not been tested.

Write the label next to the evidence. Do not let an inference migrate into a fact.

## Evidence levels

| Level | Evidence | Can support |
| --- | --- | --- |
| E0 | marketing copy, popularity, an AI summary, an unverified claim | a lead only |
| E1 | primary specification, official docs, license text, source code | a standard or interface decision |
| E2 | release artifact, checksum, reproducible build, issue with version | a technical choice, with limits |
| E3 | first-hand test in the target environment | L1/L2 claims and a bounded L3 pilot |
| E4 | production observation over time | L3/L4 claims |

Rules:

- E0 alone cannot pass a hard gate.
- A High-risk critical path needs E3 or a named gap.
- License and security need E1/E2, not a summary.
- L3 needs a real business flow; L4 needs time.
- A single successful run is E3, not E4.

## Hard gates

Check these before scoring. Any failure rejects the candidate unless the scope changes.

| Gate | Question | Evidence |
| --- | --- | --- |
| License and terms | May we use, modify, and redistribute it as intended? | license file, terms, dependency licenses |
| Security | Is the source and install path understood and acceptable? | source review, advisory check, script review |
| Environment | Does it run on the target OS, runtime, model, network, and data location? | docs, requirements, first-hand smoke test |
| Authority | May the operator perform the action on this account or system? | explicit scope, ownership, approval |
| Privacy | Will secrets or personal data be exposed, logged, or transferred? | data-flow review, retention policy |
| Budget | Is the cost inside an approved cap? | price source, measured usage, approval |

A gate can be "unknown" only when the next step is a bounded test or an explicit request for authorization. Unknown is not pass.

## Weighted score

Use a 0–5 anchor for each dimension. Weights are a default, not a universal truth.

| Dimension | Weight | 5 | 3 | 1 |
| --- | --- | --- | --- | --- |
| Functional fit | 30% | solves the core need with minor configuration | solves most of it with a workaround | adjacent but misses the need |
| Real-world validation | 20% | independent production evidence or reproduced test | credible pilot or partial evidence | claims only |
| Maintenance | 15% | active releases, responsive issues, clear ownership | occasional releases, some risk | stale or abandoned |
| Total cost of ownership | 15% | free/local or clearly lower than build | comparable to build | higher and hard to exit |
| Integration | 10% | standard interface, small glue | moderate glue or migration | deep rewrite |
| Portability and exit | 10% | data and interfaces are exportable | some lock-in | opaque or non-exportable |

Score = sum(weight × anchor). The maximum is 5.0. Do not present the score with more precision than the evidence supports; one decimal is enough.

Example: a candidate scores 4.5 on fit, 3 on validation, 4 on maintenance, 4 on cost, 3 on integration, and 3 on portability:

    0.30×4.5 + 0.20×3 + 0.15×4 + 0.15×4 + 0.10×3 + 0.10×3 = 3.75

A 3.75 is not automatically a reuse decision. The gates and the decision rules still apply.

## Decision rules

| Decision | Minimum condition |
| --- | --- |
| REUSE | Every gate passes; fit ≥ 4; validation ≥ 3; integration cost is small; exit is acceptable |
| COMPOSE | Two or more candidates each pass gates and cover distinct needs; the seam is tested or bounded |
| ADAPT | The core fit is ≥ 4; the gap is narrow; the license allows modification; a maintenance owner exists |
| BUILD | No candidate reaches fit ≥ 3, or every candidate fails a gate, and build cost is lower than adaptation |

These are defaults. A high-risk task may require stronger evidence. A simple task may need only one primary source and one smoke test.

## Cost comparison

Compare adoption and build side by side:

    Adoption cost =
      evaluation + integration + migration + training +
      license + maintenance + exit + expected failure cost

    Build cost =
      design + implementation + testing + maintenance +
      opportunity cost + expected failure cost

Use ranges when the inputs are uncertain. State the time horizon and currency. Do not compare a one-week prototype with a three-year maintained product.

## Confidence

| Confidence | Meaning |
| --- | --- |
| High | primary evidence plus a first-hand test in the target environment |
| Medium | primary evidence, one gap, or a test in a close environment |
| Low | claims, indirect evidence, or unresolved contradictions |

Confidence is not a substitute for a gate. A high-confidence claim can still fail a license gate.

## Decision record

For a durable or high-risk choice, record:

- question and scope;
- candidates and versions;
- gate results;
- score and weights;
- decision;
- evidence links;
- assumptions and unknowns;
- rollback or exit;
- review date.

Use [../templates/decision-record.md](../templates/decision-record.md). Do not record every trivial choice.

## Anti-patterns

- **Score shopping:** changing weights until the preferred option wins. Fix weights before scoring.
- **Gate laundering:** calling a license problem "a small legal risk".
- **Summary evidence:** citing an AI answer instead of the primary source.
- **Single-source high-risk:** one blog post cannot justify an irreversible change.
- **False precision:** reporting 3.75 when the inputs are guesses.
- **Sunk-cost defense:** continuing because of prior work, not because the evidence changed.
