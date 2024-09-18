import { test, expect } from '@playwright/test';
import { ClientPage } from '../pages/client.page';
import { LoginPage } from '../pages/login.page';

test.describe('Client ', () => {
    let loginPage: LoginPage;
    let clientPage: ClientPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        clientPage = new ClientPage(page);


        await loginPage.goto();
        await loginPage.login('tester01', 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c');
        // Navigate to the clients page after login
        await clientPage.gotoClientsPage();
    });

    test(' create a new client', async () => {
        const name = 'John Doe';
        const email = 'john.doe@example.com';
        const telephone = '1234567890';


        await clientPage.createClient(name, email, telephone);
        await clientPage.verifyClientDetails(name, email, telephone);
    });

    test(' edit a client', async () => {
        const oldName = 'John Doe';
        const newName = 'Jane Doe';
        const newEmail = 'jane.doe@example.com';
        const newTelephone = '0987654321';

        await clientPage.editClient(oldName, newName, newEmail, newTelephone);

        await clientPage.verifyClientDetails(newName, newEmail, newTelephone);
    });

    test('delete a client', async () => {
        const name = 'John Doe';

        await clientPage.deleteClient(name);

        
        await expect(clientPage.clientsList.locator(`text=${name}`)).not.toBeVisible();
    });

});
