# 🇫🇷 Sarah's French Mastery Hub

> From **absolute beginner (A0)** to **native-like French + TEF/TCF Canada CLB 7** in **6 months** — using **100% free** resources, no paywalls, ever.

A single-page, dependency-free web app that:
1. **Spotlights the single best free website** for learning French to a native level.
2. Lays out a **god-level, immersion-first 6-month plan**, tuned for **Canadian Express Entry** (French = up to **+50 CRS points**).
3. **Tracks progress** with checklists that persist in the browser (`localStorage`).

**🔗 Live app:** _deploying — Vercel URL added on first deploy_
**📦 Repo:** this repository

---

## 🏆 The best free tool: TV5Monde « Apprendre le français »
`apprendre.tv5monde.com`

Chosen after a parallel evaluation of **20+ resources** by four research agents. It was the **convergent #1** across every content cluster because it is the only platform that is *simultaneously*:

- **Fully free** — publicly funded, no paywall, no trial wall;
- **A0-accessible** — English UI, beginner course leveled from A1 → C1;
- **Authentic** — built on real native TV / news video (the gold standard for listening & accent);
- **Exam-ready** — bundles a **free TCF practice simulator**, co-produced with *France Éducation international* (which authors the TCF) and *CCI Paris* (which authors the TEF).

| Rank | Resource | Free? | Role |
|------|----------|-------|------|
| 🥇 | **TV5Monde Apprendre** | Fully free | Core immersion + exam prep |
| 🥈 | Language Transfer | Fully free | True-A0 launchpad (~7h, builds grammar from zero) |
| 🥉 | Podcast Français Facile | Fully free | Graded listening + dictées + TCF-style drills |

## 🧩 The free ecosystem (orchestrated by the plan)
Coffee Break French (beginner audio) · Lawless French (grammar spine) · RFI « Le français facile » (daily news = exact exam register) · Français Authentique (native shadowing) · InnerFrench (B1→B2 bridge) · Français avec Pierre (pronunciation/exam) · HelloTalk (free speaking community) · Anki (SRS) · **official TEF/TCF Canada free sample papers**.

## 🎯 Exam targets — CLB 7 (= NCLC 7) for the CRS bonus
Sarah needs **CLB 7 in all four skills** (+ CLB 5 English) for up to **+50 points**. Verified vs the IRCC chart, June 2026:

| | Reading | Listening | Writing | Speaking |
|---|---|---|---|---|
| **TEF Canada** (min) | 207 / 300 | 249 / 360 | 310 / 450 | 310 / 450 |
| **TCF Canada** (min) | 453 / 699 | 458 / 699 | 10 / 20 | 10 / 20 |

> ⚠️ IRCC publishes date-based conversion charts. Always re-confirm current thresholds at canada.ca before booking.

## 🗺️ The 6-month plan
- **Phase 1 · Foundations** (Months 1–2, A0→A2) — build the engine, sound French from day one.
- **Phase 2 · Building Fluency** (Months 3–4, A2→B1) — immersion core, daily news, speaking debut.
- **Phase 3 · Exam-Ready** (Months 5–6, B1→B2 + exam) — official mocks, accent polish, book the test.

24 weeks · ~100 concrete resource-linked tasks · ~12 measurable milestones mapped to CLB 7.

## 🖥️ The app
- **Pure static** `index.html` + `style.css` + `script.js` — **no framework, no build step**.
- **Editorial-atelier** design: ivory canvas, deep French blue, claret accent; Fraunces + Inter.
- **Interactive roadmap** (vertical spine, week accordions, exam-milestone badges, Duolingo-style node states).
- **Progress tracker**: conic-gradient ring + per-phase bars + milestone timeline; state persists in `localStorage`.
- **Responsive everywhere**: mobile-first, fluid `clamp()` typography, ≥44 px touch targets, landscape + notch safe-areas, `prefers-reduced-motion`. Verified across a 320 px → 4K device matrix.
- **Accessible**: semantic landmarks, `aria-expanded` accordions, full keyboard support, visible focus, AA/AAA contrast.

## ▶️ Run locally
No dependencies. Serve the folder with any static server:
```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
…or just open `index.html` in a browser.

## 🚀 Deploy
Zero-config static site — deploys to **Vercel**, Netlify, or GitHub Pages as-is. This repo ships a `vercel.json` with `cleanUrls` and sensible security headers.

## 🙏 Credits & disclaimer
All learning resources belong to their respective creators; this hub only links to them and is not affiliated with or endorsed by any of them. Exam thresholds are informational and were verified in June 2026 — confirm current numbers with official sources (IRCC, France Éducation international, Le français des affaires) before exam decisions.

Built with [Claude Code](https://claude.com/claude-code) in GodMode (reference-first).
