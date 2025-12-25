import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { WaitHelper } from '../../utils/WaitHelper';

test.describe('Authentication - Logout Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let waitHelper: WaitHelper;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    waitHelper = new WaitHelper(page);
    await loginPage.navigate();
  });

  test('TC-011: should logout successfully and redirect to login page', async ({ page }) => {
    // Login with valid credentials
    await loginPage.loginAsStandardUser();
    await inventoryPage.verifyOnInventoryPage();

    // Perform logout
    await inventoryPage.logout();

    // Wait for navigation to complete
    await waitHelper.waitForUrl('https://www.saucedemo.com/');

    // Verify redirected to login page
    await loginPage.verifyOnLoginPage();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    
    // Verify fields are empty
    await loginPage.verifyFieldsAreEmpty();
  });
});