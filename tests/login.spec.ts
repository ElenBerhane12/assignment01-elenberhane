import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login Page Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto(); 
    });

    test('should log in successfully with valid credentials', async ({ page }) => {
        await loginPage.login('tester01', 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c');
        
        const header = page.locator('text=Tester Hotel Overview');
        await expect(header).toBeVisible();
    });
});
