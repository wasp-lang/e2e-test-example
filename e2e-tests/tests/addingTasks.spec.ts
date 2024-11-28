import { expect, test } from "@playwright/test";
import { generateRandomUser, logUserIn, signUserUp } from "./utils";

const user = generateRandomUser();

test.describe("basic user flow test", () => {
  test.describe.configure({ mode: "serial" });

  test("sign up", async ({ page }) => {
    await signUserUp({ page, user });

    await expect(page).toHaveURL("/");
    await expect(page.locator("body")).toContainText("No tasks yet.");

    await page.click("button.logout");
    await expect(page).toHaveURL("/login");
  });

  test("log in and add task", async ({ page }) => {
    await logUserIn({ page, user });
    await expect(page).toHaveURL("/");
    await expect(page.locator("body")).toContainText("No tasks yet.");

    // Add a task
    await page.fill('input[name="description"]', "First task");
    await page.click('input:has-text("Create task")');
    await expect(page.locator("body")).toContainText("First task");
  });
});
