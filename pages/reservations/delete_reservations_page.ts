import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';  // Assuming LoginPage is defined in this path
import { ViewReservationPage } from '../pages/reservations/view_reservation_page'; // Assuming this exists

test('Delete an existing reservation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const viewReservationPage = new ViewReservationPage(page);

    // Log in to the application
    await loginPage.login('tester01', 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c');

    // Delete the reservation
    await viewReservationPage.deleteReservation('Mikael Eriksson');

    // Assertion to confirm the reservation no longer exists
    const reservationExists = await viewReservationPage.reservationExists('Mikael Eriksson');
    expect(reservationExists).toBeFalsy();
});
