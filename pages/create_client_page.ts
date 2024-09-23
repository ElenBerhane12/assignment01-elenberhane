import { Locator, Page, expect } from '@playwright/test';

export class CreateClientsPage {

  readonly page: Page;
  readonly nameTF: Locator; 
  readonly emailTF: Locator; 
  readonly telephoneTF: Locator; 
  readonly saveBTN: Locator; 
  readonly backBTN: Locator; 

  
  constructor(page: Page) {
    this.page = page;

    
    this.nameTF = page.locator('input[name="name"]'); 
    this.emailTF = page.locator('input[name="email"]'); 
    this.telephoneTF = page.locator('input[name="telephone"]'); 
    this.saveBTN = page.locator('button[type="submit"]'); 
    this.backBTN = page.locator('button#back'); 
  }

  

  async navigateToClientView() {
    await this.page.goto('http://localhost:3000/clients'); 
    await expect(this.nameTF).toBeVisible(); 
  }

  
  async createNewClient(name: string, email: string, telephone: string) {
    await this.nameTF.fill(name);
    await this.emailTF.fill(email);
    await this.telephoneTF.fill(telephone);
    await this.saveBTN.click();
    await this.page.waitForLoadState('networkidle'); 
  }

  
  async navigateToEditClient(clientId: string) {
    await this.page.goto(`http://localhost:3000/clients/${clientId}/edit`); 
    await expect(this.nameTF).toBeVisible(); 
  }


  async deleteClient(clientId: string) {
    await this.page.goto(`http://localhost:3000/clients/${clientId}`); 
    await this.page.locator('button#delete').click(); 
    await this.page.locator('button#confirm-delete').click(); 
    await this.page.waitForLoadState('networkidle'); 
  }
}
