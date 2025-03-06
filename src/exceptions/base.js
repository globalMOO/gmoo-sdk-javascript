// File: src/exceptions/base.js
export class GlobalMooException extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }

  getMessage() {
    throw new Error('getMessage must be implemented by subclass');
  }

  getDebugMessage() {
    throw new Error('getDebugMessage must be implemented by subclass');
  }
}