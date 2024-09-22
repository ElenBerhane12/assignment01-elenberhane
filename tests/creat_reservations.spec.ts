
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CreateReservationsPage } from '../pages/reservations/create_reservations_page';
import { ViewReservationsPage } from '../pages/reservations/view_reservations_page';
import { EditReservationsPage } from '../pages/reservations/edit_reservations_page';

test.describe('Reservation Management', () => {
    let loginPage: LoginPage;
    let createReservationsPage: CreateReservationsPage;
    let viewReservationsPage: ViewReservationsPage;
    let editReservationsPage: EditReservationsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        createReservationsPage = new CreateReservationsPage(page);
        viewReservationsPage = new ViewReservationsPage(page);
        editReservationsPage = new EditReservationsPage(page);
        
        // Log in before each test
        await loginPage.goto();
        await loginPage.login('tester01', 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c');
    });

    test('test 1: should create a reservation', async ({ page }) => {
        await createReservationsPage.goto();
        await createReservationsPage.createReservation('2022-10-08', '2023-02-02', '1', '1', '1');
        
        // Verify the reservation is created
        await viewReservationsPage.goto();
        await viewReservationsPage.verifyReservationDetails('2022-10-08', '2023-02-02', 'Client Name', 'Room Name');
    });

    test('test 2: should edit a reservation', async ({ page }) => {
        await viewReservationsPage.goto();
        
        // Assume there's a specific reservation to edit
        await page.getByRole('link', { name: 'Edit' }).click();
        await editReservationsPage.editReservation('2023-01-01', '2023-01-02', '1', '1', '1');

        // Verify the changes
        await viewReservationsPage.verifyReservationDetails('2023-01-01', '2023-01-02', 'Client Name', 'Room Name');
    });

    test('test 3: should delete a reservation', async ({ page }) => {
        await viewReservationsPage.goto();
        
        // Delete the reservation
        await page.getByRole('button', { name: 'Delete' }).click();
        await expect(page.locator('text=Reservation deleted successfully')).toBeVisible(); // Adjust based on your app
    });
});
