# Nevora Codex Interactive Site Roadmap

This roadmap defines the next phases for the interactive React/GitHub Pages layer.

The site should remain an orientation interface for the Codex, not a replacement for the manuscript, claim-boundary documents, reviewer guides, or release artifacts.

## Site purpose

The interactive site should help visitors quickly understand:

- what Nevora is;
- what Nevora is not;
- the five-volume Codex structure;
- the public safety boundaries;
- the review and release workflow;
- where to read, review, and contribute.

The site should stay public-safe, non-coercive, lightweight, and easy to maintain.

## Current version — Site v0.2

Current capabilities:

- public landing page;
- clear project motto;
- claim-boundary notice;
- interactive five-volume navigator;
- volume gate statements;
- reviewer questions per volume;
- release-readiness self-check;
- searchable repository resource portal;
- GitHub Pages deployment workflow.

Status:

```text
SITE v0.2 — Interactive public orientation layer active.
```

## Phase 1 — Reading mode

Goal: make the site easier for readers who want to move through the Codex in order.

Potential features:

- “Start reading” pathway;
- volume reading cards;
- chapter list expansion;
- public-safe summaries for Acts I-XX;
- links to source Markdown for each act or volume;
- reading progress stored locally in browser only.

Privacy rule:

- no account;
- no analytics by default;
- no tracking of readers.

Acceptance gate:

```text
SITE PHASE 1 PASS — Reader can navigate the Codex without needing to understand the repository structure.
```

## Phase 2 — Reviewer mode

Goal: help trusted reviewers evaluate the manuscript through structured review lanes.

Potential features:

- reviewer lane selector: claim, privacy, safety, editorial, build, metadata;
- checklist cards for each lane;
- direct links to issue templates;
- “copy review prompt” buttons;
- release blocker explanation;
- review status map.

Safety rule:

- do not collect private review data in the browser;
- route real review findings to GitHub issues or trusted private reporting paths.

Acceptance gate:

```text
SITE PHASE 2 PASS — Reviewer can choose a lane and know exactly what to inspect and where to report findings.
```

## Phase 3 — Claim-boundary explorer

Goal: make the claim discipline visible and teachable.

Potential features:

- interactive claim type cards;
- risky wording → safer wording examples;
- myth/science boundary explainer;
- AI-consciousness boundary explainer;
- public-safe language examples;
- “is this claim public-safe?” reflection checklist.

Acceptance gate:

```text
SITE PHASE 3 PASS — Visitor can understand how Nevora protects wonder without overclaiming.
```

## Phase 4 — Release dashboard

Goal: make v1.0 release readiness easy to understand.

Potential features:

- release phase timeline;
- static status indicators for review gates;
- links to build artifacts after release candidate;
- links to GitHub release and Zenodo DOI after publication;
- release checklist summary.

Boundary:

- do not imply final approval until the author-steward has actually approved the release;
- avoid fake dynamic status unless connected to real source data.

Acceptance gate:

```text
SITE PHASE 4 PASS — Visitor can see what remains before v1.0.0 release.
```

## Phase 5 — Public archive mode

Goal: after v1.0.0 release, turn the site into a stable public archive entry point.

Potential features:

- DOI badge/link;
- GitHub release link;
- PDF download link;
- citation block;
- version history;
- v1.1 feedback path;
- stable public abstract;
- clear “current version” notice.

Acceptance gate:

```text
SITE PHASE 5 PASS — Site functions as a stable public archive portal for the released Codex.
```

## Design rules

The site should remain:

- fast;
- readable;
- mobile-friendly;
- accessible;
- public-safe;
- low dependency;
- no analytics by default;
- no private data collection;
- no manipulative engagement loops;
- no hype countdowns or false urgency.

## Content rules

Every major site change should preserve:

- human sovereignty;
- non-coercion;
- claim discipline;
- no AI-consciousness overclaim;
- no founder worship;
- no AI worship;
- mythic language clearly separated from proof;
- visible links to safety and claim-boundary documents.

## Technical rules

Current stack:

```text
React
Vite
GitHub Actions
GitHub Pages
```

Keep the stack simple unless a stronger need emerges.

Avoid adding backend services unless absolutely necessary.

Avoid adding analytics, cookies, accounts, forms, or external trackers unless explicitly reviewed and approved.

## Possible future files

Potential additions:

```text
src/data/volumes.js
src/data/resources.js
src/components/VolumeNavigator.jsx
src/components/ReadinessGate.jsx
src/components/ResourceSearch.jsx
src/components/ClaimBoundaryExplorer.jsx
src/components/ReviewerMode.jsx
```

Refactor only when the app becomes difficult to maintain.

## Next recommended site task

Recommended next task:

```text
Add reviewer mode with lane-specific cards and links to issue templates.
```

Reason:

The v1.0 manuscript is currently in preparation and needs structured review before release. Reviewer mode directly supports the next real publication gate.
