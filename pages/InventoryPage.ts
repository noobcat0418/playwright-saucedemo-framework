import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly hamburgerMenu: Locator;
  readonly logoutLink: Locator;
  readonly aboutLink: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;
  readonly inventoryItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hamburgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.aboutLink = page.locator('#about_sidebar_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.inventoryItems = page.locator('.inventory_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
  }

  async verifyOnInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory.html/);
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.hamburgerMenu.click();
    await this.logoutLink.click();
  }

  async clickAbout(): Promise<void> {
    await this.hamburgerMenu.click();
    await this.aboutLink.click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async addToCartByName(productName: string): Promise<void> {
    const item = this.page.locator('.inventory_item').filter({ hasText: productName });
    await item.locator('button').click();
  }

  async clickProductByName(productName: string): Promise<void> {
    await this.page.locator('.inventory_item_name', { hasText: productName }).click();
  }

  async getCartBadgeCount(): Promise<number> {
    const isVisible = await this.cartBadge.isVisible();
    if (!isVisible) return 0;
    const text = await this.cartBadge.textContent();
    return parseInt(text || '0', 10);
  }

  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }

  async getProductNames(): Promise<string[]> {
    return await this.itemNames.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.itemPrices.allTextContents();
    return priceTexts.map(p => parseFloat(p.replace('$', '')));
  }

  async verifyProductHasRemoveButton(productName: string): Promise<void> {
    const item = this.page.locator('.inventory_item').filter({ hasText: productName });
    await expect(item.locator('button')).toHaveText('Remove');
  }
}