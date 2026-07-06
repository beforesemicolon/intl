---
name: intlMsg
order: 6.10
title: intlMsg - Intl by Before Semicolon
description: Resolve a message key from an Intl runtime and interpolate placeholder values.
layout: document
---

## `intlMsg`

`intlMsg(key, values?, options?)` resolves a message key from runtime messages and returns a plain string.
Use this for server-side rendering, app-level formatting, and logic where you need only the text result.

It matches message behavior used by `<intl-msg>` so keys and placeholders are consistent across JS + components.

For rich HTML output use `<intl-msg>` instead and keep HTML in runtime messages only when trusted.

## Signature

```ts
function intlMsg(
  key: string,
  values?: Record<string, unknown>,
  options?: {
    scope?: IntlRuntime
    locale?: string
    missing?: string | ((key: string) => string)
  }
): string
```

`key` can use dot notation (`checkout.total`) for nested message objects.

## What `values` means

`values` maps placeholders to replacements in the message template:

```ts
intlMsg('invoice.total', { amount: '$42.00' }, { scope: runtime })
```

When a placeholder is missing, `null`, `undefined`, or omitted, it renders as an empty string.

## Option map

| Option | Type | Default | Effect |
|---|---|---|---|
| `scope` | `IntlRuntime` | `getIntl()` | Use explicit runtime instead of default runtime |
| `locale` | `string` | scope/default locale | Render with a one-off locale |
| `missing` | `string \| ((key) => string)` | `key` | Fallback when message is not found |

## Examples

### Basic message + interpolation

```ts
import { createIntl, intlMsg } from '@beforesemicolon/intl'

const runtime = createIntl({
  locale: 'en-US',
  messages: {
    greeting: 'Hello {name}',
    invoice: { total: 'Total: {amount}' },
    items: {
      remaining: 'You have {count} items',
    },
  },
})

intlMsg('greeting', { name: 'Ari' }, { scope: runtime })
intlMsg('items.remaining', { count: 3 }, { scope: runtime })
```

### Nested key paths

```ts
intlMsg('invoice.total', { amount: '$42.00' }, { scope: runtime })
intlMsg('invoice.total', { amount: '$42.00' }, { locale: 'fr-FR' })
```

### Missing key behavior

```ts
intlMsg('missing', { name: 'Ari' }, { scope: runtime })
intlMsg('missing', { name: 'Ari' }, { scope: runtime, missing: 'fallback' })
intlMsg('missing', { name: 'Ari' }, {
  scope: runtime,
  missing: (key) => `[${key}]`,
})
```

### Empty and invalid inputs

```ts
intlMsg('', { name: 'Ari' }, { scope: runtime }) // ''
```

## See also

- [intl-msg component reference](/documentation/components/intl-msg)
