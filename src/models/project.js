import { GlobalMooModel } from './base.js';
import { Trial } from './trial.js';
import { InputType } from '../enums/input-type.js';

export class Project extends GlobalMooModel {
  constructor(data) {
    super(data);
    this.id = data.id;
    if (!data.name || data.name.length < 4) {
      throw new InvalidArgumentException('Project name must be at least 4 characters long');
    }
    this.name = data.name;
    this.created_at = new Date(data.createdAt);
    this.updated_at = new Date(data.updatedAt);
    this.disabled_at = data.disabledAt ? new Date(data.disabledAt) : null;
    this.developed_at = data.developedAt ? new Date(data.developedAt) : null;
    this.input_count = data.inputCount;
    this.minimums = data.minimums;
    this.maximums = data.maximums;
    this.input_types = data.inputTypes.map(type => type.toLowerCase());
    this.categories = data.categories || [];
    this.input_cases = data.inputCases;
    this.case_count = data.caseCount;
    this.trials = data.trials ? data.trials.map(t => new Trial(t)) : [];
  }
}