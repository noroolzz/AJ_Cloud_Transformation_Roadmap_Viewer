import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { FilterState, CloudProvider, RAGStatus, Workstream } from '@/types';
import { filterLogic } from '@/utils/filterLogic';
import { useInitiatives } from './InitiativesContext';
import { STORAGE_KEYS } from '@/constants/storageKeys';

const defaultFilterState: FilterState = {
  cloudProviders: [],
  ragStatuses: [],
  workstreams: [],
};

function loadFiltersFromStorage(): FilterState {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FILTERS);
    if (!raw) return defaultFilterState;
    const parsed = JSON.parse(raw) as FilterState;
    return {
      cloudProviders: Array.isArray(parsed.cloudProviders)
        ? (parsed.cloudProviders as CloudProvider[])
        : [],
      ragStatuses: Array.isArray(parsed.ragStatuses)
        ? (parsed.ragStatuses as RAGStatus[])
        : [],
      workstreams: Array.isArray(parsed.workstreams)
        ? (parsed.workstreams as Workstream[])
        : [],
    };
  } catch {
    return defaultFilterState;
  }
}

function saveFiltersToStorage(state: FilterState) {
  try {
    localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(state));
  } catch {
    // ignore
  }
}

interface FiltersContextValue {
  filterState: FilterState;
  setFilterState: (state: FilterState | ((prev: FilterState) => FilterState)) => void;
  clearFilters: () => void;
  matchingCount: number;
}

const FiltersContext = createContext<FiltersContextValue | null>(null);

export function FiltersProvider({ children }: { children: ReactNode }) {
  const { initiatives } = useInitiatives();
  const [filterState, setFilterStateInternal] = useState<FilterState>(
    loadFiltersFromStorage
  );

  useEffect(() => {
    saveFiltersToStorage(filterState);
  }, [filterState]);

  const setFilterState = useCallback(
    (state: FilterState | ((prev: FilterState) => FilterState)) => {
      setFilterStateInternal(state);
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilterStateInternal(defaultFilterState);
  }, []);

  const matchingCount = useMemo(
    () => filterLogic(initiatives, filterState).length,
    [initiatives, filterState]
  );

  const value = useMemo(
    () => ({ filterState, setFilterState, clearFilters, matchingCount }),
    [filterState, setFilterState, clearFilters, matchingCount]
  );

  return (
    <FiltersContext.Provider value={value}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters(): FiltersContextValue {
  const ctx = useContext(FiltersContext);
  if (!ctx) {
    throw new Error('useFilters must be used within FiltersProvider');
  }
  return ctx;
}
