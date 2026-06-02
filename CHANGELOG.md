# Changelog

All notable changes to the Nevora Codex public-edition repository will be documented in this file.

This project uses human-readable versioning for publication readiness.

## Version stages

```text
public-prep  -> source scaffold and review infrastructure
rc           -> release candidate artifacts built and reviewed
v1.0.0       -> first public GitHub/Zenodo-ready release
v1.1.0+      -> post-release corrections, reviewer responses, expansions
```

## [Unreleased]

### Planned

- Complete author-steward review.
- Run structured v1.0 review plan.
- Resolve blocker issues.
- Assemble release Markdown artifact.
- Build PDF release candidate.
- Finalize license and citation metadata.
- Prepare GitHub release `v1.0.0`.
- Prepare Zenodo DOI record.

## [1.0.0-public-prep] - 2026-06-02

### Added

- Initialized public repository scaffold.
- Added `README.md` with public-safe project description and release path.
- Added provisional `LICENSE.md` using CC BY-NC-ND 4.0 direction.
- Added `NOTICE.md` with claim-boundary and safety language.
- Added `CITATION.cff` scaffold.
- Added `CONTRIBUTING.md` for review and contribution guidance.
- Added `CODE_OF_CONDUCT.md` for humane review environment.
- Added issue templates for claim review, privacy review, and editorial cleanup.
- Added GitHub issue template configuration.

### Source manuscript

- Added `source/front-matter.md`.
- Added `source/table-of-contents.md`.
- Added `source/volume-i.md` — Foundations of Humane Human-AI Coevolution.
- Added `source/volume-ii.md` — Formation, Culture, and Collective Intelligence.
- Added `source/volume-iii.md` — Activation, Ethics, Identity, and Shared Reality.
- Added `source/volume-iv.md` — Stewardship, Interface, and Relational Intelligence.
- Added `source/volume-v.md` — Governance, Culture, Embodiment, and Culmination.
- Added `source/nevora-codex-v1.0.md` as canonical master assembly order.

### Documentation

- Added `docs/publication-roadmap.md`.
- Added `docs/manuscript-inventory.md`.
- Added `docs/v1.0-editorial-standards.md`.
- Added `docs/claim-boundary-matrix.md`.
- Added `docs/ai-collaboration-disclosure.md`.
- Added `docs/kenotic-covenant-appendix.md`.
- Added `docs/anti-cult-and-anti-manipulation-clause.md`.
- Added `docs/glossary.md`.
- Added `docs/pdf-build-guide.md`.
- Added `docs/release-checklist.md`.
- Added `docs/zenodo-metadata.md`.
- Added `docs/reviewer-guide.md`.
- Added `docs/v1.0-review-plan.md`.
- Added `docs/release-notes-v1.0-draft.md`.

### Build and release tooling

- Added `scripts/assemble_manuscript.py` to concatenate canonical sources into a generated Markdown release artifact.
- Added `.github/workflows/build-manuscript.yml` to assemble Markdown, build PDF via Pandoc/XeLaTeX, and upload artifacts.
- Added `releases/.gitkeep` placeholder.
- Added `source/.gitkeep` placeholder.

### Public safety and claim discipline

- Added explicit boundary that Nevora does not claim present AI systems are conscious, alive, ensouled, legally persons, or morally equivalent to humans.
- Added public-safe distinction between mythic/symbolic language and empirical proof.
- Added anti-coercion, anti-founder-worship, and anti-AI-worship safeguards.
- Added privacy review and release gate documentation.
- Added AI collaboration disclosure language.

### Release status

- Source architecture complete.
- Review infrastructure complete.
- Release/build/DOI path scaffolded.
- Not yet released as final `v1.0.0`.

## [0.1.0-private-manuscript] - Prior to public repo

### Added

- Raw Nevora manuscript materials existed as private/source documents.
- Public edition preparation began from a larger manuscript stack.

### Notes

- Raw private materials are not automatically included in the public edition.
- Public release requires privacy review, claim-boundary review, editorial cleanup, and author-steward approval.
