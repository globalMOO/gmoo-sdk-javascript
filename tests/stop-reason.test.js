import { StopReason } from '../src/enums/stop-reason.js';

describe('StopReason', () => {
  describe('shouldStop', () => {
    test.each([
      [StopReason.RUNNING, false],
      [StopReason.SATISFIED, true],
      [StopReason.STOPPED, true],
      [StopReason.EXHAUSTED, true]
    ])('reason %p should return %p', (reason, expected) => {
      expect(StopReason.shouldStop(reason)).toBe(expected);
    });
  });

  test('isRunning', () => {
    expect(StopReason.isRunning(StopReason.RUNNING)).toBe(true);
    expect(StopReason.isRunning(StopReason.SATISFIED)).toBe(false);
    expect(StopReason.isRunning(StopReason.STOPPED)).toBe(false);
    expect(StopReason.isRunning(StopReason.EXHAUSTED)).toBe(false);
  });

  test('isSatisfied', () => {
    expect(StopReason.isSatisfied(StopReason.RUNNING)).toBe(false);
    expect(StopReason.isSatisfied(StopReason.SATISFIED)).toBe(true);
    expect(StopReason.isSatisfied(StopReason.STOPPED)).toBe(false);
    expect(StopReason.isSatisfied(StopReason.EXHAUSTED)).toBe(false);
  });

  test('isStopped', () => {
    expect(StopReason.isStopped(StopReason.RUNNING)).toBe(false);
    expect(StopReason.isStopped(StopReason.SATISFIED)).toBe(false);
    expect(StopReason.isStopped(StopReason.STOPPED)).toBe(true);
    expect(StopReason.isStopped(StopReason.EXHAUSTED)).toBe(false);
  });

  test('isExhausted', () => {
    expect(StopReason.isExhausted(StopReason.RUNNING)).toBe(false);
    expect(StopReason.isExhausted(StopReason.SATISFIED)).toBe(false);
    expect(StopReason.isExhausted(StopReason.STOPPED)).toBe(false);
    expect(StopReason.isExhausted(StopReason.EXHAUSTED)).toBe(true);
  });
});