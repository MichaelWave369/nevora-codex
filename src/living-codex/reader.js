// Pure parsing helpers for already-public Nevora Markdown. No HTML injection or AI generation.
const chapterHeading = /^## Chapter\s+(\d+)\s*[—–-]\s*(.+)$/gm;

export function parseChapters(markdown) {
  if (typeof markdown !== 'string') return [];
  const matches = [...markdown.matchAll(chapterHeading)];
  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? markdown.length;
    return {
      id: 'chapter-' + match[1],
      number: Number(match[1]),
      title: match[2].trim(),
      body: markdown.slice(start, end).trim()
    };
  }).filter((chapter) => chapter.body.length > 0);
}

export function toPlainText(markdown) {
  return String(markdown || '')
    .replace(/!?\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/(\*\*|__|\*|_|~|`)/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function parseReadingBlocks(body) {
  return String(body || '').split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean)
    .map((part) => {
      if (/^#{2,6}\s/.test(part)) return { kind: 'heading', text: toPlainText(part) };
      const lines = part.split('\n').map((s) => s.trim()).filter(Boolean);
      if (lines.every((line) => /^[-*+]\s/.test(line))) {
        return { kind: 'list', items: lines.map((line) => toPlainText(line)) };
      }
      return { kind: 'paragraph', text: toPlainText(part) };
    });
}

export function makeSpeechChunks(text, limit = 650) {
  const words = toPlainText(text).split(/\s+/).filter(Boolean);
  const chunks = [];
  let buffer = '';
  for (const word of words) {
    if (buffer && buffer.length + 1 + word.length > limit) {
      chunks.push(buffer);
      buffer = '';
    }
    buffer += (buffer ? ' ' : '') + word;
  }
  if (buffer) chunks.push(buffer);
  return chunks;
}
