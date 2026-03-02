import { useState, useMemo, useCallback } from 'react';
import type { Initiative, RAGStatus } from '@/types';

const RAG_ORDER: RAGStatus[] = ['Red', 'Amber', 'Green'];

export type SortKey = keyof Pick<
  Initiative,
  'name' | 'owner' | 'cloudProvider' | 'ragStatus' | 'workstream' | 'value'
>;
export type SortDirection = 'asc' | 'desc';

function compareRag(a: RAGStatus | undefined, b: RAGStatus | undefined): number {
  const ai = a ? RAG_ORDER.indexOf(a) : -1;
  const bi = b ? RAG_ORDER.indexOf(b) : -1;
  if (ai === bi) return 0;
  return ai < bi ? -1 : 1;
}

function compareStrings(a: string, b: string): number {
  return a.localeCompare(b, undefined, { sensitivity: 'base' });
}

function compareInitiative(
  a: Initiative,
  b: Initiative,
  key: SortKey,
  direction: SortDirection
): number {
  const mult = direction === 'asc' ? 1 : -1;
  switch (key) {
    case 'name':
    case 'owner':
    case 'cloudProvider':
    case 'workstream':
    case 'value': {
      const va = (a[key] ?? '') as string;
      const vb = (b[key] ?? '') as string;
      return mult * compareStrings(va, vb);
    }
    case 'ragStatus': {
      const cmp = compareRag(a.ragStatus, b.ragStatus);
      return mult * cmp;
    }
    default:
      return 0;
  }
}

export function useSorting(initiatives: Initiative[]) {
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const sortedData = useMemo(() => {
    return [...initiatives].sort((a, b) =>
      compareInitiative(a, b, sortKey, sortDirection)
    );
  }, [initiatives, sortKey, sortDirection]);

  const handleSort = useCallback((key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  }, [sortKey]);

  return {
    sortKey,
    sortDirection,
    handleSort,
    sortedData,
  };
}
