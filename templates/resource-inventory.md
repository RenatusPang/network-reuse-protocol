# Resource inventory

> **Active 3.2.0 template.** Keep only resources that affect decisions.

## Scope

Project: <name>
Owner: <role>
Last review: <yyyy-mm-dd>
Next review: <yyyy-mm-dd>

## Inventory

| ID | Category | Name | Version | Location | Owner | License | Cost | Auth ref | Health | Capability tags | Last used | Last verified | Review by | Duplicate of | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| INV-001 | model | <name> | <version> | <local path or URL> | <owner> | <SPDX> | <free/included/metered> | <env:NAME> | active | <tags> | <date> | <date> | <date> | | <limits> |
| INV-002 | skill | <name> | <version> | <path> | <owner> | <license> | free | n/a | active | <tags> | <date> | <date> | <date> | | |
| INV-003 | MCP | <server> | <version> | <endpoint> | <owner> | <license> | <cost> | <secret ref> | candidate | <tags> | never | <date> | <date> | | |

## Duplicate check

- Exact name/version match: <none / ID>
- Capability/synonym match: <none / ID>
- Built-in option: <none / name>
- Free or local option: <none / name>
- Adjacent tool already installed: <none / ID>
- Decision: <install / reuse / adapt / reject>
- Justification: <why a duplicate is or is not justified>

## Install gate

- [ ] Need and acceptance test named.
- [ ] Existing options checked.
- [ ] License and security reviewed.
- [ ] Environment compatibility checked.
- [ ] Cost and budget owner recorded.
- [ ] Data flow and secret handling reviewed.
- [ ] Rollback and removal path defined.
- [ ] Owner and review date set.

## Privacy check

- [ ] No API keys, tokens, cookies, private keys, or session IDs.
- [ ] Account aliases only.
- [ ] Personal data redacted.
- [ ] Internal URLs reviewed before sharing.

## Notes

- Merge duplicates instead of adding rows.
- Mark retired entries; do not silently delete decision history.
- Refresh fast-moving entries every 30 days, medium every 90, slow every 180 or one year.
