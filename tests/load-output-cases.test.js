import { LoadOutputCases } from '../src/requests/load-output-cases.js';
import { InvalidArgumentException } from '../src/exceptions/invalid-argument.js';

describe('LoadOutputCases', () => {
  test('valid output cases', () => {
    const request = new LoadOutputCases(
      1,  // projectId
      3,  // outputCount
      [
        [1.0, 2.0, 3.0],
        [4.0, 5.0, 6.0],
        [7.0, 8.0, 9.0]
      ]
    );

    expect(request.outputCount).toBe(3);
    expect(request.outputCases).toHaveLength(3);
    expect(request.outputCases[0]).toHaveLength(3);
  });

  test('mixed numeric types', () => {
    const request = new LoadOutputCases(
      1,
      3,
      [
        [1, 2.0, 3],
        [4.0, 5, 6.0]
      ]
    );

    expect(request.outputCases).toHaveLength(2);
    expect(request.outputCases[0]).toHaveLength(3);
  });

  test('non-list output cases', () => {
    expect(() => {
      new LoadOutputCases(
        1,
        3,
        "not_a_list"
      );
    }).toThrow(InvalidArgumentException);
  });

  test('non-list inner cases', () => {
    expect(() => {
      new LoadOutputCases(
        1,
        3,
        [
          [1.0, 2.0, 3.0],
          "not_a_list",
          [7.0, 8.0, 9.0]
        ]
      );
    }).toThrow(InvalidArgumentException);
  });

  test('inconsistent lengths', () => {
    expect(() => {
      new LoadOutputCases(
        1,
        3,
        [
          [1.0, 2.0, 3.0],
          [4.0, 5.0],  // Only 2 values
          [7.0, 8.0, 9.0]
        ]
      );
    }).toThrow(InvalidArgumentException);
  });

  test('non-numeric values', () => {
    expect(() => {
      new LoadOutputCases(
        1,
        3,
        [
          [1.0, "2.0", 3.0],  // String instead of number
          [4.0, 5.0, 6.0]
        ]
      );
    }).toThrow(InvalidArgumentException);
  });

  test('empty output cases', () => {
    const request = new LoadOutputCases(
      1,
      3,
      []
    );
    expect(request.outputCases).toEqual([]);
  });

  test('single case', () => {
    const request = new LoadOutputCases(
      1,
      3,
      [[1.0, 2.0, 3.0]]
    );
    expect(request.outputCases).toHaveLength(1);
    expect(request.outputCases[0]).toHaveLength(3);
  });

  test('URL construction', () => {
    const request = new LoadOutputCases(1, 3, []);
    // Expect path either with or without leading slash
    expect(request.getUrl().replace(/^\//, '')).toBe('projects/1/output-cases');
  });

  test('request body format', () => {
    const request = new LoadOutputCases(
      1,
      3,
      [[1.0, 2.0, 3.0]]
    );
    expect(request.toDict()).toEqual({
      outputCount: 3,
      outputCases: [[1.0, 2.0, 3.0]]
    });
  });
});