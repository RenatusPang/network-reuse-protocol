# Validation and acceptance

> **DRAFT / NOT ACTIVE.** A passing script is not a successful business outcome.

## Four levels

| Level | Question | Evidence | What it does not prove |
| --- | --- | --- | --- |
| L1 | Are the files and code correct? | parse, lint, tests, links, schema, secret scan | that anything runs |
| L2 | Do the program and interface work? | startup, API contract, integration, error path, rollback | that the business flow succeeds |
| L3 | Did the real business flow succeed? | named operator, real inputs, observed outcome, acceptance | long-term stability |
| L4 | Is it stable over time? | observation window, SLOs, incidents, cost drift, regressions | a different environment |

Never collapse the levels. "Tests pass" is L1. "The service starts" is L2. "A customer completed the task" is L3. "It stayed healthy for a quarter" is L4.

## L1 — file and code correctness

- Markdown and YAML parse; frontmatter has required fields.
- Links and relative paths resolve.
- Code compiles or parses; unit tests pass.
- Schema and template fields are present.
- No secrets, credentials, private keys, or personal data.
- No trailing whitespace or broken code fences.
- The diff contains only intended files.
- The active release is unchanged.

Record the command, exit code, and a short output. Keep full logs on disk if they are large.

## L2 — program and interface

- The program starts from a clean environment.
- The public interface matches the documented contract.
- Authentication and permission failures are handled.
- Integration with the target service works in a test scope.
- Error paths and timeouts behave.
- A rollback or disable path works.
- Performance is acceptable for the intended load.
- Logs do not leak secrets.

L2 can use a staging or local environment. Say which one.

## L3 — real business flow

L3 requires an authorized real flow:

- a named operator and date;
- real or representative inputs, with privacy handled;
- the actual business action, not a simulation;
- an observed result: order, publication, payment, delivery, customer response, or equivalent;
- acceptance by the business owner;
- evidence that the result is attributable to the change.

A dry run, a mock, a screenshot of a form, or a successful API call is not L3. If production operations are prohibited, stop at L2 and state that L3 was not tested.

## L4 — long-term stability

L4 needs an observation window and a baseline:

- uptime or success rate against a target;
- incident count and severity;
- latency and error trends;
- cost drift;
- regression and maintenance load;
- security advisories and upgrades;
- owner and review date.

A launch cannot claim L4. A one-week pilot is early L4 evidence at best.

## Independent verification

- The verifier did not write the change.
- The verifier receives the acceptance criteria before checking.
- The verifier can inspect the artifact, commands, and outputs.
- The verifier does not rewrite the artifact to make it pass.
- A failed check is reported with the exact failing condition.
- High-risk work needs an independent verifier; low-risk work may self-check.

Independence is about evidence, not ceremony. A second agent that repeats the same unverified claim is not independent.

## Test design

For each change, choose the relevant cases:

- happy path;
- boundary and empty input;
- invalid input and error path;
- permission denied;
- rollback or disable;
- regression of the previous behavior;
- security and secret handling;
- cost cap;
- concurrency or one-writer behavior when agents are involved.

Do not run an unbounded matrix. Stop when the acceptance criteria are covered and no new failure mode is plausible.

## Acceptance report

Use [../templates/validation-report.md](../templates/validation-report.md). Minimum fields:

- task ID and scope;
- environment and version;
- claims by level;
- commands and results;
- evidence links or hashes;
- limitations and untested paths;
- verifier and date;
- approval for any L3 action.

## Reporting rules

- Say "L1 passed" rather than "it works".
- Say "L2 passed in staging" rather than "production ready".
- Say "L3 not tested" when production was prohibited.
- Say "L4 not claimable" before an observation window.
- Report the exact failing command and output; do not summarize a failure as "minor".
- Separate a regression from a pre-existing issue.
- Do not call a draft "released" because its tests pass.

## This draft's evidence

The 3.2.0 draft is expected to claim:

- L1: structural, link, frontmatter, template, scenario, and diff checks.
- L2: the test script runs from a clean Node process; it has no executable package dependency. Loading the protocol still consumes context and may consume plan or API usage.
- L3: not tested; the three scenarios are read-only designs.
- L4: not claimable; no observation window.

Any stronger claim needs a new record.
