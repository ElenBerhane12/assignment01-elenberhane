import { Locator, Page, expect } from '@playwright/test';

export class CreateClientsPage {
 
  readonly page: Page;
  readonly nameinput: Locator; 
  readonly emailinput: Locator; 
  readonly telephoneinput: Locator; 
  readonly saveBTN: Locator; 
  readonly backBTN: Locator; 


  constructor(page: Page) {
    this.page = page;

   
    this.nameinput = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox'); 
    this.emailinput = page.locator('input[type="email"]');
    this.telephoneinput = page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox'); 
    this.saveBTN = page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox'); 
    this.backBTN = page.locator('button#back'); 
  }




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