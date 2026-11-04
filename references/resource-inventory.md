# Resource inventory and duplicate-install prevention

> **Active 3.3.0 guidance.** Inventory the resources that affect decisions. Do not build a catalog of everything.

## Purpose

Before installing or enabling a tool, answer:

1. Do we already have this capability?
2. Is there a built-in, free, local, or already-licensed option?
3. If we add this, what will it replace, duplicate, or complicate?
4. Who owns it, what does it cost, and when will we review it?

The inventory is a decision aid, not an asset register for its own sake.

## Scope

Track these categories when they affect work:

- models, including local and hosted variants;
- skills and prompt packs;
- plugins and extensions;
- MCP servers and tools;
- open-source projects and libraries;
- APIs and SaaS tools;
- runtimes, sandboxes, and execution environments.

You do not need to track a one-off command or a library that is already locked by the project.

## Minimum fields

| Field | Meaning |
| --- | --- |
| ID | stable key, e.g. INV-MODEL-001 |
| Category | model, skill, plugin, MCP, project, API, tool, runtime |
| Name | human name |
| Version | version, tag, commit, or "unknown" |
| Location | path, URL, endpoint, or account alias; never a secret |
| Owner | person or role accountable |
| License | SPDX identifier or "unknown" |
| Cost | free, included, metered, paid, or unknown |
| Auth | auth method or credential reference; never the credential |
| Health | active, degraded, stale, retired, candidate |
| Capability tags | short problem-oriented tags |
| Last used | date or "never" |
| Last verified | date of the last real check |
| Review by | next review date |
| Duplicate of | existing ID, or empty |
| Notes | limits, known issues, exit route |

See [../templates/resource-inventory.md](../templates/resource-inventory.md).

## Duplicate check before install

Run this sequence in order:

1. **Exact match.** Search name, version, and aliases in the inventory.
2. **Capability match.** Search capability tags and synonyms, not just product names.
3. **Built-in check.** Does the current client, OS, model, or platform already provide it?
4. **Free/local check.** Is there a free, local, already-owned, or already-running option that meets the gate?
5. **Adjacent check.** Is a broader tool already installed that covers this need without a new dependency?
6. **Exception.** If a duplicate is justified, record why: isolation, performance, license, reliability, or a capability gap.

If the answer is "we might need it later", do not install. Record it as a candidate with a review date.

## Install gate

Before install or enable:

- named need and acceptance test;
- existing-option search result;
- license and security check;
- environment compatibility;
- actual cost and budget owner;
- data flow and secret handling;
- rollback and removal path;
- owner and review date.

No gate, no install. Research alone is not authorization.

## Refresh policy

| Class | Examples | Review |
| --- | --- | --- |
| Fast | hosted models, plugins, MCP servers, ad APIs | 30 days |
| Medium | open-source libraries, SDKs, standards | 90 days |
| Slow | local runtimes, OS tools, stable protocols | 180 days or one year |

Also refresh on:

- a version change that affects behavior;
- a security advisory;
- a failed task or incident;
- a price or license change;
- a new standard that replaces the old one;
- a project handoff.

An expired entry is marked `stale`, not silently trusted.

## Privacy

- Never store API keys, tokens, cookies, private keys, or session IDs.
- Use a credential reference such as "env:OPENAI_API_KEY" or a secret-manager path.
- Redact personal data and internal hostnames before sharing an inventory.
- Keep account aliases, not account credentials.
- If an inventory is committed, review it for customer names and internal URLs.

## Maintenance

- Merge duplicates instead of adding a second row.
- Mark retired entries; do not delete the history if a decision depends on it.
- Keep the active list short. Archive retired entries after the review.
- One owner per category or project; no shared free-for-all editing.

## Example duplicate decision

    Need: OCR for Chinese receipts, offline.
    Existing: PDF tool has no OCR; image editor has no batch OCR.
    Candidate: local OCR runtime with a Chinese model.
    Duplicate check: no capability match; no built-in option.
    Gates: license OK; model license OK; 2 GB disk; CPU-only path exists.
    Decision: ADAPT a local model, not a new SaaS subscription.
    Review: 90 days.

This is an example, not a claim that a specific product passed.
