import { Locator, Page, expect } from '@playwright/test';

export class CreateClientsPage {
 
  readonly page: Page;
  readonly nameinput: Locator; // TextField for name
  readonly emailinput: Locator; // TextField for email
  readonly telephoneinput: Locator; // TextField for telephone
  readonly saveBTN: Locator; // Button to save the client
  readonly backBTN: Locator; // Button to go back


  constructor(page: Page) {
    this.page = page;

   
    this.nameinput = page.locator('input[name="name"]'); 
    this.emailinput = page.locator('input[name="email"]'); 
    this.telephoneinput = page.locator('input[name="telephone"]'); 
    this.saveBTN = page.locator('button[type="submit"]'); 
    this.backBTN = page.locator('button#back'); 
  }

  // Methods


  async navigateToClientView() {
    await this.page.goto('http://localhost:3000/clients'); 
    await expect(this.nameinput).toBeVisible(); 
  }


  async createNewClient(name: string, email: string, telephone: string) {
    await this.nameinput.fill(name);
    await this.emailinput.fill(email);
    await this.telephoneinput.fill(telephone);
    await this.saveBTN.click();
    await this.page.waitForLoadState('networkidle'); 
  }


  async navigateToEditClient(clientId: string) {
    await this.page.goto(`http://localhost:3000/clients/${clientId}/edit`); 
    await expect(this.nameinput).toBeVisible(); 
  }

  
  async deleteClient(clientId: string) {
    await this.page.goto(`http://localhost:3000/clients/${clientId}`); 
    await this.page.locator('button#delete').click(); 
    await this.page.locator('button#confirm-delete').click(); 
    await this.page.waitForLoadState('networkidle'); 
  }
}
