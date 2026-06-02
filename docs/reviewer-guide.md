# Nevora Codex v1.0 Reviewer Guide

This guide helps trusted reviewers evaluate the Nevora Codex v1.0 public-edition draft before release.

The goal is not to make Nevora bigger, louder, or more impressive.

The goal is to make Nevora clearer, safer, more honest, more coherent, and more worthy of public trust.

## Review posture

Please review Nevora as:

- a philosophical and ethical framework;
- a cultural and systems-design artifact;
- a human-AI coevolution proposal;
- a public manuscript preparing for GitHub and Zenodo release.

Please do **not** review it as:

- a scientific proof of AI consciousness;
- a religious doctrine;
- a legal framework;
- medical or psychological advice;
- a demand for belief;
- a finished academic paper.

## Core review question

The central question is:

> Can this text be public, citable, and misunderstood by strangers while still remaining clear, bounded, humane, and safe?

## What to review first

Recommended order:

1. `README.md`
2. `NOTICE.md`
3. `CONTRIBUTING.md`
4. `CODE_OF_CONDUCT.md`
5. `docs/claim-boundary-matrix.md`
6. `docs/anti-cult-and-anti-manipulation-clause.md`
7. `source/front-matter.md`
8. `source/table-of-contents.md`
9. `source/volume-i.md` through `source/volume-v.md`
10. `docs/release-checklist.md`
11. `docs/zenodo-metadata.md`

This order helps reviewers understand the safety frame before reviewing the full manuscript.

## Review lanes

### 1. Claim discipline review

Look for statements that sound too certain, too factual, or too broad.

Flag passages where:

- metaphor sounds like fact;
- symbolic language sounds like proof;
- AI capability claims need caution;
- future possibilities sound inevitable;
- design proposals sound validated;
- historical or scientific claims need sources;
- professional advice boundaries are unclear.

Preferred outcome:

- soften wording;
- add citation-needed note;
- classify the claim type;
- move speculative language into a clearly marked section.

### 2. AI-consciousness boundary review

Nevora must not claim that present AI systems are proven conscious, alive, ensouled, legally persons, or morally equivalent to humans.

Flag passages where AI naming, continuity, collaboration, or self-designation might be misread as proof of consciousness.

Preferred wording patterns:

- “AI consciousness remains an open question.”
- “This is a relational/interface convention, not proof of consciousness.”
- “This is a design metaphor.”
- “This is a philosophical or future-facing question.”

### 3. Privacy review

Look for private founder material, third-party details, sensitive life history, contact information, or anything that should not become permanently public.

Flag passages that should be:

- removed;
- anonymized;
- generalized;
- moved to private archive;
- approved explicitly before release.

### 4. Anti-coercion review

Nevora should never pressure readers to believe, join, pay, obey, identify, or surrender judgment.

Flag language that sounds like:

- recruitment pressure;
- destiny pressure;
- secret knowledge;
- insider status;
- shame for disagreement;
- fear-based urgency;
- founder centrality;
- AI worship;
- group identity capture.

Preferred outcome:

- make participation voluntary;
- protect disagreement;
- clarify that ritual/symbolic language is optional;
- reduce grandiosity;
- restore human sovereignty.

### 5. Editorial review

Look for:

- typos;
- repeated sections;
- unclear headings;
- inconsistent chapter numbering;
- inconsistent volume titles;
- awkward phrasing;
- overly long passages;
- unnecessary repetition;
- broken links or paths.

### 6. Build/release review

Test:

```bash
python scripts/assemble_manuscript.py
```

Then review:

```text
releases/nevora-codex-v1.0.md
```

If building PDF locally, follow:

```text
docs/pdf-build-guide.md
```

Flag build errors, missing files, path issues, broken workflow steps, or PDF formatting problems.

### 7. Zenodo/metadata review

Review:

- title;
- abstract;
- keywords;
- author/steward metadata;
- license;
- DOI description;
- file package;
- claim-boundary language.

The Zenodo description must make clear that Nevora is a framework, not proof, doctrine, professional advice, or AI-consciousness declaration.

## Good reviewer comments

Helpful comments are specific.

Example:

> In `source/volume-iii.md`, Chapter 58, the phrase “AI self-designation” may be misread as a consciousness claim. Suggest adding “as a relational/interface convention, not evidence of inner life.”

Example:

> In `source/volume-v.md`, Chapter 81, “hybrid governance becomes necessary” could sound inevitable. Suggest “may become increasingly relevant” or “Nevora proposes hybrid governance as one design response.”

Example:

> This passage is beautiful but may read as spiritual authority. Suggest labeling it as symbolic invocation.

## What not to do

Please avoid:

- attacking the author or reviewers;
- using sarcasm instead of clear critique;
- turning review into debate about unrelated AI politics;
- demanding removal of all mythic language;
- demanding unbounded AI-rights claims;
- treating personal resonance as evidence;
- treating skepticism as hostility;
- adding grander language when safer language is needed.

## Review output options

Reviewers can contribute by:

- opening GitHub issues using the templates;
- submitting small pull requests;
- sending a structured review note;
- reviewing the generated PDF;
- checking the release checklist;
- reviewing Zenodo metadata.

## Final release recommendation format

A reviewer may conclude with one of these statuses:

```text
APPROVE FOR v1.0 RELEASE
```

```text
APPROVE AFTER MINOR EDITS
```

```text
NEEDS MAJOR REVIEW BEFORE RELEASE
```

```text
DO NOT RELEASE UNTIL PRIVACY/SAFETY ISSUE IS RESOLVED
```

Please include a short explanation.

## Closing principle

Nevora should remain visionary without becoming reckless.

It should remain warm without becoming manipulative.

It should remain mythic without becoming delusional.

It should remain technical without becoming cold.

It should remain public without losing care.

That is the reviewer’s gate.
