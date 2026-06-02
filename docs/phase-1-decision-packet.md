# Phase 1 Decision Packet

This packet is a focused helper for completing Phase 1 of the Nevora Codex v1.0 review cycle.

Phase 1 is the author-steward release-comfort and privacy gate. It does not approve final publication. It decides whether the current public-edition draft may move into structured review.

## Current status

```text
PHASE 1 ACTIVE — AUTHOR-STEWARD DECISION NEEDED
```

## Primary issue

```text
#1 — Phase 1 review: Author-steward release comfort and privacy gate
```

## Primary documents

```text
docs/phase-1-author-steward-quickstart.md
docs/author-steward-approval-record.md
docs/phase-gate-status.md
docs/phase-gate-quickstart-index.md
```

## What Phase 1 decides

Phase 1 answers this question:

```text
Is the current public-edition draft safe and comfortable enough to enter structured review?
```

It does not answer:

```text
Is Nevora ready for v1.0.0 publication?
```

That decision belongs to Phase 7.

## Minimum review set

Before recording the Phase 1 decision, review:

```text
README.md
NOTICE.md
SECURITY.md
CONTRIBUTING.md
CODE_OF_CONDUCT.md
docs/release-checklist.md
docs/v1.0-review-kickoff.md
docs/review-issue-index.md
docs/phase-gate-status.md
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

## Author-steward self-check

Answer these before making a Phase 1 decision:

- [ ] Am I comfortable with trusted reviewers reading the current public-edition draft?
- [ ] Have I checked for private founder material?
- [ ] Have I checked for family, third-party, or sensitive identifying details?
- [ ] Does the project avoid founder-worship framing?
- [ ] Does the project avoid AI-worship framing?
- [ ] Does the project clearly say it is not proof of present AI consciousness?
- [ ] Does the project preserve consent, disagreement, critique, and exit?
- [ ] Am I moving forward from calm stewardship rather than urgency, hype, or pressure?

## Possible decisions

Use one of these:

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

## Recommended decision comment template

Copy this into issue `#1` when ready:

```text
## Phase 1 author-steward decision

Phase 1 author-steward review completed.

Decision:

PHASE 1 [PASS / PASS WITH MINOR EDITS / NEEDS REVISION / BLOCKED]

### Files reviewed

- README.md
- NOTICE.md
- SECURITY.md
- CONTRIBUTING.md
- CODE_OF_CONDUCT.md
- docs/release-checklist.md
- docs/v1.0-review-kickoff.md
- docs/review-issue-index.md
- docs/phase-gate-status.md
- source/front-matter.md
- source/table-of-contents.md
- source/volume-i.md through source/volume-v.md

### Required edits before external review

- 

### Deferred concerns

- 

### Author-steward note


### Next action

If PASS or PASS WITH MINOR EDITS: move to Phase 2 claim discipline review.
If NEEDS REVISION or BLOCKED: resolve listed concerns before inviting external review.
```

## If the decision is PASS

Update:

```text
docs/phase-gate-status.md
```

Then move to:

```text
#2 — Phase 2 review: Claim discipline and AI-consciousness boundary gate
docs/phase-2-claim-discipline-quickstart.md
```

## If the decision is PASS WITH MINOR EDITS

List the edits in issue `#1` and decide whether they must be completed before Phase 2 begins.

If they affect privacy, claim boundaries, or safety, complete them first.

If they are minor editorial cleanup, they may be routed to Phase 4.

## If the decision is NEEDS REVISION

Do not invite external review yet.

Record the concern in issue `#1`, fix the source documents, and repeat Phase 1.

## If the decision is BLOCKED

Open a blocker issue using:

```text
.github/ISSUE_TEMPLATE/blocker.yml
```

Then record the blocker in:

```text
docs/review-response-log.md
```

A blocker cannot be silently deferred.

## Closing principle

Phase 1 should feel calm.

If the author-steward cannot say yes calmly, the correct move is not speed.

The correct move is care.
