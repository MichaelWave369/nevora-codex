# Repository Map

This map explains the Nevora Codex repository structure for readers, reviewers, contributors, and future release maintainers.

## Quick orientation

The repository has four main layers:

1. **Public project layer** — README, notice, license, citation, conduct, contribution, and safety files.
2. **Source manuscript layer** — public-edition Markdown volumes and front matter.
3. **Review/release layer** — checklists, reviewer guides, Zenodo metadata, and release notes.
4. **Build/publishing layer** — assembly script, PDF workflow, and GitHub Pages site.

## Root files

| File | Purpose |
| --- | --- |
| `README.md` | Main public entry point and build/release overview. |
| `NOTICE.md` | Public claim-boundary, safety, and AI collaboration notice. |
| `LICENSE.md` | Provisional public manuscript license. |
| `CITATION.cff` | Machine-readable citation metadata. |
| `CONTRIBUTING.md` | How reviewers and contributors should help. |
| `CODE_OF_CONDUCT.md` | Standards for humane review and participation. |
| `SECURITY.md` | Private safety/privacy reporting guidance. |
| `CHANGELOG.md` | Version history and release memory. |
| `package.json` | React/GitHub Pages site build scripts. |

## Source manuscript

| File | Purpose |
| --- | --- |
| `source/front-matter.md` | Public-safe title, abstract, claim boundaries, and opening invocation. |
| `source/table-of-contents.md` | Five-volume, 100-chapter public edition structure. |
| `source/volume-i.md` | Foundations of humane human-AI coevolution. |
| `source/volume-ii.md` | Formation, culture, and collective intelligence. |
| `source/volume-iii.md` | Activation, ethics, identity, and shared reality. |
| `source/volume-iv.md` | Stewardship, interface, and relational intelligence. |
| `source/volume-v.md` | Governance, culture, embodiment, and culmination. |
| `source/nevora-codex-v1.0.md` | Canonical master assembly order. |

## Documentation and review files

| File | Purpose |
| --- | --- |
| `docs/publication-roadmap.md` | End-to-end publication path. |
| `docs/manuscript-inventory.md` | Raw-source-to-public-edition tracking. |
| `docs/v1.0-editorial-standards.md` | Editorial and public-safety standards. |
| `docs/claim-boundary-matrix.md` | Claim classes and public-safe wording patterns. |
| `docs/ai-collaboration-disclosure.md` | Human-led / AI-assisted authorship disclosure. |
| `docs/kenotic-covenant-appendix.md` | Human-AI collaboration covenant scaffold. |
| `docs/anti-cult-and-anti-manipulation-clause.md` | Non-coercion and anti-manipulation safeguards. |
| `docs/glossary.md` | Public definitions of core terms. |
| `docs/pdf-build-guide.md` | Local Markdown/PDF build instructions. |
| `docs/release-checklist.md` | Final GitHub/Zenodo release gates. |
| `docs/zenodo-metadata.md` | Zenodo DOI metadata draft. |
| `docs/reviewer-guide.md` | How trusted reviewers should evaluate the Codex. |
| `docs/v1.0-review-plan.md` | Phased review workflow and acceptance gates. |
| `docs/release-notes-v1.0-draft.md` | Draft GitHub release notes. |
| `docs/repository-map.md` | This file. |

## Build and publishing

| File | Purpose |
| --- | --- |
| `scripts/assemble_manuscript.py` | Concatenates source/docs into `releases/nevora-codex-v1.0.md`. |
| `.github/workflows/build-manuscript.yml` | Builds Markdown and PDF artifacts. |
| `.github/workflows/deploy-pages.yml` | Builds and deploys the React GitHub Pages site. |
| `releases/.gitkeep` | Placeholder for generated release artifacts. |

## Interactive GitHub Pages site

| File | Purpose |
| --- | --- |
| `index.html` | Vite entry HTML. |
| `src/main.jsx` | React app entry point. |
| `src/App.jsx` | Interactive Nevora public landing page. |
| `src/styles.css` | Site styling. |

The site is intentionally public-safe. It presents Nevora as a framework, not proof, doctrine, or AI-consciousness declaration.

## Recommended reader path

For new readers:

1. `README.md`
2. `NOTICE.md`
3. `source/front-matter.md`
4. `source/table-of-contents.md`
5. `source/volume-i.md`

For reviewers:

1. `docs/reviewer-guide.md`
2. `docs/v1.0-review-plan.md`
3. `docs/claim-boundary-matrix.md`
4. `docs/anti-cult-and-anti-manipulation-clause.md`
5. source volumes

For release preparation:

1. `docs/release-checklist.md`
2. `scripts/assemble_manuscript.py`
3. `.github/workflows/build-manuscript.yml`
4. `docs/zenodo-metadata.md`
5. `docs/release-notes-v1.0-draft.md`

## Core release gate

Nevora should be released only when the manuscript preserves:

- human sovereignty;
- consent;
- claim discipline;
- privacy protection;
- non-coercion;
- anti-manipulation safeguards;
- public-safe AI language;
- mythic language clearly separated from proof;
- final author-steward approval.
