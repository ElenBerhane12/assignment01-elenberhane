import { Locator, Page } from '@playwright/test';

export class LoginPage {
    // Attributes/Locators
    readonly page: Page;
    readonly usernameTF: Locator;
    readonly passwordTF: Locator;
    readonly loginBTN: Locator;

    // Constructor
    constructor(page: Page) {
        this.page = page;

        // Initialize the locators
        this.usernameTF = page.locator('input[name="username"]');
        this.passwordTF = page.locator('input[name="password"]');
        this.loginBTN = page.locator('button[type="submit"]');
    }



    async performLogin(username: string, password: string) {

        await this.usernameTF.fill(username);
        await this.passwordTF.fill(password);


        await this.loginBTN.click();

        await this.page.waitForLoadState('networkidle');
    }
}