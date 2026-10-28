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

| App        | Development Server    | Component Tests                                             | End-to-End Tests                                     |
| ---------- | --------------------- | ----------------------------------------------------------- | ---------------------------------------------------- |
| React      | `npm run dev:react`   | `npm run test-components --workspace @veci-reto/react`      | `npm run test-e2e --workspace @veci-reto/react`     |
| Vanilla JS | `npm run dev:vanilla` | `npm run test-components --workspace @veci-reto/vanilla`    | `npm run test-e2e --workspace @veci-reto/vanilla`   |

The shared end-to-end scenarios in `tests/e2e/App.spec.js` run against both implementations.
Run all tests for either app with `npm run test:react` or `npm run test:vanilla`.

## About

`challenge-instructions.md` contains a copy of the requirements for this challenge.

`technical-decisions.md` contains an explanation of the main decisions taken while implementing this project.
