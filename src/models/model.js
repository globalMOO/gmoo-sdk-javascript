import { GlobalMooModel } from './base.js';
import { Project } from './project.js';

export class Model extends GlobalMooModel {
  constructor(data) {
    super(data);
    this.id = data.id;
    this.created_at = new Date(data.createdAt);
    this.updated_at = new Date(data.updatedAt);
    this.disabled_at = data.disabledAt ? new Date(data.disabledAt) : null;
    this.name = data.name;
    this.description = data.description || null;
    this.projects = data.projects ? data.projects.map(p => new Project(p)) : [];
  }
}