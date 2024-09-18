import { expect, type Locator, type Page } from '@playwright/test';

export class ClientPage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly telephoneInput: Locator;
    readonly saveBtn: Locator;
    readonly clientsList: Locator;

    constructor(page: Page) {
        this.page = page;

        
        this.nameInput = page.locator('input[name="name"]');
        this.emailInput = page.locator('input[name="email"]');
        this.telephoneInput = page.locator('input[name="telephone"]');
        this.saveBtn = page.locator('button[type="submit"]'); 
        this.clientsList = page.locator('#client-list'); 
    }

    async gotoClientsPage() {
        await this.page.goto('http://localhost:3000/clients');
        await this.page.waitForLoadState('networkidle');

        
        await expect(this.page.locator('h1')).toHaveText('Clients');
    }

    async createClient(name: string, email: string, telephone: string) {
     
        await expect(this.nameInput).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await expect(this.telephoneInput).toBeVisible();
        await expect(this.saveBtn).toBeVisible();

        
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.telephoneInput.fill(telephone);

       
        await this.saveBtn.click();
        await this.page.waitForTimeout(3000); 
    }

    async verifyClientDetails(name: string, email: string, telephone: string) {
        
        const clientItem = this.clientsList.locator(`text=${name}`);
        await expect(clientItem).toBeVisible(); 

        
        await expect(clientItem.locator(`text=${email}`)).toBeVisible();
        await expect(clientItem.locator(`text=${telephone}`)).toBeVisible();
    }

    async editClient(oldName: string, newName: string, newEmail: string, newTelephone: string) {
   
    }

    async deleteClient(name: string) {
        
    }
}
