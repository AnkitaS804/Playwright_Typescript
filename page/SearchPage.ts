import { expect, Locator, Page } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly searchText: Locator;
  readonly searchBtn: Locator;
  readonly firstAddToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchText = page.locator('input[name="q"]');
    this.searchBtn = page.locator('.button-1.search-box-button');
    this.firstAddToCartButton = page.locator('input[value="Add to cart"]').first();
  }

  async goto() {
    await this.page.goto('https://demowebshop.tricentis.com/');
  }

  async search(searchTerm: string) {
    await this.searchText.fill(searchTerm);
    await this.searchBtn.click();
  }

  async addFirstProductToCart() {
    await this.firstAddToCartButton.click();
  }

  async verifySearchResult(productName: string) {
    await expect(this.page.getByRole('link', { name: productName })).toBeVisible();
  }
}


