import { test, expect } from '@playwright/test'

// Test 1: Basic functionality - Product list loads and displays correctly
test('Product list should load and display products', async ({ page }) => {
  await page.goto('/')
  
  // Wait for the products to load
  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible()
  
  // Check that the product table is visible
  await expect(page.locator('.p-datatable')).toBeVisible()
  
  // Verify at least one product row is displayed
  await expect(page.locator('.p-datatable-tbody tr').first()).toBeVisible()
  
  // Check that "Add to Cart" button exists
  await expect(page.getByRole('button', { name: /add to cart/i }).first()).toBeVisible()
})

// Test 2: Visual Regression - Product list layout
test('Product list should match visual snapshot', async ({ page }) => {
  await page.goto('/')
  
  // Wait for products to load
  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible()
  await page.waitForSelector('.p-datatable-tbody tr', { timeout: 10000 })
  
  // Take a screenshot for visual comparison
  await expect(page).toHaveScreenshot('product-list.png', {
    fullPage: true,
    animations: 'disabled',
  })
})

// Test 3: Cart functionality - Add product to cart
test('Shopping cart should add items and update cart count', async ({ page }) => {
  await page.goto('/')
  
  // Wait for products to load completely
  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible()
  await page.waitForSelector('.p-datatable-tbody tr', { timeout: 10000 })
  
  // Get initial cart count (should be 0)
  const cartLink = page.getByRole('link', { name: /cart/i })
  await expect(cartLink).toContainText('(0)')
  
  // Click first "Add to Cart" button
  await page.getByRole('button', { name: /add to cart/i }).first().click()
  
  // Wait for toast notification to appear (look for the success toast background color)
  await page.waitForSelector('div[style*="position: fixed"]', { timeout: 5000 })
  
  // Wait a moment for state to update
  await page.waitForTimeout(500)
  
  // Verify cart count increased to 1
  await expect(cartLink).toContainText('(1)')
})
