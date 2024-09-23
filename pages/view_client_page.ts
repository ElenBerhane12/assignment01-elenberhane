import { Locator, Page, expect } from '@playwright/test';

export class ViewClientsPage {
  // Attributes/Locators
  readonly page: Page;
  readonly backBtn: Locator;
  readonly createClientBtn: Locator;
  readonly editClientDD: Locator; // Dropdown or button for editing clients
  readonly deleteClientDD: Locator; // Dropdown or button for deleting clients
  readonly clientsList: Locator; // Locator for the list of clients

  // Constructor
  constructor(page: Page) {
    this.page = page;

    // Locators for the view clients page elements
    this.backBtn = page.locator('button#back'); // Replace with actual locator
    this.createClientBtn = page.locator('button#create-client'); // Adjust selector as needed
    this.editClientDD = page.locator('select#edit-client'); // Adjust selector as needed
    this.deleteClientDD = page.locator('select#delete-client'); // Adjust selector as needed
    this.clientsList = page.locator('#client-list'); // Adjust selector as needed
  }

  // Methods

  // Method to navigate back to the dashboard
  async navigateToDashboard() {
    await this.backBtn.click();
    await this.page.waitForLoadState('networkidle'); // Wait for navigation to complete
  }

  // Method to navigate to the create client page
  async navigateToCreateClient() {
    await this.createClientBtn.click();
    await this.page.waitForLoadState('networkidle'); // Wait for page to load
  }

  // Method to navigate to the edit client section
  async navigateToEditClient(clientName: string) {
    await this.editClientDD.selectOption(clientName); // Adjust as needed to select the correct option
    await this.page.waitForLoadState('networkidle'); // Wait for page to load
  }

  // Method to delete a client
  async deleteClient(clientName: string) {
    await this.deleteClientDD.selectOption(clientName); // Adjust as needed
    await this.page.locator('button#confirm-delete').click(); // Confirm deletion button
    await this.page.waitForLoadState('networkidle'); // Wait for page to load
  }

  // Method to verify the presence of a client in the list
  async verifyClientInList(name: string) {
    const clientItem = this.clientsList.locator(`text=${name}`);
    await expect(clientItem).toBeVisible();
  }
}
