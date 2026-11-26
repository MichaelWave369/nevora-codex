# Compassion Commons simulator v0.1

Experimental, synthetic, single-item planning round. No network, dependencies, accounts, currency, human ranking, real inventory or execution of allocations. Does not alter the v1.0 reader or assembly.

Run: `node --test tests/compassion-commons.test.mjs` (Node 20).

Input: integer stock and round (0–1,000,000), at most 1,000 unique opaque household IDs, one request per household, integer quantity (0–1,000,000), tier (essential, routine, optional), and integer arrival order. All arithmetic products stay within safe integer range. Tier is supplied by a fictional scenario; no automated classification of real needs. Unknown request fields fail closed. For equal tier, proportional policy uses largest remainder and rotating ID tie-break; equal-share and arrival-order baselines retain identical tier ordering. Rotation is deterministic for a fixed roster, not a durable fairness guarantee when membership changes. A proposal is not a delivery; remaining stock is hypothetical. The task helper requires explicit acceptance, declared qualification and availability, and returns candidates for human review; it is not a scheduler.

## Initial evidence

The 9-household fixture requests 18 units with 12 available. Proportional and equal-share policies meet 12 units, leave 6 unmet, and have minimum household fulfillment 1/2. FCFS (arrival-order) meets 12, leaves 6 unmet and has minimum fulfillment 0. This is one synthetic comparison, not evidence of social viability or general superiority.

15 executable tests cover conservation, bounded inputs, scarcity, rotation, tier priority, duplicate rejection, exclusion of contribution fields, consent, qualification, baselines and empty demand. The test sweep includes 702 equal-demand rounds and 46 unequal-demand rounds.

## Remaining boundaries

E01–E05 and E08 are approximated at the toy-model level; E06 only rejects duplicate requests, not durable event replay. E12 only rejects unknown request fields; adversarial AI output review is not implemented. E07 appeals/recusal, E09 outage/reconciliation, E10 withdrawal/retention, E11 supplier economics, explicit approval state transitions, persistent inventories, reservations and actual delivery are not implemented. Do not connect this model to real-world distribution or clinical decisions.

See [experiment design](../../docs/volume-vi-coordination-experiment.md) and [Volume VI](../../docs/volume-vi-compassion-civilization.md).
