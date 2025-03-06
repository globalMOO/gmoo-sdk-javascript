import { BaseRequest } from './base.js';
import { Inverse } from '../models/inverse.js';
import { InvalidArgumentException } from '../exceptions/invalid-argument.js';

export class LoadInversedOutput extends BaseRequest {
  constructor(inverseId, output) {
    super();
    
    // Validate output is a list
    if (!Array.isArray(output)) {
      throw new InvalidArgumentException("output must be a list");
    }
    
    // Validate all values are numeric
    if (!output.every(val => typeof val === 'number')) {
      throw new InvalidArgumentException("all output values must be numbers");
    }

    this.inverseId = inverseId;
    this.output = output;
  }

  _getPath() {
    return `inverses/${this.inverseId}/load-output`;
  }

  getResponseType() {
    return Inverse;
  }

  toDict() {
    return {
      output: this.output
    };
  }
}