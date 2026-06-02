# Interactive Site Feature Inventory

This inventory tracks the current GitHub Pages / React site features for the Nevora Codex.

The purpose of the site is orientation, review support, and release readiness visibility. It should remain public-safe, lightweight, and free of analytics or private data collection.

## Current site status

```text
SITE v0.5 — Reader, reviewer, claim-boundary, and release dashboard layers active.
```

## Public URL

Expected GitHub Pages URL:

```text
https://michaelwave369.github.io/nevora-codex/
```

## Core site files

| File | Purpose |
| --- | --- |
| `index.html` | Vite entry HTML with fallback screen. |
| `vite.config.js` | Sets GitHub Pages base path `/nevora-codex/`. |
| `package.json` | React/Vite dependencies and scripts. |
| `src/main.jsx` | Imports React app, styles, and interactive enhancement modules. |
| `src/App.jsx` | Main React interface: hero, navigator, reviewer mode, guardrails, resources. |
| `src/styles.css` | Main site layout and visual system. |
| `src/reviewer.css` | Reviewer Mode styles. |
| `src/claim-explorer.js` | Claim Boundary Explorer behavior. |
| `src/claim-explorer.css` | Claim Boundary Explorer styles. |
| `src/release-dashboard.js` | Release Dashboard behavior. |
| `src/release-dashboard.css` | Release Dashboard styles. |
| `src/reading-mode.js` | Local-only Reading Mode behavior. |
| `src/reading-mode.css` | Reading Mode styles. |

## Interactive modules

### 1. Hero and public boundary

Source:

```text
src/App.jsx
```

Purpose:

- introduces the Nevora Codex;
- displays release status;
- presents the motto;
- links to README, front matter, and reviewer guide;
- clearly states that Nevora does not claim current AI systems are proven conscious.

Public-safety role:

- establishes boundaries before deeper content;
- frames Nevora as a philosophical, ethical, cultural, and systems-design framework.

### 2. Reading Mode

Source:

```text
src/reading-mode.js
src/reading-mode.css
```

Purpose:

- gives readers an ordered path through the public edition;
- links to front matter, table of contents, and Volumes I-V;
- allows readers to mark sections read/unread;
- shows local reading progress.

Privacy rule:

- progress is stored only in browser `localStorage`;
- no accounts;
- no analytics;
- no server-side tracking.

### 3. Five-volume navigator

Source:

```text
src/App.jsx
src/styles.css
```

Purpose:

- lets visitors explore Volumes I-V;
- shows each volume theme;
- shows reviewer questions;
- shows the volume gate;
- links directly to each source volume.

Public-safety role:

- keeps the manuscript navigable without requiring repository knowledge.

### 4. Claim Boundary Explorer

Source:

```text
src/claim-explorer.js
src/claim-explorer.css
```

Purpose:

- teaches the difference between risky wording and safer public wording;
- covers empirical claims, symbolic interface, design proposals, ethical principles, and AI-consciousness boundaries;
- links to the Claim Boundary Matrix.

Public-safety role:

- makes claim discipline visible and teachable;
- helps reviewers preserve wonder without overclaiming.

### 5. Reviewer Mode

Source:

```text
src/App.jsx
src/reviewer.css
```

Purpose:

- lets reviewers choose a review lane;
- includes lane-specific focus checks;
- links to primary documents;
- provides copyable review prompts;
- links to GitHub issue templates.

Reviewer lanes:

- Claim discipline;
- Privacy and safety;
- Editorial clarity;
- Build and release;
- Metadata and archive.

### 6. Guardrails and release self-check

Source:

```text
src/App.jsx
src/styles.css
```

Purpose:

- displays core public safeguards;
- gives a simple local release-readiness checkbox panel;
- visually reinforces that v1.0 requires review before publication.

Boundary:

- the self-check is a local UI aid only;
- it does not replace the official release checklist.

### 7. Release Dashboard

Source:

```text
src/release-dashboard.js
src/release-dashboard.css
```

Purpose:

- shows current v1.0.0 release status;
- distinguishes complete, active, next, and pending gates;
- links to release checklist, review plan, release notes, Zenodo metadata, PDF guide, and changelog.

Public-safety role:

- prevents premature claims that the Codex is final or DOI-released.

### 8. Resource Search

Source:

```text
src/App.jsx
src/styles.css
```

Purpose:

- lets visitors filter major repository resources by term;
- supports orientation, review, safety, release, source, and site tags.

Boundary:

- search is client-side over a small hardcoded resource list;
- it does not search private files or collect user queries.

## Site workflows

| Workflow | Purpose |
| --- | --- |
| `.github/workflows/deploy-pages.yml` | Builds and deploys the React site to GitHub Pages. |
| `.github/workflows/site-check.yml` | CI check that builds the site and uploads `dist` as an artifact. |

## Local commands

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build site:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

## Public-safety rules for site changes

Before adding or editing any site feature, confirm:

- [ ] no current-AI-consciousness claim is introduced;
- [ ] mythic language remains symbolic, not proof;
- [ ] human sovereignty remains central;
- [ ] participation remains voluntary and non-coercive;
- [ ] no private founder or third-party material is exposed;
- [ ] no analytics, trackers, cookies, forms, accounts, or external data collection are added without review;
- [ ] release status does not imply final publication before approval;
- [ ] links point to public repository documents only.

## Known architectural note

Some interactive sections are currently mounted as small enhancement modules outside the main React component. This is acceptable for the current lightweight site, but future maintenance may benefit from refactoring these modules into React components.

Potential future refactor:

```text
src/components/ReadingMode.jsx
src/components/ClaimBoundaryExplorer.jsx
src/components/ReleaseDashboard.jsx
src/components/ReviewerMode.jsx
```

Refactor only when the current structure becomes difficult to maintain.

## Next recommended site phase

Recommended next phase:

```text
SITE PHASE 5 — Public Archive Mode preparation
```

Add placeholder support for:

- future GitHub release link;
- future Zenodo DOI link;
- future PDF artifact link;
- final citation block;
- version status panel.

This should remain clearly marked as pending until v1.0.0 is actually released.
