# intl-plural

`@beforesemicolon/intl@0.5.0` · `intl/intl-plural`

Choose localized text by plural category.

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
import register from '@beforesemicolon/intl/components/intl-plural'

register(webComponent)
````

### Classic scripts

- `https://cdn.jsdelivr.net/npm/@beforesemicolon/web-component@1.22.0/dist/client.js`
- `https://cdn.jsdelivr.net/npm/@beforesemicolon/intl@0.5.0/dist/client.js`

Load scripts in the listed order. No bundler is needed.

## Element `<intl-plural>`

Select text by plural category. Do not hard-code an English singular/plural rule in a localized app. Cardinal returns the selected category text. Ordinal appends the selected suffix to the numeric value.

Initial text takes precedence over value. Use an empty body with a value attribute for dynamic input, or supply raw input as the text. Do not use formatted text as the body.

- `value`: Number to classify.
- `type`: cardinal or ordinal.
- `locale`: Optional BCP 47 language tag; defaults to the active runtime locale.
- `zero`: Text for category zero.
- `one`: Text for category one.
- `two`: Text for category two.
- `few`: Text for category few.
- `many`: Text for category many.
- `other`: Text for category other and the fallback when no selected category text is supplied.

````html
<intl-plural value="2" one="result" other="results"></intl-plural>
````

## Type-only exports

Import these with `import type` in TypeScript. They are not runtime values.

### `IntlPluralProps`

````typescript
export interface IntlPluralProps {
    value: number | string | undefined;
    type: Intl.PluralRuleType;
    locale: string;
    zero: string;
    one: string;
    two: string;
    few: string;
    many: string;
    other: string;
}
````

## Examples

````js
import '@beforesemicolon/intl'
````

````html
<intl-plural value="2" one="item" other="items"></intl-plural>
````

### Classic

````html
<intl-plural value="2" one="item" other="items"></intl-plural>
````

[Back to the offline reference index](../index.md)
