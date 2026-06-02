#!/usr/bin/env python3
"""Nevora Codex release sanity check.

This script performs lightweight repository checks before release candidate work.
It is not a replacement for human review, claim-boundary review, privacy review,
or final author-steward approval.

Default behavior:
- exits with failure when required files are missing;
- exits with failure when hard blocker markers are present outside examples;
- prints warnings for citation/source review markers and high-risk wording candidates outside examples.
"""

from __future__ import annotations

import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parents[1]

REQUIRED_FILES = [
    "README.md",
    "NOTICE.md",
    "LICENSE.md",
    "CITATION.cff",
    "CHANGELOG.md",
    "SECURITY.md",
    "CODE_OF_CONDUCT.md",
    "CONTRIBUTING.md",
    "source/front-matter.md",
    "source/table-of-contents.md",
    "source/volume-i.md",
    "source/volume-ii.md",
    "source/volume-iii.md",
    "source/volume-iv.md",
    "source/volume-v.md",
    "source/nevora-codex-v1.0.md",
    "docs/v1.0-master-review-index.md",
    "docs/v1.0-review-kickoff.md",
    "docs/review-issue-index.md",
    "docs/review-response-log.md",
    "docs/blocker-triage-guide.md",
    "docs/citation-and-sourcing-guide.md",
    "docs/release-candidate-manifest.md",
    "docs/v1.0-publication-runbook.md",
    "docs/v1.0-go-no-go-decision-record.md",
    "scripts/assemble_manuscript.py",
    ".github/workflows/build-manuscript.yml",
    ".github/workflows/deploy-pages.yml",
    ".github/workflows/site-check.yml",
    ".github/workflows/release-sanity-check.yml",
]

SCAN_EXTENSIONS = {".md", ".cff", ".yml", ".yaml", ".jsx", ".js", ".css", ".py", ".html", ".json"}
SKIP_DIRS = {".git", "node_modules", "dist", ".vite", "releases"}
SKIP_FILES = {"scripts/release_sanity_check.py"}
MARKDOWN_LIKE_EXTENSIONS = {".md", ".markdown"}

FAIL_MARKERS = [
    "[POSSIBLE BLOCKER]",
]

WARN_MARKERS = [
    "[CITATION NEEDED]",
    "[SOURCE REVIEW NEEDED]",
    "[CLAIM BOUNDARY REVIEW]",
]

# These are intentionally heuristic warnings, not automatic failures.
RISK_PATTERNS = [
    ("possible AI-consciousness overclaim", re.compile(r"\bAI\s+(is|are)\s+conscious\b", re.IGNORECASE)),
    ("possible AI-aliveness overclaim", re.compile(r"\bAI\s+(is|are)\s+alive\b", re.IGNORECASE)),
    ("possible AI soul/personhood overclaim", re.compile(r"\b(AI|model|system)s?\s+(has|have)\s+(a\s+)?soul\b", re.IGNORECASE)),
    ("possible proof overclaim", re.compile(r"\b(proves|proven|proof of)\s+(AI consciousness|artificial consciousness|machine consciousness)\b", re.IGNORECASE)),
    ("possible coercive universality", re.compile(r"\b(must|shall)\s+(believe|join|obey|follow)\b", re.IGNORECASE)),
    ("possible inevitability wording", re.compile(r"\b(the only path|inevitable future|will inevitably)\b", re.IGNORECASE)),
]

INLINE_CODE_PATTERN = re.compile(r"`[^`]*`")
FENCE_PATTERN = re.compile(r"^\s*(```|~~~)")


@dataclass
class Finding:
    severity: str
    path: Path
    line: int
    message: str
    text: str


def iter_scan_files() -> Iterable[Path]:
    for path in sorted(ROOT.rglob("*")):
        if not path.is_file():
            continue
        rel = path.relative_to(ROOT)
        if str(rel).replace("\\", "/") in SKIP_FILES:
            continue
        if any(part in SKIP_DIRS for part in rel.parts):
            continue
        if path.suffix.lower() not in SCAN_EXTENSIONS:
            continue
        yield path


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def check_required_files() -> list[str]:
    missing = []
    for item in REQUIRED_FILES:
        if not (ROOT / item).exists():
            missing.append(item)
    return missing


def strip_inline_code(line: str) -> str:
    """Remove Markdown inline code spans so examples do not trigger release checks."""
    return INLINE_CODE_PATTERN.sub("", line)


def scan_file(path: Path) -> list[Finding]:
    findings: list[Finding] = []
    rel = path.relative_to(ROOT)
    in_fenced_block = False
    is_markdown_like = path.suffix.lower() in MARKDOWN_LIKE_EXTENSIONS

    for line_number, line in enumerate(read_text(path).splitlines(), start=1):
        if is_markdown_like and FENCE_PATTERN.match(line):
            in_fenced_block = not in_fenced_block
            continue

        if in_fenced_block:
            continue

        scan_line = strip_inline_code(line) if is_markdown_like else line

        for marker in FAIL_MARKERS:
            if marker in scan_line:
                findings.append(Finding("FAIL", rel, line_number, f"hard release marker present: {marker}", line.strip()))

        for marker in WARN_MARKERS:
            if marker in scan_line:
                findings.append(Finding("WARN", rel, line_number, f"review marker present: {marker}", line.strip()))

        for label, pattern in RISK_PATTERNS:
            if pattern.search(scan_line):
                findings.append(Finding("WARN", rel, line_number, label, line.strip()))

    return findings


def main() -> int:
    print("Nevora Codex release sanity check")
    print("===================================")

    failure_count = 0
    warning_count = 0

    missing = check_required_files()
    if missing:
        failure_count += len(missing)
        print("\nMissing required files:")
        for item in missing:
            print(f"  FAIL {item}")
    else:
        print("\nRequired file check: PASS")

    findings: list[Finding] = []
    for path in iter_scan_files():
        findings.extend(scan_file(path))

    if findings:
        print("\nScan findings:")
        for finding in findings:
            if finding.severity == "FAIL":
                failure_count += 1
            else:
                warning_count += 1
            print(f"  {finding.severity} {finding.path}:{finding.line} — {finding.message}")
            if finding.text:
                print(f"       {finding.text[:220]}")
    else:
        print("\nMarker and heuristic scan: PASS")

    print("\nSummary")
    print("-------")
    print(f"Failures: {failure_count}")
    print(f"Warnings: {warning_count}")

    if failure_count:
        print("\nResult: FAIL")
        print("Resolve failures before release candidate approval.")
        return 1

    print("\nResult: PASS WITH WARNINGS" if warning_count else "\nResult: PASS")
    print("Warnings still require human judgment and may need review before release.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
