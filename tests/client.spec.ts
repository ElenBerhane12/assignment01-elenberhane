import { test, expect } from '@playwright/test';

test.describe('Client Management Tests', () => {


    test.beforeEach(async ({ page }) => {

        await page.goto('http://localhost:3000/login');
        await page.locator('input[type="text"]').fill('tester01');

        await page.locator('input[type="password"]').fill('GteteqbQQgSr88SwNExUQv2ydb7xuf8c');
        await page.getByRole('button', { name: 'Login' }).click();


        await expect(page.getByText(/Welcome tester01!/)).toBeVisible();
        await expect(page.locator('h1')).toHaveText('Tester Hotel');
        await page.waitForTimeout(1000);
    });


    test('01 - Login', async ({ page }) => {

        await expect(page.getByText('Welcome tester01!')).toBeVisible();
    });


    test('02 - Navigate to Clients Page', async ({ page }) => {

        await page.locator('div').filter({ hasText: /^ClientsNumber: 6View$/ }).getByRole('link').click();
        await expect(page.getByText('Clients')).toBeVisible();
    });


    test('03 - Create New Client', async ({ page }) => {

        await page.locator('a[href="/clients"]').click();
        await page.waitForTimeout(2000);
        await page.getByRole('link', { name: 'Create Client' }).click();
        await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill("ellen")
        await page.locator('input[type="email"]').fill('ellen@example.com')
        await page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox').fill("070 000 0345")
        await page.getByText('Save').click();
        await expect(page.getByText('E ellen (#5)Email: ellen@')).toBeVisible();
    });

    test('04 - Edit Client', async ({ page }) => {

        await page.locator('a[href="/clients"]').click();
        await page.waitForTimeout(2000);


        await page.getByRole('heading', { name: 'sara (#4)' }).click();
        await expect(page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox')).toBeVisible();
        await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Ellen Updated');
        await page.locator('input[type="email"]').fill('ellen.updated@example.com');
        await expect(page.locator('input[type="email"]')).toBeVisible();;


        await page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox').fill('0987654321');
        await expect(page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox')).toBeVisible();

        await page.getByText('Save').click();

        await expect(page.getByText('Ellen Updated')).toBeVisible();
        await expect(page.getByText('ellen.updated@example.com')).toBeVisible();
        await expect(page.getByText('0987654321')).toBeVisible();
    });


    test('05 - Delete Client', async ({ page }) => {


        await page.locator('a[href="/clients"]').click();

        await page.waitForTimeout(2000);
        await page.getByRole('heading', { name: 'ellen (#5)' }).click();
        await expect(page.getByText('Clients')).toBeVisible();
    });


    test('06 - View Client Details', async ({ page }) => {

        await page.locator('a[href="/clients"]').click();

        await page.waitForTimeout(2000);
        await page.getByRole('heading', { name: 'ellen' }).click();
        await expect(page.getByText('E ellen (#5)Email: ellen@')).toBeVisible();

    });


    test('07 - Validate Input Fields', async ({ page }) => {

        await page.locator('a[href="/clients"]').click();
        await page.waitForTimeout(2000);

        await page.getByRole('link', { name: 'Create Client' }).click();
        await page.getByText('Save').click();

        await expect(page.getByText('Name must be set ')).toBeVisible();
        await expect(page.getByText('Email must be set ')).toBeVisible();
        await expect(page.getByText('Telephone must be set')).toBeVisible();
    });

});
test('08 - Logout', async ({ page }) => {

    await page.getByRole('button', { name: 'Logout' }).click();

    await page.waitForTimeout(1000);
    await expect(page.getByRole('button', { name: 'Login' })).toHaveText('Login');


    await page.goto('http://localhost:3000/clients');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});


test('test 09 Some Test Case for Client Management', async ({ page }) => {

    await page.locator('a[href="/clients"]').click();
    await page.waitForTimeout(2000);


    await expect(page.getByRole('heading', { name: 'Clients' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Create Client' })).toBeVisible();


    const clientsHeader = await page.locator('text=Clients').all();
    console.log('Clients Header Elements:', clientsHeader);


});


