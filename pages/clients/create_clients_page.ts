
import { Page } from '@playwright/test';

export class CreateClientsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async createClient(clientData: { name: string; email: string; telephone: string }) {
        await this.page.getByRole('link', { name: 'Create Client' }).click();
        await this.page.fill('div:has-text("Name") input', clientData.name);
        await this.page.fill('input[type="email"]', clientData.email);
        await this.page.fill('div:has-text("Telephone") input', clientData.telephone);
        await this.page.getByText('Save').click();
    }
}

