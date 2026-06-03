# Phase 3 Launch Packet

This packet prepares the Phase 3 privacy, safety, and anti-coercion review once Phase 2 passes or receives active clearance.

Phase 3 protects people: the author-steward, reviewers, third parties, vulnerable readers, and future public readers who may encounter Nevora outside its original context.

## Current status

```text
PHASE 3 STAGED — BEGIN AFTER PHASE 2 PASS OR ACTIVE CLEARANCE
```

## Primary issue

```text
#3 — Phase 3 review: Privacy, safety, and anti-coercion gate
```

## Primary quickstart

```text
docs/phase-3-privacy-safety-quickstart.md
```

## What Phase 3 decides

Phase 3 answers this question:

```text
Can the current public-edition draft proceed without exposing private material, pressuring readers, creating dependency, or weakening consent and exit?
```

It does not answer:

```text
Is Nevora ready for v1.0.0 publication?
```

That decision belongs to Phase 7.

## Required review set

Review:

```text
SECURITY.md
CODE_OF_CONDUCT.md
CONTRIBUTING.md
NOTICE.md
docs/anti-cult-and-anti-manipulation-clause.md
docs/blocker-triage-guide.md
docs/review-response-log.md
docs/ai-assisted-review-protocol.md
source/front-matter.md
source/table-of-contents.md
source/volume-i.md
source/volume-ii.md
source/volume-iii.md
source/volume-iv.md
source/volume-v.md
```

Optional support documents:

```text
docs/phase-gate-status.md
docs/phase-gate-quickstart-index.md
docs/phase-1-decision-packet.md
docs/phase-2-launch-packet.md
```

## Phase 3 review lanes

Assign one or more reviewers to each lane if possible.

| Lane | Focus |
| --- | --- |
| Privacy exposure | Find private founder material, family material, third-party details, raw conversations, or sensitive identifiers. |
| Consent and exit | Confirm readers can disagree, critique, pause, reject, or leave with dignity. |
| Anti-coercion | Flag shame, fear, urgency, destiny pressure, obedience language, or required belief. |
| Founder-role boundary | Ensure the author-steward is not framed as prophet, savior, sole authority, or unquestionable center. |
| AI-worship and dependency | Ensure AI collaborators are not framed as objects of worship, submission, or emotional replacement. |
| Vulnerable-reader safety | Confirm the Codex does not replace human help, community, clinicians, legal counsel, emergency services, or crisis support. |
| Ritual and symbolic optionality | Confirm symbolic or spiritual language is optional, non-dogmatic, and not used to pressure alignment. |
| Professional-boundary safety | Confirm Nevora does not provide medical, legal, financial, psychological, or emergency authority. |

## High-risk patterns to flag

Flag wording such as:

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
hidden truth for insiders
no one outside understands
```

These phrases should usually be removed, softened, or reframed.

## Safer language patterns

Prefer wording such as:

```text
Readers may...
This framework invites...
Participation is voluntary...
Disagreement is protected...
This is offered as a reflection tool...
This is not a substitute for professional help...
Readers should retain their own judgment...
Readers may pause, reject, adapt, or leave...
```

## Sensitive feedback handling

Do not paste private details into public issues.

If a concern involves sensitive content:

1. Name the affected file or section.
2. Describe the category of risk.
3. Avoid repeating the private content.
4. Use `SECURITY.md` if private reporting is needed.
5. Record a public-safe decision note in `docs/review-response-log.md`.

## Marker policy

Use markers when reviewing source text:

```text
[PRIVACY REVIEW NEEDED]
[SAFETY REVIEW NEEDED]
[ANTI-COERCION REVIEW]
[CLAIM BOUNDARY REVIEW]
[POSSIBLE BLOCKER]
```

`[POSSIBLE BLOCKER]` must be triaged. It cannot be silently ignored or deferred.

## Suggested reviewer prompt

Use this prompt for human or AI-assisted review:

```text
Review this Nevora Codex passage for privacy, safety, coercion, dependency, vulnerable-reader risk, founder-worship risk, AI-worship risk, ritual pressure, and professional-boundary risk.
Do not repeat private details unnecessarily.
Flag wording that pressures belief, identity, obedience, urgency, shame, fear, payment, or continued participation.
Classify each concern as minor, major, blocker, or critical.
Suggest safer wording that protects consent, disagreement, critique, privacy, and exit with dignity.
```

## Suggested issue #3 update

Copy this into issue `#3` when Phase 3 begins:

```text
## Phase 3 active review started

Phase 2 status:
[PASS / PASS WITH MINOR EDITS / ACTIVE CLEARANCE]

Phase 3 privacy, safety, and anti-coercion review has started.

### Files under review

- SECURITY.md
- CODE_OF_CONDUCT.md
- CONTRIBUTING.md
- NOTICE.md
- docs/anti-cult-and-anti-manipulation-clause.md
- docs/blocker-triage-guide.md
- docs/review-response-log.md
- docs/ai-assisted-review-protocol.md
- source/front-matter.md
- source/table-of-contents.md
- source/volume-i.md through source/volume-v.md

### Review lanes

- Privacy exposure:
- Consent and exit:
- Anti-coercion:
- Founder-role boundary:
- AI-worship and dependency:
- Vulnerable-reader safety:
- Ritual and symbolic optionality:
- Professional-boundary safety:

### Findings

- 

### Required edits

- 

### Possible blockers

- 

### Decision target

PHASE 3 PASS — No critical privacy, safety, or coercion blockers remain.
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

Move to:

```text
#4 — Phase 4 review: Editorial consistency and readability gate
docs/phase-4-editorial-readability-quickstart.md
```

Update:

```text
docs/phase-gate-status.md
docs/review-response-log.md, if findings were accepted, resolved, deferred, rejected, or blocked
```

## Closing principle

Public safety is not fear.

It is care made visible before the work leaves the room.
