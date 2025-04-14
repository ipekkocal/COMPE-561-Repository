import { test, expect } from "@playwright/test";

test.describe("Sign-In Page E2E Tests", () => {
  test("displays the sign-in page correctly", async ({ page }) => {
    await page.goto("/sign-in");

    // Check for the presence of input fields and button
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Username")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: /Sign In/i })).toBeVisible();
  });

  test("shows an error for invalid credentials", async ({ page }) => {
    // Mock API error response
    await page.route("http://127.0.0.1:8000/users/login", (route) => {
      route.fulfill({
        status: 401,
        body: JSON.stringify({ detail: "Login failed. Please try again." }),
      });
    });

    await page.goto("/sign-in");

    await page.fill("input[name='email']", "invalid@example.com");
    await page.fill("input[name='username']", "invalidUser");
    await page.fill("input[name='password']", "invalidPassword");

    await page.click("button[type='submit']");

    // Check for error message
    const errorMessage = page.getByText(/Login failed. Please try again./i);
    await expect(errorMessage).toBeVisible({ timeout: 10000 });
  });

  test("successfully logs in with valid credentials", async ({ page }) => {
    // Mock API response for valid credentials
    await page.route("http://127.0.0.1:8000/users/login", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ token: "mocked-jwt-token" }),
      });
    });

    // Navigate to the sign-in page
    await page.goto("/sign-in");

    // Fill in valid credentials
    await page.fill("input[name='email']", "valid@example.com");
    await page.fill("input[name='username']", "validuser");
    await page.fill("input[name='password']", "validpassword");

    // Click the "Sign In" button
    await page.click("button[type='submit']");

    // Log the content of the page to verify what's rendered
    //console.log(await page.content());

    // Verify any unique element that confirms successful login
    const uniqueElement = page.getByRole("navigation"); // Update with a valid selector in your app
    await expect(uniqueElement).toBeVisible({ timeout: 5000 });
  });
});
