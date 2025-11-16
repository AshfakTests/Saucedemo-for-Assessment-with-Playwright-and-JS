const { test, expect } = require('@playwright/test');

test('Login, add product to cart, verify, and logout', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page.locator('.inventory_list')).toBeVisible();
  const firstProduct = page.locator('.inventory_item').first();
  const productName = await firstProduct.locator('.inventory_item_name').textContent();
  await firstProduct.locator('button').click();
  await page.click('.shopping_cart_link');
  const cartProductName = await page.locator('.cart_item .inventory_item_name').textContent();
  expect(cartProductName).toBe(productName);
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');
  await expect(page.locator('#login-button')).toBeVisible();
});
