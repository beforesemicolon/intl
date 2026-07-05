---
name: intl-number
order: 5.3
title: <intl-number> - Number Formatter
description: Format numbers, currencies, percentages, units, compact notation, digit ranges, and numbering systems.
layout: document
---

## `<intl-number>`

`<intl-number>` formats a numeric value with `Intl.NumberFormat`. The value can come from child text or the `value` attribute.

```html
<intl-number>1299.99</intl-number>
```

## Attributes and properties

| Attribute | JS property | Type | Description |
|---|---|---|---|
| `value` | `value` | number/string | Number to format. Child text is used when this is omitted. |
| `locale` | `locale` | string | Overrides the nearest runtime locale. |
| `type` | `type` | `decimal` \| `currency` \| `percent` \| `unit` | Maps to `Intl.NumberFormatOptions.style`. |
| `currency` | `currency` | string | ISO currency code, required for `type="currency"`. |
| `currency-style` | `currencyStyle` | `symbol` \| `narrowSymbol` \| `code` \| `name` | Currency display mode. |
| `currency-sign` | `currencySign` | `standard` \| `accounting` | Currency sign behavior. |
| `unit` | `unit` | string | Unit identifier for `type="unit"`. |
| `unit-style` | `unitStyle` | `long` \| `short` \| `narrow` | Unit display mode. |
| `notation` | `notation` | `standard` \| `scientific` \| `engineering` \| `compact` | Number notation. |
| `compact` | `compact` | `short` \| `long` | Compact display mode. |
| `system` | `system` | string | Numbering system, mapped to `numberingSystem`. |
| `grouping` | `grouping` | boolean/string | Maps to `useGrouping`. |
| `sign` | `sign` | `auto` \| `always` \| `exceptZero` \| `negative` \| `never` | Sign display mode. |
| `rounding` | `rounding` | string | Maps to `roundingMode`. |
| `rounding-increment` | `roundingIncrement` | number/string | Maps to `roundingIncrement`. |
| `rounding-priority` | `roundingPriority` | string | Maps to `roundingPriority`. |
| `trailing-zero` | `trailingZero` | string | Maps to `trailingZeroDisplay`. |
| `min-digits` | `minDigits` | number/string | Maps to `minimumIntegerDigits`. |
| `significant-digits` | `significantDigits` | `"min max"` | Sets minimum and maximum significant digits. |
| `fractions` | `fractions` | `"min max"` | Sets minimum and maximum fraction digits. |

## Currency

```html
<intl-number type="currency" currency="USD">1299.99</intl-number>
<intl-number type="currency" currency="EUR" currency-style="name">42</intl-number>
<intl-number type="currency" currency="USD" currency-sign="accounting">-42</intl-number>
```

## Percent, unit, and compact notation

```html
<intl-number type="percent">0.42</intl-number>
<intl-number type="unit" unit="kilometer" unit-style="long">12</intl-number>
<intl-number notation="compact" compact="short">1200000</intl-number>
```

## Digits and rounding

```html
<intl-number fractions="2 2">1299.9</intl-number>
<intl-number significant-digits="2 4">12345.678</intl-number>
<intl-number sign="always">42</intl-number>
<intl-number grouping="false">1200000</intl-number>
```

## JavaScript API equivalent

```ts
import { intlNumber, formatNumber } from '@beforesemicolon/intl'

intlNumber({
    value: 1299.99,
    type: 'currency',
    currency: 'USD',
})

formatNumber(1299.99, {
    style: 'currency',
    currency: 'USD',
})
```
