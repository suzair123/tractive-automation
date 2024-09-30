import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { cookies, data } from '../utils/constants';
import { credentials } from '../utils/credentials';

test.describe('Login Tests',
  { tag: ['@login'] },
  () => {
  let loginPage: LoginPage;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.setCookies(cookies);
    await loginPage.navigate();
  });

  test('Verify login successfully with valid credentials', async ({ page }) => {
    await loginPage.login(credentials.validUser.email, credentials.validUser.password);
    await loginPage.waitForSubmit(3000);
    expect(loginPage.page.url()).toContain('/settings/');
  });

  test('Verify login unsuccessful with invalid credentials', async ({ page }) => {
    await loginPage.login(credentials.invalidUser.email, credentials.invalidUser.password);
    const toastMessage = await loginPage.getToastMessage();
    expect(toastMessage).toContain(data.toastError);
  });
});
