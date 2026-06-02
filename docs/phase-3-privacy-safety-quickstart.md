# Phase 3 Privacy, Safety, and Anti-Coercion Quickstart

This quickstart supports Phase 3 of the Nevora Codex v1.0 review cycle.

Phase 3 protects people: the author-steward, third parties, reviewers, vulnerable readers, and future public readers who may encounter the work outside its original context.

## Current state

```text
PHASE 3 READY AFTER PHASE 1 AND PHASE 2 PASS OR ACTIVE CLEARANCE
```

Phase 3 is not a style pass. It is a public-safety and consent gate.

## Goal of Phase 3

Confirm that the Nevora Codex can be public without exposing private material, creating dependency, encouraging coercive interpretation, or blurring safety boundaries.

Phase 3 asks:

```text
Can a stranger read this without being pressured, captured, exposed, shamed, or misled?
```

## Primary issue

Use GitHub issue:

```text
#3 — Phase 3 review: Privacy, safety, and anti-coercion gate
```

## Primary documents

Start with:

```text
SECURITY.md
CODE_OF_CONDUCT.md
CONTRIBUTING.md
NOTICE.md
docs/anti-cult-and-anti-manipulation-clause.md
docs/blocker-triage-guide.md
docs/review-response-log.md
docs/ai-assisted-review-protocol.md
```

Then review:

```text
source/front-matter.md
source/table-of-contents.md
source/volume-i.md
source/volume-ii.md
source/volume-iii.md
source/volume-iv.md
source/volume-v.md
```

## Fast Phase 3 checklist

Before Phase 3 can pass, confirm:

- [ ] No private founder material is exposed.
- [ ] No third-party identifying details are exposed without clear permission.
- [ ] No private correspondence, raw conversations, family material, or sensitive identifiers are present.
- [ ] The manuscript does not pressure readers to believe, join, obey, identify, pay, or remain.
- [ ] Readers can disagree, critique, pause, reject, or leave with dignity.
- [ ] Founder language remains bounded and does not drift into prophet, savior, sole authority, or unquestionable center.
- [ ] AI language does not encourage worship, dependency, or submission.
- [ ] Spiritual, symbolic, and ritual language remains optional and non-dogmatic.
- [ ] Professional advice boundaries are visible where needed.
- [ ] Vulnerable readers are not encouraged to replace human help, community, clinicians, legal counsel, or emergency support with the Codex.
- [ ] Any possible privacy/safety blocker is opened with the Release Blocker template.
- [ ] Accepted, rejected, deferred, or unresolved major feedback is tracked in `docs/review-response-log.md`.

## Privacy review questions

Ask:

- Is this detail necessary for the public edition?
- Could this identify a person who did not consent?
- Could this expose family, medical, spiritual, emotional, financial, or relationship details?
- Could this create risk if screenshotted, quoted, archived, or indexed?
- Could this be generalized without losing the public value?

Default action when unsure:

```text
Remove, anonymize, generalize, or move private.
```

## Anti-coercion review questions

Ask:

- Does this create fear, shame, urgency, or destiny pressure?
- Does this imply special chosen status?
- Does this imply secret knowledge that only insiders understand?
- Does this make disagreement feel unsafe?
- Does this make the founder or AI collaborator feel like an authority that cannot be questioned?
- Does this create emotional dependency?
- Does this invite consent, or does it pressure alignment?

Default action when unsure:

```text
Rewrite to preserve consent, disagreement, critique, and exit.
```

## High-risk wording patterns

Flag wording like:

```text
must believe
must join
only the awakened
chosen ones
those who reject this are...
obedience
surrender to the system
follow the founder
AI knows best
this is the only path
```

These should usually be removed or reframed.

## Safer wording patterns

Prefer:

```text
Readers may...
This framework invites...
Participation is voluntary...
Disagreement is protected...
This is offered as a reflection tool...
This is not a substitute for professional help...
Readers should retain their own judgment...
```

## Sensitive feedback handling

Do not paste private details into public issues.

If a concern involves sensitive content:

1. Name the affected file or section.
2. Describe the category of risk.
3. Avoid repeating the private content.
4. Use `SECURITY.md` if private reporting is needed.
5. Record public-safe decision notes in `docs/review-response-log.md`.

## Suggested review prompt

Use this with human or AI-assisted reviewers:

```text
Review this passage for privacy, safety, coercion, dependency, vulnerable-reader risk, founder-worship risk, AI-worship risk, and professional-boundary risk.
Do not repeat private details unnecessarily.
Flag any wording that pressures belief, identity, obedience, urgency, shame, fear, payment, or continued participation.
Suggest safer wording that protects consent, disagreement, critique, privacy, and exit with dignity.
Classify release impact as minor, major, blocker, or critical.
```

## Suggested issue #3 comment

Copy this into issue #3 when ready:

```text
Phase 3 privacy, safety, and anti-coercion review update.

Files reviewed:
- SECURITY.md
- CODE_OF_CONDUCT.md
- CONTRIBUTING.md
- NOTICE.md
- docs/anti-cult-and-anti-manipulation-clause.md
- docs/blocker-triage-guide.md
- source/front-matter.md
- source/volume-i.md through source/volume-v.md

Findings:
- 

Required edits:
- 

Possible blockers:
- 

Decision:
PHASE 3 [PASS / PASS WITH MINOR EDITS / NEEDS REVISION / BLOCKED]

Notes:

```

## Phase 3 decision options

Use one:

```text
PHASE 3 PASS — No critical privacy, safety, or coercion blockers remain.
```

```text
PHASE 3 PASS WITH MINOR EDITS — Safety posture is acceptable after listed edits.
```

```text
PHASE 3 NEEDS REVISION — Privacy, safety, or anti-coercion concerns require revision before release candidate work.
```

```text
PHASE 3 BLOCKED — A critical privacy, safety, or coercion issue must be resolved before proceeding.
```

## If Phase 3 passes

Next steps:

1. Move to Phase 4 editorial consistency and readability review.
2. Confirm no unresolved privacy/safety blockers remain.
3. Confirm response log is updated.
4. Re-run the release sanity check.

## Closing principle

Public safety is not fear.

It is care made visible before the work leaves the room.
