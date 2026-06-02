# Phase 5 Build, PDF, and Site Artifact Quickstart

This quickstart supports Phase 5 of the Nevora Codex v1.0 review cycle.

Phase 5 confirms that the manuscript and interactive site can be built into reviewable release artifacts without manual patching, missing files, broken workflows, or misleading release-state signals.

## Current state

```text
PHASE 5 READY AFTER PHASES 1-4 PASS OR ACTIVE CLEARANCE
```

Phase 5 is a build and artifact gate. It does not approve the content, claims, privacy posture, or final release.

## Goal of Phase 5

Confirm that Nevora’s source files can produce the expected public artifacts and that the GitHub Pages site builds cleanly.

Phase 5 asks:

```text
Can the repository reliably build the manuscript and public site from source?
```

## Primary issue

Use GitHub issue:

```text
#5 — Phase 5 review: Build, PDF, and site artifact gate
```

## Primary documents and files

Start with:

```text
docs/ci-and-automation-guide.md
docs/pdf-build-guide.md
docs/github-pages-setup.md
docs/release-candidate-manifest.md
docs/v1.0-publication-runbook.md
scripts/assemble_manuscript.py
.github/workflows/build-manuscript.yml
.github/workflows/deploy-pages.yml
.github/workflows/site-check.yml
.github/workflows/release-sanity-check.yml
```

Also check:

```text
package.json
vite.config.js
index.html
src/
source/nevora-codex-v1.0.md
releases/.gitkeep
```

## Fast Phase 5 checklist

Before Phase 5 can pass, confirm:

- [ ] `python scripts/assemble_manuscript.py` runs successfully.
- [ ] `releases/nevora-codex-v1.0.md` is generated.
- [ ] Generated Markdown begins with the correct front matter.
- [ ] Volumes I-V appear in correct order.
- [ ] Generated artifacts are not manually edited.
- [ ] PDF build path is documented and tested or intentionally deferred with rationale.
- [ ] `npm install` completes.
- [ ] `npm run build` completes.
- [ ] `dist/index.html` exists after site build.
- [ ] GitHub Pages deploy workflow is configured.
- [ ] Site Check workflow passes.
- [ ] Release Sanity Check workflow passes with no failures.
- [ ] Warnings are reviewed, resolved, accepted, or logged.
- [ ] Public Archive Mode and Release Dashboard do not falsely claim final release.
- [ ] No analytics, tracking, cookies, accounts, or forms are introduced.

## Local commands

Run from repository root:

```bash
python scripts/assemble_manuscript.py
```

```bash
npm install
npm run build
```

```bash
python scripts/release_sanity_check.py
```

## Expected outputs

Manuscript assembly should produce:

```text
releases/nevora-codex-v1.0.md
```

Site build should produce:

```text
dist/index.html
```

Release sanity check should produce either:

```text
Result: PASS
```

or:

```text
Result: PASS WITH WARNINGS
```

Warnings require human review. Failures must be resolved before release-candidate approval.

## Artifact inspection questions

Ask:

- Does the generated manuscript include all intended source sections?
- Are any sections duplicated unexpectedly?
- Are headings rendered in a usable order?
- Are generated files clearly separated from source files?
- Does the PDF open and render correctly?
- Does the site load on GitHub Pages?
- Does the site remain public-safe and status-accurate?
- Does the release sanity checker flag anything that needs Phase 2 or Phase 3 review?

## Build failure handling

If a build fails:

1. Do not patch generated artifacts manually.
2. Identify whether the failure is source, script, dependency, workflow, or configuration related.
3. Fix the source or workflow.
4. Rebuild.
5. Record release-relevant fixes in `docs/review-response-log.md` or `CHANGELOG.md` if needed.
6. Re-run the failing workflow.

## Warning handling

If `release_sanity_check.py` reports warnings:

- `[CITATION NEEDED]` routes to Phase 2.
- `[SOURCE REVIEW NEEDED]` routes to Phase 2.
- `[CLAIM BOUNDARY REVIEW]` routes to Phase 2.
- AI-consciousness wording candidates route to Phase 2.
- Coercive wording candidates route to Phase 3.
- Inevitability wording candidates route to Phase 2 or Phase 4.

Warnings are not automatic blockers, but they cannot be ignored during release-candidate preparation.

## Suggested review prompt

Use this with human or AI-assisted reviewers:

```text
Review this repository for build and artifact readiness.
Check manuscript assembly, PDF generation path, GitHub Pages build, site status accuracy, generated artifact separation, release sanity checker output, and workflow configuration.
Flag anything that could prevent a clean v1.0 release candidate.
Do not evaluate final publication approval; only evaluate build and artifact readiness.
```

## Suggested issue #5 comment

Copy this into issue #5 when ready:

```text
Phase 5 build, PDF, and site artifact review update.

Commands/workflows checked:
- python scripts/assemble_manuscript.py
- npm install
- npm run build
- python scripts/release_sanity_check.py
- .github/workflows/build-manuscript.yml
- .github/workflows/deploy-pages.yml
- .github/workflows/site-check.yml
- .github/workflows/release-sanity-check.yml

Artifacts reviewed:
- releases/nevora-codex-v1.0.md
- PDF artifact path/status
- GitHub Pages site

Findings:
- 

Required fixes:
- 

Warnings routed to other phases:
- 

Decision:
PHASE 5 [PASS / PASS WITH MINOR EDITS / NEEDS REVISION / BLOCKED]

Notes:

```

## Phase 5 decision options

Use one:

```text
PHASE 5 PASS — Release artifacts and site build successfully.
```

```text
PHASE 5 PASS WITH MINOR EDITS — Build path is acceptable after listed edits.
```

```text
PHASE 5 NEEDS REVISION — Build, PDF, site, or sanity-check issues require revision before release candidate work.
```

```text
PHASE 5 BLOCKED — A build or artifact issue prevents release candidate work.
```

## If Phase 5 passes

Next steps:

1. Move to Phase 6 metadata, license, and Zenodo archive review.
2. Confirm generated artifacts are reviewable.
3. Confirm release sanity warnings are triaged.
4. Keep generated artifacts out of manual edits.
5. Prepare for release candidate manifest review.

## Closing principle

A clean build is not final approval.

It is proof that the work can be assembled without hiding the seams.
