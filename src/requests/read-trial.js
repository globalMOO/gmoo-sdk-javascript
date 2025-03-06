import { BaseRequest } from './base.js';
import { Trial } from '../models/trial.js';

export class ReadTrial extends BaseRequest {
  constructor(trialId) {
    super();
    this.trialId = trialId;
  }

  getMethod() {
    return 'GET';
  }

  _getPath() {
    return `trials/${this.trialId}`;
  }

  getResponseType() {
    return Trial;
  }
}