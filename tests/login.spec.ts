import { test } from '@playwright/test';
import { BasePage } from '../page/BasePage';
import { LoginPage } from '../page/LoginPage';
import loginData from '../testdata/logindata.json';

const dataset = loginData;

for (let i = 0; i < dataset.length; i++) {
  const data = dataset[i];
  test(`Login attempt for ${data.email}`, async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.goto();
    await basePage.openLoginPage();

    const loginPage = new LoginPage(page);
    await loginPage.verifyLoginPage();
    await loginPage.login(data.email, data.password);

    if (data.expected === 'success') {
      await loginPage.verifyLoginSuccess();
    } else {
      await loginPage.verifyLoginError();
    }
  });
}
