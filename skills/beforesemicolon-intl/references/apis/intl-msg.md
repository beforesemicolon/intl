# intl-msg

`@beforesemicolon/intl@0.5.0` · `intl/intl-msg`

Resolve a localized message key and interpolate values.

- Use key, not the legacy id alias. Dotted keys resolve nested message objects. Keep fallback text meaningful.
- Supply only trusted translation content and trusted interpolations; this component renders output as a template. For untrusted strings, use native textContent.

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
import register from '@beforesemicolon/intl/components/intl-msg'

register(webComponent)
````

### Classic scripts

- `https://cdn.jsdelivr.net/npm/@beforesemicolon/web-component@1.22.0/dist/client.js`
- `https://cdn.jsdelivr.net/npm/@beforesemicolon/intl@0.5.0/dist/client.js`

Load scripts in the listed order. No bundler is needed.

## Element `<intl-msg>`

Render the message for a dotted key, with optional interpolation. Visible slot text is the fallback if loading has not finished or lookup fails. Render only trusted translations and interpolated values through this HTML-capable element.

- `id`: Legacy alias for key; prefer key.
- `key`: Lookup key, such as home.title.
- `values`: JSON object mapping interpolation placeholders to values.

````html
<intl-msg key="welcome" values='{"name":"Pat"}'>Welcome, Pat</intl-msg>
````

## Examples

````js
import '@beforesemicolon/intl'
````

````html
<intl-msg key="home.hello" values='{"name":"Pat"}'>Hello Pat</intl-msg>
````

### Classic

````html
<intl-msg key="home.hello" values='{"name":"Pat"}'>Hello Pat</intl-msg>
````

## Related local reference

[intl/intl-locale](intl-locale.md) · [intl/formatters](formatters.md)

[Back to the offline reference index](../index.md)
