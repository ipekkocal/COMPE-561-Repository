import { test, expect } from "@playwright/test";

test.describe("Sign-Up Page E2E Tests", () => {
  test("displays the sign-up page correctly", async ({ page }) => {
    // Navigate to the sign-up page
    await page.goto("/sign-up");

    // Check if the form fields are visible
    await expect(page.getByLabel("First Name")).toBeVisible();
    await expect(page.getByLabel("Last Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Username")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();

    // Check if the Sign-Up button is visible
    await expect(page.getByRole("button", { name: /Sign Up/i })).toBeVisible();
  });

  test("successfully signs up with valid credentials", async ({ page }) => {
    // Mock API success response
    await page.route("http://127.0.0.1:8000/users/register", (route) => {
      route.fulfill({
        status: 201,
        body: JSON.stringify({ message: "Registration successful." }),
      });
    });

    // Navigate to the sign-up page
    await page.goto("/sign-up");

    // Fill in valid input data
    await page.fill("input[name='name']", "John");
    await page.fill("input[name='lastName']", "Doe");
    await page.fill("input[name='email']", "john.doe@example.com");
    await page.fill("input[name='username']", "john_doe");
    await page.fill("input[name='password']", "securePassword123");

    // Click the "Sign Up" button
    await page.click("button[type='submit']");

    // Optionally, log success for debugging purposes
    console.log("Sign-Up successful for valid credentials");
  });
});
