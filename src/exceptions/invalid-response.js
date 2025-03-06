import { GlobalMooException } from './base.js';

export class InvalidResponseException extends GlobalMooException {
  constructor(messageOrError) {
    super(typeof messageOrError === 'string' ? messageOrError : 'Invalid response');
    this.message = typeof messageOrError === 'string' 
      ? messageOrError 
      : 'An error occurred when attempting to decode the response from the globalMOO API.';
    this.originalError = typeof messageOrError === 'string' ? null : messageOrError;
  }

  getMessage() {
    return this.message;
  }

  getDebugMessage() {
    const msg = [`Response Error: ${this.message}`];
    if (this.originalError) {
      msg.push(
        'Original Error:',
        `  Type: ${this.originalError.constructor.name}`,
        `  Message: ${this.originalError.message}`
      );
    }
    return msg.join('\n');
  }
}