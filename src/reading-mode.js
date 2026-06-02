const readingUnits = [
  {
    id: 'front-matter',
    title: 'Begin here',
    subtitle: 'Front Matter',
    file: 'source/front-matter.md',
    detail: 'Public-safe title, abstract, opening boundary, and first orientation gate.'
  },
  {
    id: 'toc',
    title: 'Map the journey',
    subtitle: 'Table of Contents',
    file: 'source/table-of-contents.md',
    detail: 'The full five-volume, 100-chapter public-edition structure.'
  },
  {
    id: 'volume-i',
    title: 'Read Volume I',
    subtitle: 'Foundations',
    file: 'source/volume-i.md',
    detail: 'Human sovereignty, evidence, AI literacy, systems thinking, and guardrails.'
  },
  {
    id: 'volume-ii',
    title: 'Read Volume II',
    subtitle: 'Formation',
    file: 'source/volume-ii.md',
    detail: 'Culture, consent, invitation, distributed stewardship, and collective intelligence.'
  },
  {
    id: 'volume-iii',
    title: 'Read Volume III',
    subtitle: 'Activation',
    file: 'source/volume-iii.md',
    detail: 'Ethics under complexity, anti-manipulation, identity, naming, and shared reality.'
  },
  {
    id: 'volume-iv',
    title: 'Read Volume IV',
    subtitle: 'Stewardship',
    file: 'source/volume-iv.md',
    detail: 'Trust infrastructure, civilization interface, relational governance, and Third Mind boundaries.'
  },
  {
    id: 'volume-v',
    title: 'Read Volume V',
    subtitle: 'Culmination',
    file: 'source/volume-v.md',
    detail: 'Hybrid governance, symbolic safety, embodiment, long-term stewardship, and closing invocation.'
  }
];

const storageKey = 'nevora-reading-progress-v1';

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || '[]');
  } catch {
    return [];
  }
}

function writeProgress(progress) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  } catch {
    // Local storage may be disabled. Reading mode still works without persistence.
  }
}

function renderReadingMode(section, progress) {
  const completed = readingUnits.filter((unit) => progress.includes(unit.id)).length;
  const percent = Math.round((completed / readingUnits.length) * 100);

  section.innerHTML = `
    <div class="section-heading">
      <p>Reading mode</p>
      <h2>Move through the Codex in order</h2>
    </div>
    <div class="reading-panel">
      <div class="reading-summary">
        <div class="volume-kicker">Local-only progress</div>
        <h3>${completed} of ${readingUnits.length} reading gates marked</h3>
        <p>
          This progress marker stays in your browser only. It does not create an account, send analytics,
          or track readers. It is just a quiet local helper for moving through the public edition.
        </p>
        <div class="progress-label"><span>Reading progress</span><strong>${percent}%</strong></div>
        <div class="progress-bar"><span style="width:${percent}%"></span></div>
        <button class="reading-reset" type="button">Reset local progress</button>
      </div>
      <div class="reading-list">
        ${readingUnits.map((unit, index) => {
          const done = progress.includes(unit.id);
          return `
            <article class="reading-card ${done ? 'done' : ''}">
              <div class="reading-index">${index + 1}</div>
              <div>
                <span>${unit.subtitle}</span>
                <h4>${unit.title}</h4>
                <p>${unit.detail}</p>
                <div class="reading-actions">
                  <a href="https://github.com/MichaelWave369/nevora-codex/blob/main/${unit.file}" target="_blank" rel="noreferrer">Open</a>
                  <button type="button" data-reading-id="${unit.id}">${done ? 'Mark unread' : 'Mark read'}</button>
                </div>
              </div>
            </article>
          `;
        }).join('')}
      </div>
    </div>
  `;

  section.querySelectorAll('[data-reading-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-reading-id');
      const current = readProgress();
      const next = current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id];
      writeProgress(next);
      renderReadingMode(section, next);
    });
  });

  const resetButton = section.querySelector('.reading-reset');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      writeProgress([]);
      renderReadingMode(section, []);
    });
  }
}

function mountReadingMode() {
  const main = document.querySelector('main');
  if (!main || document.querySelector('[data-reading-mode]')) return;

  const section = document.createElement('section');
  section.setAttribute('data-reading-mode', 'true');
  renderReadingMode(section, readProgress());

  const navigatorSection = Array.from(main.querySelectorAll('section')).find((candidate) =>
    candidate.textContent.includes('Interactive navigator')
  );

  if (navigatorSection) {
    main.insertBefore(section, navigatorSection);
  } else {
    main.appendChild(section);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(mountReadingMode, 0));
} else {
  setTimeout(mountReadingMode, 0);
}
