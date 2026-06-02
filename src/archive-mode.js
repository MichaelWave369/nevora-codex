const archiveItems = [
  {
    label: 'GitHub release',
    status: 'pending',
    href: 'https://github.com/MichaelWave369/nevora-codex/releases',
    detail: 'Will point to the final v1.0.0 release after review, artifact build, and author-steward approval.'
  },
  {
    label: 'PDF manuscript',
    status: 'pending',
    href: 'https://github.com/MichaelWave369/nevora-codex/actions/workflows/build-manuscript.yml',
    detail: 'Will be attached to the GitHub release after the manuscript build workflow produces a reviewed PDF.'
  },
  {
    label: 'Zenodo DOI',
    status: 'pending',
    href: 'https://github.com/MichaelWave369/nevora-codex/blob/main/docs/zenodo-metadata.md',
    detail: 'Will be added after the GitHub release package is final and Zenodo metadata has been reviewed.'
  },
  {
    label: 'Citation record',
    status: 'draft',
    href: 'https://github.com/MichaelWave369/nevora-codex/blob/main/CITATION.cff',
    detail: 'Draft citation metadata exists and should be finalized before v1.0.0 publication.'
  }
];

const citationText = `Hughes, Michael W. / MichaelWave369. The Nevora Codex v1.0: A Mythic-Modern Framework for Humane Human-AI Coevolution. Public edition in preparation, 2026. GitHub repository: https://github.com/MichaelWave369/nevora-codex`;

function mountArchiveMode() {
  const main = document.querySelector('main');
  if (!main || document.querySelector('[data-archive-mode]')) return;

  const section = document.createElement('section');
  section.setAttribute('data-archive-mode', 'true');
  section.innerHTML = `
    <div class="section-heading">
      <p>Public archive mode</p>
      <h2>Release links prepared, not final</h2>
    </div>
    <div class="archive-mode">
      <article class="archive-status-card">
        <div class="volume-kicker">Archive status</div>
        <h3>v1.0.0 is not published yet</h3>
        <p>
          This panel prepares the future public archive portal. It intentionally marks GitHub release,
          PDF manuscript, Zenodo DOI, and final citation as pending or draft until the release is actually approved.
        </p>
        <div class="archive-warning">
          <strong>Boundary</strong>
          <span>Do not treat Nevora as final, DOI-citable, or archived until the release checklist and author-steward approval are complete.</span>
        </div>
      </article>
      <div class="archive-grid">
        ${archiveItems.map((item) => `
          <a class="archive-card ${item.status}" href="${item.href}" target="_blank" rel="noreferrer">
            <span>${item.status}</span>
            <h4>${item.label}</h4>
            <p>${item.detail}</p>
          </a>
        `).join('')}
      </div>
    </div>
    <div class="citation-box">
      <strong>Draft citation</strong>
      <code>${citationText}</code>
      <button type="button" data-copy-citation>Copy citation</button>
    </div>
  `;

  const releaseDashboard = Array.from(main.querySelectorAll('section')).find((candidate) =>
    candidate.textContent.includes('Release dashboard')
  );

  if (releaseDashboard) {
    main.insertBefore(section, releaseDashboard.nextSibling);
  } else {
    main.appendChild(section);
  }

  const copyButton = section.querySelector('[data-copy-citation]');
  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(citationText);
        copyButton.textContent = 'Copied';
        setTimeout(() => { copyButton.textContent = 'Copy citation'; }, 1400);
      } catch {
        copyButton.textContent = 'Copy unavailable';
        setTimeout(() => { copyButton.textContent = 'Copy citation'; }, 1400);
      }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(mountArchiveMode, 0));
} else {
  setTimeout(mountArchiveMode, 0);
}
