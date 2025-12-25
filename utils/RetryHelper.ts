import { Page } from '@playwright/test';

/**
 * RetryHelper - Utilities for handling flaky operations with retry logic
 * Useful for unstable elements or network-dependent actions
 */
export class RetryHelper {
  private page: Page;
  private defaultRetries: number;
  private defaultDelay: number;

  constructor(page: Page, defaultRetries: number = 3, defaultDelay: number = 1000) {
    this.page = page;
    this.defaultRetries = defaultRetries;
    this.defaultDelay = defaultDelay;
  }

  /**
   * Retry an async operation until success or max retries reached
   * @param operation - Async function to retry
   * @param retries - Number of retry attempts (default: 3)
   * @param delay - Delay between retries in ms (default: 1000)
   * @returns Result of the operation
   */
  async retry<T>(
    operation: () => Promise<T>,
    retries: number = this.defaultRetries,
    delay: number = this.defaultDelay
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        console.log(`Attempt ${attempt}/${retries} failed: ${lastError.message}`);
        
        if (attempt < retries) {
          await this.page.waitForTimeout(delay);
        }
      }
    }

    throw new Error(`Operation failed after ${retries} attempts. Last error: ${lastError?.message}`);
  }

  /**
   * Retry click operation on potentially stale/dynamic elements
   * @param selector - CSS selector for element
   * @param retries - Number of retry attempts
   */
  async retryClick(selector: string, retries: number = this.defaultRetries): Promise<void> {
    await this.retry(async () => {
      await this.page.click(selector);
    }, retries);
  }

  /**
   * Retry fill operation on input fields
   * @param selector - CSS selector for input
   * @param value - Value to fill
   * @param retries - Number of retry attempts
   */
  async retryFill(selector: string, value: string, retries: number = this.defaultRetries): Promise<void> {
    await this.retry(async () => {
      await this.page.fill(selector, value);
    }, retries);
  }

  /**
   * Retry until condition is met
   * @param condition - Function that returns boolean
   * @param retries - Number of retry attempts
   * @param delay - Delay between checks in ms
   */
  async retryUntil(
    condition: () => Promise<boolean>,
    retries: number = this.defaultRetries,
    delay: number = this.defaultDelay
  ): Promise<boolean> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      const result = await condition();
      if (result) return true;
      
      if (attempt < retries) {
        await this.page.waitForTimeout(delay);
      }
    }
    return false;
  }

  /**
   * Retry navigation with error handling
   * @param url - URL to navigate to
   * @param retries - Number of retry attempts
   */
  async retryNavigation(url: string, retries: number = this.defaultRetries): Promise<void> {
    await this.retry(async () => {
      await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }, retries);
  }

  /**
   * Execute operation with exponential backoff
   * @param operation - Async function to execute
   * @param maxRetries - Maximum number of retries
   * @param baseDelay - Initial delay in ms (doubles each retry)
   */
  async withExponentialBackoff<T>(
    operation: () => Promise<T>,
    maxRetries: number = 5,
    baseDelay: number = 500
  ): Promise<T> {
    let lastError: Error | null = null;
    let currentDelay = baseDelay;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        console.log(`Attempt ${attempt}/${maxRetries} failed. Retrying in ${currentDelay}ms...`);
        
        if (attempt < maxRetries) {
          await this.page.waitForTimeout(currentDelay);
          currentDelay *= 2; // Double the delay for next attempt
        }
      }
    }

    throw new Error(`Operation failed after ${maxRetries} attempts with exponential backoff. Last error: ${lastError?.message}`);
  }
}