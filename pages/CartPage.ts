import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartItems: Locator;
  readonly removeButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartItems = page.locator('.cart_item');
    this.removeButtons = page.locator('button[data-test^="remove-"]');
  }

  async verifyOnCartPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*cart.html/);
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getCartItemNames(): Promise<string[]> {
    return await this.page.locator('.cart_item .inventory_item_name').allTextContents();
  }

  async removeItemByName(productName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: productName });
    await item.locator('button').click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async verifyProductInCart(productName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: productName });
    await expect(item).toBeVisible();
  }

  async verifyCartIsEmpty(): Promise<void> {
    await expect(this.cartItems).toHaveCount(0);
  }
}