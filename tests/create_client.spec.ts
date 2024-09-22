import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CreateClientsPage } from '../pages/clients/create_clients_page';
import { ViewClientsPage } from '../pages/clients/view_clients_page';

test('User can create a new client', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const createClientsPage = new CreateClientsPage(page);
    const viewClientsPage = new ViewClientsPage(page);

    // Login
    await loginPage.login('tester01', 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c');

    // View clients
    await viewClientsPage.viewClients();

    // Create a new client
    const newClientData = {
        name: 'New Client',
        email: 'newclient@example.com',
        telephone: '1234567890'
    };
    await createClientsPage.createClient(newClientData);

    // Assertions to verify client creation
    await expect(viewClientsPage.clientExists(newClientData.name)).toBeTruthy();
});
