---
name: intl-number
order: 5.3
title: <intl-number> - Number Formatter
description: Format numbers, currencies, percentages, units, compact notation, digit ranges, and numbering systems.
layout: document
---

## `<intl-number>`

`<intl-number>` formats a numeric value with `Intl.NumberFormat`.
Prefer child text for simple values so you keep readable fallback content before JS upgrades the component.

Native reference: [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

```html
<intl-number>1299.99</intl-number>
```

## Attributes and properties

| Attribute | JS property | Type | Description |
|---|---|---|---|
| `value` | `value` | number/string | Value to format. Leave it out when the number is already in the element body. |
| `locale` | `locale` | string | Override the active runtime for this one number only. |
| `type` | `type` | `decimal` \| `currency` \| `percent` \| `unit` | Choose the formatter family: plain number, money, percentage, or measurement unit. |
| `currency` | `currency` | string | ISO 4217 currency code such as `USD`, `EUR`, or `JPY`. Required for `type="currency"`. |
| `currency-style` | `currencyStyle` | `symbol` \| `narrowSymbol` \| `code` \| `name` | Control whether the currency shows as a symbol, code, or localized name. |
| `currency-sign` | `currencySign` | `standard` \| `accounting` | Use accounting style when negative values should follow business-facing currency conventions. |
| `unit` | `unit` | string | Measurement unit identifier for `type="unit"`, such as `kilometer`, `liter`, or `celsius`. |
| `unit-style` | `unitStyle` | `long` \| `short` \| `narrow` | Control how much unit text is shown beside the number. |
| `notation` | `notation` | `standard` \| `scientific` \| `engineering` \| `compact` | Pick the numeric notation that best fits the UI space and audience. |
| `compact` | `compact` | `short` \| `long` | Choose the compact suffix style when `notation="compact"`. |
| `system` | `system` | string | Use a different digit system, such as Arabic-Indic digits. |
| `grouping` | `grouping` | boolean/string | Turn thousands separators on, off, or let the browser choose a grouping strategy. |
| `sign` | `sign` | `auto` \| `always` \| `exceptZero` \| `negative` \| `never` | Decide when positive, negative, or zero values should show a sign. |
| `rounding` | `rounding` | string | Choose the rounding behavior for values that do not fit the requested precision. |
| `rounding-increment` | `roundingIncrement` | number/string | Round to a fixed increment instead of a standard decimal step. |
| `rounding-priority` | `roundingPriority` | string | Tell the formatter whether fraction digits or significant digits should win. |
| `trailing-zero` | `trailingZero` | string | Keep or strip trailing zeros when the number is already whole. |
| `min-digits` | `minDigits` | number/string | Pad the integer part with leading zeros until it reaches the requested width. |
| `significant-digits` | `significantDigits` | `"min max"` | Limit the total number of significant digits. |
| `fractions` | `fractions` | `"min max"` | Control how many digits appear after the decimal point. |

## `value`

Use child text for static values or examples that should still read well before JS runs.

```html
<intl-number>1299.99</intl-number>
```

Use the property from JavaScript when the number is dynamic.

```html
<intl-number id="cart-total" type="currency" currency="USD">0</intl-number>

<script>
    document.getElementById('cart-total').value = 1299.99
</script>
```

## `locale`

Use `locale` when a single number needs a different locale than the surrounding page.

```html
<intl-number locale="fr-FR">1299.99</intl-number>
<intl-number locale="ar-EG">1299.99</intl-number>
```

## `type`

`type` chooses the output family. The browser rules for these styles come from `Intl.NumberFormat`.

```html
<intl-number type="decimal">1299.99</intl-number>
<intl-number type="percent">0.42</intl-number>
<intl-number type="currency" currency="USD">1299.99</intl-number>
<intl-number type="unit" unit="kilometer">12</intl-number>
```

## `currency`

Provide the ISO 4217 code for the money you are formatting. The locale and currency together decide the symbol, separators, and decimal rules.

```html
<intl-number type="currency" currency="USD">1299.99</intl-number>
<intl-number type="currency" currency="EUR">1299.99</intl-number>
<intl-number type="currency" currency="JPY">1299.99</intl-number>
```

## `currency-style`

`currency-style` controls how much currency text appears next to the amount. Use `symbol` for compact UI, `code` when currency must be explicit, and `name` when clarity matters more than space.

```html
<intl-number type="currency" currency="USD" currency-style="symbol">42</intl-number>
<intl-number type="currency" currency="USD" currency-style="narrowSymbol">42</intl-number>
<intl-number type="currency" currency="USD" currency-style="code">42</intl-number>
<intl-number type="currency" currency="USD" currency-style="name">42</intl-number>
```

## `currency-sign`

Use `currency-sign="accounting"` when negatives should look like financial statements, not raw math.

```html
<intl-number type="currency" currency="USD" currency-sign="standard">-42</intl-number>
<intl-number type="currency" currency="USD" currency-sign="accounting">-42</intl-number>
```

## `unit`

Provide the measurement unit you want the browser to localize, such as distance, weight, or temperature.

```html
<intl-number type="unit" unit="kilometer">12</intl-number>
<intl-number type="unit" unit="liter">2.5</intl-number>
<intl-number type="unit" unit="celsius">21</intl-number>
```

## `unit-style`

`unit-style` controls the length of the unit label. Use `narrow` in dense layouts and `long` when readability matters.

```html
<intl-number type="unit" unit="kilometer" unit-style="long">12</intl-number>
<intl-number type="unit" unit="kilometer" unit-style="short">12</intl-number>
<intl-number type="unit" unit="kilometer" unit-style="narrow">12</intl-number>
```

## `notation`

`notation` changes how the browser writes the number for human scanning. Use `compact` for dashboards and `scientific` or `engineering` for technical output.

```html
<intl-number notation="standard">1200000</intl-number>
<intl-number notation="scientific">1200000</intl-number>
<intl-number notation="engineering">1200000</intl-number>
<intl-number notation="compact">1200000</intl-number>
```

## `compact`

Use `compact` with `notation="compact"` to choose between short and long shorthand output, such as `1.2K` or `1.2 thousand`.

```html
<intl-number notation="compact" compact="short">1200000</intl-number>
<intl-number notation="compact" compact="long">1200000</intl-number>
```

## `system`

`system` maps to `numberingSystem`, which changes the digit set without changing the locale itself.

```html
<intl-number system="latn">123456</intl-number>
<intl-number system="arab">123456</intl-number>
<intl-number system="deva">123456</intl-number>
```

## `grouping`

`grouping` controls digit grouping. Use `min2` when you only want separators on values large enough to benefit from them.

```html
<intl-number grouping="true">1200000</intl-number>
<intl-number grouping="false">1200000</intl-number>
<intl-number grouping="min2">1200000</intl-number>
```

## `sign`

`sign` maps to `signDisplay`. This matters when you need to show positives explicitly or suppress signs in summary tables.

```html
<intl-number sign="auto">42</intl-number>
<intl-number sign="always">42</intl-number>
<intl-number sign="exceptZero">0</intl-number>
<intl-number sign="negative">-42</intl-number>
<intl-number sign="never">-42</intl-number>
```

## `rounding`

`rounding` maps to `roundingMode`. Use it when the default browser rounding rule is not the one your product needs.

```html
<intl-number rounding="ceil" fractions="0 0">1.2</intl-number>
<intl-number rounding="floor" fractions="0 0">1.8</intl-number>
<intl-number rounding="trunc" fractions="0 0">1.8</intl-number>
<intl-number rounding="halfExpand" fractions="0 0">1.5</intl-number>
```

## `rounding-increment`

`rounding-increment` rounds to a supported increment such as 5 or 25. This is useful for pricing, intervals, and reporting tiers.

```html
<intl-number rounding-increment="5" fractions="2 2">1.23</intl-number>
<intl-number rounding-increment="25" fractions="2 2">1.37</intl-number>
```

## `rounding-priority`

Use `rounding-priority` when both significant digits and fraction digits are configured. This decides which limit the browser should respect first.

```html
<intl-number
    significant-digits="2 4"
    fractions="0 2"
    rounding-priority="auto"
>
    12345.678
</intl-number>

<intl-number
    significant-digits="2 4"
    fractions="0 2"
    rounding-priority="morePrecision"
>
    12345.678
</intl-number>
```

## `trailing-zero`

`trailing-zero` maps to `trailingZeroDisplay`. Use it to avoid showing useless `.0` values in summary UIs.

```html
<intl-number fractions="0 2" trailing-zero="auto">1</intl-number>
<intl-number fractions="0 2" trailing-zero="stripIfInteger">1</intl-number>
```

## `min-digits`

`min-digits` maps to `minimumIntegerDigits`. Common use: pad IDs, counters, or clock-style values with leading zeros.

```html
<intl-number min-digits="2">7</intl-number>
<intl-number min-digits="4">7</intl-number>
```

## `significant-digits`

`significant-digits` accepts `minimum maximum`. Use it when you care about total precision more than decimal places.

```html
<intl-number significant-digits="2 4">12345.678</intl-number>
<intl-number significant-digits="3 3">12.345</intl-number>
```

## `fractions`

`fractions` accepts `minimum maximum`. Use it for consistent decimal precision in prices, measurements, and analytics values.

```html
<intl-number fractions="2 2">1299.9</intl-number>
<intl-number fractions="0 1">1299.95</intl-number>
```

## See also

- [intlNumber](/documentation/formatters/intl-number)
