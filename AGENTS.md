<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:safe-code-rules -->
# SAFE CODE MODIFICATION RULES (production codebase)

These rules are binding for EVERY coding task in this repository (user-approved 2026-08-15).

1. **EXISTING CODE FIRST** — inspect structure, search for existing components/functions/utilities/routes/types/styles, read the relevant implementation completely, then modify it. Do NOT create a new file if an existing file can reasonably be modified.
2. **NO DUPLICATE IMPLEMENTATIONS** — never create `ComponentNew`/`V2`/`Fixed`/`Final`/`Backup`/`Temp` copies of existing files. Extend or refactor the existing one.
3. **BEFORE CREATING A NEW FILE** — allowed only when: (a) genuinely new feature, (b) architectural reason to split, (c) reusability requires a separate module, (d) framework requires it, (e) separation significantly improves maintainability. Note why an existing file can't be used and where the new file is imported.
4. **SEARCH BEFORE CREATE** — search the whole repo for similar names/functionality/imports/routes/types before creating anything.
5. **TRACE THE DEPENDENCY CHAIN** — Component → Parent → Page/Route → API → Service → DB/external. Understand impact before changing; don't fix a symptom when the problem is elsewhere.
6. **MODIFY THE SMALLEST SAFE SURFACE** — prefer 5–20 line targeted changes. Do NOT rewrite an entire page/component when a small change fixes it.
7. **NO DEAD CODE** — after changes, check for unused imports/components/functions/variables, unreachable code, obsolete routes/styles/config, duplicate utilities/components. Remove only after verifying nothing uses them.
8. **NO BACKUP FILES IN SOURCE** — never keep `.bak`/`.old`/`.backup`/`-copy`/`-old`/`-final`/`-v2` inside the source tree. Git is the version control.
9. **GIT IS THE SAFETY NET** — check `git status` before significant changes; never overwrite unrelated user changes; never reset/revert/checkout/delete user changes unless explicitly told.
10. **NEVER MODIFY UNRELATED CODE** — fix only what the task touches plus technically required dependencies.
11. **COMPONENT REUSE** — reuse existing Button/Input/Modal/Card/Badge/Section/Container/Form/Typography/Loading/Error/Empty components from the design system. Don't create a second one.
12. **CENTRALIZE SHARED DATA** — pricing, services, navigation, stats, testimonials, portfolio, company info: single source of truth. (Nexus uses DB settings for stats, DB services for pricing.)
13. **CENTRALIZE CONFIGURATION** — no hardcoded API URLs / company info / pricing / social links / feature flags repeated across files; use the existing config system; never expose secrets client-side.
14. **TYPESCRIPT SAFETY** — no `any` shortcuts; use interfaces/types/generics/type guards. Don't mass-rewrite existing `any` — fix only when relevant to the task.
15. **ERROR HANDLING** — never hide errors to make the build pass (no @ts-ignore, no global ESLint disable, no swallowed exceptions, no removed validation). Fix the underlying problem.
16. **BUILD MUST REMAIN HEALTHY** — after changes run TypeScript + ESLint + tests + production build; fix anything your change broke.
17. **CLEANUP AFTER EVERY TASK** — search for duplicate files/components, unused imports/functions, dead files, temp files, debug logs, commented-out abandoned code; remove only proven-obsolete items.
18. **DO NOT BLINDLY DELETE** — before deleting: search imports, dynamic references, route references, config references, check framework conventions and build behavior. Only delete when confident.
19. **PRODUCTION-FIRST THINKING** — consider existing users, SEO, URLs, API/data compatibility, mobile, a11y, performance, security, deployment — not just "screenshot looks correct".
20. **ARCHITECTURE CONSISTENCY** — follow the existing `components/ lib/ app/` structure; no `components-new/ lib-v2/` variants.
21. **REFACTOR ONLY WHEN NECESSARY** — explain problem, list affected files, plan, preserve behavior, refactor incrementally, remove obsolete code, verify build. No big refactors during simple bug fixes.
22. **TASK COMPLETION REPORT** — after every coding task report: files modified / created / deleted (+why), existing code reused, architecture impact, validation (TS/ESLint/tests/build), remaining issues.
23. **FINAL RULE** — DO NOT CREATE NEW CODE WHEN EXISTING CODE CAN BE SAFELY UPDATED OR REUSED. Optimize for long-term maintainability: a future developer must understand what each file does, which component is active, where business logic and shared data live, which files are safe to modify, and how the app is structured.

**Nexus-specific shared data sources (single source of truth):**
- Stats: DB settings keys `stat1Value`…`stat4Value` + `stat*Label` (home + about read these; fallbacks must match: 134+/129+/98.9%/24-7)
- Services + pricing: DB `services` table (admin-editable; chatbot guideline must mirror it)
- Premium features: DB `premium_features` table
- Contact info: DB settings (`address`, phone, email) — footer/contact/privacy/terms read these
- Currency: `src/lib/currency.tsx` (USD default, MMK switch, rate 4500 — single formatter)
<!-- END:safe-code-rules -->
