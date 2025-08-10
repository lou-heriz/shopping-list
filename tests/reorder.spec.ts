import { test, expect } from '@playwright/test';

test.describe('Shopping List - Reordering', () => {
    test('should drag and reorder items and persist the change', async ({ page }) => {
        await page.goto('http://localhost:3000');

        const listItems = page.locator('ul[aria-label="Shopping List"] li');

        const firstItemText = await listItems.nth(0).textContent();
        const secondItemText = await listItems.nth(1).textContent();

        await page.waitForTimeout(500);
        const dragItemBounds = await listItems.nth(0).boundingBox();
        await page.mouse.move(dragItemBounds!.x + 5, dragItemBounds!.y + 5);
        await page.mouse.down();
        await page.mouse.move(dragItemBounds!.x + 5, dragItemBounds!.y + 50);
        await page.waitForTimeout(500);
        await page.mouse.up();

        await page.waitForTimeout(500);

        await expect(listItems.nth(0)).toContainText(secondItemText!);
        await expect(listItems.nth(1)).toContainText(firstItemText!);

        await page.reload();
        const reloadedItems = page.locator('ul[aria-label="Shopping List"] li');

        await expect(reloadedItems.nth(0)).toContainText(secondItemText!);
        await expect(reloadedItems.nth(1)).toContainText(firstItemText!);
    });

    test('should rollback items when reorder fails', async ({ page }) => {

        await page.route('**/api/shopping-list', async route => {
            if (route.request().method() === 'POST') {
                await route.fulfill({
                    status: 500,
                    contentType: 'application/json',
                    body: JSON.stringify({ error: 'Failed to reorder items' })
                });
            } else {
                await route.continue();
            }
        });

        await page.goto('http://localhost:3000');
        const listItems = page.locator('ul[aria-label="Shopping List"] li');

        const firstItemText = await listItems.nth(0).textContent();
        const secondItemText = await listItems.nth(1).textContent();

        await page.waitForTimeout(500);
        const dragItemBounds = await listItems.nth(0).boundingBox();
        await page.mouse.move(dragItemBounds!.x + 5, dragItemBounds!.y + 5);
        await page.mouse.down();
        await page.mouse.move(dragItemBounds!.x + 5, dragItemBounds!.y + 50);

        await page.waitForTimeout(500);
        await page.mouse.up();

        await page.waitForTimeout(500);

        await expect(listItems.nth(1)).toContainText(secondItemText!);
        await expect(listItems.nth(0)).toContainText(firstItemText!);

        await page.reload();
        const reloadedItems = page.locator('ul[aria-label="Shopping List"] li');

        await expect(reloadedItems.nth(1)).toContainText(secondItemText!);
        await expect(reloadedItems.nth(0)).toContainText(firstItemText!);
    });
});