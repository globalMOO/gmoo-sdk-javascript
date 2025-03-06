// File: src/models/base.js
export class GlobalMooModel {
  constructor(data) {
    Object.assign(this, data);
  }

  toJSON() {
    return Object.fromEntries(
      Object.entries(this).map(([key, value]) => [
        key.replace(/_([a-z])/g, g => g[1].toUpperCase()),
        value
      ])
    );
  }
}