# Living Codex — interactive book blueprint (proposed)

**Status:** v0.1 reader prototype proposal. **No manuscript release approval implied.**

## Purpose

Evolve the existing Nevora Codex GitHub Pages orientation site into a source-grounded interactive book, with optional speech, Vessie learning guidance, voluntary assessments, and explorable simulations. Keep the existing editorial review runway and historical source files intact.

## Critical source distinction

- The **repository** currently contains a five-volume, 100-chapter **v1.0 public-edition draft** under `source/`. It is in structured review and has its own claim boundaries.
- The **historical archival manuscripts** use **Acts I–XX with lesson-level structures**. Earlier compilations omitted Acts VI, XI, and XII from volume PDFs, and Act V appeared twice in one assembly. The missing lesson texts were later located in separately named Ultimate Human-AI Mastery Textbook parts. This establishes archival leads, not authority to silently substitute texts into the public edition.
- Do **not** claim the 100-chapter editorial draft is a verbatim edition of the archival 20-Act lessons.
- Never overwrite or rename original manuscripts. Any future import requires a copy-only, hashed, independently reviewable provenance manifest, per-lesson version identifiers, editorial approval, and explicit release authorization.

## v0.1 scope (this feature branch)

- An opt-in on-site reader for the already-public `source/volume-i.md` from the main branch (no separate private files).
- Parse the existing chapter headings and render as text-only React elements (never `dangerouslySetInnerHTML`).
- Browser-provided speech synthesis with Read aloud, Pause/Resume, and Stop, plus chapter switching and cleanup on unmount.
- Explicit statements that Vessie integration, assessments, and virtual worlds are **not implemented**.
- A copyable, source-linked study prompt, with no fake AI answer.
- No user accounts, audio upload, analytics, tracking, backend, or new external service.
- GitHub Actions checks for parser behavior and Vite build.

## Later milestones: separate gated PRs

1. **Canonical source manifest** — establish whether a lesson is archival text, editorial public draft, author-approved adaptation, newly created exercise, or simulation design. Record canonical source URL / file hash, exact chapter/lesson ID, editor, approval, and claim category.
2. **Robust reader** — 5-volume navigation, deep links, mobile layout, bookmarks and voluntary browser-local progress, accessible pagination, highlighting, offline fallback, testable voice segmentation and opt-in voice selection.
3. **Vessie tutor adapter** — explicit connection, read-only grounded retrieval over approved published passages, numbered citations and abstention for missing sources. No autonomous teaching authority, diagnosing readers, recording private reflections without consent, or bypassing human review. BudgetCompute/CraneFly model routing can be layered behind this adapter after privacy/security review.
4. **Lessons and assessments** — author-approved source-grounded prompts and evaluations. Clearly mark author-original vs newly drafted exercises. Personal philosophy is not objectively graded. Use local-first storage; no coercive streak mechanics.
5. **World portals** — begin with one browser-first interactive scene tied to an approved lesson, then expand to Nevora's conceptual Temple/Forge/Lighthouse worldbuilding simulations. Separate fictional lore and gameplay from real scientific claims; WebXR optional, desktop fallback required. Model/asset creation should be independent and provenance-aware.
6. **Commons/Porch connection** — portable bookmarks and user-controlled identity/consent tokens only through an approved interface, with no mandatory central identity.

## Release and safety boundary

The current `docs/phase-gate-status.md` places v1.0 in Phase 1 author-steward review. A merged site feature does **not** authorize manuscript publication, an official v1.0 release, a DOI, or publication of archival material. Retain the seven-phase release process and clear separation of symbolic narrative vs scientific evidence. Public text is not proof of AI consciousness.

## Manual smoke test

1. Run `npm install`, `npm run test:reader`, and `npm run build`.
2. Open the local site and choose **Open public draft**. Confirm Chapter 1 loads, Chapter 2 can be selected, and source links resolve to the same repository content.
3. Confirm Read aloud, Pause/Resume, Stop, and chapter-switch cancellation work in a browser with speech synthesis.
4. Confirm the site remains usable with speech synthesis disabled, local storage disabled, network denied, and in narrow mobile width.
5. Confirm no private archival manuscript text was bundled and no AI, account, analytics, or external tutoring service was contacted.
6. Confirm site reviewer lanes, release dashboard, claim explorer, and existing navigation remain intact.
