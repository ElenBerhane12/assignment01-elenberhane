import { Page } from '@playwright/test';

export class CreateReservationPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async createReservation(reservationData: {
        startDate: string;
        endDate: string;
        clientId: string;
        roomId: string;
        billId: string;
    }) {
        await this.page.getByRole('link', { name: 'Create Reservation' }).click();
        
        // Fill in the start date
        await this.page.locator('div').filter({ hasText: /^Start \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD').fill(reservationData.startDate);
        
        // Fill in the end date
        await this.page.locator('div').filter({ hasText: /^End \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD').fill(reservationData.endDate);
        
        // Select client
        await this.page.locator('div').filter({ hasText: /^Client- Not selected -$/ }).getByRole('combobox').selectOption(reservationData.clientId);
        
        // Select room
        await this.page.locator('div').filter({ hasText: /^Room- Not selected -$/ }).getByRole('combobox').selectOption(reservationData.roomId);
        
        // Select bill
        await this.page.locator('div').filter({ hasText: /^Bill- Not selected -$/ }).getByRole('combobox').selectOption(reservationData.billId);
        
        // Click Save
        await this.page.getByText('Save').click();
    }
}
