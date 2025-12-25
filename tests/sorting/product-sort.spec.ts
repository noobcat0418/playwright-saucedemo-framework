import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { WaitHelper } from '../../utils/WaitHelper';

test.describe('Product Sorting Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let waitHelper: WaitHelper;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    waitHelper = new WaitHelper(page);
    await loginPage.navigate();
    await loginPage.loginAsStandardUser();
    await inventoryPage.verifyOnInventoryPage();
  });

  test('TC-012: should sort products by price low to high', async () => {
    await inventoryPage.sortBy('lohi');
    await waitHelper.delay(500);
    
    const prices = await inventoryPage.getProductPrices();
    
    // Verify prices are in ascending order
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
    
    // Verify first item is lowest price ($7.99 - Onesie)
    expect(prices[0]).toBe(7.99);
    
    // Verify last item is highest price ($49.99 - Fleece Jacket)
    expect(prices[prices.length - 1]).toBe(49.99);
  });

  test('TC-013: should sort products by name Z to A', async () => {
    await inventoryPage.sortBy('za');
    await waitHelper.delay(500);
    
    const names = await inventoryPage.getProductNames();
    
    // Verify names are in descending alphabetical order
    for (let i = 0; i < names.length - 1; i++) {
      expect(names[i].localeCompare(names[i + 1])).toBeGreaterThanOrEqual(0);
    }
    
    // Verify first item starts with 'T' (Test.allTheThings())
    expect(names[0]).toContain('Test.allTheThings()');
    
    // Verify last item starts with 'S' (Sauce Labs Backpack)
    expect(names[names.length - 1]).toBe('Sauce Labs Backpack');
  });
});