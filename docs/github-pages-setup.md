# GitHub Pages Setup

This guide explains how to enable and deploy the interactive Nevora Codex React site through GitHub Pages.

## Site purpose

The GitHub Pages site is a public-safe landing page for the Nevora Codex.

It provides:

- a clear project introduction;
- public claim-boundary notice;
- five-volume Codex map;
- core guardrails;
- review workflow timeline;
- quick links into the repository.

The site does **not** replace the manuscript. It is an orientation layer.

## Files used by the site

```text
index.html
vite.config.js
package.json
src/main.jsx
src/App.jsx
src/styles.css
.github/workflows/deploy-pages.yml
```

## Required repository setting

In the GitHub repository:

1. Open **Settings**.
2. Open **Pages**.
3. Under **Build and deployment**, set **Source** to:

```text
GitHub Actions
```

4. Save the setting.

## Deploy manually

After Pages is set to GitHub Actions:

1. Open the repository **Actions** tab.
2. Select:

```text
Deploy GitHub Pages
```

3. Click **Run workflow**.
4. Choose the `main` branch.
5. Run the workflow.

## Expected site URL

After deployment, the site should be available at:

```text
https://michaelwave369.github.io/nevora-codex/
```

## Local development

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

Build locally:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

## Important Vite setting

The file `vite.config.js` sets the base path:

```js
base: '/nevora-codex/'
```

This is required because the GitHub Pages site is hosted under the repository path, not the domain root.

Without this setting, the deployed page may load blank or fail to load JavaScript/CSS assets.

## Public-safety requirements

Before deploying major site changes, confirm:

- [ ] the site does not claim AI consciousness;
- [ ] the site does not present mythic language as proof;
- [ ] the site preserves human sovereignty and non-coercion;
- [ ] the site links to the claim-boundary matrix;
- [ ] the site links to the anti-manipulation clause;
- [ ] the site describes Nevora as a framework, not doctrine;
- [ ] the site does not include private founder material.

## Troubleshooting

### Page is blank

Check:

- `vite.config.js` includes `base: '/nevora-codex/'`;
- the workflow completed successfully;
- Pages source is set to GitHub Actions;
- browser cache is cleared.

### Workflow fails during npm install

Check:

- `package.json` is valid JSON;
- Node version in the workflow is available;
- dependencies are spelled correctly.

### Workflow builds but site does not update

Check:

- Pages deployment completed after the build job;
- GitHub Pages environment is enabled;
- you are visiting the correct URL.

## Closing note

The site should stay simple, clear, and public-safe.

Its job is to help readers enter the Codex without confusion, overclaiming, or coercive framing.
