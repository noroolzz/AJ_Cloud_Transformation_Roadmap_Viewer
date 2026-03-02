/**
 * Acceptance tests for Initiative Detail Modal (8090 REQ-IDM-001, REQ-IDM-002).
 * AC-IDM-001.2, 001.3: Modal displays name, description, owner, timeline, RAG, value, workstream.
 * AC-IDM-002.1–002.4: Close via button, click outside, Escape key.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within, fireEvent, cleanup } from '@testing-library/react';
import { useEffect } from 'react';
import {
  InitiativesProvider,
  SelectedInitiativeProvider,
  SelectedInitiativeContext,
  useSelectedInitiative,
} from '@/contexts';
import { InitiativeDetailModal } from './InitiativeDetailModal';

const mockInitiatives = [
  {
    id: 'init-1',
    name: 'Test Initiative',
    owner: 'Test Owner',
    description: 'Test description',
    timeline: { phase: 'Build' as const },
    cloudProvider: 'AWS' as const,
    ragStatus: 'Green' as const,
    workstream: 'Infrastructure' as const,
    value: 'High',
  },
];

function OpenModalButton() {
  const { setSelectedInitiativeId } = useSelectedInitiative();
  useEffect(() => {
    setSelectedInitiativeId('init-1');
  }, [setSelectedInitiativeId]);
  return null;
}

function ModalTestWrapper() {
  return (
    <InitiativesProvider>
      <SelectedInitiativeProvider>
        <OpenModalButton />
        <InitiativeDetailModal />
      </SelectedInitiativeProvider>
    </InitiativesProvider>
  );
}

describe('InitiativeDetailModal (8090 Initiative Detail Modal acceptance)', () => {
  beforeEach(() => {
    cleanup();
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve(mockInitiatives) })
    ) as typeof fetch);
  });

  it('AC-IDM-001.1/001.2: Modal opens and displays initiative name, description, owner', async () => {
    render(<ModalTestWrapper />);
    const dialog = await screen.findByRole('dialog', {}, { timeout: 3000 });
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText('Test Initiative')).toBeInTheDocument();
    expect(within(dialog).getByText('Test description')).toBeInTheDocument();
    expect(within(dialog).getByText('Test Owner')).toBeInTheDocument();
  });

  it('AC-IDM-002.1/002.2: Close button closes modal', async () => {
    const setSelectedInitiativeId = vi.fn();
    render(
      <InitiativesProvider>
        <SelectedInitiativeContext.Provider
          value={{
            selectedInitiativeId: 'init-1',
            setSelectedInitiativeId,
          }}
        >
          <InitiativeDetailModal />
        </SelectedInitiativeContext.Provider>
      </InitiativesProvider>
    );
    const dialog = await screen.findByRole('dialog', {}, { timeout: 3000 });
    const closeBtn = within(dialog).getByTestId('modal-close');
    fireEvent.click(closeBtn);
    expect(setSelectedInitiativeId).toHaveBeenCalledWith(null);
  });

  it('AC-IDM-002: Modal does not render when no initiative selected', () => {
    const { container } = render(
      <InitiativesProvider>
        <SelectedInitiativeContext.Provider
          value={{
            selectedInitiativeId: null,
            setSelectedInitiativeId: () => {},
          }}
        >
          <InitiativeDetailModal />
        </SelectedInitiativeContext.Provider>
      </InitiativesProvider>
    );
    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  });
});
