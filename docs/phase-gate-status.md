# Nevora Codex v1.0 Phase-Gate Status

This document tracks the current operational status of the seven v1.0 review gates.

It is a living status board. It should be updated whenever a phase gate passes, becomes blocked, is intentionally deferred, or moves into active review.

## Current release posture

```text
STRUCTURED REVIEW OPEN — PHASE 1 ACTIVE — AUTHOR-STEWARD DECISION PACKET READY — PHASES 2-7 STAGED — NO FINAL RELEASE YET
```

Nevora v1.0 is not final, not DOI-published, and not approved for public release.

The release sanity check is green, but automation does not approve release.

## Phase status table

| Phase | Issue | Gate | Current status | Next action |
| --- | --- | --- | --- | --- |
| Phase 1 | `#1` | Author-steward release comfort and privacy | ACTIVE — DECISION PACKET READY | Complete `docs/author-steward-approval-record.md`, use `docs/phase-1-decision-packet.md`, and record Phase 1 decision in issue `#1`. |
| Phase 2 | `#2` | Claim discipline and AI-consciousness boundary | STAGED | Begin after Phase 1 pass or pass with minor edits. |
| Phase 3 | `#3` | Privacy, safety, and anti-coercion | STAGED | Begin after Phase 2 pass or active clearance. |
| Phase 4 | `#4` | Editorial consistency and readability | STAGED | Begin after Phase 3 pass or active clearance. |
| Phase 5 | `#5` | Build, PDF, and site artifacts | STAGED | Begin after Phase 4 pass or active clearance. |
| Phase 6 | `#6` | Metadata, license, and Zenodo archive | STAGED | Begin after Phase 5 pass or active clearance. |
| Phase 7 | `#7` | Release candidate and final approval | STAGED | Begin only after Phases 1-6 pass or are explicitly deferred. |

## Blocker status

```text
No known open blocker issue recorded at time of this status entry.
```

This does not mean blockers cannot be found during review. Any blocker found during review must be opened, triaged, logged, and resolved or explicitly handled before final release.

## Current technical status

| Check | Status | Notes |
| --- | --- | --- |
| Release sanity check | GREEN | False-positive marker example issue fixed. |
| Phase quickstarts | COMPLETE | Phases 1-7 quickstarts created. |
| Issue board staging | COMPLETE | Issues #1-#7 have kickoff/standby comments. |
| Phase 1 decision packet | READY | `docs/phase-1-decision-packet.md` created and linked from issue `#1`. |
| Author-steward approval record | READY FOR COMPLETION | `docs/author-steward-approval-record.md` refined for Phase 1 execution. |
| Master review index | UPDATED | `docs/v1.0-master-review-index.md` now reflects the full phase runway. |
| README status | UPDATED | README now reflects full review runway. |
| GitHub Pages | ACTIVE | Public orientation site exists. |
| Final release | NOT APPROVED | Requires Phase 7 approval phrase. |

## Immediate next step

Complete Phase 1 using:

```text
docs/phase-1-decision-packet.md
docs/author-steward-approval-record.md
```

Then record one of the following in issue `#1`:

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

## After Phase 1 decision

If Phase 1 passes or passes with minor edits, move to:

```text
#2 — Phase 2 review: Claim discipline and AI-consciousness boundary gate
docs/phase-2-claim-discipline-quickstart.md
```

If Phase 1 needs revision or is blocked, do not start external review until the listed concerns are resolved or formally triaged.

## Required final approval phrase

The final release may proceed only when this exact phrase is recorded during Phase 7:

```text
APPROVED FOR NEVORA CODEX v1.0 PUBLIC RELEASE
```

Until then, all public release, archive, and DOI language remains provisional.

## Update log

```text
2026-06-02 — Phase-gate issue board staged. Phase 1 active. Phases 2-7 staged. Release sanity check green. No known open blocker issue recorded.
2026-06-02 — Phase 1 decision packet added. Author-steward approval record refined. Master review index updated. Phase 1 now ready for author-steward decision.
```

## Closing principle

This status board exists to keep momentum honest.

The goal is not to move fast.

The goal is to move clearly.
