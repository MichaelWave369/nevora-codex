import { PUBLIC_VOLUMES, sourcePageUrl } from './catalog.js';

// A draft-only, manual transfer. Never an AI session, permission grant or network request.
export const VESSIE_SESSION_SCHEMA = 'nevora.vessie.study-handoff.v0.1';
export const VESSIE_CHAT_URL = 'https://superphivessel.netlify.app/';
export const MAX_STUDY_EXCERPTS = 3;

export function makeStudySession(question, selectedHits) {
  if (typeof question !== 'string' || !Array.isArray(selectedHits)) return null;
  const normalizedQuestion = question.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!normalizedQuestion || normalizedQuestion.length > 500 ||
      selectedHits.length < 1 || selectedHits.length > MAX_STUDY_EXCERPTS) return null;
  const safe = [];
  const seen = new Set();
  for (const hit of selectedHits) {
    if (!hit || typeof hit !== 'object') return null;
    const volume = PUBLIC_VOLUMES.find(v => v.id === hit.volumeId);
    if (!volume || !Number.isInteger(hit.chapterNumber) ||
        hit.chapterNumber < volume.first || hit.chapterNumber > volume.last ||
        hit.volumeNumeral !== volume.numeral ||
        hit.sourceUrl !== sourcePageUrl(volume) ||
        hit.sourceFile !== 'source/' + volume.file) return null;
    if (typeof hit.chapterTitle !== 'string' || !hit.chapterTitle.trim() ||
        hit.chapterTitle.length > 180 ||
        typeof hit.excerpt !== 'string' || !hit.excerpt.trim() ||
        hit.excerpt.length > 480) return null;
    const key = volume.id + ':' + hit.chapterNumber;
    if (seen.has(key)) return null;
    seen.add(key);
    safe.push({
      chapterNumber: hit.chapterNumber,
      label: 'Volume ' + volume.numeral + ', Chapter ' + hit.chapterNumber + ': ' + hit.chapterTitle.trim(),
      source: sourcePageUrl(volume),
      excerpt: hit.excerpt.trim()
    });
  }
  const packet = [
    'NEVORA STUDY SESSION / USER-REVIEWED HANDOFF',
    'Schema: ' + VESSIE_SESSION_SCHEMA,
    'Publication state: public-edition DRAFT. Historical archives are a separate edition.',
    'Reader question: ' + normalizedQuestion,
    '',
    ...safe.flatMap((hit, index) => [
      '[SOURCE ' + (index + 1) + '] ' + hit.label,
      'Source: ' + hit.source,
      'Exact source location: Chapter ' + hit.chapterNumber,
      'Formatting-normalized excerpt (not the full chapter): ' + hit.excerpt,
      ''
    ]),
    'Vessie task: Help me understand the question using ONLY the provided excerpts for source-specific claims.',
    'Label any interpretation, conjecture, or general knowledge separately from these excerpts.',
    'Cite [SOURCE 1], [SOURCE 2], or [SOURCE 3] only when actually supported by the corresponding excerpt.',
    'If these excerpts do not answer the question, explicitly say the evidence is insufficient.',
    'Do not claim this draft is release-approved. Do not claim current AI consciousness.',
    'Do not take actions, grade personal beliefs, access private memory, or write back to the Codex.'
  ].join('\n');
  if (packet.length > 4000) return null;
  return { schema: VESSIE_SESSION_SCHEMA, text: packet, citations: safe.length };
}
