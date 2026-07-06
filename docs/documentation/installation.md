---
name: Installation
order: 3
title: Installation - Intl by Before Semicolon
description: Install Intl for browser CDN usage or module usage in any framework.
layout: document
---

## Install

`@beforesemicolon/intl` is designed to work in plain HTML, any framework, and tests.

You have two options:

- package manager + module usage
- CDN + browser globals

Both approaches expose the same runtime behavior.

## Via package manager

```bash
npm install @beforesemicolon/intl
```

Then initialize the runtime from your app entrypoint:

```ts
import {
    initIntl,
    intlMsg,
    intlNumber,
} from '@beforesemicolon/intl'
```

Use any exported helpers directly from your bundler or ESM loader.

## Via CDN (browser build)

```html
<script src="https://unpkg.com/@beforesemicolon/web-component/dist/client.js"></script>
<script src="https://unpkg.com/@beforesemicolon/intl/dist/client.js"></script>
```

When loaded this way, helper functions are available on `window.BFS.INTL`:

```html
<script>
  const { initIntl, intlMsg, intlNumber } = window.BFS.INTL
</script>
```

## Minimal runtime setup

```html
<intl-locale locale="en-US" fallback-locale="en" src-dir="/locales">
    <intl-msg key="hello">Hello</intl-msg>
    <intl-number type="currency" currency="USD">1200</intl-number>
</intl-locale>
```

`src-dir` loads `/locales/{locale}.json` by default (`/locales/en-US.json`).

## How to choose a setup

| Scenario | Setup |
|---|---|
| Static pages | Use CDN scripts and `intl-*` tags |
| SPA or app framework | Use module imports and `initIntl()` |
| Tests and snapshots | Use `initIntl()` with `messages` |

## Common installation notes

- Use `src` for exact scoped files such as `/locales/en.checkout.json`.
- Use `src-dir` for directory-based locale files such as `/locales/{locale}.json`.
- `locale` omits => runtime falls back to `document.documentElement.lang`.
- `fallback-locale` defaults to `en`.
- Add `update-document` only on the app root locale scope.

## Troubleshooting

If formatting is not updating:

- verify both scripts are loaded for browser/global mode
- verify your `src`/`src-dir` URLs return valid JSON
- ensure `intl-locale` exists in the DOM before components mount
