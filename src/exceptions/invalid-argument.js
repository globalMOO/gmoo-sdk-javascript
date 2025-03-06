// File: src/exceptions/invalid-argument.js
import { GlobalMooException } from './base.js';

export class InvalidArgumentException extends GlobalMooException {
  constructor(message, details = null) {
    super(message);
    this.message = message;
    this.details = details || {};
  }

  getMessage() {
    return this.message;
  }

  getDebugMessage() {
    const msg = [`Invalid Argument Error: ${this.message}`];
    if (Object.keys(this.details).length > 0) {
      msg.push('Details:');
      Object.entries(this.details).forEach(([k, v]) => {
        msg.push(`  ${k}: ${v}`);
      });
    }
    return msg.join('\n');
  }
}