import { test,expect } from '@playwright/test';

test("test2", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.getByLabel("Username:").fill("rahulshettyacademy");
  await page.getByLabel("Password:").fill("Learning@830$3mK2");
  await page.getByLabel("I Agree to the terms and conditions").check();
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveTitle("ProtoCommerce");
});