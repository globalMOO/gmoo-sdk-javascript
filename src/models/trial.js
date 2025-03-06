import { GlobalMooModel } from './base.js';
import { Objective } from './objective.js';

export class Trial extends GlobalMooModel {
  constructor(data) {
    super(data);
    this.id = data.id;
    if (typeof data.number !== 'number') {
      throw new InvalidArgumentException('Trial number must be a number');
    }
    this.number = data.number;
    if (typeof data.caseCount !== 'number') {
      throw new InvalidArgumentException('Trial caseCount must be a number');
    }
    this.caseCount = data.caseCount;
    this.created_at = new Date(data.createdAt);
    this.updated_at = new Date(data.updatedAt);
    this.disabled_at = data.disabledAt ? new Date(data.disabledAt) : null;
    this.output_count = data.outputCount;
    this.output_cases = data.outputCases;
    this.objectives = data.objectives ? data.objectives.map(o => new Objective(o)) : [];
  }
}