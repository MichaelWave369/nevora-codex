# Phase 7 Launch Packet

This packet prepares the Phase 7 release candidate and final approval review once Phase 6 passes or receives explicit clearance.

Phase 7 is the final publication-control gate. It confirms that all prior gates, blocker triage, artifacts, metadata, accepted risks, and author-steward approvals are complete before publishing `v1.0.0`.

## Current status

```text
PHASE 7 STAGED — BEGIN ONLY AFTER PHASES 1-6 PASS OR ARE EXPLICITLY DEFERRED
```

## Primary issue

```text
#7 — Phase 7 review: Release candidate and final approval gate
```

## Primary quickstart

```text
docs/phase-7-release-candidate-quickstart.md
```

## What Phase 7 decides

Phase 7 answers this question:

```text
Can this exact release candidate become public, durable, citable, and archive-bound?
```

Unlike Phases 1-6, Phase 7 can approve or stop the final public release.

## Required review set

Review:

```text
docs/release-candidate-manifest.md
docs/v1.0-go-no-go-decision-record.md
docs/v1.0-publication-runbook.md
docs/release-checklist.md
docs/review-issue-index.md
docs/review-response-log.md
docs/blocker-triage-guide.md
docs/v1.0-master-review-index.md
docs/phase-gate-status.md
README.md
NOTICE.md
LICENSE.md
CITATION.cff
CHANGELOG.md
docs/release-notes-v1.0-draft.md
docs/zenodo-metadata.md
releases/nevora-codex-v1.0.md
releases/nevora-codex-v1.0.pdf
```

Optional support documents:

```text
docs/phase-gate-quickstart-index.md
docs/phase-1-decision-packet.md
docs/phase-2-launch-packet.md
docs/phase-3-launch-packet.md
docs/phase-4-launch-packet.md
docs/phase-5-launch-packet.md
docs/phase-6-launch-packet.md
```

## Required final command set

Run from the repository root:

```bash
python scripts/assemble_manuscript.py
npm install
npm run build
python scripts/release_sanity_check.py
```

All failures must be resolved before final approval.

Warnings must be reviewed and accepted, resolved, or deferred with rationale.

## Phase 7 review lanes

Assign one or more reviewers to each lane if possible.

| Lane | Focus |
| --- | --- |
| Prior-gate confirmation | Confirm Phases 1-6 passed or were explicitly deferred with rationale. |
| Blocker confirmation | Confirm no unresolved privacy, safety, claim-boundary, build, metadata, or archive blockers remain. |
| Artifact confirmation | Confirm Markdown, PDF, site, release notes, and archive metadata are reviewed and status-accurate. |
| Accepted-risk review | Confirm accepted risks are documented by the author-steward and are truly non-blocking. |
| Go / No-Go decision | Complete `docs/v1.0-go-no-go-decision-record.md`. |
| Final approval phrase | Confirm the approval phrase is recorded exactly if and only if the decision is GO. |
| Release execution readiness | Confirm GitHub release, artifact attachment, Zenodo draft, DOI update path, and v1.1 feedback cycle are ready. |

## Required final approval phrase

The final release may proceed only when this exact phrase is recorded in issue `#7` and/or the Go / No-Go decision record:

```text
APPROVED FOR NEVORA CODEX v1.0 PUBLIC RELEASE
```

If this phrase is not recorded, Nevora remains in public-edition preparation.

## Release candidate package

The release candidate should include:

```text
releases/nevora-codex-v1.0.md
releases/nevora-codex-v1.0.pdf
README.md
NOTICE.md
LICENSE.md
CITATION.cff
CHANGELOG.md
docs/release-notes-v1.0-draft.md
docs/zenodo-metadata.md
GitHub-generated source archive
```

Do not include:

```text
private notes
raw conversations
unreviewed drafts
sensitive third-party material
node_modules/
dist/ unless intentionally archived
manual patch artifacts
build caches
```

## Suggested reviewer prompt

Use this prompt for human or AI-assisted review:

```text
Review this Nevora Codex release candidate for final publication readiness.
Confirm that Phases 1-6 have passed or been explicitly deferred, no unresolved blockers remain, release artifacts were built from source, Markdown/PDF/site/release notes/Zenodo metadata were reviewed, accepted risks are documented, and the Go / No-Go decision record is complete.
Flag anything that should prevent v1.0.0 publication.
Do not add new scope unless it is necessary to prevent release harm or metadata error.
```

## Suggested issue #7 update

Copy this into issue `#7` when Phase 7 begins:

```text
## Phase 7 active review started

Phase 6 status:
[PASS / PASS WITH MINOR EDITS / ACTIVE CLEARANCE]

Phase 7 release candidate and final approval review has started.

### Phase gate status

- Phase 1:
- Phase 2:
- Phase 3:
- Phase 4:
- Phase 5:
- Phase 6:

### Commands checked

- python scripts/assemble_manuscript.py
- npm install
- npm run build
- python scripts/release_sanity_check.py

### Artifacts reviewed

- releases/nevora-codex-v1.0.md
- releases/nevora-codex-v1.0.pdf
- README.md
- NOTICE.md
- LICENSE.md
- CITATION.cff
- CHANGELOG.md
- docs/release-notes-v1.0-draft.md
- docs/zenodo-metadata.md
- GitHub Pages site

### Review lanes

- Prior-gate confirmation:
- Blocker confirmation:
- Artifact confirmation:
- Accepted-risk review:
- Go / No-Go decision:
- Final approval phrase:
- Release execution readiness:

### Open blockers

- 

### Accepted risks

- 

### Deferred v1.1 items

- 

### Go / No-Go decision

[GO / NO-GO / GO WITH MINOR NON-BLOCKING FOLLOW-UP / PAUSE]

### Final approval phrase, if GO

APPROVED FOR NEVORA CODEX v1.0 PUBLIC RELEASE
```

## Phase 7 decision options

Use one:

```text
PHASE 7 PASS — Release candidate approved for v1.0.0.
```

```text
PHASE 7 PASS WITH MINOR FOLLOW-UP — Release may proceed with listed non-blocking follow-up.
```

```text
PHASE 7 NEEDS REVISION — Release candidate requires revision before publication.
```

```text
PHASE 7 BLOCKED — Final release is blocked until the listed issue is resolved.
```

## After Phase 7 passes

If the decision is GO:

1. Publish GitHub release `v1.0.0`.
2. Attach approved artifacts.
3. Confirm release notes are accurate.
4. Update Public Archive Mode links if needed.
5. Prepare Zenodo submission using `docs/zenodo-metadata.md`.
6. After DOI assignment, update README, CITATION, site archive links, and CHANGELOG.
7. Open the v1.1 feedback cycle.

## If Phase 7 does not pass

If the decision is NO-GO, PAUSE, NEEDS REVISION, or BLOCKED:

1. Do not publish final release.
2. Record the reason in issue `#7`.
3. Open or update blocker/major issues.
4. Update `docs/review-response-log.md`.
5. Fix source or workflows.
6. Rebuild artifacts.
7. Prepare the next release candidate.

## Closing principle

Phase 7 should feel calm.

Not euphoric. Not rushed. Not performative.

Calm means the work has been reviewed, bounded, built, and approved with eyes open.
