# The Dev Workflow Harness

A meta-harness that orchestrates the coding-agent subscriptions I already pay for (Claude Code, Codex, …) behind one minimal surface — with GitHub, Slack, translation, secrets, memory, QA, and evals built in as primitives. I stop alt-tabbing, stop repeating myself, stop hand-picking models, and stop overpaying.

---

## 0. Success criteria (non-negotiable)

The project succeeds only if **both** hold, proven by evals — not vibes:

1. **Costs go down** — measurably cheaper than using the harnesses directly.
2. **Quality goes up** — better benchmark performance, achieved by routing across other agents and models.

If it doesn't save costs *and* improve benchmark performance, we do not succeed. Full stop.

## 1. Principles

- **Orchestrate, don't build.** Existing harnesses, their plugins, their skills. We build the router and the glue — never a rebuild of git, Notion, Slack, or plugin systems.
- **Strictly existing subscriptions.** I have two or three subs. The router squeezes maximum quality out of minimum usage of them. No new per-token spend.
- **Minimal, beautiful, aesthetic by default.** Every feature below must exist *without feeling like bloat* — surfaces appear when summoned, disappear when not.
- **The model never sees secrets.** Local-only handling; the agent gets a blindfolded reference, never the raw value.
- **Nothing is "done" until it's evaled.** "Bro, I did it" is banned.
- **The human forgets; the agent must not.**

## 2. The loop I live today (why this exists)

Push → alt-tab to GitHub → refresh CI again and again → find Yamada-san's (or any senior's) review → paste it into a translator if it isn't translated already → paste the translation to the agent and tell it to address the review → squint at bloated, ugly diff/code views → open Chrome to QA → open Slack, close Slack, reopen Slack → re-teach the agent the thing Yamada-san already told me twice → hand-pick a model from a zoo of tiers → watch the context rot until the model gets dumb.

Every arrow in that loop is a feature below. The harness's job is to delete the loop.

## 3. The core: the Meta Router

The load-bearing piece. Everything else hangs off it.

- **Auto agent selection** — decides which harness/agent to spawn (Claude Code, Codex, OpenCode, …) for each task. I never choose.
- **Auto model + effort selection** — the model zoo (fable low/high/xhigh/max, ultracode, gpt low/high/ultra/xhigh, …) is the router's problem, not mine. It picks the cheapest tier that clears the quality bar, **and it learns** from outcomes to route better over time.
- **Budget-aware by design** — optimizes quality-per-dollar strictly within my existing subs; knows each plan's remaining quota and routes around exhaustion.
- **Recursive agent management** — router → agent → agent → agent, variable depth and composition: Claude Code can call OpenCode can call Codex. Delegation is a graph, not a single hop.
- **Context-health monitoring** — detects that a harness/model is *getting dumber* mid-session and triggers context compaction at exactly that point, before quality degrades further.
- **Context portability** — one harness's context is saved and reused in another's. Keep the important things, drop the useless things; never rebuild understanding from scratch.

## 4. Built-in primitives

### 4.1 GitHub (a primitive, not a rebuild)

GitHub sits inside the harness and appears whenever I want it — no browser, no IDE switching.

- **CI watcher** — no more repeatedly checking whether CI passed; status streams in, failures are auto-triaged into agent tasks.
- **Review pipeline** — a senior (Yamada-san or anyone) leaves a review → it's auto-translated if needed → it becomes an agent task without me relaying it. I approve; the agent works the review comments.
- **Reinvented human code review** — the part that must stay human, made humane:
  - Agentic pre-triage splits a PR: trivial changes (a div resized, something centered) are auto-cleared; semantic/risky changes are flagged **needs a developer's eyes**.
  - It learns from my feedback which kinds of changes must be shown to me.
  - A new review UI — not old git-based diffs (reading those on GitHub is torture) — agentic review, with humans actually seeing the code and *what it is doing*.
- **Readable code, everywhere** — today's tools are bloated and ugly; reading code in the harness must be clean and pleasant.

### 4.2 Slack + translation (built into the harness)

- **Meta-Slack inside the workflow** — relevant conversations surface *without me asking*, so I never open-and-reopen Slack again.
- **Auto-translation by default** — Slack's translation is per-user, so today I paste messages around just to know what they mean. Instead: hover over any message and see the translation, inbuilt in the harness. The same translation layer feeds the GitHub review pipeline above.

### 4.3 Secrets: env vars & API keys, zero ceremony

- **Paste it in the chat. That's it.** A **local-only classifier** detects "that's an env var / API key", intercepts it before the model ever sees it, stores it automatically, and hands the agent a blind reference that still works.
- **The agent must NOT refuse** a pasted secret — refusal is pointless because the model never actually sees the value (a blindfold, not trust).
- **API key management with guardrails** — gcloud-style: it just opens the browser, I log in, done. No copy-pasting keys into some bash file to hide them from the model. Lazy-proof *and* model-blind.

### 4.4 In-harness browser & QA

- No opening the browser again and again to check and QA — I see it **then and there**, embedded in the harness.
- Chrome-DevTools-grade tooling included: network inspection, tokens, console.

### 4.5 Memory that never forgets (a big problem)

- Yamada-san always tells me to do this or that — I forget, because I'm human. **The agent should not.**
- **Not a markdown file** that the agent always forgets to invoke. Something else: a first-class memory store with its own proper UI — visible, editable, and *always enforced* when relevant.
- Standing instructions and corrections are captured automatically, so **the same mistake never happens twice**.
- Memory also feeds the router: preferences and outcomes accumulate into better routing (see §3, "it learns").

### 4.6 Evals as a primitive

- Whenever I'm building an AI app, calling a model API, or integrating with these platforms, the harness never just says "done" — it evals the result thoroughly and *then* reports, with the eval attached.
- The same eval machinery continuously proves the harness itself against its success criteria (§0): benchmark scores and cost per task.

### 4.7 Sandboxing & execution

- Sandboxed execution everywhere: cloud agents, local Docker, isolated environments for anything agents run.

## 5. The workbench (UI)

- **Plan limits, always visible** — a persistent meter at the top showing each subscription's limits (Claude Code, Codex, …): how fast they're burning and when they run out. Constantly, not on request.
- **Beautiful, aesthetic, minimalistic** — all of these features present, none of them felt as bloat. The default view is calm; everything is one summon away.
- **Write code right here** — when I want to program (or learn programming), I should just write code in the harness itself. No opening a VS Code window and its Copilot as a detour.
- **Planning, notes & system design** — draw system architecture with AI, take notes from team feedback, and review what's going on by design — inside the harness. Plans land somewhere real (GitHub issues, Notion) instead of vanishing. Today it's chaos: Notion is becoming a coding-agent thing while coding agents can't call Notion. We unify it.

## 6. Ecosystem: skills & plugins

- **Skills, continuously suggested** — the harness watches my workflow, keeps proposing skills that fit it, and scrapes suitable skills from the internet.
- **Plugins, reused not reinvented** — Codex and Claude Code both have plugin ecosystems. We use theirs. We orchestrate; we do not build.

## 7. Priorities

**P0 — foundation + what I'm screaming about**
- Meta Router: auto agent/model selection that saves cost and learns (§3)
- Memory that never forgets, with a real UI (§4.5)
- Context management: dumbness detection → compaction (§3)
- Env var / secret flow: paste-in-chat, local-only, no refusals (§4.3)
- Auto-translation: Slack hover + review pipeline (§4.2)
- Plan-limits meter, always on top (§5)
- Reinvented human code review UI (§4.1)
- Evals as a primitive (§4.6)

**P1 — the loop killers**
- CI watcher + review → agent-task pipeline (§4.1)
- GitHub as an in-harness primitive (§4.1)
- Meta-Slack inside the workflow (§4.2)
- Embedded browser QA with DevTools/network/tokens (§4.4)
- Recursive agent management (§3)
- Cross-harness context save & reuse (§3)
- API key management via browser login (§4.3)
- Skills suggestions + scraping, plugin orchestration (§6)
- Sandboxing: cloud agents, local Docker (§4.7)

**P2 — later, but wanted**
- Writing/learning code fully in-harness (§5)
- Planning / notes / architecture design integration (§5)

**Parked (noted so it is not forgotten)**
- Team management — to be discussed later.

## 8. Open questions

- Which exact subscriptions are in the routing pool, and what are their real quota shapes?
- What signal does the router learn from (evals, my accept/reject feedback, task outcomes) and where does that data live?
- How is "the model is getting dumber" detected — heuristics, canary probes, or eval drift?
- Which benchmark suite is the official yardstick for §0?
