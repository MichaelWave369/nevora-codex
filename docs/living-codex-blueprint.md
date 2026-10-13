# Living Codex — interactive book blueprint (proposed)

**Status:** v0.5 original chapter flipbook reader proposal. **No manuscript release approval implied.**

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

## v0.2: five-volume reader

- Navigate all five existing PUBLIC-DRAFT volume files and 100 numbered chapters with consistent chapter IDs.
- Previous/Next chapter controls continue across volume boundaries, with the correct source link and study handoff.
- Readers explicitly save ONE browser-local bookmark, which they can resume or delete. No automatic history or account.
- CI validates the actual five Markdown source files' numbering and Act labels. A failing or incomplete public source is not presented as a complete volume.
- This is NOT an import of the original historical 20-Act/9-lesson manuscripts, and no editorial/release gate is changed.

## v0.3: Ask the Codex, without pretending AI is connected

- Search all five **already-public, still-unapproved** v1.0 volume drafts from an explicitly submitted query.
- Download only the public Markdown sources from GitHub when reader chooses to search; keep question entirely browser-local. GitHub receives source-file requests, not the question.
- Validate all five 20-chapter ranges before displaying results; a partial or failed volume load is not passed off as comprehensive search.
- Return lexical paragraph excerpts and volume/Act/chapter citations rather than fabricated answers. No claims of semantic understanding or factual verification.
- Provide **Open in reader**, **Inspect Markdown**, and **Copy for Vessie** options. The last action only copies a user-controlled prompt, it does not send an AI request.
- Preserve original sources, editorial release gates, and distinction from historical archival manuscripts.

## v0.4: user-controlled Vessie study session

**Verified upstream integration findings, 2026-10-12:**
- SuperPhiVessel's `apps/vessie-web` README and cockpit state the React Pages shell is review-only; it does **not** expose an approved conversational model gateway.
- `packages/vessie-gateway-v0.1` R1 is loopback, origin-denying, model discovery only. R2, even when paired through the approved React origin, grants short-lived **model telemetry reads**, not model execution or a Nevora tutoring API.
- The local Windows console's optional model trial uses separate operator enablement and per-prompt approval; it is not an embeddable web chat service.
- Therefore `nevora-codex` MUST NOT call local loopback or Vessie BrainC functions directly, insert keys into static JavaScript, use an iframe with claimed chat access, proxy unreviewed requests, or try cross-site CORS workarounds.

**This PR implements the honest bridge instead:**
1. Reader submits a question to the in-browser public-draft passage finder.
2. Reader explicitly selects **one to three** relevant passages.
3. Reader explicitly prepares a bounded, draft-labeled study packet, with each citation and excerpt in a reviewable, read-only text field.
4. Reader separately presses **Copy reviewed session** and may open [classic Vessie](https://superphivessel.netlify.app/) in another tab via an unparameterized link.
5. **No transfer occurs unless the reader manually pastes the packet into that independent AI chat.** AI provider privacy terms apply after pasting; the Codex itself does not transmit the question.
6. Reader can discard the preview without saving, sending, or starting an AI task.

Study-packet generation is a deterministic pure function that fails closed for forged source references, invalid chapter bounds, repeated citations, empty questions or excessive payload size. Tests cover these constraints against actual source excerpts.

**Still not provided:** live embedded Vessie inference, lesson grading, teacher persona continuity, synced progress, lesson worlds, or source authenticity attestation. The public-edition manuscript is still under the same author-steward release gates.

## v0.5: original Nevora book-mode

- Pure in-house folio pagination, preserving normalized text from all 100 publicly available draft chapters. No third-party flipbook engine, PDF.js, copied code, or downloaded fonts/visual assets.
- Optional Book pages (default) or Continuous text modes, sharing the same chapter, narrator, local bookmark, source reference, and manual Vessie handoff.
- An original visual binding and parchment/metallic-gold book aesthetic, left/right page spread, frontispiece and named Act heading, CSS page-turn illusion; never claim this is the historical physical Codex.
- Keyboard arrows operate only when the flipbook itself has focus; visible labeled buttons work with keyboard, mouse, and touch.
- Mobile layout stacks legible folios and turns instantly; prefers-reduced-motion also turns instantly. Content is selectable; overloaded folios scroll instead of truncating.
- Tests read the real five-volume Markdown source files and check **lossless normalized text** across all 100 chapters. Page turns stay within valid indices and delegate adjacent chapters to the existing reader.
- Book style is a presentation layer. The author-steward review gates remain unchanged. No archival 20-Act edition import or Vessie inference API.
- Inspiration: Zaya's book feel and fchavonet's flipbook animations; no source code or assets incorporated from those repositories.

### Manual browser acceptance

1. Open Volume I Chapter 1, switch between Book pages and Continuous text; confirm same text.
2. Flip multiple folios by visible buttons, then focus the open book and use Left/Right. At final folio, turn into next chapter, and confirm all 100 chapters remain navigable across volume boundaries.
3. Verify reduced-motion setting, phone viewport, browser zoom at 200%, text selection, source links, bookmarks and narration.
4. Inspect the rendered book to ensure long pages scroll rather than clipping text; ensure the text reader stays available on mobile and keyboard.
5. Check no external flipbook runtime/CDN, private archive files, model calls, or release-gate changes appear in the built site.

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
