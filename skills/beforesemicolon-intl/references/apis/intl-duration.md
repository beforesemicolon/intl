# intl-duration

`@beforesemicolon/intl@0.5.0` · `intl/intl-duration`

Format a duration from milliseconds.

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
import register from '@beforesemicolon/intl/components/intl-duration'

register(webComponent)
````

### Classic scripts

- `https://cdn.jsdelivr.net/npm/@beforesemicolon/web-component@1.22.0/dist/client.js`
- `https://cdn.jsdelivr.net/npm/@beforesemicolon/intl@0.5.0/dist/client.js`

Load scripts in the listed order. No bundler is needed.

## Element `<intl-duration>`

Format a numeric duration, not a timestamp or ISO interval. The input unit is milliseconds. Select fields so an elapsed time uses the units that matter.

Initial text takes precedence over value. Use an empty body with a value attribute for dynamic input, or supply raw input as the text. Do not use formatted text as the body.

- `value`: Duration in milliseconds.
- `time-style`: Use long, short, narrow, or digital.
- `fields`: An asterisk for all fields or a whitespace-separated list such as hours minutes.
- `locale`: Optional BCP 47 language tag; defaults to the active runtime locale.

````html
<intl-duration value="5400000" fields="hours minutes" time-style="short"></intl-duration>
````

## Type-only exports

Import these with `import type` in TypeScript. They are not runtime values.

### `IntlDurationProps`

````typescript
export interface IntlDurationProps {
    locale: string;
    value: number | string | undefined;
    timeStyle: 'long' | 'short' | 'narrow' | 'digital';
    style: 'long' | 'short' | 'narrow' | 'digital';
    fields: '*' | string;
}
````

## Examples

````js
import '@beforesemicolon/intl'
````

````html
<intl-duration value="3600000" fields="hours" time-style="short"></intl-duration>
````

### Classic

````html
<intl-duration value="3600000" fields="hours" time-style="short"></intl-duration>
````

[Back to the offline reference index](../index.md)
