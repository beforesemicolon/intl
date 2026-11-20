# Formatter support utilities

`@beforesemicolon/intl@0.5.0` · `intl/format-utils`

Related utility exports for existing low-level code using the formatter module.

- Use these only for explicit low-level integration. Prefer the formatter functions for application code. These names are not classic browser globals.

These support exports exist for lower-level integrations. For everyday interfaces prefer the formatter functions, since they handle native defaults and scope options.

## Setup

### npm

No custom elements register when importing this subpath.

````js
import { IntlWithListFormat, listTypeAliases, getRuntime, getLocale, stableStringify, getCachedFormatter, interpolateMessage, normalizeDurationFields, getRelativeUnitAndValue, fallbackDurationFormat } from '@beforesemicolon/intl/formatters'
````

### Classic scripts

This record does not expose a classic-script API.

## Public values

### `IntlWithListFormat`

````typescript
IntlWithListFormat: typeof Intl & { ListFormat?: new (locale: string, options?: ListFormatOptions) => ListFormatter; }
````

Typed reference to the Intl namespace with an optional ListFormat constructor. Prefer intlList for ordinary formatting.

````js
const listSupported = Boolean(IntlWithListFormat.ListFormat)
````

### `listTypeAliases`

````typescript
listTypeAliases: Record<string, ListFormatType>
````

Map convenience names to native list types. Use native type names for browser APIs outside this package.

````js
console.log(listTypeAliases.and)
````

### `getRuntime`

````typescript
getRuntime: (scope?: IntlRuntime) => IntlRuntime
````

Resolve an explicit or default runtime for formatting. This support helper is npm-only.

````js
const formattingScope = getRuntime(scope)
````

### `getLocale`

````typescript
getLocale: ({ locale, scope }?: FormatterOptions) => string
````

Resolve explicit formatter locale before scope locale. Use this helper only when normal formatter options do not suffice.

````js
const locale = getLocale({ locale: 'pt', scope })
````

### `stableStringify`

````typescript
stableStringify: (value: unknown) => string
````

Serialize values with stable object key ordering for cache keys. Not intended as a persistence format.

````js
const key = stableStringify({ b: 1, a: 'two' })
````

### `getCachedFormatter`

````typescript
getCachedFormatter: <T>(type: string, locale: string, options: object, scope: IntlRuntime | undefined, create: () => T) => T
````

Reuse or create a formatter under a type, locale, options tuple, attached to a runtime scope.

````js
const format = getCachedFormatter('custom-number', 'en-US', {}, scope, () => new Intl.NumberFormat('en-US'))
````

### `interpolateMessage`

````typescript
interpolateMessage: (message: string, values?: MessageValues) => string
````

Replace {key} placeholders with values. Missing or null values produce empty text. Treat the result as text unless all input is trusted.

````js
console.log(interpolateMessage('Hello, {name}', { name: 'Pat' }))
````

### `normalizeDurationFields`

````typescript
normalizeDurationFields: (fields: DurationFormatOptions["fields"]) => Set<string>
````

Select recognized duration fields from an array, whitespace-separated text, or an asterisk.

````js
console.log([...normalizeDurationFields('hours minutes')])
````

### `getRelativeUnitAndValue`

````typescript
getRelativeUnitAndValue: (milliseconds: number, precision: number) => { value: number; unit: Intl.RelativeTimeFormatUnit; interval: number | null; }
````

Convert a signed millisecond delta to a selected unit, rounded value, and optional update interval. Use intlRelTime for a final localized label.

````js
console.log(getRelativeUnitAndValue(-300000, 0))
````

### `fallbackDurationFormat`

````typescript
fallbackDurationFormat: (parts: DurationParts, style?: string) => string
````

Format pre-split numeric duration parts where native duration formatting is unavailable. Prefer intlDuration for app output.

````js
console.log(fallbackDurationFormat({ hours: 1, minutes: 30 }, 'short'))
````

## Examples

````js
import { interpolateMessage } from '@beforesemicolon/intl/formatters'
console.log(interpolateMessage('Hello {name}', { name: 'Pat' }))
````

## Related local reference

[intl/formatters](formatters.md)

[Back to the offline reference index](../index.md)
