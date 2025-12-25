import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { WaitHelper } from '../../utils/WaitHelper';

test.describe('Visual Regression Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let waitHelper: WaitHelper;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    waitHelper = new WaitHelper(page);
  });

  test.describe('Login Page Visuals', () => {
    test('VIS-001: login page default state', async ({ page }) => {
      await loginPage.navigate();
      await waitHelper.waitForNetworkIdle();
      
      await expect(page).toHaveScreenshot('login-page-default.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('VIS-002: login page with error message', async ({ page }) => {
      await loginPage.navigate();
      await loginPage.login('invalid_user', 'wrong_password');
      await waitHelper.delay(300);
      
      await expect(page).toHaveScreenshot('login-page-error.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('VIS-003: login page locked out error', async ({ page }) => {
      await loginPage.navigate();
      await loginPage.login('locked_out_user', 'secret_sauce');
      await waitHelper.delay(300);
      
      await expect(page).toHaveScreenshot('login-page-locked-out.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });
  });

  test.describe('Inventory Page Visuals', () => {
    test.beforeEach(async () => {
      await loginPage.navigate();
      await loginPage.loginAsStandardUser();
      await inventoryPage.verifyOnInventoryPage();
    });

    test('VIS-004: inventory page default state', async ({ page }) => {
      await waitHelper.waitForNetworkIdle();
      
      await expect(page).toHaveScreenshot('inventory-page-default.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('VIS-005: inventory page with open menu', async ({ page }) => {
      await page.locator('#react-burger-menu-btn').click();
      await waitHelper.delay(500);
      
      await expect(page).toHaveScreenshot('inventory-page-menu-open.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('VIS-006: single product card', async ({ page }) => {
      const productCard = page.locator('.inventory_item').first();
      await expect(productCard).toHaveScreenshot('product-card-default.png');
    });
  });

  test.describe('Responsive Visuals', () => {
    test('VIS-007: login page mobile view', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await loginPage.navigate();
      await waitHelper.waitForNetworkIdle();
      
      await expect(page).toHaveScreenshot('login-page-mobile.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('VIS-008: inventory page tablet view', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await loginPage.navigate();
      await loginPage.loginAsStandardUser();
      await waitHelper.waitForNetworkIdle();
      
      await expect(page).toHaveScreenshot('inventory-page-tablet.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });
  });
});