import { Page } from '@playwright/test';

export class DeleteClientsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async deleteClient(clientName: string) {
        const clientLocator = this.page.locator(`text=${clientName}`);
        await clientLocator.hover(); // Hover to reveal delete option
        await clientLocator.getByRole('button', { name: 'Delete' }).click(); // Adjust based on your UI
        await this.page.getByRole('button', { name: 'Confirm' }).click(); // Confirm deletion
    }
}

