# intlMsg / intlNumber / intlDateTime and formatters

`@beforesemicolon/intl@0.5.0` · `intl/formatters`

Format locale-aware values without coupling output to custom elements.

- Use the formatter subpath when you do not need custom elements. In classic mode use BFS.INTL.
- Pass an explicit scope when formatting outside the top-level application. Native Intl options are used where applicable.
- Format functions take the value as the first argument. Do not pass an object with a value field as shown in older examples.

## Setup

### npm

No custom elements register when importing this subpath.

````js
import { intlMsg, intlNumber, intlDateTime, intlDuration, intlRelTime, intlList, intlName, intlPlural } from '@beforesemicolon/intl/formatters'
````

### Classic scripts

- `https://cdn.jsdelivr.net/npm/@beforesemicolon/web-component@1.22.0/dist/client.js`
- `https://cdn.jsdelivr.net/npm/@beforesemicolon/intl@0.5.0/dist/client.js`

**Available globals for this record:** `BFS.INTL.intlMsg`, `BFS.INTL.intlNumber`, `BFS.INTL.intlDateTime`, `BFS.INTL.intlDuration`, `BFS.INTL.intlRelTime`, `BFS.INTL.intlList`, `BFS.INTL.intlName`, `BFS.INTL.intlPlural`.

Load scripts in the listed order. No bundler is needed.

## Public values

### `intlMsg`

````typescript
intlMsg: (key: string, values?: MessageValues, options?: MessageFormatOptions) => string
````

Look up and interpolate a message. Without a matching key returns a configured missing value or the key. For untrusted content display the returned string with textContent.

````js
const label = intlMsg('checkout.title', { name: 'Pat' }, { scope, missing: 'Checkout' })
````

### `intlNumber`

````typescript
intlNumber: (value: number, options?: Intl.NumberFormatOptions & FormatterOptions) => string
````

Format a number with native Intl.NumberFormat options. locale selects a formatting locale; scope associates the formatter cache and usually the default language.

````js
console.log(intlNumber(1200, { locale: 'en-US', style: 'currency', currency: 'USD' }))
````

### `intlDateTime`

````typescript
intlDateTime: (value: string | number | Date, options?: Intl.DateTimeFormatOptions & FormatterOptions) => string
````

Format a Date, date string, or millisecond timestamp. Set a zone for reproducible cross-time-zone output and avoid mixing dateStyle or timeStyle with incompatible granular fields.

````js
console.log(intlDateTime('2026-01-01T15:00:00Z', { locale: 'en-US', dateStyle: 'medium', timeZone: 'UTC' }))
````

### `intlDuration`

````typescript
intlDuration: (value: number, options?: DurationFormatOptions) => string
````

Format an elapsed duration in milliseconds. Specify fields and display style. The runtime provides fallback formatting where native Intl.DurationFormat is absent.

````js
console.log(intlDuration(5400000, { locale: 'en-US', fields: ['hours', 'minutes'], style: 'short' }))
````

### `intlRelTime`

````typescript
intlRelTime: (value: number, options?: RelativeTimeFormatOptions) => string
````

With unit auto, pass a timestamp in milliseconds. With an explicit unit, pass an amount relative to now (negative for past, positive for future).

````js
console.log(intlRelTime(-2, { locale: 'en-US', unit: 'day', numeric: 'auto' }))
````

### `intlList`

````typescript
intlList: (value: string[] | string, options?: ListFormatOptions & FormatterOptions) => string
````

Format an array of strings using Intl.ListFormat. Prefer arrays for items containing multiple words; a string input is split at whitespace.

````js
console.log(intlList(['red apples', 'pears'], { locale: 'en-US', type: 'conjunction' }))
````

### `intlName`

````typescript
intlName: (value: string, options?: Intl.DisplayNamesOptions & FormatterOptions) => string
````

Format a code as a localized display name. Match the code to a native Intl.DisplayNames type.

````js
console.log(intlName('PT', { locale: 'en-US', type: 'region' }))
````

### `intlPlural`

````typescript
intlPlural: (value: number, options?: PluralFormatOptions) => string
````

Select supplied text by Intl.PluralRules category or return the category when no text matches. With ordinal, the number is prepended.

````js
console.log(intlPlural(2, { locale: 'en-US', one: 'result', other: 'results' }))
````

## Type-only exports

Import these with `import type` in TypeScript. They are not runtime values.

### `FormatterOptions`

````typescript
export interface FormatterOptions {
    locale?: string;
    scope?: IntlRuntime;
}
````

Use scope for app context and locale to intentionally override formatting language.

### `MessageFormatOptions`

````typescript
export interface MessageFormatOptions extends FormatterOptions {
    missing?: string | ((key: string) => string);
}
````

### `MessageValues`

````typescript
export type MessageValues = Record<string, unknown>;
````

Maps placeholder names to interpolation values; it is not the translation dictionary.

### `DurationFormatOptions`

````typescript
export interface DurationFormatOptions extends FormatterOptions {
    fields?: '*' | string | string[];
    style?: 'long' | 'short' | 'narrow' | 'digital';
}
````

### `RelativeTimeFormatOptions`

````typescript
export interface RelativeTimeFormatOptions extends FormatterOptions {
    unit?: 'auto' | Intl.RelativeTimeFormatUnit | Intl.RelativeTimeFormatUnitSingular;
    precision?: number;
    numeric?: Intl.RelativeTimeFormatNumeric;
    style?: Intl.RelativeTimeFormatStyle;
}
````

### `PluralFormatOptions`

````typescript
export interface PluralFormatOptions extends FormatterOptions {
    type?: Intl.PluralRuleType;
    zero?: string;
    one?: string;
    two?: string;
    few?: string;
    many?: string;
    other?: string;
}
````

### `DurationParts`

````typescript
export type DurationParts = Record<string, number>;
````

### `ListFormatType`

````typescript
export type ListFormatType = 'conjunction' | 'disjunction' | 'unit';
````

### `ListFormatStyle`

````typescript
export type ListFormatStyle = 'long' | 'short' | 'narrow';
````

### `ListFormatOptions`

````typescript
export interface ListFormatOptions {
    localeMatcher?: 'lookup' | 'best fit';
    type?: ListFormatType | 'and' | 'or' | 'none';
    style?: ListFormatStyle;
}
````

## Examples

````js
import { intlNumber } from '@beforesemicolon/intl/formatters'
console.log(intlNumber(1200, { locale: 'en-US', style: 'currency', currency: 'USD' }))
````

### Classic

````js
console.log(BFS.INTL.intlNumber(1200, { locale: 'en-US', style: 'currency', currency: 'USD' }))
````

## Related local reference

[intl/runtime](runtime.md) · [intl/intl-number](intl-number.md)

[Back to the offline reference index](../index.md)
