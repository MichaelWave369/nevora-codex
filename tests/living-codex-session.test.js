import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PUBLIC_VOLUMES } from '../src/living-codex/catalog.js';
import { parseChapters } from '../src/living-codex/reader.js';
import { searchPublicCodex } from '../src/living-codex/grounded-guide.js';
import { makeStudySession, MAX_STUDY_EXCERPTS, VESSIE_CHAT_URL } from '../src/living-codex/vessie-session.js';

const documents = PUBLIC_VOLUMES.map(volume => ({
  volume,
  chapters: parseChapters(readFileSync(new URL('../source/' + volume.file, import.meta.url), 'utf8'))
}));

test('explicit source picks create an auditable, bounded multi-excerpt study packet', () => {
  const hits = searchPublicCodex('human sovereignty', documents, 6);
  assert.ok(hits.length >= 2);
  const packet = makeStudySession('How can humans protect sovereignty?', hits.slice(0, 2));
  assert.equal(packet.citations, 2);
  assert.match(packet.text, /DRAFT/);
  assert.match(packet.text, /SOURCE 1/);
  assert.match(packet.text, /SOURCE 2/);
  assert.match(packet.text, /evidence is insufficient/);
  assert.match(packet.text, /do not take actions/i);
  assert.ok(packet.text.includes(hits[0].excerpt));
  assert.ok(packet.text.includes(hits[1].sourceUrl));
  assert.ok(packet.text.length <= 4000);
  assert.equal(VESSIE_CHAT_URL, 'https://superphivessel.netlify.app/');
});

test('bad or forged citations and oversized sessions fail closed', () => {
  const hit = searchPublicCodex('human sovereignty', documents, 1)[0];
  assert.ok(hit);
  assert.equal(makeStudySession('question', []), null);
  assert.equal(makeStudySession('', [hit]), null);
  assert.equal(makeStudySession('q'.repeat(501), [hit]), null);
  assert.equal(makeStudySession('question', Array(MAX_STUDY_EXCERPTS + 1).fill(hit)), null);
  assert.equal(makeStudySession('question', [hit, hit]), null);
  assert.equal(makeStudySession('question', [{...hit, sourceUrl:'https://evil.test/source'}]), null);
  assert.equal(makeStudySession('question', [{...hit, chapterNumber:999}]), null);
  assert.equal(makeStudySession('question', [{...hit, sourceFile:'source/private.md'}]), null);
  assert.equal(makeStudySession('question', [{...hit, excerpt:'x'.repeat(481)}]), null);
});

test('manual handoff never encodes a question into a URL or script element', () => {
  const hit = searchPublicCodex('human sovereignty', documents, 1)[0];
  const value = makeStudySession('Can I ask <script> now?', [hit]);
  assert.ok(value.text.includes('<script>'));
  // Pure text for a readOnly textarea or clipboard, never injected as HTML.
  assert.equal(typeof value.text, 'string');
  assert.equal(VESSIE_CHAT_URL.includes('?'), false);
  assert.equal(VESSIE_CHAT_URL.includes('#'), false);
});
