# Phase-Gate Quickstart Index

This index links the seven execution quickstarts for the Nevora Codex v1.0 review runway.

Use this when you want to move phase by phase without rereading the full publication runbook.

## Current state

```text
STRUCTURED REVIEW RUNWAY READY
```

The quickstarts are execution aids. They do not replace the full review documents, blocker triage guide, response log, release candidate manifest, or final Go / No-Go decision record.

## Phase quickstarts

| Phase | Quickstart | Main gate | Issue |
| --- | --- | --- | --- |
| Phase 1 | `docs/phase-1-author-steward-quickstart.md` | Author-steward release comfort and privacy | `#1` |
| Phase 2 | `docs/phase-2-claim-discipline-quickstart.md` | Claim discipline and AI-consciousness boundary | `#2` |
| Phase 3 | `docs/phase-3-privacy-safety-quickstart.md` | Privacy, safety, and anti-coercion | `#3` |
| Phase 4 | `docs/phase-4-editorial-readability-quickstart.md` | Editorial consistency and readability | `#4` |
| Phase 5 | `docs/phase-5-build-artifact-quickstart.md` | Build, PDF, and site artifacts | `#5` |
| Phase 6 | `docs/phase-6-metadata-archive-quickstart.md` | Metadata, license, and Zenodo archive | `#6` |
| Phase 7 | `docs/phase-7-release-candidate-quickstart.md` | Release candidate and final approval | `#7` |

## Recommended execution order

```text
Phase 1
→ Phase 2
→ Phase 3
→ Phase 4
→ Phase 5
→ Phase 6
→ Phase 7
```

Do not skip Phase 1.

Do not treat Phase 5 green checks as publication approval.

Do not enter Phase 7 until all blockers are resolved, downgraded with rationale, or explicitly accepted as release risk by the author-steward.

## Quick command set

Use these commands during the technical phases:

```bash
python scripts/assemble_manuscript.py
npm install
npm run build
python scripts/release_sanity_check.py
```

A green check means the automated guard passed. It does not mean the manuscript is ready for publication.

## Required final chain

Before final release:

```text
All phase gates closed or intentionally deferred
No unresolved blockers
Review response log checked
Release candidate artifacts reviewed
Go / No-Go decision completed
Final approval phrase recorded
GitHub v1.0.0 release published
Zenodo DOI prepared or completed
v1.1 feedback cycle opened
```

## Final approval phrase

The final release may proceed only when this exact phrase is recorded:

```text
APPROVED FOR NEVORA CODEX v1.0 PUBLIC RELEASE
```

## Companion documents

Use these alongside the quickstarts:

```text
docs/v1.0-master-review-index.md
docs/v1.0-publication-runbook.md
docs/review-issue-index.md
docs/review-response-log.md
docs/blocker-triage-guide.md
docs/release-candidate-manifest.md
docs/v1.0-go-no-go-decision-record.md
docs/ci-and-automation-guide.md
```

## Closing principle

The quickstarts are the stepping stones.

The phase gates are the doors.

The final approval phrase is the key.
