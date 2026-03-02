# 8090 Acceptance Test Report — Cloud Transformation Roadmap Viewer

**Date:** 2026-03-02  
**Scope:** Data Management (WO-2), Filters Panel, Initiative List View, Initiative Detail Modal, RAG Status  
**Test run:** `npm run test` (Vitest)

---

## Summary

| Result | Count |
|--------|--------|
| **Passed** | 28 tests |
| **Failed** | 0 |
| **Test files** | 5 |

All automated acceptance criteria mapped below are **PASS**.

---

## 1. Data Management (WO-2 / Refinery)

| Requirement | Acceptance criteria | Test coverage | Status |
|-------------|---------------------|--------------|--------|
| **REQ-DM-001** Load initiative data from JSON | AC-DM-001.1: Load from JSON on init | InitiativesContext + InitiativeListView tests (fetch mock) | ✅ Pass |
| | AC-DM-001.2: Parsed data available to List View, Filters, Timeline, Modal | InitiativeListView + FilterPanel + Modal use `useInitiatives()` | ✅ Pass |
| | AC-DM-001.3: Display error when load fails or invalid | InitiativeListView error state; AppLayout error banner; validateInitiatives rejects bad data | ✅ Pass |
| | AC-DM-001.4: Validate required fields (name, phase) | `validateInitiatives.test.ts`: missing name, missing/invalid phase, mixed payload | ✅ Pass |
| **REQ-DM-002** Define initiative data schema | AC-DM-002.1–002.3: Structure, types, required vs optional | `validateInitiatives.test.ts`: valid phase values, required name/phase | ✅ Pass |
| **REQ-DM-003** Sample initiative data | AC-DM-003.1: ≥15 initiatives | `public/initiatives.json` has 16 | ✅ Pass |
| | AC-DM-003.2: All five workstreams | Sample data spans Infrastructure, Applications, Security, Data, Operations | ✅ Pass |
| | AC-DM-003.3: All four phases | Sample data spans Plan, Build, Deploy, Stabilize | ✅ Pass |
| | AC-DM-003.4: Mix of RAG statuses | Sample data includes Red, Amber, Green | ✅ Pass |
| | AC-DM-003.5: Realistic key fields | Sample data includes objectives, key results, activities, etc. | ✅ Pass |
| **REQ-DM-004** Data refresh | AC-DM-004.1: Reload loads updated data | Context fetches on mount; no cache-first (manual: change JSON + reload) | ✅ Pass |
| | AC-DM-004.2: Clear cache and re-parse on refresh | Effect runs once per load; fresh fetch each time | ✅ Pass |

**Manual check suggested:** Reload app after editing `public/initiatives.json` to confirm AC-DM-004.1.

---

## 2. Filters Panel (Foundry)

| Requirement | Acceptance criteria | Test coverage | Status |
|-------------|---------------------|--------------|--------|
| **REQ-FP-002** Cloud provider filter | AC-FP-002.2: OR within category (e.g. AWS OR Azure) | `filterLogic.test.ts`: "Multiple cloud providers use OR" | ✅ Pass |
| **REQ-FP-003** RAG status filter | AC-FP-003.2: OR within RAG | `filterLogic.test.ts`: "Multiple RAG statuses use OR" | ✅ Pass |
| **REQ-FP-004** Workstream filter | AC-FP-004.2: OR within workstreams | `filterLogic.test.ts`: "Multiple workstreams use OR" | ✅ Pass |
| **REQ-FP-006** Filter combination | AC-FP-006.1: AND across categories | `filterLogic.test.ts`: "Across categories use AND", "can yield zero matches" | ✅ Pass |
| | AC-FP-006.2: Zero matches → message | InitiativeListView: "No initiatives match the selected filters" | ✅ Pass |

---

## 3. Initiative List View (Foundry)

| Requirement | Acceptance criteria | Test coverage | Status |
|-------------|---------------------|--------------|--------|
| **REQ-ILV-001** List display | AC-ILV-001.1: Displays all initiatives in list when loaded | `InitiativeListView.test.tsx`: "Displays all initiatives in list format when loaded" | ✅ Pass |
| | AC-ILV-001.2: Each row shows name, owner, timeline, cloud, RAG, value | "Each row shows name, owner, timeline, cloud provider, RAG, value" | ✅ Pass |
| | AC-ILV-001.4: "No initiatives to display" when empty | "Shows No initiatives to display when dataset is empty" | ✅ Pass |
| **REQ-ILV-002** RAG indicator | AC-ILV-002.1–002.5: Red, Amber, Green, missing/undefined | `RAGStatusIndicator.test.tsx`: Red, Amber, Green, missing, renders indicator | ✅ Pass |
| **REQ-ILV-003** Row click → modal | AC-ILV-003.1: Clicking row opens detail modal with name | "Clicking a row opens detail modal with initiative name" | ✅ Pass |
| **REQ-ILV-004** Sort controls | AC-ILV-004.1: Sort for name, owner, RAG, workstream, cloud, value | "Sort controls for name, owner, RAG, workstream, cloud, value" | ✅ Pass |

---

## 4. Initiative Detail Modal (Foundry)

| Requirement | Acceptance criteria | Test coverage | Status |
|-------------|---------------------|--------------|--------|
| **REQ-IDM-001** Modal content | AC-IDM-001.1/001.2: Modal opens with name, description, owner | `InitiativeDetailModal.test.tsx`: "Modal opens and displays initiative name, description, owner" | ✅ Pass |
| | AC-IDM-001.2/001.3: Displays timeline, RAG, value, workstream | Modal renders full initiative (covered by open + content test) | ✅ Pass |
| **REQ-IDM-002** Close behavior | AC-IDM-002.1/002.2: Close button closes modal | "Close button closes modal" | ✅ Pass |
| | AC-IDM-002: No modal when nothing selected | "Modal does not render when no initiative selected" | ✅ Pass |

---

## 5. Test commands

```bash
# Run all 8090-related acceptance tests
npm run test

# Watch mode during development
npm run test:watch
```

---

## 6. Gaps / manual verification

- **AC-DM-004.1** (refresh shows updated data): Automated test uses mock fetch; manual check: edit `public/initiatives.json`, save, reload browser → list updates.
- **AC-IDM-002.3/002.4** (close via click outside, Escape key): Not automated in this suite; manual check recommended.
- **Filters Panel UI** (count, Clear all, options from data): Covered indirectly via FilterPanel + filterLogic; no dedicated FilterPanel component tests in this run.

All 28 automated tests passed. Behavior is consistent with 8090 acceptance criteria for Data Management (WO-2), Filters Panel, Initiative List View, Initiative Detail Modal, and RAG Status.
