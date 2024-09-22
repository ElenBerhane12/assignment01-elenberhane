
import { Page } from '@playwright/test';

export class ViewClientsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async viewClients() {
        await this.page.locator('div').filter({ hasText: /^ClientsNumber:/ }).getByRole('link').click();
    }

    async clientExists(clientName: string) {
        return await this.page.locator(`text=${clientName}`).isVisible();
    }
}

