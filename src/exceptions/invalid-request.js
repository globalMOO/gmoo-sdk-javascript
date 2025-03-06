import { GlobalMooException } from './base.js';

export class InvalidRequestException extends GlobalMooException {
  constructor(request = null, error = null, message = null) {
    super(message || error?.message || 'Invalid request');
    this.request = request;
    this.error = error;
    this.status = error?.status || 400;
    this.message = message || error?.message;
  }

  getMessage() {
    if (!this.error) {
      return this.message;
    }
    
    let msg = this.error.message;
    if (this.error.errors && this.error.errors.length) {
      const errors = this.error.errors.map(e => 
        `- ${e.property || 'Unknown'}: ${e.message || ''}`
      );
      msg = `${msg}\n${errors.join('\n')}`;
    }
    return msg;
  }

  getDebugMessage() {
    if (!this.error) {
      const msg = [`API Error (${this.status}):`];
      if (this.request) {
        msg.push(
          'Request Details:',
          `  URL: ${this.request.getUrl()}`,
          `  Method: ${this.request.getMethod()}`,
          `  Data: ${JSON.stringify(this.request.toDict())}`
        );
      }
      return msg.join('\n');
    }

    const msg = [
      `API Error (${this.status}):`,
      `Title: ${this.error.title}`,
      `Message: ${this.error.message}`
    ];

    if (this.error.errors && this.error.errors.length) {
      msg.push('Validation Errors:');
      this.error.errors.forEach(e => {
        msg.push(`  - ${e.property || 'Unknown'}: ${e.message || ''}`);
      });
    }

    msg.push(
      'Request Details:',
      `  URL: ${this.request.getUrl()}`,
      `  Method: ${this.request.getMethod()}`,
      `  Data: ${JSON.stringify(this.request.toDict())}`
    );

    return msg.join('\n');
  }

  getErrors() {
    return this.error?.errors || [];
  }
}