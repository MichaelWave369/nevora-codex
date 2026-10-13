import { parseReadingBlocks } from './reader.js';

// This is visual pagination of normalized public-draft text, not an edition
// rewrite or faithful printed-PDF pagination. Original Markdown remains canonical.
export function splitBookText(text, maxChars = 740) {
  if (!Number.isInteger(maxChars) || maxChars < 80 || maxChars > 5000) throw new RangeError('Page character limit');
  const words = String(text || '').trim().split(/\s+/).filter(Boolean);
  const parts = [];
  let line = '';
  for (const word of words) {
    if (line && line.length + 1 + word.length > maxChars) {
      parts.push(line);
      line = '';
    }
    line += (line ? ' ' : '') + word;
  }
  if (line) parts.push(line);
  return parts;
}

export function folioPages(chapter, maxChars = 740) {
  if (!chapter || typeof chapter.title !== 'string') return [];
  const pages = [{
    kind: 'frontispiece',
    chapterNumber: chapter.number,
    title: chapter.title,
    act: chapter.act || ''
  }];
  const blocks = parseReadingBlocks(chapter.body);
  const pieces = [];
  for (const block of blocks) {
    if (block.kind === 'list') {
      for (const item of block.items) {
        for (const text of splitBookText(item, maxChars)) pieces.push({ kind: 'list-item', text });
      }
    } else {
      for (const [index, text] of splitBookText(block.text, maxChars).entries()) {
        pieces.push({ kind: block.kind === 'heading' && index === 0 ? 'heading' : 'paragraph', text });
      }
    }
  }
  let items = [];
  let length = 0;
  for (const piece of pieces) {
    const weight = piece.text.length + 20;
    if (items.length && length + weight > maxChars) {
      pages.push({ kind: 'content', items });
      items = [];
      length = 0;
    }
    items.push(piece);
    length += weight;
  }
  if (items.length) pages.push({ kind: 'content', items });
  return pages;
}

export function spreadPages(pages, spreadIndex) {
  if (!Array.isArray(pages) || !Number.isInteger(spreadIndex) || spreadIndex < 0 || spreadIndex % 2) return [null, null];
  return [pages[spreadIndex] || null, pages[spreadIndex + 1] || null];
}

export function nextSpreadIndex(current, direction, count) {
  if (!Number.isInteger(current) || current < 0 || current % 2 !== 0 ||
      ![1, -1].includes(direction) || !Number.isInteger(count) || count < 1) return null;
  const next = current + direction * 2;
  return next < 0 || next >= count ? null : next;
}
