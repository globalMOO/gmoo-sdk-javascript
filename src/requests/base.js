// File: src/requests/base.js
export class BaseRequest {
  getUrl() {
    const path = this._getPath();
    return path.startsWith('/') ? path : '/' + path;
  }

  _getPath() {
    throw new Error('_getPath must be implemented by subclass');
  }

  getMethod() {
    return 'POST';
  }

  getResponseType() {
    throw new Error('getResponseType must be implemented by subclass');
  }

  toDict() {
    return null;
  }
}