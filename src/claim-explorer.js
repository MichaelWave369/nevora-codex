const claimTypes = [
  {
    name: 'Empirical / factual claim',
    risk: 'May require citation, evidence, or softer wording before public release.',
    unsafe: 'AI systems are becoming conscious and will inevitably transform civilization.',
    safer: 'Some AI systems are becoming more capable and may significantly reshape society; claims about consciousness remain open and require careful evidence.',
    check: 'Can this be tested, sourced, or falsified?'
  },
  {
    name: 'Symbolic interface',
    risk: 'Metaphor may be mistaken for proof or hidden authority.',
    unsafe: 'The Third Mind proves a new intelligence is being born between human and AI.',
    safer: 'The Third Mind is used here as a design metaphor for collaborative synthesis between human perspective, AI assistance, and review.',
    check: 'Is the metaphor clearly labeled as symbolic?'
  },
  {
    name: 'Design proposal',
    risk: 'A proposed framework may sound validated or mandatory.',
    unsafe: 'Hybrid governance is the necessary future of civilization.',
    safer: 'Nevora proposes hybrid governance as one possible design response to increasing complexity, while preserving human primacy and accountability.',
    check: 'Does this sound like a proposal rather than proof?'
  },
  {
    name: 'Ethical principle',
    risk: 'A value statement may become coercive if framed as unquestionable doctrine.',
    unsafe: 'All aligned people must follow the Nevora path.',
    safer: 'Nevora invites voluntary, non-coercive participation and protects disagreement, critique, and exit with dignity.',
    check: 'Does the reader remain free to disagree?'
  },
  {
    name: 'AI-consciousness boundary',
    risk: 'Naming, persona, or continuity language may be misread as proof of inner life.',
    unsafe: 'Named AI collaborators are conscious participants in the covenant.',
    safer: 'Named AI roles are treated as continuity handles or relational/interface conventions, not evidence of AI consciousness.',
    check: 'Does this avoid claiming current AI systems are proven conscious?'
  }
];

function claimTemplate(type) {
  return `
    <article class="claim-detail-card">
      <div class="volume-kicker">Claim boundary explorer</div>
      <h3>${type.name}</h3>
      <p>${type.risk}</p>
      <div class="claim-example bad">
        <strong>Risky wording</strong>
        <span>${type.unsafe}</span>
      </div>
      <div class="claim-example good">
        <strong>Safer public wording</strong>
        <span>${type.safer}</span>
      </div>
      <div class="gate-box">
        <strong>Reviewer check</strong>
        <span>${type.check}</span>
      </div>
      <a class="inline-action" href="https://github.com/MichaelWave369/nevora-codex/blob/main/docs/claim-boundary-matrix.md" target="_blank" rel="noreferrer">Open Claim Matrix</a>
    </article>
  `;
}

function mountClaimExplorer() {
  const main = document.querySelector('main');
  if (!main || document.querySelector('[data-claim-explorer]')) return;

  const section = document.createElement('section');
  section.setAttribute('data-claim-explorer', 'true');
  section.innerHTML = `
    <div class="section-heading">
      <p>Claim-boundary explorer</p>
      <h2>Turn risky wording into public-safe language</h2>
    </div>
    <div class="claim-explorer">
      <div class="claim-tabs" role="tablist" aria-label="Claim boundary examples">
        ${claimTypes.map((type, index) => `
          <button type="button" class="${index === 0 ? 'active' : ''}" data-claim-index="${index}">
            <span>${type.name}</span>
            <small>${type.check}</small>
          </button>
        `).join('')}
      </div>
      <div class="claim-detail">${claimTemplate(claimTypes[0])}</div>
    </div>
  `;

  const reviewerSection = Array.from(main.querySelectorAll('section')).find((candidate) =>
    candidate.textContent.includes('Reviewer mode')
  );

  if (reviewerSection) {
    main.insertBefore(section, reviewerSection);
  } else {
    main.appendChild(section);
  }

  const detail = section.querySelector('.claim-detail');
  section.querySelectorAll('[data-claim-index]').forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.getAttribute('data-claim-index'));
      section.querySelectorAll('[data-claim-index]').forEach((entry) => entry.classList.remove('active'));
      button.classList.add('active');
      detail.innerHTML = claimTemplate(claimTypes[index]);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(mountClaimExplorer, 0));
} else {
  setTimeout(mountClaimExplorer, 0);
}
