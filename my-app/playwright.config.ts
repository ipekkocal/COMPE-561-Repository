import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests/e2e', // Directory for your test files
  timeout: 30000,   // Maximum time one test can run
  retries: 1,       // Retry failed tests once
  use: {
    headless: true,  // Run tests in headless mode
    baseURL: 'http://localhost:3000', // Base URL for your application
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
