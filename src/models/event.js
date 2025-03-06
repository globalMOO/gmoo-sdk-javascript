import { GlobalMooModel } from './base.js';
import { Project } from './project.js';
import { Inverse } from './inverse.js';
import { EventName } from '../enums/event-name.js';

export class Event extends GlobalMooModel {
  constructor(data) {
    super(data);
    this.id = data.id;
    this.created_at = new Date(data.createdAt);
    this.updated_at = new Date(data.updatedAt);
    this.disabled_at = data.disabledAt ? new Date(data.disabledAt) : null;
    this.name = data.name;
    this.subject = data.subject;

    // Determine data type from event name
    const DataClass = data.name === EventName.PROJECT_CREATED ? Project : Inverse;
    this.data = new DataClass(data.data);
  }
}