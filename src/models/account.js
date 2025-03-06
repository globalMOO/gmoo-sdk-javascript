// File: src/models/account.js
import { GlobalMooModel } from './base.js';

export class Account extends GlobalMooModel {
  constructor(data) {
    super(data);
    this.id = data.id;
    this.created_at = new Date(data.createdAt);
    this.updated_at = new Date(data.updatedAt);
    this.disabled_at = data.disabledAt ? new Date(data.disabledAt) : null;
    this.company = data.company;
    this.name = data.name;
    this.email = data.email;
    this.api_key = data.apiKey;
    this.time_zone = data.timeZone;
    this.customer_id = data.customerId;
  }
}