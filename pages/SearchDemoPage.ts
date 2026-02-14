import { expect, Page } from '@playwright/test';

export class SearchDemoPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.setContent(`
      <!doctype html>
      <html>
        <head><meta charset="utf-8" /><title>Search Demo</title></head>
        <body>
          <h1>Search Demo</h1>
          <label>
            Search:
            <input aria-label="Search" id="q" />
          </label>

          <ul id="results">
            <li data-testid="result">Playwright testing guide</li>
            <li data-testid="result">TypeScript tips</li>
            <li data-testid="result">CI basics</li>
          </ul>

          <script>
            const input = document.querySelector('#q');
            const items = Array.from(document.querySelectorAll('[data-testid="result"]'));
            input.addEventListener('input', () => {
              const q = input.value.toLowerCase();
              items.forEach(li => {
                li.style.display = li.textContent.toLowerCase().includes(q) ? '' : 'none';
              });
            });
          </script>
        </body>
      </html>
    `);
  }

  async expectSearchInputVisible() {
    await expect(this.page.getByRole('textbox', { name: 'Search' })).toBeVisible();
  }

  async search(query: string) {
    await this.page.getByRole('textbox', { name: 'Search' }).fill(query);
  }

  async expectAtLeastOneVisibleResult() {
    const visible = this.page.locator('[data-testid="result"]:visible');
    await expect(visible.first()).toBeVisible();
  }
}
