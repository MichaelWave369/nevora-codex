# Phase Packet Index

This index links the focused decision and launch packets for the Nevora Codex v1.0 phase-gate review runway.

Use this document when you are ready to execute the gates in order.

## Current state

```text
PHASE 1 DECISION PACKET READY — PHASES 2-7 LAUNCH PACKETS READY — NO FINAL RELEASE YET
```

The packets are execution documents. They do not replace the quickstarts, master review index, phase-gate status board, review response log, blocker triage guide, release candidate manifest, or final Go / No-Go record.

## Packet table

| Phase | Packet | Purpose | Opens from | Moves to |
| --- | --- | --- | --- | --- |
| Phase 1 | `docs/phase-1-decision-packet.md` | Helps the author-steward make the Phase 1 decision. | Active now | Phase 2 |
| Phase 2 | `docs/phase-2-launch-packet.md` | Starts claim discipline and AI-consciousness boundary review. | Phase 1 pass or pass with minor edits | Phase 3 |
| Phase 3 | `docs/phase-3-launch-packet.md` | Starts privacy, safety, and anti-coercion review. | Phase 2 pass or active clearance | Phase 4 |
| Phase 4 | `docs/phase-4-launch-packet.md` | Starts editorial consistency and readability review. | Phase 3 pass or active clearance | Phase 5 |
| Phase 5 | `docs/phase-5-launch-packet.md` | Starts build, PDF, and site artifact review. | Phase 4 pass or active clearance | Phase 6 |
| Phase 6 | `docs/phase-6-launch-packet.md` | Starts metadata, license, and Zenodo archive review. | Phase 5 pass or active clearance | Phase 7 |
| Phase 7 | `docs/phase-7-launch-packet.md` | Starts release candidate and final approval review. | Phase 6 pass or explicit clearance | GitHub release / Zenodo archive |

## Quickstarts

The launch packets are paired with these quickstarts:

```text
docs/phase-1-author-steward-quickstart.md
docs/phase-2-claim-discipline-quickstart.md
docs/phase-3-privacy-safety-quickstart.md
docs/phase-4-editorial-readability-quickstart.md
docs/phase-5-build-artifact-quickstart.md
docs/phase-6-metadata-archive-quickstart.md
docs/phase-7-release-candidate-quickstart.md
```

The quickstart index is:

```text
docs/phase-gate-quickstart-index.md
```

## Status board

Always check the current phase state here:

```text
docs/phase-gate-status.md
```

The status board should be updated whenever:

- a phase begins active review;
- a phase passes;
- a phase passes with minor edits;
- a phase needs revision;
- a phase becomes blocked;
- a phase is intentionally deferred;
- a blocker is opened or resolved;
- the release candidate state changes.

## Issue board

Each packet maps to one GitHub issue:

| Issue | Phase |
| --- | --- |
| `#1` | Phase 1 author-steward release comfort and privacy |
| `#2` | Phase 2 claim discipline and AI-consciousness boundary |
| `#3` | Phase 3 privacy, safety, and anti-coercion |
| `#4` | Phase 4 editorial consistency and readability |
| `#5` | Phase 5 build, PDF, and site artifacts |
| `#6` | Phase 6 metadata, license, and Zenodo archive |
| `#7` | Phase 7 release candidate and final approval |

## Execution order

Use this order unless a blocker requires returning to an earlier phase:

```text
Phase 1 decision
→ Phase 2 launch
→ Phase 3 launch
→ Phase 4 launch
→ Phase 5 launch
→ Phase 6 launch
→ Phase 7 launch
→ GitHub v1.0.0 release
→ Zenodo DOI archive
→ v1.1 feedback cycle
```

## Do not skip these controls

Before final release, confirm:

- [ ] Phase 1 has a recorded author-steward decision.
- [ ] Phases 2-6 pass or are explicitly deferred with rationale.
- [ ] Phase 7 Go / No-Go record is complete.
- [ ] No unresolved blockers remain.
- [ ] `docs/review-response-log.md` is current.
- [ ] Release artifacts are built from source.
- [ ] GitHub Pages site is status-accurate.
- [ ] Citation, license, and Zenodo metadata are reviewed.
- [ ] Final approval phrase is recorded exactly.

## Final approval phrase

The final release may proceed only when this exact phrase is recorded during Phase 7:

```text
APPROVED FOR NEVORA CODEX v1.0 PUBLIC RELEASE
```

Until then, Nevora remains in public-edition preparation.

## Closing principle

The packets are not bureaucracy.

They are the railings that let the work move forward without losing its boundaries.
