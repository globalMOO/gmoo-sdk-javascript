import { BaseRequest } from './base.js';
import { Objective } from '../models/objective.js';
import { ObjectiveType } from '../enums/objective-type.js';

export class LoadObjectives extends BaseRequest {
  constructor({
    trialId,
    objectives,
    objectiveTypes,
    initialInput,
    initialOutput,
    desiredL1Norm = null,
    minimumBounds = null,
    maximumBounds = null
  }) {
    super();
    
    this.trialId = trialId;
    this.objectives = objectives;
    
    // Convert strings to ObjectiveType if needed
    this.objectiveTypes = objectiveTypes.map(ot => 
      typeof ot === 'string' ? ot.toLowerCase() : ot
    );
    
    this.initialInput = initialInput;
    this.initialOutput = initialOutput;

    // Set defaults for bounds if not provided and using all EXACT types
    if (this.objectiveTypes.every(ot => ot === ObjectiveType.EXACT)) {
      this.minimumBounds = minimumBounds || Array(objectives.length).fill(0.0);
      this.maximumBounds = maximumBounds || Array(objectives.length).fill(0.0);
    } else {
      this.minimumBounds = minimumBounds;
      this.maximumBounds = maximumBounds;
    }

    // Default l1_norm to 0 if not provided
    this.desiredL1Norm = desiredL1Norm === null ? 0.0 : desiredL1Norm;
  }

  _getPath() {
    return `trials/${this.trialId}/objectives`;
  }

  getResponseType() {
    return Objective;
  }

  toDict() {
    return {
      desiredL1Norm: this.desiredL1Norm,
      objectives: this.objectives,
      objectiveTypes: this.objectiveTypes,
      initialInput: this.initialInput,
      initialOutput: this.initialOutput,
      minimumBounds: this.minimumBounds,
      maximumBounds: this.maximumBounds
    };
  }
}