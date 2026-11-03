# AI cost control

> **DRAFT / NOT ACTIVE.** The protocol must never install a tool or buy a service as part of an upgrade.

## Cost hierarchy

Use the first option that passes the task's gates:

1. **No new spend.** Reuse an existing result, subscription, or local asset.
2. **Free and local.** Run on hardware you already own, with an acceptable license.
3. **Included quota.** Use a plan already paid for, within its terms.
4. **Open-source self-host.** Add only if operations, security, and maintenance are covered.
5. **Metered API.** Use after a budget, cap, and owner are approved.
6. **New paid service.** Requires explicit approval scoped to the purchase.

The protocol itself is Markdown. It creates no new paid-service dependency, but loading its rules and references may consume context, plan quota, or API usage. No comparable measurement exists yet, so no savings percentage is claimed.

## Route by task difficulty

Do not use a frontier model for a deterministic task. Do not use a local model for a task that needs judgment it cannot provide. Capability tiers are more stable than model names:

| Tier | Use for | Examples of work |
| --- | --- | --- |
| Deterministic | parsing, formatting, checks, file operations | scripts, linters, templates |
| Small or local | classification, extraction, short summaries, drafts | local model or low-cost API |
| General | implementation, analysis, multi-step writing | standard model |
| Frontier | ambiguous, high-risk, cross-domain reasoning | strongest available model, bounded |

Verify current model names, context limits, prices, and availability before routing. A model name in a document is not proof that the account can use it.

## Context hygiene

- Check the project, [../reuse-radar.md](../reuse-radar.md), and prior decisions before searching again.
- Read bounded ranges; do not reload an unchanged large file.
- Summarize a source once and cite it; do not paste it repeatedly.
- Reuse a validated artifact instead of regenerating it.
- Batch independent reads and searches.
- Keep tool output on disk and retrieve only the decisive lines.
- Do not send full conversation history to a helper; send the objective, state, constraints, and acceptance checks.
- Do not run two agents on the same research question unless the second is an independent verifier with a defined check.

## Budget guard

Before a task that can incur cost, record:

- budget owner;
- cap in tokens, time, or currency;
- unit and price source;
- stop threshold, default 80% of the cap;
- what happens at the threshold: stop, downgrade, or ask;
- whether the cap covers retries.

No cap, no metered run. A cap is not permission to spend it all.

## Measurement

Use actual data:

- provider usage dashboard or invoice;
- API usage logs with timestamps and units;
- client usage export;
- local tokenizer count for a specific request;
- wall-clock and compute cost for local runs.

A token count is not a currency amount. Convert only with a price source and a date.

## GPT/Codex quota and API records

Record quota and currency separately:

- For ChatGPT or Codex, use the client's usage or export if one exists. Record the plan, period, unit, and source. If no export exists, write "quota usage not measured".
- For API calls, record the provider, model, input and output units, cached units if billed differently, unit price, currency, and price date.
- Do not infer quota from message count, conversation length, or a token estimate.
- Do not call a quota unit a currency amount. Convert only with a published price and a date.
- Keep the raw usage export or a hash of it; do not paste account identifiers.

Savings formula:

    measured saving = baseline cost - actual cost

Only use it when both sides cover the same scope, period, and quality. Otherwise label it:

    estimated saving (not verified)

Never write "saved 80%" without the baseline, the actual, the period, and the evidence.

## Cost ledger

Use [../templates/cost-ledger.md](../templates/cost-ledger.md). Minimum columns:

- date and task ID;
- provider or model;
- unit and quantity;
- unit price and currency;
- actual or estimated;
- amount;
- baseline and comparison;
- approval;
- evidence link.

Record subscription costs separately from metered usage. Do not double-count a plan and its included usage.

## Multi-agent cost

- One researcher per question; other agents consume the handoff.
- One writer per shared file.
- A verifier checks a bounded artifact, not the whole history.
- Stop an agent when its output no longer changes the decision.
- Do not spawn agents to "look thorough".

## Free-first checklist

Before paying:

- Is the capability already in the current tool?
- Is there a local model that passes the acceptance test?
- Is there an open-source option with a compatible license?
- Is there an existing subscription that covers it?
- Can the task be reduced so the free option is enough?
- Is the paid option's advantage measurable, not assumed?

## Reporting

Report cost as:

    Actual: <amount/unit> | Estimated: <amount/unit> | Cap: <amount/unit>
    Baseline: <scope and amount> | Evidence: <link>
    Gap: <unknowns>

If there is no measured cost, say "not measured". Do not invent a percentage to make the protocol look efficient.
