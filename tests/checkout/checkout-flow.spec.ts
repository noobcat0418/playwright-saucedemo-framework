import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { WaitHelper } from '../../utils/WaitHelper';
import { DataGenerator } from '../../utils/DataGenerator';

test.describe('Checkout Flow Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let waitHelper: WaitHelper;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    waitHelper = new WaitHelper(page);
    await loginPage.navigate();
    await loginPage.loginAsStandardUser();
  });

  test('TC-015: should complete checkout process end-to-end', async () => {
    // Add product to cart
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    
    // Go to cart
    await inventoryPage.goToCart();
    await cartPage.verifyOnCartPage();
    
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyOnStepOne();
    
    // Fill customer information using DataGenerator
    const customerInfo = DataGenerator.generateCustomerInfo();
    await checkoutPage.fillCustomerInfo(
      customerInfo.firstName,
      customerInfo.lastName,
      customerInfo.postalCode
    );
    await checkoutPage.clickContinue();
    
    // Verify on overview page
    await checkoutPage.verifyOnStepTwo();
    
    // Complete purchase
    await checkoutPage.clickFinish();
    
    // Verify order completion
    await checkoutPage.verifyOnComplete();
  });

  test('TC-016: should show error when first name is missing', async () => {
    // Add product and go to checkout
    await inventoryPage.addToCartByName('Sauce Labs Bike Light');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    
    // Leave first name empty, fill others
    await checkoutPage.fillCustomerInfo('', 'Doe', '12345');
    await checkoutPage.clickContinue();
    
    // Verify error message
    await checkoutPage.verifyErrorMessage('First Name is required');
    
    // Verify still on step one
    await checkoutPage.verifyOnStepOne();
  });

  test('TC-020: should calculate checkout totals correctly', async () => {
    const backpackPrice = 29.99;
    const bikeLightPrice = 9.99;
    const expectedItemTotal = backpackPrice + bikeLightPrice; // $39.98
    const expectedTax = 3.20; // ~8% tax
    const expectedGrandTotal = expectedItemTotal + expectedTax; // $43.18
    
    // Add both products
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.addToCartByName('Sauce Labs Bike Light');
    
    // Proceed to checkout overview
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCustomerInfo('Test', 'User', '00000');
    await checkoutPage.clickContinue();
    
    // Verify calculations
    const itemTotal = await checkoutPage.getItemTotal();
    const tax = await checkoutPage.getTax();
    const grandTotal = await checkoutPage.getGrandTotal();
    
    expect(itemTotal).toBeCloseTo(expectedItemTotal, 2);
    expect(tax).toBeCloseTo(expectedTax, 2);
    expect(grandTotal).toBeCloseTo(expectedGrandTotal, 2);
    
    // Verify both items in summary
    const itemCount = await checkoutPage.getSummaryItemCount();
    expect(itemCount).toBe(2);
  });
});