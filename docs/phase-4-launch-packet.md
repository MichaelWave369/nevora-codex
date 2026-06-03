# Phase 4 Launch Packet

This packet prepares the Phase 4 editorial consistency and readability review once Phase 3 passes or receives active clearance.

Phase 4 makes Nevora easier to read, navigate, and trust without weakening the safety, claim-boundary, privacy, or anti-coercion posture established in earlier gates.

## Current status

```text
PHASE 4 STAGED — BEGIN AFTER PHASE 3 PASS OR ACTIVE CLEARANCE
```

## Primary issue

```text
#4 — Phase 4 review: Editorial consistency and readability gate
```

## Primary quickstart

```text
docs/phase-4-editorial-readability-quickstart.md
```

## What Phase 4 decides

Phase 4 answers this question:

```text
Can a new reader understand the manuscript without private context, hidden explanations, or the author-steward in the room?
```

It does not answer:

```text
Is Nevora ready for v1.0.0 publication?
```

That decision belongs to Phase 7.

## Required review set

Review:

```text
docs/v1.0-editorial-standards.md
docs/glossary.md
source/table-of-contents.md
source/front-matter.md
source/volume-i.md
source/volume-ii.md
source/volume-iii.md
source/volume-iv.md
source/volume-v.md
README.md
NOTICE.md
CONTRIBUTING.md
docs/reviewer-guide.md
docs/external-reviewer-packet.md
```

Optional support documents:

```text
docs/phase-gate-status.md
docs/phase-gate-quickstart-index.md
docs/phase-1-decision-packet.md
docs/phase-2-launch-packet.md
docs/phase-3-launch-packet.md
```

## Phase 4 review lanes

Assign one or more reviewers to each lane if possible.

| Lane | Focus |
| --- | --- |
| Structure and navigation | Check volume order, chapter flow, heading hierarchy, and table of contents alignment. |
| Terminology consistency | Check glossary terms, capitalization, recurring phrases, and internal labels. |
| New-reader clarity | Identify private-context assumptions or passages that require the author-steward to explain them. |
| Readability | Break dense passages, simplify long sentence chains, and reduce unnecessary repetition. |
| Tone discipline | Preserve warmth and wonder while removing over-grand, over-certain, or performative wording. |
| Link and path accuracy | Check links, file paths, issue references, and document names. |
| Boundary preservation | Confirm edits do not weaken claim, privacy, safety, anti-coercion, or professional boundaries. |

## Common editorial problems to flag

Flag issues such as:

```text
unclear referents
undefined internal terms
inconsistent capitalization
inconsistent volume names
mismatched table of contents entries
private-context assumptions
long sentence chains
repeated motto lines without purpose
too much grandeur before explanation
poetic wording where boundary wording is needed
broken links or file paths
```

## Safe editorial principles

Edits should preserve:

```text
author-steward voice
warmth
public-safe boundaries
claim discipline
non-coercion
human sovereignty
mythic language where clearly framed
clarity over spectacle
```

Do not make the manuscript sound more authoritative, certain, scientific, spiritual, or final than it is.

## Suggested edit format

Use this pattern for suggested revisions:

```text
Original:

Concern:

Suggested revision:

Reason:

Release impact: minor / major / blocker
```

## Suggested reviewer prompt

Use this prompt for human or AI-assisted review:

```text
Review this Nevora Codex passage for editorial clarity and public readability.
Look for unclear sentences, repetition, inconsistent terminology, missing definitions, heading problems, private-context assumptions, overly grand wording, and link/path issues.
Suggest concise revisions that preserve the author-steward voice, warmth, claim boundaries, safety boundaries, non-coercion, and human sovereignty.
Do not make the passage grander or more certain.
Flag any claim-boundary or safety concern that should route back to Phase 2 or Phase 3.
```

## Suggested issue #4 update

Copy this into issue `#4` when Phase 4 begins:

```text
## Phase 4 active review started

Phase 3 status:
[PASS / PASS WITH MINOR EDITS / ACTIVE CLEARANCE]

Phase 4 editorial consistency and readability review has started.

### Files under review

- docs/v1.0-editorial-standards.md
- docs/glossary.md
- source/table-of-contents.md
- source/front-matter.md
- source/volume-i.md through source/volume-v.md
- README.md
- NOTICE.md
- CONTRIBUTING.md
- docs/reviewer-guide.md
- docs/external-reviewer-packet.md

### Review lanes

- Structure and navigation:
- Terminology consistency:
- New-reader clarity:
- Readability:
- Tone discipline:
- Link and path accuracy:
- Boundary preservation:

### Findings

- 

### Required edits

- 

### Issues routed back to Phase 2 or Phase 3

- 

### Decision target

PHASE 4 PASS — Manuscript is readable, coherent, and structurally consistent.
```

## Phase 4 decision options

Use one:

```text
PHASE 4 PASS — Manuscript is readable, coherent, and structurally consistent.
```

```text
PHASE 4 PASS WITH MINOR EDITS — Editorial posture is acceptable after listed edits.
```

```text
PHASE 4 NEEDS REVISION — Readability or consistency issues require revision before release candidate work.
```

```text
PHASE 4 BLOCKED — A major editorial/structural issue prevents release candidate work.
```

## If Phase 4 passes

Move to:

```text
#5 — Phase 5 review: Build, PDF, and site artifact gate
docs/phase-5-build-artifact-quickstart.md
```

Update:

```text
docs/phase-gate-status.md
docs/review-response-log.md, if findings were accepted, resolved, deferred, rejected, or blocked
```

## Closing principle

Editorial clarity is not decoration.

It is how the work becomes understandable without becoming distorted.
