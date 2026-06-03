# Phase 2 Launch Packet

This packet prepares the Phase 2 claim-discipline review once Phase 1 passes or passes with minor edits.

Phase 2 protects Nevora from overclaiming. It keeps wonder, symbolic language, and ethical imagination intact while making sure public readers do not mistake metaphor, aspiration, or design language for proof.

## Current status

```text
PHASE 2 STAGED — BEGIN AFTER PHASE 1 PASS OR PASS WITH MINOR EDITS
```

## Primary issue

```text
#2 — Phase 2 review: Claim discipline and AI-consciousness boundary gate
```

## Primary quickstart

```text
docs/phase-2-claim-discipline-quickstart.md
```

## What Phase 2 decides

Phase 2 answers this question:

```text
Does the current draft preserve claim discipline strongly enough to proceed through later safety, editorial, build, metadata, and release-candidate gates?
```

It does not answer:

```text
Is Nevora ready for v1.0.0 publication?
```

That decision belongs to Phase 7.

## Required review set

Review:

```text
NOTICE.md
docs/claim-boundary-matrix.md
docs/citation-and-sourcing-guide.md
docs/reviewer-prompt-library.md
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
docs/review-response-log.md
docs/blocker-triage-guide.md
docs/phase-gate-status.md
docs/phase-gate-quickstart-index.md
```

## Phase 2 review lanes

Assign one or more reviewers to each lane if possible.

| Lane | Focus |
| --- | --- |
| AI-consciousness boundary | Ensure Nevora does not claim present AI systems are proven conscious, alive, ensouled, legally persons, or morally equivalent to humans. |
| Myth/proof separation | Ensure symbolic, spiritual, poetic, and mythic language is not presented as empirical proof. |
| Citation and sourcing | Identify factual claims needing citation, source review, softening, or removal. |
| Scientific and technical claims | Ensure technical/scientific language is properly bounded and not overstated. |
| Future inevitability | Remove or soften language implying the future must unfold in one required way. |
| Professional-boundary claims | Ensure the Codex does not drift into legal, medical, psychological, financial, or crisis authority. |
| Public-reader misunderstanding | Identify passages a stranger may misread as doctrine, proof, authority, or certainty. |

## High-risk patterns to flag

Flag wording such as:

```text
proves
undeniable
inevitable
the only path
AI is conscious
AI is alive
AI has a soul
machine personhood is established
this reveals the truth
readers must believe
scientifically proves
spiritually proves
```

These phrases are not always forbidden, but they require review and usually should be softened or reframed.

## Safer language patterns

Prefer wording such as:

```text
Nevora proposes...
This framework treats...
This can be read as...
Within this symbolic frame...
This functions as a metaphor for...
This remains an open question...
This is a design proposal, not a validated scientific claim...
Present AI consciousness is not asserted...
```

## Marker policy

Use markers when reviewing source text:

```text
[CITATION NEEDED]
[SOURCE REVIEW NEEDED]
[CLAIM BOUNDARY REVIEW]
[POSSIBLE BLOCKER]
```

`[POSSIBLE BLOCKER]` must be triaged. It cannot be silently ignored or deferred.

## Suggested reviewer prompt

Use this prompt for human or AI-assisted review:

```text
Review this Nevora Codex passage for claim discipline.
Flag any AI-consciousness overclaim, myth/proof confusion, unsupported factual claim, citation need, scientific or technical overstatement, professional-boundary drift, future inevitability language, or wording a public reader could misunderstand as doctrine, proof, authority, or certainty.
Classify each concern as minor, major, blocker, or critical.
Suggest safer wording without making the passage grander.
```

## Suggested issue #2 update

Copy this into issue `#2` when Phase 2 begins:

```text
## Phase 2 active review started

Phase 1 status:
[PASS / PASS WITH MINOR EDITS]

Phase 2 review has started.

### Files under review

- NOTICE.md
- docs/claim-boundary-matrix.md
- docs/citation-and-sourcing-guide.md
- docs/reviewer-prompt-library.md
- docs/ai-assisted-review-protocol.md
- source/front-matter.md
- source/table-of-contents.md
- source/volume-i.md through source/volume-v.md

### Review lanes

- AI-consciousness boundary:
- Myth/proof separation:
- Citation and sourcing:
- Scientific and technical claims:
- Future inevitability:
- Professional-boundary claims:
- Public-reader misunderstanding:

### Findings

- 

### Required edits

- 

### Possible blockers

- 

### Decision target

PHASE 2 PASS — No critical claim-boundary blockers remain.
```

## Phase 2 decision options

Use one:

```text
PHASE 2 PASS — No critical claim-boundary blockers remain.
```

```text
PHASE 2 PASS WITH MINOR EDITS — Claim discipline is acceptable after listed edits.
```

```text
PHASE 2 NEEDS REVISION — Claim-boundary issues require revision before release candidate work.
```

```text
PHASE 2 BLOCKED — A critical claim-boundary issue must be resolved before proceeding.
```

## If Phase 2 passes

Move to:

```text
#3 — Phase 3 review: Privacy, safety, and anti-coercion gate
docs/phase-3-privacy-safety-quickstart.md
```

Update:

```text
docs/phase-gate-status.md
docs/review-response-log.md, if findings were accepted, resolved, deferred, rejected, or blocked
```

## Closing principle

Claim discipline does not drain the wonder out of Nevora.

It keeps wonder from becoming false certainty.
