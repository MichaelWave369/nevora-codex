import { useEffect, useMemo, useRef, useState } from 'react';
import { makeSpeechChunks, parseChapters, parseReadingBlocks } from './living-codex/reader.js';
import './living-codex.css';

// This document is already public in the repository. The reader NEVER imports private archive files.
const sourceUrl = 'https://raw.githubusercontent.com/MichaelWave369/nevora-codex/main/source/volume-i.md';
const sourcePageUrl = 'https://github.com/MichaelWave369/nevora-codex/blob/main/source/volume-i.md';

export default function LivingCodexPreview() {
  const [chapters, setChapters] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [loadState, setLoadState] = useState('not-loaded');
  const [message, setMessage] = useState('');
  const [speechState, setSpeechState] = useState('stopped');
  const [clipboardMessage, setClipboardMessage] = useState('');
  const currentRun = useRef(0);
  const synthAvailable = typeof window !== 'undefined' && !!window.speechSynthesis && !!window.SpeechSynthesisUtterance;
  const current = useMemo(() => chapters.find((chapter) => chapter.id === selectedId), [chapters, selectedId]);
  const blocks = useMemo(() => parseReadingBlocks(current?.body), [current?.body]);

  const stopSpeech = () => {
    currentRun.current += 1;
    if (synthAvailable) window.speechSynthesis.cancel();
    setSpeechState('stopped');
  };

  useEffect(() => () => {
    currentRun.current += 1;
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
  }, []);

  async function loadPublicDraft() {
    stopSpeech();
    setMessage('');
    setLoadState('loading');
    try {
      const response = await fetch(sourceUrl);
      if (!response.ok) throw new Error('Source fetch returned ' + response.status);
      const parsed = parseChapters(await response.text());
      if (!parsed.length) throw new Error('No numbered chapters were found in this public draft.');
      setChapters(parsed);
      setSelectedId(parsed[0].id);
      setLoadState('loaded');
    } catch {
      setLoadState('failed');
      setMessage('The public draft could not be loaded. Open the source on GitHub, then try again.');
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

  async function copyHandoff() {
    if (!current) return;
    const prompt = [
      'I am studying the Nevora Codex v1.0 PUBLIC DRAFT (not a final release).',
      'Source: ' + sourcePageUrl,
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
        <p>Living Codex • reader prototype</p>
        <h2 id="living-codex-title">Read the words. Question the ideas. Explore the worlds.</h2>
      </div>
      <div className="living-boundary">
        <strong>Publication boundary</strong>
        <p>The public-edition manuscript is still under review. This preview reads only the existing public Volume I draft from GitHub. It does not publish the separate archival manuscripts, claim an approved release, connect to an AI, or launch a VR simulation.</p>
      </div>
      <div className="living-stage-grid" aria-label="Living Codex development status">
        <div><strong>01 • READ</strong><span>Chapter navigator • preview available</span></div>
        <div><strong>02 • LISTEN</strong><span>Browser narration • available where supported</span></div>
        <div><strong>03 • ASK VESSIE</strong><span>Read-only tutor integration • planned</span></div>
        <div><strong>04 • LEARN</strong><span>Source-grounded assessments • planned</span></div>
        <div><strong>05 • ENTER</strong><span>Temple / Forge / Lighthouse • concept only</span></div>
      </div>
      <div className="living-reader">
        <div className="living-reader-top">
          <div>
            <span className="volume-kicker">Volume I · public source draft</span>
            <h3>The Reading Room</h3>
            <p>Load the text directly from the public repository. No login, analytics, AI request, or private archive upload.</p>
          </div>
          <button type="button" className="living-primary" disabled={loadState === 'loading'} onClick={loadPublicDraft}>
            {loadState === 'loading' ? 'Loading…' : loadState === 'loaded' ? 'Reload public draft' : 'Open public draft'}
          </button>
        </div>
        {loadState === 'loaded' && (
          <div className="living-controls">
            <label htmlFor="living-chapter-select">Chapter</label>
            <select id="living-chapter-select" value={selectedId} onChange={(event) => selectChapter(event.target.value)}>
              {chapters.map((chapter) => (
                <option key={chapter.id} value={chapter.id}>Chapter {chapter.number}: {chapter.title}</option>
              ))}
            </select>
            <div className="living-speech-actions">
              <button type="button" disabled={!synthAvailable || !current} onClick={startReading}>Read aloud</button>
              <button type="button" disabled={speechState === 'stopped'} onClick={togglePause}>{speechState === 'paused' ? 'Resume' : 'Pause'}</button>
              <button type="button" disabled={speechState === 'stopped'} onClick={stopSpeech}>Stop</button>
            </div>
            {!synthAvailable && <p role="status">This browser does not provide speech synthesis. The text reader still works.</p>}
          </div>
        )}
        {current ? (
          <article className="living-manuscript">
            <div className="living-manuscript-meta">Chapter {current.number} · Public draft · Not release-approved</div>
            <h3>{current.title}</h3>
            {blocks.map((block, index) => {
              if (block.kind === 'heading') return <h4 key={index}>{block.text}</h4>;
              if (block.kind === 'list') return <ul key={index}>{block.items.map((item, j) => <li key={j}>{item}</li>)}</ul>;
              return <p key={index}>{block.text}</p>;
            })}
            <div className="living-source-line">
              <a href={sourcePageUrl} target="_blank" rel="noreferrer">View exact Markdown source on GitHub</a>
              <button type="button" onClick={copyHandoff}>Copy study prompt</button>
            </div>
          </article>
        ) : (
          <p className="living-empty">The book opens here. Select “Open public draft” to load the existing Chapter 1 and its neighboring chapters.</p>
        )}
        {message && <p className="living-feedback" role="status">{message}</p>}
        {clipboardMessage && <p className="living-feedback" role="status">{clipboardMessage}</p>}
      </div>
      <p className="living-footnote">
        Speech uses your browser's voices and may depend on the browser or operating system's speech service. The site does not upload audio; check your browser's voice privacy settings. Vessie Q&A, lesson tests, and virtual worlds are not active in this preview.
      </p>
    </section>
  );
}
