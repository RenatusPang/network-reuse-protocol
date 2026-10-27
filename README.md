# Network Reuse Protocol · 全网复用模式

A small, opinionated protocol for AI agents (Claude Code, Codex, Cursor, DSH, …) that keeps them from rebuilding what already exists — **without** turning "research" into an endless ceremony.

> One principle: solve the problem with approaches others have already validated.
> Don't rebuild the wheel. Don't run endless searches just to look diligent.

## Why

Agents love to re-derive everything: re-search, re-test, re-report. The result is bloated context, slow delivery and solutions that ignore existing work. This protocol replaces that with three steps and a single decision.

## Install

Drop the folder into your agent's skills directory, e.g.

```text
~/.claude/skills/network-reuse-protocol/SKILL.md
~/.agents/skills/network-reuse-protocol/SKILL.md   # DSH
~/.codex/skills/network-reuse-protocol/SKILL.md    # Codex
```

Or paste `SKILL.md` into your system prompt / project instructions.

## The three steps

1. **Look for existing work first** — your own results, `reuse-radar.md`, the project, then GitHub / official docs. Search by **concept**, not only by package name.
2. **Judge quickly** — version, license, maintenance, security, known failures; **compare adoption cost vs build cost** side by side.
3. **Return one decision: reuse / compose / adapt / build.**

Depth follows risk. Simple tasks get no ceremony; irreversible or money-touching ones get primary evidence, backups and rollback.

## Non-negotiables

Read-only research · no writing to external accounts without explicit approval · no fabrication · no bypassing CAPTCHAs or risk controls · stricter rule wins on conflict.

## What this is not

- Not a research-report generator.
- Not a mandate for multi-AI, bilingual, six-step workflows.
- Not a replacement for your own project rules — it defers to the stricter one.

## Credits

- [github-build-or-reuse](https://github.com/ghspain/github-build-or-reuse) — the USE / CONTRIBUTE / FORK / BUILD decision framing.
- [Anthropic Agent Skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) — progressive disclosure / size budgeting.

## License

MIT
