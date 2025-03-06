import { BaseRequest } from './base.js';
import { Inverse } from '../models/inverse.js';

export class SuggestInverse extends BaseRequest {
  constructor(objectiveId) {
    super();
    this.objectiveId = objectiveId;
  }

  _getPath() {
    return `objectives/${this.objectiveId}/suggest-inverse`;
  }

  getResponseType() {
    return Inverse;
  }

  toDict() {
    return {};
  }
}