import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

interface SelectedInitiativeContextValue {
  selectedInitiativeId: string | null;
  setSelectedInitiativeId: (id: string | null) => void;
}

export const SelectedInitiativeContext =
  createContext<SelectedInitiativeContextValue | null>(null);

export function SelectedInitiativeProvider({ children }: { children: ReactNode }) {
  const [selectedInitiativeId, setSelectedInitiativeIdState] = useState<
    string | null
  >(null);

  const setSelectedInitiativeId = useCallback((id: string | null) => {
    setSelectedInitiativeIdState(id);
  }, []);

  const value = useMemo(
    () => ({ selectedInitiativeId, setSelectedInitiativeId }),
    [selectedInitiativeId, setSelectedInitiativeId]
  );

  return (
    <SelectedInitiativeContext.Provider value={value}>
      {children}
    </SelectedInitiativeContext.Provider>
  );
}

export function useSelectedInitiative(): SelectedInitiativeContextValue {
  const ctx = useContext(SelectedInitiativeContext);
  if (!ctx) {
    throw new Error(
      'useSelectedInitiative must be used within SelectedInitiativeProvider'
    );
  }
  return ctx;
}
