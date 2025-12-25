import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,
  
  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['list'],
    ['json', { outputFile: 'reports/json-report/results.json' }],
    ['junit', { outputFile: 'reports/junit-report/results.xml' }]
  ],
  
  // Output directories
  outputDir: 'reports/test-results',
  snapshotDir: 'reports/snapshots',
  
  // Global settings
  timeout: 30000,
  expect: {
    timeout: 5000,
    toHaveScreenshot: {
      maxDiffPixels: 100,
      threshold: 0.1,
      animations: 'disabled'
    },
    toMatchSnapshot: {
      maxDiffPixels: 100,
      threshold: 0.1
    }
  },
  
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
    viewport: { width: 1920, height: 1080 },
    locale: 'en-US',
    colorScheme: 'light'
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});