#!/usr/bin/env python3
"""Assemble the Nevora Codex v1.0 public manuscript.

This script concatenates the canonical source files into a single Markdown
release manuscript at releases/nevora-codex-v1.0.md.

Run from the repository root:

    python scripts/assemble_manuscript.py
"""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

SOURCE_FILES = [
    "source/front-matter.md",
    "source/table-of-contents.md",
    "source/volume-i.md",
    "source/volume-ii.md",
    "source/volume-iii.md",
    "source/volume-iv.md",
    "source/volume-v.md",
    "docs/claim-boundary-matrix.md",
    "docs/ai-collaboration-disclosure.md",
    "docs/kenotic-covenant-appendix.md",
    "docs/anti-cult-and-anti-manipulation-clause.md",
    "docs/glossary.md",
    "docs/publication-roadmap.md",
]

OUTPUT_FILE = ROOT / "releases" / "nevora-codex-v1.0.md"


def read_text(path: Path) -> str:
    if not path.exists():
        raise FileNotFoundError(f"Missing source file: {path.relative_to(ROOT)}")
    return path.read_text(encoding="utf-8").strip()


def main() -> None:
    sections: list[str] = []

    header = """<!--
Generated file: releases/nevora-codex-v1.0.md
Source: scripts/assemble_manuscript.py

Do not edit this generated file directly. Edit the source files in /source and /docs,
then re-run the assembly script.
-->
""".strip()
    sections.append(header)

    for relative_path in SOURCE_FILES:
        source_path = ROOT / relative_path
        source_text = read_text(source_path)
        sections.append(f"\n\n<!-- BEGIN {relative_path} -->\n\n{source_text}\n\n<!-- END {relative_path} -->")

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text("\n\n---\n\n".join(sections) + "\n", encoding="utf-8")

    print(f"Assembled {len(SOURCE_FILES)} source files into {OUTPUT_FILE.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
