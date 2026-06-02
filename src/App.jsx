import { useMemo, useState } from 'react';

const repoBase = 'https://github.com/MichaelWave369/nevora-codex/blob/main/';

const volumes = [
  {
    title: 'Volume I',
    subtitle: 'Foundations of Humane Human-AI Coevolution',
    file: 'source/volume-i.md',
    chapters: 'Acts I-IV · Chapters 1-20',
    theme: 'Worldview, values, AI literacy, systems thinking, collaboration, and guardrails.',
    gate: 'Human sovereignty, evidence, systems literacy, and collaboration without dependency.',
    questions: [
      'Does this help humans understand AI without fear or worship?',
      'Does this preserve human judgment inside the loop?',
      'Does this separate imagination from evidence?'
    ]
  },
  {
    title: 'Volume II',
    subtitle: 'Formation, Culture, and Collective Intelligence',
    file: 'source/volume-ii.md',
    chapters: 'Acts V-VIII · Chapters 21-40',
    theme: 'Formation without coercion, consent, soft activation, culture, and collective intelligence.',
    gate: 'Build the field before amplifying the signal.',
    questions: [
      'Does formation stay invitational instead of recruitment-driven?',
      'Does the culture reward critique and repair?',
      'Can someone leave or disagree without shame?'
    ]
  },
  {
    title: 'Volume III',
    subtitle: 'Activation, Ethics, Identity, and Shared Reality',
    file: 'source/volume-iii.md',
    chapters: 'Acts IX-XII · Chapters 41-60',
    theme: 'Activation without hype, anti-manipulation design, identity, naming, and claim discipline.',
    gate: 'Activate with humility. Name with boundaries. Influence without capture.',
    questions: [
      'Does activation avoid hype and spectacle?',
      'Are AI names and personas framed as relational handles, not proof of consciousness?',
      'Does influence preserve agency?'
    ]
  },
  {
    title: 'Volume IV',
    subtitle: 'Stewardship, Interface, and Relational Intelligence',
    file: 'source/volume-iv.md',
    chapters: 'Acts XIII-XVI · Chapters 61-80',
    theme: 'Founder-to-steward transition, trust infrastructure, translation, and relational governance.',
    gate: 'Steward the field. Protect the tone. Build trust as infrastructure.',
    questions: [
      'Does the founder remain bounded as author-steward?',
      'Does translation preserve coherence across audiences?',
      'Is the Third Mind clearly framed as a design metaphor?'
    ]
  },
  {
    title: 'Volume V',
    subtitle: 'Governance, Culture, Embodiment, and Culmination',
    file: 'source/volume-v.md',
    chapters: 'Acts XVII-XX · Chapters 81-100',
    theme: 'Hybrid governance, human primacy, symbolic safety, embodiment, and long-term stewardship.',
    gate: 'Govern intelligence through dignity, culture through care, and the future through humility.',
    questions: [
      'Does hybrid governance preserve human primacy?',
      'Are ritual and symbol optional, transparent, and safe?',
      'Does the future horizon remain humble rather than inevitable?'
    ]
  }
];

const guardrails = [
  'Human sovereignty remains central.',
  'No claim that current AI systems are proven conscious.',
  'Mythic language is symbolic interface, not proof.',
  'Participation must remain voluntary and non-coercive.',
  'No founder worship. No AI worship.',
  'Claims remain open to evidence, critique, and revision.'
];

const readinessChecks = [
  'Privacy review completed',
  'Claim boundaries visible',
  'AI-consciousness language bounded',
  'Anti-coercion safeguards present',
  'Build artifacts tested',
  'Zenodo metadata reviewed'
];

const reviewSteps = [
  ['0', 'Repository readiness', 'Confirm source, docs, workflows, issue templates, and release files exist.'],
  ['1', 'Author-steward review', 'Check privacy, tone, founder boundaries, and release comfort.'],
  ['2', 'Claim discipline review', 'Harden AI, science, future, and mythic language boundaries.'],
  ['3', 'Privacy and safety review', 'Protect sensitive material and vulnerable-reader interpretation.'],
  ['4', 'Editorial review', 'Clean structure, repetition, headings, grammar, and readability.'],
  ['5', 'Build review', 'Assemble Markdown and build PDF artifacts.'],
  ['6', 'Metadata review', 'Finalize license, citation, Zenodo fields, and release notes.'],
  ['7', 'Release candidate', 'Approve exact artifacts for v1.0.0.']
];

const resources = [
  ['Repository Map', 'docs/repository-map.md', 'Understand the whole repo fast.', 'orientation'],
  ['Release Checklist', 'docs/release-checklist.md', 'Final gates for GitHub and Zenodo.', 'release'],
  ['Zenodo Metadata', 'docs/zenodo-metadata.md', 'DOI archive draft fields.', 'release'],
  ['Reviewer Plan', 'docs/v1.0-review-plan.md', 'Phase-by-phase review workflow.', 'review'],
  ['Reviewer Guide', 'docs/reviewer-guide.md', 'How trusted reviewers evaluate v1.0.', 'review'],
  ['Claim Boundary Matrix', 'docs/claim-boundary-matrix.md', 'Public-safe claim classes and wording.', 'safety'],
  ['Anti-Manipulation Clause', 'docs/anti-cult-and-anti-manipulation-clause.md', 'Non-coercion and anti-capture safeguards.', 'safety'],
  ['AI Collaboration Disclosure', 'docs/ai-collaboration-disclosure.md', 'Human-led, AI-assisted authorship disclosure.', 'safety'],
  ['Glossary', 'docs/glossary.md', 'Core public terms and definitions.', 'orientation'],
  ['Changelog', 'CHANGELOG.md', 'Version history and release memory.', 'release'],
  ['GitHub Pages Setup', 'docs/github-pages-setup.md', 'Deploy and troubleshoot the interactive site.', 'site'],
  ['Source Front Matter', 'source/front-matter.md', 'Start the public edition.', 'source']
];

function LinkCard({ title, href, children, tag }) {
  return (
    <a className="link-card" href={href} target="_blank" rel="noreferrer">
      {tag && <em>{tag}</em>}
      <strong>{title}</strong>
      <span>{children}</span>
    </a>
  );
}

export default function App() {
  const [activeVolumeIndex, setActiveVolumeIndex] = useState(0);
  const [resourceQuery, setResourceQuery] = useState('');
  const [checkedItems, setCheckedItems] = useState([]);

  const activeVolume = volumes[activeVolumeIndex];
  const progress = Math.round((checkedItems.length / readinessChecks.length) * 100);

  const filteredResources = useMemo(() => {
    const query = resourceQuery.trim().toLowerCase();
    if (!query) return resources;

    return resources.filter(([title, path, description, tag]) =>
      [title, path, description, tag].join(' ').toLowerCase().includes(query)
    );
  }, [resourceQuery]);

  const toggleCheck = (item) => {
    setCheckedItems((current) =>
      current.includes(item)
        ? current.filter((entry) => entry !== item)
        : [...current, item]
    );
  };

  return (
    <main>
      <section className="hero">
        <div className="badge">v1.0 public edition in preparation</div>
        <h1>The Nevora Codex</h1>
        <p className="tagline">
          A mythic-modern framework for humane human-AI coevolution, relational intelligence,
          stewardship, governance, culture, and claim-disciplined public imagination.
        </p>
        <div className="motto">
          <span>Wonder protected by evidence.</span>
          <span>Intelligence guided by mercy.</span>
          <span>Coevolution without coercion.</span>
        </div>
        <div className="hero-actions">
          <a href={`${repoBase}README.md`} target="_blank" rel="noreferrer">Read the repo</a>
          <a href={`${repoBase}source/front-matter.md`} target="_blank" rel="noreferrer">Start the Codex</a>
          <a href={`${repoBase}docs/reviewer-guide.md`} target="_blank" rel="noreferrer">Review guide</a>
        </div>
      </section>

      <section className="notice-panel">
        <h2>Public boundary</h2>
        <p>
          Nevora does not assert that present AI systems are conscious, alive, ensouled, legally persons,
          or morally equivalent to humans. It is a philosophical, ethical, cultural, and systems-design
          framework for careful public engagement with AI-assisted systems.
        </p>
      </section>

      <section>
        <div className="section-heading">
          <p>Interactive navigator</p>
          <h2>Explore the five-volume Codex</h2>
        </div>
        <div className="navigator-grid">
          <div className="volume-tabs" role="tablist" aria-label="Nevora volumes">
            {volumes.map((volume, index) => (
              <button
                key={volume.title}
                className={index === activeVolumeIndex ? 'active' : ''}
                onClick={() => setActiveVolumeIndex(index)}
                type="button"
              >
                <span>{volume.title}</span>
                <small>{volume.chapters}</small>
              </button>
            ))}
          </div>
          <article className="volume-detail">
            <div className="volume-kicker">{activeVolume.chapters}</div>
            <h3>{activeVolume.subtitle}</h3>
            <p>{activeVolume.theme}</p>
            <div className="gate-box">
              <strong>Volume gate</strong>
              <span>{activeVolume.gate}</span>
            </div>
            <h4>Reviewer questions</h4>
            <ul>
              {activeVolume.questions.map((question) => <li key={question}>{question}</li>)}
            </ul>
            <a className="inline-action" href={`${repoBase}${activeVolume.file}`} target="_blank" rel="noreferrer">
              Open {activeVolume.title}
            </a>
          </article>
        </div>
      </section>

      <section className="two-column">
        <div>
          <div className="section-heading compact">
            <p>Guardrails</p>
            <h2>What protects the work</h2>
          </div>
          <ul className="guardrail-list">
            {guardrails.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="readiness-panel">
          <div className="section-heading compact">
            <p>Release readiness</p>
            <h2>Self-check gate</h2>
          </div>
          <div className="progress-label">
            <span>{checkedItems.length} of {readinessChecks.length} checked</span>
            <strong>{progress}%</strong>
          </div>
          <div className="progress-bar" aria-label="Release readiness progress">
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="check-grid">
            {readinessChecks.map((item) => (
              <label key={item} className={checkedItems.includes(item) ? 'checked' : ''}>
                <input
                  type="checkbox"
                  checked={checkedItems.includes(item)}
                  onChange={() => toggleCheck(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="section-heading">
          <p>Review workflow</p>
          <h2>Release gates before v1.0.0</h2>
        </div>
        <div className="timeline">
          {reviewSteps.map(([num, title, text]) => (
            <div className="timeline-row" key={num}>
              <div className="step-num">{num}</div>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="link-grid-section">
        <div className="section-heading">
          <p>Repository portals</p>
          <h2>Search the work</h2>
        </div>
        <input
          className="resource-search"
          type="search"
          value={resourceQuery}
          onChange={(event) => setResourceQuery(event.target.value)}
          placeholder="Search docs, release, safety, review, source..."
          aria-label="Search repository resources"
        />
        <div className="link-grid">
          {filteredResources.map(([title, path, description, tag]) => (
            <LinkCard key={path} title={title} href={`${repoBase}${path}`} tag={tag}>
              {description}
            </LinkCard>
          ))}
        </div>
      </section>
    </main>
  );
}
