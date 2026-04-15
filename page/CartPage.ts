import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartTitle: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTitle = page.locator('.page-title');
    this.cartItems = page.locator('.cart-item-row');
  }

  async goto() {
    await this.page.goto('https://demowebshop.tricentis.com/cart');
  }

  async verifyCartPage() {
    await expect(this.cartTitle).toHaveText('Shopping cart');
  }

  async verifyProductInCart(productName: string) {
    await expect(this.page.getByRole('link', { name: productName })).toBeVisible();
  }
}
