// File: src/credentials.js
import dotenv from 'dotenv';
import { InvalidArgumentException } from './exceptions/index.js';

export class Credentials {
  #apiKey;
  #baseUri;
  #validateTls;

  constructor(apiKey = null, baseUri = null, skipDotenv = false, validateTls = true) {
    this.#validateTls = validateTls;
    if (!skipDotenv) {
      dotenv.config();
    }

    this.#apiKey = apiKey || process.env.GMOO_API_KEY;
    if (!this.#apiKey) {
      throw new InvalidArgumentException(
        'The globalMOO SDK could not be created because the "GMOO_API_KEY" ' +
        'environment variable is not set and no API key was provided.'
      );
    }

    this.#baseUri = baseUri || process.env.GMOO_API_URI;
    if (!this.#baseUri) {
      throw new InvalidArgumentException(
        'The globalMOO SDK could not be created because the "GMOO_API_URI" ' +
        'environment variable is not set and no base URI was provided.'
      );
    }

    if (this.#validateTls && this.#baseUri.includes('globalmoo.ai') && !this.#validateTls) {
      throw new InvalidArgumentException(
        'TLS validation must be enabled when using official globalmoo.ai domains'
      );
    }
  }

  getApiKey = () => {
    return this.#apiKey;
  }

  getBaseUri = () => {
    return this.#baseUri;
  }

  shouldValidateTls = () => {
    return this.#validateTls;
  }
}