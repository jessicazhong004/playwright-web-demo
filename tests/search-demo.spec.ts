import { test } from '@playwright/test';
import { SearchDemoPage } from '../pages/SearchDemoPage';

test('search demo (POM, deterministic)', async ({ page }) => {
  const demo = new SearchDemoPage(page);

  await demo.goto();
  await demo.expectSearchInputVisible();

  await demo.search('playwright');

  await demo.expectAtLeastOneVisibleResult();
});
