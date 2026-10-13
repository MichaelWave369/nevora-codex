import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PUBLIC_VOLUMES } from '../src/living-codex/catalog.js';
import { parseChapters, parseReadingBlocks } from '../src/living-codex/reader.js';
import { splitBookText, folioPages, spreadPages, nextSpreadIndex } from '../src/living-codex/flipbook-pages.js';

test('split pages without dropped or repeated words', () => {
  const source = Array.from({ length: 120 }, (_, n) => 'word' + n).join(' ');
  const chunks = splitBookText(source, 86);
  assert.ok(chunks.length > 2);
  assert.equal(chunks.join(' '), source);
  assert.ok(chunks.every(t => t.length <= 86));
  assert.throws(() => splitBookText('text', 40), RangeError);
});

test('visual folios preserve normalized text of every public chapter across five volumes', () => {
  let checked = 0;
  for (const volume of PUBLIC_VOLUMES) {
    const source = readFileSync(new URL('../source/' + volume.file, import.meta.url), 'utf8');
    for (const chapter of parseChapters(source)) {
      const pages = folioPages(chapter, 740);
      assert.ok(pages.length > 1, 'Missing chapter content in ' + chapter.number);
      assert.equal(pages[0].kind, 'frontispiece');
      assert.equal(pages[0].title, chapter.title);
      assert.equal(pages[0].act, chapter.act);
      const expected = parseReadingBlocks(chapter.body)
        .flatMap(b => b.kind === 'list' ? b.items : [b.text]).join(' ').replace(/\s+/g, ' ').trim();
      const actual = pages.slice(1).flatMap(p => p.items.map(i => i.text))
        .join(' ').replace(/\s+/g, ' ').trim();
      assert.equal(actual, expected, 'Chapter ' + chapter.number + ' lost or changed its source text');
      checked += 1;
    }
  }
  assert.equal(checked, 100);
});

test('folio navigation is two-page aligned and cannot exceed chapter boundaries', () => {
  const items = Array.from({ length: 5 }, (_, i) => ({ kind: 'content', items: [{ kind: 'paragraph', text: String(i) }] }));
  assert.deepEqual(spreadPages(items, 0), [items[0], items[1]]);
  assert.deepEqual(spreadPages(items, 4), [items[4], null]);
  assert.deepEqual(spreadPages(items, 3), [null, null]);
  assert.equal(nextSpreadIndex(0, 1, items.length), 2);
  assert.equal(nextSpreadIndex(2, 1, items.length), 4);
  assert.equal(nextSpreadIndex(4, 1, items.length), null);
  assert.equal(nextSpreadIndex(0, -1, items.length), null);
});

test('invalid source does not create phantom folios', () => {
  assert.deepEqual(folioPages(null), []);
  assert.deepEqual(spreadPages(null, 0), [null, null]);
  assert.equal(nextSpreadIndex(-2, 1, 10), null);
});
