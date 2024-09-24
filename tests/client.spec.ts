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

  test('Test 01  Login', async ({ page }) => {
    await expect(page.getByText('Welcome tester01!')).toBeVisible();
  });

  test('02 - Navigate to Clients Page', async ({ page }) => {
    await page.locator('div').filter({ hasText: /^ClientsNumber: 4View$/ }).getByRole('link').click();
    await page.waitForTimeout(2000);
    await expect(page.locator('h1')).toHaveText('Clients');
  });

  test('03 - Create New Client', async ({ page }) => {
    await page.locator('a[href="/clients"]').click();
    await page.waitForLoadState('networkidle');

    await page.getByRole('link', { name: 'Create Client' }).click();
    await page.locator('input[name="name"]').fill('John Doe'); 
    await page.locator('input[name="email"]').fill('john.doe@example.com'); 
    await page.locator('input[name="telephone"]').fill('1234567890'); 
    await page.getByText('Save').click();

    await expect(page.getByText('John Doe')).toBeVisible();
  });

  test('04 - Edit Client', async ({ page }) => {
    await page.locator('a[href="/clients"]').click();
    await page.waitForLoadState('networkidle');
    await page.getByText('John Doe').click(); 
    await page.getByRole('button', { name: 'Edit' }).click();
    
    await page.locator('input[name="name"]').fill('John Doe Updated'); 
    await page.locator('input[name="email"]').fill('john.doe.updated@example.com'); 
    await page.locator('input[name="telephone"]').fill('0987654321'); 
    await page.getByText('Save').click();

    await expect(page.getByText('John Doe Updated')).toBeVisible();
  });
});


  