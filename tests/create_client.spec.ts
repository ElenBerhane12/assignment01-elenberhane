import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CreateClientsPage } from '../pages/clients/create_clients_page';
import { ViewClientsPage } from '../pages/clients/view_clients_page';
import { EditClientsPage } from '../pages/clients/edit_clients_page';
import { DeleteClientsPage } from '../pages/clients/delete_clients_page';

test.describe('Client Management', () => {
    let loginPage: LoginPage;
    let createClientsPage: CreateClientsPage;
    let viewClientsPage: ViewClientsPage;
    let editClientsPage: EditClientsPage;
    let deleteClientsPage: DeleteClientsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        createClientsPage = new CreateClientsPage(page);
        viewClientsPage = new ViewClientsPage(page);
        editClientsPage = new EditClientsPage(page);
        deleteClientsPage = new DeleteClientsPage(page);

        // Login before each test
        await loginPage.login('tester01', 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c');
    });

    test('Create a new client', async ({ page }) => {
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

    test('Edit a client', async ({ page }) => {
        const editClientsPage = new EditClientsPage(page);
        
        await editClientsPage.login('tester01', 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c');
        await editClientsPage.navigateToClients();
    
        const updatedClientData = {
            name: 'Updated Client',
            email: 'updatedclient@example.com',
            telephone: '0987654321'
        };
        await editClientsPage.editClient(updatedClientData);
    });

    test('Delete a client', async ({ page }) => {
        // Create a new client first
        const clientData = {
            name: 'Client to Delete',
            email: 'deleteclient@example.com',
            telephone: '1234567890'
        };
        await createClientsPage.createClient(clientData);

        // View clients
        await viewClientsPage.viewClients();
        await deleteClientsPage.deleteClient(clientData.name);
        await expect(viewClientsPage.clientExists(clientData.name)).toBeFalsy();


        test('Edit an existing client', async ({ page }) => {

            const initialClientData = {
                name: 'Client to Edit',
                email: 'editclient@example.com',
                telephone: '1234567890'
            };
            await createClientsPage.createClient(initialClientData);

           
            await viewClientsPage.viewClients();

            
            const updatedClientData = {
                name: 'Edited Client',
                email: 'editedclient@example.com',
                telephone: '0987654321'
            };
            await editClientsPage.editClient(updatedClientData);

            
            await expect(viewClientsPage.clientExists(updatedClientData.name)).toBeTruthy();
            await expect(viewClientsPage.clientExists(initialClientData.name)).toBeFalsy();
        });
    });
});

