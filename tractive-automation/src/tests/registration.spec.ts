import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { cookies } from '../utils/constants';

test.describe('Registration Tests',
    { tag: ['@register'] },
    () => {
    let loginPage: LoginPage;
    let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    registrationPage = new RegistrationPage(page);

    await loginPage.setCookies(cookies);
    await loginPage.navigate();
  });
    
  test('Verify New User Registration', async () => {
    await loginPage.clickCreateAccountLink();
    await registrationPage.waitForSignUpForm();
    await registrationPage.fillRegistrationForm();
    await registrationPage.clickCreateAccountBtn();
    await registrationPage.waitForSubmit();

    expect(loginPage.page.url()).toContain('/activation/');
  });

});
