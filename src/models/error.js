import { GlobalMooModel } from './base.js';

export class Error extends GlobalMooModel {
  constructor(data) {
    super(data);
    this.status = data.status;
    this.title = data.title;
    this.message = data.message;
    this.errors = data.errors || [];
  }
}