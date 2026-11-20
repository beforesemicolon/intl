# intl-list

`@beforesemicolon/intl@0.5.0` · `intl/intl-list`

Format a localized list with conjunction, disjunction, or unit style.

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
import register from '@beforesemicolon/intl/components/intl-list'

register(webComponent)
````

### Classic scripts

- `https://cdn.jsdelivr.net/npm/@beforesemicolon/web-component@1.22.0/dist/client.js`
- `https://cdn.jsdelivr.net/npm/@beforesemicolon/intl@0.5.0/dist/client.js`

Load scripts in the listed order. No bundler is needed.

## Element `<intl-list>`

Join values with locale-aware punctuation and conjunctions. A string value splits at whitespace. Use an array property when a single item contains spaces.

Initial text takes precedence over value. Use an empty body with a value attribute for dynamic input, or supply raw input as the text. Do not use formatted text as the body.

- `locale`: Optional BCP 47 language tag; defaults to the active runtime locale.
- `value`: List strings (property array or whitespace-separated HTML text).
- `type`: conjunction, disjunction, unit, or aliases and, or, none.
- `type-style`: Style preset, e.g. long, short, narrow.

````html
<intl-list value="pen book pencil" type="and"></intl-list>
````

## Type-only exports

Import these with `import type` in TypeScript. They are not runtime values.

### `IntlListProps`

````typescript
export interface IntlListProps {
    value: string[] | string | undefined;
    locale: string;
    type: 'conjunction' | 'disjunction' | 'unit' | 'and' | 'or' | 'none';
    typeStyle: 'long' | 'short' | 'narrow';
}
````

## Examples

````js
import '@beforesemicolon/intl'
````

````html
<intl-list value="book pen pencil" type="and"></intl-list>
````

### Classic

````html
<intl-list value="book pen pencil" type="and"></intl-list>
````

[Back to the offline reference index](../index.md)
