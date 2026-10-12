# CurreVita — CV Builder

**Choose your language / Chọn ngôn ngữ:** [English](README.md) · [Tiếng Việt](README.vi.md)

Nuxt 2 · Vue 2 · JavaScript · Composition API · Vuex · Tailwind CSS

## Overview

CurreVita is a web application for browsing CV templates, editing resume content, and exporting the result as a PDF. This repository contains the frontend and serves as a portfolio project showcasing component design, reactive state management, internationalization, and browser-based document rendering.

## Features

- **Template discovery:** search templates by name, filter by color and style, and preview a template before editing.
- **Interactive CV editor:** edit text directly in the document; add, remove, and reorder content blocks; update the layout across multiple pages.
- **Personalization:** change colors and fonts, upload an avatar, and crop it to fit the template.
- **PDF preview and download:** capture the rendered document with `dom-to-image` and assemble a multi-page PDF with `jsPDF`.
- **English and Vietnamese UI:** localized interface text, template content, and search options.
- **Account integration:** sign-in and registration forms, Google/GitHub authentication integration, and API calls for loading and saving resumes.

The implemented editor template is **British Shorthair**, available at `/resume/british-shorthair`. The editor requires authentication and currently targets desktop screens (`lg` and above).

## Technology stack

| Area | Technologies | Role in this project |
| --- | --- | --- |
| Application | Nuxt 2, Vue 2, JavaScript | Server-rendered application, file-based routing, page layouts, and Vue single-file components |
| Component logic | `@nuxtjs/composition-api` | Reactive state, computed values, lifecycle hooks, and shared context |
| State management | Vuex | Separate modules for authentication, resume editing, search, colors, dictionaries, and modals |
| Styling | Tailwind CSS, custom CSS | Utility-based layouts, custom theme tokens, and document styling |
| Local content | `@nuxt/content` | JSON-backed template catalog, search/filter data, and localized dictionaries |
| Internationalization | `@nuxtjs/i18n` | English/Vietnamese locale switching with lazy-loaded translations |
| API and authentication | `@nuxtjs/axios`, `vue-authenticate`, `cookie-universal-nuxt` | Backend requests, OAuth integration, and cookie-backed authentication state |
| Forms and UI | VeeValidate, reCAPTCHA v3, `vue-js-modal`, `v-tooltip`, Epic Spinners | Form validation, verification integration, modals, tooltips, and loading feedback |
| Image and PDF tools | Cropper.js, `dom-to-image`, `jsPDF` | Avatar cropping, DOM capture, and PDF generation in the browser |
| Development tooling | Jest, Vue Test Utils, ESLint, Prettier | Component tests, code linting, and formatting tooling |
| Packaging | Docker, Yarn | Multi-stage container build and dependency installation using the lockfile |

## Frontend architecture

The editor connects Vue components to Vuex through injected services such as `$resume`, `$dictionary`, and `$api`. Components render the document and handle user interactions; `core/` exposes editing operations and API wrappers; store modules hold the application state.

```text
pages/          Routes: template catalog and CV editor
layouts/        Shared site layout and authenticated editor layout
components/     Editable content, template sections, cards, forms, and modals
core/           Resume operations and backend API wrappers
store/          Vuex modules for editing, search, authentication, and UI state
plugins/        Injected services and library integrations
content/        Template metadata, sample content, and EN/VI dictionaries
assets/         Styles, scripts, fonts, and SVG assets
test/           Component tests
jest/           Test setup, mocks, and helpers
```

Useful starting points for reviewing the frontend:

- [Editable text component](components/Wrap/Text.vue): inline editing behavior.
- [Editor store](store/resume/edit/): content updates, personalization, and page state.
- [Page editing operations](core/resume/common/edit/pages.js): interface for page layout operations.
- [British Shorthair template](pages/resume/british-shorthair.vue): document layout and reactive rendering.
- [PDF plugin](plugins/html2pdf.js): DOM capture, multi-page output, preview, and download.
- [Component tests](test/components/): tests for editable content, authentication modals, template cards, and shared UI.

## Run locally

The repository's Dockerfile uses **Node.js 16**. Use a compatible environment and **Yarn Classic** to reproduce this Nuxt 2 project.

```bash
yarn install --frozen-lockfile
```

Copy `.env.example` to `.env`, then configure the values for your environment. On PowerShell:

```powershell
Copy-Item .env.example .env
```

| Variable | Purpose |
| --- | --- |
| `WEB_URL` | Frontend URL, for example `http://localhost:3000/` |
| `API_URL` | Backend base URL consumed by Nuxt and the API plugins |
| `RECAPTCHA_SITE_KEY` | Site key for the reCAPTCHA integration |
| `GITHUB_CLIENT_ID`, `GITHUB_CALL_BACK` | GitHub OAuth configuration |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CALL_BACK` | Google OAuth configuration |
| `TWITTER_AUTHOR` | Author metadata configuration |

**Configuration detail:** `.env.example` currently contains `API_V1_URL`, while the application reads `API_URL`. Add `API_URL` to your local `.env` with the correct backend URL.

```bash
yarn dev
```

Open `http://localhost:3000`. The template catalog uses content stored in this repository. Authentication, loading saved resumes, and saving edits require a compatible backend, which is maintained separately. OAuth and reCAPTCHA also require their service configuration; the editor is not a standalone offline demo.

## Project commands

| Command | Purpose |
| --- | --- |
| `yarn dev` | Start the development server with hot reload |
| `yarn build` | Build the server-rendered application |
| `yarn start` | Start the production server after building |
| `yarn generate` | Generate static output; backend-dependent flows still require an API |
| `yarn test` | Run Jest component tests with coverage collection |
| `yarn lint` | Run ESLint with automatic fixes |
