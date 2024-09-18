
import { expect, type Locator, type Page } from '@playwright/test';

export class RoomPage {
  readonly page: Page;
  readonly categorySelect: Locator;
  readonly numberInput: Locator;
  readonly floorInput: Locator;
  readonly availableCheckbox: Locator;
  readonly priceInput: Locator;
  readonly featuresInput: Locator;
  readonly saveBtn: Locator;
  readonly roomList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categorySelect = page.locator('select[name="category"]');
    this.numberInput = page.locator('input[name="number"]');
    this.floorInput = page.locator('input[name="floor"]');
    this.availableCheckbox = page.locator('input[name="available"]');
    this.priceInput = page.locator('input[name="price"]');
    this.featuresInput = page.locator('input[name="features"]');
    this.saveBtn = page.locator('button[type="submit"]');
    this.roomList = page.locator('#room-list'); // Adjust selector if needed
  }

  async gotoRoomsPage() {
    await this.page.goto('http://localhost:3000/rooms'); 
    await this.page.waitForLoadState('networkidle'); 
  }

  async createRoom(category: string, number: string, floor: string, available: boolean, price: string, features: string) {
    
    await this.page.waitForLoadState('networkidle'); 
    console.log('Waiting for category select dropdown to become visible');
    try {
      await this.categorySelect.waitFor({ state: 'visible', timeout: 60000 }); 
    } catch (error) {
      console.error('Category select dropdown did not become visible:', error);
      await this.page.screenshot({ path: 'debug.png' }); 
      throw error; 
    }

    
    const isCategorySelectVisible = await this.categorySelect.isVisible();
    if (!isCategorySelectVisible) {
      console.error('Category select dropdown is not visible');
      await this.page.screenshot({ path: 'debug.png' }); 
      throw new Error('Category select dropdown is not visible');
    }

    
    await this.categorySelect.selectOption({ label: category });

    
    await this.numberInput.fill(number);
    await this.floorInput.fill(floor);
    if (available) {
      await this.availableCheckbox.check();
    } else {
      await this.availableCheckbox.uncheck();
    }
    await this.priceInput.fill(price);
    await this.featuresInput.fill(features);

  
    await this.saveBtn.click();

    
    await this.page.waitForTimeout(3000); 
  }

  async verifyRoomDetails(category: string, number: string, floor: string, available: boolean, price: string, features: string) {
    await expect(this.roomList.locator(`text=${number}`)).toBeVisible();
    await expect(this.roomList.locator(`text=${category}`)).toBeVisible();
    await expect(this.roomList.locator(`text=${floor}`)).toBeVisible();
    await expect(this.roomList.locator(`text=${price}`)).toBeVisible();
    await expect(this.roomList.locator(`text=${features}`)).toBeVisible();
  }

  async editRoom(oldNumber: string, category: string, number: string, floor: string, available: boolean, price: string, features: string) {
    
  }

  async deleteRoom(number: string) {
    
  }
}
