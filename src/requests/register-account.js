import { BaseRequest } from './base.js';
import { Account } from '../models/account.js';

export class RegisterAccount extends BaseRequest {
  constructor(firstName, lastName, company, email, password, timeZone, agreement = true) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.company = company;
    this.email = email;
    this.password = password;
    this.timeZone = timeZone;
    this.agreement = agreement;
  }

  _getPath() {
    return 'accounts/register';
  }

  getResponseType() {
    return Account;
  }

  toDict() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      company: this.company,
      email: this.email,
      password: this.password,
      timeZone: this.timeZone,
      agreement: this.agreement
    };
  }
}