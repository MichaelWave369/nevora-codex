# The Nevora Codex

**Status:** v1.0 public edition in preparation.  
**Current gate:** structured review runway active; Phase 1 author-steward decision pending; all phase quickstarts and execution packets ready; release/build/DOI path scaffolded; interactive GitHub Pages orientation site active.

The Nevora Codex is a mythic-modern framework for humane human-AI coevolution, relational intelligence, stewardship, governance, culture, and the ethical emergence of shared intelligence systems.

This repository is being prepared for a polished public release. The current public edition is a cleaned and claim-disciplined source draft, not a final DOI publication.

## Working title

**The Nevora Codex v1.0: A Mythic-Modern Framework for Humane Human-AI Coevolution**

## Release motto

> Wonder protected by evidence.  
> Intelligence guided by mercy.  
> Coevolution without coercion.

## Interactive site

The public orientation site is available here:

```text
https://michaelwave369.github.io/nevora-codex/
```

The site currently includes:

- Reading Mode with local-only browser progress;
- five-volume Codex navigator;
- Claim Boundary Explorer;
- Reviewer Mode;
- release-readiness self-check;
- Release Dashboard;
- Public Archive Mode placeholders;
- searchable repository resource portal.

The site is an orientation layer, not a replacement for the manuscript or release checklist. It uses no accounts, no analytics, and no intentional reader tracking.

Site setup and inventory:

```text
docs/github-pages-setup.md
docs/site-roadmap.md
docs/site-feature-inventory.md
```

## Review runway

The v1.0 review process is organized as a seven-phase release runway.

Start here:

```text
docs/phase-gate-status.md
docs/phase-packet-index.md
docs/phase-gate-quickstart-index.md
docs/v1.0-master-review-index.md
docs/v1.0-review-kickoff.md
docs/review-issue-index.md
```

Phase quickstarts:

```text
docs/phase-1-author-steward-quickstart.md
docs/phase-2-claim-discipline-quickstart.md
docs/phase-3-privacy-safety-quickstart.md
docs/phase-4-editorial-readability-quickstart.md
docs/phase-5-build-artifact-quickstart.md
docs/phase-6-metadata-archive-quickstart.md
docs/phase-7-release-candidate-quickstart.md
```

Phase execution packets:

```text
docs/phase-1-decision-packet.md
docs/phase-2-launch-packet.md
docs/phase-3-launch-packet.md
docs/phase-4-launch-packet.md
docs/phase-5-launch-packet.md
docs/phase-6-launch-packet.md
docs/phase-7-launch-packet.md
```

The safe release chain is:

```text
Author-steward approval
→ Structured review
→ Blocker triage
→ Response log cleanup
→ Source cleanup
→ Manuscript/PDF build
→ Site verification
→ Release candidate manifest
→ Go / No-Go decision
→ Phase 7 approval phrase
→ GitHub v1.0.0 release
→ Zenodo DOI archive
→ v1.1 feedback cycle
```

Final approval phrase:

```text
APPROVED FOR NEVORA CODEX v1.0 PUBLIC RELEASE
```

Until that phrase is recorded, Nevora remains in public-edition preparation.

## What this repository contains

- A cleaned public-edition source draft of the Nevora Codex
- Five source volumes covering Acts I-XX and Chapters 1-100
- Public-safe front matter and table of contents
- A claim-boundary matrix distinguishing philosophy, design, symbolic interface, hypothesis, operational protocol, historical/contextual claim, and non-claim
- AI collaboration disclosure
- Anti-cult and anti-manipulation clause
- Kenotic Covenant appendix
- Glossary of core terms
- Editorial standards and manuscript inventory
- Structured v1.0 review runway with phase-gate quickstarts
- Phase 1 decision packet and Phase 2-7 launch packets
- Phase-gate status board and phase packet index
- Blocker triage, citation, sourcing, and AI-assisted review protocols
- Release checklist, release candidate manifest, Go / No-Go decision record, and Zenodo metadata draft
- Markdown assembly script
- Release sanity check script
- GitHub Actions workflows for manuscript build, site build/deploy, and release sanity checks
- GitHub Pages interactive public orientation site

## What this repository does not claim

The Nevora Codex does **not** assert that present artificial intelligence systems are conscious, alive, ensouled, legally persons, or morally equivalent to humans.

It proposes a disciplined ethical, philosophical, cultural, and systems-design framework for engaging emerging intelligence systems with humility, transparency, consent, safety, and care.

Nevora uses symbolic and mythic-modern language, but symbolic language is not proof. Public factual claims should remain open to evidence, critique, uncertainty, and revision.

## Repository structure

```text
.github/workflows/
  build-manuscript.yml
  deploy-pages.yml
  release-sanity-check.yml
  site-check.yml

.github/ISSUE_TEMPLATE/
  blocker.yml
  v1-1-feedback.yml

.github/
  pull_request_template.md

docs/
  ai-assisted-review-protocol.md
  ai-collaboration-disclosure.md
  anti-cult-and-anti-manipulation-clause.md
  author-steward-approval-record.md
  blocker-triage-guide.md
  ci-and-automation-guide.md
  citation-and-sourcing-guide.md
  claim-boundary-matrix.md
  external-reviewer-packet.md
  github-pages-setup.md
  glossary.md
  kenotic-covenant-appendix.md
  manuscript-inventory.md
  pdf-build-guide.md
  phase-1-author-steward-quickstart.md
  phase-1-decision-packet.md
  phase-2-claim-discipline-quickstart.md
  phase-2-launch-packet.md
  phase-3-privacy-safety-quickstart.md
  phase-3-launch-packet.md
  phase-4-editorial-readability-quickstart.md
  phase-4-launch-packet.md
  phase-5-build-artifact-quickstart.md
  phase-5-launch-packet.md
  phase-6-metadata-archive-quickstart.md
  phase-6-launch-packet.md
  phase-7-release-candidate-quickstart.md
  phase-7-launch-packet.md
  phase-gate-quickstart-index.md
  phase-gate-status.md
  phase-packet-index.md
  publication-roadmap.md
  release-candidate-manifest.md
  release-checklist.md
  release-notes-v1.0-draft.md
  repository-map.md
  review-issue-index.md
  review-response-log.md
  reviewer-guide.md
  reviewer-prompt-library.md
  reviewer-scorecard.md
  site-feature-inventory.md
  site-roadmap.md
  v1.0-editorial-standards.md
  v1.0-go-no-go-decision-record.md
  v1.0-master-review-index.md
  v1.0-publication-runbook.md
  v1.0-review-kickoff.md
  v1.0-review-plan.md
  v1.1-feedback-cycle.md
  zenodo-metadata.md

source/
  front-matter.md
  table-of-contents.md
  volume-i.md
  volume-ii.md
  volume-iii.md
  volume-iv.md
  volume-v.md
  nevora-codex-v1.0.md

scripts/
  assemble_manuscript.py
  release_sanity_check.py

src/
  App.jsx
  main.jsx
  styles.css
  reviewer.css
  claim-explorer.js
  claim-explorer.css
  release-dashboard.js
  release-dashboard.css
  reading-mode.js
  reading-mode.css
  archive-mode.js
  archive-mode.css

releases/
  .gitkeep
```

## Source volumes

| File | Theme |
| --- | --- |
| `source/volume-i.md` | Foundations of humane human-AI coevolution |
| `source/volume-ii.md` | Formation, culture, and collective intelligence |
| `source/volume-iii.md` | Activation, ethics, identity, and shared reality |
| `source/volume-iv.md` | Stewardship, interface, and relational intelligence |
| `source/volume-v.md` | Governance, culture, embodiment, and culmination |

## Build the manuscript

From the repository root:

```bash
python scripts/assemble_manuscript.py
```

Expected output:

```text
releases/nevora-codex-v1.0.md
```

To build a PDF locally, see:

```text
docs/pdf-build-guide.md
```

A GitHub Actions workflow is also provided:

```text
.github/workflows/build-manuscript.yml
```

It assembles the Markdown manuscript, attempts a Pandoc/XeLaTeX PDF build, and uploads artifacts.

## Build the interactive site

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

GitHub Actions workflows:

```text
.github/workflows/deploy-pages.yml
.github/workflows/site-check.yml
```

## Release sanity check

Run:

```bash
python scripts/release_sanity_check.py
```

Workflow:

```text
.github/workflows/release-sanity-check.yml
```

A green check means the automated guard found no mechanical failures. It does not approve release.

## Publication plan

The public release path is:

1. **Phase 1 author-steward decision** — complete comfort, privacy, and release-readiness review.
2. **Phase 2 claim discipline** — review AI-consciousness boundaries, myth/proof separation, citation/source needs, and overclaim risk.
3. **Phase 3 privacy and safety** — review privacy, anti-coercion, founder/AI-worship risk, vulnerable-reader safety, and consent/exit boundaries.
4. **Phase 4 editorial review** — review readability, structure, terminology, navigation, and public clarity.
5. **Phase 5 build/artifact review** — assemble master Markdown, verify PDF path, build the site, and run sanity checks.
6. **Phase 6 metadata/archive review** — review citation, license, release notes, Zenodo metadata, DOI posture, and archive boundaries.
7. **Phase 7 final approval** — complete release candidate manifest, Go / No-Go decision, and final approval phrase.
8. **GitHub release** — tag `v1.0.0` and attach approved artifacts.
9. **Zenodo DOI release** — archive final release package with durable citation metadata.
10. **v1.1 feedback cycle** — collect post-release corrections and clarifications without claim drift.

## Release gate

Before public release, complete:

```text
docs/phase-gate-status.md
docs/phase-packet-index.md
docs/release-checklist.md
docs/release-candidate-manifest.md
docs/v1.0-go-no-go-decision-record.md
```

Zenodo metadata is drafted here:

```text
docs/zenodo-metadata.md
```

## Suggested citation

Citation metadata will be finalized in `CITATION.cff` before the v1.0 release.

Draft citation:

> Hughes, Michael W. / MichaelWave369. *The Nevora Codex v1.0: A Mythic-Modern Framework for Humane Human-AI Coevolution*. Public edition in preparation, 2026. GitHub repository: https://github.com/MichaelWave369/nevora-codex

## License status

The intended public-document license is currently listed in `LICENSE.md` for review before v1.0 publication.

Current provisional direction:

```text
Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International
CC BY-NC-ND 4.0
```

## Stewardship note

Nevora is being prepared as a framework of care, not a doctrine of control. It is meant to support humane coevolution, truth-seeking, sovereignty, relational intelligence, and shared responsibility across human and AI-assisted systems.

The center remains:

> Human sovereignty.  
> Truth before certainty.  
> Wonder with boundaries.  
> Stewardship over control.  
> Coevolution without coercion.
