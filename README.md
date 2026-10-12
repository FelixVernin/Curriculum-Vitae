
# Curriculum-Vitae — site

This repository contains a minimal, production-ready static portfolio site for Félix Vernin built with Astro + TypeScript and CSS.

Key points

- Framework: Astro (static), TypeScript.
- Output folder: `dist` (ready for Cloudflare Pages).
- Content source: `src/data/site.ts` (centralized, typed content for FR/EN).
- CV PDF: `public/CV_Felix_Vernin_EN.pdf` (source of truth for dates and wording).

Quick start (development)

```bash
cd Curriculum-Vitae
npm install
npm run dev
```

Build (production)

```bash
npm run build
```

Preview the built site locally (serves `dist`)

```bash
npm run preview
```

What I added/checked

- Centralized data in `src/data/site.ts` (contact, education, experiences, projects, skills, languages).
- FR and EN pages: `src/pages/index.astro` and `src/pages/en/index.astro`.
- Header and footer components (language switcher, contact links).
- Basic WCAG-friendly structure: skip link, semantic elements, focusable links.

Deployment to Cloudflare Pages

1. Push this repository to GitHub.
2. In Cloudflare Pages, create a new project and connect the GitHub repo.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. (Optional) Add a custom domain in Cloudflare and configure DNS.

QR code guidance

- Wait for the site to be deployed to a real URL before generating a QR code.
- When you have the production URL, use any QR generator and test on multiple phones. Leave a white margin around the code on the CV.

Checklist & next manual checks

- Verify the CV wording matches the PDF exactly where required.
- Confirm which project repos are public vs private; private repos should be omitted or not linked.
- Manually test keyboard navigation and focus order using `Tab`.
- Verify color contrast with a contrast checker.
- If desired, run Lighthouse on the deployed URL for final performance/accessibility/SEO scores.

Files to edit for content

- `src/data/site.ts` — central place for all text, links and translations.

Notes about automation

- A small script attempted to extract text from the PDF but failed reliably; I used the CV content you pasted to populate the site.

