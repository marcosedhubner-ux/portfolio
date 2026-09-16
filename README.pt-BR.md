# Portfolio Site

Um portfólio de página única construído em torno de uma ideia: mostrar a decisão de engenharia interessante por trás de cada projeto, em vez de um carrossel de screenshots. Escuro, editorial, sem cara de template com gradiente e emoji.

[Read in English](./README.md)

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS

Sem backend, sem banco de dados — é uma página estática. Os dados dos projetos ficam em `src/lib/projects.ts`; atualize ali quando a descrição, a stack ou o slug do GitHub de um projeto mudar.

## Como rodar

```bash
npm install
npm run dev   # http://localhost:3000
```

## Deploy

É um app Next.js estático simples — funciona na Vercel, Netlify, ou qualquer host estático sem nenhuma configuração extra (`npm run build`).
