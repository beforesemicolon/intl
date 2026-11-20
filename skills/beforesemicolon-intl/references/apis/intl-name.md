# intl-name

`@beforesemicolon/intl@0.5.0` · `intl/intl-name`

Display a localized name for a region, language, or currency code.

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
import register from '@beforesemicolon/intl/components/intl-name'

register(webComponent)
````

### Classic scripts

- `https://cdn.jsdelivr.net/npm/@beforesemicolon/web-component@1.22.0/dist/client.js`
- `https://cdn.jsdelivr.net/npm/@beforesemicolon/intl@0.5.0/dist/client.js`

Load scripts in the listed order. No bundler is needed.

## Element `<intl-name>`

Display a human-readable name from a code, not a user-supplied name. Pair the code type with its value.

Initial text takes precedence over value. Use an empty body with a value attribute for dynamic input, or supply raw input as the text. Do not use formatted text as the body.

- `value`: Code appropriate for the chosen type, e.g. PT for region.
- `type`: DisplayNames type, such as region, language, or currency.
- `name-style`: DisplayNames style, such as long or short.
- `locale`: Optional BCP 47 language tag; defaults to the active runtime locale.
- `language`: Language display style, such as dialect or standard.

````html
<intl-name value="PT" type="region"></intl-name>
````

## Type-only exports

Import these with `import type` in TypeScript. They are not runtime values.

### `IntlNameProps`

````typescript
export interface IntlNameProps {
    value: string | undefined;
    type: Intl.DisplayNamesOptions['type'];
    nameStyle: Intl.DisplayNamesOptions['style'];
    locale: string;
    language: Intl.DisplayNamesOptions['languageDisplay'];
}
````

## Examples

````js
import '@beforesemicolon/intl'
````

````html
<intl-name value="PT" type="region"></intl-name>
````

### Classic

````html
<intl-name value="PT" type="region"></intl-name>
````

[Back to the offline reference index](../index.md)
