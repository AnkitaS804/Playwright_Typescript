import { test } from '@playwright/test';
import { SearchPage } from '../page/SearchPage';
import searchData from '../testdata/searchdata.json';

const dataset = searchData;

for (let i = 0; i < dataset.length; i++) {
  const data = dataset[i];
  test(`Search for ${data.searchTerm} and verify result ${data.productName}`, async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();
    await searchPage.search(data.searchTerm);
    //await searchPage.verifySearchResult(data.productName);
  });
}
