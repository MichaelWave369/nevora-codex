import { useMemo, useState } from 'react';
import { folioPages, spreadPages, nextSpreadIndex } from './living-codex/flipbook-pages.js';
import './nevora-flipbook.css';

function Folio({ page, volume, chapterNumber, index, count }) {
  if (!page) return <article className="nevora-folio nevora-folio-blank" aria-label="Blank closing folio">
    <div className="nevora-folio-glyph" aria-hidden="true">✧</div><p>End of chapter</p>
  </article>;
  if (page.kind === 'frontispiece') return (
    <article className="nevora-folio nevora-frontispiece" aria-label={'Chapter ' + chapterNumber + ' title page'}>
      <div className="nevora-folio-header">NEVORA · THE LIVING CODEX</div>
      <div className="nevora-frontispiece-center">
        <div className="nevora-frontispiece-orbit" aria-hidden="true"><span>Φ</span></div>
        <p className="nevora-frontispiece-act">{page.act || 'THE PUBLIC EDITION'}</p>
        <p className="nevora-frontispiece-number">CHAPTER {page.chapterNumber}</p>
        <h3>{page.title}</h3>
        <p className="nevora-frontispiece-invocation">Read the words. Question the ideas.</p>
      </div>
      <div className="nevora-folio-footer"><span>VOLUME {volume.numeral}</span><span>DRAFT EDITION</span></div>
    </article>);
  return (
    <article className="nevora-folio nevora-folio-content" aria-label={'Book folio ' + (index + 1)}>
      <div className="nevora-folio-header">THE NEVORA CODEX <span>·</span> VOLUME {volume.numeral}</div>
      <div className="nevora-folio-text">
        {page.items.map((part, i) => {
          if (part.kind === 'heading') return <h4 key={i}>{part.text}</h4>;
          if (part.kind === 'list-item') return <p className="nevora-folio-list" key={i}>{part.text}</p>;
          return <p key={i}>{part.text}</p>;
        })}
      </div>
      <div className="nevora-folio-footer"><span>CHAPTER {chapterNumber}</span><span>{index + 1} / {count}</span></div>
    </article>);
}

export default function NevoraFlipBook({ chapter, volume, onPreviousChapter, onNextChapter }) {
  const pages = useMemo(() => folioPages(chapter), [chapter]);
  const [spread, setSpread] = useState(0);
  const [turn, setTurn] = useState(null);
  const visible = turn ? turn.to : spread;
  const [left, right] = spreadPages(pages, visible);
  const spreadCount = Math.ceil(pages.length / 2);
  const currentSpread = Math.floor(visible / 2) + 1;

  function move(direction) {
    if (turn) return;
    const target = nextSpreadIndex(spread, direction, pages.length);
    if (target === null) {
      if (direction < 0) onPreviousChapter?.();
      else onNextChapter?.();
      return;
    }
    const instant = typeof window !== 'undefined' && typeof window.matchMedia === 'function' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
       window.matchMedia('(max-width: 700px)').matches);
    if (instant) setSpread(target);
    else setTurn({ from: spread, to: target, direction });
  }

  function handleKeys(event) {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
  }

  if (!pages.length) return null;
  const outgoing = turn ? pages[turn.from + (turn.direction > 0 ? 1 : 0)] : null;
  return (
    <div className="nevora-flipbook" aria-label={'Flipbook, Chapter ' + chapter.number}>
      <div className="nevora-book-topline">
        <div><span className="nevora-book-kicker">THE LIVING CODEX · BOOK MODE</span><h3>{chapter.title}</h3></div>
        <span className="nevora-book-number">CHAPTER {chapter.number}</span>
      </div>
      <div className="nevora-book-binding" tabIndex={0} onKeyDown={handleKeys}
        aria-label={'Open book. Spread ' + currentSpread + ' of ' + spreadCount + '. Focus here and use left/right arrows.'}>
        <div className="nevora-book-pages">
          <div className="nevora-book-page left">
            <Folio page={left} volume={volume} chapterNumber={chapter.number} index={visible} count={pages.length}/>
          </div>
          <div className="nevora-book-page right">
            <Folio page={right} volume={volume} chapterNumber={chapter.number} index={visible + 1} count={pages.length}/>
          </div>
        </div>
        {turn && (
          <div className={'nevora-book-turn-sheet ' + (turn.direction > 0 ? 'forward' : 'backward')}
            aria-hidden="true" onAnimationEnd={(event) => {
              if (event.target !== event.currentTarget) return;
              setSpread(turn.to);
              setTurn(null);
            }}>
            <Folio page={outgoing} volume={volume} chapterNumber={chapter.number}
              index={turn.from + (turn.direction > 0 ? 1 : 0)} count={pages.length} />
          </div>
        )}
      </div>
      <div className="nevora-book-controls">
        <button type="button" disabled={Boolean(turn) || (spread === 0 && chapter.number === 1)}
          onClick={() => move(-1)} aria-label="Previous spread or chapter">← Turn back</button>
        <span aria-live="polite" className="nevora-book-counter">
          Spread {currentSpread} of {spreadCount} · folios {visible + 1}–{Math.min(visible + 2, pages.length)}
        </span>
        <button type="button" disabled={Boolean(turn) || (visible + 2 >= pages.length && chapter.number === 100)}
          onClick={() => move(1)} aria-label="Next spread or chapter">Turn page →</button>
      </div>
      <p className="nevora-book-help">Focus the book and use ← / →. Smaller screens stack folios for readability. The Continuous text view is always available.</p>
    </div>
  );
}
