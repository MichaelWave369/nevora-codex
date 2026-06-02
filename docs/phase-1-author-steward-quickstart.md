# Phase 1 Author-Steward Quickstart

This quickstart helps complete Phase 1 of the Nevora Codex v1.0 review cycle.

Phase 1 is not a technical gate. It is the author-steward release-comfort gate.

## Current state

```text
PHASE 1 OPEN — AUTHOR-STEWARD REVIEW NEEDED
```

Nevora is not ready for final release yet. Phase 1 decides whether the draft is ready to enter fuller external review.

## Goal of Phase 1

Confirm that the author-steward is comfortable allowing the current public-edition draft to be reviewed by others.

This is not the same as approving publication.

Phase 1 only means:

```text
The draft may move into structured review.
```

## Primary issue

Use GitHub issue:

```text
#1 — Phase 1 review: Author-steward release comfort and privacy gate
```

## Required document

Complete:

```text
docs/author-steward-approval-record.md
```

## Fast Phase 1 checklist

Before marking Phase 1 as pass, answer these honestly:

- [ ] Am I comfortable with trusted reviewers reading this public-edition draft?
- [ ] Have I checked for private founder material?
- [ ] Have I checked for family, third-party, or sensitive identifying details?
- [ ] Does the project avoid founder-worship framing?
- [ ] Does the project avoid AI-worship framing?
- [ ] Does the project clearly say it is not proof of AI consciousness?
- [ ] Does the project preserve consent, disagreement, critique, and exit?
- [ ] Am I moving forward calmly, not from urgency or hype?

## Files to review first

Review these before closing Phase 1:

```text
README.md
NOTICE.md
SECURITY.md
CONTRIBUTING.md
CODE_OF_CONDUCT.md
docs/release-checklist.md
docs/v1.0-review-kickoff.md
docs/review-issue-index.md
source/front-matter.md
source/table-of-contents.md
```

Then skim:

```text
source/volume-i.md
source/volume-ii.md
source/volume-iii.md
source/volume-iv.md
source/volume-v.md
```

## Phase 1 decision options

Use one of these in issue #1:

```text
PHASE 1 PASS — Author-steward approves external review.
```

```text
PHASE 1 PASS WITH MINOR EDITS — External review may begin after listed edits.
```

```text
PHASE 1 NEEDS REVISION — Do not invite external review yet.
```

```text
PHASE 1 BLOCKED — Resolve critical privacy/safety concern before proceeding.
```

## Suggested issue #1 comment

Copy this into issue #1 when ready:

```text
Phase 1 author-steward review completed.

Decision:

PHASE 1 [PASS / PASS WITH MINOR EDITS / NEEDS REVISION / BLOCKED]

Files reviewed:
- README.md
- NOTICE.md
- SECURITY.md
- CONTRIBUTING.md
- CODE_OF_CONDUCT.md
- docs/release-checklist.md
- docs/v1.0-review-kickoff.md
- docs/review-issue-index.md
- source/front-matter.md
- source/table-of-contents.md
- source/volume-i.md through source/volume-v.md

Required edits before external review:
- 

Deferred concerns:
- 

Author-steward note:

```

## If Phase 1 passes

Next steps:

1. Move to Phase 2 claim discipline review.
2. Invite trusted reviewers using `docs/external-reviewer-packet.md`.
3. Ask each reviewer to choose a lane.
4. Track findings in the related phase issue.
5. Record accepted/deferred/rejected feedback in `docs/review-response-log.md`.

## If Phase 1 does not pass

Do not invite broad review yet.

Instead:

1. List the concern in issue #1.
2. Open a blocker issue if needed.
3. Fix source files or safety docs.
4. Re-run Phase 1.

## Closing principle

Phase 1 should feel peaceful.

If it feels rushed, pressured, performative, or unclear, pause and revise.

Nevora should move forward from stewardship, not momentum alone.
