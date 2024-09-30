import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    browserName: 'chromium', // Or 'firefox', 'webkit'
    headless: false,         // Set to 'true' if you want to run headless
    screenshot: 'on',        // Take screenshot on failure
    video: 'on',             // Record videos on failure
    baseURL: 'https://my-stage.tractive.com/', // Your base URL
  },
  testDir: 'src/tests',      // Directory where test files are stored
  timeout: 30000,            // Timeout for each test
  reporter: [['html', { outputFolder: 'playwright-results/html', open: 'never' }]], // Generate HTML report
  outputDir: '',
};

export default config;
