import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly productImage: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly backToProductsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('.inventory_details_name');
    this.productDescription = page.locator('.inventory_details_desc');
    this.productPrice = page.locator('.inventory_details_price');
    this.productImage = page.locator('.inventory_details_img');
    this.addToCartButton = page.locator('[data-test^="add-to-cart"]');
    this.removeButton = page.locator('[data-test^="remove"]');
    this.backToProductsLink = page.locator('[data-test="back-to-products"]');
  }

  async verifyOnProductDetailPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory-item.html/);
    await expect(this.productName).toBeVisible();
    await expect(this.productImage).toBeVisible();
  }

  async getProductName(): Promise<string> {
    return await this.productName.textContent() || '';
  }

  async getProductPrice(): Promise<number> {
    const text = await this.productPrice.textContent();
    return parseFloat(text?.replace('$', '') || '0');
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async goBackToProducts(): Promise<void> {
    await this.backToProductsLink.click();
  }

  async verifyProductDetails(name: string, price: number): Promise<void> {
    await expect(this.productName).toHaveText(name);
    await expect(this.productPrice).toContainText(`$${price}`);
  }

  async verifyAddToCartButtonVisible(): Promise<void> {
    await expect(this.addToCartButton).toBeVisible();
  }

  async verifyBackLinkVisible(): Promise<void> {
    await expect(this.backToProductsLink).toBeVisible();
  }
}