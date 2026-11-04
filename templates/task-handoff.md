# Task handoff

> **Active 3.3.0 template.** Copy into a project only when needed.

## Header

| Field | Value |
| --- | --- |
| 任务编号 | NRP-<project>-<yyyymmdd>-<seq> |
| 目标 | <one observable outcome> |
| 负责人 | <one accountable owner> |
| 当前状态 | <待领取 / 研究中 / 待执行 / 执行中 / 待验收 / 已完成 / 阻塞> |
| 风险级别 | <Quick / Standard / High-risk> |
| 验收级别 | <L1 / L2 / L3 / L4> |
| 更新日期 | <yyyy-mm-dd> |

## 现有成果

- <artifact, path, link, or "none">
- <what is already decided>

## 证据

| Claim | Evidence | Source or command | Date |
| --- | --- | --- | --- |
| <claim> | <E0–E4, output, hash, screenshot, test> | <link or command> | <date> |

## 方案

- Decision: <REUSE / COMPOSE / ADAPT / BUILD>
- Why: <the decision-changing reason>
- Alternatives still open: <none, or name the missing fact>
- Rollback or exit: <path>

## 阻塞问题

- <named dependency, owner, and what would unblock it>
- If none: none

## 验收标准

- [ ] L1: <structural check>
- [ ] L2: <runtime or interface check>
- [ ] L3: <real business flow, authorized; or "not tested">
- [ ] L4: <observation plan; or "not claimable">
- [ ] No secrets or personal data in the artifact.
- [ ] Evidence is attached and reproducible.

## 下一步

<one action, one owner, one due date>

## Status transitions

| From | To | Trigger |
| --- | --- | --- |
| 待领取 | 研究中 | researcher claims the question |
| 研究中 | 待执行 | decision is recorded |
| 待执行 | 执行中 | execution owner starts |
| 执行中 | 待验收 | artifact and evidence are ready |
| 待验收 | 已完成 | acceptance passes |
| any | 阻塞 | named blocker prevents progress |
| 阻塞 | 待领取 / 研究中 / 待执行 | blocker is resolved |

Only the owner changes the status. A status change includes evidence or a reason.

## Handoff checklist

- [ ] The receiver can act without repeating the research.
- [ ] Paths, versions, commands, and outputs are present.
- [ ] Assumptions and unknowns are explicit.
- [ ] No credentials or personal data.
- [ ] The next action is singular.
- [ ] The acceptance level is not inflated.
