import { Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#app > div > form > div:nth-child(1) > input[type=text]');
        this.passwordInput = page.locator('#app > div > form > div:nth-child(2) > input[type=password]');
        this.loginBtn = page.locator('#app > div > form > div.field.action > button');
    }

    async goto() {
        await this.page.goto('http://localhost:3000/login');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }
}
