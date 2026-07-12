# The Dev Workflow Harness

A meta-harness that orchestrates the coding-agent subscriptions I already pay for (Claude Code, Codex, …) behind one minimal surface — with GitHub, Slack, translation, secrets, memory, QA, and evals built in as primitives. I stop alt-tabbing, stop repeating myself, stop hand-picking models, and stop overpaying.

---

## 0. Success criteria (non-negotiable)

The project succeeds only if **both** hold:

1. **Costs go down** — measurably cheaper than using the harnesses directly.
2. **Quality goes up** — better performance at benchmarks, achieved by routing through other agents and models.

If it doesn't save costs *and* improve benchmark performance, we do not succeed. Full stop.

## 1. Principles

- **Orchestrate, don't build.** Existing harnesses, their plugins, their skills. We build the router and the glue — never a rebuild of git, Slack, Notion, or plugin systems.
- **Strictly existing subscriptions.** I have two or three subs; squeeze maximum quality out of the least usage of them. No new per-token spend.
- **Minimal, beautiful, aesthetic by default.** All of these features need to exist in the UI *without feeling like bloat* — surfaces appear when summoned, disappear when not.
- **Secrets manage themselves.** Paste into the chat and forget: detected and stored locally, API keys blindfolded from the model.
- **Nothing is "done" until it's evaled.** "Bro, I did it" is banned.
- **The human forgets; the agent must not.**

## 2. The loop I live today (why this exists)

Push → alt-tab to GitHub → repeatedly check whether CI passed → find Yamada-san's (or any senior's) review → translate it if that hasn't been done already → relay it to the agent and tell it to work the comments → squint at bloated, ugly code views → open Chrome to QA → open Slack, close Slack, reopen Slack → re-teach the agent what Yamada-san always tells me → hand-pick a model from a zoo of tiers → watch the model get dumber as the context rots.

The harness's job is to delete this loop.

## 3. The core: the Meta Router

The load-bearing piece. Everything else hangs off it.

- **Auto agent selection** — decides which harness/agent to spawn (Claude Code, Codex, OpenCode, …) for each task. I never choose.
- **Auto model + effort selection** — the model zoo (fable low/high/xhigh/max, ultracode, gpt low/high/ultra/xhigh, …) is the router's problem, not mine. It picks by itself, saves cost — that's required — **and it learns**, routing better over time.
- **Recursive agent management** — router → agent → agent → agent, variable depth and composition: Claude Code can call OpenCode can call Codex. Delegation is a graph, not a single hop.
- **Context-health monitoring** — figures out that a harness/model is *getting dumber* mid-session and triggers context compaction at exactly that point, to avoid the dumbness.
- **Context portability** — one harness's context is saved and reused in another's. Don't waste the important things; don't keep the useless things.

## 4. Built-in primitives

### 4.1 GitHub (a primitive, not a rebuild)

GitHub sits inside the harness and appears whenever I want it — no more switching browsers and IDEs.

- **CI status, in-harness** — no more repeatedly checking inside GitHub whether CI passed; the status is just there.
- **Review pipeline** — a senior (Yamada-san or anyone) leaves a review → it's auto-translated if needed → the agent picks it up and works the review comments, without me having to relay it.
- **Reinvented human code review** — the part that must stay human, made humane:
  - Triage splits a PR: trivial changes (a div resized, something centered) are marked as not needing a developer's eyes; the changes that *have to* be checked by a developer are surfaced. I can still see everything.
  - It learns from my feedback which kinds of changes must be shown to me.
  - A new, reinvented review UI — not old git-based diffs (reading those on GitHub is torture): agentic code review, with humans actually seeing the code and *what it is doing*.
- **Readable code, everywhere** — today's tools are bloated and ugly; reading code in the harness must be clean and pleasant.

### 4.2 Slack + translation (built into the harness)

- **Meta-Slack inside the workflow** — relevant conversations surface *without me asking*, so I never open-and-reopen Slack again.
- **Auto-translation by default** — Slack's translation is per-user, so today I paste messages around just to know what they mean. Instead: hover over any message and see the translation, inbuilt in the harness. The same translation layer feeds the GitHub review pipeline above.

### 4.3 Secrets: env vars & API keys, zero ceremony

- **Paste it in the chat. That's it.** A **local-only classifier** detects "that's an env var", automatically saves it somewhere, and hands it to the agent. Built for lazy people who just paste it into the chat.
- **The agent must NOT refuse** a pasted secret.
- **API key management with guardrails** — gcloud-auth-style: it just opens the browser, I log in easily, and it uses the key. No copy-pasting keys into some bash file to hide them from the model — I paste in the chat, it manages the key itself, and the model still never gets to know the value: a blindfold.

### 4.4 In-harness browser & QA

- No opening the browser again and again to check and QA — I see it **then and there**, embedded in the harness.
- Chrome-DevTools-grade tooling included: network inspection, tokens, console.

### 4.5 Memory that never forgets (a big problem)

- Yamada-san always tells me to do this or that — and I forget, because I'm human. **The agent should not.**
- **Not a markdown file** that the agent always forgets to invoke as memory. Something else, with a better UI — a first-class memory store that is visible, editable, and *always enforced* when relevant.
- Standing instructions and corrections are captured so that **the same mistake never happens twice**.

### 4.6 Evals as a primitive

- Whenever I'm building an AI app, calling a model API, or integrating with these platforms, the harness never just says "bro, I did it" — it evals the result thoroughly and *then* lets me know, with the eval attached.

### 4.7 Sandboxing & execution

- Sandboxed execution everywhere: cloud agents, local Docker, isolated environments for anything agents run.

## 5. The workbench (UI)

- **Plan limits, always visible** — a persistent meter at the top showing each subscription's limits (Claude Code, Codex, …): how fast they're burning and when they run out. Shown constantly, not on request.
- **Write code right here** — when I want to program (or learn programming), I just write code in the harness itself. No opening a VS Code window and its Copilot as a detour.
- **Planning, notes & system design** — draw system architecture with AI, write notes from team feedback, and review everything that's going on by design — inside the harness. Today the plans go to GitHub issues or I have no idea where they go; meanwhile Notion is becoming a coding-agent thing while coding agents can't call Notion. Chaos — where plans should live is an open question (§8).

## 6. Ecosystem: skills & plugins

- **Skills, continuously suggested** — the harness keeps proposing skills to add, and scrapes skills that suit my workflow from the internet.
- **Plugins, reused not reinvented** — Codex and Claude Code both have plugins. I don't want to invent new ones; we just use theirs. We orchestrate; we do not build.

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
- Writing (and learning) code in the harness itself (§5)

**P1 — the loop killers**
- CI status in-harness + review → agent pipeline (§4.1)
- GitHub as an in-harness primitive (§4.1)
- Meta-Slack inside the workflow (§4.2)
- Embedded browser QA with DevTools/network/tokens (§4.4)
- Recursive agent management (§3)
- Cross-harness context save & reuse (§3)
- API key management via browser login (§4.3)
- Skills suggestions + scraping, plugin orchestration (§6)
- Sandboxing: cloud agents, local Docker (§4.7)

**P2 — later, but wanted**
- Planning / notes / architecture design integration (§5)

**Parked (noted so it is not forgotten)**
- Team management — to be discussed later.

## 8. Open questions

- Which exact subscriptions are in the routing pool, and what are their real quota shapes? Should the router also see the limits data and route around exhaustion, or is the meter for me only?
- What signal does the router learn from (evals, my accept/reject feedback, task outcomes) and where does that data live?
- How is "the model is getting dumber" detected — heuristics, canary probes, or eval drift?
- Which benchmarks are the official yardstick for §0, and should the evals primitive also continuously measure the harness itself against them?
- Env vars are auto-saved and handed to the agent — should they get the same full blindfold as API keys?
- Where should plans, notes, and architecture drawings live — GitHub issues, Notion, or in-harness?
