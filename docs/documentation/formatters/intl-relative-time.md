---
name: intlRelTime
order: 6.14
title: intlRelTime - Intl by Before Semicolon
description: Format relative timestamps or unit offsets with Intl.RelativeTimeFormat.
layout: document
---

## `intlRelTime`

`intlRelTime(value, options?)` formats relative values for times like:
- `0` -> now (subject to locale rules)
- `-1` -> past
- `1` -> future

It supports:
- `unit: 'auto'` (absolute timestamp compared to `Date.now()`)
- explicit units (`year`, `day`, `minute`, etc.)

Native reference:
[Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat)

## Signature

```ts
function intlRelTime(
  value: number,
  options?: {
    locale?: string
    scope?: IntlRuntime
    unit?: 'auto' | Intl.RelativeTimeFormatUnit
    precision?: number
    numeric?: 'always' | 'auto'
    style?: 'long' | 'short' | 'narrow'
  }
): string
```

Invalid numbers return `''`.

## Option map

| Option | Type | Default | Effect |
|---|---|---|---|
| `locale` | `string` | runtime locale | One-off locale override |
| `scope` | `IntlRuntime` | `getIntl()` | Use scoped runtime |
| `unit` | `'auto'` \| Intl.RelativeTimeFormatUnit | `'auto'` | Input interpretation |
| `precision` | `number` | `0` | Decimal precision for computed deltas |
| `numeric` | `'always' \| 'auto'` | `'auto'` | Numeric vs words like `yesterday` |
| `style` | `'long' \| 'short' \| 'narrow'` | `'long'` | Output compactness |

## Examples

### Auto timestamps

```ts
intlRelTime(Date.now() + 60_000, { unit: 'auto' }) // "in 1 minute"
intlRelTime(Date.now() - 60_000, { unit: 'auto' }) // "1 minute ago"
```

### Explicit unit offsets

```ts
intlRelTime(-2, { unit: 'day' }) // past
intlRelTime(2, { unit: 'day', numeric: 'always' }) // "in 2 days"
intlRelTime(-1, { unit: 'year', locale: 'fr-FR' })
```

### Styles and precision

```ts
intlRelTime(-30, { unit: 'minute', style: 'short' })
intlRelTime(1.54 * 60 * 60 * 1000, { unit: 'hour', precision: 1 })
intlRelTime(1.2345, { unit: 'second', precision: 2 })
```

### Scoped runtime usage

```ts
import { createIntl, intlRelTime } from '@beforesemicolon/intl'

const scoped = createIntl({ locale: 'de-DE', messages: {} })
intlRelTime(Date.now() - 86_400_000, { scope: scoped, unit: 'auto' })
```

## Fallback and edge cases

```ts
intlRelTime(Number.NaN) // ''
intlRelTime(1, { unit: 'invalid' as unknown as Intl.RelativeTimeFormatUnit }) // ''
```

## See also

- [intl-rel-time component reference](/documentation/components/intl-relative-time)
- [Intl.RelativeTimeFormat docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat)
