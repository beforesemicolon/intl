---
name: initIntl
order: 6.02
title: initIntl - Intl by Before Semicolon
description: Initialize or replace the default Intl runtime used by helper functions and unscoped components.
layout: document
---

## `initIntl`

`initIntl(options?)` creates the default runtime. Formatter functions use this runtime when you do not pass a `scope`, and components use it when they are not inside an `<intl-locale>` provider.

```ts
import { initIntl, formatMessage, formatNumber } from '@beforesemicolon/intl'

initIntl({
    locale: 'en-US',
    messages: {
        greeting: 'Hello {name}',
    },
})

formatMessage('greeting', { name: 'Sam' }) // "Hello Sam"
formatNumber(1200) // "1,200"
```

## Signature

```ts
function initIntl(options?: IntlRuntimeOptions): IntlRuntime
```

Calling `initIntl` destroys the previous default runtime before creating the new one.

## Typical app setup

```ts
const runtime = initIntl({
    locale: navigator.language,
    fallbackLocale: 'en',
    srcDir: '/locales',
})

await runtime.loadLocale()
```

## Replace the default runtime after a user setting changes

```ts
initIntl({
    locale: savedLocale,
    fallbackLocale: 'en',
    messages: preloadedMessages,
})
```

Use `setLocale()` when you want to keep the same runtime instance and notify subscribers. Use `initIntl()` when the whole application runtime should be rebuilt.

## With components

```html
<intl-number type="currency" currency="USD">1299.99</intl-number>
```

If that component is not inside `<intl-locale>`, it subscribes to the default runtime created by `initIntl`.
