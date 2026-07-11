# Hayato Seki's Portfolio

This is the source code for Hayato Seki's personal portfolio website.

## Description

A personal portfolio website built with Next.js and TypeScript to showcase Hayato Seki's skills, experience, and projects.

## Author

*   **Hayato Seki** - [hayato0219](https://github.com/hayato0219)

## Technologies Used

*   [Next.js](https://nextjs.org/) - React framework for building server-side rendered and static websites.
*   [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
*   [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
*   [ESLint](https://eslint.org/) - A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
*   [Prettier](https://prettier.io/) - An opinionated code formatter.

## Getting Started

1.  Clone the repository:
    ```bash
    git clone https://github.com/hayato0219/portfolio.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

The chatbot calls the Gemini API through a server-side route (`/api/chat`) so the
key is never exposed to the browser. Set the following (in `.env.local` for local
development, and in the Vercel project settings for production):

```bash
# Server-side only — do NOT prefix with NEXT_PUBLIC_
GEMINI_API_KEY=your_gemini_api_key_here

# Optional — Gemini model to use (defaults to gemini-2.5-flash)
GEMINI_MODEL=gemini-2.5-flash
```

> Note: `GEMINI_API_KEY` replaces the previous `NEXT_PUBLIC_GEMINI_API_KEY`, which
> shipped the key to the client. Update the variable name in Vercel after deploying.

## Deployment

The website is deployed on Vercel.