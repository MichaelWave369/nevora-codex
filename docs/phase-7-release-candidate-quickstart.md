# Phase 7 Release Candidate and Final Approval Quickstart

This quickstart supports Phase 7 of the Nevora Codex v1.0 review cycle.

Phase 7 is the final release-candidate gate. It confirms that all previous gates, artifacts, metadata, blockers, and author-steward approvals are complete before publishing `v1.0.0`.

## Current state

```text
PHASE 7 READY ONLY AFTER PHASES 1-6 PASS OR ARE EXPLICITLY DEFERRED
```

Phase 7 is not a brainstorming phase. It is the final publication-control gate.

## Goal of Phase 7

Confirm that the exact release candidate package is ready to become public, durable, citable, and archive-bound.

Phase 7 asks:

```text
Can Nevora stand in public without the author-steward present to explain its boundaries?
```

## Primary issue

Use GitHub issue:

```text
#7 — Phase 7 review: Release candidate and final approval gate
```

## Primary documents and files

Start with:

```text
docs/release-candidate-manifest.md
docs/v1.0-go-no-go-decision-record.md
docs/v1.0-publication-runbook.md
docs/release-checklist.md
docs/review-issue-index.md
docs/review-response-log.md
docs/blocker-triage-guide.md
docs/v1.0-master-review-index.md
```

Then check:

```text
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

## Fast Phase 7 checklist

Before Phase 7 can pass, confirm:

- [ ] Phase 1 is closed or intentionally deferred with rationale.
- [ ] Phase 2 is closed or intentionally deferred with rationale.
- [ ] Phase 3 is closed or intentionally deferred with rationale.
- [ ] Phase 4 is closed or intentionally deferred with rationale.
- [ ] Phase 5 is closed or intentionally deferred with rationale.
- [ ] Phase 6 is closed or intentionally deferred with rationale.
- [ ] No open blocker issues remain unresolved.
- [ ] `docs/review-response-log.md` has no unresolved blockers.
- [ ] Accepted risks are documented by the author-steward.
- [ ] Release candidate artifacts are built from source.
- [ ] Generated artifacts are not manually patched.
- [ ] Markdown artifact is reviewed.
- [ ] PDF artifact is reviewed.
- [ ] GitHub Pages site is reviewed.
- [ ] Release notes are reviewed.
- [ ] Zenodo metadata is reviewed and still pending until DOI assignment.
- [ ] Final GO / NO-GO decision record is completed.
- [ ] Final approval phrase is recorded exactly.

## Required final approval phrase

The final release may proceed only when this exact phrase is recorded in issue #7 and/or the Go / No-Go decision record:

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
```

## Final local commands

Run from repository root:

```bash
python scripts/assemble_manuscript.py
npm install
npm run build
python scripts/release_sanity_check.py
```

All failures must be resolved before final approval.

Warnings must be reviewed and accepted, resolved, or deferred with rationale.

## Go / No-Go decision options

Use one in `docs/v1.0-go-no-go-decision-record.md`:

```text
GO — Publish v1.0.0
NO-GO — Do not publish yet
GO WITH MINOR NON-BLOCKING FOLLOW-UP
PAUSE — Resolve major concern before deciding
```

## Suggested issue #7 comment

Copy this into issue #7 when ready:

```text
Phase 7 release candidate review update.

Release candidate:
Commit / tag:
Review date:

Phase gate status:
- Phase 1:
- Phase 2:
- Phase 3:
- Phase 4:
- Phase 5:
- Phase 6:

Artifacts reviewed:
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

Open blockers:
- 

Accepted risks:
- 

Deferred v1.1 items:
- 

Go / No-Go decision:
[GO / NO-GO / GO WITH MINOR NON-BLOCKING FOLLOW-UP / PAUSE]

Final approval phrase, if GO:
APPROVED FOR NEVORA CODEX v1.0 PUBLIC RELEASE

Notes:

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
6. After DOI assignment, update README, CITATION, site archive links, and changelog.
7. Open the v1.1 feedback cycle.

## If Phase 7 does not pass

If the decision is NO-GO, PAUSE, NEEDS REVISION, or BLOCKED:

1. Do not publish final release.
2. Record the reason in issue #7.
3. Open or update blocker/major issues.
4. Update `docs/review-response-log.md`.
5. Fix source or workflows.
6. Rebuild artifacts.
7. Prepare the next release candidate.

## Closing principle

Phase 7 should feel calm.

Not euphoric. Not rushed. Not performative.

Calm means the work has been reviewed, bounded, built, and approved with eyes open.
