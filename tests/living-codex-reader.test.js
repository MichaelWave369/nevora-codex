import test from 'node:test';
import assert from 'node:assert/strict';
import { parseChapters, parseReadingBlocks, makeSpeechChunks, toPlainText } from '../src/living-codex/reader.js';
import { readFileSync } from 'node:fs';
import { PUBLIC_VOLUMES, findVolumeByChapter, normalizeBookmark, sourceRawUrl, sourcePageUrl } from '../src/living-codex/catalog.js';

const source = [
  '# Volume I',
  '## Chapter 1 — The Call to Coevolution',
  'First **paragraph**.',
  '',
  'Second paragraph.',
  '',
  '## Chapter 2 — The Forces Shaping Human-AI Coevolution',
  'Another chapter.'
].join('\n');

test('parses real volume-style chapter headers without incorporating previous chapter text', () => {
  const chapters = parseChapters(source);
  assert.equal(chapters.length, 2);
  assert.equal(chapters[0].title, 'The Call to Coevolution');
  assert.equal(chapters[0].number, 1);
  assert.match(chapters[0].body, /Second paragraph/);
  assert.doesNotMatch(chapters[0].body, /Another chapter/);
});

test('renders safe text blocks rather than HTML from imported Markdown', () => {
  const blocks = parseReadingBlocks('## Section\n\n- one\n- two\n\n**Care** matters.');
  assert.equal(blocks[0].kind, 'heading');
  assert.deepEqual(blocks[1].items, ['one', 'two']);
  assert.equal(blocks[2].text, 'Care matters.');
  assert.equal(toPlainText('[Source](https://example.org)') ,'Source');
});

test('splits narration into bounded utterances without dropping words', () => {
  const sentence = Array.from({ length: 180 }, (_, i) => 'word' + i).join(' ');
  const chunks = makeSpeechChunks(sentence, 100);
  assert.ok(chunks.length > 1);
  assert.ok(chunks.every((chunk) => chunk.length <= 100));
  assert.equal(chunks.join(' '), sentence);
});

test('empty or non-string source produces no chapters', () => {
  assert.deepEqual(parseChapters(''), []);
  assert.deepEqual(parseChapters(null), []);
});

test('all five public-draft volumes have 20 chapters and 100 unique chapter numbers', () => {
  const all = [];
  for (const volume of PUBLIC_VOLUMES) {
    const content = readFileSync(new URL('../source/' + volume.file, import.meta.url), 'utf8');
    const chapters = parseChapters(content);
    assert.equal(chapters.length, 20, volume.file);
    assert.deepEqual(chapters.map((ch) => ch.number),
      Array.from({ length: 20 }, (_, i) => i + volume.first));
    assert.ok(chapters.every((ch) => ch.title && ch.body && ch.act));
    assert.ok(sourceRawUrl(volume).endsWith('/' + volume.file));
    assert.ok(sourcePageUrl(volume).includes('/source/' + volume.file));
    all.push(...chapters.map((ch) => ch.number));
  }
  assert.deepEqual(all, Array.from({ length: 100 }, (_, i) => i + 1));
});
test('chapter 20 does not include the Act VI heading', () => {
  const sample = '# Act V — First\n## Chapter 20 — Finish\nText.\n# Act VI — Second\n## Chapter 21 — Continue\nMore.';
  const chapters = parseChapters(sample);
  assert.equal(chapters.length, 2);
  assert.doesNotMatch(chapters[0].body, /Act VI/);
  assert.match(chapters[1].act, /Act VI/);
});
test('bookmarks are bounded and map to the intended volume', () => {
  assert.equal(findVolumeByChapter(20)?.id, 'volume-i');
  assert.equal(findVolumeByChapter(21)?.id, 'volume-ii');
  assert.equal(findVolumeByChapter(100)?.id, 'volume-v');
  assert.equal(findVolumeByChapter(101), null);
  assert.equal(normalizeBookmark('21'), 21);
  assert.equal(normalizeBookmark('foo'), null);
  assert.equal(normalizeBookmark('2.2'), null);
});
