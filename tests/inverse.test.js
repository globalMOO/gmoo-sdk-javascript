import { Inverse } from '../src/models/inverse.js';
import { StopReason } from '../src/enums/stop-reason.js';

describe('Inverse', () => {
  test('getStopReason running', () => {
    const now = new Date();
    const inverse = new Inverse({
      id: 1,
      createdAt: now,
      updatedAt: now,
      iteration: 1,
      input: [1.0, 2.0],
      l1Norm: 0.0,
      suggestTime: 0,
      computeTime: 0
    });

    expect(inverse.getStopReason()).toBe(StopReason.RUNNING);
    expect(inverse.shouldStop()).toBe(false);
  });

  test('getStopReason satisfied', () => {
    const now = new Date();
    const inverse = new Inverse({
      id: 1,
      createdAt: now,
      updatedAt: now,
      satisfiedAt: now,
      iteration: 1,
      input: [1.0, 2.0],
      output: [3.0, 4.0],
      l1Norm: 0.1,
      suggestTime: 0,
      computeTime: 0,
      results: [{
        id: 1,
        createdAt: now,
        updatedAt: now,
        number: 0,
        type: 'exact',
        objective: 1.0,
        output: 3.0,
        minimumBound: 0.0,
        maximumBound: 0.0,
        error: 0.1,
        detail: "L1 norm is less than desired L1 norm across all exact objectives",
        satisfied: true
      }]
    });

    expect(inverse.getStopReason()).toBe(StopReason.SATISFIED);
    expect(inverse.shouldStop()).toBe(true);
  });

  test('getStopReason exhausted', () => {
    const now = new Date();
    const inverse = new Inverse({
      id: 1,
      createdAt: now,
      updatedAt: now,
      exhaustedAt: now,
      iteration: 1,
      input: [1.0, 2.0],
      output: [3.0, 4.0],
      l1Norm: 0.1,
      suggestTime: 0,
      computeTime: 0,
      results: [{
        id: 1,
        createdAt: now,
        updatedAt: now,
        number: 0,
        type: 'exact',
        objective: 1.0,
        output: 3.0,
        minimumBound: 0.0,
        maximumBound: 0.0,
        error: 0.3,
        detail: "L1 norm is greater than or equal to desired L1 norm",
        satisfied: false
      }]
    });

    expect(inverse.getStopReason()).toBe(StopReason.EXHAUSTED);
    expect(inverse.shouldStop()).toBe(true);
  });

  test('multiple stop dates', () => {
    const now = new Date();
    const inverse = new Inverse({
      id: 1,
      createdAt: now,
      updatedAt: now,
      satisfiedAt: now,
      stoppedAt: now,
      exhaustedAt: now,
      iteration: 1,
      input: [1.0, 2.0],
      output: [3.0, 4.0],
      l1Norm: 0.1,
      suggestTime: 0,
      computeTime: 0,
      results: [{
        id: 1,
        createdAt: now,
        updatedAt: now,
        number: 0,
        type: 'exact',
        objective: 1.0,
        output: 3.0,
        minimumBound: 0.0,
        maximumBound: 0.0,
        error: 0.1,
        detail: "L1 norm is less than desired L1 norm across all exact objectives",
        satisfied: true
      }]
    });

    expect(inverse.getStopReason()).toBe(StopReason.SATISFIED);
    expect(inverse.shouldStop()).toBe(true);
  });

  test('getObjectiveErrors', () => {
    const now = new Date();
    const inverse = new Inverse({
      id: 1,
      createdAt: now,
      updatedAt: now,
      iteration: 1,
      input: [1.0, 2.0],
      output: [3.0, 4.0],
      l1Norm: 0.1,
      suggestTime: 0,
      computeTime: 0,
      results: [
        {
          id: 1,
          createdAt: now,
          updatedAt: now,
          number: 0,
          type: 'exact',
          objective: 1.0,
          output: 3.0,
          minimumBound: 0.0,
          maximumBound: 0.0,
          error: 0.1,
          detail: "test detail",
          satisfied: true
        },
        {
          id: 2,
          createdAt: now,
          updatedAt: now,
          number: 1,
          type: 'exact',
          objective: 2.0,
          output: 4.0,
          minimumBound: 0.0,
          maximumBound: 0.0,
          error: 0.2,
          detail: "test detail",
          satisfied: true
        }
      ]
    });

    expect(inverse.getObjectiveErrors()).toEqual([0.1, 0.2]);
  });

  test('getObjectiveErrors with no results', () => {
    const now = new Date();
    const inverse = new Inverse({
      id: 1,
      createdAt: now,
      updatedAt: now,
      iteration: 1,
      input: [1.0, 2.0],
      l1Norm: 0.0,
      suggestTime: 0,
      computeTime: 0
    });

    expect(inverse.getObjectiveErrors()).toEqual([]);
  });

  test('getStopReasonDescription', () => {
    const now = new Date();
    const inverse = new Inverse({
      id: 1,
      createdAt: now,
      updatedAt: now,
      satisfiedAt: now,
      iteration: 1,
      input: [1.0, 2.0],
      l1Norm: 0.0,
      suggestTime: 0,
      computeTime: 0
    });

    expect(inverse.getStopReasonDescription()).toBe('satisfied to an optimal input and output');
  });
});