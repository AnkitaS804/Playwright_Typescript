import { test } from '@playwright/test';
import { BasePage } from '../page/BasePage';
import { RegisterPage } from '../page/RegisterPage';
import registrationData from '../testdata/registrationdata.json';
import { SearchPage } from '../page/SearchPage';
import searchData from '../testdata/searchdata.json';
import { LoginPage } from '../page/LoginPage';
import loginData from '../testdata/logindata.json';
import { CartPage } from '../page/CartPage';
import cartData from '../testdata/cartdata.json';


/* ✅ SEARCH TESTS */
test.describe('Search Tests', () => {
  searchData.forEach((data) => {
    test(`Search for: ${data.searchTerm}`, async ({ page }) => {
      const searchPage = new SearchPage(page);
      await searchPage.goto();
      await searchPage.search(data.searchTerm);
      //await searchPage.verifySearchResult(data.productName);
    });
  });
});


/* ✅ REGISTRATION TESTS */
test.describe('Registration Tests', () => {
  registrationData.forEach((data) => {
    test(`Register user: ${data.firstName} ${data.lastName}`, async ({ page }) => {
      
      const basePage = new BasePage(page);
      await basePage.goto();
      await basePage.openRegisterPage();
      
      const registerPage = new RegisterPage(page);
      await registerPage.verifyRegisterPage();
      
      const email = data.email.replace('{ts}', Date.now().toString());
      await registerPage.fillRegistrationForm(
        data.firstName,
        data.lastName,
        email,
        data.password
      );
      
      await registerPage.submitRegistration();
      await registerPage.verifyRegistrationSuccess();
    });
  });
});


/* ✅ LOGIN TESTS */
test.describe('Login Tests', () => {
  loginData.forEach((data) => {
    test(`Login: ${data.email}`, async ({ page }) => {
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
  });
});


/* ✅ CART TESTS */
test.describe('Cart Tests', () => {
  cartData.forEach((data) => {
    test(`Add to cart: ${data.productName}`, async ({ page }) => {
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
  });
});