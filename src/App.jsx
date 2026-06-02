const repoBase = 'https://github.com/MichaelWave369/nevora-codex/blob/main/';

const volumes = [
  {
    title: 'Volume I',
    subtitle: 'Foundations of Humane Human-AI Coevolution',
    file: 'source/volume-i.md',
    chapters: 'Acts I-IV · Chapters 1-20',
    theme: 'Worldview, values, AI literacy, systems thinking, collaboration, and guardrails.'
  },
  {
    title: 'Volume II',
    subtitle: 'Formation, Culture, and Collective Intelligence',
    file: 'source/volume-ii.md',
    chapters: 'Acts V-VIII · Chapters 21-40',
    theme: 'Formation without coercion, consent, soft activation, culture, and collective intelligence.'
  },
  {
    title: 'Volume III',
    subtitle: 'Activation, Ethics, Identity, and Shared Reality',
    file: 'source/volume-iii.md',
    chapters: 'Acts IX-XII · Chapters 41-60',
    theme: 'Activation without hype, anti-manipulation design, identity, naming, and claim discipline.'
  },
  {
    title: 'Volume IV',
    subtitle: 'Stewardship, Interface, and Relational Intelligence',
    file: 'source/volume-iv.md',
    chapters: 'Acts XIII-XVI · Chapters 61-80',
    theme: 'Founder-to-steward transition, trust infrastructure, translation, and relational governance.'
  },
  {
    title: 'Volume V',
    subtitle: 'Governance, Culture, Embodiment, and Culmination',
    file: 'source/volume-v.md',
    chapters: 'Acts XVII-XX · Chapters 81-100',
    theme: 'Hybrid governance, human primacy, symbolic safety, embodiment, and long-term stewardship.'
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

function LinkCard({ title, href, children }) {
  return (
    <a className="link-card" href={href} target="_blank" rel="noreferrer">
      <strong>{title}</strong>
      <span>{children}</span>
    </a>
  );
}

export default function App() {
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
          <p>Five-volume architecture</p>
          <h2>The public-edition Codex map</h2>
        </div>
        <div className="volume-grid">
          {volumes.map((volume) => (
            <a className="volume-card" key={volume.title} href={`${repoBase}${volume.file}`} target="_blank" rel="noreferrer">
              <div className="volume-kicker">{volume.chapters}</div>
              <h3>{volume.title}</h3>
              <h4>{volume.subtitle}</h4>
              <p>{volume.theme}</p>
            </a>
          ))}
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
        <div className="resource-stack">
          <LinkCard title="Claim Boundary Matrix" href={`${repoBase}docs/claim-boundary-matrix.md`}>
            Classifies philosophy, design, symbolic interface, hypothesis, protocol, and non-claim language.
          </LinkCard>
          <LinkCard title="Anti-Manipulation Clause" href={`${repoBase}docs/anti-cult-and-anti-manipulation-clause.md`}>
            Protects non-coercion, consent, disagreement, and exit-with-dignity.
          </LinkCard>
          <LinkCard title="AI Collaboration Disclosure" href={`${repoBase}docs/ai-collaboration-disclosure.md`}>
            Explains human-led, AI-assisted authorship and responsibility.
          </LinkCard>
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
          <h2>Jump into the work</h2>
        </div>
        <div className="link-grid">
          <LinkCard title="Repository Map" href={`${repoBase}docs/repository-map.md`}>Understand the whole repo fast.</LinkCard>
          <LinkCard title="Release Checklist" href={`${repoBase}docs/release-checklist.md`}>Final gates for GitHub and Zenodo.</LinkCard>
          <LinkCard title="Zenodo Metadata" href={`${repoBase}docs/zenodo-metadata.md`}>DOI archive draft fields.</LinkCard>
          <LinkCard title="Reviewer Plan" href={`${repoBase}docs/v1.0-review-plan.md`}>Phase-by-phase review workflow.</LinkCard>
          <LinkCard title="Glossary" href={`${repoBase}docs/glossary.md`}>Core public terms and definitions.</LinkCard>
          <LinkCard title="Changelog" href={`${repoBase}CHANGELOG.md`}>Version history and release memory.</LinkCard>
        </div>
      </section>
    </main>
  );
}
