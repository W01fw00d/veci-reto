# veci-reto

Grupo Viajes El Corte Inglés (VECI) frontend challenge,
set up as a monorepo with two independent implementations: Vanilla JS and React.

## Requirements

- Node.js 20.19+ (or 22.12+)
- npm

## Applications

| Application | Path           | Command               |
| ----------- | -------------- | --------------------- |
| Vanilla JS  | `apps/vanilla` | `npm run dev:vanilla` |
| React       | `apps/react`   | `npm run dev:react`   |

## Running this project

- Install dependencies from the root directory with `npm install`.
- To build production versions of both applications, run `npm run build`.
- Run `npm run lint` to lint both applications with Oxlint.
- Run `npm run test:components` to run the React component tests in Playwright.

## About

`challenge-instructions.md` contains a copy of the requirements for this challenge.

`technical-decisions.md` contains an explanation of the main decisions taken while implementing this project.
