# Knowledge retention

> **Active 3.3.0 guidance.** Save what will be reused. Do not turn the repository into a transcript dump.

## Runtime layout

An adopting project may use:

    .nrp/
      reuse-radar.md
      decisions/
      references/
      records/
      archive/

The protocol does not create this tree automatically. Use another location if the project already has one; the names are conventions.

## What to save

Save a result only when at least two are true:

- it took real work to discover;
- it is likely to be reused;
- it changes a future decision;
- it has durable evidence;
- it is expensive to rediscover;
- it has a clear owner and review date.

Do not save:

- raw chat transcripts;
- transient logs;
- vendor marketing;
- unverified rumors;
- secrets or personal data;
- duplicate copies of the same source;
- a decision that is already obvious from the code.

## reuse-radar.md

The radar is a short index of reusable choices. Minimum fields:

- ID;
- capability;
- candidate and version;
- decision: REUSE, COMPOSE, ADAPT, or BUILD; use a separate status for watch;
- scope and constraints;
- source URL;
- evidence level;
- last verified;
- review by;
- confidence;
- owner;
- notes and exit route.

Use [../templates/reuse-radar.md](../templates/reuse-radar.md). The repository's starter radar is [../reuse-radar.md](../reuse-radar.md).

## decisions/

A decision record explains why a choice was made. It is not a copy of the search results. Minimum fields:

- context and constraints;
- options considered;
- decision;
- gates and evidence;
- consequences and tradeoffs;
- rollback or exit;
- review date.

Use [../templates/decision-record.md](../templates/decision-record.md). Name files with a date and a short slug, e.g. `2026-11-03-ocr-path.md`.

## references/

Keep a curated citation list, not full copies:

- canonical URL;
- title, author or organization;
- version or date;
- why it matters;
- the decisive quote or section;
- access date;
- related decision.

Link to the source. Respect copyright and terms. Do not mirror a whole document.

## records/

Task records preserve the handoff, evidence, validation, and outcome. They are useful for audit and for preventing duplicate work. Use [../templates/task-record.md](../templates/task-record.md).

A record can be short:

    Task: NRP-DEMO-001
    Goal: choose an OCR path
    Decision: ADAPT local model
    Evidence: L2 report, 20 samples, license links
    Outcome: accepted for a pilot
    Open: L3 production test not authorized
    Review: 2027-02-01

## Expiry

Every durable entry gets a review date based on volatility:

| Class | Review |
| --- | --- |
| Fast: hosted models, plugins, MCP servers, ad APIs | 30 days |
| Medium: libraries, SDKs, standards | 90 days |
| Slow: stable protocols, legal texts | 180 days or one year |

Review triggers:

- version change;
- security advisory;
- price or license change;
- failed task or incident;
- new standard;
- project handoff.

At review, choose: re-verify, update, supersede, or remove. Do not silently keep a stale entry.

## Deduplication

- Use a stable ID and canonical URL.
- Search by problem and capability before adding.
- Merge duplicates; keep a superseded link if history matters.
- One decision per record.
- Prefer updating an existing entry over appending a second one.

## Pruning

Run a lightweight review quarterly or at a release:

1. List entries past `review_by`.
2. Mark stale entries.
3. Re-verify the ones that still matter.
4. Merge duplicates.
5. Archive retired entries.
6. Delete secrets, personal data, and useless logs.
7. Keep the active radar short.

A knowledge base that is never pruned becomes a second research problem.

## Privacy and sharing

- Redact customer names, account IDs, internal URLs, and personal data.
- Never store credentials.
- Check the license before copying a source.
- Mark internal notes as internal.
- Do not publish a decision record that contains a customer's confidential context.

## Example radar entry

    RAD-001 | portable skill packaging | Agent Skills spec | ADAPT |
    scope: SKILL.md-based agents | version: checked 2026-11-03 |
    source: https://agentskills.io/specification | evidence: E1 |
    last verified: 2026-11-03 | review by: 2027-02-03 |
    confidence: high | owner: protocol-maintainer |
    notes: verify frontmatter rules before promotion.

This is an illustrative format, not a claim about a specific client's behavior.
