import { test } from '@playwright/test';
import { BasePage } from '../page/BasePage';
import { SearchPage } from '../page/SearchPage';
import { CartPage } from '../page/CartPage';
import cartData from '../testdata/cartdata.json';

const dataset = cartData;

for (let i = 0; i < dataset.length; i++) {
  const data = dataset[i];
  test(`Add ${data.productName} to cart and verify`, async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.goto();
    await basePage.verifyHomePage();

    const searchPage = new SearchPage(page);
    await searchPage.search(data.searchTerm);
    await searchPage.addFirstProductToCart();

    const cartPage = new CartPage(page);
    await cartPage.goto();
    //await cartPage.verifyProductInCart(data.productName);
  });
}
