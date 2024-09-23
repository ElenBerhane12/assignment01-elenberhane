import { Locator, Page, expect } from '@playwright/test';

export class EditClientPage {

  readonly page: Page;
  readonly namnTF: Locator; 
  readonly emailTF: Locator; 
  readonly telephoneTF: Locator; 
  readonly saveBTN: Locator; 
  readonly backBTN: Locator; 
  readonly deleteBTN: Locator; 

  
  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.namnTF = page.locator('input[name="name"]'); 
    this.emailTF = page.locator('input[name="email"]'); 
    this.telephoneTF = page.locator('input[name="telephone"]'); 
    this.saveBTN = page.locator('button[type="submit"]'); 
    this.backBTN = page.locator('button#back'); 
    this.deleteBTN = page.locator('button#delete'); 
  }

 
  
  async navigateToClientEditView(clientId: string) {
    await this.page.goto(`http://localhost:3000/clients/${clientId}/edit`); 
    await expect(this.namnTF).toBeVisible(); 
  }

  // Update client details
  async updateClient(name: string, email: string, telephone: string) {
    await this.namnTF.fill(name);
    await this.emailTF.fill(email);
    await this.telephoneTF.fill(telephone);
    await this.saveBTN.click();
    await this.page.waitForLoadState('networkidle'); 
  }

  
  async deleteClient() {
    await this.deleteBTN.click();
    await this.page.locator('button#confirm-delete').click(); 
    await this.page.waitForLoadState('networkidle'); 
  }

  
  async navigateBack() {
    await this.backBTN.click();
    await this.page.waitForLoadState('networkidle'); 
  }
}
