import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { Initiative } from '@/types';
import { validateInitiatives } from '@/utils/validateInitiatives';
import { STORAGE_KEYS } from '@/constants/storageKeys';

interface InitiativesContextValue {
  initiatives: Initiative[];
  loading: boolean;
  error: string | null;
}

const InitiativesContext = createContext<InitiativesContextValue | null>(null);

function loadInitiativesFromStorage(): Initiative[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INITIATIVES);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    const { initiatives } = validateInitiatives(parsed);
    return initiatives;
  } catch {
    return [];
  }
}

function saveInitiativesToStorage(initiatives: Initiative[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.INITIATIVES, JSON.stringify(initiatives));
  } catch {
    // ignore storage errors
  }
}

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
      .then((data: unknown) => {
        const { initiatives: validated, errors: validationErrors } =
          validateInitiatives(data);
        if (validated.length === 0 && validationErrors.length > 0) {
          setError(
            'Initiative data could not be loaded: invalid or missing required fields (name, phase).'
          );
          setInitiatives([]);
          return;
        }
        setInitiatives(validated);
        setError(null);
        saveInitiativesToStorage(validated);
      })
      .catch(() => {
        const cached = loadInitiativesFromStorage();
        if (cached.length > 0) {
          setInitiatives(cached);
          setError(null);
        } else {
          setError(
            'Initiatives could not be loaded. Please refresh the page or check that initiatives.json is available.'
          );
          setInitiatives([]);
        }
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
