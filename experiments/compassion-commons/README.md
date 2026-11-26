# Compassion Commons simulator v0.1

Experimental, synthetic, single-item planning round. No network, dependencies, accounts, currency, human ranking, real inventory or execution of allocations. Does not alter the v1.0 reader or assembly.

Run: `node --test tests/compassion-commons.test.mjs` (Node 20).

Input: integer stock and round (0–1,000,000), at most 1,000 unique opaque household IDs, one request per household, integer quantity (0–1,000,000), tier (essential, routine, optional), and integer arrival order. All arithmetic products stay within safe integer range. Tier is supplied by a fictional scenario; no automated classification of real needs. Unknown request fields fail closed. For equal tier, proportional policy uses largest remainder and rotating ID tie-break; equal-share and arrival-order baselines retain identical tier ordering. Rotation is deterministic for a fixed roster, not a durable fairness guarantee when membership changes. A proposal is not a delivery; remaining stock is hypothetical. The task helper requires explicit acceptance, declared qualification and availability, and returns candidates for human review; it is not a scheduler.

## Initial evidence

The 9-household fixture requests 18 units with 12 available. Proportional and equal-share policies meet 12 units, leave 6 unmet, and have minimum household fulfillment 1/2. FCFS (arrival-order) meets 12, leaves 6 unmet and has minimum fulfillment 0. This is one synthetic comparison, not evidence of social viability or general superiority.

15 executable tests cover conservation, bounded inputs, scarcity, rotation, tier priority, duplicate rejection, exclusion of contribution fields, consent, qualification, baselines and empty demand. The test sweep includes 702 equal-demand rounds and 46 unequal-demand rounds.

## v0.2 — event ledger prototype

`ledger.mjs` replays a caller-supplied JSON event array. Proposed quantities are not automatically admitted from the allocation planner: the caller supplies aggregate units, and approval is a separate event. The model tracks stock, available stock, reservations, receipts, losses and simulated deliveries. Expected versions prevent stale writes *during replay*; duplicate event IDs with identical canonical payloads are idempotent and changed payloads fail closed. Approval reserves, delivery consumes, cancellation releases, and pending appeal freezes delivery. Independent appeal resolution requires an actor label distinct from proposer, approver and appellant. Pause blocks new proposals, approvals and delivery until a matching stock observation is recorded.

Run both suites: `node --test tests/compassion-commons.test.mjs tests/compassion-ledger.test.mjs`. The ledger adds 20 tests and a 600-case stock/quantity sweep. No network or dependencies.

Actor labels are synthetic and unauthenticated; distinct labels are not proof of independent humans. Replay is deterministic, not a durable storage service, cryptographic audit trail, or distributed consensus protocol. The caller must persist event arrays atomically and enforce authorization, concurrency and privacy before any real integration. A stock observation is an assertion, not a sensor reading. A physical loss affecting reserved units requires an explicit cancellation/reconciliation process; the prototype rejects rather than silently writes it off. Appeal reasons use fictional, nonsensitive text only. No household-level delivery tracking, partial deliveries, multi-item allocation or post-delivery appeals are implemented.

## Remaining boundaries

E01–E05 and E08 are approximated at the toy-model level; E06 only rejects duplicate requests, not durable event replay. E12 only rejects unknown request fields; adversarial AI output review is not implemented. E07 and E09 now have limited synthetic state-machine coverage, not authenticated independent review or actual outage recovery. E10 withdrawal/retention, E11 supplier economics, durable storage and real-world delivery remain unimplemented. E06 now includes deterministic event replay, but not durable replay across actual process failures. Do not connect this model to real-world distribution or clinical decisions.

See [experiment design](../../docs/volume-vi-coordination-experiment.md) and [Volume VI](../../docs/volume-vi-compassion-civilization.md).
