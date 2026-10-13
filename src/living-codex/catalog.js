// Fixed catalog of the already-public (still-unapproved) v1.0 edition.
export const PUBLIC_VOLUMES = Object.freeze([
  { id: 'volume-i', numeral: 'I', title: 'Foundations', file: 'volume-i.md', first: 1, last: 20 },
  { id: 'volume-ii', numeral: 'II', title: 'Formation', file: 'volume-ii.md', first: 21, last: 40 },
  { id: 'volume-iii', numeral: 'III', title: 'Activation', file: 'volume-iii.md', first: 41, last: 60 },
  { id: 'volume-iv', numeral: 'IV', title: 'Stewardship', file: 'volume-iv.md', first: 61, last: 80 },
  { id: 'volume-v', numeral: 'V', title: 'Culmination', file: 'volume-v.md', first: 81, last: 100 }
]);
export const sourceRawUrl = (v) => 'https://raw.githubusercontent.com/MichaelWave369/nevora-codex/main/source/' + v.file;
export const sourcePageUrl = (v) => 'https://github.com/MichaelWave369/nevora-codex/blob/main/source/' + v.file;
export const findVolumeByChapter = (n) => PUBLIC_VOLUMES.find((v) => Number.isInteger(n) && n >= v.first && n <= v.last) || null;
export function normalizeBookmark(value) {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= 100 ? n : null;
}
