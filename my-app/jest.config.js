module.exports = {
    // Automatically clear mock calls, instances, contexts, and results before every test
    clearMocks: true,
  
    coverageReporters: ['json'],
    
    // Collect coverage information while running tests
    collectCoverage: true,
  
    // Specify which files to collect coverage from
    collectCoverageFrom: [
      '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
      '!<rootDir>/src/**/*.d.ts',
      '!<rootDir>/src/**/index.{js,jsx,ts,tsx}',
      '!<rootDir>/node_modules/',
    ],
  
    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',
  
    // Use v8 for coverage instrumentation
    coverageProvider: 'v8',
  
    // Test environment (ensure jsdom is properly installed)
    testEnvironment: 'jest-environment-jsdom',
  
    // Glob patterns Jest uses to detect test files
    testMatch: [
      '<rootDir>/src/**/*.(test|spec).{js,jsx,ts,tsx}',
      '<rootDir>/__tests__/**/*.(test|spec).{js,jsx,ts,tsx}',
    ],
  
    // Add setup files to configure the testing environment
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
    // Module name mapper for mocking static files and module aliases
    moduleNameMapper: {
      '\\.(css|scss|sass|less)$': 'identity-obj-proxy', // Mock CSS files
      '^@/(.*)$': '<rootDir>/src/$1', // Support module alias @/ for src
      '^lucide-react$': '<rootDir>/node_modules/lucide-react', // Ensure lucide-react is correctly resolved
    },
    
  
    // Transform files before testing using Babel
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    },
  
    // Ignore transformation for node_modules except for specific packages
    transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  
    // Ignore test paths in these directories
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  
    // Watchman configuration for file crawling
    watchman: true,
  
    // Display detailed test results
    verbose: true,
  };
  