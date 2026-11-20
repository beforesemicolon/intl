# Intl workflows

[Public API, types, and elements](index.md) · [Runnable offline examples](../examples/README.md) · [Skill entry](../SKILL.md)

## Select the setup

In a bundled UI, import the npm root once to register every Intl element.
Import the runtime and formatters subpaths for tooling that runs without DOM
registration. If you want fewer elements, import exactly the default
initializers you use and call them once with the Web Component module. Merely
importing a component subpath does not register a custom element.

The full browser client registers Intl tags and provides runtime and formatter
functions under `BFS.INTL`. Load the Web Component browser client first; its
Markup runtime is already included. Use the full client when descendants
share a provider. Do not presume independently loaded classic component
scripts share a default runtime or a provider map.

## Separate language, message lookup, and format

A scope owns its active locale, dictionaries, fallback locale, and caches.
Use one outer locale provider for application text. A nested provider is useful
for isolated output, such as a bilingual preview, and does not need to change
`document.documentElement.lang`. Apply `update-document` only to the primary
provider if it should set page language and writing direction.

```html
<intl-locale locale="en" fallback-locale="en" src-dir="/locales" fallback update-document>
  <h1><intl-msg key="home.title">Welcome</intl-msg></h1>
  <intl-number value="29" type="currency" currency="USD"></intl-number>
</intl-locale>
```

Keep resource JSON under URLs accessible to the browser. `src-dir="/locales"`
loads `/locales/en.json` for locale `en`; `src` points to one exact URL.
Set `fallback-locale` for lookup fallback. The boolean `fallback` attribute
only shows the provider slot before data is ready. Use human-readable slot
text when a message may not be loaded yet.

If components need a shared runtime, mount the provider before translated
children. Router can render localized views inside the same provider so
navigation and language selection stay independent. For a nested provider,
resolve its mounted scope with the npm helper instead of replacing the global.

## Switch and respond to loading

After mounting the provider, use `setLocale(locale, scope)`. Omit its scope
only when the default is appropriate. Assigning the provider's locale
attribute is not a substitute for switching its mounted scope. Do not call
`initIntl` at every switch because that replaces the existing runtime.

```js
import { getIntlLocaleRuntime, setLocale, subscribeIntl } from '@beforesemicolon/intl'
const provider = document.querySelector('intl-locale')
const scope = getIntlLocaleRuntime(provider)
if (scope) {
  const stop = subscribeIntl(({ status }) => {
    document.querySelector('#language-status').textContent = status
  }, scope)
  try {
    await setLocale('pt', scope)
  } finally {
    stop()
  }
}
```

The above assumes an existing element with id `language-status` and loaded
locale resources. Read `status` and `error` from the returned snapshot when
a load fails; do not infer readiness from the selected UI option. The provider
has DOM lifecycle events. Use the [runtime references](apis/runtime.md) for
programmatic loading and subscription cleanup; there is no
`onLocaleMessagesLoaded` function in 0.5.0.

## Organize messages

Use semantic dotted keys, not long English sentences as identifiers. Keep
placeholders consistent across languages and provide values as an object:

```json
{
  "checkout": {
    "welcome": "Welcome, {name}",
    "action": "Continue to payment"
  }
}
```

```html
<intl-msg key="checkout.welcome" values='{"name":"Pat"}'>Welcome</intl-msg>
```

Use trusted data in template-rendered translations. For untrusted input, use
the formatter return value as text, not HTML. Validate translation keys and
message shape on the app side. Test a missing key and partial fallback; they
are distinct from a network error.

## Use the appropriate formatter

Formatter elements read initial text content before reading the value
attribute or property. Do not put already formatted fallback output inside
them. Use an empty element with a `value` attribute for dynamic input, or use
raw input as the body. The `intl-msg` element is different: its body is
message fallback text.

- Use number formatting for display only and preserve raw numeric values.
  The currency code and the language are separate choices.
- Use ISO timestamps with offsets and an explicit display timezone when
  consistency matters. Do not manually concatenate localized date pieces.
- Use elapsed milliseconds for duration. In automatic relative time use a
  timestamp; in explicit-unit relative time use an amount such as `-2 days`.
- Pass arrays for list entries with spaces. Use display names to localize
  known region or language codes, not to translate arbitrary strings.
- Supply appropriate plural categories for the target locale. Do not assume
  every language has just singular and plural. Keep the label and number
  rendered in their semantic order.

See the [formatter reference](apis/formatters.md) for copyable examples of
each formatter, and component pages for attribute-to-option mappings.

## Debug and test

1. Confirm scripts, package version, provider mount, and the entries used.
2. Verify the requested JSON URL and response before changing fallback logic.
3. Verify both the active translation and a key from the fallback locale.
4. Switch from the real labeled control, then check visible text and
   `html.lang` and `html.dir` when the provider updates the document.
5. Test unmount, failed requests, and a fast second switch. An isolated scope
   should release subscriptions and pending requests when destroyed.
