import { BaseRequest } from './base.js';
import { Account } from '../models/account.js';

export class RegisterAccount extends BaseRequest {
  constructor(company, name, email, password, timeZone) {
    super();
    this.company = company;
    this.name = name;
    this.email = email;
    this.password = password;
    this.timeZone = timeZone;
  }

  _getPath() {
    return 'accounts/register';
  }

  getResponseType() {
    return Account;
  }

  toDict() {
    return {
      company: this.company,
      name: this.name,
      email: this.email,
      password: this.password,
      timeZone: this.timeZone
    };
  }
}