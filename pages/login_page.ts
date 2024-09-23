import { Locator, Page } from '@playwright/test';

export class LoginPage {
    // Attributes/Locators
    readonly page: Page;
    readonly usernameTF: Locator; // Text field for username
    readonly passwordTF: Locator; // Text field for password
    readonly loginBTN: Locator;   // Button to perform login

    // Constructor
    constructor(page: Page) {
        this.page = page;
        
        // Initialize the locators
        this.usernameTF = page.locator('input[name="username"]'); // Adjust the selector as needed
        this.passwordTF = page.locator('input[name="password"]'); // Adjust the selector as needed
        this.loginBTN = page.locator('button[type="submit"]');    // Adjust the selector as needed
    }

    // Methods

    // Method to perform login
    async performLogin(username: string, password: string) {
        // Fill in the username and password fields
        await this.usernameTF.fill(username);
        await this.passwordTF.fill(password);
        
        // Click the login button
        await this.loginBTN.click();
        
        // Wait for the page to load after login
        await this.page.waitForLoadState('networkidle'); // Adjust as needed based on your application
    }
}
