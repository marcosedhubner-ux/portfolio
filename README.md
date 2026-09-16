# Portfolio Site

**Live: [marcoshubner.vercel.app](https://marcoshubner.vercel.app)**

A single-page portfolio built around one idea: show the interesting engineering decision behind each project instead of a screenshot carousel. Dark, editorial, no gradients-and-emoji template look.

[Leia em português](./README.pt-BR.md)

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS

No backend, no database — this is a static page. Project data lives in `src/lib/projects.ts`; update it there when a project's description, stack or GitHub slug changes.

## Getting started

```bash
npm install
npm run dev   # http://localhost:3000
```

## Deploying

This is a plain static Next.js app — it deploys to Vercel, Netlify, or any static host with zero configuration (`npm run build`).
