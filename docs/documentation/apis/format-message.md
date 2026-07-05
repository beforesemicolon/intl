---
name: formatMessage
order: 6.10
title: formatMessage - Intl by Before Semicolon
description: Resolve a message key from an Intl runtime and interpolate placeholder values.
layout: document
---

## `formatMessage`

`formatMessage(key, values?, options?)` reads a message from the active runtime and replaces `{placeholders}` with values.

```ts
import { createIntl, formatMessage } from '@beforesemicolon/intl'

const scope = createIntl({
    locale: 'en-US',
    messages: {
        greeting: 'Hello {name}',
        checkout: { total: 'Total: {amount}' },
    },
})

formatMessage('greeting', { name: 'Ari' }, { scope }) // "Hello Ari"
formatMessage('checkout.total', { amount: '$42.00' }, { scope }) // "Total: $42.00"
```

## Signature

```ts
function formatMessage(
    key: string,
    values?: Record<string, unknown>,
    options?: {
        scope?: IntlRuntime
        locale?: string
        missing?: string | ((key: string) => string)
    }
): string
```

## Missing messages

```ts
formatMessage('missing.key', {}, { scope }) // "missing.key"
formatMessage('missing.key', {}, { scope, missing: 'Not found' }) // "Not found"
formatMessage('missing.key', {}, { scope, missing: (key) => `[${key}]` }) // "[missing.key]"
```

## Placeholder rules

Placeholders use `{name}` syntax. Missing, `undefined`, and `null` values render as empty strings.

```ts
formatMessage('greeting', {}, { scope }) // "Hello "
```

## Component equivalent

```html
<intl-msg key="greeting" values='{"name":"Ari"}'>Hello Ari</intl-msg>
```
