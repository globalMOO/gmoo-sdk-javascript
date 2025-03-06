// File: src/requests/create-model.js
import { BaseRequest } from './base.js';
import { Model } from '../models/model.js';

export class CreateModel extends BaseRequest {
  constructor(name, description = null) {
    super();
    this.name = name;
    if (description && description.length < 8) {
      throw new InvalidArgumentException('Model description must be at least 8 characters long');
    }
    this.description = description;
  }

  _getPath() {
    return 'models';
  }

  getResponseType() {
    return Model;
  }

  toDict() {
    return {
      name: this.name,
      description: this.description
    };
  }
}