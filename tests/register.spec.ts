import { test } from '@playwright/test';
import { BasePage } from '../page/BasePage';
import { RegisterPage } from '../page/RegisterPage';
import registrationData from '../testdata/registrationdata.json';

const dataset = registrationData;

for (let i = 0; i < dataset.length; i++) {
  const data = dataset[i];
  test(`Register user - ${data.firstName} ${data.lastName}`, async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.goto();
    await basePage.openRegisterPage();

    const registerPage = new RegisterPage(page);
    await registerPage.verifyRegisterPage();

    const email = data.email.replace('{ts}', Date.now().toString());
    await registerPage.fillRegistrationForm(data.firstName, data.lastName, email, data.password);
    await registerPage.submitRegistration();
    await registerPage.verifyRegistrationSuccess();
  });
}
