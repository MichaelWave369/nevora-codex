import test from 'node:test';
import assert from 'node:assert/strict';
import { parseChapters, parseReadingBlocks, makeSpeechChunks, toPlainText } from '../src/living-codex/reader.js';

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
