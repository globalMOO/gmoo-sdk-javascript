import { BaseRequest } from './base.js';
import { Trial } from '../models/trial.js';
import { InvalidArgumentException } from '../exceptions/invalid-argument.js';

export class LoadOutputCases extends BaseRequest {
  constructor(projectId, outputCount, outputCases) {
    super();
    
    if (!Array.isArray(outputCases)) {
      throw new InvalidArgumentException("output_cases must be a list");
    }

    // Check all are lists
    if (!outputCases.every(Array.isArray)) {
      throw new InvalidArgumentException(
        "output_cases must be a list of lists containing numeric values"
      );
    }

    // Validate lengths and numeric values
    if (outputCases.some(c => c.length !== outputCount)) {
      throw new InvalidArgumentException(
        "All output cases must have length matching output_count",
        {
          expected_length: outputCount,
          actual_lengths: outputCases.map(c => c.length)
        }
      );
    }

    // Check all values are numeric
    if (!outputCases.every(c => c.every(v => typeof v === 'number'))) {
      throw new InvalidArgumentException(
        "All output case values must be numbers"
      );
    }

    this.projectId = projectId;
    this.outputCount = outputCount;
    this.outputCases = outputCases;
  }

  _getPath() {
    return `projects/${this.projectId}/output-cases`;
  }

  getResponseType() {
    return Trial;
  }

  toDict() {
    return {
      outputCount: this.outputCount,
      outputCases: this.outputCases
    };
  }
}