import { Locator, Page } from '@playwright/test';

export class EditClientsPage {
    private page: Page;
    private nameInput: Locator;
    private emailInput: Locator;
    private telephoneInput: Locator;
    private saveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox');
        this.emailInput = page.locator('input[type="email"]');
        this.telephoneInput = page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox');
        this.saveButton = page.getByText('Save');
    }

    async login(username: string, password: string) {
        await this.page.goto('http://localhost:3000/login');
        await this.page.locator('input[type="text"]').fill(username);
        await this.page.locator('input[type="password"]').fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();
    }

    async navigateToClients() {
        await this.page.locator('div').filter({ hasText: /^ClientsNumber: 2View$/ }).getByRole('link').click();
    }

    async editClient(clientData: { name: string; email: string; telephone: string }) {
        // Klicka på den första klientens redigeringsknapp (antag att det är en bild)
        await this.page.getByRole('img').first().click();
        await this.page.getByText('Edit').click();
        
        // Fyll i formuläret för att redigera klienten
        await this.nameInput.fill(clientData.name);
        await this.emailInput.fill(clientData.email);
        await this.telephoneInput.fill(clientData.telephone);
        await this.saveButton.click();
    }
}
