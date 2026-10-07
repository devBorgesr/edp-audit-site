# EDP Retrieval Quality Audit — landing page

An isolated, static React + Vite + TypeScript landing page for the EDP Retrieval Quality Audit. It does not import or modify the EDP engine.

## Run locally

Use Node.js 20.19+ or 22.12+ and npm.

```bash
cd edp-audit-site
npm ci
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173/`.

## Production build

```bash
npm run build
npm run preview
```

`npm run build` type-checks the TypeScript source and writes the static site to `dist/`. `npm run preview` serves that exact build, normally at `http://localhost:4173/`.

## Fit check form

The submit behavior is isolated in `src/fitCheck.ts`.

- By default, the form displays a prominent preview notice and its button reads "Download Fit Check Draft". It downloads a text draft to the visitor's device and states that nothing was sent.
- To connect a backend, copy `.env.example` to `.env.local` and set `VITE_FIT_CHECK_ENDPOINT` to an HTTPS endpoint. The form sends a JSON `POST` with the fields in `FitCheckRequest`, expects a 2xx response, and only then shows a sent confirmation.
- The endpoint must permit the site's origin via CORS and handle server-side validation, spam protection, delivery, storage, and retention. Do not put keys or tokens in any `VITE_` variable: those variables are embedded in public frontend code.
- Update the privacy text and test the full request flow before public launch.

## Deployment, when approved

This is a single-route static site. Use `npm ci` as installation, `npm run build` as the build command, and `dist/` as the publish directory on a static host such as Cloudflare Pages, Netlify, or Vercel. Configure the fit check endpoint for the target domain before publication if direct submissions are required. No server runtime or rewrite rule is needed for this route.

The page has no trackers, no frontend secrets, and no remote runtime dependencies. The comparison dashboard contains illustrative demo values only.

## Structure

```text
edp-audit-site/
├── index.html             SEO and Open Graph metadata
├── public/favicon.svg     EDP mark
├── src/App.tsx            page, dashboard, and form UI
├── src/fitCheck.ts        isolated submission integration
├── src/main.tsx           React entry
├── src/styles.css         responsive styles
├── .github/workflows/      push / PR production build check
├── .env.example           optional endpoint configuration
└── package.json           scripts and dependencies
```
