import { test } from '@playwright/test';
import { DuckDuckGoPage } from '../pages/DuckDuckGoPage';

test('search Playwright on DuckDuckGo (POM)', async ({ page }) => {
  const duck = new DuckDuckGoPage(page);

  // Arrange
  await duck.goto();
  await duck.expectSearchInputVisible();

  // Act
  await duck.search('Playwright testing');

  // Assert
  await duck.expectOnResultsPageWithQuery('Playwright testing');
  await duck.expectHasResults();

});
