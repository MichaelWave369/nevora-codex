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

## v0.3 — signed local ledger

`local-ledger.mjs` wraps the existing replay state machine in an Ed25519 signed, hash-linked snapshot with an explicit ledger ID and pinned actor/role configuration. The trusted configuration must be supplied independently of the file. Five fixed roles separate proposal, approval, stock custody, appeal and resolution. Unique actor public keys are required. Signatures authenticate configured keys, not real human identity or independent judgment. Private keys are supplied by the caller; they are never written by this module.

A single local writer uses an exclusive lock, same-directory temporary file, file fsync, atomic rename and directory fsync. Initialization is explicit; missing or malformed snapshots fail closed. Identical signed retry is idempotent, stale heads and conflicting event IDs reject. Reads replay the committed snapshot without repairing it. The local directory and configuration must be trusted and controlled by the operator. This is a bounded POSIX-oriented synthetic prototype, not a production database; Windows, remote filesystems and power-loss guarantees are unverified.

On interruption, a leftover lock blocks writes. An operator must stop all writers, verify the last committed snapshot against an independently retained trusted head if available, inspect and remove abandoned temporary files, and only then remove the lock. Never automatically break a lock or treat a missing file as new inventory. If an error occurs after rename, the outcome may be ambiguous; reload and retry the identical signed envelope. Recovery tests cover a fresh process and a simulated abandoned writer, not interruption at every actual syscall.

A valid signed prefix can be substituted for the latest snapshot unless a trusted external checkpoint is retained. No rollback protection, key rotation, revocation, authenticated real-person enrollment, encryption, backup service, multi-resource planning, distributed consensus or actual delivery proof is implemented. Use fictional nonsensitive events only.

Run all suites: `node --test tests/compassion-commons.test.mjs tests/compassion-ledger.test.mjs tests/compassion-local-ledger.test.mjs`. The new suite has 14 cases covering signing, authorization, duplicate retry, chain and policy validation, restart, abandoned lock, corruption and the rollback limitation.

## v0.4 — multi-resource planning and independent checkpoints

`makeCheckpoint` creates a ledger/policy-bound version and head for retention by an independent trusted party. `verifySnapshot`, `loadLedger` and `appendEvent` accept an optional trusted checkpoint; the latter verifies under its writer lock. A later valid extension is accepted, an older prefix or divergent history at the anchored version is rejected. The checkpoint is a minimum trusted prefix, not proof of latest state. Keep it independently and advance it only after verification; never source it from the same potentially rolled-back snapshot. Unanchored suffix rollback remains possible; no remote witness, signed checkpoint distribution, automatic monotonic storage or atomic checkpoint update is implemented.

`multi-resource.mjs` computes separate plans for bounded distinct resource IDs, units and verified signed ledgers. A trusted checkpoint is mandatory for each planning input. It subtracts existing reservations and a caller-specified protected reserve, disallows new proposals while paused, and reports shortages in native units. No cross-unit totals, personal balances or task credits. The protected reserve is a planning constraint, not a ledger-enforced hold. It and the resource/unit mapping must be governed outside the prototype.

The proposal bridge recomputes the selected plan against a caller-provided current verified snapshot and returns an unsigned aggregate proposal event and chain head. Signing and append are separate, with stale head rejection; approval and delivery remain separate ledger transitions. The signed event does not bind household allocations, unit labels, reserve policy or the whole multi-resource plan. Direct ledger callers can bypass planning reserves. No atomic cross-resource commits, automatic replenishment, bundle guarantees, real-world inventory attestation or recipient-level delivery. The caller must retain trusted resource mapping and refresh snapshots; the planner cannot establish that supplied snapshots are latest.

Run all suites: `node --test tests/compassion-commons.test.mjs tests/compassion-ledger.test.mjs tests/compassion-local-ledger.test.mjs tests/compassion-multi-resource.test.mjs`. Adds 13 cases for checkpoint rollback/fork rejection, separate resources, protected reserves, pause, stale plans and proposal bridging.

## Remaining boundaries

E01–E05 and E08 are approximated at the toy-model level; E06 only rejects duplicate requests, not durable event replay. E12 only rejects unknown request fields; adversarial AI output review is not implemented. E07 and E09 now have limited synthetic state-machine coverage, not authenticated independent review or actual outage recovery. E10 withdrawal/retention, E11 supplier economics, durable storage and real-world delivery remain unimplemented. E06 now includes deterministic event replay, but not durable replay across actual process failures. Do not connect this model to real-world distribution or clinical decisions.

See [experiment design](../../docs/volume-vi-coordination-experiment.md) and [Volume VI](../../docs/volume-vi-compassion-civilization.md).
