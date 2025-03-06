export const StopReason = {
  RUNNING: 0,
  SATISFIED: 1,
  STOPPED: 2,
  EXHAUSTED: 3,

  description(reason) {
    const descriptions = {
      0: 'is still running or being evaluated',
      1: 'satisfied to an optimal input and output',
      2: 'stopped due to duplicate suggested inputs',
      3: 'exhausted all attempts to converge'
    };
    return descriptions[reason];
  },

  isRunning(reason) {
    return reason === this.RUNNING;
  },

  isSatisfied(reason) {
    return reason === this.SATISFIED;
  },

  isStopped(reason) {
    return reason === this.STOPPED;
  },

  isExhausted(reason) {
    return reason === this.EXHAUSTED;
  },

  shouldStop(reason) {
    return reason !== this.RUNNING;
  }
};