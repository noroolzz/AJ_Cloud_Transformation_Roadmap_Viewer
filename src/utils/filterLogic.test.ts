/**
 * Acceptance tests for filter logic (8090 Filters Panel REQ-FP-002, REQ-FP-003, REQ-FP-004, REQ-FP-006).
 * AC-FP-002.2, AC-FP-003.2, AC-FP-004.2: OR within category.
 * AC-FP-006.1: AND across categories.
 * AC-FP-006.2: Zero matches → message (tested in UI).
 */
import { describe, it, expect } from 'vitest';
import { filterLogic } from './filterLogic';
import type { Initiative, FilterState } from '@/types';

const initiatives: Initiative[] = [
  {
    id: '1',
    name: 'A',
    owner: 'O1',
    cloudProvider: 'AWS',
    ragStatus: 'Green',
    workstream: 'Infrastructure',
  },
  {
    id: '2',
    name: 'B',
    owner: 'O2',
    cloudProvider: 'Azure',
    ragStatus: 'Amber',
    workstream: 'Applications',
  },
  {
    id: '3',
    name: 'C',
    owner: 'O3',
    cloudProvider: 'AWS',
    ragStatus: 'Green',
    workstream: 'Security',
  },
  {
    id: '4',
    name: 'D',
    owner: 'O4',
    cloudProvider: 'GCP',
    ragStatus: 'Red',
    workstream: 'Data',
  },
];

const emptyFilters: FilterState = {
  cloudProviders: [],
  ragStatuses: [],
  workstreams: [],
};

describe('filterLogic (8090 Filters Panel acceptance)', () => {
  it('AC-FP-*: No filters returns all initiatives', () => {
    expect(filterLogic(initiatives, emptyFilters)).toHaveLength(4);
  });

  it('AC-FP-002.2: Multiple cloud providers use OR — AWS OR Azure returns 3', () => {
    const result = filterLogic(initiatives, {
      ...emptyFilters,
      cloudProviders: ['AWS', 'Azure'],
    });
    expect(result).toHaveLength(3);
    expect(result.map((i) => i.cloudProvider)).toEqual(
      expect.arrayContaining(['AWS', 'AWS', 'Azure'])
    );
  });

  it('AC-FP-003.2: Multiple RAG statuses use OR — Green OR Amber returns 3', () => {
    const result = filterLogic(initiatives, {
      ...emptyFilters,
      ragStatuses: ['Green', 'Amber'],
    });
    expect(result).toHaveLength(3);
    expect(result.map((i) => i.ragStatus)).toEqual(
      expect.arrayContaining(['Green', 'Amber', 'Green'])
    );
  });

  it('AC-FP-004.2: Multiple workstreams use OR', () => {
    const result = filterLogic(initiatives, {
      ...emptyFilters,
      workstreams: ['Infrastructure', 'Data'],
    });
    expect(result).toHaveLength(2);
    expect(result.map((i) => i.workstream).sort()).toEqual([
      'Data',
      'Infrastructure',
    ]);
  });

  it('AC-FP-006.1: Across categories use AND — AWS AND Green returns 2', () => {
    const result = filterLogic(initiatives, {
      cloudProviders: ['AWS'],
      ragStatuses: ['Green'],
      workstreams: [],
    });
    expect(result).toHaveLength(2);
    expect(result.every((i) => i.cloudProvider === 'AWS' && i.ragStatus === 'Green')).toBe(true);
  });

  it('AC-FP-006.1: AND across categories can yield zero matches', () => {
    const result = filterLogic(initiatives, {
      cloudProviders: ['Oracle'],
      ragStatuses: ['Red'],
      workstreams: [],
    });
    expect(result).toHaveLength(0);
  });
});
