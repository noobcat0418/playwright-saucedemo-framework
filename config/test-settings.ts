export const TestSettings = {
  // Timeout configurations (in milliseconds)
  timeouts: {
    default: 30000,
    action: 10000,
    navigation: 30000,
    assertion: 5000,
    animation: 500,
    apiResponse: 15000,
    fileUpload: 60000,
    pageLoad: 45000
  },

  // Retry configurations
  retry: {
    maxAttempts: 3,
    delayBetweenRetries: 1000,
    exponentialBackoff: true
  },

  // Visual testing settings
  visual: {
    threshold: 0.1,
    maxDiffPixels: 100,
    animations: 'disabled' as const,
    scale: 'css' as const
  },

  // Browser configurations
  browser: {
    viewport: {
      width: 1920,
      height: 1080
    },
    locale: 'en-US',
    timezoneId: 'America/New_York',
    colorScheme: 'light' as const
  },

  // Report settings
  reports: {
    screenshotOnFailure: true,
    videoOnFailure: true,
    traceOnFailure: true,
    htmlReportOpen: 'never' as const
  },

  // Parallel execution
  parallel: {
    workers: 4,
    fullyParallel: true
  }
};

// Sauce Demo specific settings
export const SauceDemoSettings = {
  users: {
    standard: { username: 'standard_user', password: 'secret_sauce' },
    locked: { username: 'locked_out_user', password: 'secret_sauce' },
    problem: { username: 'problem_user', password: 'secret_sauce' },
    performance: { username: 'performance_glitch_user', password: 'secret_sauce' },
    error: { username: 'error_user', password: 'secret_sauce' },
    visual: { username: 'visual_user', password: 'secret_sauce' }
  },

  products: {
    backpack: 29.99,
    bikeLight: 9.99,
    boltTShirt: 15.99,
    fleeceJacket: 49.99,
    onesie: 7.99,
    redTShirt: 15.99
  },

  taxRate: 0.08
};

export default TestSettings;