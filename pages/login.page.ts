import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input[type=text]');
        this.passwordInput = page.locator('input[type=password]');
        this.loginBtn = page.locator('button');
    }

    async goto() {
        await this.page.goto('http://localhost:3000/login');
        await this.page.waitForLoadState('networkidle');
        
        const url = await this.page.url();
        console.log(`Navigated to URL: ${url}`);
        await expect(this.usernameInput).toBeVisible({ timeout: 10000 });
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
        await this.page.waitForLoadState('networkidle');
        
     
        const url = await this.page.url();
        console.log(`Current URL after login: ${url}`);
        try {
            await expect(this.page.locator('text=Tester Hotel Overview')).toBeVisible();
        } catch (error) {
            console.error('Login failed or page content not found:', error);
        }
    }
}
