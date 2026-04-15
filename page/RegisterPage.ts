import { expect, Locator, Page } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly genderMale: Locator;
  readonly genderFemale: Locator
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.genderMale = page.locator('#gender-male');
    this.genderFemale = page.locator('#gender-female');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.confirmPasswordInput = page.locator('#ConfirmPassword');
    this.registerBtn = page.locator('#register-button');
  }

  async goto() {
    await this.page.goto('https://demowebshop.tricentis.com/register');
  }

  async verifyRegisterPage() {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    
    await expect(this.genderMale).toBeVisible();
    await expect(this.genderFemale).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.confirmPasswordInput).toBeVisible();
    await expect(this.registerBtn).toBeVisible();
  }

  async fillRegistrationForm(firstName: string, lastName: string, email: string, password: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.genderMale.check();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
  }

  async submitRegistration() {
    await this.registerBtn.click();
  }
  
  async verifyRegistrationSuccess() {
    const successMessage = this.page.locator('.result');
    await expect(successMessage).toHaveText('Your registration completed');
  }
}