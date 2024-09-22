import { Page } from '@playwright/test';

export class EditReservationPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async editReservation(reservationId: string, updatedData: { startDate: string; endDate: string; clientId: string; roomId: string; billId: string }) {

        await this.page.getByRole('link', { name: `Edit ${reservationId}` }).click();
        await this.page.locator('div').filter({ hasText: /^Start \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD').fill(updatedData.startDate);
        await this.page.locator('div').filter({ hasText: /^End \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD').fill(updatedData.endDate);
        await this.page.locator('div').filter({ hasText: /^Client- Not selected -$/ }).getByRole('combobox').selectOption(updatedData.clientId);
        await this.page.locator('div').filter({ hasText: /^Room- Not selected -$/ }).getByRole('combobox').selectOption(updatedData.roomId);

        await this.page.locator('div').filter({ hasText: /^Bill- Not selected -$/ }).getByRole('combobox').selectOption(updatedData.billId);
        await this.page.getByText('Save').click();
    }
}
