import { BaseRequest } from './base.js';
import { Model } from '../models/model.js';

export class ReadModels extends BaseRequest {
  getMethod() {
    return 'GET';
  }

  _getPath() {
    return 'models';
  }

  getResponseType() {
    return [Model];  // Array of Models
  }
}