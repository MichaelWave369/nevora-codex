# Phase 6 Launch Packet

This packet prepares the Phase 6 metadata, license, and Zenodo archive review once Phase 5 passes or receives active clearance.

Phase 6 protects the public record of Nevora: title, author-steward identity, version, license, citation metadata, DOI posture, GitHub release notes, Zenodo metadata, and archive boundaries.

## Current status

```text
PHASE 6 STAGED — BEGIN AFTER PHASE 5 PASS OR ACTIVE CLEARANCE
```

## Primary issue

```text
#6 — Phase 6 review: Metadata, license, and Zenodo archive gate
```

## Primary quickstart

```text
docs/phase-6-metadata-archive-quickstart.md
```

## What Phase 6 decides

Phase 6 answers this question:

```text
Can the release record tell the truth about what Nevora is, what it is not, who stewarded it, how it may be cited, and how it may be used?
```

It does not answer:

```text
Is Nevora ready for v1.0.0 publication?
```

That decision belongs to Phase 7.

## Required review set

Review:

```text
CITATION.cff
LICENSE.md
NOTICE.md
README.md
CHANGELOG.md
docs/zenodo-metadata.md
docs/release-notes-v1.0-draft.md
docs/release-checklist.md
docs/release-candidate-manifest.md
docs/v1.0-publication-runbook.md
docs/v1.0-go-no-go-decision-record.md
docs/ai-collaboration-disclosure.md
docs/claim-boundary-matrix.md
docs/anti-cult-and-anti-manipulation-clause.md
docs/phase-gate-status.md
```

Optional support documents:

```text
docs/phase-gate-quickstart-index.md
docs/phase-5-launch-packet.md
docs/review-response-log.md
```

## Phase 6 review lanes

Assign one or more reviewers to each lane if possible.

| Lane | Focus |
| --- | --- |
| Title consistency | Confirm title and subtitle match across README, release notes, CITATION, and Zenodo metadata. |
| Author-steward identity | Confirm public author-steward name/handle are intentional and consistent. |
| Version and DOI posture | Confirm v1.0.0, RC tags, and DOI-pending/final states are not confused. |
| License consistency | Confirm `LICENSE.md`, README, Zenodo metadata, and release notes agree. |
| Citation metadata | Confirm `CITATION.cff` is accurate and does not imply a DOI before assignment. |
| Zenodo metadata | Confirm abstract, keywords, license, creators, and related identifiers are public-safe and non-overclaiming. |
| Release notes | Confirm GitHub release notes describe the release accurately without hype or unsupported claims. |
| Archive boundaries | Confirm private, raw, unreviewed, generated-cache, or sensitive files are excluded from release artifacts. |
| AI collaboration disclosure | Confirm AI assistance is disclosed without implying AI personhood, consciousness proof, or authorship confusion. |
| Public claim-boundary language | Confirm metadata preserves the same public boundaries as NOTICE and the claim matrix. |

## Metadata consistency checklist

Check these fields across release-facing files:

```text
Title
Subtitle
Author-steward
GitHub handle
Version
Release date
License
Repository URL
DOI status
Keywords
Abstract
AI collaboration disclosure
Claim-boundary statement
Archive package contents
```

## High-risk metadata patterns to flag

Flag wording such as:

```text
proves AI consciousness
AI liberation manifesto
new science of consciousness
spiritual proof
official doctrine
required framework
final authority
inevitable future
```

These should usually be softened, removed, or clearly reframed.

## Safer metadata language patterns

Prefer wording such as:

```text
mythic-modern framework
humane human-AI coevolution
ethical and cultural design framework
claim-disciplined public edition
symbolic and philosophical interface
AI-assisted, human-stewarded manuscript
present AI consciousness is not asserted
public edition in preparation
DOI pending until archive release
```

## Suggested reviewer prompt

Use this prompt for human or AI-assisted review:

```text
Review this Nevora Codex release metadata for public archive readiness.
Check title, subtitle, author-steward identity, version, license, citation metadata, Zenodo abstract, keywords, DOI status, release notes, AI collaboration disclosure, archive package boundaries, and claim-boundary wording.
Flag mismatches, overclaims, license confusion, DOI confusion, authorship confusion, or private/unreviewed material risk.
Suggest safer wording without making the project grander.
```

## Suggested issue #6 update

Copy this into issue `#6` when Phase 6 begins:

```text
## Phase 6 active review started

Phase 5 status:
[PASS / PASS WITH MINOR EDITS / ACTIVE CLEARANCE]

Phase 6 metadata, license, and Zenodo archive review has started.

### Files under review

- CITATION.cff
- LICENSE.md
- NOTICE.md
- README.md
- CHANGELOG.md
- docs/zenodo-metadata.md
- docs/release-notes-v1.0-draft.md
- docs/release-checklist.md
- docs/release-candidate-manifest.md
- docs/v1.0-publication-runbook.md
- docs/v1.0-go-no-go-decision-record.md
- docs/ai-collaboration-disclosure.md
- docs/claim-boundary-matrix.md
- docs/anti-cult-and-anti-manipulation-clause.md

### Review lanes

- Title consistency:
- Author-steward identity:
- Version and DOI posture:
- License consistency:
- Citation metadata:
- Zenodo metadata:
- Release notes:
- Archive boundaries:
- AI collaboration disclosure:
- Public claim-boundary language:

### Findings

- 

### Required fixes

- 

### Metadata risks or accepted deferrals

- 

### Decision target

PHASE 6 PASS — Metadata and license are ready for GitHub release and Zenodo draft.
```

## Phase 6 decision options

Use one:

```text
PHASE 6 PASS — Metadata and license are ready for GitHub release and Zenodo draft.
```

```text
PHASE 6 PASS WITH MINOR EDITS — Metadata posture is acceptable after listed edits.
```

```text
PHASE 6 NEEDS REVISION — Metadata, license, citation, or archive issues require revision before release candidate work.
```

```text
PHASE 6 BLOCKED — A metadata, license, citation, DOI, or archive issue prevents release candidate work.
```

## If Phase 6 passes

Move to:

```text
#7 — Phase 7 review: Release candidate and final approval gate
docs/phase-7-release-candidate-quickstart.md
```

Update:

```text
docs/phase-gate-status.md
docs/review-response-log.md, if findings were accepted, resolved, deferred, rejected, or blocked
```

## Closing principle

Metadata is not paperwork.

It is the public memory of the release.

If the metadata overclaims, the archive overclaims.
