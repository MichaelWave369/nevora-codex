# PDF Build Guide

This guide explains how to assemble the Nevora Codex v1.0 manuscript and convert it into a PDF release artifact.

## Build stages

The release build has two stages:

1. Assemble source Markdown files into one master Markdown file.
2. Convert the master Markdown file into a PDF.

## Stage 1 — Assemble Markdown

From the repository root:

```bash
python scripts/assemble_manuscript.py
```

Expected output:

```text
releases/nevora-codex-v1.0.md
```

## Stage 2 — Convert Markdown to PDF

Recommended tool:

```text
pandoc
```

Example command:

```bash
pandoc releases/nevora-codex-v1.0.md \
  -o releases/nevora-codex-v1.0.pdf \
  --pdf-engine=xelatex \
  --toc \
  --number-sections \
  -V geometry:margin=1in \
  -V mainfont="DejaVu Serif" \
  -V monofont="DejaVu Sans Mono"
```

## GitHub Actions build

A workflow file is provided at:

```text
.github/workflows/build-manuscript.yml
```

It assembles the Markdown manuscript and attempts to build a PDF artifact using Pandoc.

The workflow can be run manually from the GitHub Actions tab.

## Release artifact checklist

Before publishing a PDF release, confirm:

- [ ] `releases/nevora-codex-v1.0.md` was freshly generated.
- [ ] `releases/nevora-codex-v1.0.pdf` builds successfully.
- [ ] Table of contents renders correctly.
- [ ] Chapter headings are consistent.
- [ ] Appendix headings are consistent.
- [ ] Links work where possible.
- [ ] No private raw manuscript text slipped into the public edition.
- [ ] Claim-boundary notices remain visible.
- [ ] AI collaboration disclosure remains visible.
- [ ] License and citation metadata are present.

## Notes

The first PDF build is a release candidate, not the final publication. It should be reviewed visually before GitHub release or Zenodo upload.
