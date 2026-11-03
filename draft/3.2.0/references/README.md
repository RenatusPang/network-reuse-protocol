# References — load on demand

> **DRAFT / NOT ACTIVE.** These files are detail, not a required sequence. Load only what the task needs.

| File | Load when | Skip when |
| --- | --- | --- |
| [global-search.md](global-search.md) | You need to find a mature option, standard, source, or real case | The answer is already in the project or a known primary source |
| [evidence-and-scoring.md](evidence-and-scoring.md) | You must compare candidates or defend a decision | There is one obvious, low-risk choice |
| [resource-inventory.md](resource-inventory.md) | Before installing, enabling, or duplicating a tool | A read-only question with no new tool |
| [cost-control.md](cost-control.md) | Tokens, APIs, paid tools, or multiple agents are involved | A small local task with no measurable cost |
| [multi-agent-handoff.md](multi-agent-handoff.md) | Work is split across agents or independently verified | One agent can finish without a handoff |
| [security-governance.md](security-governance.md) | Any change beyond read-only, or any untrusted input | A pure read of trusted local material |
| [validation.md](validation.md) | You are about to claim a result works | You are only reporting a fact or a draft |
| [knowledge-retention.md](knowledge-retention.md) | A result is durable, reusable, or expensive to rediscover | The result is transient or already recorded |

The core body is [../SKILL.md](../SKILL.md). Templates are in [../templates/](../templates/README.md). Tests are in `../tests/`.

## Why progressive disclosure

A protocol that loads every rule for every task becomes the ceremony it was meant to replace. The entry point gives the default loop and hard boundaries. References add precision only when a decision, risk, or claim needs it.

If two references disagree, the stricter safety or authorization rule wins. If a reference conflicts with a project rule, the stricter rule wins.
