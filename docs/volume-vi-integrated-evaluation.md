# Volume VI — integrated evaluation and review gate

**Status:** exploratory draft, synthetic test specification. No real community, currency replacement, procurement, labor assignment or publication approved.

## Reproduce

From the repository root, using Node 20:

```sh
node --test tests/compassion-*.test.mjs
node --input-type=module -e 'import {evaluateCommons} from "./experiments/compassion-commons/evaluation.mjs"; console.log(JSON.stringify(evaluateCommons(),null,2))'
```

The evaluation orchestrates existing pure planning and reconciliation modules with fixed fictional inputs. It does not integrate their trust boundaries or execute a signed cross-community settlement. Signed local ledger and federation behavior remain covered by their separate test suites.

## Preregistered expected outcomes

The table contains expected fixture values to be checked by executable tests, not measured field results. No new CI success is asserted here.

| Scenario | Expected result |
| --- | --- |
| Nine households request 18 units; stock 12 | All three policies deliver 12; FCFS worst fraction 0; equal-share and proportional 0.5 |
| Two 30-minute consenting volunteers; one withdraws | Suggested work drops from 60 to 30 minutes; 30 uncovered; same resource plan when needs and stock unchanged |
| Normal transition: 9 local units available, cash 2500 minor units | Both policies deliver 18; parallel procurement cost 900 minor units lower |
| Supply shock: no local units, supplier cap 3 | 3 of 18 units distributed, 15 unmet, diagnostic stop reason |
| Cash shock: 200 cash, 300 obligations | 100 unpaid, no purchases, cash reserve shortfall |
| 12 stock, 3 reserved, 3 protected, 9 pending | 6 allocatable now, 12 gross replenishment gap, 3 conditional additional request |
| Dispatch 9, receive 4 twice with same event ID, loss 2 | 4 received, 2 lost, 3 outstanding |

The withdrawal example models removal from a voluntary offer list; the two allocation calls intentionally take identical needs and inventory inputs. It demonstrates separation of the component interfaces, not durable withdrawal, access control, or actual protection against discrimination.

## Evidence boundaries and E01–E12 traceability

| Requirement | Current scope | Missing |
| --- | --- | --- |
| E01–E03 fulfillment and scarcity | deterministic fictional stock planning | real supply and demand |
| E04–E05 no work/ability penalty | separate planner inputs; zero hours and unknown scoring field tests | enforceable real-world nondiscrimination |
| E06 duplicate requests and deliveries | event IDs, signature checks and local replay | independently retained checkpoints everywhere, real delivery evidence |
| E07 favoritism/appeals | distinct configured roles and appeal state | genuine independence, conflict-of-interest governance |
| E08 uncovered work | consent-aware suggestions and capacity cap | durable consent, skill verification and scheduling |
| E09 interruption | signed local persistence, lock, restart and checkpoint tests | tested distributed recovery, power-loss matrix, Windows |
| E10 withdrawal/retention | removal of a synthetic offer from a planning round | participant lifecycle, portable private records, retention/deletion |
| E11 external costs | bounded single-period cash/procurement model | production costs, labor, prices, contracts, long-run sustainability |
| E12 manipulation | strict schemas and role/signature rejection | adversarial AI workflow and independent human review |

## Review decisions before expansion

- Preserve the existing Volumes I–V and v1.0 publication process.
- Commission independent editorial, economic, governance, accessibility, privacy and security review.
- Challenge the design with unequal needs, sequential rounds, supply failures, malicious authorized actors and competing models.
- Prioritize authenticated agreement-to-dispatch-to-receipt binding, durable consent/exit controls, independent checkpoint retention and real recovery testing.
- Keep every prototype synthetic until a separate, explicit pilot decision. A future pilot must preserve external alternatives, informed consent, legal obligations, safety, and the right to withdraw without loss of care.
- Do not present a green test suite as a proof of economic viability, justice, human identity or physical truth.

Nine acts and 27 drafted chapters complete the exploratory manuscript structure, not the research program.

