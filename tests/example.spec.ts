import { test, expect } from '@playwright/test';

// 一个最简单的 demo：打开 Playwright 官网，验证标题里有 "Playwright"
test('open Playwright homepage', async ({ page }) => {
  // 打开网页
  await page.goto('https://playwright.dev/');

  // 断言：标题包含 "Playwright"
  await expect(page).toHaveTitle(/Playwright/);
});
