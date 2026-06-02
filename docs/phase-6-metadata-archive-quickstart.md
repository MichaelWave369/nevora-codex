# Phase 6 Metadata, License, and Zenodo Archive Quickstart

This quickstart supports Phase 6 of the Nevora Codex v1.0 review cycle.

Phase 6 prepares the release record: title, author-steward identity, license, citation metadata, GitHub release notes, Zenodo metadata, DOI posture, and archive boundaries.

## Current state

```text
PHASE 6 READY AFTER PHASES 1-5 PASS OR ACTIVE CLEARANCE
```

Phase 6 does not publish the release. It confirms that the metadata and archive package are ready for final release-candidate review.

## Goal of Phase 6

Confirm that Nevora can become public, citable, and archivable without metadata confusion, license mismatch, DOI overclaiming, or accidental inclusion of private/unreviewed material.

Phase 6 asks:

```text
Can the release record tell the truth about what Nevora is, what it is not, who stewarded it, how it may be cited, and how it may be used?
```

## Primary issue

Use GitHub issue:

```text
#6 — Phase 6 review: Metadata, license, and Zenodo archive gate
```

## Primary documents and files

Start with:

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
```

Also check:

```text
docs/ai-collaboration-disclosure.md
docs/claim-boundary-matrix.md
docs/anti-cult-and-anti-manipulation-clause.md
docs/v1.0-master-review-index.md
```

## Fast Phase 6 checklist

Before Phase 6 can pass, confirm:

- [ ] Release title is consistent across README, CITATION, release notes, and Zenodo metadata.
- [ ] Author-steward name/handle is correct and intentionally public.
- [ ] Version is consistently `v1.0.0` for final release and not confused with RC tags.
- [ ] DOI status is accurate: pending before Zenodo, final only after DOI assignment.
- [ ] License file matches the intended public-use boundaries.
- [ ] Citation metadata does not imply final DOI before final DOI exists.
- [ ] Zenodo abstract does not overclaim AI consciousness, scientific proof, or spiritual authority.
- [ ] Release notes clearly state this is a public edition and not proof of present AI consciousness.
- [ ] AI collaboration disclosure is present and bounded.
- [ ] Release package excludes private, raw, or unreviewed materials.
- [ ] Public Archive Mode placeholders remain accurate until final release/DOI.
- [ ] Any accepted metadata risks are recorded in the review response log.

## Metadata consistency checks

Check these fields across files:

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
```

## License review questions

Ask:

- Does the selected license match how the author-steward wants the work shared?
- Does the README describe the license consistently?
- Does Zenodo metadata use the same license?
- Does the license allow or restrict derivative work as intended?
- Does the license conflict with included materials?
- Are any third-party materials present that require separate attribution or removal?

## Citation review questions

Ask:

- Is the author-steward name correct?
- Is the title final?
- Is the version correct?
- Does the citation imply a DOI before it exists?
- Will a reader know how to cite the work before and after Zenodo?
- Does `CITATION.cff` validate conceptually against the intended release?

## Zenodo review questions

Ask:

- Does the Zenodo abstract clearly describe Nevora as philosophical, ethical, cultural, and systems-design work?
- Does it avoid claiming current AI systems are conscious?
- Does it avoid spiritual, scientific, legal, medical, or psychological authority claims?
- Are keywords useful without being hype-heavy?
- Does the archive package exclude private/unreviewed files?
- Is the license correct?
- Is the release date final or still pending?

## High-risk metadata wording

Flag wording like:

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

## Safer metadata wording

Prefer:

```text
mythic-modern framework
humane human-AI coevolution
ethical and cultural design framework
claim-disciplined public edition
symbolic and philosophical interface
AI-assisted, human-stewarded manuscript
present AI consciousness is not asserted
```

## Suggested review prompt

Use this with human or AI-assisted reviewers:

```text
Review this release metadata for public archive readiness.
Check title, author-steward identity, version, license, citation metadata, Zenodo abstract, keywords, release notes, DOI status, AI collaboration disclosure, and claim-boundary wording.
Flag any mismatch, overclaim, license confusion, citation confusion, DOI confusion, or private/unreviewed material risk.
Suggest safer metadata wording without making the project grander.
```

## Suggested issue #6 comment

Copy this into issue #6 when ready:

```text
Phase 6 metadata, license, and Zenodo archive review update.

Files reviewed:
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

Findings:
- 

Required fixes:
- 

Metadata risks or accepted deferrals:
- 

Decision:
PHASE 6 [PASS / PASS WITH MINOR EDITS / NEEDS REVISION / BLOCKED]

Notes:

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

Next steps:

1. Move to Phase 7 release candidate and final approval review.
2. Prepare the release candidate package using `docs/release-candidate-manifest.md`.
3. Confirm GitHub release notes are ready.
4. Confirm Zenodo metadata is still marked pending until final GitHub release.
5. Confirm Public Archive Mode will be updated only after real release/DOI links exist.

## Closing principle

Metadata is not paperwork.

It is the public memory of the release.

If the metadata overclaims, the archive overclaims.
