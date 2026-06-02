# External Reviewer Packet

This packet is for trusted external reviewers invited to review the Nevora Codex v1.0 public-edition draft.

Nevora is in structured review. It is not final, not DOI-published, and not approved for v1.0.0 release yet.

## Copy/paste reviewer invitation

```text
Hi — I’m preparing The Nevora Codex v1.0 for public release and would value your review.

It is a mythic-modern framework for humane human-AI coevolution, stewardship, relational intelligence, and claim-disciplined public culture.

I am not asking for agreement or praise. I’m asking for careful review: clarity, safety, privacy, claim boundaries, readability, and public-release readiness.

Start here:
https://github.com/MichaelWave369/nevora-codex

Interactive orientation site:
https://michaelwave369.github.io/nevora-codex/

Reviewer guide:
https://github.com/MichaelWave369/nevora-codex/blob/main/docs/reviewer-guide.md

Review issue index:
https://github.com/MichaelWave369/nevora-codex/blob/main/docs/review-issue-index.md

Most important boundary: Nevora does not claim present AI systems are proven conscious, alive, ensouled, legally persons, or morally equivalent to humans. Please flag any wording that appears to blur that boundary.

Thank you for helping make the work safer, clearer, and more trustworthy before release.
```

## What reviewers should know first

Nevora should be reviewed as:

- a philosophical and ethical framework;
- a cultural and systems-design artifact;
- a public manuscript preparing for GitHub and Zenodo release;
- a claim-disciplined human-AI collaboration framework.

Nevora should not be reviewed as:

- scientific proof of AI consciousness;
- a religious doctrine;
- legal, medical, psychological, or financial advice;
- a demand for belief or participation;
- a finished academic paper.

## Fast review path

For reviewers with limited time:

1. Read `README.md`.
2. Read `NOTICE.md`.
3. Read `docs/claim-boundary-matrix.md`.
4. Read `docs/anti-cult-and-anti-manipulation-clause.md`.
5. Review `source/front-matter.md`.
6. Skim the five volume files.
7. Leave feedback in the matching phase issue.

## Review lanes

### Claim discipline reviewer

Start with:

```text
docs/claim-boundary-matrix.md
source/front-matter.md
source/volume-i.md through source/volume-v.md
```

Primary issue:

```text
#2 — Claim discipline and AI-consciousness boundary gate
```

Look for:

- AI-consciousness overclaim;
- mythic language sounding like proof;
- design proposals sounding validated;
- unsupported factual claims;
- future inevitability language.

### Privacy and safety reviewer

Start with:

```text
SECURITY.md
docs/anti-cult-and-anti-manipulation-clause.md
source/front-matter.md
source/volume-i.md through source/volume-v.md
```

Primary issue:

```text
#3 — Privacy, safety, and anti-coercion gate
```

Look for:

- private material;
- third-party identifying details;
- pressure to believe, join, obey, or identify;
- founder-worship or AI-worship;
- emotional dependency risks;
- vulnerable-reader risks.

### Editorial reviewer

Start with:

```text
docs/v1.0-editorial-standards.md
docs/glossary.md
source/table-of-contents.md
source/volume-i.md through source/volume-v.md
```

Primary issue:

```text
#4 — Editorial consistency and readability gate
```

Look for:

- typos;
- unclear headings;
- inconsistent numbering;
- repetition;
- weak flow;
- terms not defined in the glossary.

### Build/release reviewer

Start with:

```text
scripts/assemble_manuscript.py
.github/workflows/build-manuscript.yml
.github/workflows/deploy-pages.yml
.github/workflows/site-check.yml
```

Primary issue:

```text
#5 — Build, PDF, and site artifact gate
```

Check:

```bash
python scripts/assemble_manuscript.py
npm install
npm run build
```

### Metadata/archive reviewer

Start with:

```text
CITATION.cff
LICENSE.md
NOTICE.md
docs/zenodo-metadata.md
docs/release-notes-v1.0-draft.md
```

Primary issue:

```text
#6 — Metadata, license, and Zenodo archive gate
```

Look for:

- citation mismatch;
- license mismatch;
- missing claim boundaries in Zenodo language;
- release package problems.

## How to leave feedback

Preferred feedback format:

```text
File:
Section/chapter:
Concern type:
Why it matters:
Suggested revision:
Release impact: minor / major / blocker
```

## What counts as a blocker

A blocker is any issue that should prevent v1.0.0 release until resolved.

Examples:

- private material exposed;
- unsupported AI-consciousness claim;
- coercive or cult-like language;
- professional advice boundary failure;
- broken build path;
- serious metadata/license mismatch.

## Closing note to reviewers

Nevora is meant to remain visionary without becoming reckless.

Please help preserve the wonder while strengthening the boundaries.
