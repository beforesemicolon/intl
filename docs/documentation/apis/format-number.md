---
name: formatNumber
order: 6.11
title: formatNumber - Intl by Before Semicolon
description: Format decimal, currency, percent, unit, compact, and rounded numbers with Intl.NumberFormat.
layout: document
---

## `formatNumber`

`formatNumber(value, options?)` wraps `Intl.NumberFormat` and uses the runtime locale unless `options.locale` is provided.

```ts
import { formatNumber } from '@beforesemicolon/intl'

formatNumber(1299.99, { locale: 'en-US' }) // "1,299.99"
formatNumber(1299.99, { locale: 'en-US', style: 'currency', currency: 'USD' })
formatNumber(0.42, { locale: 'en-US', style: 'percent' }) // "42%"
```

## Signature

```ts
function formatNumber(
    value: number,
    options?: Intl.NumberFormatOptions & {
        locale?: string
        scope?: IntlRuntime
    }
): string
```

Invalid numbers return an empty string.

## Common permutations

```ts
formatNumber(1500, { notation: 'compact', compactDisplay: 'short' })
formatNumber(12, { style: 'unit', unit: 'kilometer', unitDisplay: 'long' })
formatNumber(-12, { signDisplay: 'always' })
formatNumber(1234.567, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
})
formatNumber(1234, { numberingSystem: 'arab' })
```

## Scoped locale

```ts
const scope = createIntl({ locale: 'fr-FR' })

formatNumber(1299.99, {
    scope,
    style: 'currency',
    currency: 'EUR',
})
```

## Component equivalent

```html
<intl-number type="currency" currency="USD">1299.99</intl-number>
```
