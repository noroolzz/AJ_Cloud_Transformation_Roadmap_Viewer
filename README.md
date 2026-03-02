# Cloud Transformation Roadmap Viewer

React 18 + TypeScript + Vite + Tailwind CSS application for viewing cloud transformation roadmaps.

## Setup

```bash
npm install
```

## Scripts

- **`npm run dev`** — Start dev server (open http://localhost:5173)
- **`npm run build`** — TypeScript check + production build
- **`npm run preview`** — Preview production build locally
- **`npm run test`** — Run acceptance tests (Vitest)
- **`npm run test:watch`** — Run tests in watch mode
- **`npm run lint`** — Run ESLint
- **`npm run format`** — Format with Prettier

See **ACCEPTANCE_TESTS.md** for the 8090 Refinery/Foundry acceptance checklist and how to verify behavior manually.

## Project structure

- `src/components/` — Shared UI (AppLayout, Navigation, FilterPanel, FilterSection, InitiativeRow, RAGStatusIndicator, SortableColumnHeader, InitiativeDetailModal)
- `src/features/` — Feature modules (initiative-list with InitiativeListView; landing)
- `src/hooks/` — Custom React hooks (useSorting)
- `src/contexts/` — React contexts (Initiatives, Filters, SelectedInitiative)
- `src/types/` — TypeScript types (Initiative, FilterState, RAGStatus, etc.)
- `src/utils/` — Utilities (filterLogic)
- `src/constants/` — Routes, storage keys
- `public/initiatives.json` — Static initiative data (v1)
- `src/index.css` — Global styles (Tailwind)
