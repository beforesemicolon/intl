# intl-number

`@beforesemicolon/intl@0.5.0` · `intl/intl-number`

Format a number, currency, percent, or unit.

## Setup

### npm

The npm root registers its custom elements automatically.

````js
import '@beforesemicolon/intl'
````

### Selective npm registration

The default export of the component subpath is an initializer, not a custom element class. Call it with the public Web Component module. Import the full root instead if the app needs every Intl element.

````js
import * as webComponent from '@beforesemicolon/web-component'
import register from '@beforesemicolon/intl/components/intl-number'

register(webComponent)
````

### Classic scripts

- `https://cdn.jsdelivr.net/npm/@beforesemicolon/web-component@1.22.0/dist/client.js`
- `https://cdn.jsdelivr.net/npm/@beforesemicolon/intl@0.5.0/dist/client.js`

Load scripts in the listed order. No bundler is needed.

## Element `<intl-number>`

Format locale-aware numbers using Intl.NumberFormat options. Keep raw numeric data separate from display text. For percentages, 0.25 is 25%.

Initial text takes precedence over value. Use an empty body with a value attribute for dynamic input, or supply raw input as the text. Do not use formatted text as the body.

- `value`: The value to format. Use a stable data value rather than already formatted text.
- `locale`: Optional BCP 47 language tag; defaults to the active runtime locale.
- `type`: Style: decimal, currency, percent, or unit.
- `currency`: ISO 4217 code for currency style.
- `currency-style`: Map to currencyDisplay (e.g. symbol, code, or name).
- `currency-sign`: Map to currencySign; use accounting for accounting notation.
- `unit`: Unit identifier for unit style.
- `unit-style`: Map to unitDisplay, e.g. short or long.
- `notation`: Number notation, e.g. standard or compact.
- `compact`: Map to compactDisplay when notation=compact.
- `system`: Map to numberingSystem.
- `grouping`: Map to useGrouping; use false to omit grouping.
- `sign`: Map to signDisplay.
- `rounding`: Map to roundingMode.
- `rounding-increment`: Numeric rounding increment.
- `rounding-priority`: Map to roundingPriority when precision options interact.
- `trailing-zero`: Map to trailingZeroDisplay.
- `min-digits`: Minimum integer digits.
- `significant-digits`: Whitespace-separated minimum and maximum significant digits.
- `fractions`: Whitespace-separated minimum and maximum fractional digits.

````html
<intl-number value="39" type="currency" currency="USD"></intl-number>
````

## Type-only exports

Import these with `import type` in TypeScript. They are not runtime values.

### `IntlNumberProps`

````typescript
export interface IntlNumberProps {
    value: number | string | undefined;
    locale: string;
    type: Intl.NumberFormatOptions['style'];
    currency: string;
    currencyStyle: Intl.NumberFormatOptions['currencyDisplay'];
    currencySign: Intl.NumberFormatOptions['currencySign'];
    unit: string;
    unitStyle: Intl.NumberFormatOptions['unitDisplay'];
    notation: Intl.NumberFormatOptions['notation'];
    compact: Intl.NumberFormatOptions['compactDisplay'];
    system: string;
    grouping: string | boolean;
    sign: Intl.NumberFormatOptions['signDisplay'];
    rounding: string;
    roundingIncrement: number | string | undefined;
    roundingPriority: string;
    trailingZero: string;
    minDigits: number | string | undefined;
    significantDigits: number | string | undefined;
    fractions: number | string | undefined;
}
````

## Examples

````js
import '@beforesemicolon/intl'
````

````html
<intl-number value="1200" type="currency" currency="USD">1200</intl-number>
````

### Classic

````html
<intl-number value="1200" type="currency" currency="USD">1200</intl-number>
````

[Back to the offline reference index](../index.md)
