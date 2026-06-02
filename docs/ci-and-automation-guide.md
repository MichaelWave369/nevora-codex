# CI and Automation Guide

This guide explains the automated checks and build workflows used by the Nevora Codex repository.

Automation helps catch broken builds, missing release files, and obvious release-risk markers. It does not replace human review, privacy review, claim-boundary review, or author-steward approval.

## Core principle

```text
Automation guards the path. It does not approve the release.
```

## Current workflows

| Workflow | File | Purpose |
| --- | --- | --- |
| Build Manuscript | `.github/workflows/build-manuscript.yml` | Assembles the manuscript and attempts PDF artifact generation. |
| Deploy GitHub Pages | `.github/workflows/deploy-pages.yml` | Builds and deploys the interactive React/Vite site to GitHub Pages. |
| Site Check | `.github/workflows/site-check.yml` | Builds the site in CI and uploads the `dist` artifact. |
| Release Sanity Check | `.github/workflows/release-sanity-check.yml` | Runs the release sanity checker against review, manuscript, release, and governance files. |

## Local commands

Run these before release-candidate work or significant pull requests.

### Manuscript assembly

```bash
python scripts/assemble_manuscript.py
```

Expected output:

```text
releases/nevora-codex-v1.0.md
```

### Interactive site build

```bash
npm install
npm run build
```

Expected output:

```text
dist/index.html
```

### Release sanity check

```bash
python scripts/release_sanity_check.py
```

Expected result:

```text
Result: PASS
```

or:

```text
Result: PASS WITH WARNINGS
```

Warnings require human review. Failures must be resolved before release-candidate approval.

## Workflow details

### Build Manuscript

Purpose:

- confirms source manuscript files can be assembled;
- creates Markdown release artifact;
- attempts PDF build where configured;
- uploads build artifacts.

Primary files:

```text
scripts/assemble_manuscript.py
source/nevora-codex-v1.0.md
source/front-matter.md
source/table-of-contents.md
source/volume-i.md
source/volume-ii.md
source/volume-iii.md
source/volume-iv.md
source/volume-v.md
```

Human review still required:

- generated Markdown must be reviewed;
- generated PDF must be visually inspected;
- generated artifacts must not be manually patched.

### Deploy GitHub Pages

Purpose:

- builds the React/Vite site;
- deploys the public orientation site to GitHub Pages.

Primary files:

```text
index.html
vite.config.js
package.json
src/**
.github/workflows/deploy-pages.yml
```

Required GitHub setting:

```text
Settings → Pages → Source → GitHub Actions
```

Public URL:

```text
https://michaelwave369.github.io/nevora-codex/
```

### Site Check

Purpose:

- builds the site without deploying it;
- confirms `dist/index.html` exists;
- uploads the build output as an artifact.

This is useful for pull requests and site changes.

### Release Sanity Check

Purpose:

- checks required release/review files exist;
- fails on hard blocker marker `[POSSIBLE BLOCKER]`;
- warns on `[CITATION NEEDED]`, `[SOURCE REVIEW NEEDED]`, and `[CLAIM BOUNDARY REVIEW]`;
- warns on heuristic high-risk wording candidates.

Primary script:

```text
scripts/release_sanity_check.py
```

This check is intentionally conservative. It is not a full semantic review.

## What automation can catch

Automation can help catch:

- missing required release files;
- failed manuscript assembly;
- failed site build;
- broken package configuration;
- hard blocker markers;
- unresolved review markers;
- some risky wording candidates;
- missing generated artifact output.

## What automation cannot catch

Automation cannot reliably determine:

- whether private material is safe to publish;
- whether symbolic language will be misunderstood;
- whether a claim needs expert citation;
- whether a passage is emotionally coercive;
- whether the author-steward is comfortable releasing;
- whether the PDF is visually pleasant;
- whether Zenodo metadata is philosophically safe;
- whether v1.0.0 should be approved.

Those require human review and written stewardship.

## Required checks before release candidate

Before `v1.0.0-rc1`, confirm:

- [ ] manuscript assembly passes;
- [ ] PDF artifact is generated or intentionally handled;
- [ ] site build passes;
- [ ] release sanity check passes with no failures;
- [ ] warnings are reviewed and resolved, accepted, or deferred;
- [ ] no open blockers remain;
- [ ] review response log is current;
- [ ] release candidate manifest is ready.

Reference:

```text
docs/release-candidate-manifest.md
docs/v1.0-publication-runbook.md
docs/v1.0-go-no-go-decision-record.md
```

## Handling failed checks

If a workflow fails:

1. Do not ignore it.
2. Read the failing step.
3. Identify whether it is manuscript, site, sanity, metadata, or dependency-related.
4. Open or update a GitHub issue if the fix is not immediate.
5. Fix the source, not generated artifacts.
6. Re-run the workflow.
7. Record release-relevant fixes in the review response log or changelog if needed.

## Handling warnings

Warnings are not automatic blockers.

They should be reviewed through the correct lane:

| Warning type | Review lane |
| --- | --- |
| `[CITATION NEEDED]` | Citation / claim discipline |
| `[SOURCE REVIEW NEEDED]` | Citation / claim discipline |
| `[CLAIM BOUNDARY REVIEW]` | Claim discipline |
| AI-consciousness wording candidate | Claim discipline |
| Coercive wording candidate | Privacy / anti-coercion |
| Inevitability wording candidate | Claim discipline / editorial clarity |

## CI release posture

A green CI run means:

```text
The automated checks did not find a mechanical failure.
```

It does not mean:

```text
The work is safe, final, citable, or approved.
```

Only the Phase 7 approval gate can approve release.

## Closing principle

Automation should make release calmer.

It should never make release careless.
