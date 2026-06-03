# Phase 5 Launch Packet

This packet prepares the Phase 5 build, PDF, and site artifact review once Phase 4 passes or receives active clearance.

Phase 5 confirms that Nevora can be built from source into reviewable artifacts without hidden manual patching, broken workflows, missing files, or misleading public-release signals.

## Current status

```text
PHASE 5 STAGED — BEGIN AFTER PHASE 4 PASS OR ACTIVE CLEARANCE
```

## Primary issue

```text
#5 — Phase 5 review: Build, PDF, and site artifact gate
```

## Primary quickstart

```text
docs/phase-5-build-artifact-quickstart.md
```

## What Phase 5 decides

Phase 5 answers this question:

```text
Can the repository reliably build the manuscript and public orientation site from source?
```

It does not answer:

```text
Is Nevora ready for v1.0.0 publication?
```

That decision belongs to Phase 7.

## Required review set

Review:

```text
docs/ci-and-automation-guide.md
docs/pdf-build-guide.md
docs/github-pages-setup.md
docs/release-candidate-manifest.md
docs/v1.0-publication-runbook.md
scripts/assemble_manuscript.py
scripts/release_sanity_check.py
.github/workflows/build-manuscript.yml
.github/workflows/deploy-pages.yml
.github/workflows/site-check.yml
.github/workflows/release-sanity-check.yml
package.json
vite.config.js
index.html
src/
source/nevora-codex-v1.0.md
releases/.gitkeep
```

Optional support documents:

```text
docs/phase-gate-status.md
docs/phase-gate-quickstart-index.md
docs/phase-4-launch-packet.md
docs/review-response-log.md
```

## Required local commands

Run from the repository root:

```bash
python scripts/assemble_manuscript.py
npm install
npm run build
python scripts/release_sanity_check.py
```

Expected manuscript output:

```text
releases/nevora-codex-v1.0.md
```

Expected site output:

```text
dist/index.html
```

## Phase 5 review lanes

Assign one or more reviewers to each lane if possible.

| Lane | Focus |
| --- | --- |
| Manuscript assembly | Confirm `scripts/assemble_manuscript.py` builds the Markdown artifact from source. |
| Generated artifact inspection | Confirm generated Markdown contains intended sections in the right order and is not manually patched. |
| PDF build path | Confirm PDF generation is documented, tested, or intentionally deferred with rationale. |
| Site build | Confirm `npm install` and `npm run build` succeed and `dist/index.html` exists. |
| GitHub Pages status | Confirm site loads and does not falsely claim final release or DOI status. |
| Workflow health | Confirm build, site-check, deploy-pages, and release-sanity workflows are configured. |
| Release sanity output | Confirm failures are resolved and warnings are routed to the correct phase. |
| Source/artifact separation | Confirm generated artifacts remain separate from source and are not manually edited. |

## Build failure handling

If any build fails:

1. Do not patch generated artifacts manually.
2. Identify whether the problem is source, script, dependency, workflow, or configuration related.
3. Fix the source or workflow.
4. Rebuild.
5. Record release-relevant fixes in `docs/review-response-log.md` or `CHANGELOG.md` if needed.
6. Re-run the failing workflow.

## Warning routing

Warnings from `scripts/release_sanity_check.py` should route as follows:

| Warning type | Route |
| --- | --- |
| Citation or source marker | Phase 2 |
| Claim-boundary marker | Phase 2 |
| AI-consciousness wording candidate | Phase 2 |
| Coercive wording candidate | Phase 3 |
| Inevitability wording candidate | Phase 2 or Phase 4 |
| Link, path, or naming inconsistency | Phase 4 or Phase 5 |

Warnings are not automatic blockers, but they should not be ignored before release-candidate approval.

## Suggested reviewer prompt

Use this prompt for human or AI-assisted review:

```text
Review this Nevora Codex repository for build and artifact readiness.
Check manuscript assembly, generated Markdown artifact, PDF generation path, GitHub Pages build, workflow configuration, release sanity checker output, source/generated artifact separation, and release-status accuracy.
Flag anything that could prevent a clean v1.0 release candidate.
Do not evaluate final publication approval; only evaluate build and artifact readiness.
```

## Suggested issue #5 update

Copy this into issue `#5` when Phase 5 begins:

```text
## Phase 5 active review started

Phase 4 status:
[PASS / PASS WITH MINOR EDITS / ACTIVE CLEARANCE]

Phase 5 build, PDF, and site artifact review has started.

### Commands checked

- python scripts/assemble_manuscript.py
- npm install
- npm run build
- python scripts/release_sanity_check.py

### Workflows checked

- .github/workflows/build-manuscript.yml
- .github/workflows/deploy-pages.yml
- .github/workflows/site-check.yml
- .github/workflows/release-sanity-check.yml

### Artifacts reviewed

- releases/nevora-codex-v1.0.md
- PDF artifact path/status
- GitHub Pages site
- dist/index.html, if built locally

### Review lanes

- Manuscript assembly:
- Generated artifact inspection:
- PDF build path:
- Site build:
- GitHub Pages status:
- Workflow health:
- Release sanity output:
- Source/artifact separation:

### Findings

- 

### Required fixes

- 

### Warnings routed to other phases

- 

### Decision target

PHASE 5 PASS — Release artifacts and site build successfully.
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

Move to:

```text
#6 — Phase 6 review: Metadata, license, and Zenodo archive gate
docs/phase-6-metadata-archive-quickstart.md
```

Update:

```text
docs/phase-gate-status.md
docs/review-response-log.md, if findings were accepted, resolved, deferred, rejected, or blocked
```

## Closing principle

A clean build is not final approval.

It is proof that the work can be assembled without hiding the seams.
