# @beforesemicolon/intl

Scoped internationalization for formatter functions and Web Components.

`@beforesemicolon/intl` gives you:

- Runtime scopes with locale, fallback locale, messages, loading state, and formatter caches.
- Formatter functions for messages, numbers, dates, durations, relative time, lists, display names, and plurals.
- Web Components that use the nearest `<intl-locale>` provider.
- Per-component entrypoints for lazy loading.
- A browser bundle for script-first apps.

## Install

```sh
npm install @beforesemicolon/intl
```

## Script-First Usage

Initialize the default runtime and call formatter functions directly.

```ts
import {
    intlMsg,
    intlNumber,
    initIntl,
    setLocale,
} from '@beforesemicolon/intl'

initIntl({
    locale: 'en-US',
    fallbackLocale: 'en',
    srcDir: '/locales',
})

intlMsg('home.title')
intlNumber(1200, { style: 'currency', currency: 'USD' })

await setLocale('pt-CV')
```

## Component-First Usage

Register the components you use, then add `<intl-locale>` around localized UI.

```ts
import '@beforesemicolon/intl/components/intl-locale'
import '@beforesemicolon/intl/components/intl-msg'
import '@beforesemicolon/intl/components/intl-number'
import '@beforesemicolon/intl/components/intl-datetime'
```

```html
<intl-locale locale="en-US" src-dir="/locales" fallback>
    <h1><intl-msg key="home.title"></intl-msg></h1>
    <intl-number value="1200" type="currency" currency="USD"></intl-number>
    <intl-datetime
        value="2026-01-01T10:00:00Z"
        date-style="medium"
        time-zone="UTC"
    ></intl-datetime>
</intl-locale>
```

## Nested Providers

Nested `<intl-locale>` providers create child runtime scopes. Child scopes inherit
parent messages and fallback messages unless they override them.

```html
<intl-locale locale="en-US" src-dir="/locales" fallback>
    <intl-msg key="checkout.title"></intl-msg>

    <intl-locale locale="pt-CV" src-dir="/locales" fallback>
        <intl-msg key="checkout.title"></intl-msg>
    </intl-locale>
</intl-locale>
```

## Lazy CDN Usage

```html
<script src="https://unpkg.com/@beforesemicolon/web-component/dist/client.js"></script>
<script src="https://unpkg.com/@beforesemicolon/intl/dist/client.js"></script>

<script>
    BFS.INTL.onLocaleMessagesLoaded
    BFS.INTL.intlMsg('home.title')
    BFS.INTL.intlNumber({ value: 1200, type: 'currency', currency: 'USD' })
</script>
```

For ESM CDNs, import component entrypoints independently:

```js
import 'https://esm.sh/@beforesemicolon/intl/components/intl-locale'
import 'https://esm.sh/@beforesemicolon/intl/components/intl-msg'
```

## Runtime API

```ts
import {
    createIntl,
    getIntl,
    initIntl,
    loadLocale,
    setLocale,
} from '@beforesemicolon/intl'

const checkoutIntl = createIntl({
    locale: 'en-US',
    fallbackLocale: 'en',
    messages: { total: 'Total: {amount}' },
})

getIntl(checkoutIntl)
await loadLocale('pt-CV', checkoutIntl)
await setLocale('pt-CV', checkoutIntl)
```

## Function API

```ts
intlMsg(key, values?, options?)
intlNumber(value, options?)
intlDateTime(value, options?)
intlDuration(value, options?)
intlRelTime(value, options?)
intlList(value, options?)
intlName(value, options?)
intlPlural(value, options?)
```

Each formatter accepts `locale` and `scope` options where applicable.

```ts
intlMsg('hello', { name: 'Elson' }, { scope: checkoutIntl })
intlNumber(1200, { locale: 'pt-CV' })
intlDateTime('2026-01-01T10:00:00Z', {
    dateStyle: 'medium',
    timeZone: 'UTC',
})
intlDuration(3600000, { fields: 'hours', style: 'short' })
intlRelTime(Date.now() + 60000, { unit: 'auto' })
intlList(['A', 'B', 'C'], { type: 'conjunction' })
intlName('PT', { type: 'region' })
intlPlural(2, { one: 'item', other: 'items' })
```

## Component API

| Component         | Purpose                          | Common attributes                                                            |
| ----------------- | -------------------------------- | ---------------------------------------------------------------------------- |
| `<intl-locale>`   | Provider scope and locale loader | `locale`, `fallback-locale`, `src`, `src-dir`, `fallback`, `update-document` |
| `<intl-msg>`      | Message lookup and interpolation | `key`, `values`                                                              |
| `<intl-number>`   | Number, currency, percent, unit  | `value`, `type`, `currency`, `unit`, `locale`                                |
| `<intl-datetime>` | Date/time formatting             | `value`, `date-style`, `time-style`, `time-zone`                             |
| `<intl-duration>` | Duration formatting              | `value`, `fields`, `time-style`                                              |
| `<intl-rel-time>` | Relative time formatting         | `value`, `unit`, `numeric`, `live`                                           |
| `<intl-list>`     | List formatting                  | `value`, `type`, `type-style`                                                |
| `<intl-name>`     | Display names                    | `value`, `type`, `name-style`, `language`                                    |
| `<intl-plural>`   | Plural selection                 | `value`, `type`, `zero`, `one`, `two`, `few`, `many`, `other`                |

## Message File Format

Message files are JSON objects. Nested keys are addressed with dot notation.

```json
{
    "home": {
        "title": "Welcome",
        "hello": "Hello {name}"
    },
    "checkout": {
        "total": "Total: {amount}"
    }
}
```

```html
<intl-msg key="home.hello" values='{"name":"Elson"}'></intl-msg>
```

## Fallback Behavior

- Components use the nearest `<intl-locale>` runtime.
- Explicit `locale` attributes override the provider locale for that component.
- Child providers inherit parent messages and fallback messages.
- `fallback-locale` is loaded when available.
- Missing messages render the key unless a custom missing handler is provided.
- Invalid formatter input renders an empty string and logs a component error.

## Examples Per Component

```html
<intl-msg key="home.title"></intl-msg>
<intl-number value="1200" type="currency" currency="USD"></intl-number>
<intl-datetime value="2026-01-01T10:00:00Z" date-style="long"></intl-datetime>
<intl-duration
    value="3600000"
    fields="hours"
    time-style="short"
></intl-duration>
<intl-rel-time value="1780000000000" live></intl-rel-time>
<intl-list value="book pen pencil" type="and"></intl-list>
<intl-name value="PT" type="region"></intl-name>
<intl-plural value="2" one="item" other="items"></intl-plural>
```

## Recommended Usage

- Use `<intl-msg key="...">` for message lookup.
- Use `time-zone` and `time-zone-name` for date-time options.
- Use package-level formatter functions when JavaScript code needs the same formatting behavior as components.
- Use `@beforesemicolon/intl/components/intl-*` entrypoints for lazy component registration.
- Use `<intl-locale>` scopes when a page or subtree needs explicit locale state.

## AI and ecosystem context

- [`llms.txt`](https://intl.beforesemicolon.com/llms.txt) is the concise,
  package-owned Intl and ecosystem contract for AI tools.
- [`llms-full.txt`](https://intl.beforesemicolon.com/llms-full.txt) contains the
  complete resolved documentation and examples.

Intl builds on Web Component and composes with Router inside the same DOM tree.
Markup owns reactive rendering, Web Component owns application elements, Router
owns navigation, and Intl owns localized output.

## Community

- [Contributing guidelines](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security policy](SECURITY.md)
- [BSD 3-Clause License](LICENSE)
