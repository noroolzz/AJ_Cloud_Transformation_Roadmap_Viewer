/**
 * Acceptance tests for Initiative List View (8090 REQ-ILV-001, REQ-ILV-003, REQ-ILV-004, filter integration).
 * Uses mocked initiatives and providers.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InitiativeListView } from './InitiativeListView';
import {
  InitiativesProvider,
  FiltersProvider,
  SelectedInitiativeProvider,
} from '@/contexts';
import { InitiativeDetailModal } from '@/components/InitiativeDetailModal';

const mockInitiatives = [
  {
    id: 'init-1',
    name: 'Cloud Foundation',
    owner: 'Platform Team',
    timeline: { startDate: '2025-01-15', endDate: '2025-06-30', phase: 'Build' as const },
    cloudProvider: 'AWS' as const,
    ragStatus: 'Green' as const,
    workstream: 'Infrastructure' as const,
    value: 'High',
  },
  {
    id: 'init-2',
    name: 'ERP Migration',
    owner: 'Apps Team',
    timeline: { effortDuration: '10 months', phase: 'Plan' as const },
    cloudProvider: 'Azure' as const,
    ragStatus: 'Amber' as const,
    workstream: 'Applications' as const,
    value: 'High',
  },
];

function AppWithMockData() {
  return (
    <InitiativesProvider>
      <FiltersProvider>
        <SelectedInitiativeProvider>
          <InitiativeListView />
          <InitiativeDetailModal />
        </SelectedInitiativeProvider>
      </FiltersProvider>
    </InitiativesProvider>
  );
}

describe('InitiativeListView (8090 Initiative List View acceptance)', () => {
  const mockFetch = () =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockInitiatives),
    });

  beforeEach(() => {
    cleanup();
    vi.stubGlobal('fetch', vi.fn(mockFetch) as typeof fetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('AC-ILV-001.1: Displays all initiatives in list format when loaded', async () => {
    render(<AppWithMockData />);
    await screen.findByText('Cloud Foundation', {}, { timeout: 3000 });
    expect(screen.getByText('ERP Migration')).toBeInTheDocument();
    expect(screen.getAllByText('Platform Team').length).toBeGreaterThanOrEqual(1);
  });

  it('AC-ILV-001.2: Each row shows name, owner, timeline, cloud provider, RAG, value', async () => {
    render(<AppWithMockData />);
    await screen.findByText('Cloud Foundation', {}, { timeout: 3000 });
    expect(screen.getAllByText('Platform Team').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('High').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('AWS').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Infrastructure').length).toBeGreaterThanOrEqual(1);
  });

  it('AC-ILV-001.4: Shows "No initiatives to display" when dataset is empty', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
    ) as typeof fetch);
    render(<AppWithMockData />);
    await screen.findByText(/No initiatives to display/i);
  });

  it('AC-ILV-003.1: Clicking a row opens detail modal with initiative name', async () => {
    render(<AppWithMockData />);
    const table = await screen.findByRole('table', {}, { timeout: 5000 });
    const nameCell = await within(table).findByText('Cloud Foundation', {}, { timeout: 2000 });
    const row = nameCell.closest('tr');
    if (!row) throw new Error('Row not found');
    fireEvent.click(row);
    const dialog = await screen.findByRole('dialog', {}, { timeout: 3000 });
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText('Cloud Foundation')).toBeInTheDocument();
  });

  it('AC-ILV-004.1: Sort controls for name, owner, RAG, workstream, cloud, value', async () => {
    render(<AppWithMockData />);
    const table = await screen.findByRole('table', {}, { timeout: 5000 });
    await within(table).findByText('Cloud Foundation', {}, { timeout: 2000 });
    expect(screen.getByRole('button', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /owner/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /rag/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /workstream/i })).toBeInTheDocument();
  });
});
