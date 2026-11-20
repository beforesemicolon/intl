# intl-locale

`@beforesemicolon/intl@0.5.0` · `intl/intl-locale`

Load messages and provide the active locale to descendants.

- Serve the two-view or locale-switch demo over HTTP with /locales/en.json and /locales/pt.json served at the host root.
- Use one top-level provider. Descendants read the nearest provider; nested scopes inherit parent values and may override them.
- Use fallback-locale to choose the fallback language. The fallback attribute instead allows slot content before messages finish loading.
- Add update-document only on the main locale provider. Use setLocale to switch the mounted runtime; do not assume that changing the provider attribute reconfigures the runtime.
- The provider emits locale-load, locale-change, or locale-error during its load. Use subscribeIntl for runtime-driven changes and unsubscribe on cleanup.

A root locale provider mounts the default runtime. A nested provider can create a child scope; changing the child should not replace the parent runtime. Use update-document only once.

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
import register from '@beforesemicolon/intl/components/intl-locale'

register(webComponent)
````

### Classic scripts

- `https://cdn.jsdelivr.net/npm/@beforesemicolon/web-component@1.22.0/dist/client.js`
- `https://cdn.jsdelivr.net/npm/@beforesemicolon/intl@0.5.0/dist/client.js`

Load scripts in the listed order. No bundler is needed.

## Element `<intl-locale>`

Create or mount a locale scope. The outermost provider supplies the default runtime. Nested scopes can inherit the parent messages and fallback. Descendants resolve the nearest provider. Use one provider for each intentional language boundary.

- `locale`: Active BCP 47 locale, such as pt-CV.
- `fallback-locale`: Fallback translation locale when a key is missing from active messages.
- `src`: Exact URL for messages. Use src-dir when switching between separate locale files.
- `src-dir`: Directory containing one JSON file per locale, e.g. /locales/pt.json.
- `update-document`: Reflect the active locale and direction on document.documentElement. Reserve this for the outermost provider.
- `fallback`: Render slot content before messages are ready. Does not select a fallback locale.

**Slots:** `default`.

### Events

- `locale-load`: detail type `IntlRuntimeSnapshot`.
- `locale-change`: detail type `IntlRuntimeSnapshot`.
- `locale-error`: detail type `IntlRuntimeSnapshot`.

````html
<intl-locale locale="en" fallback-locale="en" src-dir="/locales" fallback update-document><intl-msg key="home.title">Welcome</intl-msg></intl-locale>
````

## Examples

````js
import '@beforesemicolon/intl'
````

````html
<intl-locale locale="en" src-dir="/locales" fallback update-document><intl-msg key="home.title">Welcome</intl-msg></intl-locale>
````

### Classic

[Open the complete local example](../../examples/classic/locale-switch.html).

## Related local reference

[intl/intl-msg](intl-msg.md) · [intl/runtime](runtime.md)

[Back to the offline reference index](../index.md)
