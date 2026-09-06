(() => {
  const STORE = "tokyoOct1";
  const DEFAULT_DATE = "2026-10-01";
  const PAGES = [
    ["index.html", "Command"],
    ["sprint.html", "Sprint"],
    ["money.html", "Money"],
    ["digital.html", "Digital"],
    ["pack.html", "Pack"],
    ["japan.html", "Japan OS"],
    ["people.html", "People"],
    ["life.html", "Month one"],
    ["phrases.html", "Phrases"],
    ["intel.html", "Intel"],
  ];

  const data = window.TOKYO_DATA;
  const allTasks = data.phases.flatMap((p) => p.tasks.map((t) => ({ phase: p.title, phaseId: p.id, t })));
  const uniqueIds = [...new Set(allTasks.map((x) => x.t[0]))];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORE) || "{}");
    } catch {
      return {};
    }
  }
  function save(state) {
    localStorage.setItem(STORE, JSON.stringify(state));
  }
  function state() {
    const s = load();
    if (!s.done) s.done = {};
    if (!s.moveDate) s.moveDate = DEFAULT_DATE;
    return s;
  }
  function isDone(id) {
    return state().done[id] === true;
  }
  function setDone(id, v) {
    const s = state();
    s.done[id] = v;
    save(s);
  }

  function daysUntil(dateStr) {
    const target = new Date(dateStr + "T12:00:00+09:00");
    const now = new Date();
    return Math.max(0, Math.ceil((target - now) / 86400000));
  }

  function focusCopy(days) {
    if (days > 17) return "Start with systems that are annoying to fix abroad: bank and SIM access, 2FA, backups, medicine legality, power labels.";
    if (days > 11) return "Buy only high-leverage things. Compact wardrobe, charging kit, rain layer. Leave bulky Japan-easy purchases.";
    if (days > 6) return "Install Japan mode: Safety tips, Suica path, phrases, katakana name, meal defaults, emergency numbers.";
    if (days > 2) return "Finish India properly. People, family, keys, subscriptions. Protect these days from random errands.";
    return "Final pass only: landing kit, backups, food/medicine sweep, sleep. Do not invent new tasks. You land 1 October.";
  }

  function priLabel(pri) {
    return pri === "p0" ? "must" : pri === "p1" ? "strong" : "nice";
  }

  function taskHTML(task, opts = {}) {
    const [id, title, cat, pri, due, detail] = task.t;
    const done = isDone(id);
    return `<article class="task${done ? " done" : ""}" data-id="${id}" data-cat="${cat}" data-pri="${pri}" data-text="${(title + " " + detail).toLowerCase()}">
      <input class="check" type="checkbox" data-check="${id}" ${done ? "checked" : ""} aria-label="Complete ${title}">
      <div>
        <h3 class="taskTitle">${title}</h3>
        <p class="taskDetail">${detail}</p>
        <div class="meta">
          <span class="tag ${pri}">${priLabel(pri)}</span>
          <span class="tag">${cat}</span>
          ${opts.showPhase ? `<span class="tag">${task.phaseId}</span>` : ""}
        </div>
      </div>
      <div class="due">${due}</div>
    </article>`;
  }

  function bindChecks(root = document) {
    $$(".check", root).forEach((cb) => {
      cb.addEventListener("change", (e) => {
        const id = e.target.dataset.check;
        setDone(id, e.target.checked);
        $$(`[data-check="${id}"]`).forEach((x) => (x.checked = e.target.checked));
        $$(`.task[data-id="${id}"]`).forEach((el) => el.classList.toggle("done", e.target.checked));
        updateProgress();
        window.dispatchEvent(new CustomEvent("tokyo:change"));
      });
    });
  }

  function progress() {
    const done = uniqueIds.filter(isDone).length;
    return { done, total: uniqueIds.length, pct: Math.round((done / uniqueIds.length) * 100) };
  }

  function updateProgress() {
    const p = progress();
    $$("[data-pct]").forEach((el) => (el.textContent = p.pct + "%"));
    $$("[data-bar]").forEach((el) => (el.style.width = p.pct + "%"));
    $$("[data-done]").forEach((el) => (el.textContent = p.done + " done"));
    $$("[data-left]").forEach((el) => (el.textContent = p.total - p.done + " left"));
    $$("[data-frac]").forEach((el) => (el.textContent = `${p.done} / ${p.total}`));
    const circle = $("#ensoFill");
    if (circle) {
      const c = 2 * Math.PI * 42;
      circle.style.strokeDashoffset = String(c - (p.pct / 100) * c);
    }
  }

  function currentPage() {
    const file = location.pathname.split("/").pop() || "index.html";
    return file === "" ? "index.html" : file;
  }

  function mountChrome() {
    const here = currentPage();
    const links = PAGES.map(
      ([href, label]) =>
        `<a class="navLink${href === here ? " active" : ""}" href="${href}">${label}</a>`
    ).join("");

    const header = document.createElement("div");
    header.innerHTML = `
      <div class="topbar">
        <a class="brand" href="index.html">
          <span class="brandMark">東</span>
          <span>
            <b>Atharva → Tokyo</b>
            <small>Personal prep · lands 1 Oct 2026</small>
          </span>
        </a>
        <div class="topMeta">
          <div class="chip clock" id="clocks"></div>
          <div class="chip weather" id="wx">Tokyo weather…</div>
        </div>
      </div>
      <nav class="nav">${links}</nav>
    `;
    document.body.prepend(header);

    const foot = document.createElement("footer");
    foot.className = "siteFoot";
    foot.innerHTML = `<div class="wrap">
      Mockup only. State stays in this browser via localStorage. No account, no analytics.
      Excluded on purpose: visa, passport admin, flight, company housing, airport taxi, company cash.
      Official numbers cited on <a href="intel.html">Intel</a>.
    </div>`;
    document.body.append(foot);

    tickClocks();
    setInterval(tickClocks, 1000);
    loadWeather();
  }

  function tickClocks() {
    const el = $("#clocks");
    if (!el) return;
    const opts = { hour: "2-digit", minute: "2-digit", hour12: false };
    const tky = new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Tokyo", ...opts });
    const blr = new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", ...opts });
    el.innerHTML = `<span>Tokyo ${tky}</span><i></i><span>Bengaluru ${blr}</span>`;
  }

  async function loadWeather() {
    const el = $("#wx");
    if (!el) return;
    try {
      const url =
        "https://api.open-meteo.com/v1/forecast?latitude=35.6812&longitude=139.7671&current=temperature_2m,weather_code,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=1";
      const res = await fetch(url);
      const j = await res.json();
      const t = Math.round(j.current.temperature_2m);
      const hi = Math.round(j.daily.temperature_2m_max[0]);
      const lo = Math.round(j.daily.temperature_2m_min[0]);
      const pop = j.daily.precipitation_probability_max[0];
      el.textContent = `Tokyo ${t}° · ${lo}–${hi}° · rain ${pop}%`;
    } catch {
      el.textContent = "Tokyo · Oct normal 18.0°C · wettest month";
    }
  }

  function renderMust(target) {
    const el = $(target);
    if (!el) return;
    const must = allTasks.filter((x) => data.mustIds.includes(x.t[0]));
    const seen = new Set();
    el.innerHTML = must
      .filter((x) => (seen.has(x.t[0]) ? false : seen.add(x.t[0])))
      .map((x) => taskHTML(x, { showPhase: true }))
      .join("");
    bindChecks(el);
  }

  function renderPhases(target) {
    const el = $(target);
    if (!el) return;
    el.innerHTML = data.phases
      .map(
        (p) => `
        <section class="phaseBlock" id="phase-${p.id}">
          <div class="phaseHead">
            <div>
              <div class="phaseKicker">${p.window}</div>
              <h2>${p.title}</h2>
              <p>${p.blurb}</p>
            </div>
          </div>
          <div class="tasks">${p.tasks.map((t) => taskHTML({ phase: p.title, phaseId: p.id, t })).join("")}</div>
        </section>`
      )
      .join("");
    bindChecks(el);
  }

  function renderFiltered(target, pred) {
    const el = $(target);
    if (!el) return;
    el.innerHTML = allTasks.filter(pred).map((x) => taskHTML(x, { showPhase: true })).join("");
    bindChecks(el);
  }

  function bindFilters() {
    const buttons = $$("[data-filter]");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.filter;
        $$(".task").forEach((el) => {
          const show = f === "all" || el.dataset.pri === f || el.dataset.cat === f;
          el.classList.toggle("hidden", !show);
        });
      });
    });
    const search = $("#search");
    if (search) {
      search.addEventListener("input", (e) => {
        const q = e.target.value.trim().toLowerCase();
        $$(".task").forEach((el) => el.classList.toggle("hidden", q && !el.dataset.text.includes(q)));
      });
    }
    const copyBtn = $("#copyBtn");
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const remaining = allTasks
          .filter((x) => !isDone(x.t[0]))
          .map((x) => `☐ ${x.t[1]} — ${x.t[4]}`)
          .join("\n");
        try {
          await navigator.clipboard.writeText(remaining);
          copyBtn.textContent = "Copied";
          setTimeout(() => (copyBtn.textContent = "Copy remaining"), 1400);
        } catch {
          alert(remaining);
        }
      });
    }
  }

  function bindDate() {
    const input = $("#moveDate");
    const daysEl = $("#days");
    const focus = $("#focusText");
    if (!input) return;
    input.value = state().moveDate || DEFAULT_DATE;
    const paint = () => {
      const s = state();
      s.moveDate = input.value || DEFAULT_DATE;
      save(s);
      const d = daysUntil(s.moveDate);
      if (daysEl) daysEl.textContent = d;
      if (focus) focus.textContent = focusCopy(d);
      $$("[data-days]").forEach((el) => (el.textContent = d));
    };
    input.addEventListener("change", paint);
    paint();
  }

  function renderCalendar(target) {
    const el = $(target);
    if (!el) return;
    const landing = new Date((state().moveDate || DEFAULT_DATE) + "T12:00:00+09:00");
    const start = new Date(landing);
    start.setDate(landing.getDate() - 24);
    let html = "";
    for (let i = 0; i < 25; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      const dLeft = 24 - i;
      const phase = data.phases.find((p) => dLeft <= p.range[0] && dLeft >= p.range[1]);
      const ids = (phase?.tasks || []).filter((t) => t[4] === `D-${dLeft}` || (dLeft === 0 && t[4] === "D-0")).map((t) => t[0]);
      const doneN = ids.filter(isDone).length;
      const label = day.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "Asia/Tokyo" });
      html += `<button class="calDay ${phase ? "p-" + phase.id : ""}" data-jump="phase-${phase?.id || ""}" type="button">
        <b>D-${dLeft}</b>
        <span>${label}</span>
        <i>${ids.length ? `${doneN}/${ids.length}` : phase?.id || ""}</i>
      </button>`;
    }
    el.innerHTML = html;
    $$(".calDay", el).forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.jump;
        const node = id && document.getElementById(id);
        if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const jp = voices.find((v) => v.lang.startsWith("ja"));
    if (jp) u.voice = jp;
    u.lang = "ja-JP";
    u.rate = 0.9;
    speechSynthesis.speak(u);
  }

  window.Tokyo = {
    data,
    allTasks,
    uniqueIds,
    state,
    isDone,
    setDone,
    progress,
    daysUntil,
    focusCopy,
    taskHTML,
    bindChecks,
    updateProgress,
    mountChrome,
    renderMust,
    renderPhases,
    renderFiltered,
    bindFilters,
    bindDate,
    renderCalendar,
    speak,
    DEFAULT_DATE,
  };

  document.addEventListener("DOMContentLoaded", () => {
    mountChrome();
    bindDate();
    updateProgress();
    bindFilters();
  });
})();
