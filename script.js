/* ============================================================
   Sarah's French Mastery — app logic
   The task checkboxes are the single source of truth; the ring,
   phase bars, nav pill, week node states and milestone timeline
   are all derived from them. State persists in localStorage.
   ============================================================ */
(function () {
  "use strict";

  var KEY = "sarah-fr-progress";

  /* ---- Free resources (name + link) ---- */
  var R = {
    LT:    { name: "Language Transfer",      url: "https://www.languagetransfer.org/french" },
    CBF:   { name: "Coffee Break French",    url: "https://coffeebreaklanguages.com/coffeebreakfrench/" },
    LAW:   { name: "Lawless French",         url: "https://www.lawlessfrench.com/" },
    TV5:   { name: "TV5Monde",               url: "https://apprendre.tv5monde.com/" },
    TV5TCF:{ name: "TV5Monde · TCF",         url: "https://apprendre.tv5monde.com/fr/tcf" },
    PFF:   { name: "Podcast Français Facile", url: "https://www.podcastfrancaisfacile.com/" },
    RFI:   { name: "RFI · le français facile", url: "https://www.rfi.fr/fr/podcasts/le-fran%C3%A7ais-facile-avec-rfi/" },
    FA:    { name: "Français Authentique",   url: "https://www.francaisauthentique.com/" },
    IF:    { name: "InnerFrench",            url: "https://innerfrench.com/podcast/" },
    FAP:   { name: "Français avec Pierre",   url: "https://www.francaisavecpierre.com/" },
    HT:    { name: "HelloTalk",              url: "https://www.hellotalk.com/" },
    ANKI:  { name: "Anki",                   url: "https://apps.ankiweb.net/" },
    TEF:   { name: "TEF Canada · samples",   url: "https://www.lefrancaisdesaffaires.fr/tests-diplomes/test-evaluation-francais-tef/tef-canada/" },
    TCF:   { name: "TCF Canada · samples",   url: "https://www.france-education-international.fr/test/tcf-canada" }
  };

  /* ---- The 6-month plan ---- */
  var PLAN = [
    {
      id: "p1", n: 1, kicker: "Phase 1 · Months 1–2", title: "Foundations",
      cefr: "A0 → A2", tag: "Build the engine. Sound French from day one.",
      weeks: [
        { w: 1, focus: "Sounds & first sentences", tasks: [
          { t: "Language Transfer tracks 1–10: start the Thinking Method and build grammar from zero.", r: "LT" },
          { t: "Learn the alphabet, accents & the 38 sounds; drill nasal vowels + the French R, 5 min/day.", r: "LAW" },
          { t: "Install Anki; start a French frequency deck — 10 new cards a day.", r: "ANKI" }
        ]},
        { w: 2, focus: "Present tense & introducing yourself", tasks: [
          { t: "Language Transfer tracks 11–20.", r: "LT" },
          { t: "Coffee Break French, Season 1, lessons 1–3 (greetings & introductions).", r: "CBF" },
          { t: "être & avoir in the present + the subject pronouns.", r: "LAW" },
          { t: "Record a 4-sentence self-introduction; compare it to native audio." }
        ]},
        { w: 3, focus: "Everyday vocabulary & -er verbs", tasks: [
          { t: "Language Transfer tracks 21–30.", r: "LT" },
          { t: "Coffee Break French, Season 1, lessons 4–6.", r: "CBF" },
          { t: "Your first TV5Monde A1 listening exercises (authentic video).", r: "TV5" },
          { t: "Anki: 10 new cards/day; add the words from this week's lessons.", r: "ANKI" }
        ]},
        { w: 4, focus: "Questions, numbers & time", tasks: [
          { t: "Language Transfer tracks 31–40.", r: "LT" },
          { t: "Coffee Break French, Season 1, lessons 7–10.", r: "CBF" },
          { t: "Three A1 « débutant » dialogues with transcript.", r: "PFF" }
        ], milestone: { t: "Read any French word aloud correctly and follow a slow 30-second A1 dialogue at ~60%.", exam: false } },
        { w: 5, focus: "Articles & noun gender", tasks: [
          { t: "Language Transfer tracks 41–45 — finish the course.", r: "LT" },
          { t: "TV5Monde A1: articles & gender exercises.", r: "TV5" },
          { t: "Definite / indefinite articles & how to guess a noun's gender.", r: "LAW" },
          { t: "Shadow one Podcast Français Facile A1 dialogue, line by line.", r: "PFF" }
        ]},
        { w: 6, focus: "Near future & daily routine", tasks: [
          { t: "Coffee Break French, Season 1, lessons 11–14.", r: "CBF" },
          { t: "TV5Monde A1: a daily-routine video clip + exercise.", r: "TV5" },
          { t: "aller + le futur proche (« I'm going to… »).", r: "LAW" },
          { t: "Anki checkpoint: 250 cards seen, review streak intact.", r: "ANKI" }
        ]},
        { w: 7, focus: "Talking about the past (passé composé)", tasks: [
          { t: "Coffee Break French, Season 1, lessons 15–18.", r: "CBF" },
          { t: "TV5Monde A1–A2: ordering food & shopping tasks.", r: "TV5" },
          { t: "Three dialogues + one dictée (spelling & listening).", r: "PFF" },
          { t: "The passé composé with avoir.", r: "LAW" }
        ]},
        { w: 8, focus: "Consolidate A2", tasks: [
          { t: "Coffee Break French, Season 1, lessons 19–20 — finish Season 1.", r: "CBF" },
          { t: "TV5Monde: a full A2 listening + reading exercise set.", r: "TV5" },
          { t: "Write a 6-sentence « ma semaine » paragraph in the past.", r: "LAW" }
        ], milestone: { t: "≈ A2: handle daily survival topics, ~500-word receptive vocabulary, understand slow A1 audio ~75%.", exam: false } }
      ]
    },
    {
      id: "p2", n: 2, kicker: "Phase 2 · Months 3–4", title: "Building Fluency",
      cefr: "A2 → B1", tag: "Immersion core, daily news, and your speaking debut.",
      weeks: [
        { w: 9, focus: "Switch to the immersion core", tasks: [
          { t: "Start the TV5Monde A2 track — 4 exercises this week.", r: "TV5" },
          { t: "RFI « le français facile »: 1 episode (listen twice, then read the transcript).", r: "RFI" },
          { t: "Coffee Break French, Season 2, lessons 1–3.", r: "CBF" },
          { t: "Anki: switch to short sentence cards mined from RFI / TV5Monde.", r: "ANKI" }
        ]},
        { w: 10, focus: "Speaking debut", tasks: [
          { t: "Set up HelloTalk; do 2 text chats + 1 voice note with a native.", r: "HT" },
          { t: "TV5Monde A2: 4 exercises.", r: "TV5" },
          { t: "Français Authentique: 1 episode — shadow Johan 5 min for the native accent.", r: "FA" }
        ], milestone: { t: "Hold a 5-minute written HelloTalk exchange, unaided.", exam: false } },
        { w: 11, focus: "Past vs. imperfect", tasks: [
          { t: "imparfait vs passé composé — when to use which.", r: "LAW" },
          { t: "TV5Monde A2: a narrative-past video exercise.", r: "TV5" },
          { t: "RFI: 2 episodes with transcript.", r: "RFI" },
          { t: "HelloTalk: 2 chats.", r: "HT" }
        ]},
        { w: 12, focus: "News listening", tasks: [
          { t: "RFI « le français facile »: 3 episodes (try one with no transcript first).", r: "RFI" },
          { t: "TV5Monde A2 → B1: 4 exercises.", r: "TV5" },
          { t: "Français Authentique: shadow 1 episode and record yourself.", r: "FA" }
        ], milestone: { t: "Understand ~80% of a slow RFI news bulletin.", exam: false } },
        { w: 13, focus: "Future & conditional", tasks: [
          { t: "le futur simple + le conditionnel présent.", r: "LAW" },
          { t: "TV5Monde B1: 4 exercises.", r: "TV5" },
          { t: "HelloTalk: attempt a 5–10 minute voice call.", r: "HT" },
          { t: "Anki: 15 sentence cards a day.", r: "ANKI" }
        ]},
        { w: 14, focus: "Opinions & connectors", tasks: [
          { t: "TV5Monde B1: opinion / argument clips + exercises.", r: "TV5" },
          { t: "RFI: 3 episodes.", r: "RFI" },
          { t: "Français Authentique: 2 episodes, shadowing.", r: "FA" },
          { t: "Write a 120-word opinion paragraph; get it corrected on HelloTalk.", r: "HT" }
        ]},
        { w: 15, focus: "First exam contact", tasks: [
          { t: "TV5Monde TCF simulator: one listening + one reading practice block.", r: "TV5TCF" },
          { t: "RFI: 3 episodes.", r: "RFI" },
          { t: "HelloTalk: 2 conversations (aim for 10 min of voice).", r: "HT" },
          { t: "le subjonctif — introduction.", r: "LAW" }
        ]},
        { w: 16, focus: "Consolidate B1", tasks: [
          { t: "TV5Monde TCF simulator: a full receptive mock — write down your scores.", r: "TV5TCF" },
          { t: "RFI + TV5Monde: 4 listening / exercise sessions total.", r: "TV5" },
          { t: "Self-record a 3-min monologue « ma vie au Canada »; compare to Johan.", r: "FA" }
        ], milestone: { t: "≈ B1: TCF listening mock lands near 458 — the CLB 7 band.", exam: true } }
      ]
    },
    {
      id: "p3", n: 3, kicker: "Phase 3 · Months 5–6", title: "Exam-Ready",
      cefr: "B1 → B2 + TEF/TCF", tag: "Official mocks, accent polish — then book the test.",
      weeks: [
        { w: 17, focus: "Graduate to InnerFrench", tasks: [
          { t: "InnerFrench: episodes 1–2 with transcript (the B1 → B2 bridge).", r: "IF" },
          { t: "TV5Monde B1 → B2: 4 exercises.", r: "TV5" },
          { t: "Français avec Pierre: 1 pronunciation / exam-skills video.", r: "FAP" },
          { t: "HelloTalk: 2 conversations.", r: "HT" }
        ]},
        { w: 18, focus: "First full mock", tasks: [
          { t: "Download the free official sample subjects — all four skills.", r: "TEF" },
          { t: "Do a timed receptive mock (listening + reading) under exam conditions.", r: "TCF" },
          { t: "InnerFrench: 1 episode.", r: "IF" }
        ], milestone: { t: "Completed a full timed receptive mock — you now know the exact format & timing.", exam: true } },
        { w: 19, focus: "Build the writing skill", tasks: [
          { t: "Study the TEF/TCF writing tasks (sections A/B/C) from the samples.", r: "TEF" },
          { t: "Write 2 exam-style responses; get native corrections on HelloTalk.", r: "HT" },
          { t: "InnerFrench: 1 episode + shadow.", r: "IF" },
          { t: "Français avec Pierre: 1 grammar / exam video.", r: "FAP" }
        ]},
        { w: 20, focus: "Hit CLB 7 on receptive skills", tasks: [
          { t: "TV5Monde simulator + official samples: 2 listening + 2 reading timed sets.", r: "TV5TCF" },
          { t: "Daily listening maintenance (RFI / InnerFrench).", r: "RFI" },
          { t: "HelloTalk: 3 conversations.", r: "HT" }
        ], milestone: { t: "Reading & listening mocks at/above CLB 7 (TEF 207/249 · TCF 453/458).", exam: true } },
        { w: 21, focus: "Speaking intensive", tasks: [
          { t: "Français avec Pierre: pronunciation drills + liaisons.", r: "FAP" },
          { t: "HelloTalk: daily 10-min voice calls; rehearse speaking sections A & B.", r: "HT" },
          { t: "Two self-recorded speaking simulations against official prompts.", r: "TCF" },
          { t: "InnerFrench: 1 episode.", r: "IF" }
        ]},
        { w: 22, focus: "Writing & speaking to target", tasks: [
          { t: "Three timed written responses; corrections via HelloTalk.", r: "HT" },
          { t: "Three recorded speaking mocks against official prompts.", r: "TEF" },
          { t: "Listening maintenance (InnerFrench / RFI).", r: "IF" }
        ], milestone: { t: "Writing ≥ TEF 310 / TCF 10, and speaking fluent on exam prompts.", exam: true } },
        { w: 23, focus: "Full timed mocks", tasks: [
          { t: "Two full 4-skill timed mocks (official + TV5Monde).", r: "TV5TCF" },
          { t: "Review every error; targeted grammar fixes.", r: "LAW" },
          { t: "HelloTalk: 3 conversations.", r: "HT" },
          { t: "Book your TEF Canada or TCF Canada exam date.", r: "TCF" }
        ]},
        { w: 24, focus: "Exam-ready", tasks: [
          { t: "One final full timed mock — all four skills.", r: "TCF" },
          { t: "Light review + rest; a last pass of pronunciation polish.", r: "FAP" },
          { t: "Re-record your Week-1 self-introduction and hear how far you've come." }
        ], milestone: { t: "Full mock ≥ CLB 7 across all four skills → exam-ready for up to +50 CRS points.", exam: true } }
      ]
    }
  ];

  /* ---- State ---- */
  var store = {};
  try { store = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { store = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} }
  function isDone(id) { return !!store[id]; }
  function countDone(ids) { var n = 0; for (var i = 0; i < ids.length; i++) if (isDone(ids[i])) n++; return n; }

  /* ---- Assign stable ids + collect ---- */
  var phases = PLAN.map(function (p) {
    var weeks = p.weeks.map(function (w) {
      var tasks = w.tasks.map(function (t, i) { return { t: t.t, r: t.r, id: p.id + "-w" + w.w + "-t" + i }; });
      var milestone = w.milestone ? { t: w.milestone.t, exam: w.milestone.exam, id: p.id + "-w" + w.w + "-m" } : null;
      var ids = tasks.map(function (t) { return t.id; });
      if (milestone) ids.push(milestone.id);
      return { w: w.w, focus: w.focus, tasks: tasks, milestone: milestone, ids: ids, key: p.id + "-w" + w.w };
    });
    var ids = weeks.reduce(function (a, w) { return a.concat(w.ids); }, []);
    return { id: p.id, n: p.n, kicker: p.kicker, title: p.title, cefr: p.cefr, tag: p.tag, weeks: weeks, ids: ids };
  });
  var allIds = phases.reduce(function (a, p) { return a.concat(p.ids); }, []);

  /* ---- Helpers ---- */
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  var CHECK = '<span class="task__box" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7"/></svg></span>';
  function resLink(key) {
    if (!key || !R[key]) return "";
    return '<a class="res-tag" href="' + R[key].url + '" target="_blank" rel="noopener">&#8599; ' + esc(R[key].name) + "</a>";
  }
  function taskRow(t) {
    return '<div class="task">' +
      '<label class="task__main">' +
        '<input type="checkbox" data-task="' + t.id + '"' + (isDone(t.id) ? " checked" : "") + ">" +
        CHECK +
        '<span class="task__text">' + esc(t.t) + "</span>" +
      "</label>" + resLink(t.r) + "</div>";
  }

  /* ---- Render roadmap ---- */
  function renderRoadmap() {
    var html = "";
    phases.forEach(function (p) {
      html += '<section class="phase" data-phase="' + p.id + '">';
      html += '<header class="phase__head">' +
        '<span class="phase__node" aria-hidden="true">' + p.n + "</span>" +
        '<div class="phase__meta">' +
          '<p class="phase__kicker">' + esc(p.kicker) + "</p>" +
          '<h3 class="phase__title">' + esc(p.title) + "</h3>" +
          '<p class="phase__tag">' + esc(p.tag) + '<span class="cefr">' + esc(p.cefr) + "</span></p>" +
        "</div></header>";
      html += '<div class="phase__weeks">';
      p.weeks.forEach(function (w) {
        html += '<div class="wk" data-wk="' + w.key + '">' +
          '<button class="wk__head" type="button" aria-expanded="false">' +
            '<span class="wk__node" aria-hidden="true"><span class="wk__num">' + w.w + "</span></span>" +
            '<span class="wk__headtext">' +
              '<span class="wk__label">Week ' + w.w + "</span>" +
              '<span class="wk__focus">' + esc(w.focus) + "</span>" +
            "</span>" +
            '<span class="wk__count" data-count>0/' + w.ids.length + "</span>" +
            '<span class="wk__chev"></span>' +
          "</button>" +
          '<div class="wk__panel"><div class="wk__panelinner"><div class="wk__body">';
        html += '<div class="tasks">';
        w.tasks.forEach(function (t) { html += taskRow(t); });
        html += "</div>";
        if (w.milestone) {
          html += '<div class="milestone' + (w.milestone.exam ? " is-exam" : "") + '">' +
            '<span class="milestone__badge">' + (w.milestone.exam ? "Exam milestone" : "Milestone") + "</span>" +
            taskRow(w.milestone) + "</div>";
        }
        html += "</div></div></div></div>";
      });
      html += "</div></section>";
    });
    return html;
  }

  /* ---- Render tracker (static shells; values via updateAll) ---- */
  function renderPhaseBars() {
    return phases.map(function (p) {
      return '<div class="pbar" data-phase="' + p.id + '">' +
        '<div class="pbar__top">' +
          '<span class="pbar__name">' + esc(p.title) + "<small>" + esc(p.kicker.replace("Phase " + p.n + " · ", "")) + " · " + esc(p.cefr) + "</small></span>" +
          '<span class="pbar__pct" data-pbar-pct>0%</span>' +
        "</div>" +
        '<div class="pbar__track"><div class="pbar__fill" data-pbar-fill></div></div>' +
      "</div>";
    }).join("");
  }
  function renderMilestones() {
    var html = "";
    phases.forEach(function (p) {
      p.weeks.forEach(function (w) {
        if (!w.milestone) return;
        html += '<li><button class="mstone' + (w.milestone.exam ? " is-exam" : "") + '" type="button" data-goto="' + w.key + '" data-mid="' + w.milestone.id + '">' +
          '<span class="mstone__dot" aria-hidden="true"></span>' +
          '<span class="mstone__text"><span class="mstone__week">Week ' + w.w + ":</span> " + esc(w.milestone.t) + "</span>" +
        "</button></li>";
      });
    });
    return html;
  }

  /* ---- DOM refs ---- */
  var $ = function (s) { return document.querySelector(s); };
  var roadmap = $("#roadmap");
  if (!roadmap) return;
  roadmap.innerHTML = renderRoadmap();
  $("#phaseBars").innerHTML = renderPhaseBars();
  $("#milestoneList").innerHTML = renderMilestones();

  var ring = $("#ring"), ringPct = $("#ringPct"), trackerStat = $("#trackerStat");
  var pills = document.querySelectorAll("[data-progress-pill]");
  var weekEls = {};
  phases.forEach(function (p) { p.weeks.forEach(function (w) { weekEls[w.key] = roadmap.querySelector('[data-wk="' + w.key + '"]'); }); });

  /* ---- Update all derived UI ---- */
  function updateAll() {
    var totalDone = countDone(allIds), total = allIds.length;
    var pct = total ? Math.round((totalDone / total) * 100) : 0;

    if (ring) ring.style.setProperty("--pct", pct);
    if (ringPct) ringPct.textContent = pct + "%";
    if (trackerStat) trackerStat.textContent = totalDone + " of " + total + " tasks done";
    for (var i = 0; i < pills.length; i++) pills[i].textContent = pct + "%";

    // phase bars
    phases.forEach(function (p) {
      var pd = countDone(p.ids), pp = p.ids.length ? Math.round((pd / p.ids.length) * 100) : 0;
      var bar = document.querySelector('.pbar[data-phase="' + p.id + '"]');
      if (bar) {
        bar.querySelector("[data-pbar-fill]").style.width = pp + "%";
        bar.querySelector("[data-pbar-pct]").textContent = pp + "%";
      }
    });

    // week counts + node states (current = first not-fully-done week)
    var currentFound = false;
    phases.forEach(function (p) {
      p.weeks.forEach(function (w) {
        var el = weekEls[w.key]; if (!el) return;
        var c = countDone(w.ids), full = c === w.ids.length;
        var cnt = el.querySelector("[data-count]"); if (cnt) cnt.textContent = c + "/" + w.ids.length;
        el.classList.remove("is-done", "is-current", "is-upcoming");
        if (full) { el.classList.add("is-done"); }
        else if (!currentFound) { el.classList.add("is-current"); currentFound = true; }
        else { el.classList.add("is-upcoming"); }
      });
    });

    // milestone timeline
    var mstones = document.querySelectorAll(".mstone[data-mid]");
    for (var k = 0; k < mstones.length; k++) {
      mstones[k].classList.toggle("is-done", isDone(mstones[k].getAttribute("data-mid")));
    }
  }

  /* ---- Accordion ---- */
  function setOpen(el, open) {
    el.classList.toggle("is-open", open);
    var head = el.querySelector(".wk__head");
    if (head) head.setAttribute("aria-expanded", open ? "true" : "false");
  }
  roadmap.addEventListener("click", function (e) {
    var head = e.target.closest(".wk__head");
    if (head && roadmap.contains(head)) {
      var wk = head.closest(".wk");
      setOpen(wk, !wk.classList.contains("is-open"));
    }
  });

  /* ---- Checkbox changes (delegated) ---- */
  roadmap.addEventListener("change", function (e) {
    var inp = e.target;
    if (!inp || inp.getAttribute("data-task") == null) return;
    var id = inp.getAttribute("data-task");
    if (inp.checked) store[id] = true; else delete store[id];
    save();
    updateAll();
  });

  /* ---- Expand / collapse / jump ---- */
  function openWeek(key, scroll) {
    var el = weekEls[key]; if (!el) return;
    setOpen(el, true);
    if (scroll) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  $("#expandAll").addEventListener("click", function () {
    Object.keys(weekEls).forEach(function (k) { setOpen(weekEls[k], true); });
  });
  $("#collapseAll").addEventListener("click", function () {
    Object.keys(weekEls).forEach(function (k) { setOpen(weekEls[k], false); });
  });
  $("#jumpCurrent").addEventListener("click", function () {
    var target = null;
    phases.some(function (p) {
      return p.weeks.some(function (w) {
        if (countDone(w.ids) < w.ids.length) { target = w.key; return true; }
        return false;
      });
    });
    if (!target) { var ws = Object.keys(weekEls); target = ws[ws.length - 1]; }
    openWeek(target, true);
  });

  // milestone click -> open its week
  $("#milestoneList").addEventListener("click", function (e) {
    var btn = e.target.closest(".mstone"); if (!btn) return;
    openWeek(btn.getAttribute("data-goto"), true);
  });

  /* ---- Reset (two-tap confirm, no native dialog) ---- */
  var resetBtn = $("#resetBtn"), armed = false, armTimer = null;
  resetBtn.addEventListener("click", function () {
    if (!armed) {
      armed = true;
      resetBtn.textContent = "Tap again to confirm";
      resetBtn.classList.add("is-armed");
      armTimer = setTimeout(function () {
        armed = false; resetBtn.textContent = "Reset progress"; resetBtn.classList.remove("is-armed");
      }, 3000);
      return;
    }
    clearTimeout(armTimer); armed = false;
    resetBtn.textContent = "Reset progress"; resetBtn.classList.remove("is-armed");
    store = {}; save();
    var inputs = roadmap.querySelectorAll('input[data-task]');
    for (var i = 0; i < inputs.length; i++) inputs[i].checked = false;
    updateAll();
  });

  /* ---- Mobile nav ---- */
  var nav = $("#nav"), burger = $("#navBurger"), navLinks = $("#navLinks");
  function closeNav() { nav.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", "Open menu"); }
  burger.addEventListener("click", function () {
    var open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  navLinks.addEventListener("click", function (e) { if (e.target.closest("a")) closeNav(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });
  window.addEventListener("resize", function () { if (window.innerWidth > 760) closeNav(); });

  /* ---- Scroll-spy ---- */
  var spyLinks = {};
  document.querySelectorAll(".nav__links a[data-spy]").forEach(function (a) { spyLinks[a.getAttribute("data-spy")] = a; });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          Object.keys(spyLinks).forEach(function (k) { spyLinks[k].classList.toggle("is-active", k === en.target.id); });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    ["tool", "plan", "track"].forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---- Init ---- */
  // open the current week by default for a helpful first view
  (function () {
    var first = null;
    phases.some(function (p) {
      return p.weeks.some(function (w) {
        if (countDone(w.ids) < w.ids.length) { first = w.key; return true; }
        return false;
      });
    });
    if (first) setOpen(weekEls[first], true);
  })();
  updateAll();
})();
