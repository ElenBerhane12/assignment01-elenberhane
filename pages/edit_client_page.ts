import { Locator, Page, expect } from '@playwright/test';

export class EditClientPage {

  readonly page: Page;
  readonly namninput: Locator;
  readonly emailinput: Locator;
  readonly telephoneinput: Locator;
  readonly saveBTN: Locator;
  readonly backBTN: Locator;
  readonly deleteBTN: Locator;
  readonly editBTN: Locator


  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.namninput = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox');
    this.emailinput = page.locator('input[type="email"]');
    this.telephoneinput = page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox');
    this.saveBTN = page.getByText('Save');
    this.backBTN = page.getByRole('link', { name: 'Back' });
    this.deleteBTN = page.getByText('Delete');
    this.editBTN = page.getByText('Edit');
  }



  async navigateToClientEditView(clientId: string) {
    await this.page.goto(`http://localhost:3000/clients/${clientId}/edit`);
    await expect(this.namninput).toBeVisible();
  }

  // Update client details
  async updateClient(name: string, email: string, telephone: string) {
    await this.namninput.fill(name);
    await this.emailinput.fill(email);
    await this.telephoneinput.fill(telephone);
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