/**
 * Validates initiative data loaded from JSON.
 * Aligned with Data Management blueprint (REQ-DM-001.4): validate required fields
 * (name, phase) and handle malformed data gracefully.
 */

import type { Initiative, Phase } from '@/types';

const VALID_PHASES: Phase[] = ['Plan', 'Build', 'Deploy', 'Stabilize'];

export interface ValidationResult {
  initiatives: Initiative[];
  errors: string[];
}

function isPhase(value: unknown): value is Phase {
  return (
    typeof value === 'string' &&
    VALID_PHASES.includes(value as Phase)
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Validates a single raw item; returns Initiative if valid, null otherwise.
 * Required: name (non-empty string), timeline.phase (valid Phase).
 */
function validateOne(
  raw: unknown,
  index: number
): { initiative: Initiative; error: null } | { initiative: null; error: string } {
  if (!isRecord(raw)) {
    return { initiative: null, error: `Item at index ${index}: not an object` };
  }

  const name = raw.name;
  if (typeof name !== 'string' || name.trim() === '') {
    return { initiative: null, error: `Item at index ${index}: missing or invalid name` };
  }

  const timeline = raw.timeline;
  const phase =
    isRecord(timeline) && timeline.phase !== undefined
      ? timeline.phase
      : undefined;
  if (!isPhase(phase)) {
    return {
      initiative: null,
      error: `Item at index ${index} ("${name}"): missing or invalid timeline.phase (must be Plan, Build, Deploy, or Stabilize)`,
    };
  }

  // Type assertion: we've validated name and phase; full schema check could be added
  const initiative = raw as Initiative;
  return { initiative, error: null };
}

/**
 * Validates parsed JSON: must be an array; each element is validated for
 * required fields (name, timeline.phase). Returns valid initiatives and
 * a list of validation errors for invalid/malformed entries.
 * Data Management blueprint: handle malformed data gracefully (skip invalid, collect errors).
 */
export function validateInitiatives(raw: unknown): ValidationResult {
  const errors: string[] = [];
  const initiatives: Initiative[] = [];

  if (!Array.isArray(raw)) {
    return {
      initiatives: [],
      errors: ['Data must be an array of initiative objects'],
    };
  }

  for (let i = 0; i < raw.length; i++) {
    const result = validateOne(raw[i], i);
    if (result.error) {
      errors.push(result.error);
    } else if (result.initiative) {
      initiatives.push(result.initiative);
    }
  }

  return { initiatives, errors };
}
