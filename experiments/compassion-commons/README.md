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

## v0.5 — protected reserves, voluntary workload and replenishment

The signed reviewer role can set a resource's protected reserve target using a `reserve` event with a reason. The replay ledger rejects approvals that would consume the buffer and blocks delivery below the target after losses. A reserve increase cannot displace existing reservations; lowering is blocked while paused. Physical losses may still reduce stock below the target; the ledger exposes the shortage rather than inventing inventory. The planner uses the greater of signed and caller-specified reserve targets, not their sum. Existing ledgers replay with a default zero target until a signed change. This is single-reviewer authorization, not multiparty emergency release, and no policy determines an appropriate reserve size.

`human-potential.mjs` adds a deterministic task suggestion planner: exact task-specific consent, declared skill, voluntary minutes cap, essential-first task ordering, lower current utilization and rotating tie-break. This greedy algorithm is not an optimal scheduler; skill labels are self-declared synthetic inputs, and current consent must be reconfirmed before real work. No participant ranking or automatic work assignment. Resource access is independent of this module. Uncovered tasks remain visible rather than being forced onto people.

Replenishment forecasting reports physical stock, allocatable stock, gross shortage and conditional additional requests separately from pending shipments. Pending quantities are not received stock. Forecasts are caller-supplied, with no supplier commitments, lead-time modeling, procurement, real costs, or automated receipts.

Run all five suites with `node --test tests/compassion-*.test.mjs`. Adds 18 cases including a 93-scenario workload sweep. All examples are fictional; no real-world distribution or labor assignment is authorized.

## v0.6 — federated agreement prototype

`federation.mjs` uses an independently pinned registry of community Ed25519 keys and resource-to-unit/ledger/policy mappings. Each agreement requires a steward and reviewer signature from each of two distinct communities (four unique configured keys), over domain-separated canonical terms, registry digest and signer role. Terms bind resource, native unit, quantity, both ledger heads, ID and explicit validity window. The caller supplies trusted current time, registry and independently retained checkpoints. Distinct keys do not prove distinct humans or legitimate governance.

The preparation bridge verifies both signed local snapshots against pinned ledger identities, checkpoints and exact agreed heads, checks pause and source allocatable stock above signed reserves, and emits an unsigned source proposal with the agreement ID. Local planning signature, approval and delivery remain distinct. No remote inventory is credited and nothing is reserved by agreement alone. A changed head requires renegotiation. The agreement hash is returned for review, not embedded in the existing local proposal event.

This is a negotiation and proposal adapter only. Direct ledger clients can bypass it; it does not enforce federation quorum at local approval/delivery, bind agreement expiry to later local transitions, implement durable agreement replay prevention across ledgers, establish that snapshots or clocks are current, or prove physical transfers. No transport, settlement, atomic intercommunity transactions, remote receipt matching, key rotation, real community enrollment, distributed consensus or multiparty reserve release. Do not connect to real resources. Existing local ledgers continue to operate independently.

Run all six suites with `node --test tests/compassion-*.test.mjs`. Adds 14 tests for four-key authorization, tampering, expiry, replay domain separation, pinned mappings, local proposal semantics, reserves and stale/paused inventories.

## Remaining boundaries

E01–E05 and E08 are approximated at the toy-model level; E06 only rejects duplicate requests, not durable event replay. E12 only rejects unknown request fields; adversarial AI output review is not implemented. E07 and E09 now have limited synthetic state-machine coverage, not authenticated independent review or actual outage recovery. E10 withdrawal/retention, E11 supplier economics, durable storage and real-world delivery remain unimplemented. E06 now includes deterministic event replay, but not durable replay across actual process failures. Do not connect this model to real-world distribution or clinical decisions.

See [experiment design](../../docs/volume-vi-coordination-experiment.md) and [Volume VI](../../docs/volume-vi-compassion-civilization.md).
