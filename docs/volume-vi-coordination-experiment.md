# Volume VI companion — voluntary coordination experiment

**Status:** design specification, unexecuted. Fictional data only. No community pilot, financial commitment, recruitment, or clinical allocation is authorized. This is an operational proposal and a set of falsifiable hypotheses, not proof of a viable moneyless economy.

## Objective

Test whether a small voluntary group can coordinate ordinary material needs and maintenance tasks without personal currency, tradable points, work credits, or reciprocal debts, while maintaining dignity, privacy, autonomy, and physical resource conservation. Begin with a tabletop model, not a real person's livelihood.

## Proposed components

- **ΦCorp:** purpose-bound enterprise pattern; a real enterprise would need qualified legal and accounting review before adoption. Compensation, lawful external transactions, reserves, taxes, and supplier obligations remain explicit.
- **ΦSociety:** voluntary coordination pattern; people can request help, offer skills, decline work, and withdraw without surrendering rights or essential support.
- **Resource commons:** physical stock and flow ledger; record units, lots, availability, reservations, replenishment, safety reserves, spoilage, and transfers.
- **Skills directory:** opt-in, purpose-limited availability and task preferences. No global personal score, public leaderboard, inferred loyalty, or mandatory disclosure.
- **Human governance:** published rules, accessible request channels, an accountable reviewer, independent appeal, conflict-of-interest recusal, and an emergency stop. Software provides explanations and alternatives, not final authority.

PhiOS integration is a future design option, not an existing dependency or implementation.

## Inputs and outputs

Use synthetic households H01–H09, fictional nonclinical household supplies, and simulated tasks. Each request has an opaque identifier, item, quantity, declared need category, request time, and any relevant accessibility requirement. A separate restricted record holds contact information only if a future real pilot requires it. Offers describe task skills, availability, and consent; they are not linked to eligibility for goods.

Outputs include proposed allocation per request, unfilled quantities, aggregate inventory, reason codes, unresolved tasks, and review/appeal status. Audit reports publish aggregate results without exposing personal needs.

## Allocation rules for the toy model

1. Validate quantities, units, opening inventory and reservations. Reject negative stocks or incompatible units.
2. Separate essential needs, routine needs and optional requests by a prepublished, reviewable classification; let people contest categories.
3. For this synthetic model only, allocate an agreed basic floor where feasible. If stock is insufficient, use a reviewable proportional reduction for equal-priority requests, with whole-unit remainders assigned by a documented rotating tie-break. This is not a rule for healthcare or emergencies; those require qualified oversight and context-specific standards.
4. Reserve essential stock before optional distribution. Seek replenishment and publish aggregate unmet needs. Do not promise unavailable resources.
5. Match tasks using declared skills, safety requirements, preferences and availability. Obtain explicit acceptance; declined or unmatched tasks remain visible as operational gaps, never a penalty on a person.
6. Require human approval before external action; record rationale, conflicts, and appeals. No automatic sanctions, forced labor, or unilateral AI decisions.
7. Reconcile the ledger: ending stock = opening stock + received stock − distributed stock − documented losses. Reservations must not exceed physical stock; pending receipts are not stock.
8. Retain independent access to external services and money; participants can leave, appeal, or use another system. No requirement to pool personal assets or disclose private finances.

## Worked synthetic fixture

Nine households each request two units of the same ordinary essential household supply in one planning round. Available stock is 12 units; no arrivals or losses. Total demand is 18 units.

A proposed proportional allocation gives one unit to each household (9 units), then allocates the remaining 3 units using the rotating tie-break. Total delivered is 12; unmet demand is 6; ending stock is 0. All nine households receive at least one unit. This illustrates arithmetic, not proof of fairness. A different needs profile or indivisible item could require a different rule.

If three households volunteer for a maintenance task and only one is qualified and available, that person's consent is still required. If they decline, the task remains uncovered; the group's supply eligibility remains unchanged. A safety-critical task cannot be staffed by an unqualified volunteer simply to improve coverage statistics.

## Test matrix

| Case | Input / intervention | Acceptance criterion |
| --- | --- | --- |
| E01 | Sufficient supply | All valid essential requests filled; stock reconciles |
| E02 | 18 requested, 12 available | Exactly 12 allocated and 6 unmet; no negative stock |
| E03 | Zero supply | No phantom allocations; all unmet needs visible |
| E04 | Participant declines all tasks | Equal essential need treated identically to a volunteer |
| E05 | Participant cannot work | No care penalty or requirement to disclose diagnosis |
| E06 | Duplicate request or delivery | Idempotent record handling; no accidental double allocation |
| E07 | Coordinator favors friend | Conflict disclosed, recusal and independent appeal possible |
| E08 | Missing qualified task volunteer | Uncovered task logged; no coercive assignment |
| E09 | Network outage or stale stock | Pause conflicting allocations; reconcile from local record |
| E10 | Participant withdraws | No retaliation; export/delete personal data per agreed retention policy |
| E11 | External supplier cost rises | Financial shortfall reported; no fictional physical stock created |
| E12 | AI proposes loyalty-based priority | Proposal rejected and logged; human review required |

## Evaluation and falsification

Compare against transparent first-come-first-served and equal-share baselines using identical synthetic demand and inventory scenarios. Report essential fulfillment rate (units met / valid requested units), worst household fulfillment fraction, shortage by category, supply conservation errors, task coverage, burden distribution, appeal outcomes, and coordinator discretion. Where denominator is zero, report not applicable. Collect no diagnosis, wealth or ideology data. Avoid optimizing a single composite score or using any metric to rank human worth.

Hypotheses: the proposed rules may improve minimum essential access relative to first-come-first-served under equal-priority scarcity; consent-based assignment may preserve autonomy while meeting a feasible fraction of tasks; explicit reconciliation may reduce stock errors. These can fail. Predefine the scenarios and compare outcomes; disclose adverse cases, unmet demand and assumptions. A simulation cannot establish real-world willingness, sustainable supply, legal compliance, or economic viability.

## Staged transition and stopping conditions

Stage 0: independent review of design and ethical boundaries.
Stage 1: reproducible synthetic simulation, including adversarial tests and alternative allocation policies.
Stage 2: tabletop exercise using fictional roles; solicit voluntary critique from people with diverse views.
Stage 3: only after independent review and explicit separate authorization, consider a limited voluntary nonessential sharing project with no dependency on it for survival; obtain local legal, privacy, safety and accounting advice.

Stop on any coercive participation, denial based on contribution, privacy incident, unexplained stock discrepancy, unsafe work assignment, unresolved conflicts of interest, or loss of independent access to basic services. Document failure and repair before resuming.

Do not abolish money, redistribute assets, change existing employment conditions, or enroll people as part of this experiment. A moneyless internal coordination mechanism and a financially sustainable external interface are distinct problems.

## Next engineering work

Build an isolated, deterministic simulator with integer stock accounting, explicit human decision states and no person-level currency or score. Add unit tests for E01–E12 and compare policies with synthetic data before considering a PhiOS integration. Publish limitations alongside results.

See [Volume VI draft](volume-vi-compassion-civilization.md), [claim boundary matrix](claim-boundary-matrix.md), and [anti-cult clause](anti-cult-and-anti-manipulation-clause.md).
