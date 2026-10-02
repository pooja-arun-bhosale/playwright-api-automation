# API Automation Framework

A REST API test automation framework built with **Playwright** and **Allure**, targeting the [Restful Booker](https://restful-booker.herokuapp.com) API.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Test runner & HTTP client |
| [AJV](https://ajv.js.org/) | JSON schema validation |
| [Allure](https://allurereport.org/) | Test reporting |
| dotenv | Environment variable management |

---

## Project Structure

```
├── src/
│   ├── clients/          # API client wrappers (AuthClient, BookingClient)
│   ├── fixtures/         # Playwright fixture extensions
│   └── utils/            # Config loader & schema validator
├── tests/
│   ├── auth/             # Auth token tests
│   ├── booking/          # CRUD tests (create, get, update, patch, delete)
│   ├── e2e/              # Full booking lifecycle test
│   └── negative/         # Error/negative path tests
├── test-data/            # JSON payloads for requests
├── schemas/              # JSON schemas for response validation
├── playwright.config.js
└── .env.example
```

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Install browser binary
npx playwright install

# 3. Configure environment
cp .env.example .env
# Edit .env — default credentials for Restful Booker: admin / password123
```

`.env` variables:
```
BASE_URL=https://restful-booker.herokuapp.com
USERNAME=admin
PASSWORD=password123
```

---

## Running Tests

```bash
# Run all tests
npm test

# Run in debug mode
npm run test:debug
```

---

## Reports

**Allure Report** (generate + open):
```bash
npm run report
```

Or step by step:
```bash
npm run report:generate   # builds the HTML report from allure-results/
npm run report:open       # opens the report in browser
```

**Playwright built-in report:**
```bash
npx playwright show-report
```

---

## Test Coverage

| Suite | Tests |
|-------|-------|
| Auth | Token generation |
| Booking — Create | POST with field validation |
| Booking — Get | GET all, GET by ID + schema validation |
| Booking — Update | PUT with full payload replacement |
| Booking — Patch | PATCH with partial payload |
| Booking — Delete | DELETE + 404 verification |
| E2E | Full lifecycle (create → read → update → patch → delete) |
| Negative | 404 on non-existent booking |

---

## Architecture

Tests use a **Client → Fixture → Test** layered approach:

- **Clients** (`src/clients/`) wrap raw HTTP calls into typed methods
- **Fixtures** (`src/fixtures/apiFixture.js`) extend Playwright's `test` to inject pre-built clients and auto-generated auth tokens
- **Tests** consume fixtures and test-data JSON — no HTTP boilerplate needed

---
