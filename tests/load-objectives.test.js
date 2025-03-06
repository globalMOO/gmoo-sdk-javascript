import { LoadObjectives } from '../src/requests/load-objectives.js';
import { ObjectiveType } from '../src/enums/objective-type.js';

describe('LoadObjectives', () => {
  test('initialization with minimum parameters', () => {
    const request = new LoadObjectives({
      trialId: 1,
      objectives: [1.0, 2.0],
      objectiveTypes: [ObjectiveType.EXACT, ObjectiveType.EXACT],
      initialInput: [0.5, 0.6],
      initialOutput: [1.0, 2.0]
    });

    expect(request.trialId).toBe(1);
    expect(request.objectives).toEqual([1.0, 2.0]);
    expect(request.initialInput).toEqual([0.5, 0.6]);
    expect(request.initialOutput).toEqual([1.0, 2.0]);
    expect(request.desiredL1Norm).toBe(0.0);
    expect(request.minimumBounds).toEqual([0.0, 0.0]);
    expect(request.maximumBounds).toEqual([0.0, 0.0]);
  });

  test('initialization with all parameters', () => {
    const request = new LoadObjectives({
      trialId: 1,
      objectives: [1.0, 2.0],
      objectiveTypes: [ObjectiveType.EXACT, ObjectiveType.EXACT],
      initialInput: [0.5, 0.6],
      initialOutput: [1.0, 2.0],
      desiredL1Norm: 1e-6,
      minimumBounds: [-0.1, -0.1],
      maximumBounds: [0.1, 0.1]
    });

    expect(request.desiredL1Norm).toBe(1e-6);
    expect(request.minimumBounds).toEqual([-0.1, -0.1]);
    expect(request.maximumBounds).toEqual([0.1, 0.1]);
  });

  test('serialization for API request', () => {
    const request = new LoadObjectives({
      trialId: 1,
      objectives: [1.0, 2.0],
      objectiveTypes: [ObjectiveType.EXACT, ObjectiveType.EXACT],
      initialInput: [0.5, 0.6],
      initialOutput: [1.0, 2.0],
      desiredL1Norm: 1e-6,
      minimumBounds: [0.0, 0.0],
      maximumBounds: [0.0, 0.0]
    });

    const data = request.toDict();
    expect(data).toEqual({
      desiredL1Norm: 1e-6,
      objectives: [1.0, 2.0],
      objectiveTypes: ['exact', 'exact'],
      initialInput: [0.5, 0.6],
      initialOutput: [1.0, 2.0],
      minimumBounds: [0.0, 0.0],
      maximumBounds: [0.0, 0.0]
    });
  });

  test('string objective types are converted', () => {
    const request = new LoadObjectives({
      trialId: 1,
      objectives: [1.0, 2.0],
      objectiveTypes: ['exact', 'percent'],
      initialInput: [0.5, 0.6],
      initialOutput: [1.0, 2.0]
    });

    const data = request.toDict();
    expect(data.objectiveTypes).toEqual(['exact', 'percent']);
  });

  test('URL construction', () => {
    const request = new LoadObjectives({
      trialId: 1,
      objectives: [1.0],
      objectiveTypes: [ObjectiveType.EXACT],
      initialInput: [0.5],
      initialOutput: [1.0]
    });

    // Expect path either with or without leading slash
    expect(request.getUrl().replace(/^\//, '')).toBe('trials/1/objectives');
  });

  test('default bounds for mixed objective types', () => {
    const request = new LoadObjectives({
      trialId: 1,
      objectives: [1.0, 2.0],
      objectiveTypes: [ObjectiveType.EXACT, ObjectiveType.PERCENT],
      initialInput: [0.5, 0.6],
      initialOutput: [1.0, 2.0],
      minimumBounds: [-1.0, -2.0],
      maximumBounds: [1.0, 2.0]
    });

    expect(request.minimumBounds).toEqual([-1.0, -2.0]);
    expect(request.maximumBounds).toEqual([1.0, 2.0]);
  });
});