# Cost ledger

> **Active 3.2.0 template.** Record actual and estimated cost separately.

## Budget

| Field | Value |
| --- | --- |
| Task ID | <NRP-...> |
| Budget owner | <role> |
| Cap | <amount and unit> |
| Stop threshold | <default 80%> |
| At threshold | <stop / downgrade / ask> |
| Period | <start–end> |
| Currency | <CNY / USD / other> |

## Ledger

| Date | Task | Provider or model | Unit | Quantity | Unit price | Currency | Amount | Actual or estimated | Baseline | Measured saving | Approval | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| <date> | <task> | <model/API> | tokens | <n> | <price> | <cur> | <amount> | actual | <baseline scope> | <amount or blank> | <owner> | <link> |
| <date> | <task> | <local model> | GPU-hours | <n> | <price> | <cur> | <amount> | estimated | <baseline> | | <owner> | <link> |

## Summary

- Actual total: <amount/unit>
- Estimated total: <amount/unit>
- Cap used: <percent and unit>
- Measured saving: <amount, scope, period, evidence>
- Estimated saving: <amount, labeled estimate>
- Unknowns: <missing invoices, untracked usage>

## Rules

- A token count is not a currency amount.
- Convert only with a price source and date.
- Measured saving = baseline cost - actual cost, same scope and period.
- Do not claim a percentage without the baseline and evidence.
- Do not double-count a subscription and its included usage.
- Record the price source; prices change.
- Keep secrets out of the ledger.
