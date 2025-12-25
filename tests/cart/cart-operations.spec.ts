import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { WaitHelper } from '../../utils/WaitHelper';

test.describe('Product Details Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let productDetailPage: ProductDetailPage;
  let waitHelper: WaitHelper;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    productDetailPage = new ProductDetailPage(page);
    waitHelper = new WaitHelper(page);
    await loginPage.navigate();
    await loginPage.loginAsStandardUser();
  });

  test('TC-014: should navigate to product details page with all elements', async ({ page }) => {
    const productName = 'Sauce Labs Backpack';
    const expectedPrice = 29.99;
    
    // Click on product name
    await inventoryPage.clickProductByName(productName);
    
    // Wait for navigation
    await waitHelper.waitForUrl(/.*inventory-item.html/);
    
    // Verify on product detail page
    await productDetailPage.verifyOnProductDetailPage();
    await expect(page).toHaveURL(/.*inventory-item.html/);
    
    // Verify product details
    await productDetailPage.verifyProductDetails(productName, expectedPrice);
    
    // Verify Add to cart button is visible
    await productDetailPage.verifyAddToCartButtonVisible();
    
    // Verify Back to products link is visible
    await productDetailPage.verifyBackLinkVisible();
  });
});