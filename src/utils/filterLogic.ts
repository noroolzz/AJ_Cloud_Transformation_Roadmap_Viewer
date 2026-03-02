import type { Initiative, FilterState } from '@/types';

/**
 * Pure utility: apply filter state to initiatives.
 * OR within each category (e.g. AWS OR Azure), AND across categories.
 * Used by useFilters (matchingCount), InitiativeListView, and Roadmap Timeline.
 */
export function filterLogic(
  initiatives: Initiative[],
  filterState: FilterState
): Initiative[] {
  const { cloudProviders, ragStatuses, workstreams } = filterState;

  return initiatives.filter((initiative) => {
    const matchCloud =
      cloudProviders.length === 0 ||
      cloudProviders.includes(initiative.cloudProvider);
    const matchRag =
      ragStatuses.length === 0 ||
      (initiative.ragStatus && ragStatuses.includes(initiative.ragStatus));
    const matchWorkstream =
      workstreams.length === 0 || workstreams.includes(initiative.workstream);
    return matchCloud && matchRag && matchWorkstream;
  });
}
