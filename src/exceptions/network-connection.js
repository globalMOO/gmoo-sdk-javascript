import { GlobalMooException } from './base.js';

export class NetworkConnectionException extends GlobalMooException {
  constructor(messageOrError) {
    super(typeof messageOrError === 'string' ? messageOrError : 'Network connection error');
    this.message = typeof messageOrError === 'string'
      ? messageOrError
      : 'A network error occurred when attempting to connect to the globalMOO API server.';
    this.originalError = typeof messageOrError === 'string' ? null : messageOrError;
  }

  getMessage() {
    return this.message;
  }

  getDebugMessage() {
    const msg = [`Network Connection Error: ${this.message}`];
    if (this.originalError) {
      msg.push(
        'Original Error:',
        `  Type: ${this.originalError.constructor.name}`,
        `  Message: ${this.originalError.message}`
      );
      
      if (this.originalError.request) {
        msg.push(
          'Request Details:',
          `  Method: ${this.originalError.request.method}`,
          `  URL: ${this.originalError.request.url}`
        );
      }
    }
    return msg.join('\n');
  }
}