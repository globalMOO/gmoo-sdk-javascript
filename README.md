# globalMOO JavaScript SDK

A JavaScript SDK for interacting with the globalMOO API, providing a simple and intuitive interface for optimization tasks.

## Features

- Full support for the globalMOO API
- Automatic error handling with clear error messages
- Promise-based API for easy async/await usage
- Comprehensive type definitions
- Support for all optimization workflows

## Requirements

- Node.js 14.0 or higher
- Valid globalMOO API credentials

## Installation

```bash
npm install @globalmoo/globalmoo-sdk
```

## Authentication

There are two ways to provide your API credentials:

### Using Environment Variables

1. Create a `.env` file in your project root:
```
GMOO_API_KEY=your-api-key
GMOO_API_URI=https://app.globalmoo.com/api/
```

2. Initialize the client without explicit credentials:
```javascript
import { Client } from '@globalmoo/globalmoo-sdk';

const client = new Client();
```

### Passing Credentials Explicitly

```javascript
import { Client, Credentials } from '@globalmoo/globalmoo-sdk';

const credentials = new Credentials(
  "your-api-key",
  "https://app.globalmoo.com/api/"
);

const client = new Client(credentials);
```

## Quick Start Example

Here's a simple example showing how to optimize a mathematical function:

```javascript
import { 
  Client, 
  CreateModel,
  CreateProject,
  LoadOutputCases,
  LoadObjectives,
  SuggestInverse,
  LoadInversedOutput,
  ObjectiveType 
} from '@globalmoo/globalmoo-sdk';

import dotenv from 'dotenv';

// Simple linear function
function linearFunction(inputs) {
  const [x, y] = inputs;
  return [
    x + y,          // Output 1: simple sum
    2 * x + y,      // Output 2: weighted sum
    x + 2 * y       // Output 3: different weighted sum
  ];
}

async function main() {
  // Load environment variables
  dotenv.config();

  try {
    // Initialize client
    const client = new Client();
    console.log("Successfully initialized globalMOO client");

    // Create model
    const model = await client.executeRequest(
      new CreateModel("Linear Function Example", "A simple example demonstrating linear function optimization")
    );
    console.log(`Created model with ID: ${model.id}`);

    // Create project with input specifications
    const project = await client.executeRequest(
      new CreateProject(
        model.id,
        2,              // input_count
        [0.0, 0.0],     // minimums
        [10.0, 10.0],   // maximums
        ["float", "float"], // input_types
        [],             // categories (empty list)
        "README Example"  // project name
      )
    );
    console.log(`Created project with ID: ${project.id}`);

    // Get input cases from the project and compute outputs
    const inputCases = project.input_cases;
    console.log(`Received ${inputCases.length} input cases`);
    
    const outputCases = inputCases.map(linearFunction);
    console.log(`Computed ${outputCases.length} output cases`);

    // Create trial with computed outputs
    const trial = await client.executeRequest(
      new LoadOutputCases(
        project.id,
        3,           // output_count
        outputCases
      )
    );
    console.log(`Successfully created trial with ID: ${trial.id}`);

    // Set optimization objectives
    const targetValues = [2.0, 3.0, 3.0];
    const objective = await client.executeRequest(
      new LoadObjectives({
        trialId: trial.id,
        desiredL1Norm: 0.0,
        objectives: targetValues,
        objectiveTypes: Array(3).fill(ObjectiveType.PERCENT),
        initialInput: inputCases[0],
        initialOutput: outputCases[0],
        minimumBounds: [-1.0, -1.0, -1.0],
        maximumBounds: [1.0, 1.0, 1.0]
      })
    );
    console.log("Initialized inverse optimization");

    // Run inverse optimization loop
    const maxIterations = 10;
    for (let iteration = 0; iteration < maxIterations; iteration++) {
      // Get next suggested inputs to try
      const inverse = await client.executeRequest(
        new SuggestInverse(objective.id)
      );
      console.log(`Iteration ${iteration + 1}: Received suggestion`);

      // Run the function with suggested inputs
      const nextOutput = linearFunction(inverse.input);

      // Report results back to the API
      const result = await client.executeRequest(
        new LoadInversedOutput(inverse.id, nextOutput)
      );

      // Log results
      console.log("\nCurrent solution details:");
      console.log(`Input: ${JSON.stringify(inverse.input)}`);
      console.log(`Output: ${JSON.stringify(nextOutput)}`);
      console.log(`Target: ${JSON.stringify(targetValues)}`);

      if (result.results) {
        result.results.forEach((r, i) => {
          console.log(`Objective ${i}: ${r.satisfied ? '✓' : '✗'} - ${r.detail}`);
          console.log(`    Type: ${r.objective_type}`);
          console.log(`    Error: ${r.error}`);
        });
      }

      // Check if optimization is complete
      if (result.shouldStop()) {
        console.log(`Optimization stopped: ${result.getStopReasonDescription()}`);
        break;
      }

      console.log(`Completed iteration ${iteration + 1}`);
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```

## Error Handling

The SDK provides detailed error messages for easier debugging:

```javascript
try {
  const model = await client.executeRequest(
    new CreateModel("") // Invalid request - name is required
  );
} catch (error) {
  console.error(`API error: ${error.message}`);
  // Will show specific validation errors
}
```

## Documentation

For comprehensive documentation and API reference, visit our [globalMOO Documentation](https://globalmoo.gitbook.io/globalmoo-documentation).

## Development

If you're contributing to or modifying the SDK:

1. Clone the repository:
```bash
git clone https://github.com/globalmoo/gmoo-sdk-javascript.git
cd gmoo-sdk-javascript
```

2. Install dependencies:
```bash
npm install
```

3. Run tests:
```bash
npm test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact support@globalmoo.com or create an issue on our [GitHub repository](https://github.com/globalmoo/gmoo-sdk-javascript/issues).
