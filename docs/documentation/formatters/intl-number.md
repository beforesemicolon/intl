---
name: intlNumber
order: 6.11
title: intlNumber - Intl by Before Semicolon
description: Format decimal, currency, percent, unit, compact, and rounded numbers with Intl.NumberFormat.
layout: document
---

## `intlNumber`

`intlNumber(value, options?)` formats numeric values with locale-aware number patterns.
Use this for price, percentage, metrics, compact values, and measurement units.

Native reference:
[Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

## Signature

```ts
function intlNumber(
  value: number,
  options?: Intl.NumberFormatOptions & {
    locale?: string
    scope?: IntlRuntime
  }
): string
```

Invalid numbers return `''`.

## Option map

| Option | Type | Default | Effect |
|---|---|---|---|
| `locale` | `string` | runtime locale | One-off locale override |
| `scope` | `IntlRuntime` | `getIntl()` | Use runtime locale |
| `style` | `decimal \| currency \| percent \| unit` | `decimal` | Formatter mode |
| `currency` | `string` | `undefined` | Required for `style: 'currency'` |
| `unit` | `string` | `undefined` | Required for `style: 'unit'` |
| `unitDisplay` | `short \| narrow \| long` | `short` | Unit label size |
| `currencyDisplay` | `symbol \| code \| name \| narrowSymbol` | `symbol` | Currency label form |
| `signDisplay` | `auto \| always \| never \| exceptZero` | `auto` | Sign behavior |
| `minimumIntegerDigits` | `number` | `1` | Integer width |
| `minimumFractionDigits` | `number` | locale default | Fraction floor |
| `maximumFractionDigits` | `number` | locale default | Fraction cap |
| `minimumSignificantDigits` | `number` | `1` | Min significant digits |
| `maximumSignificantDigits` | `number` | locale default | Max significant digits |
| `roundingPriority` | `auto \| morePrecision \| lessPrecision` | `auto` | Precision control |
| `roundingMode` | `ceil \| floor \| expand \| trunc \| halfCeil \| halfFloor \| halfExpand \| halfEven` | locale default | Rounding behavior |
| `roundingIncrement` | `1 \| 2 \| 5 \| ...` | `1` | Rounding step |
| `trailingZeroDisplay` | `auto \| stripIfInteger` | `auto` | Strip trailing zeros |
| `notation` | `standard \| scientific \| engineering \| compact` | `standard` | Compact/engineering mode |
| `compactDisplay` | `short \| long` | `short` | Compact output style |
| `useGrouping` | `boolean \| 'auto' \| 'always'` | `true` | Group separator |
| `numberingSystem` | `string` | runtime default | Digit system |

## Examples

### Common modes

```ts
intlNumber(1299.99, { locale: 'en-US' }) // "1,299.99"
intlNumber(1299.99, { locale: 'en-US', style: 'currency', currency: 'USD' })
intlNumber(0.42, { style: 'percent' })
intlNumber(1_234_567, { style: 'unit', unit: 'kilometer', unitDisplay: 'long' })
```

### Precision control

```ts
intlNumber(1.2345, {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
})

intlNumber(1500, { style: 'compact', compactDisplay: 'short' })
intlNumber(0, { notation: 'scientific' })
```

### Signed values and locales

```ts
intlNumber(-12, { signDisplay: 'always' })
intlNumber(1_200.5, { locale: 'de-DE', style: 'currency', currency: 'EUR' })
```

### Runtime-specific usage

```ts
import { createIntl, intlNumber } from '@beforesemicolon/intl'

const scoped = createIntl({ locale: 'ar-EG', messages: {} })

intlNumber(1299.99, { scope: scoped, style: 'currency', currency: 'EGP' })
intlNumber(1299.99, { scope: scoped, currency: 'EGP', style: 'currency' })
```

## Empty/invalid output

```ts
intlNumber(NaN) // ''
intlNumber('12' as unknown as number) // ''
```

## See also

- [intl-number component reference](/documentation/components/intl-number)
- [Intl.NumberFormat docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
