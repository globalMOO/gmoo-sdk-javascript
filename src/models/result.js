import { GlobalMooModel } from './base.js';
import { ObjectiveType } from '../enums/objective-type.js';

export class Result extends GlobalMooModel {
  constructor(data) {
    super(data);
    this.id = data.id;
    this.created_at = new Date(data.createdAt);
    this.updated_at = new Date(data.updatedAt);
    this.disabled_at = data.disabledAt ? new Date(data.disabledAt) : null;
    this.number = data.number;
    this.objective = data.objective || 0.0;
    this.objective_type = data.objectiveType || ObjectiveType.EXACT;
    this.minimum_bound = data.minimumBound || 0.0;
    this.maximum_bound = data.maximumBound || 0.0;
    this.output = data.output || 0.0;
    this.error = data.error || 0.0;
    this.detail = data.detail;
    this.satisfied = data.satisfied !== false;  // default to true if not specified
  }

  getObjectiveFormatted() {
    return this._formatValue(this.objective);
  }

  getMinimumBoundFormatted() {
    return this._formatValue(this.minimum_bound);
  }

  getMaximumBoundFormatted() {
    return this._formatValue(this.maximum_bound);
  }

  getOutputFormatted() {
    return this._formatValue(this.output);
  }

  getErrorFormatted() {
    return this._formatValue(this.error);
  }

  _formatValue(value) {
    const formatted = value.toFixed(6);
    return ObjectiveType.isPercent(this.objective_type) ? `${formatted}%` : formatted;
  }

  withSatisfiedDetail(detail) {
    return new Result({
      ...this,
      satisfied: true,
      detail
    });
  }

  withUnsatisfiedDetail(detail) {
    return new Result({
      ...this,
      satisfied: false,
      detail
    });
  }
}