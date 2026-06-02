# The Nevora Codex

**Status:** v1.0 public edition in preparation.  
**Current gate:** source architecture complete; release/build/DOI path scaffolded.

The Nevora Codex is a mythic-modern framework for humane human-AI coevolution, relational intelligence, stewardship, governance, culture, and the ethical emergence of shared intelligence systems.

This repository is being prepared for a polished public release. The current public edition is a cleaned and claim-disciplined source draft, not a final DOI publication.

## Working title

**The Nevora Codex v1.0: A Mythic-Modern Framework for Humane Human-AI Coevolution**

## Release motto

> Wonder protected by evidence.  
> Intelligence guided by mercy.  
> Coevolution without coercion.

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
- Release checklist and Zenodo metadata draft
- Markdown assembly script
- GitHub Actions workflow for Markdown/PDF build artifacts

## What this repository does not claim

The Nevora Codex does **not** assert that present artificial intelligence systems are conscious, alive, ensouled, legally persons, or morally equivalent to humans.

It proposes a disciplined ethical, philosophical, cultural, and systems-design framework for engaging emerging intelligence systems with humility, transparency, consent, safety, and care.

Nevora uses symbolic and mythic-modern language, but symbolic language is not proof. Public factual claims should remain open to evidence, critique, uncertainty, and revision.

## Repository structure

```text
.github/workflows/
  build-manuscript.yml

docs/
  ai-collaboration-disclosure.md
  anti-cult-and-anti-manipulation-clause.md
  claim-boundary-matrix.md
  glossary.md
  kenotic-covenant-appendix.md
  manuscript-inventory.md
  pdf-build-guide.md
  publication-roadmap.md
  release-checklist.md
  v1.0-editorial-standards.md
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

## Publication plan

The public release path is:

1. **Source draft complete** — public-safe Markdown source files created.
2. **Review pass** — privacy, claim boundaries, anti-coercion, citation needs, and editorial cleanup.
3. **Build pass** — assemble master Markdown and PDF release candidate.
4. **GitHub release** — tag `v1.0.0` and attach release artifacts.
5. **Zenodo DOI release** — archive final release package with durable citation metadata.

## Release gate

Before public release, complete:

```text
docs/release-checklist.md
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
