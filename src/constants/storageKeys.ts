/**
 * LocalStorage keys for the Roadmap Viewer.
 * Aligned with Filters Panel blueprint (filter state persistence) and
 * Data Management blueprint (initiative data session persistence).
 */

export const STORAGE_KEYS = {
  FILTERS: 'roadmap_viewer_filters',
  INITIATIVES: 'roadmap_viewer_initiatives',
} as const;
