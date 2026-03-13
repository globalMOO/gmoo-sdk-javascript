import { BaseRequest } from './base.js';
import { Model } from '../models/model.js';

export class ReadModel extends BaseRequest {
  constructor(modelId) {
    super();
    this.modelId = modelId;
  }

  getMethod() {
    return 'GET';
  }

  _getPath() {
    return `models/${this.modelId}`;
  }

  getResponseType() {
    return Model;
  }
}
