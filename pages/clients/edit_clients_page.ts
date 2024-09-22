import { Page } from '@playwright/test';

export class EditClientsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async editClient(clientData: { name?: string; email?: string; telephone?: string }) {
        if (clientData.name) {
            await this.page.fill('div:has-text("Name") input', clientData.name);
        }
        if (clientData.email) {
            await this.page.fill('input[type="email"]', clientData.email);
        }
        if (clientData.telephone) {
            await this.page.fill('div:has-text("Telephone") input', clientData.telephone);
        }
        await this.page.getByText('Save').click();
    }
}

