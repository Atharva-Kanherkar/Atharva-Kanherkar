<h1 align="center">Hey, I'm Atharva</h1>

<p align="center">
  <b>AI &amp; agents engineer.</b> I build agent systems, LLM dev-tools, and ship products end-to-end.<br/>
  Engineering at <a href="https://rimo.app"><b>Rimo</b></a> (Tokyo AI startup) · GSoC '25 @ Scala Center · LFX @ Open Mainframe Project.<br/>
  Open-source by default.
</p>

<p align="center">
  <code>TypeScript</code> · <code>Go</code> · <code>Scala</code> · <code>Python</code> · LLMs · agents · backends
</p>

<p align="center">
  <a href="https://linkedin.com/in/atharva-kanherkar-4370a3257"><img src="https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white&style=flat-square" alt="LinkedIn"></a>
  <a href="https://x.com/attharrva15"><img src="https://img.shields.io/badge/X-000000?logo=x&logoColor=white&style=flat-square" alt="X"></a>
  <a href="https://medium.com/@atharvakanherkar25"><img src="https://img.shields.io/badge/Medium-000000?logo=medium&logoColor=white&style=flat-square" alt="Medium"></a>
  <a href="mailto:atharva.kanherkar@rimo.app"><img src="https://img.shields.io/badge/Email-D14836?logo=gmail&logoColor=white&style=flat-square" alt="Email"></a>
  <img src="https://komarev.com/ghpvc/?username=Atharva-Kanherkar&style=flat-square&color=8b5cf6&label=profile+views" alt="views">
</p>

<p align="center"><sub>Open to interesting problems in AI / agents / dev-tools — say hi.</sub></p>

---

### About

Final-year CS @ **IIIT Jabalpur**. I spend most of my time on **AI agents and the tooling around them** —
orchestration loops, evals, Claude Code skills, and turning prompts into real products. I ship the whole
thing: backend, frontend, and the deploy. Across GSoC and LFX I've also shipped production full-stack
features into established open-source projects (Scala, mainframe tooling).

### Open source &amp; programs

**Google Summer of Code 2025 · [Scala Center](https://www.gsocorganizations.dev/organization/scala-center/)** — _[workflows4s](https://github.com/business4s/workflows4s)_
Built a production full-stack **Web UI for tracking & debugging workflows**: a Scala.js + **Tyrian** (Elm-style) frontend, a type-safe **Tapir** REST/OpenAPI backend, client-side **Mermaid** execution-graph visualization, and a Dockerized **Fly.io** CI/CD deploy. 8 PRs on the project.
&nbsp;&nbsp;↳ [GSoC project](https://summerofcode.withgoogle.com/archive/2025/projects/BPm3F7G8) · [write-up (Business4s Blog)](https://medium.com/business4s-blog/gsoc-2025-building-a-web-ui-for-workflows4s-with-scala-js-and-tyrian-cf4b482dbf63) · [final report](https://gist.github.com/Atharva-Kanherkar/2c8d15d6219d7800e8ff6c474a2a7358)

**LFX Mentorship 2024 · Open Mainframe Project (Linux Foundation)** — _[Zowe](https://github.com/zowe)_
Worked on the **Zowe App Store UI** and Zowe server stability, dev-environment, and the Installation Wizard ([`zlux-app-server`](https://github.com/zowe/zlux-app-server)). Mentored by Leanid Astakou (Rocket Software).
&nbsp;&nbsp;↳ [Open Mainframe Project write-up](https://openmainframeproject.org/blog/summer-2024-zowe-app-store-ui/)

**Selected open-source contributions:**
[workflows4s](https://github.com/business4s/workflows4s/pulls?q=author%3AAtharva-Kanherkar) (Scala, 8) ·
[Zowe `zlux-app-server`](https://github.com/zowe/zlux-app-server/pulls?q=author%3AAtharva-Kanherkar) ·
[KubeArmor](https://github.com/kubearmor/KubeArmor/pull/1928) (build info → systemd packaging) ·
[doodle](https://github.com/creativescala/doodle/pulls?q=author%3AAtharva-Kanherkar) (gradient fill/stroke on the Canvas backend) ·
[cats-effect](https://github.com/typelevel/cats-effect/pulls?q=author%3AAtharva-Kanherkar) (Typelevel)

### AgentClash — open-source eval platform for AI agents

<p>
  <a href="https://www.agentclash.dev"><b>agentclash.dev</b></a> ·
  <a href="https://www.agentclash.dev/docs">docs</a> ·
  <a href="https://www.npmjs.com/package/agentclash"><code>npm i -g agentclash</code></a> ·
  <a href="https://github.com/agentclash/agentclash">github</a> · 20 stars
</p>

Race agents against the **same** workload, capture exactly what they did, score the outcome, and turn
failures into repeatable **regression gates**. Built for teams shipping agents, not leaderboard demos —
it evaluates the whole run: final answer, tool choices, artifacts, latency, cost, and the evidence trail
that explains *why* one agent passed and another failed.

- **Challenge packs** — package real tasks, inputs, validators, and scoring rules.
- **Scorecards & replays** — correctness, reliability, latency, cost + the step-by-step trajectory.
- **Release gates & CI** — compare a candidate against a saved baseline; gate PRs; promote escaped failures into regression suites.
- **Try CLI** — interactive in-browser terminal demos of real agent CLIs on disposable [E2B](https://e2b.dev) sandboxes.

### Featured projects

| Project | What it is | Stack | Links |
| --- | --- | --- | --- |
| **learnframe** | YouTube-first learning toolkit — CLI + SDK that turns public videos into local courses with transcripts, study artifacts, and timestamp-cited Q&A. Open-source, local-first, no vendor lock-in. | TS · yt-dlp · OpenAI | [repo](https://github.com/Atharva-Kanherkar/learnframe) · [`npm i -g learnframe`](https://www.npmjs.com/package/learnframe) |
| **chalkboard** | Open-source engine that turns a prompt into a narrated whiteboard explainer video — real images, diagrams, subtitles, music, vision self-correction. MIT, self-hostable, $0 with local models. | TS · Playwright · ffmpeg · LLMs | [repo](https://github.com/Atharva-Kanherkar/chalkboard) · [demo](https://github.com/Atharva-Kanherkar/chalkboard/releases/tag/v0.1.0) |
| **agentic-memory** | Cognitive memory for AI agents — separate semantic / episodic / procedural stores, multimodal embeddings (Gemini), grounded in DeepMind's AGI cognitive framework. | Python · Gemini · embeddings | [repo](https://github.com/agentclash/agentic-memory) · [live](https://memory.agentclash.dev) |
| **datasmith** | Provider-agnostic SDK + CLI for building targeted synthetic training/eval datasets — a web-grounded seed constructor feeding a weak-vs-strong generation loop (Meta FAIR Autodata), with OpenTelemetry trace ingestion. | Python · LLMs · OTel | [repo](https://github.com/Atharva-Kanherkar/datasmith) |
| **AnimeVocab** | Learn Japanese from the anime you watch — romaji-first Chrome extension, spaced repetition, Listening Mode for Netflix/Crunchyroll, plus Manga Studio and a cloud app. Free, open source, local-first. | TS · Chrome MV3 · Next.js · Cloudflare | [repo](https://github.com/Atharva-Kanherkar/anime-vocab-coach) · [live](https://animevocab.com) |
| **agent-trace** | Full observability into a Claude Code run — trace every step an agent takes. | TypeScript | [repo](https://github.com/Atharva-Kanherkar/agent-trace) |
| **e2b-go** | Unofficial Go SDK for [E2B](https://e2b.dev) sandboxes. | Go | [repo](https://github.com/Atharva-Kanherkar/e2b-go) |

### Claude Code skills (open source)

Agent skills I built and use daily — drop the repo into `~/.claude/skills/`.

- **[review-checkpoint](https://github.com/Atharva-Kanherkar/review-checkpoint)** — enforces a structured, self-reviewing implementation workflow (write expectations → implement → review → ship).
- **[grill-my-plan](https://github.com/Atharva-Kanherkar/grill-my-plan)** — stress-tests a technical plan against your codebase + outside engineering evidence.
- **[repo-standup](https://github.com/Atharva-Kanherkar/repo-standup-skill)** — generates a standup from git history, branches, and TODOs.
- **deep-research · founder-outreach · x-article-publisher** — research fan-out, personalized outreach drafting, and Markdown → X Articles publishing.

### Writing

- [Handling LLM-generated code & vibe coding in 2025](https://medium.com/@atharvakanherkar25/handling-llm-generated-code-and-vibe-coding-in-2025-d6461a7bd122) — _Medium_
- [Building a Web UI for Workflows4s with Scala.js and Tyrian](https://medium.com/business4s-blog/gsoc-2025-building-a-web-ui-for-workflows4s-with-scala-js-and-tyrian-cf4b482dbf63) — _Business4s Blog (GSoC)_
- I also post build logs and AI/agents takes on [X @attharrva15](https://x.com/attharrva15).

### Experience

**Rimo** — Software Engineer · _Tokyo (AI startup)_
Building [Rimo Voice](https://rimo.app) — AI that transcribes and summarizes business meetings. ~80 merged PRs across the backend (Go), the frontend (TypeScript/React), and the LLM gateway — shipping whole features end-to-end, not just tickets:

- **Meeting Groups** — designed and shipped the subsystem end-to-end: group CRUD + access-control APIs, per-group document templates, calendar events, and auto-applied note settings/titles — plus the participant-management and notes UI.
- **Outgoing webhooks** — built the outgoing-webhook platform from scratch: settings model, feature flag, `action.completed` events, a URL-validation test endpoint, and fire-and-forget dispatch — backend and settings UI.
- **LLM prompt caching & cost tracking** — multi-message prompt caching across Claude/Gemini in the LLM gateway, per-query AI-cost accounting via an SSE tee, and sequential-then-parallel template dispatch with cache warming to cut latency.
- **Transcription quality** — participant dictionary / pronunciation support so names transcribe correctly across the ElevenLabs and Soniox engines.
- **Knowledge & desktop auth** — folder upload + folder-tree grouping for linked knowledge, and a custom-token flow powering browser-based desktop-app sign-in.

### Education

**IIIT Jabalpur (IIITDM-J)** — B.Tech, Computer Science.
