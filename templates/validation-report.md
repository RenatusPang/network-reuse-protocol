# Validation report

> **Active 3.2.0 template.** Report each level separately.

## Scope

| Field | Value |
| --- | --- |
| Task ID | <NRP-...> |
| Change | <short description> |
| Environment | <OS, runtime, version, staging or production> |
| Date | <yyyy-mm-dd> |
| Author | <name> |
| Verifier | <name; must differ for high-risk> |
| Approval | <reference for any L3 action> |

## L1 — file and code

| Check | Command or method | Result | Evidence |
| --- | --- | --- | --- |
| Parse and lint | <command> | pass/fail | <output or log> |
| Tests | <command> | pass/fail | <output or log> |
| Links and paths | <method> | pass/fail | <output> |
| Secrets | <method> | pass/fail | <output> |
| Diff scope | <command> | pass/fail | <output> |

## L2 — program and interface

| Check | Method | Result | Evidence |
| --- | --- | --- | --- |
| Startup | <command> | pass/fail | <output> |
| API or interface | <contract test> | pass/fail | <output> |
| Permissions | <denied path> | pass/fail | <output> |
| Error path | <invalid input> | pass/fail | <output> |
| Rollback | <command> | pass/fail | <output> |
| Performance | <measure> | pass/fail | <output> |

## L3 — real business flow

- Status: <passed / not tested / blocked>
- Operator:
- Real input or sample:
- Business action:
- Observed outcome:
- Acceptance by:
- Evidence:
- Why this is L3 and not a simulation:

If L3 was not authorized, write "not tested"; do not substitute a mock.

## L4 — long-term stability

- Status: <not claimable / early evidence / passed>
- Observation window:
- Success or uptime target:
- Incidents:
- Cost drift:
- Regression and maintenance:
- Next review:

## Limitations

- <untested path>
- <environment difference>
- <known failure mode>
- <dependency risk>

## Verdict

- L1: <pass/fail>
- L2: <pass/fail/not tested>
- L3: <pass/fail/not tested/not authorized>
- L4: <pass/fail/not claimable>
- Release decision: <draft / ready for independent review / accepted / rejected>
- Remaining work:

## Integrity

- [ ] Commands and outputs are reproducible.
- [ ] Evidence links or hashes are attached.
- [ ] No secrets or personal data.
- [ ] The verifier did not rewrite the artifact.
- [ ] Claims do not exceed the levels tested.
