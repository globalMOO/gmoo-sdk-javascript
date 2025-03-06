import { CreateProject } from '../src/requests/create-project.js';
import { InputType } from '../src/enums/input-type.js';
import { InvalidArgumentException } from '../src/exceptions/invalid-argument.js';

describe('CreateProject', () => {
  test('valid create project', () => {
    const request = new CreateProject(
      1,                      // modelId
      3,                      // inputCount
      [0.0, 0.0, 0.0],       // minimums
      [10.0, 10.0, 10.0],    // maximums
      [InputType.FLOAT, InputType.FLOAT, InputType.FLOAT], // inputTypes
      [],                     // categories
      'test_project'          // name
    );

    expect(request.modelId).toBe(1);
    expect(request.inputCount).toBe(3);
    expect(request.minimums).toEqual([0.0, 0.0, 0.0]);
    expect(request.maximums).toEqual([10.0, 10.0, 10.0]);
    expect(request.inputTypes).toEqual([InputType.FLOAT, InputType.FLOAT, InputType.FLOAT]);
    expect(request.categories).toEqual([]);
  });

  test('mixed numeric types', () => {
    const request = new CreateProject(
      1,
      3,
      [0, 0.0, 1],
      [10, 10.0, 10],
      [InputType.FLOAT, InputType.FLOAT, InputType.INTEGER],
      [],
      'test_project'
    );

    expect(request.minimums).toEqual([0, 0.0, 1]);
    expect(request.maximums).toEqual([10, 10.0, 10]);
  });

  test('none categories defaults to empty', () => {
    const request = new CreateProject(
      1,
      1,
      [0.0],
      [1.0],
      [InputType.FLOAT],
      null,
      'test_project'
    );

    expect(request.categories).toEqual([]);
  });

  test('invalid length minimums', () => {
    expect(() => {
      new CreateProject(
        1,
        3,
        [0.0, 0.0],  // Only 2 values for input_count=3
        [10.0, 10.0, 10.0],
        [InputType.FLOAT, InputType.FLOAT, InputType.FLOAT],
        [],
      'test_project'
      );
    }).toThrow(InvalidArgumentException);
  });

  test('invalid length maximums', () => {
    expect(() => {
      new CreateProject(
        1,
        3,
        [0.0, 0.0, 0.0],
        [10.0, 10.0],  // Only 2 values for input_count=3
        [InputType.FLOAT, InputType.FLOAT, InputType.FLOAT],
        [],
        'test_project'
      );
    }).toThrow(InvalidArgumentException);
  });

  test('invalid length input types', () => {
    expect(() => {
      new CreateProject(
        1,
        3,
        [0.0, 0.0, 0.0],
        [10.0, 10.0, 10.0],
        [InputType.FLOAT, InputType.FLOAT],  // Only 2 values for input_count=3
        [],
        'test_project'
      );
    }).toThrow(InvalidArgumentException);
  });

  test('non numeric values', () => {
    expect(() => {
      new CreateProject(
        1,
        3,
        [0.0, "0.0", 0.0],  // String instead of number
        [10.0, 10.0, 10.0],
        [InputType.FLOAT, InputType.FLOAT, InputType.FLOAT],
        [],
        'test_project'
      );
    }).toThrow(InvalidArgumentException);
  });

  test('invalid input type', () => {
    expect(() => {
      new CreateProject(
        1,
        3,
        [0.0, 0.0, 0.0],
        [10.0, 10.0, 10.0],
        [InputType.FLOAT, "INVALID", InputType.FLOAT],  // Invalid type
        [],
        'test_project'
      );
    }).toThrow(InvalidArgumentException);
  });

  test('non string categories', () => {
    expect(() => {
      new CreateProject(
        1,
        1,
        [0.0],
        [1.0],
        [InputType.CATEGORY],
        ["valid", 123, "also_valid"]  // Number instead of string
      );
    }).toThrow(InvalidArgumentException);
  });

  test('non list categories', () => {
    expect(() => {
      new CreateProject(
        1,
        1,
        [0.0],
        [1.0],
        [InputType.FLOAT],
        "not_a_list"  // String instead of list
      );
    }).toThrow(InvalidArgumentException);
  });
});