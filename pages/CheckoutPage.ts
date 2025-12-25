import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  // Step One - Customer Information
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  // Step Two - Overview
  readonly itemTotal: Locator;
  readonly taxTotal: Locator;
  readonly grandTotal: Locator;
  readonly finishButton: Locator;
  readonly summaryItems: Locator;
  // Complete
  readonly completeHeader: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Step One
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
    // Step Two
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.taxTotal = page.locator('.summary_tax_label');
    this.grandTotal = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
    this.summaryItems = page.locator('.cart_item');
    // Complete
    this.completeHeader = page.locator('.complete-header');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  async verifyOnStepOne(): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout-step-one.html/);
  }

  async verifyOnStepTwo(): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout-step-two.html/);
  }

  async verifyOnComplete(): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout-complete.html/);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }

  async verifyErrorMessage(expectedError: string): Promise<void> {
    await expect(this.errorMessage).toContainText(expectedError);
  }

  async getItemTotal(): Promise<number> {
    const text = await this.itemTotal.textContent();
    return parseFloat(text?.replace('Item total: $', '') || '0');
  }

  async getTax(): Promise<number> {
    const text = await this.taxTotal.textContent();
    return parseFloat(text?.replace('Tax: $', '') || '0');
  }

  async getGrandTotal(): Promise<number> {
    const text = await this.grandTotal.textContent();
    return parseFloat(text?.replace('Total: $', '') || '0');
  }

  async getSummaryItemCount(): Promise<number> {
    return await this.summaryItems.count();
  }
}