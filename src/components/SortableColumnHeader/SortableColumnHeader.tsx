import type { SortKey, SortDirection } from '@/hooks/useSorting';

interface SortableColumnHeaderProps {
  label: string;
  sortKey: SortKey;
  currentSortKey: SortKey;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
}

export function SortableColumnHeader({
  label,
  sortKey,
  currentSortKey,
  sortDirection,
  onSort,
}: SortableColumnHeaderProps) {
  const isActive = currentSortKey === sortKey;
  const arrow = isActive
    ? sortDirection === 'asc'
      ? ' ↑'
      : ' ↓'
    : '';

  return (
    <th
      scope="col"
      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 bg-slate-50 border-b border-slate-200"
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSort(sortKey);
          }
        }}
        className="flex items-center gap-1 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 rounded"
      >
        {label}
        {arrow}
      </button>
    </th>
  );
}
