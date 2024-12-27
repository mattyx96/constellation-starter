# Constellation react starter template

Typescript based architecture for building enterprise frontend applications

### Features:

- Clean/Hexagonal architecture to separate business logic from presentation logic enhancing testability and scalability
- Sliced modular structure
- Flux inspired unidirectional data-flow to improve predictability

### Included:

- [x] Typescript
- [x] React (vite + react swc)
- [x] TailwindCSS
- [x] [Nebula UI Library](https://nebula.irongalaxy.space/)
- [x] Eslint v9
- [x] Prettier
- [x] Husky pre-commit hooks

### Roadmap:

- [ ] Vitest
- [ ] Playwright
- [ ] BDD with cucumber js

## Getting started:

Clone the repository

```bash
pnpm install
```

```bash
pnpm dev
```

the frontend directory is the view layer, the core directory is the business logic layer

To build the project for deployment:

```bash
pnpm build
```
