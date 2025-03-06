import { BaseRequest } from './base.js';
import { Project } from '../models/project.js';
import { InputType } from '../enums/input-type.js';
import { InvalidArgumentException } from '../exceptions/invalid-argument.js';

export class CreateProject extends BaseRequest {
  constructor(modelId, inputCount, minimums, maximums, inputTypes, categories = [], name) {
    if (!name || name.length < 4) {
      throw new InvalidArgumentException('Project name must be at least 4 characters long');
    }
    super();
    
    // Validate input arrays length match inputCount
    if (minimums.length !== inputCount) {
      throw new InvalidArgumentException(
        "Length of minimums must match input_count",
        {
          input_count: inputCount,
          minimums_length: minimums.length
        }
      );
    }
    
    if (maximums.length !== inputCount) {
      throw new InvalidArgumentException(
        "Length of maximums must match input_count",
        {
          input_count: inputCount,
          maximums_length: maximums.length
        }
      );
    }
    
    if (inputTypes.length !== inputCount) {
      throw new InvalidArgumentException(
        "Length of input_types must match input_count",
        {
          input_count: inputCount,
          input_types_length: inputTypes.length
        }
      );
    }
    
    // Validate numeric values
    if (!minimums.every(x => typeof x === 'number')) {
      throw new InvalidArgumentException("All minimums must be numbers");
    }
    
    if (!maximums.every(x => typeof x === 'number')) {
      throw new InvalidArgumentException("All maximums must be numbers");
    }
    
    // Validate input types
    const validTypes = Object.values(InputType);
    for (const type of inputTypes) {
      const typeStr = typeof type === 'string' ? type.toLowerCase() : type;
      if (!validTypes.includes(typeStr)) {
        throw new InvalidArgumentException(
          `Invalid input type: ${type}`,
          { valid_types: validTypes }
        );
      }
    }
    
    // Handle categories
    this.categories = categories || [];
    if (!Array.isArray(this.categories)) {
      throw new InvalidArgumentException("categories must be a list");
    }
    if (!this.categories.every(cat => typeof cat === 'string')) {
      throw new InvalidArgumentException("each category must be a string");
    }

    this.modelId = modelId;
    this.name = name;
    this.inputCount = inputCount;
    this.minimums = minimums;
    this.maximums = maximums;
    this.inputTypes = inputTypes;
  }

  _getPath() {
    return `models/${this.modelId}/projects`;
  }

  getResponseType() {
    return Project;
  }

  toDict() {
    return {
      inputCount: this.inputCount,
      minimums: this.minimums,
      maximums: this.maximums,
      inputTypes: this.inputTypes.map(t => 
        typeof t === 'string' ? t.toLowerCase() : t
      ),
      categories: this.categories,
      name: this.name
    };
  }
}