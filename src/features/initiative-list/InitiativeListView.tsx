import { useMemo } from 'react';
import { useInitiatives, useFilters, useSelectedInitiative } from '@/contexts';
import { filterLogic } from '@/utils/filterLogic';
import { useSorting } from '@/hooks/useSorting';
import { InitiativeRow } from '@/components/InitiativeRow';
import { SortableColumnHeader } from '@/components/SortableColumnHeader';
export function InitiativeListView() {
  const { initiatives, loading, error } = useInitiatives();
  const { filterState } = useFilters();
  const { setSelectedInitiativeId } = useSelectedInitiative();

  const filtered = useMemo(
    () => filterLogic(initiatives, filterState),
    [initiatives, filterState]
  );

  const { sortKey, sortDirection, handleSort, sortedData } =
    useSorting(filtered);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-slate-500">Loading initiatives…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (initiatives.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-slate-500">No initiatives to display.</p>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-slate-500">
          No initiatives match the selected filters.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr>
              <SortableColumnHeader
                label="Name"
                sortKey="name"
                currentSortKey={sortKey}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
              <SortableColumnHeader
                label="Owner"
                sortKey="owner"
                currentSortKey={sortKey}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 bg-slate-50 border-b border-slate-200">
                Timeline
              </th>
              <SortableColumnHeader
                label="RAG"
                sortKey="ragStatus"
                currentSortKey={sortKey}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
              <SortableColumnHeader
                label="Workstream"
                sortKey="workstream"
                currentSortKey={sortKey}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
              <SortableColumnHeader
                label="Cloud"
                sortKey="cloudProvider"
                currentSortKey={sortKey}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
              <SortableColumnHeader
                label="Value"
                sortKey="value"
                currentSortKey={sortKey}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
            </tr>
          </thead>
          <tbody>
            {sortedData.map((initiative) => (
              <InitiativeRow
                key={initiative.id}
                initiative={initiative}
                onClick={() => setSelectedInitiativeId(initiative.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
