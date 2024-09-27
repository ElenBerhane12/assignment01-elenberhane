import { Locator, Page } from '@playwright/test';

export class LoginPage {
    // Attributes/Locators
    readonly page: Page;
    readonly usernameinput: Locator;
    readonly passwordinput: Locator;
    readonly loginBTN: Locator;

    // Constructor
    constructor(page: Page) {
        this.page = page;

        // Initialize the locators
        this.usernameinput = page.locator('input[type="text"]');
        this.passwordinput = page.locator('input[type="text"]');
        this.loginBTN = page.locator('input[type="text"]');
    }



    async performLogin(username: string, password: string) {

        await this.usernameinput.fill("tester01");
        await this.passwordinput.fill("GteteqbQQgSr88SwNExUQv2ydb7xuf8c");


        await this.loginBTN.click();

        await this.page.waitForTimeout(2000);
    }
}