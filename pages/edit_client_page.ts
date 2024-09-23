import { Locator, Page, expect } from '@playwright/test';

export class EditClientPage {
  // Attributes/Locators
  readonly page: Page;
  readonly namnTF: Locator; // TextField for name
  readonly emailTF: Locator; // TextField for email
  readonly telephoneTF: Locator; // TextField for telephone
  readonly saveBTN: Locator; // Button to save changes
  readonly backBTN: Locator; // Button to go back
  readonly deleteBTN: Locator; // Button to delete the client

  // Constructor
  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.namnTF = page.locator('input[name="name"]'); // Adjust selector as needed
    this.emailTF = page.locator('input[name="email"]'); // Adjust selector as needed
    this.telephoneTF = page.locator('input[name="telephone"]'); // Adjust selector as needed
    this.saveBTN = page.locator('button[type="submit"]'); // Adjust selector as needed
    this.backBTN = page.locator('button#back'); // Adjust selector as needed
    this.deleteBTN = page.locator('button#delete'); // Adjust selector as needed
  }

  // Methods

  // Navigate to client edit view
  async navigateToClientEditView(clientId: string) {
    await this.page.goto(`http://localhost:3000/clients/${clientId}/edit`); // Adjust URL as needed
    await expect(this.namnTF).toBeVisible(); // Ensure the edit form loaded correctly
  }

  // Update client details
  async updateClient(name: string, email: string, telephone: string) {
    await this.namnTF.fill(name);
    await this.emailTF.fill(email);
    await this.telephoneTF.fill(telephone);
    await this.saveBTN.click();
    await this.page.waitForLoadState('networkidle'); // Wait for navigation after saving
  }

  // Delete client
  async deleteClient() {
    await this.deleteBTN.click();
    await this.page.locator('button#confirm-delete').click(); // Confirm deletion (adjust selector as needed)
    await this.page.waitForLoadState('networkidle'); // Wait for navigation after deletion
  }

  // Navigate back to client view
  async navigateBack() {
    await this.backBTN.click();
    await this.page.waitForLoadState('networkidle'); // Wait for navigation after going back
  }
}
