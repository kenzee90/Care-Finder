import '@testing-library/jest-dom';

// Configure Jest environment
jest.setTimeout(10000); // Increase timeout for async tests

// Mock global objects if needed
global.fetch = jest.fn();

// Add custom matchers if required
expect.extend({
  // Add custom matchers here
});

// Setup any global test utilities
global.testUtils = {
  // Add test utility functions here
};
