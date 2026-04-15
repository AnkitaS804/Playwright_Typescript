import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginError: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.loginError = page.locator('.message-error');
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
  }

  async goto() {
    await this.page.goto('https://demowebshop.tricentis.com/login');
  }

  async verifyLoginPage() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginSuccess() {
    await expect(this.logoutLink).toBeVisible();
  }

  async verifyLoginError() {
    await expect(this.loginError).toBeVisible();
  }
}
