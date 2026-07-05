---
name: Installation
order: 3
title: Installation - Intl by Before Semicolon
description: Install Intl for browser CDN usage or module usage in any framework.
layout: document
---

## Install

### Via package manager

```bash
npm install @beforesemicolon/intl
```

### Via CDN (browser build)

```html
<script src="https://unpkg.com/@beforesemicolon/web-component/dist/client.js"></script>
<script src="https://unpkg.com/@beforesemicolon/intl/dist/client.js"></script>
```

## Browser entrypoint (components)

When loading the client bundle, component runtime and custom elements are automatically prepared and exposed through `window.BFS.INTL`.

```html
<script>
  const { INTL } = window.BFS

  // Optional: format messages programmatically in your scripts
  const title = INTL.intlMsg('checkout.title', { total: '$100' })
</script>
```

## Module usage

```ts
import {
    initIntl,
    formatNumber,
    intlNumber,
    onLocaleMessagesLoaded,
} from '@beforesemicolon/intl'
```

## Minimal setup

```html
<intl-locale locale="en-US" fallback-locale="en" src-dir="/locales">
    <intl-msg key="hello">Hello</intl-msg>
    <intl-number value="1200" type="currency" currency="USD"></intl-number>
</intl-locale>
```

## Notes

- `intl-locale` will attempt to load locale files from `src` or `src-dir`.
- If you do not pass `fallbackLocale`, default is `en`.
- If no `locale` is provided, browser `html[lang]` is used.
