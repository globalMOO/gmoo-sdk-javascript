import { jest } from '@jest/globals';
import { Client } from '../src/client.js';
import { Credentials } from '../src/credentials.js';
import { InvalidArgumentException } from '../src/exceptions/invalid-argument.js';
import { Project } from '../src/models/project.js';
import { Inverse } from '../src/models/inverse.js';
import { EventName } from '../src/enums/event-name.js';

// Mock http client
const mockHttpClient = {
  request: jest.fn(),
  defaults: {
    headers: {}
  }
};

describe('Client Event Handling', () => {
  let client;

  beforeEach(() => {
    mockHttpClient.request.mockClear();
    client = new Client(new Credentials('test-key', 'https://test.api'), mockHttpClient);
  });

  test('handle project.created event', () => {
    const payload = JSON.stringify({
      id: 1,
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
      disabledAt: null,
      name: "project.created",
      subject: "test-subject",
      data: {
        id: 1,
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",
        disabledAt: null,
        developedAt: null,
        inputCount: 2,
        minimums: [0.0, 0.0],
        maximums: [1.0, 1.0],
        inputTypes: ["float", "float"],
        categories: [],
        inputCases: [[0.5, 0.5]],
        caseCount: 1,
        name: 'test_project'
      }
    });

    const event = client.handleEvent(payload);
    expect(event.name).toBe(EventName.PROJECT_CREATED);
    expect(event.data).toBeInstanceOf(Project);
  });

  test('handle inverse.suggested event', () => {
    const payload = JSON.stringify({
      id: 1,
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
      disabledAt: null,
      name: "inverse.suggested",
      subject: "test-subject",
      data: {
        id: 1,
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",
        disabledAt: null,
        loadedAt: null,
        satisfiedAt: null,
        stoppedAt: null,
        exhaustedAt: null,
        iteration: 1,
        input: [0.5, 1.0],
        suggestTime: 0,
        computeTime: 0
      }
    });

    const event = client.handleEvent(payload);
    expect(event.name).toBe(EventName.INVERSE_SUGGESTED);
    expect(event.data).toBeInstanceOf(Inverse);
  });

  test('handle invalid JSON payload', () => {
    expect(() => {
      client.handleEvent('invalid json');
    }).toThrow(InvalidArgumentException);
  });

  test('handle missing required fields', () => {
    expect(() => {
      client.handleEvent('{"foo": "bar"}');
    }).toThrow(InvalidArgumentException);
  });

  test('handle invalid event name', () => {
    expect(() => {
      client.handleEvent(JSON.stringify({
        id: 1,
        name: "invalid.event",
        data: {}
      }));
    }).toThrow(/The event name .* is invalid/);
  });
});

describe('Client Request Execution', () => {
  let client;

  beforeEach(() => {
    mockHttpClient.request.mockClear();
    client = new Client(
      new Credentials('test-key', 'https://test.api'),
      mockHttpClient
    );
  });

  test('sets authorization header', () => {
    expect(mockHttpClient.defaults.headers).toEqual(
      expect.objectContaining({
        'Authorization': 'Bearer test-key'
      })
    );
  });

  // Add more request execution tests here
});