# veci-reto

Grupo Viajes El Corte Inglés (VECI) frontend challenge,
set up as a monorepo with two independent implementations: Vanilla JS and React.

## Requirements

- Node.js 20.19+ (or 22.12+)
- npm

## Running this project

On root:

- Install dependencies from the root directory with `npm install`.
- To build production versions of both apps, run `npm run build`.
- Run `npm run lint` to lint both apps with Oxlint.

| App        | Development Server    | Component Tests                 | End-to-End Tests         |
| ---------- | --------------------- | ------------------------------- | ------------------------ |
| React      | `npm run dev:react`   | `npm run test-components:react` | `npm run test-e2e:react` |
| Vanilla JS | `npm run dev:vanilla` | (none)                          | (none)                   |

---

On `apps/react`:

- run `npm run check-types` to check types.

## About

`challenge-instructions.md` contains a copy of the requirements for this challenge.

`technical-decisions.md` contains an explanation of the main decisions taken while implementing this project.
