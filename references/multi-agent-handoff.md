# Multi-agent handoff

> **Active 3.3.0 guidance.** Use a handoff only when work is genuinely split. A single agent should not create a multi-agent ceremony.

## When to split

Split when at least one is true:

- independent research questions can run in parallel;
- a specialist tool or environment is required;
- an independent verifier is needed for a high-risk claim;
- a large task has a clean interface between parts.

Do not split when:

- the task is small or reversible;
- the agents would share the same context and the same search;
- one agent would wait for another's output without doing independent work;
- the coordination cost exceeds the work.

Default to one helper, at most two, unless the user explicitly authorizes more.

## Roles

| Role | Responsibility | Must not |
| --- | --- | --- |
| Owner / integrator | scope, decision, final artifact, acceptance | delegate accountability |
| Researcher | search, source verification, decision memo | install or change external state |
| Builder | implement in an isolated scope | edit shared state without the owner |
| Verifier | independent check against acceptance criteria | rewrite the artifact to make it pass |

One agent may hold more than one role in a small task. High-risk work should separate builder and verifier.

## Required handoff fields

Every handoff uses these ten fields:

1. **任务编号** — stable ID, e.g. NRP-ORIENT-20261103-01.
2. **目标** — one outcome, not a topic.
3. **现有成果** — what already exists, with paths or links.
4. **证据** — commands, outputs, sources, versions, dates, hashes.
5. **方案** — the proposed decision and why; alternatives only if still open.
6. **负责人** — one accountable owner.
7. **当前状态** — one of the seven shared statuses.
8. **阻塞问题** — named dependency, or "none".
9. **验收标准** — observable pass/fail, including level.
10. **下一步** — the single next action.

The requirement names ten fields. Keep all ten; do not drop the owner, status, or next step to make the handoff shorter.

Use [../templates/task-handoff.md](../templates/task-handoff.md).

## Shared statuses

| Status | Definition | Exit |
| --- | --- | --- |
| 待领取 | defined, unclaimed | 研究中 or 待执行 |
| 研究中 | search or analysis active | 待执行 or 阻塞 |
| 待执行 | decision made, no execution yet | 执行中 |
| 执行中 | a named owner is changing state | 待验收 or 阻塞 |
| 待验收 | artifact ready, acceptance pending | 已完成 or 执行中 |
| 已完成 | acceptance passed, evidence attached | none |
| 阻塞 | cannot progress without a named dependency | 待领取, 研究中, or 待执行 |

Rules:

- Only the owner changes the status.
- A status change includes evidence or a reason.
- "Done" without acceptance evidence is not 已完成.
- A blocked task names the blocker and the person or system that can unblock it.
- Do not use "研究中" as a permanent parking state.

## Handoff rules

- Send the objective, relevant state, constraints, and acceptance checks. Do not copy the full conversation.
- Include paths, versions, commands, and outputs; do not say "see above".
- State assumptions and unknowns explicitly.
- Never include credentials, cookies, private keys, or personal data.
- The receiver must be able to act without repeating the research.
- The sender remains accountable for the quality of the handoff.
- If the receiver finds a contradiction, stop and return it; do not silently change the decision.

## Anti-duplication

The same rule applies to ChatGPT, MUSE, Codex, DSH, and any future agent: one task record is the source of truth.

1. Search existing task records and decision records before opening a new task.
2. Claim a question by task ID before research.
3. One researcher per question; a second agent may verify, not re-run the same search.
4. Attach the search record and decision to the handoff.
5. When a decision changes, supersede the old record; do not create a parallel truth.
6. Close or cancel abandoned tasks.

## A2A mapping

A2A 1.0.0 has Task, Message, Artifact, and transport states. NRP status is a project state, not a replacement for A2A.

- Task ID maps to `Task.id` or metadata.
- Goal and plan map to Messages and a decision Artifact.
- Evidence maps to Artifact parts, links, hashes, and validation records.
- Owner and NRP status go in task or artifact metadata.
- A2A has no native "awaiting acceptance" state; use `TASK_STATE_WORKING` plus metadata, and do not report completion until acceptance.

See [../COMPATIBILITY.md](../COMPATIBILITY.md) for the full table.

## Example

    任务编号: NRP-DEMO-20261103-01
    目标: choose a local OCR path for Chinese receipts; no cloud upload.
    现有成果: current PDF tool has no OCR; sample set of 20 receipts exists.
    证据: license pages checked 2026-11-03; CPU smoke test on 3 samples.
    方案: ADAPT a local model; reject SaaS because data residency fails.
    负责人: owner-agent
    当前状态: 待验收
    阻塞问题: none
    验收标准: L2 on 20 samples; character error reviewed by a human; no network egress.
    下一步: verifier reruns the 20-sample test and signs the report.

This example is illustrative; it is not a claim that a specific OCR product passed.

## Failure modes

| Failure | Symptom | Fix |
| --- | --- | --- |
| Duplicate research | two agents cite the same sources | claim before work; one researcher |
| Stale handoff | receiver repeats questions | include versions, paths, and decisions |
| Competing writes | conflicting edits | one writer; lock or isolate |
| Status drift | "done" with no evidence | status requires acceptance artifact |
| Context bloat | helper receives the full history | send a bounded brief |
| Fake completion | code runs, business flow untested | separate L1–L4 claims |
