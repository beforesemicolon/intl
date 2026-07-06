---
name: initIntl
order: 7.02
title: initIntl - Intl by Before Semicolon
description: Initialize or replace the default Intl runtime used by helper functions and unscoped components.
layout: document
---

## `initIntl`

`initIntl(options?)` creates or replaces the package default runtime.

Use this at app entry, when one locale baseline should apply across the whole page.

```ts
import { initIntl } from '@beforesemicolon/intl'

initIntl({
  locale: navigator.language,
  fallbackLocale: 'en',
  srcDir: '/locales',
})
```

Native API: [`Intl.Locale`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale)

## Signature

```ts
function initIntl(options?: IntlRuntimeOptions): IntlRuntime
```

## What happens when called

- destroys any existing default runtime
- creates a new default runtime from options
- default runtime becomes the fallback for `initIntl`, helpers, and unscoped components

```ts
const runtime = initIntl({ locale: 'en-US', messages: { brand: 'Acme' } })
```

## Setup patterns

### Page-level scoped files

```ts
initIntl({
  locale: 'en',
  src: '/locales/en.landing-page.json',
  fallbackLocale: 'en',
})
```

### Runtime inheritance

`initIntl` is for global defaults. For nested or isolated contexts, create dedicated runtimes with `createIntl()`.

```ts
import { createIntl } from '@beforesemicolon/intl'

const child = createIntl({ locale: 'fr-FR', parentScope: initIntl() })
```

## Pairing with components

When components render outside `<intl-locale>`, they use this runtime.

```html
<intl-number type="currency" currency="USD">1299.99</intl-number>
```

