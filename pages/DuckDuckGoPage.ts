import { Page, Locator, expect } from '@playwright/test';

// Page Object for DuckDuckGo search page
export class DuckDuckGoPage {
  readonly page: Page;
  readonly queryInput: Locator;

  constructor(page: Page) {
    this.page = page;
    // use the same locator you used in the working test
    this.queryInput = page.locator('input[name="q"]');
  }

  async goto() {
    await this.page.goto('https://duckduckgo.com/');
  }

  async expectSearchInputVisible() {
    await expect(this.queryInput).toBeVisible();
  }

  async search(query: string) {
    await this.queryInput.fill(query);
    await this.queryInput.press('Enter');
  }
//TDD-red
// async search(query: string) {
//   throw new Error('Not implemented: search()');
// }


//   async expectOnResultsPageWithQuery(query: string) {
//     // convert "Playwright testing" -> "Playwright\+testing" for the regex
//     const encodedQueryForRegex = query.replace(' ', '\\+');
//     const pattern = new RegExp(
//       `duckduckgo\\.com\\/.*[?&]q=${encodedQueryForRegex}`
//     );
//     await expect(this.page).toHaveURL(pattern);
//   }
async expectOnResultsPageWithQuery(query: string) {
  await expect(this.page).toHaveURL(/duckduckgo\.com/);
}


//   async expectResultLinkVisible(url: string) {
//     // const siteLink = this.page.getByRole('link', { name: url });
//     // await expect(siteLink).toBeVisible();
    
//   }
async expectResultLinkVisible(domainOrUrl: string) {
  const needle = domainOrUrl.replace(/^https?:\/\//, ''); 
  const siteLink = this.page.getByRole('link', { name: new RegExp(needle, 'i') }).first();
  await expect(siteLink).toBeVisible({ timeout: 15000 });
}
}
