/**
 * Domain types for the Cloud Transformation Roadmap Viewer.
 * Aligned with Refinery PRD and Foundry Feature Node blueprints (Data Management,
 * Filters Panel, Initiative List View, Initiative Detail Modal).
 */

/** RAG (Red/Amber/Green) health status for an initiative. */
export type RAGStatus = 'Red' | 'Amber' | 'Green';

/** Cloud provider options used by filters and initiative data. */
export type CloudProvider = 'AWS' | 'Azure' | 'GCP';

/** Workstream categories for filtering and initiative classification. */
export type Workstream =
  | 'Infrastructure'
  | 'Applications'
  | 'Security'
  | 'Data'
  | 'Operations';

/** Transformation phase (Plan → Build → Deploy → Stabilize) from the PRD timeline. */
export type Phase = 'Plan' | 'Build' | 'Deploy' | 'Stabilize';

/**
 * Filter state shared by Filters Panel, Initiative List View, and Roadmap Timeline.
 * OR within each array (e.g. AWS OR Azure), AND across arrays (cloud AND RAG AND workstream).
 */
export interface FilterState {
  cloudProviders: CloudProvider[];
  ragStatuses: RAGStatus[];
  workstreams: Workstream[];
}

/** Timeline can be expressed as dates and/or effort duration (PRD: Effort Duration). */
export interface InitiativeTimeline {
  startDate?: string;
  endDate?: string;
  effortDuration?: string;
  phase?: Phase;
}

/**
 * A single cloud transformation initiative.
 * Fields support List View (summary), Detail Modal (full), and filtering/sorting.
 */
export interface Initiative {
  id: string;
  name: string;
  owner: string;
  description?: string;
  timeline?: InitiativeTimeline;
  cloudProvider: CloudProvider;
  ragStatus?: RAGStatus;
  workstream: Workstream;
  value?: string;
  objectives?: string[];
  keyResults?: string[];
  activities?: string[];
  keySuccessFactors?: string[];
  dependencies?: string[];
  expectedBenefits?: string[];
  risks?: string[];
}
