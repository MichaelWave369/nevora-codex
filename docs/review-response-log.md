# Nevora Codex v1.0 Review Response Log

This log tracks how review feedback is received, triaged, resolved, deferred, or rejected during the Nevora Codex v1.0 review cycle.

Use this file to preserve release memory so decisions are not scattered across issues, comments, chats, or private notes.

## Purpose

The review response log should answer:

- What feedback was received?
- Who raised it or where did it come from?
- Which phase or issue does it affect?
- Was it accepted, revised, deferred, or rejected?
- Why was that decision made?
- What file or commit resolved it?

## Status values

Use one of these values:

```text
OPEN
ACCEPTED
RESOLVED
DEFERRED
REJECTED
BLOCKER
NEEDS DISCUSSION
```

## Impact values

Use one of these values:

```text
MINOR
MAJOR
BLOCKER
RELEASE NOTE
POST-v1.0
```

## Review response entries

### Entry template

```text
ID:
Date:
Source / reviewer:
Related issue:
Review phase:
Files affected:
Feedback summary:
Impact:
Status:
Decision:
Resolution commit / PR:
Release note needed:
Notes:
```

---

## Active feedback

Add active feedback items here.

```text
ID:
Date:
Source / reviewer:
Related issue:
Review phase:
Files affected:
Feedback summary:
Impact:
Status:
Decision:
Resolution commit / PR:
Release note needed:
Notes:
```

---

## Resolved feedback

Move resolved items here after the related issue or edit is complete.

```text
ID:
Date:
Source / reviewer:
Related issue:
Review phase:
Files affected:
Feedback summary:
Impact:
Status: RESOLVED
Decision:
Resolution commit / PR:
Release note needed:
Notes:
```

---

## Deferred feedback

Use this section for feedback intentionally postponed to v1.1 or later.

Deferred items should include a reason.

```text
ID:
Date:
Source / reviewer:
Related issue:
Review phase:
Files affected:
Feedback summary:
Impact: POST-v1.0
Status: DEFERRED
Decision:
Reason for deferral:
Future target version:
Notes:
```

---

## Rejected feedback

Use this section carefully.

Rejected feedback should include a respectful reason, especially if the reviewer raised a safety or claim-boundary concern.

```text
ID:
Date:
Source / reviewer:
Related issue:
Review phase:
Files affected:
Feedback summary:
Impact:
Status: REJECTED
Decision:
Reason for rejection:
Notes:
```

## Decision principles

When responding to review feedback, prioritize:

1. privacy and safety;
2. claim discipline;
3. non-coercion and human sovereignty;
4. public readability;
5. release durability;
6. author-steward intent;
7. aesthetic preference.

If two values conflict, the safer and clearer path should usually win.

## Blocker rule

A blocker cannot be silently deferred.

A blocker must be:

- resolved before v1.0.0;
- downgraded with written rationale;
- or explicitly accepted as release risk by the author-steward.

## Closing rule

Before Phase 7 approval, this log should be reviewed for:

- unresolved blockers;
- unresolved major issues;
- deferred items that actually belong in v1.0;
- rejected safety feedback that needs a second look;
- release notes that need to mention significant changes.

Nevora should not move to v1.0.0 while the response log contains unresolved blockers.
