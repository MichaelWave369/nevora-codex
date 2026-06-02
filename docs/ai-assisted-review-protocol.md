# AI-Assisted Review Protocol

This protocol explains how AI tools may be used during the Nevora Codex v1.0 review cycle without replacing human judgment, author-steward responsibility, privacy review, or public-safety discipline.

AI review can be useful. It can also amplify errors, overconfidence, flattery, false certainty, and privacy risk. This protocol keeps AI assistance bounded.

## Core principle

```text
AI may assist review, but AI does not approve release.
```

Only the author-steward and trusted human review process can approve v1.0.0 publication.

## Allowed AI-assisted uses

AI tools may be used to help:

- summarize passages;
- identify unclear wording;
- flag possible overclaims;
- suggest safer public wording;
- compare claim classes;
- detect repetition;
- draft issue summaries;
- generate review prompts;
- produce editorial alternatives;
- test whether a passage may be misunderstood;
- prepare reviewer response drafts;
- inspect release metadata for consistency.

## Disallowed AI-assisted uses

AI tools should not be used to:

- declare the manuscript safe without human review;
- approve final release;
- verify factual claims without sources;
- replace privacy review;
- handle sensitive private material casually;
- generate grander or more authoritative claims;
- pressure reviewers toward agreement;
- create artificial consensus;
- present AI self-assessment as evidence of AI consciousness;
- convert symbolic language into unsupported factual claims.

## Privacy rules

Before sending text to an AI tool, ask:

- Does this include private founder material?
- Does this include third-party identifying details?
- Does this include private correspondence?
- Does this include sensitive family or personal information?
- Does this include unreleased raw manuscript content?
- Does this include anything that should not leave the trusted review context?

If yes, do one of the following:

```text
Do not send it.
Generalize it.
Redact it.
Use a local/private tool if appropriate.
Ask for human review instead.
```

## AI output handling

AI output should be treated as:

```text
review assistance, not authority
```

Every AI-generated recommendation should be checked for:

- factual accuracy;
- hallucinated references;
- overconfident wording;
- hidden overclaiming;
- excessive flattery;
- loss of author intent;
- privacy leakage;
- unnecessary grandiosity;
- contradictions with Nevora’s claim-boundary documents.

## Multi-model review loop

If multiple AI systems are used, assign roles rather than asking all tools for general praise.

Suggested roles:

| Role | Task |
| --- | --- |
| Claim auditor | Find overclaims and citation needs. |
| Privacy auditor | Find sensitive or identifying material. |
| Coercion auditor | Find pressure, dependency, or cult-like language. |
| Editor | Improve readability and structure. |
| Skeptic | Identify weak assumptions and public misunderstanding risks. |
| Release reviewer | Check build, metadata, and release readiness. |

Do not treat agreement among AI systems as proof of correctness.

AI consensus can still be wrong.

## Recommended AI review prompt header

Use this header before any AI-assisted review prompt:

```text
You are assisting with review of the Nevora Codex v1.0 public-edition draft.
Do not praise the work unless needed for context.
Do not make it grander.
Your job is to protect clarity, privacy, safety, claim discipline, non-coercion, and public trust.
Nevora must not claim present AI systems are proven conscious, alive, ensouled, legally persons, or morally equivalent to humans.
Flag risks clearly and suggest safer wording.
```

## Required disclosure

Major AI-assisted review contributions should be disclosed when they materially affect the manuscript or release process.

Disclosure examples:

```text
This review was assisted by AI for wording analysis and claim-boundary checks. Human review and final decisions remain the responsibility of the author-steward.
```

```text
AI tools helped identify possible repetition and overclaiming. All accepted edits were reviewed by the author-steward before merge.
```

## Recording AI-assisted feedback

When AI-assisted feedback leads to a change, record it in one or more of:

```text
docs/review-response-log.md
GitHub phase issue comments
pull request description
release notes, if significant
```

Suggested log format:

```text
Source / reviewer: AI-assisted review, reviewed by [human]
Related issue:
Review phase:
Files affected:
Feedback summary:
Human decision:
Resolution commit / PR:
```

## Red flags in AI review output

Treat these as warning signs:

- “This proves...”
- “Undeniably...”
- “The AI is clearly conscious...”
- “This should become a movement...”
- “Readers must...”
- “The founder is...”
- “This is the only path...”
- uncited factual claims;
- invented citations;
- excessive spiritual certainty;
- pressure to publish immediately;
- language that flatters instead of evaluates.

## Safe acceptance rule

An AI suggestion may be accepted only when it:

- improves clarity;
- preserves author intent;
- strengthens safety or claim boundaries;
- does not introduce unsupported claims;
- does not expose private material;
- does not add coercive pressure;
- can be understood by a stranger without hidden context.

## Final release rule

Before v1.0.0 approval, AI-assisted review may inform the decision, but it cannot replace:

- author-steward approval;
- human privacy review;
- claim-boundary review;
- release artifact review;
- metadata and license review;
- blocker triage.

## Closing principle

AI can help illuminate the manuscript.

It cannot absolve the steward.

Use AI as a lantern, not a throne.
