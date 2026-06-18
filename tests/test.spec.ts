import { test,expect } from '@playwright/test';

test("test1",async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("Username").fill("Admin")
    await page.getByPlaceholder("Password").fill("admin123")
    await page.getByRole('button',{name:"login"}).click()

    await expect(page).toHaveTitle('OrangeHRM')

    const timeLink = page.getByRole('link', { name: 'Time' });
    await expect(timeLink).toBeVisible();
    await timeLink.click();

    await expect(page.getByText('Select Employee')).toBeVisible();
});

