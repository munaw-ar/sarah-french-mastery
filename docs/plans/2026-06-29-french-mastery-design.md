# Design Doc — Sarah's French Mastery Hub
**Date:** 2026-06-29 · **Status:** Approved → Implementing · **Mode:** GodMode (reference-first)

## 1. Problem & goal
Sarah is a **true beginner (A0)** on a **Canadian permanent-residence pathway**. She wants **native-like French** *and* the French-language CRS bonus in Express Entry. The deliverable: a **public GitHub repo** + **live Vercel app** that (a) spotlights the single best **free** website to learn French, and (b) presents a **god-level, personalized 6-month plan**, with **progress tracking**.

**Honest target.** A0 → *true native fluency* in 6 months is not physically real. On ~30–45 min/day with elite immersion, the achievable and valuable target is **solid B1 / CLB 7** (the TEF/TCF Canada threshold for up to **+50 CRS points**), a **native-sounding accent foundation**, and **confident everyday conversation**. The plan aims there and says so.

## 2. Research (4 parallel agents, 20+ resources, verified June 2026)
**Convergent winner across all three content clusters: TV5Monde « Apprendre le français »** (apprendre.tv5monde.com).

| Rank | Resource | Free? | Why |
|------|----------|-------|-----|
| 🥇 | **TV5Monde Apprendre** | Fully free | Only no-paywall platform that is A0-accessible (English UI, leveled A1→C1), built on authentic native TV/news video, **and** bundles a free TCF exam simulator — co-produced with France Éducation international (writes the TCF) & CCI Paris (writes the TEF). |
| 🥈 | Language Transfer | Fully free | Best true-A0 launchpad; builds generative grammar from zero in ~7h. Caps ~A2. |
| 🥉 | Podcast Français Facile | Fully free | Largest free graded-listening + dictée + TCF-style drill library. |

**Supporting free ecosystem:** Coffee Break French (S1 beginner audio), Lawless French (English-language grammar spine), RFI « Le français facile » (daily news = exact TCF/TEF register), Français Authentique (native shadowing, A2+), InnerFrench (B1→B2 bridge), Français avec Pierre (pronunciation/exam skills), HelloTalk (free-tier speaking community), Anki (SRS), + **official TEF Canada / TCF Canada free sample papers**.

**Status surprises (2025–2026):** Duolingo tightened free tier (energy system ≈ 15–20 min/day) but freed "Explain My Answer"; Busuu moved all grammar instruction behind Premium; Kwiziq free = 10 kwizzes/month; News in Slow French value is paywalled. None of the institutional/reference sites flipped to paywalls. → reinforces TV5Monde + free ecosystem.

## 3. Exam thresholds (CLB 7 = NCLC 7, verified vs IRCC chart, June 2026)
Need **CLB/NCLC 7 in all four skills** (+ CLB 5 English) for the up-to-50-point bonus; results valid 2 years.

**TEF Canada (tests on/after 2023-12-10), minimum for CLB 7:** Reading **207**/300 · Listening **249**/360 · Writing **310**/450 · Speaking **310**/450.
**TCF Canada, minimum for CLB 7:** Listening **458**/699 · Reading **453**/699 · Speaking **10**/20 · Writing **10**/20.
*Caveat baked into the app: always re-confirm against canada.ca, since IRCC publishes date-based charts.*

## 4. The 6-month plan (3 phases, 24 weeks)
- **Phase 1 · Foundations (M1–2, A0→A2):** Language Transfer → Coffee Break French S1 → Lawless French grammar → Anki → TV5Monde A1 video; pronunciation from day 1.
- **Phase 2 · Building Fluency (M3–4, A2→B1):** TV5Monde A2→B1 core + RFI daily news + Français Authentique shadowing + HelloTalk speaking + first TCF mock.
- **Phase 3 · Exam-Ready (M5–6, B1→B2 + exam):** InnerFrench + Français avec Pierre + official TEF/TCF samples + weekly TV5Monde TCF simulator + timed mocks → book the exam.

Each week carries 3–4 concrete, resource-linked tasks; ~12 measurable milestones map to the CLB 7 thresholds above.

## 5. App architecture
- **Stack:** pure static `index.html` + `style.css` + `script.js`. No framework, no build step → zero-config Vercel static deploy.
- **Sections:** sticky nav (scroll-spy + live progress pill) → **Hero** (TV5Monde showcase, CTA, browser-frame visual) → **6-Month Plan** (roadmap.sh-style vertical spine; phase nodes; week accordions via `grid-rows 0fr→1fr`; claret exam-milestone badges; Duolingo-style done/current/upcoming node states) → **Progress Tracker** (conic-gradient ring + per-phase bars + milestone timeline; `localStorage` key `sarah-fr-progress`) → footer.
- **Single source of truth:** the task checkboxes (rendered from `PLAN` data). Checking a task recomputes the ring, phase bars, nav pill, week counters, roadmap node states, and milestone timeline.
- **Design language:** "Warm editorial atelier" — ivory canvas, deep French blue, claret accent; **Fraunces** display + **Inter** body; 60-30-10; explicit anti-AI-slop rules (no purple gradients, no emoji-card rows, no glassmorphism).
- **Responsive mandate:** mobile-first; fluid `clamp()` type; flawless 320 px → 4K; ≥44 px touch targets; landscape + notch safe-area support; `prefers-reduced-motion`. Verified with multi-viewport screenshots before sign-off.

## 6. Safety
Built entirely inside an **isolated `sarah-french-mastery/` subfolder** with its **own git repo**. The parent folder's sensitive personal documents (passport, permits, transcripts, payslips, medical) are physically outside the repo and can never be committed or published.

## 7. Decision log
- **Spotlight = TV5Monde** (convergent across 3 independent research agents).
- **Plan honesty:** target B1/CLB 7, not "native in 6 months."
- **No-framework static** for reliability + zero-config free deploy.
- **Tracker = single source of truth**, drives all derived UI state.
- **Public repo, isolated** to protect personal documents.
