# Playwright Web Demo

[![Playwright Tests](https://github.com/jessicazhong004/playwright-web-demo/actions/workflows/tests.yml/badge.svg)](https://github.com/jessicazhong004/playwright-web-demo/actions/workflows/tests.yml)

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

This repo contains two small demo flows:

- Deterministic CI demo (runs in GitHub Actions): `tests/search-demo.spec.ts`
  - Uses a local HTML page via `page.setContent()` so CI is stable and reproducible
  - Still follows the same POM style and assertions

- External smoke demo (local/manual): `tests/search-duckduckgo.spec.ts`
  - Hits a real public website (DuckDuckGo)
  - Skipped in CI because third-party search results can be flaky (rate limits / A-B changes / regional differences)

---

## Project structure
```markdown
```text
playwright-web-demo
├─ playwright.config.ts
├─ tests/
│  ├─ search-demo.spec.ts
│  └─ search-duckduckgo.spec.ts
└─ pages/
   ├─ SearchDemoPage.ts
   └─ DuckDuckGoPage.ts
```

- `tests/` ccontains high-level test scenarios
- `pages/` contains Page Object classes (locators and low-level UI operations)

---

## How to run the tests
1. Install dependencies:
```bash
npm install
npx playwright install
```
2. Run the deterministic demo test:
```bash
npx playwright test tests/search-demo.spec.ts
```
3. Run the DuckDuckGo test (local/manual):
``` bash
npx playwright test tests/search-duckduckgo.spec.ts
```
4. Run it with a visible browser (useful for debugging and demos):
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
  await demo.goto();
  await demo.expectSearchInputVisible();
  await demo.search('playwright');
  await demo.expectAtLeastOneVisibleResult();
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