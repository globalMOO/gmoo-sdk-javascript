import { GlobalMooModel } from './base.js';
import { StopReason } from '../enums/stop-reason.js';
import { Result } from './result.js';

export class Inverse extends GlobalMooModel {
  constructor(data) {
    super(data);
    this.id = data.id;
    this.created_at = new Date(data.createdAt);
    this.updated_at = new Date(data.updatedAt);
    this.disabled_at = data.disabledAt ? new Date(data.disabledAt) : null;
    this.loaded_at = data.loadedAt ? new Date(data.loadedAt) : null;
    this.satisfied_at = data.satisfiedAt ? new Date(data.satisfiedAt) : null;
    this.stopped_at = data.stoppedAt ? new Date(data.stoppedAt) : null;
    this.exhausted_at = data.exhaustedAt ? new Date(data.exhaustedAt) : null;
    this.iteration = data.iteration;
    this.l1_norm = data.l1Norm || 0.0;
    if (typeof data.suggestTime !== 'number') {
      throw new InvalidArgumentException('Inverse suggestTime must be a number in nanoseconds');
    }
    this.suggest_time = data.suggestTime;
    if (typeof data.computeTime !== 'number') {
      throw new InvalidArgumentException('Inverse computeTime must be a number in nanoseconds');
    }
    this.compute_time = data.computeTime;
    this.input = data.input;
    this.output = data.output;
    this.errors = data.errors;
    this.results = data.results ? data.results.map(r => new Result(r)) : [];
  }

  getResultDetails() {
    return this.results ? this.results.map(result => result.detail || '') : [];
  }

  getSatisfactionStatus() {
    return this.results ? this.results.map(result => result.satisfied) : [];
  }

  getObjectiveErrors() {
    return this.results ? this.results.map(result => result.error) : [];
  }

  getStopReason() {
    if (this.satisfied_at) return StopReason.SATISFIED;
    if (this.stopped_at) return StopReason.STOPPED;
    if (this.exhausted_at) return StopReason.EXHAUSTED;
    return StopReason.RUNNING;
  }

  shouldStop() {
    return StopReason.shouldStop(this.getStopReason());
  }

  getStopReasonDescription() {
    return StopReason.description(this.getStopReason());
  }
}