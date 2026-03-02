import { useMemo, useCallback } from 'react';
import type { CloudProvider, RAGStatus, Workstream } from '@/types';
import { useInitiatives, useFilters } from '@/contexts';
import { FilterSection } from '@/components/FilterSection';

const CLOUD_PROVIDERS: CloudProvider[] = ['AWS', 'Azure', 'GCP'];
const RAG_STATUSES: RAGStatus[] = ['Red', 'Amber', 'Green'];
const WORKSTREAMS: Workstream[] = [
  'Infrastructure',
  'Applications',
  'Security',
  'Data',
  'Operations',
];

function toggleInArray<T>(arr: T[], item: T): T[] {
  if (arr.includes(item)) return arr.filter((x) => x !== item);
  return [...arr, item];
}

export function FilterPanel() {
  const { initiatives } = useInitiatives();
  const { filterState, setFilterState, clearFilters, matchingCount } = useFilters();

  const availableProviders = useMemo(() => {
    const set = new Set(initiatives.map((i) => i.cloudProvider));
    return CLOUD_PROVIDERS.filter((p) => set.has(p));
  }, [initiatives]);

  const availableRagStatuses = useMemo(() => {
    const set = new Set(
      initiatives.map((i) => i.ragStatus).filter(Boolean) as RAGStatus[]
    );
    return RAG_STATUSES.filter((r) => set.has(r));
  }, [initiatives]);

  const toggleCloud = useCallback(
    (option: CloudProvider) => {
      setFilterState((prev) => ({
        ...prev,
        cloudProviders: toggleInArray(prev.cloudProviders, option),
      }));
    },
    [setFilterState]
  );

  const toggleRag = useCallback(
    (option: RAGStatus) => {
      setFilterState((prev) => ({
        ...prev,
        ragStatuses: toggleInArray(prev.ragStatuses, option),
      }));
    },
    [setFilterState]
  );

  const toggleWorkstream = useCallback(
    (option: Workstream) => {
      setFilterState((prev) => ({
        ...prev,
        workstreams: toggleInArray(prev.workstreams, option),
      }));
    },
    [setFilterState]
  );

  const hasActiveFilters =
    filterState.cloudProviders.length > 0 ||
    filterState.ragStatuses.length > 0 ||
    filterState.workstreams.length > 0;

  return (
    <aside
      className="w-64 shrink-0 border-r border-slate-200 bg-white p-4"
      aria-label="Filters"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Filters</h2>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs text-primary-600 hover:text-primary-700 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        <FilterSection
          title="Cloud provider"
          options={availableProviders}
          selectedOptions={filterState.cloudProviders}
          onToggle={toggleCloud}
        />
        <FilterSection
          title="RAG status"
          options={availableRagStatuses}
          selectedOptions={filterState.ragStatuses}
          onToggle={toggleRag}
        />
        <FilterSection
          title="Workstream"
          options={WORKSTREAMS}
          selectedOptions={filterState.workstreams}
          onToggle={toggleWorkstream}
        />

        <p className="text-sm text-slate-500">
          {matchingCount} initiative{matchingCount !== 1 ? 's' : ''} match
        </p>
      </div>
    </aside>
  );
}
