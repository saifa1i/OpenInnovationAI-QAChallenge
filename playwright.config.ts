import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: [
    ['html', {open: 'never'}],
    ['junit', {outputFile: 'results.xml'}]
  ],
  use: {
    baseURL: 'http://0.0.0.0:8000/',
    extraHTTPHeaders: {
      'Accept': 'application/json'
    },
    trace: 'on-first-retry',
  },

  
});
