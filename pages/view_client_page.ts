import { Locator, Page, expect } from '@playwright/test';

export class ViewClientsPage {
  
  readonly page: Page;
  readonly backBtn: Locator;
  readonly createClientBtn: Locator;
  readonly editClientDD: Locator; 
  readonly deleteClientDD: Locator; 
  readonly clientsList: Locator; 


  constructor(page: Page) {
    this.page = page;

    
    this.backBtn = page.locator('button#back'); 
    this.createClientBtn = page.locator('button#create-client'); 
    this.editClientDD = page.locator('select#edit-client'); 
    this.deleteClientDD = page.locator('select#delete-client'); 
    this.clientsList = page.locator('#client-list'); 
  }

  
  async navigateToDashboard() {
    await this.backBtn.click();
    await this.page.waitForLoadState('networkidle'); 
  }

  
  async navigateToCreateClient() {
    await this.createClientBtn.click();
    await this.page.waitForLoadState('networkidle'); 
  }

  
  async navigateToEditClient(clientName: string) {
    await this.editClientDD.selectOption(clientName); 
    await this.page.waitForLoadState('networkidle'); 
  }

  
  async deleteClient(clientName: string) {
    await this.deleteClientDD.selectOption(clientName); 
    await this.page.locator('button#confirm-delete').click(); 
    await this.page.waitForLoadState('networkidle'); 
  }

  
  async verifyClientInList(name: string) {
    const clientItem = this.clientsList.locator(`text=${name}`);
    await expect(clientItem).toBeVisible();
  }
}
