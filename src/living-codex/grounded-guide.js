import { toPlainText } from './reader.js';
import { PUBLIC_VOLUMES, sourcePageUrl } from './catalog.js';

const STOP = new Set('a an and are as at be but by can could did do does for from had has have how i in is it its me my of on or our should so that the their them there these this to was were what when where which who why will with would you your about into through'.split(' '));

export function queryTerms(question) {
  const words = String(question || '').normalize('NFKC').toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
  return [...new Set(words.filter((word) => word.length >= 3 && !STOP.has(word)))].slice(0, 12);
}

function excerpt(text, terms, maxLength = 410) {
  if (text.length <= maxLength) return text;
  const lower = text.toLowerCase();
  const starts = terms.map((term) => lower.indexOf(term)).filter((index) => index >= 0);
  const first = starts.length ? Math.min(...starts) : 0;
  let start = Math.max(0, first - 85);
  if (start > 0) {
    const space = text.indexOf(' ', start);
    if (space > 0 && space - start < 30) start = space + 1;
  }
  let end = Math.min(text.length, start + maxLength);
  if (end < text.length) {
    const space = text.lastIndexOf(' ', end);
    if (space > start + 250) end = space;
  }
  return (start > 0 ? '…' : '') + text.slice(start, end).trim() + (end < text.length ? '…' : '');
}

// Each doc is { volume: PUBLIC_VOLUMES entry, chapters: parseChapters(...)}.
// This is a lexical EXCERPT FINDER, not AI-generated answers or factual validation.
export function searchPublicCodex(question, documents, limit = 6) {
  const terms = queryTerms(question);
  if (!terms.length || !Array.isArray(documents)) return [];
  const matches = [];
  for (const document of documents) {
    const volume = document?.volume;
    if (!volume || !PUBLIC_VOLUMES.some((item) => item.id === volume.id)) continue;
    for (const chapter of document.chapters || []) {
      if (!Number.isInteger(chapter.number) || chapter.number < volume.first || chapter.number > volume.last) continue;
      const title = (chapter.title + ' ' + chapter.act).toLowerCase();
      let best = null;
      for (const sourceParagraph of String(chapter.body || '').split(/\n\s*\n/)) {
        const paragraph = toPlainText(sourceParagraph);
        if (paragraph.length < 28) continue;
        const lower = paragraph.toLowerCase();
        const found = terms.filter((term) => lower.includes(term));
        if (found.length < Math.min(2, terms.length)) continue;
        const titleMatches = terms.filter((term) => title.includes(term)).length;
        const wholeQuery = terms.join(' ');
        const score = found.length * 8 + titleMatches * 3
          + (found.length === terms.length ? 5 : 0)
          + (wholeQuery && lower.includes(wholeQuery) ? 7 : 0);
        if (!best || score > best.score) {
          best = {
            score,
            volumeId: volume.id,
            volumeNumeral: volume.numeral,
            chapterNumber: chapter.number,
            chapterTitle: chapter.title,
            act: chapter.act,
            excerpt: excerpt(paragraph, found),
            sourceUrl: sourcePageUrl(volume),
            sourceFile: 'source/' + volume.file
          };
        }
      }
      if (best) matches.push(best);
    }
  }
  return matches.sort((a, b) => b.score - a.score || a.chapterNumber - b.chapterNumber)
    .slice(0, Math.max(1, Math.min(20, limit)));
}

// Creates a user-controlled handoff, with no automatic message or network call.
export function makeVessieStudyHandoff(question, match) {
  if (!match) return '';
  return [
    'Nevora Codex study handoff. This is the PUBLIC-EDITION DRAFT, not a release-approved or archival manuscript.',
    'Reader question: ' + String(question || '').trim().slice(0, 500),
    'Source: ' + match.sourceUrl,
    'Source location: Volume ' + match.volumeNumeral + ', Chapter ' + match.chapterNumber + ' — ' + match.chapterTitle,
    'Passage excerpt (formatting normalized): ' + match.excerpt,
    'Explain using this excerpt as evidence. Distinguish quotation, author viewpoint, your interpretation, and external verification.',
    'Do not invent other passage citations, diagnose readers, or claim AI consciousness.'
  ].join('\n');
}
