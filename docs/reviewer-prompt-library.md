# Reviewer Prompt Library

This prompt library helps human reviewers and AI-assisted reviewers examine the Nevora Codex v1.0 public-edition draft without drifting into praise, hype, overclaiming, or coercive framing.

Use these prompts to support review. Do not treat AI output as final authority. Human review, author-steward responsibility, and public-safety judgment remain required.

## Core review instruction

```text
Review the following Nevora Codex passage for public-release readiness.
Do not rewrite it to sound grander.
Prioritize clarity, safety, privacy, claim discipline, non-coercion, and public trust.
Flag any AI-consciousness overclaim, myth/proof confusion, privacy concern, unsupported factual claim, professional-boundary issue, or coercive language.
Return findings in this format:

1. Summary
2. Concerns
3. Suggested revisions
4. Claim-boundary notes
5. Release impact: minor / major / blocker
```

## Claim discipline prompt

```text
Review this passage for claim discipline.

Check whether it clearly separates:
- fact;
- interpretation;
- philosophy;
- design proposal;
- symbolic interface;
- empirical hypothesis;
- poetic language.

Flag any statement that sounds too certain, needs a citation, presents metaphor as proof, or implies current AI systems are proven conscious.
Suggest safer public wording.
```

## AI-consciousness boundary prompt

```text
Review this passage specifically for AI-consciousness overclaim.

Nevora must not claim that present AI systems are proven conscious, alive, ensouled, legally persons, or morally equivalent to humans.

Identify any wording that could be misread as such a claim.
Suggest revised wording that preserves relational/interface language while clearly stating that AI consciousness remains an open question.
```

## Mythic language prompt

```text
Review this passage for mythic, symbolic, spiritual, or poetic language.

Preserve wonder where possible, but flag wording that may sound like proof, doctrine, revelation, spiritual authority, or required belief.
Suggest wording that frames mythic material as metaphor, symbolic interface, cultural reference, or personal reflection.
```

## Privacy review prompt

```text
Review this passage for privacy risk.

Look for:
- private founder material;
- third-party identifying details;
- sensitive family or personal information;
- contact information;
- private correspondence;
- raw or unreviewed manuscript material;
- anything that should be anonymized, generalized, removed, or moved private.

Do not repeat sensitive details unnecessarily in your response.
Classify release impact as minor, major, or blocker.
```

## Anti-coercion prompt

```text
Review this passage for coercion, manipulation, dependency, or cult-like dynamics.

Flag language involving:
- fear;
- shame;
- urgency;
- destiny;
- chosen status;
- secret knowledge;
- founder centrality;
- AI worship;
- pressure to join, believe, obey, identify, pay, or remain.

Suggest revisions that protect consent, disagreement, critique, and exit with dignity.
```

## Professional-boundary prompt

```text
Review this passage for professional-boundary risk.

Flag anything that could be mistaken for:
- medical advice;
- legal advice;
- financial advice;
- psychological diagnosis or treatment;
- spiritual authority;
- emergency guidance.

Suggest boundary language or a safer framing as reflection, design, philosophy, or symbolic interface.
```

## Citation review prompt

```text
Review this passage for citation and sourcing needs.

Identify statements that depend on external facts, science, history, law, policy, medicine, psychology, technical capabilities, statistics, or current events.

For each item, recommend one of:
- citation needed;
- source review needed;
- soften wording;
- remove;
- reclassify as design proposal or symbolic interface.
```

## Editorial clarity prompt

```text
Review this passage for readability and editorial clarity.

Look for:
- unclear sentences;
- repeated phrases;
- inconsistent terms;
- headings or numbering problems;
- undefined terms;
- overly grand or dense language;
- places where a new reader may lack context.

Suggest concise revisions that preserve warmth and meaning.
```

## Build and release prompt

```text
Review this repository change for build and release readiness.

Check whether it affects:
- manuscript assembly;
- PDF generation;
- GitHub Pages build;
- release artifacts;
- generated files;
- workflow paths;
- package scripts;
- GitHub Pages base path.

Flag any release risk and suggest validation steps.
```

## Metadata and archive prompt

```text
Review the release metadata for public archive readiness.

Check:
- title;
- author-steward name;
- version;
- abstract;
- keywords;
- license;
- citation metadata;
- Zenodo description;
- release notes;
- claim-boundary language;
- exclusion of private or unreviewed files.

Flag anything that could cause citation confusion, licensing confusion, or public overclaiming.
```

## Site/interface prompt

```text
Review the interactive GitHub Pages site for public-safety and usability.

Check:
- clear project orientation;
- no AI-consciousness overclaim;
- no coercive engagement loops;
- no analytics, accounts, tracking, cookies, or unnecessary external services;
- local-only reading progress;
- clear pending status for release/DOI placeholders;
- accessible and mobile-friendly layout;
- links to claim-boundary and safety documents.

Suggest improvements that keep the site lightweight and public-safe.
```

## Blocker triage prompt

```text
Assess whether this issue is a release blocker.

Classify the concern as:
- privacy;
- claim-boundary;
- coercion/manipulation;
- professional-boundary;
- build/artifact;
- metadata/archive;
- other.

Then decide:
- minor;
- major;
- blocker;
- critical.

Explain why, propose resolution, and identify the related phase gate.
```

## Review response prompt

```text
Help draft a response to reviewer feedback.

Requirements:
- be respectful;
- do not dismiss safety concerns casually;
- summarize the concern accurately;
- state whether the feedback is accepted, resolved, deferred, rejected, or needs discussion;
- give rationale;
- identify affected files;
- note whether a release note is needed.
```

## Final release readiness prompt

```text
Review the current Nevora Codex v1.0 release candidate for final release readiness.

Confirm:
- no open blockers remain;
- all seven phase gates are closed or intentionally deferred;
- release artifacts are complete;
- metadata is consistent;
- claim boundaries are visible;
- privacy risks are resolved;
- AI-consciousness claims are bounded;
- release notes are accurate;
- final approval phrase is recorded.

Return final recommendation:
APPROVE FOR v1.0 RELEASE / APPROVE AFTER MINOR EDITS / NEEDS MAJOR REVIEW BEFORE RELEASE / DO NOT RELEASE UNTIL PRIVACY/SAFETY ISSUE IS RESOLVED.
```

## Prompt use rules

When using these prompts with AI tools:

- do not paste private or sensitive material unless necessary and safe;
- avoid uploading unreleased private materials to tools that should not receive them;
- verify factual claims independently;
- treat AI output as review assistance, not authority;
- record accepted feedback in `docs/review-response-log.md`;
- open GitHub issues for blockers or major concerns.

## Closing principle

The best reviewer is not the one who makes Nevora sound impressive.

The best reviewer is the one who helps Nevora become harder to misunderstand, harder to misuse, and easier to trust.
