export interface EnvironmentConfig {
  name: string;
  baseUrl: string;
  apiUrl: string;
  timeout: number;
  retries: number;
  headless: boolean;
  slowMo: number;
  video: 'on' | 'off' | 'retain-on-failure';
  screenshot: 'on' | 'off' | 'only-on-failure';
  trace: 'on' | 'off' | 'retain-on-failure';
}

const environments: Record<string, EnvironmentConfig> = {
  dev: {
    name: 'Development',
    baseUrl: 'https://www.saucedemo.com',
    apiUrl: 'https://api.saucedemo.com',
    timeout: 30000,
    retries: 0,
    headless: false,
    slowMo: 100,
    video: 'on',
    screenshot: 'on',
    trace: 'on'
  },
  
  staging: {
    name: 'Staging',
    baseUrl: 'https://staging.saucedemo.com',
    apiUrl: 'https://staging-api.saucedemo.com',
    timeout: 30000,
    retries: 1,
    headless: true,
    slowMo: 0,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  },
  
  prod: {
    name: 'Production',
    baseUrl: 'https://www.saucedemo.com',
    apiUrl: 'https://api.saucedemo.com',
    timeout: 60000,
    retries: 2,
    headless: true,
    slowMo: 0,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  }
};

export function getEnvironment(): EnvironmentConfig {
  const envName = process.env.ENV || 'dev';
  const config = environments[envName];
  
  if (!config) {
    console.warn(`Unknown environment: ${envName}. Defaulting to 'dev'.`);
    return environments.dev;
  }
  
  console.log(`Running tests in ${config.name} environment`);
  return config;
}

export function getEnvironmentByName(name: string): EnvironmentConfig {
  return environments[name] || environments.dev;
}

export default environments;