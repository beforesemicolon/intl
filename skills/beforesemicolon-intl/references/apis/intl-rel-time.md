# intl-rel-time

`@beforesemicolon/intl@0.5.0` · `intl/intl-rel-time`

Format a time relative to now, with optional live updates.

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
import register from '@beforesemicolon/intl/components/intl-rel-time'

register(webComponent)
````

### Classic scripts

- `https://cdn.jsdelivr.net/npm/@beforesemicolon/web-component@1.22.0/dist/client.js`
- `https://cdn.jsdelivr.net/npm/@beforesemicolon/intl@0.5.0/dist/client.js`

Load scripts in the listed order. No bundler is needed.

## Element `<intl-rel-time>`

Show time relative to now. With unit="auto", supply a timestamp or date. The tag can update while mounted when live is enabled. intl-relative-time is the compatibility spelling; prefer intl-rel-time.

Initial text takes precedence over value. Use an empty body with a value attribute for dynamic input, or supply raw input as the text. Do not use formatted text as the body.

- `live`: Opt in to updating the label as time passes.
- `decimals`: Legacy precision toggle; use precision for an exact number of decimals.
- `precision`: Decimal places for the numeric difference.
- `value`: Timestamp in milliseconds or date text for automatic mode.
- `time-style`: Display style: long, short, or narrow.
- `numeric`: Use auto for words such as tomorrow or always for numeric wording.
- `unit`: Use auto to select a unit from the timestamp. Otherwise choose a relative-time unit.
- `locale`: Optional BCP 47 language tag; defaults to the active runtime locale.

````html
<intl-rel-time value="2026-01-01T12:00:00Z" unit="auto" numeric="auto" live></intl-rel-time>
````

## Type-only exports

Import these with `import type` in TypeScript. They are not runtime values.

### `IntlRelTimeProps`

````typescript
export interface IntlRelTimeProps {
    live: boolean | string;
    decimals: boolean | string;
    precision: number | string | undefined;
    value: number | string | Date | undefined;
    style: Intl.RelativeTimeFormatStyle;
    timeStyle: Intl.RelativeTimeFormatStyle;
    numeric: Intl.RelativeTimeFormatNumeric | boolean | string;
    unit: 'auto' | Intl.RelativeTimeFormatUnit | Intl.RelativeTimeFormatUnitSingular;
    locale: string;
}
````

## Examples

````js
import '@beforesemicolon/intl'
````

````html
<intl-rel-time value="1780000000000" numeric="auto"></intl-rel-time>
````

### Classic

````html
<intl-rel-time value="1780000000000" numeric="auto"></intl-rel-time>
````

[Back to the offline reference index](../index.md)
