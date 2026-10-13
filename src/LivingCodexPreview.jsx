import { useEffect, useMemo, useRef, useState } from 'react';
import { makeSpeechChunks, parseChapters, parseReadingBlocks } from './living-codex/reader.js';
import CodexGuide from './CodexGuide.jsx';
import NevoraFlipBook from './NevoraFlipBook.jsx';
import './living-codex.css';
import { PUBLIC_VOLUMES, findVolumeByChapter, normalizeBookmark, sourceRawUrl, sourcePageUrl } from './living-codex/catalog.js';

// This document is already public in the repository. The reader NEVER imports private archive files.
const bookmarkKey = 'nevora-living-codex-bookmark-v1';
function readBookmark() { try { return normalizeBookmark(window.localStorage.getItem(bookmarkKey)); } catch { return null; } }

export default function LivingCodexPreview() {
  const [volumeId, setVolumeId] = useState(PUBLIC_VOLUMES[0].id);
  const [readerView, setReaderView] = useState('book');
  const [bookmark, setBookmark] = useState(readBookmark);
  const [chapters, setChapters] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [loadState, setLoadState] = useState('not-loaded');
  const [message, setMessage] = useState('');
  const [speechState, setSpeechState] = useState('stopped');
  const [clipboardMessage, setClipboardMessage] = useState('');
  const currentRun = useRef(0);
  const currentRequest = useRef(0);
  const synthAvailable = typeof window !== 'undefined' && !!window.speechSynthesis && !!window.SpeechSynthesisUtterance;
  const activeVolume = PUBLIC_VOLUMES.find((v) => v.id === volumeId) || PUBLIC_VOLUMES[0];
  const current = useMemo(() => chapters.find((chapter) => chapter.id === selectedId), [chapters, selectedId]);
  const blocks = useMemo(() => parseReadingBlocks(current?.body), [current?.body]);

  const stopSpeech = () => {
    currentRun.current += 1;
    if (synthAvailable) window.speechSynthesis.cancel();
    setSpeechState('stopped');
  };

  useEffect(() => () => {
    currentRequest.current += 1;
    currentRun.current += 1;
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
  }, []);

  async function loadPublicDraft(volume = activeVolume, selectedNumber = null) {
    const request = ++currentRequest.current;
    stopSpeech();
    setVolumeId(volume.id);
    setChapters([]);
    setSelectedId('');
    setMessage('');
    setClipboardMessage('');
    setLoadState('loading');
    try {
      const response = await fetch(sourceRawUrl(volume));
      if (!response.ok) throw new Error('Source fetch returned ' + response.status);
      const parsed = parseChapters(await response.text());
      if (parsed.length !== 20 || !parsed.every((chapter, i) => chapter.number === volume.first + i)) {
        throw new Error('Volume chapter numbers invalid');
      }
      if (request !== currentRequest.current) return;
      const selected = parsed.find((chapter) => chapter.number === selectedNumber) || parsed[0];
      setChapters(parsed);
      setSelectedId(selected.id);
      setLoadState('loaded');
    } catch {
      if (request !== currentRequest.current) return;
      setLoadState('failed');
      setMessage('Could not load or validate this public-draft volume. Please check the source on GitHub and retry.');
    }
  }

  function startReading() {
    if (!synthAvailable || !current) return;
    stopSpeech();
    const chunks = makeSpeechChunks(current.title + '. ' + current.body);
    if (!chunks.length) return;
    const runId = currentRun.current;
    setSpeechState('speaking');
    function speakChunk(index) {
      if (runId !== currentRun.current) return;
      if (index >= chunks.length) {
        setSpeechState('stopped');
        return;
      }
      const utterance = new window.SpeechSynthesisUtterance(chunks[index]);
      utterance.lang = 'en-US';
      utterance.rate = 0.95;
      utterance.onend = () => speakChunk(index + 1);
      utterance.onerror = (event) => {
        if (runId !== currentRun.current) return;
        if (event.error !== 'canceled' && event.error !== 'interrupted') {
          setMessage('Narration stopped. The browser voice service may be unavailable.');
        }
        setSpeechState('stopped');
      };
      window.speechSynthesis.speak(utterance);
    }
    speakChunk(0);
  }

  function togglePause() {
    if (!synthAvailable) return;
    if (speechState === 'speaking') {
      window.speechSynthesis.pause();
      setSpeechState('paused');
    } else if (speechState === 'paused') {
      window.speechSynthesis.resume();
      setSpeechState('speaking');
    }
  }

  function selectChapter(id) {
    stopSpeech();
    setSelectedId(id);
    setMessage('');
  }

  function navigateChapter(offset) {
    if (!current) return;
    const destination = current.number + offset;
    const volume = findVolumeByChapter(destination);
    if (!volume) return;
    if (volume.id === activeVolume.id) selectChapter('chapter-' + destination);
    else void loadPublicDraft(volume, destination);
  }

  function saveBookmark() {
    if (!current) return;
    try {
      window.localStorage.setItem(bookmarkKey, String(current.number));
      setBookmark(current.number);
      setMessage('Bookmark saved in this browser only.');
    } catch { setMessage('Browser storage unavailable. Bookmark not saved.'); }
  }

  function clearBookmark() {
    try {
      window.localStorage.removeItem(bookmarkKey);
      setBookmark(null);
      setMessage('Local bookmark cleared.');
    } catch { setMessage('Browser storage unavailable.'); }
  }

  const bookmarkVolume = findVolumeByChapter(bookmark);

  async function copyHandoff() {
    if (!current) return;
    const prompt = [
      'I am studying the Nevora Codex v1.0 PUBLIC DRAFT (not a final release).',
      'Source: ' + sourcePageUrl(activeVolume),
      'Chapter ' + current.number + ': ' + current.title,
      'Please explain the key ideas with a clear distinction between source text, interpretation, and evidence.',
      'Do not assert AI consciousness, and cite the chapter rather than inventing quotations.'
    ].join('\n');
    try {
      await navigator.clipboard.writeText(prompt);
      setClipboardMessage('Study prompt copied. Vessie is not connected to this site yet.');
    } catch {
      setClipboardMessage('Clipboard permission unavailable. Use the source link to share the chapter manually.');
    }
  }

  return (
    <section className="living-codex-preview" id="living-codex" aria-labelledby="living-codex-title">
      <div className="section-heading">
        <p>Living Codex • five-volume reader prototype</p>
        <h2 id="living-codex-title">Read the words. Question the ideas. Explore the worlds.</h2>
      </div>
      <div className="living-boundary">
        <strong>Publication boundary</strong>
        <p>The five volumes are existing public-edition drafts, still under review, not the separate historical 20-Act manuscripts. Vessie, assessments, and VR worlds are not connected. This preview does not approve the v1.0 release.</p>
      </div>
      <div className="living-stage-grid" aria-label="Living Codex development status">
        <div><strong>01 • READ</strong><span>Five volumes / 100 draft chapters • preview available</span></div>
        <div><strong>02 • LISTEN</strong><span>Browser narration • available where supported</span></div>
        <div><strong>03 • ASK THE CODEX</strong><span>Cited excerpt finder • available; Vessie AI • planned</span></div>
        <div><strong>04 • LEARN</strong><span>Source-grounded assessments • planned</span></div>
        <div><strong>05 • ENTER</strong><span>Temple / Forge / Lighthouse • concept only</span></div>
      </div>
      <div className="living-reader">
        <div className="living-reader-top">
          <div>
            <span className="volume-kicker">Five-volume public draft · Chapters 1–100</span>
            <h3>The Reading Room</h3>
            <p>Choose any volume and navigate chapters. No login, analytics, AI request, or private archive upload.</p>
          </div>
          <button type="button" className="living-primary" disabled={loadState === 'loading'} onClick={() => void loadPublicDraft(activeVolume)}>
            {loadState === 'loading' ? 'Loading…' : loadState === 'loaded' ? 'Reload Volume ' + activeVolume.numeral : 'Open Volume ' + activeVolume.numeral}
          </button>
        </div>
        <div className="living-volume-switcher" aria-label="Choose a public-draft volume">
          {PUBLIC_VOLUMES.map((v) => (
            <button type="button" key={v.id} disabled={loadState === 'loading'}
              aria-pressed={loadState === 'loaded' && v.id === volumeId}
              className={loadState === 'loaded' && v.id === volumeId ? 'selected' : ''}
              onClick={() => void loadPublicDraft(v)}>
              <strong>Volume {v.numeral}</strong><span>{v.title}</span>
              <small>Chapters {v.first}–{v.last}</small>
            </button>
          ))}
        </div>
        {bookmark !== null && bookmarkVolume && (
          <div className="living-bookmark-bar">
            <span>Saved locally: Chapter {bookmark}, Volume {bookmarkVolume.numeral}</span>
            <button type="button" disabled={loadState === 'loading'}
              onClick={() => void loadPublicDraft(bookmarkVolume, bookmark)}>Resume bookmark</button>
            <button type="button" onClick={clearBookmark}>Clear bookmark</button>
          </div>
        )}
        {loadState === 'loaded' && (
          <div className="living-controls">
            <label htmlFor="living-chapter-select">Chapter · Volume {activeVolume.numeral}</label>
            <select id="living-chapter-select" value={selectedId} onChange={(event) => selectChapter(event.target.value)}>
              {chapters.map((chapter) => (
                <option key={chapter.id} value={chapter.id}>Chapter {chapter.number}: {chapter.title}</option>
              ))}
            </select>
            <div className="living-navigation-actions">
              <button type="button" disabled={current?.number === 1} onClick={() => navigateChapter(-1)}>← Previous</button>
              <button type="button" onClick={saveBookmark}>Bookmark chapter</button>
              <button type="button" disabled={current?.number === 100} onClick={() => navigateChapter(1)}>Next →</button>
            </div>
            <div className="living-speech-actions">
              <button type="button" disabled={!synthAvailable || !current} onClick={startReading}>Read aloud</button>
              <button type="button" disabled={speechState === 'stopped'} onClick={togglePause}>{speechState === 'paused' ? 'Resume' : 'Pause'}</button>
              <button type="button" disabled={speechState === 'stopped'} onClick={stopSpeech}>Stop</button>
            </div>
            {!synthAvailable && <p role="status">This browser does not provide speech synthesis. The text reader still works.</p>}
          </div>
        )}
        {current && (
          <div className="living-reader-view-switch" role="group" aria-label="Reading layout">
            <span>READING LAYOUT</span>
            <button type="button" aria-pressed={readerView === 'book'}
              className={readerView === 'book' ? 'selected' : ''}
              onClick={() => setReaderView('book')}>Book pages</button>
            <button type="button" aria-pressed={readerView === 'text'}
              className={readerView === 'text' ? 'selected' : ''}
              onClick={() => setReaderView('text')}>Continuous text</button>
          </div>
        )}
        {current ? (
          readerView === 'book' ? (
            <NevoraFlipBook key={activeVolume.id + ':' + current.number}
              chapter={current} volume={activeVolume}
              onPreviousChapter={() => navigateChapter(-1)}
              onNextChapter={() => navigateChapter(1)} />
          ) : (
          <article className="living-manuscript">
            <div className="living-manuscript-meta">Volume {activeVolume.numeral} · Chapter {current.number} · Public draft · Not release-approved</div>
            {current.act && <div className="living-act-label">{current.act}</div>}
            <h3>{current.title}</h3>
            {blocks.map((block, index) => {
              if (block.kind === 'heading') return <h4 key={index}>{block.text}</h4>;
              if (block.kind === 'list') return <ul key={index}>{block.items.map((item, j) => <li key={j}>{item}</li>)}</ul>;
              return <p key={index}>{block.text}</p>;
            })}
            <div className="living-source-line">
              <a href={sourcePageUrl(activeVolume)} target="_blank" rel="noreferrer">View exact Markdown source on GitHub</a>
              <button type="button" onClick={copyHandoff}>Copy study prompt</button>
            </div>
          </article>
          )
        ) : (
          <p className="living-empty">Choose a volume above to open its public-draft chapters.</p>
        )}
        {current && readerView === 'book' && (
          <div className="living-source-line">
            <a href={sourcePageUrl(activeVolume)} target="_blank" rel="noreferrer">View exact Markdown source on GitHub</a>
            <button type="button" onClick={copyHandoff}>Copy source-linked study prompt</button>
          </div>
        )}
        {message && <p className="living-feedback" role="status">{message}</p>}
        {clipboardMessage && <p className="living-feedback" role="status">{clipboardMessage}</p>}
      </div>
      <CodexGuide onOpenChapter={(number) => {
        const volume = findVolumeByChapter(number);
        if (!volume) return;
        void loadPublicDraft(volume, number);
        document.getElementById('living-codex-title')?.scrollIntoView();
      }} />
      <p className="living-footnote">
        Only a bookmark you explicitly save is stored in this browser; no automatic reading history. Speech uses browser or OS voices, which may have separate privacy policies. The passage finder is non-AI; Vessie tutor, assessments, and virtual worlds remain planned.
      </p>
    </section>
  );
}
