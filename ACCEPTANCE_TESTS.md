# Acceptance Tests (8090 Refinery/Foundry)

This checklist is derived from **Success Metrics** and **Feature Requirements** (Filters Panel, Initiative List View, Initiative Detail Modal) fetched from the 8090 MCP (Refinery/Foundry).

---

## How to run the app

```bash
npm install
npm run dev
```

Open **http://localhost:5173** (or the URL Vite prints). No login or installation required.

---

## How to run automated tests

```bash
npm run test
```

Runs Vitest against filter logic, RAG indicator, Initiative List View, and Initiative Detail Modal.

---

## Success Metrics (PRD)

| Criterion | How to verify |
|-----------|----------------|
| Access roadmap in under 30 seconds, no install/login | Open app URL in browser; no auth or install step. |
| Locate a specific initiative within 3 clicks | Open app → use filters or scroll list → click initiative (≤3 actions). |
| No formal training for first-time users | UI has clear labels: Filters, list columns, modal fields. |
| Application loads and renders full roadmap in under 3 seconds | Reload page; list and filters appear quickly (manual). |
| Filter by workstream, business unit, or cloud provider | Use Filters Panel: Cloud provider, RAG status, Workstream (manual). |
| Simple filtering and sorting | Filters Panel + sortable column headers (manual + automated). |

---

## Filters Panel (REQ-FP-*)

| ID | Acceptance criterion | Automated | Manual |
|----|----------------------|-----------|--------|
| AC-FP-001.1 | Filters Panel shows controls for cloud provider, RAG status, workstream | — | Sidebar has three filter sections. |
| AC-FP-001.2 | Each filter shows options based on the dataset | — | Only providers/RAG/workstreams present in data appear. |
| AC-FP-002.1 | Selecting cloud provider(s) updates list to matching initiatives | ✓ filterLogic | Apply filter; list updates. |
| AC-FP-002.2 | Multiple providers = OR logic | ✓ filterLogic | Select AWS + Azure; see both. |
| AC-FP-003.1 | Selecting RAG status(es) updates list | ✓ filterLogic | Select Green; only Green. |
| AC-FP-003.2 | Multiple RAG = OR logic | ✓ filterLogic | Select Red + Amber; see both. |
| AC-FP-004.1 | Selecting workstream(s) updates list | ✓ filterLogic | Select Infrastructure; only that workstream. |
| AC-FP-004.2 | Multiple workstreams = OR logic | ✓ filterLogic | Select two workstreams; see both. |
| AC-FP-005.1 | "Clear All Filters" when filters applied | — | Apply any filter; "Clear all" appears. |
| AC-FP-005.2 | Clear All removes all filters and shows all initiatives | — | Click Clear all; list shows all. |
| AC-FP-005.3 | Clear All hidden/disabled when no filters | — | No filters → no Clear all (or disabled). |
| AC-FP-006.1 | Multiple categories = AND logic | ✓ filterLogic | e.g. AWS + Green → only AWS and Green. |
| AC-FP-006.2 | Zero matches → "No initiatives match the selected filters" | ✓ InitiativeListView | Combine filters so none match; message shown. |
| AC-FP-006.3 | Show count of matching initiatives | — | Panel shows "X initiatives match". |

---

## Initiative List View (REQ-ILV-*)

| ID | Acceptance criterion | Automated | Manual |
|----|----------------------|-----------|--------|
| AC-ILV-001.1 | List displays all initiatives on load | ✓ | Load app; table has 5 sample initiatives. |
| AC-ILV-001.2 | Each row: name, owner, timeline, cloud provider, RAG, value | ✓ | Check table columns. |
| AC-ILV-001.3 | Pagination or virtual scroll when >20 items | — | Add >20 in `initiatives.json` to test. |
| AC-ILV-001.4 | No initiatives → "No initiatives to display" | ✓ | Empty data → message. |
| AC-ILV-002.1–002.5 | RAG: Red/Amber/Green/gray indicators | ✓ RAGStatusIndicator | Check list and modal. |
| AC-ILV-003.1 | Click row → Initiative Detail Modal opens | ✓ | Click row; modal with same initiative. |
| AC-ILV-003.2 | Hover shows row is clickable | — | Hover; cursor/visual change. |
| AC-ILV-003.3 | Keyboard: Tab to row, Enter to open | — | Tab to row; Enter opens modal. |
| AC-ILV-004.1 | Sort controls for name, owner, RAG, workstream, etc. | ✓ | Sortable column headers. |
| AC-ILV-004.2 | Click sort → ascending | — | Click header; order changes. |
| AC-ILV-004.3 | Click same sort again → descending | — | Click again; order toggles. |
| AC-ILV-004.4 | RAG sort: Red → Amber → Green (asc) | — | Sort by RAG; verify order. |

---

## Initiative Detail Modal (REQ-IDM-*)

| ID | Acceptance criterion | Automated | Manual |
|----|----------------------|-----------|--------|
| AC-IDM-001.1 | Select initiative → modal opens | ✓ (with list) | Click row; modal opens. |
| AC-IDM-001.2 | Modal shows name, description, dependencies, benefits, risks | ✓ | Modal content. |
| AC-IDM-001.3 | Modal shows owner, timeline, cloud, RAG, value, workstream | ✓ | All key fields in modal. |
| AC-IDM-001.4 | Empty field → "Not specified" or placeholder | — | Optional; we use "—" or omit. |
| AC-IDM-002.1 | Close button (X or "Close") | ✓ | Close button present. |
| AC-IDM-002.2 | Click close → modal closes | ✓ | Click close; modal gone. |
| AC-IDM-002.3 | Click outside modal → closes | — | Click overlay; modal closes. |
| AC-IDM-002.4 | Escape key → closes | — | Press Escape; modal closes. |
| AC-IDM-003.1 | Dependencies listed | — | Initiative with dependencies in data. |
| AC-IDM-004/005 | Benefits and risks sections | — | Check modal sections. |

---

## Summary

- **Automated:** `npm run test` covers filter logic (OR/AND), RAG indicator, list display/empty states, row click → modal, modal content and close button.
- **Manual:** Run `npm run dev`, open the app, and walk the checklist above for UX (hover, keyboard, Clear all, sort toggle, Escape, click outside).
- **Performance:** Manually confirm load time and “find initiative in 3 clicks” with real data.
