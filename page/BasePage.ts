import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly registerLink: Locator;
  readonly loginLink: Locator;
  readonly shoppingCart: Locator;
  readonly wishlist: Locator;
  readonly siteLogo: Locator;
  readonly searchText: Locator;
  readonly searchBtn: Locator;
  readonly bookBtn: Locator;
  readonly computersBtn: Locator;
  readonly electronicsBtn: Locator; 
  
  

  constructor(page: Page) {
    this.page = page;
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.shoppingCart = page.getByRole('link', { name: 'Shopping cart' });
    this.wishlist = page.getByRole('link', { name: 'Wishlist' });
    this.siteLogo = page.locator('img[alt="Tricentis Demo Web Shop"]');
    this.searchText= page.locator('input[name = "q"]')
    this.searchBtn = page.locator('.button-1.search-box-button');
    this.bookBtn = page.getByRole('link', { name: 'Books' });
    this.computersBtn = page.getByRole('link', { name: 'Computers' });
    this.electronicsBtn = page.getByRole('link', { name: 'Electronics' });

  }
  async goto() {
    await this.page.goto('https://demowebshop.tricentis.com/');
  }

  async verifyHomePage() {
    await expect(this.siteLogo).toBeVisible();
  }

  async openRegisterPage() {
    await this.registerLink.click();
  }

  async openLoginPage() {
    await this.loginLink.click();
  }

  async openShoppingCart() {
    await this.shoppingCart.click();
  }
}
