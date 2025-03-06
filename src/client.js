import axios from 'axios';
import { Credentials } from './credentials.js';
import { InvalidArgumentException, InvalidRequestException, InvalidResponseException, NetworkConnectionException } from './exceptions/index.js';
import { Event } from './models/event.js';
import { EventName } from './enums/event-name.js';

export class Client {
  constructor(credentials = null, httpClient = null, timeout = 30000, debug = false) {
    this.debug = debug;
    // Create new credentials if none provided
    this.credentials = credentials || new Credentials();

    const defaultHeaders = {
      'Authorization': `Bearer ${this.credentials.getApiKey()}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    if (httpClient) {
      this.httpClient = httpClient;
      Object.assign(this.httpClient.defaults.headers, defaultHeaders);
    } else {
      this.httpClient = axios.create({
        httpsAgent: this.credentials.shouldValidateTls() ? undefined : { rejectUnauthorized: false },
        baseURL: this.credentials.getBaseUri(),
        timeout,
        headers: defaultHeaders
      });
    }
  }

  executeRequest = async (request) => {
    let retryCount = 0;
    const maxRetries = 3;
    let lastError = null;

    while (true) {
      try {
        return await this._doExecuteRequest(request);
      } catch (error) {
        if (error instanceof NetworkConnectionException) {
          lastError = error;
          retryCount++;
          if (retryCount >= maxRetries) {
            throw lastError;
          }
          const waitTime = Math.min(4 * Math.pow(2, retryCount - 1), 10) * 1000;
          await new Promise(resolve => setTimeout(resolve, waitTime));
        } else {
          throw error;
        }
      }
    }
  }

  _doExecuteRequest = async (request) => {
    try {
      const response = await this.httpClient.request({
        method: request.getMethod(),
        url: request.getUrl(),
        data: request.toDict()
      });

      const responseType = request.getResponseType();
      const data = response.data;

      if (Array.isArray(responseType)) {
        return data.map(item => new responseType[0](item));
      } else {
        return new responseType(data);
      }
    } catch (error) {
      if (error.response) {
        try {
          const errorData = error.response.data;
          const errorObj = new Error(errorData);
          const exception = new InvalidRequestException(request, errorObj);
          if (this.debug) {
            console.error(exception.getDebugMessage());
          }
          throw exception;
        } catch (e) {
          if (this.debug) {
            console.error(`Error validating API error response: ${e.message}`);
          }
          throw new InvalidResponseException(e.message);
        }
      } else if (error.request) {
        if (this.debug) {
          console.error(`Network error: ${error.message}`);
        }
        throw new NetworkConnectionException(error.message);
      } else {
        if (this.debug) {
          console.error(`Error processing response: ${error.message}`);
        }
        throw new InvalidResponseException(error.message);
      }
    }
  }

  handleEvent = (payload) => {
    try {
      const eventData = JSON.parse(payload);
      
      if (!eventData || typeof eventData !== 'object' || !eventData.id || !eventData.name) {
        throw new InvalidArgumentException('The payload provided does not appear to be a valid event.');
      }

      if (typeof eventData.name !== 'string') {
        throw new InvalidArgumentException('The "name" property is expected to be a string.');
      }

      // Validate event name is a known type
      if (!Object.values(EventName).includes(eventData.name)) {
        throw new InvalidArgumentException(`The event name "${eventData.name}" is invalid.`);
      }

      // Create event object
      return new Event(eventData);
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new InvalidArgumentException('The payload provided is not valid JSON.');
      }
      throw error;
    }
  }
}