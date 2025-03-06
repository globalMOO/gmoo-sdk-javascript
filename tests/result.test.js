import { Result } from '../src/models/result.js';
import { ObjectiveType } from '../src/enums/objective-type.js';

describe('Result', () => {
  test('basic initialization', () => {
    const now = new Date();
    const result = new Result({
      id: 1,
      createdAt: now,
      updatedAt: now,
      number: 0,
      objective: 1.0,
      objectiveType: ObjectiveType.EXACT,
      minimumBound: 0.0,
      maximumBound: 2.0,
      output: 1.5,
      error: 0.5,
      detail: "Test detail",
      satisfied: true
    });

    expect(result.id).toBe(1);
    expect(result.number).toBe(0);
    expect(result.objective).toBe(1.0);
    expect(result.objective_type).toBe(ObjectiveType.EXACT);
    expect(result.minimum_bound).toBe(0.0);
    expect(result.maximum_bound).toBe(2.0);
    expect(result.output).toBe(1.5);
    expect(result.error).toBe(0.5);
    expect(result.detail).toBe("Test detail");
    expect(result.satisfied).toBe(true);
  });

  test('default values', () => {
    const now = new Date();
    const result = new Result({
      id: 1,
      createdAt: now,
      updatedAt: now,
      number: 0,
      objective: 1.0
    });

    expect(result.objective_type).toBe(ObjectiveType.EXACT);
    expect(result.minimum_bound).toBe(0.0);
    expect(result.maximum_bound).toBe(0.0);
    expect(result.output).toBe(0.0);
    expect(result.error).toBe(0.0);
    expect(result.detail).toBeUndefined();
    expect(result.satisfied).toBe(true);
    expect(result.disabled_at).toBeNull();
  });

  test('formatted values for exact objective', () => {
    const now = new Date();
    const result = new Result({
      id: 1,
      createdAt: now,
      updatedAt: now,
      number: 0,
      objective: 1.23456789,
      objectiveType: ObjectiveType.EXACT,
      minimumBound: 0.98765432,
      maximumBound: 1.56789012,
      output: 1.34567890,
      error: 0.11111111
    });

    expect(result.getObjectiveFormatted()).toBe('1.234568');
    expect(result.getMinimumBoundFormatted()).toBe('0.987654');
    expect(result.getMaximumBoundFormatted()).toBe('1.567890');
    expect(result.getOutputFormatted()).toBe('1.345679');
    expect(result.getErrorFormatted()).toBe('0.111111');
  });

  test('formatted values for percent objective', () => {
    const now = new Date();
    const result = new Result({
      id: 1,
      createdAt: now,
      updatedAt: now,
      number: 0,
      objective: 12.3456789,
      objectiveType: ObjectiveType.PERCENT,
      minimumBound: 9.8765432,
      maximumBound: 15.6789012,
      output: 13.4567890,
      error: 1.1111111
    });

    expect(result.getObjectiveFormatted()).toBe('12.345679%');
    expect(result.getMinimumBoundFormatted()).toBe('9.876543%');
    expect(result.getMaximumBoundFormatted()).toBe('15.678901%');
    expect(result.getOutputFormatted()).toBe('13.456789%');
    expect(result.getErrorFormatted()).toBe('1.111111%');
  });

  test('withSatisfiedDetail', () => {
    const now = new Date();
    const result = new Result({
      id: 1,
      createdAt: now,
      updatedAt: now,
      number: 0,
      objective: 1.0
    });

    const satisfied = result.withSatisfiedDetail('Test satisfied');
    expect(satisfied.satisfied).toBe(true);
    expect(satisfied.detail).toBe('Test satisfied');
    // Original should be unchanged
    expect(result.satisfied).toBe(true);
    expect(result.detail).toBeUndefined();
  });

  test('withUnsatisfiedDetail', () => {
    const now = new Date();
    const result = new Result({
      id: 1,
      createdAt: now,
      updatedAt: now,
      number: 0,
      objective: 1.0
    });

    const unsatisfied = result.withUnsatisfiedDetail('Test unsatisfied');
    expect(unsatisfied.satisfied).toBe(false);
    expect(unsatisfied.detail).toBe('Test unsatisfied');
    // Original should be unchanged
    expect(result.satisfied).toBe(true);
    expect(result.detail).toBeUndefined();
  });
});