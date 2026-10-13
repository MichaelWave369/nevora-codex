import { useEffect, useRef, useState } from 'react';
import { PUBLIC_VOLUMES, sourceRawUrl } from './living-codex/catalog.js';
import { parseChapters } from './living-codex/reader.js';
import { makeVessieStudyHandoff, queryTerms, searchPublicCodex } from './living-codex/grounded-guide.js';
import './codex-guide.css';

// Deterministic, source-grounded lookup over the public drafts only.
// This is NOT a Vessie AI connection and never sends the reader's question to a server.
export default function CodexGuide({ onOpenChapter }) {
  const [question, setQuestion] = useState('');
  const [searchedFor, setSearchedFor] = useState('');
  const [status, setStatus] = useState('idle');
  const [hits, setHits] = useState([]);
  const [feedback, setFeedback] = useState('');
  const cache = useRef(null);
  const inflight = useRef(null);

  useEffect(() => () => { inflight.current?.abort(); }, []);

  async function handleSearch(event) {
    event.preventDefault();
    const submitted = question.trim().slice(0, 500);
    setFeedback('');
    setSearchedFor(submitted);
    setHits([]);
    if (!queryTerms(submitted).length) {
      setStatus('invalid');
      setFeedback('Enter a specific topic, such as "human sovereignty" or "trust and governance".');
      return;
    }
    setStatus('loading');
    inflight.current?.abort();
    const controller = new AbortController();
    inflight.current = controller;
    try {
      let docs = cache.current;
      if (!docs) {
        docs = await Promise.all(PUBLIC_VOLUMES.map(async (volume) => {
          const response = await fetch(sourceRawUrl(volume), { signal: controller.signal });
          if (!response.ok) throw new Error('Source download failed');
          const chapters = parseChapters(await response.text());
          if (chapters.length !== 20 || !chapters.every((chapter, i) => chapter.number === volume.first + i)) {
            throw new Error('Public-draft chapter validation failed');
          }
          return { volume, chapters };
        }));
        cache.current = docs;
      }
      if (controller.signal.aborted) return;
      const found = searchPublicCodex(submitted, docs);
      setHits(found);
      setStatus(found.length ? 'results' : 'empty');
    } catch {
      if (controller.signal.aborted) return;
      setStatus('error');
      setFeedback('Could not load or verify all five public drafts. Try again when GitHub source is reachable.');
    }
  }

  async function copyHandoff(hit) {
    try {
      await navigator.clipboard.writeText(makeVessieStudyHandoff(searchedFor, hit));
      setFeedback('Source-linked study prompt copied. You can paste it into Vessie yourself; no AI connection was made.');
    } catch {
      setFeedback('Clipboard unavailable. Open the source and copy the passage manually.');
    }
  }

  return (
    <section className="codex-guide" aria-labelledby="codex-guide-title">
      <div className="codex-guide-intro">
        <div>
          <span className="volume-kicker">Passage finder · Vessie-ready</span>
          <h3 id="codex-guide-title">Ask the Codex</h3>
          <p>Search all five public-draft volumes for relevant passages, then inspect the exact chapter. This is a local question-to-excerpt finder, <strong>not yet Vessie's AI tutor</strong>.</p>
        </div>
      </div>
      <form className="codex-guide-form" onSubmit={handleSearch}>
        <label htmlFor="codex-guide-question">What would you like to explore?</label>
        <div className="codex-guide-inputrow">
          <input id="codex-guide-question" type="search" value={question} maxLength={500}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Example: How does Nevora protect human sovereignty?" autoComplete="off" />
          <button type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Searching…' : 'Find passages'}</button>
        </div>
      </form>
      <p className="codex-guide-privacy">Your question stays in this browser. Only the public Markdown files are fetched from GitHub. No AI requests, logging by this app, account, or assessment.</p>
      {status === 'loading' && <p className="codex-guide-status" role="status">Checking the five public volumes…</p>}
      {status === 'empty' && <p className="codex-guide-status" role="status">No strong passage matches found in the public draft. Try more specific terms; this does not prove the subject is absent.</p>}
      {feedback && <p className="codex-guide-status" role="status">{feedback}</p>}
      {status === 'results' && (
        <div className="codex-guide-results">
          <p role="status">Showing {hits.length} relevant chapter excerpt{hits.length === 1 ? '' : 's'} for “{searchedFor}”. Matches are lexical, not verified answers.</p>
          <ol>
            {hits.map((hit) => (
              <li key={hit.volumeId + hit.chapterNumber}>
                <div className="codex-guide-citation">Volume {hit.volumeNumeral} · {hit.act || 'Act not labeled'} · Chapter {hit.chapterNumber}</div>
                <h4>{hit.chapterTitle}</h4>
                <p className="codex-guide-excerpt">{hit.excerpt}</p>
                <div className="codex-guide-actions">
                  <button type="button" onClick={() => onOpenChapter(hit.chapterNumber)}>Open in reader</button>
                  <a href={hit.sourceUrl} target="_blank" rel="noreferrer">Inspect Markdown source</a>
                  <button type="button" onClick={() => void copyHandoff(hit)}>Copy for Vessie</button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
