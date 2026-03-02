/**
 * Unit tests for initiative validation (Data Management REQ-DM-001.4, REQ-DM-002).
 * AC-DM-001.4: Validate required fields (name, phase).
 * AC-DM-002.*: Schema / required vs optional fields.
 */
import { describe, it, expect } from 'vitest';
import { validateInitiatives } from './validateInitiatives';

const validInitiative: Record<string, unknown> = {
  id: 'init-1',
  name: 'Valid Initiative',
  owner: 'Team',
  timeline: { phase: 'Build' },
  cloudProvider: 'AWS',
  workstream: 'Infrastructure',
};

describe('validateInitiatives (Data Management acceptance)', () => {
  it('returns all initiatives when all items are valid', () => {
    const input = [validInitiative, { ...validInitiative, id: 'init-2', name: 'Second' }];
    const { initiatives, errors } = validateInitiatives(input);
    expect(initiatives).toHaveLength(2);
    expect(errors).toHaveLength(0);
    expect(initiatives[0].name).toBe('Valid Initiative');
    expect(initiatives[1].name).toBe('Second');
  });

  it('rejects non-array input with a single error', () => {
    const { initiatives, errors } = validateInitiatives(null);
    expect(initiatives).toHaveLength(0);
    expect(errors).toEqual(['Data must be an array of initiative objects']);
  });

  it('rejects non-array input (object)', () => {
    const { initiatives, errors } = validateInitiatives({ foo: 1 });
    expect(initiatives).toHaveLength(0);
    expect(errors).toEqual(['Data must be an array of initiative objects']);
  });

  it('rejects item with missing name', () => {
    const input = [{ ...validInitiative, name: '' }];
    const { initiatives, errors } = validateInitiatives(input);
    expect(initiatives).toHaveLength(0);
    expect(errors[0]).toContain('missing or invalid name');
  });

  it('rejects item with missing timeline.phase', () => {
    const input = [{ ...validInitiative, timeline: {} }];
    const { initiatives, errors } = validateInitiatives(input);
    expect(initiatives).toHaveLength(0);
    expect(errors[0]).toMatch(/missing or invalid timeline\.phase/);
  });

  it('rejects item with invalid phase value', () => {
    const input = [{ ...validInitiative, timeline: { phase: 'Invalid' } }];
    const { initiatives, errors } = validateInitiatives(input);
    expect(initiatives).toHaveLength(0);
    expect(errors[0]).toMatch(/missing or invalid timeline\.phase/);
  });

  it('accepts all four valid phase values', () => {
    const phases = ['Plan', 'Build', 'Deploy', 'Stabilize'] as const;
    const input = phases.map((phase, i) => ({
      ...validInitiative,
      id: `init-${i}`,
      name: `Initiative ${phase}`,
      timeline: { phase },
    }));
    const { initiatives, errors } = validateInitiatives(input);
    expect(initiatives).toHaveLength(4);
    expect(errors).toHaveLength(0);
  });

  it('skips invalid entries and keeps valid ones (mixed payload)', () => {
    const input = [
      validInitiative,
      { ...validInitiative, id: 'bad-1', name: '' },
      { ...validInitiative, id: 'init-2', name: 'Second Valid' },
      null,
      { ...validInitiative, id: 'bad-2', timeline: {} },
    ];
    const { initiatives, errors } = validateInitiatives(input);
    expect(initiatives).toHaveLength(2);
    expect(initiatives[0].name).toBe('Valid Initiative');
    expect(initiatives[1].name).toBe('Second Valid');
    expect(errors.length).toBeGreaterThanOrEqual(2);
  });

  it('rejects item that is not an object', () => {
    const input = ['string', 123, validInitiative];
    const { initiatives, errors } = validateInitiatives(input);
    expect(initiatives).toHaveLength(1);
    expect(initiatives[0].name).toBe('Valid Initiative');
    expect(errors).toHaveLength(2);
  });
});
