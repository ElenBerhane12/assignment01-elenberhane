import { Locator, Page } from '@playwright/test';

export class DashboardPage {
  // Attributes/Locators
  readonly page: Page;
  readonly logoutBtn: Locator;
  readonly viewRoomBtn: Locator;
  readonly viewReservationBtn: Locator;
  readonly viewClientsBtn: Locator;
  readonly viewBillBtn: Locator;

  // Constructor
  constructor(page: Page) {
    this.page = page;

    // Locators for the dashboard elements
    this.logoutBtn = page.locator('button#logout'); // Replace with actual locator
    this.viewRoomBtn = page.locator('a[href="/rooms"]'); // Adjust selector as needed
    this.viewReservationBtn = page.locator('a[href="/reservations"]'); // Adjust selector as needed
    this.viewClientsBtn = page.locator('a[href="/clients"]'); // Adjust selector as needed
    this.viewBillBtn = page.locator('a[href="/bills"]'); // Adjust selector as needed
  }

  // Methods

  // Method to perform logout
  async performLogout() {
    await this.logoutBtn.click();
    await this.page.waitForLoadState('networkidle'); // Wait for navigation after logout
  }

  // Method to navigate to Clients page
  async navigateToClients() {
    await this.viewClientsBtn.click();
    await this.page.waitForLoadState('networkidle'); // Wait for page to load
  }

  // Method to navigate to Bills page
  async navigateToBills() {
    await this.viewBillBtn.click();
    await this.page.waitForLoadState('networkidle'); // Wait for page to load
  }

  // Method to navigate to Rooms page
  async navigateToRoom() {
    await this.viewRoomBtn.click();
    await this.page.waitForLoadState('networkidle'); // Wait for page to load
  }

  // Method to navigate to Reservations page
  async navigateToReservation() {
    await this.viewReservationBtn.click();
    await this.page.waitForLoadState('networkidle'); // Wait for page to load
  }
}
