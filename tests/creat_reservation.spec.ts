import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CreateReservationPage } from '../pages/reservations/create_reservation_page';
import { EditReservationPage } from '../pages/reservations/edit_reservation_page';
import { ViewReservationPage } from '../pages/reservations/view_reservation_page';

test('Create a new reservation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const createReservationPage = new CreateReservationPage(page);

    // Step 1: Log in to the application
    await loginPage.login('tester01', 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c');

    // Step 2: Create a new reservation
    const reservationData = {
        startDate: '2023-10-10',
        endDate: '2025-05-05',
        clientId: '2',  
        roomId: '1',  
        billId: '1'     
    };

    await createReservationPage.createReservation(reservationData);

    
    const successMessage = await page.locator('text=Reservation created successfully');
    await expect(successMessage).toBeVisible();
});
test('Edit an existing reservation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const editReservationPage = new EditReservationPage(page);
    const viewReservationPage = new ViewReservationPage(page);

   
    await loginPage.login('tester01', 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c');

    
    await viewReservationPage.viewReservations();

   
    const reservationId = 'Reservation 1'; 
    const updatedData = {
        startDate: '2023-11-01',
        endDate: '2023-11-10',
        clientId: '2',  
        roomId: '1',    
        billId: '1'   
    };

    await editReservationPage.editReservation(reservationId, updatedData);

    
    const successMessage = await page.locator('text=Reservation updated successfully');
    await expect(successMessage).toBeVisible();
});