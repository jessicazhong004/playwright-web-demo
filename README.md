# Playwright Web Demo

Small Playwright + TypeScript automation project that I use as a focused demo, not just a playground.

The goal of this repo is to show:
- A clean test structure using the Playwright Test runner
- A simple Page Object Model (POM) for a real public website
- A test suite that can run locally and in CI with one command

---

## Tech stack

- [Playwright Test](https://playwright.dev/docs/test-intro)
- TypeScript
- Node.js

---

## What this project tests

Right now the project covers a single, end-to-end flow on [DuckDuckGo](https://duckduckgo.com/):

- Open DuckDuckGo
- Search for `Playwright testing`
- Verify the search results page URL contains the query
- Verify that a result link to `https://playwright.dev` is visible

This is intentionally small but realistic: it hits a real website, uses a Page Object, and can be extended with more flows later.

---

## Project structure
```markdown
```text
playwright-web-demo
├─ playwright.config.ts      # Playwright runner configuration
├─ tests/
│  └─ search-duckduckgo.spec.ts  # End-to-end search flow using POM
└─ pages/
   └─ DuckDuckGoPage.ts      # Page Object for the DuckDuckGo search page
```

- `tests/` contains high-level test scenarios written in business language
- `pages/` contains Page Object classes that hide locators and low-level UI operations

---

## How to run the tests
1. Install dependencies:
``` bash

npm install
npx playwright install
```
2. Run the DuckDuckGo test in headless mode:
``` bash

npx playwright test tests/search-duckduckgo.spec.ts
```
3. Run it with a visible browser (useful for debugging and demos):
``` bash

npx playwright test tests/search-duckduckgo.spec.ts --headed
```

If you have multiple tests later, you can also run the full suite with:
``` bash

npx playwright test
```

---

## Design notes

* **Page Object Model (POM)**

  The test file only describes what the user does and expects.
  
  All the how (locators, button clicks, URL checks) lives in the `DuckDuckGoPage` class.

* **Keeps the flow readable**

  The test reads like a short story:
  ``` ts
  await duck.goto();
  await duck.expectSearchInputVisible();
  await duck.search('Playwright testing');
  await duck.expectOnResultsPageWithQuery('Playwright testing');
  await duck.expectResultLinkVisible('https://playwright.dev');
  ```
  
  This makes it easy to:
   - Add more flows later
   - Change locators without rewriting the tests
   - Explain the test suite in an interview


* **Easy to extend**

  Next steps I might add:
  - More search scenarios (different queries, error handling, etc.)
  - A second demo flow on another public site (login / form submission / shopping cart)
  - Basic tags and configuration tweaks for running smoke vs regression suites