import { Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class RegistrationPage {
  readonly page: Page;

  // Locators
  private signUpForm = 'form[name="signUpForm"]';
  private firnameInput = 'input[ng-model="form.firstName"]';
  private lastnameInput = 'input[ng-model="form.lastName"]';
  private emailInput = 'input[ng-model="form.email"]';
  private passwordInput = 'input[ng-model="form.pwd"]';
  private createAccountButton = 'button.tcommon-button--cta[type="submit"]';

  constructor(page: Page) {
    this.page = page;
  }

  async waitForSignUpForm(timout: number = 1000){
    await this.page.waitForSelector(this.signUpForm, { state: 'visible', timeout: timout });
  }

  // Method to fill in the registration form
  async fillRegistrationForm() {
    const firstName = faker.person.firstName(); 
    const lastName = faker.person.lastName(); 
    const randomDigits = faker.string.numeric(3);
    const customEmail = `uzair.udin+${randomDigits}@gmail.com`;
    const password = faker.internet.password({ length: 8 });

    await this.page.fill(this.firnameInput, firstName);
    await this.page.fill(this.lastnameInput, lastName);
    await this.page.fill(this.emailInput, customEmail);
    await this.page.fill(this.passwordInput, password);
    await this.page.waitForSelector(this.createAccountButton + ':not([disabled])', { timeout: 5000 });
  }
  
  async clickCreateAccountBtn() {
        await this.page.click(this.createAccountButton);
  }

  async waitForSubmit(waitTime: number = 3000) {
    await this.page.waitForSelector(this.createAccountButton, { state: 'hidden', timeout: waitTime });
  }

}
