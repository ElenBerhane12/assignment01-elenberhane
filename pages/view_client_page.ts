import { Locator, Page, expect } from '@playwright/test';

export class ViewClientsPage {

    readonly page: Page;
    readonly backBtn: Locator;
    readonly createClientBtn: Locator;
    readonly editClientDropDown: Locator;
    readonly deleteClientDropDown: Locator;
    readonly clientsList: Locator;


    constructor(page: Page) {
        this.page = page;

        this.backBtn = page.getByRole('link', { name: 'Back' });
        this.createClientBtn = page.getByRole('link', { name: 'Create Client' });
        this.editClientDropDown = page.getByText('Edit');  
        this.deleteClientDropDown = page.getByRole('button', { name: 'Delete' });
        this.clientsList = page.getByText('Clients');
    }


    async navigateToDashboard() {
        await this.backBtn.click();
        await this.page.waitForTimeout(2000);
    }


    async navigateToCreateClient() {
        await this.createClientBtn.click();
        await this.page.waitForTimeout(2000);
    }


    async navigateToEditClient(clientName: string) {
      
        const clientImage = this.page.getByRole('img').first();
        await expect(clientImage).toBeVisible(); 
        await clientImage.click(); 

        
        await this.editClientDropDown.click();
        await this.page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').click(); // Click on the specific client to edit

        
        await this.page.waitForTimeout(2000);
    }


    async deleteClient(clientName: string) {

      const clientImage = this.page.getByRole('img').first();
      await expect(clientImage).toBeVisible(); 
        await clientImage.click(); 

        await this.page.getByText('Delete').click(); 
        await this.page.waitForTimeout(2000); 
    }


    async verifyClientInList(name: string) {
        const clientItem = this.clientsList.getByText('Clients');
        await expect(clientItem).toBeVisible(); // Ensure the client is visible
    }
}
