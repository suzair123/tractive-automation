import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  // Locators
  private emailInput = 'input[ng-model="form.email"]';
  private passwordInput = 'input[ng-model="form.pwd"]';
  private signInButton = 'button.tcommon-button--cta[type="submit"]';
  private toastError = 'div.toast.toast-error';
  private createAccountLink = 'a[ui-sref="^.signup"]';

  constructor(page: Page) {
    this.page = page;
  }

  // Method to set cookies
  async setCookies(cookies: { name: string; value: string; domain: string; path?: string; httpOnly?: boolean; secure?: boolean; expires?: number; }[]) {
    await this.page.context().addCookies(cookies);
  }

  // Method to navigate to the home page
  async navigate() {
    await this.page.goto('/');
  }

  // Method to perform login
  async login(username: string, password: string) {
    await this.enterEmail(username);
    await this.enterPassword(password);
    await this.clickSignInButton();
  }

  // Method to enter email
  async enterEmail(username: string) {
    await this.page.fill(this.emailInput, username);
  }

  // Method to enter password
  async enterPassword(password: string) {
    await this.page.fill(this.passwordInput, password);
  }

  // Method to click the sign-in button
  async clickSignInButton() {
    await this.page.click(this.signInButton);
  }

  // Method to wait for the submit button to disappear
  async waitForSubmit(waitTime: number) {
    await this.page.waitForSelector(this.signInButton, { state: 'hidden', timeout: waitTime });
  }

  // Method to get the toast error message
  async getToastMessage(): Promise<string | null> {
    const toast = await this.page.waitForSelector(this.toastError, { timeout: 5000 });
    
    if (toast) {
      const toastText = await toast.textContent();
      return toastText;
    }
    return null;
  }
  
  async clickCreateAccountLink() {
      await this.page.click(this.createAccountLink); // Selector for Create Account link
    }
}
