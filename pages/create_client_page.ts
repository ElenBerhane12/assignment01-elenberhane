import { Locator, Page, expect } from '@playwright/test';

export class CreateClientsPage {
  // Attributes/Locators
  readonly page: Page;
  readonly nameTF: Locator; // TextField for name
  readonly emailTF: Locator; // TextField for email
  readonly telephoneTF: Locator; // TextField for telephone
  readonly saveBTN: Locator; // Button to save the client
  readonly backBTN: Locator; // Button to go back

  // Constructor
  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.nameTF = page.locator('input[name="name"]'); // Adjust selector as needed
    this.emailTF = page.locator('input[name="email"]'); // Adjust selector as needed
    this.telephoneTF = page.locator('input[name="telephone"]'); // Adjust selector as needed
    this.saveBTN = page.locator('button[type="submit"]'); // Adjust selector as needed
    this.backBTN = page.locator('button#back'); // Adjust selector as needed
  }

  // Methods

  // Navigate to client view
  async navigateToClientView() {
    await this.page.goto('http://localhost:3000/clients'); // Adjust URL as needed
    await expect(this.nameTF).toBeVisible(); // Ensure the page loaded correctly
  }

  // Create a new client
  async createNewClient(name: string, email: string, telephone: string) {
    await this.nameTF.fill(name);
    await this.emailTF.fill(email);
    await this.telephoneTF.fill(telephone);
    await this.saveBTN.click();
    await this.page.waitForLoadState('networkidle'); // Wait for navigation after saving
  }

  // Navigate to edit client page (if needed)
  async navigateToEditClient(clientId: string) {
    await this.page.goto(`http://localhost:3000/clients/${clientId}/edit`); // Adjust as needed
    await expect(this.nameTF).toBeVisible(); // Ensure the edit page loaded
  }

  // Delete client (if applicable)
  async deleteClient(clientId: string) {
    await this.page.goto(`http://localhost:3000/clients/${clientId}`); // Go to client details page
    await this.page.locator('button#delete').click(); // Adjust to your delete button
    await this.page.locator('button#confirm-delete').click(); // Confirm deletion
    await this.page.waitForLoadState('networkidle'); // Wait for navigation after deletion
  }
}
