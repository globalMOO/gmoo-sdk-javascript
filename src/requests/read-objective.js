import { BaseRequest } from './base.js';
import { Objective } from '../models/objective.js';

export class ReadObjective extends BaseRequest {
  constructor(objectiveId) {
    super();
    this.objectiveId = objectiveId;
  }

  getMethod() {
    return 'GET';
  }

  _getPath() {
    return `objectives/${this.objectiveId}`;
  }

  getResponseType() {
    return Objective;
  }
}
