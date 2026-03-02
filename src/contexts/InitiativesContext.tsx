import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { Initiative } from '@/types';

interface InitiativesContextValue {
  initiatives: Initiative[];
  loading: boolean;
  error: string | null;
}

const InitiativesContext = createContext<InitiativesContextValue | null>(null);

export function InitiativesProvider({ children }: { children: ReactNode }) {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/initiatives.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load initiatives');
        return res.json();
      })
      .then((data: Initiative[]) => {
        setInitiatives(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setInitiatives([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({ initiatives, loading, error }),
    [initiatives, loading, error]
  );

  return (
    <InitiativesContext.Provider value={value}>
      {children}
    </InitiativesContext.Provider>
  );
}

export function useInitiatives(): InitiativesContextValue {
  const ctx = useContext(InitiativesContext);
  if (!ctx) {
    throw new Error('useInitiatives must be used within InitiativesProvider');
  }
  return ctx;
}
