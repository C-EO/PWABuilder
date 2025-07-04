import { test, expect, Page } from '@playwright/test';

let currentPage: Page | undefined;

// before each test
test.beforeEach(async ({ page }) => {
    currentPage = page;
    await page.goto('/');
});


test('ensure demo app is testable', async ({ page }) => {
    // find the button with the text "Login"
    const demoButton = page.locator('id=demo-action');

    // click demo button to start new test
    await demoButton.click();

    // wait for network to be done
    await page.waitForLoadState('networkidle');

    // ensure we are on report-card page

    // our url should contain /reportcard
    await expect(page.url()).toContain('/reportcard');

    // wait for tests to end
    await page.waitForLoadState('networkidle');

    const reportCardAppTitle = page.locator('id=site-name');

    // expect reportCardAppTitle to exist and be visible
    await expect(reportCardAppTitle).toBeVisible();

    // // expect reportCardAppTitle to contain text "Webboard"
    await expect(reportCardAppTitle).toContainText('Webboard');
});

test('ensure Package For Stores button is not disabled for demo app', async ({ page }) => {
    // find the button with the text "Login"
    const demoButton = page.locator('id=demo-action');

    // click demo button to start new test
    await demoButton.click();

    // wait for network to be done
    await page.waitForLoadState('networkidle');

    // our url should contain /reportcard
    await expect(page.url()).toContain('/reportcard');

    // wait for tests to end
    await page.waitForLoadState('networkidle');

    await page.waitForSelector("id=swProgressRing");

    // test manifest score
    const packageForStoresButton = page.locator('text=Package For Stores');
    await expect(await packageForStoresButton.isDisabled()).toBe(false);
})

test('ensure View Details button has visible focus indicator', async ({ page }) => {
    // find the button with the text "Login"
    const demoButton = page.locator('id=demo-action');

    // click demo button to start new test
    await demoButton.click();

    // wait for network to be done
    await page.waitForLoadState('networkidle');

    // our url should contain /reportcard
    await expect(page.url()).toContain('/reportcard');

    // wait for tests to end
    await page.waitForLoadState('networkidle');

    // wait for manifest details to be loaded
    await page.waitForSelector("id=mani-details");

    // Get the manifest details element (the View Details button)
    const viewDetailsButton = page.locator('id=mani-details');
    
    // Ensure the element is visible before focusing
    await expect(viewDetailsButton).toBeVisible();
    
    // Focus the element using keyboard navigation
    await viewDetailsButton.focus();

    // Check that the element has focus
    await expect(viewDetailsButton).toBeFocused();
    
    // Check that the focused element has a visible outline (focus indicator)
    // We expect the focus styles to be applied
    const focusedElement = page.locator('id=mani-details:focus-visible');
    await expect(focusedElement).toHaveCSS('outline-width', '2px');
})