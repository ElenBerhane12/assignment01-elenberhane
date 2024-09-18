import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { RoomPage } from '../pages/room.page';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('Room Management', () => {
  let loginPage: LoginPage;
  let roomPage: RoomPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    roomPage = new RoomPage(page);

    
    await loginPage.goto();
    await loginPage.login('tester01', 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c')
  
    await roomPage.gotoRoomsPage(); 
  });

  test('should create a new room', async ({ page }) => {
    const roomCategory = 'Double';
    const roomNumber = '101';
    const roomFloor = '1';
    const roomAvailable = true;
    const roomPrice = '200';
    const roomFeatures = 'Sea View';

    await roomPage.createRoom(roomCategory, roomNumber, roomFloor, roomAvailable, roomPrice, roomFeatures);
    await roomPage.verifyRoomDetails(roomCategory, roomNumber, roomFloor, roomAvailable, roomPrice, roomFeatures);
  });

  test('should edit a room', async ({ page }) => {
    const oldNumber = '101';
    const newCategory = 'Suite';
    const newNumber = '102';
    const newFloor = '2';
    const newAvailable = false;
    const newPrice = '300';
    const newFeatures = 'Mountain view, Queen bed';

    await roomPage.editRoom(oldNumber, newCategory, newNumber, newFloor, newAvailable, newPrice, newFeatures);
    await roomPage.verifyRoomDetails(newCategory, newNumber, newFloor, newAvailable, newPrice, newFeatures);
  });

  test('should delete a room', async ({ page }) => {
    const numberToDelete = '102';

    await roomPage.deleteRoom(numberToDelete);
    await expect(roomPage.page.locator(`text=${numberToDelete}`)).toHaveCount(0);
  });
});
