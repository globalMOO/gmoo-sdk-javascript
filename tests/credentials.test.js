import { Credentials } from '../src/credentials.js';
import { InvalidArgumentException } from '../src/exceptions/invalid-argument.js';

describe('Credentials', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Create a clean environment for each test
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  test('init with provided values', () => {
    const credentials = new Credentials(
      'test-key',
      'https://api.test.com'
    );
    expect(credentials.getApiKey()).toBe('test-key');
    expect(credentials.getBaseUri()).toBe('https://api.test.com');
  });

  test('init from environment', () => {
    process.env.GMOO_API_KEY = 'env-key';
    process.env.GMOO_API_URI = 'https://api.env.com';

    const credentials = new Credentials(null, null, true);  // skipDotenv = true
    expect(credentials.getApiKey()).toBe('env-key');
    expect(credentials.getBaseUri()).toBe('https://api.env.com');
  });

  test('missing api key', () => {
    delete process.env.GMOO_API_KEY;
    process.env.GMOO_API_URI = 'https://api.test.com';

    expect(() => {
      new Credentials(null, null, true);
    }).toThrow(InvalidArgumentException);
  });

  test('missing base uri', () => {
    process.env.GMOO_API_KEY = 'test-key';
    delete process.env.GMOO_API_URI;

    expect(() => {
      new Credentials(null, null, true);
    }).toThrow(InvalidArgumentException);
  });

  test('provided values override environment', () => {
    process.env.GMOO_API_KEY = 'env-key';
    process.env.GMOO_API_URI = 'https://api.env.com';

    const credentials = new Credentials(
      'test-key',
      'https://api.test.com'
    );
    expect(credentials.getApiKey()).toBe('test-key');
    expect(credentials.getBaseUri()).toBe('https://api.test.com');
  });
});