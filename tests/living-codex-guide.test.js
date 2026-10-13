import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PUBLIC_VOLUMES, sourcePageUrl } from '../src/living-codex/catalog.js';
import { parseChapters, toPlainText } from '../src/living-codex/reader.js';
import { queryTerms, searchPublicCodex, makeVessieStudyHandoff } from '../src/living-codex/grounded-guide.js';

const documents = PUBLIC_VOLUMES.map((volume) => ({
  volume,
  chapters: parseChapters(readFileSync(new URL('../source/' + volume.file, import.meta.url), 'utf8'))
}));

test('removes question filler and never treats an empty question as an answer', () => {
  assert.deepEqual(queryTerms('How does Nevora protect human sovereignty?'), ['nevora', 'protect', 'human', 'sovereignty']);
  assert.deepEqual(queryTerms('the and what'), []);
  assert.deepEqual(searchPublicCodex('the and what', documents), []);
  assert.deepEqual(searchPublicCodex('', documents), []);
});

test('search finds verified excerpts across existing public-draft Markdown', () => {
  const matches = searchPublicCodex('human sovereignty', documents, 8);
  assert.ok(matches.length > 0, 'Public chapters should contain human sovereignty passages');
  for (const match of matches) {
    const volume = PUBLIC_VOLUMES.find((v) => v.id === match.volumeId);
    assert.ok(volume);
    assert.equal(match.sourceUrl, sourcePageUrl(volume));
    assert.ok(match.chapterNumber >= volume.first && match.chapterNumber <= volume.last);
    const original = documents.find((doc) => doc.volume.id === volume.id)
      .chapters.find((chapter) => chapter.number === match.chapterNumber);
    assert.equal(match.chapterTitle, original.title);
    assert.equal(match.act, original.act);
    const excerptFragment = match.excerpt.replace(/^…/, '').replace(/…$/, '');
    assert.ok(original.body.split(/\n\s*\n/).some((paragraph) => toPlainText(paragraph).includes(excerptFragment)),
      'Every displayed excerpt must be a substring of a source paragraph');
  }
});

test('search does not invent citations or hallucinate unrelated matches', () => {
  assert.deepEqual(searchPublicCodex('xylophonically ultraviolaceous mooncheddar', documents), []);
  assert.deepEqual(searchPublicCodex('human sovereignty', []), []);
});

test('study handoff is provenance-labeled and explicitly user-controlled', () => {
  const hit = searchPublicCodex('human sovereignty', documents, 1)[0];
  const handoff = makeVessieStudyHandoff('What is human sovereignty?', hit);
  assert.ok(handoff.includes('What is human sovereignty?'));
  assert.ok(handoff.includes(hit.excerpt));
  assert.ok(handoff.includes(hit.sourceUrl));
  assert.match(handoff, /PUBLIC-EDITION DRAFT/);
  assert.match(handoff, /Do not invent/);
  assert.equal(makeVessieStudyHandoff('Hello?', null), '');
});
