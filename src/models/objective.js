import { GlobalMooModel } from './base.js';
import { Inverse } from './inverse.js';
import { StopReason } from '../enums/stop-reason.js';
import { ObjectiveType } from '../enums/objective-type.js';

export class Objective extends GlobalMooModel {
  constructor(data) {
    super(data);
    this.id = data.id;
    this.created_at = new Date(data.createdAt);
    this.updated_at = new Date(data.updatedAt);
    this.disabled_at = data.disabledAt ? new Date(data.disabledAt) : null;
    this.optimal_inverse = data.optimalInverse ? new Inverse(data.optimalInverse) : null;
    this.attempt_count = data.attemptCount || 0;
    this.stop_reason = data.stopReason;
    this.desired_l1_norm = data.desiredL1Norm;
    this.objectives = data.objectives;
    this.objective_types = data.objectiveTypes;
    this.minimum_bounds = data.minimumBounds;
    this.maximum_bounds = data.maximumBounds;
    this.inverses = data.inverses ? data.inverses.map(i => new Inverse(i)) : [];
  }

  get iterationCount() {
    return this.inverses.length;
  }

  get lastInverse() {
    return this.inverses.length > 0 ? this.inverses[this.inverses.length - 1] : null;
  }
}