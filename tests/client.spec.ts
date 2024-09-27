import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login_page';
import { DashboardPage } from '../pages/dashboard_page';
import { CreateClientsPage } from '../pages/create_client_page';
import { EditClientPage } from '../pages/edit_client_page';
import { ViewClientsPage } from '../pages/view_client_page';

test.describe('Client Management Tests', () => {


    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await page.goto('http://localhost:3000/login');
        await page.locator('input[type="text"]').fill('tester01');

        await page.locator('input[type="password"]').fill('GteteqbQQgSr88SwNExUQv2ydb7xuf8c');
        await page.getByRole('button', { name: 'Login' }).click();


        // Log in
        await expect(page.getByText(/Welcome tester01!/)).toBeVisible();
        await expect(page.locator('h1')).toHaveText('Tester Hotel');
        await page.waitForTimeout(1000);
    });


    test('test 01 - Login', async ({ page }) => {

        await expect(page.getByText('Welcome tester01!')).toBeVisible();
    });


    test('test 02 - Navigate to Clients Page', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.navigateToClients();
        await expect(page.getByText('Clients')).toBeVisible();
    });


    test('test 03 - Create New Client', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const viewClientsPage = new ViewClientsPage(page);
        const createClientsPage = new CreateClientsPage(page);

        await dashboardPage.navigateToClients();
        await page.goto('http://localhost:3000/clients');
        await viewClientsPage.navigateToCreateClient();
        await createClientsPage.createNewClient("Jonas Hellman", "jonas.hellman@example.com", "070 000 0001");
        await viewClientsPage.verifyClientInList('Jonas Hellman');


    });

    test('test 04 - Edit Client', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const viewClientsPage = new ViewClientsPage(page);
        const editClientPage = new EditClientPage(page);

        await dashboardPage.navigateToClients();
        await viewClientsPage.navigateToEditClient('Jonas Hellman (#1)');
        await editClientPage.updateClient('Ellen ', 'ellen@example.com', '0987654321');

        await expect(page.getByRole('heading', { name: 'Ellen (#1)' })).toBeVisible();
        await expect(page.getByText('ellen@example.com')).toBeVisible();
        await expect(page.getByText('0987654321')).toBeVisible();


    });


    test('test 05 - Delete Client', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const viewClientsPage = new ViewClientsPage(page);

        await dashboardPage.navigateToClients();
        await viewClientsPage.deleteClient('Jonas Hellman (#1)');
        await expect(page.getByText('Clients')).toBeVisible();

    });

    test('06 - View Client Details', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const viewClientsPage = new ViewClientsPage(page);


        await dashboardPage.navigateToClients();
        await page.waitForTimeout(2000);
        await viewClientsPage.verifyClientInList('Jonas Hellman');

        const clientDetails = page.getByRole('heading', { name: 'Mikael Eriksson (#2)' });
        await expect(clientDetails).toBeVisible()
        await expect(clientDetails).toContainText('Mikael Eriksson')
    });



    test('test 07 - Validate Input Fields', async ({ page }) => {

        await page.locator('a[href="/clients"]').click();
        await page.waitForTimeout(2000);

        await page.getByRole('link', { name: 'Create Client' }).click();
        await page.getByText('Save').click();

        await expect(page.getByText('Name must be set ')).toBeVisible();
        await expect(page.getByText('Email must be set ')).toBeVisible();
        await expect(page.getByText('Telephone must be set')).toBeVisible();
    });

    test('test 08 - Logout', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);

        await dashboardPage.performLogout();
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();


        await page.goto('http://localhost:3000/login');
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    });

});
