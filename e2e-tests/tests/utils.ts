import { expect, type Page } from "@playwright/test";
import { randomUUID } from "crypto";

export type User = {
  id?: number;
  email: string;
  password?: string;
};

const DEFAULT_PASSWORD = "password123";

export const logUserIn = async ({ page, user }: { page: Page; user: User }) => {
  await page.goto("/login");

  await page.waitForURL("**/login", {
    waitUntil: "domcontentloaded",
  });

  await page.fill('input[name="username"]', user.email);

  await page.fill('input[name="password"]', DEFAULT_PASSWORD);

  const clickLogin = page.click('button:has-text("Log in")');

  await Promise.all([
    page
      .waitForResponse((response) => {
        return response.url().includes("login") && response.status() === 200;
      })
      .catch((err) => console.error(err.message)),
    ,
    clickLogin,
  ]);
};

export const signUserUp = async ({
  page,
  user,
}: {
  page: Page;
  user: User;
}) => {
  await page.goto("/signup");

  await page.waitForURL("**/signup", {
    waitUntil: "domcontentloaded",
  });

  await page.fill('input[name="username"]', user.email);

  await page.fill('input[name="password"]', DEFAULT_PASSWORD);

  await page.click('button:has-text("Sign up")');

  await page
    .waitForResponse((response) => {
      return response.url().includes("signup") && response.status() === 200;
    })
    .catch((err) => console.error(err.message));
};

export const generateRandomUser = () => {
  const email = `${randomUUID()}@test.com`;
  return { email, password: DEFAULT_PASSWORD } as User;
};
