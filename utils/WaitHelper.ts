import { Page, Locator, expect } from '@playwright/test';

/**
 * WaitHelper - Custom wait utilities for handling dynamic elements
 * Provides explicit waits beyond Playwright's auto-waiting
 */
export class WaitHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Wait for element to be visible with custom timeout
   * @param locator - Element locator
   * @param timeout - Max wait time in milliseconds (default: 10000)
   */
  async waitForVisible(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden/removed from DOM
   * @param locator - Element locator
   * @param timeout - Max wait time in milliseconds (default: 10000)
   */
  async waitForHidden(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Wait for element to be attached to DOM (visible or not)
   * @param locator - Element locator
   * @param timeout - Max wait time in milliseconds (default: 10000)
   */
  async waitForAttached(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'attached', timeout });
  }

  /**
   * Wait for page to reach specific URL pattern
   * @param urlPattern - String or RegExp pattern to match
   * @param timeout - Max wait time in milliseconds (default: 30000)
   */
  async waitForUrl(urlPattern: string | RegExp, timeout: number = 30000): Promise<void> {
    await this.page.waitForURL(urlPattern, { timeout });
  }

  /**
   * Wait for network to be idle (no pending requests)
   * @param timeout - Max wait time in milliseconds (default: 30000)
   */
  async waitForNetworkIdle(timeout: number = 30000): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Wait for DOM content to be fully loaded
   * @param timeout - Max wait time in milliseconds (default: 30000)
   */
  async waitForDomLoaded(timeout: number = 30000): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded', { timeout });
  }

  /**
   * Wait for specific text to appear in element
   * @param locator - Element locator
   * @param text - Text to wait for
   * @param timeout - Max wait time in milliseconds (default: 10000)
   */
  async waitForText(locator: Locator, text: string, timeout: number = 10000): Promise<void> {
    await expect(locator).toHaveText(text, { timeout });
  }

  /**
   * Wait for element to contain specific text
   * @param locator - Element locator
   * @param text - Partial text to wait for
   * @param timeout - Max wait time in milliseconds (default: 10000)
   */
  async waitForContainsText(locator: Locator, text: string, timeout: number = 10000): Promise<void> {
    await expect(locator).toContainText(text, { timeout });
  }

  /**
   * Wait for element count to match expected value
   * @param locator - Element locator
   * @param count - Expected count
   * @param timeout - Max wait time in milliseconds (default: 10000)
   */
  async waitForCount(locator: Locator, count: number, timeout: number = 10000): Promise<void> {
    await expect(locator).toHaveCount(count, { timeout });
  }

  /**
   * Custom delay/sleep (use sparingly - prefer explicit waits)
   * @param ms - Milliseconds to wait
   */
  async delay(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Wait for element to be enabled and clickable
   * @param locator - Element locator
   * @param timeout - Max wait time in milliseconds (default: 10000)
   */
  async waitForClickable(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await expect(locator).toBeEnabled({ timeout });
  }
}