const releasePhases = [
  {
    phase: 'Source architecture',
    status: 'complete',
    detail: 'Five volumes, front matter, table of contents, appendices, and assembly order are in place.'
  },
  {
    phase: 'Review infrastructure',
    status: 'complete',
    detail: 'Reviewer guide, review plan, issue templates, code of conduct, and safety reporting are ready.'
  },
  {
    phase: 'Interactive site',
    status: 'active',
    detail: 'Public orientation, volume navigator, reviewer mode, and claim-boundary explorer are live.'
  },
  {
    phase: 'Manuscript review',
    status: 'next',
    detail: 'Privacy, claim discipline, safety, editorial, build, and metadata reviews should be completed.'
  },
  {
    phase: 'Release candidate',
    status: 'pending',
    detail: 'Generate Markdown/PDF artifacts, inspect them, and prepare a v1.0.0 release candidate.'
  },
  {
    phase: 'GitHub + Zenodo release',
    status: 'pending',
    detail: 'Publish GitHub release, then prepare Zenodo DOI package after final author-steward approval.'
  }
];

const releaseLinks = [
  ['Release Checklist', 'docs/release-checklist.md'],
  ['Review Plan', 'docs/v1.0-review-plan.md'],
  ['Release Notes Draft', 'docs/release-notes-v1.0-draft.md'],
  ['Zenodo Metadata', 'docs/zenodo-metadata.md'],
  ['PDF Build Guide', 'docs/pdf-build-guide.md'],
  ['Changelog', 'CHANGELOG.md']
];

function statusLabel(status) {
  if (status === 'complete') return 'Complete';
  if (status === 'active') return 'Active';
  if (status === 'next') return 'Next gate';
  return 'Pending';
}

function mountReleaseDashboard() {
  const main = document.querySelector('main');
  if (!main || document.querySelector('[data-release-dashboard]')) return;

  const section = document.createElement('section');
  section.setAttribute('data-release-dashboard', 'true');
  section.innerHTML = `
    <div class="section-heading">
      <p>Release dashboard</p>
      <h2>v1.0.0 readiness map</h2>
    </div>
    <div class="release-dashboard">
      <div class="release-status-card">
        <div class="volume-kicker">Current gate</div>
        <h3>Public-prep complete. Structured review is next.</h3>
        <p>
          Nevora has a public manuscript scaffold, safety spine, build path, review workflow, and interactive site.
          The next real release gate is not more expansion — it is review, correction, artifact build, and author-steward approval.
        </p>
        <div class="release-metrics" aria-label="Release readiness summary">
          <div><strong>5</strong><span>Volumes</span></div>
          <div><strong>100</strong><span>Chapters</span></div>
          <div><strong>7</strong><span>Review phases</span></div>
          <div><strong>0</strong><span>Final DOI yet</span></div>
        </div>
      </div>
      <div class="release-phase-list">
        ${releasePhases.map((item) => `
          <article class="release-phase ${item.status}">
            <span>${statusLabel(item.status)}</span>
            <h4>${item.phase}</h4>
            <p>${item.detail}</p>
          </article>
        `).join('')}
      </div>
    </div>
    <div class="release-link-row">
      ${releaseLinks.map(([title, path]) => `
        <a href="https://github.com/MichaelWave369/nevora-codex/blob/main/${path}" target="_blank" rel="noreferrer">${title}</a>
      `).join('')}
    </div>
  `;

  const resourceSection = Array.from(main.querySelectorAll('section')).find((candidate) =>
    candidate.textContent.includes('Repository portals')
  );

  if (resourceSection) {
    main.insertBefore(section, resourceSection);
  } else {
    main.appendChild(section);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(mountReleaseDashboard, 0));
} else {
  setTimeout(mountReleaseDashboard, 0);
}
