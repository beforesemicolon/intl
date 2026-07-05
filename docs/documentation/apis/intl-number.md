---
name: intlNumber
order: 6.19
title: intlNumber - Intl by Before Semicolon
description: Helper function that mirrors the intl-number component API.
layout: document
---

## `intlNumber`

`intlNumber(props?)` formats a number using the same property names as `<intl-number>` attributes.

```ts
import { intlNumber } from '@beforesemicolon/intl'

intlNumber({
    value: 1299.99,
    locale: 'en-US',
    type: 'currency',
    currency: 'USD',
})
```

## Signature

```ts
function intlNumber(props?: Partial<IntlNumberProps>): string
```

## Property mapping

| Property | Component attribute | Description |
|---|---|---|
| `value` | `value` or child text | Number to format. Defaults to `0` for the helper. |
| `type` | `type` | `decimal`, `currency`, `percent`, or `unit`. |
| `currency` | `currency` | ISO currency code. |
| `currencyStyle` | `currency-style` | Maps to `currencyDisplay`. |
| `unit` | `unit` | Unit identifier, such as `kilometer`. |
| `unitStyle` | `unit-style` | Maps to `unitDisplay`. |
| `notation` | `notation` | Standard, scientific, engineering, or compact notation. |
| `compact` | `compact` | Compact display mode. |
| `system` | `system` | Numbering system. |
| `grouping` | `grouping` | `true`, `false`, or `Intl.NumberFormat` grouping mode. |
| `fractions` | `fractions` | `"min max"` fraction digit range. |

## Examples

```ts
intlNumber({ value: 0.25, type: 'percent' })
intlNumber({ value: 1200, notation: 'compact', compact: 'short' })
intlNumber({ value: 2.28, fractions: '0 1' })
```
