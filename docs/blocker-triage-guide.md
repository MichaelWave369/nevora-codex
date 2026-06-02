# Nevora Codex v1.0 Blocker Triage Guide

This guide explains how to identify, classify, and resolve blockers during the Nevora Codex v1.0 review cycle.

A blocker is any issue that should prevent v1.0.0 release until it is resolved, downgraded with written rationale, or explicitly accepted as release risk by the author-steward.

## Core rule

```text
No blocker may be silently deferred.
```

If a concern is serious enough to affect privacy, safety, claim discipline, release integrity, or public trust, it must be handled visibly in the review process.

## Blocker categories

### 1. Privacy blocker

A privacy blocker exists when public files include or may include:

- private founder material;
- third-party identifying details;
- private correspondence;
- sensitive family or personal information;
- contact information not intended for publication;
- raw unreviewed manuscript material;
- content that should be anonymized or generalized.

Default action:

```text
Remove, anonymize, generalize, or move private.
```

### 2. Claim-boundary blocker

A claim-boundary blocker exists when the text:

- claims or strongly implies current AI systems are proven conscious;
- presents symbolic language as empirical proof;
- presents mythic language as literal authority;
- presents a design proposal as validated science;
- makes unsupported scientific or historical claims central to the argument;
- blurs professional advice boundaries.

Default action:

```text
Reclassify, soften, cite, move to hypothesis, or remove.
```

### 3. Coercion / manipulation blocker

A coercion blocker exists when the text pressures readers through:

- fear;
- shame;
- destiny;
- urgency;
- secret knowledge;
- chosen status;
- founder dependence;
- AI worship;
- group identity capture;
- inability to disagree or leave with dignity.

Default action:

```text
Rewrite to preserve consent, disagreement, critique, and exit.
```

### 4. Professional-boundary blocker

A professional-boundary blocker exists when Nevora could be mistaken for:

- medical advice;
- legal advice;
- financial advice;
- psychological diagnosis or treatment;
- spiritual authority;
- emergency intervention guidance.

Default action:

```text
Add boundary language, reframe as reflection/design, or remove.
```

### 5. Build / artifact blocker

A build blocker exists when:

- manuscript assembly fails;
- PDF build fails or produces unusable artifacts;
- GitHub Pages build fails;
- release artifacts are incomplete;
- generated artifacts are manually edited instead of rebuilt;
- release package includes unreviewed files.

Default action:

```text
Fix workflow, rebuild artifacts, and retest before release.
```

### 6. Metadata / archive blocker

A metadata blocker exists when:

- citation metadata is wrong;
- license status is inconsistent;
- Zenodo metadata overclaims the work;
- DOI package includes private or unreviewed files;
- release notes imply final status before approval;
- version tags are inconsistent.

Default action:

```text
Correct metadata before GitHub release or Zenodo submission.
```

## Severity levels

| Severity | Meaning | Release effect |
| --- | --- | --- |
| Minor | Small wording, typo, or clarity issue | Does not block release |
| Major | Needs revision before final release | May block release if unresolved |
| Blocker | Should prevent release until resolved | Blocks v1.0.0 |
| Critical | Immediate privacy/safety concern | Pause release work until addressed |

## Triage process

When a possible blocker is found:

1. Open or link a GitHub issue.
2. Use a clear title:

```text
Blocker: [short description]
```

3. Identify the category:

```text
Privacy / Claim-boundary / Coercion / Professional-boundary / Build / Metadata / Other
```

4. Identify affected files.
5. Explain why it blocks release.
6. Propose a resolution.
7. Link the blocker to the relevant phase-gate issue.
8. Record the decision in `docs/review-response-log.md`.

## Blocker issue template

```text
## Blocker category

Privacy / Claim-boundary / Coercion / Professional-boundary / Build / Metadata / Other

## Affected files

- 
- 

## Concern

Describe the blocker without unnecessarily repeating sensitive details.

## Why this blocks release

Explain the release risk.

## Proposed resolution

Remove / revise / cite / reclassify / anonymize / rebuild / defer with rationale / other

## Related phase gate

#1 / #2 / #3 / #4 / #5 / #6 / #7

## Status

OPEN / RESOLVED / DOWNGRADED / ACCEPTED RISK
```

## Downgrading a blocker

A blocker may be downgraded only if:

- the risk was overestimated;
- added context resolves the concern;
- the affected text is not actually public;
- the release package excludes the risky material;
- reviewer consensus supports downgrade;
- or the author-steward explicitly accepts the residual risk.

Downgrade note format:

```text
Downgraded from BLOCKER to MAJOR/MINOR because:

Evidence:
Residual risk:
Author-steward approval:
```

## Accepting release risk

Accepting release risk should be rare.

It may be appropriate only when:

- the concern is real but bounded;
- the concern is disclosed clearly;
- resolving it would distort the work;
- no privacy or safety harm is likely;
- and the author-steward accepts responsibility in writing.

Accepted-risk note format:

```text
Risk accepted by author-steward.
Reason:
Boundary language present:
Future review target:
```

## Final release blocker check

Before Phase 7 approval, confirm:

- [ ] no open blocker issues remain;
- [ ] all blockers are resolved, downgraded, or explicitly accepted;
- [ ] review response log is updated;
- [ ] release notes mention major safety/claim-boundary changes if needed;
- [ ] final artifacts reflect all blocker resolutions.

## Closing principle

A blocker is not an enemy of release.

A blocker is a guardian of trust.

The goal is not to publish fast. The goal is to publish clean, bounded, humane, and durable.
