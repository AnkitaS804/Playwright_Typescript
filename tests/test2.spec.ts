import { test,expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ override: true });

test("test2", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log("Loaded ENV file:", process.env);
  await page.getByLabel("Username:").fill('rahulshettyacademy');
  await page.getByLabel("Password:").fill('Learning@830$3mK2');

  await page.getByLabel("I Agree to the terms and conditions").check();
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveTitle("ProtoCommerce");

  await page.locator(".btn.btn-info").nth(1).click();
  await expect(page.locator(".nav-link.btn")).toHaveText(/Checkout\s*\(\s*\d+\s*\)/)
  await page.locator(".nav-link.btn").click();
  

  await page.getByRole("button", { name: "Continue Shopping" }).click();
  await page.locator(".btn.btn-info").nth(0).click();
  await page.locator(".btn.btn-info").nth(1).click();
  await page.locator(".btn.btn-info").nth(2).click();
  await page.locator(".nav-link.btn").click();
  await page.getByRole("button", { name: "Remove" }).first().click()
  await expect(page.locator(".text-right")).toHaveText("₹. 150000");


});
