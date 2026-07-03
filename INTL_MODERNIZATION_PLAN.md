# @beforesemicolon/intl Modernization Plan

## Objective

Modernize `@beforesemicolon/intl` into a lazy, scoped, Web Component-first internationalization package where:

1. Formatter functions are the source of truth.
2. Components are thin wrappers around formatter functions.
3. `<intl-locale>` defines an isolated intl scope.
4. Nested locale providers are allowed.
5. Components always use the nearest `<intl-locale>` scope.
6. Providers can override parent locale/messages.
7. Formatter functions can use the active scope or accept explicit locale/options.
8. The package supports lazy loading by module, component, and CDN entrypoint.

---

## Target Architecture

### Runtime Scope

A runtime scope represents one intl context. Each scope contains:

- `locale`
- `fallbackLocale`
- `messages`
- `fallbackMessages`
- `direction`
- `loadedLocales`
- `status`
- `formatterCache`
- `messageCache`
- `subscribers`
- `parentScope`

Scopes are not global-only. A page can have multiple scoped intl runtimes.

```html
<intl-locale locale="en-US" src-dir="/locales">
  <app-shell>
    <intl-msg key="dashboard.title"></intl-msg>

    <intl-locale locale="pt-CV" src-dir="/locales">
      <intl-msg key="dashboard.title"></intl-msg>
    </intl-locale>
  </app-shell>
</intl-locale>
```

The inner message uses `pt-CV`. The outer message uses `en-US`.

---

## Public Runtime API

### `createIntl(options)`

Creates a scoped runtime manually.

```ts
const intl = createIntl({
  locale: 'en-US',
  fallbackLocale: 'en',
  srcDir: '/locales',
})
```

Returns:

```ts
{
  locale,
  fallbackLocale,
  messages,
  status,

  setLocale(locale),
  loadLocale(locale),
  setMessages(messages),
  getMessage(key),
  subscribe(listener),
  destroy(),

  formatMessage(key, values?, options?),
  formatNumber(value, options?),
  formatDateTime(value, options?),
  formatDuration(value, options?),
  formatRelativeTime(value, options?),
  formatList(items, options?),
  formatName(value, options?),
  formatPlural(value, options?)
}
```

### `initIntl(options)`

Initializes the default global runtime scope. This is used by script-first apps.

```ts
initIntl({
  locale: 'en-US',
  srcDir: '/locales',
})
```

### `getIntl(scope?)`

Returns a runtime.

Resolution rules:

1. If a scope is provided, return that scope.
2. If called from a component, use nearest `<intl-locale>`.
3. Otherwise use default runtime.
4. If default runtime does not exist, create one from document language.

### `setLocale(locale, scope?)`

Updates locale for a scope.

```ts
setLocale('pt-CV')
setLocale('pt-CV', scopedIntl)
```

### `loadLocale(locale, scope?)`

Loads messages for a locale.

```ts
await loadLocale('pt-CV')
```

---

## Formatter Function API

Formatter functions are the source of truth. Components must not contain formatting logic.

Required exports:

```ts
formatMessage(key, values?, options?)
formatNumber(value, options?)
formatDateTime(value, options?)
formatDuration(value, options?)
formatRelativeTime(value, options?)
formatList(items, options?)
formatName(value, options?)
formatPlural(value, options?)
```

Each function supports:

```ts
{
  locale?: string
  scope?: IntlRuntime
}
```

Examples:

```ts
formatNumber(1200)
formatNumber(1200, { locale: 'pt-CV' })
formatNumber(1200, { scope: checkoutIntl })
```

Locale resolution order:

1. explicit `locale`
2. explicit `scope.locale`
3. nearest provider scope
4. default runtime locale
5. `document.documentElement.lang`
6. fallback: `en`

---

## `<intl-locale>` Component

### Purpose

`<intl-locale>` defines an intl scope for its children. It can be used as:

1. root app provider
2. nested locale override
3. lazy locale loader
4. component-first initializer

### Attributes / Props

```html
<intl-locale
  locale="en-US"
  fallback-locale="en"
  src="/locales/en-US.json"
  src-dir="/locales"
  scope="checkout"
  inherit
>
</intl-locale>
```

Supported props:

- `locale`
- `fallback-locale`
- `src`
- `src-dir`
- `messages`
- `loader`
- `scope`
- `inherit`
- `update-document`
- `missing`
- `lazy`

### Behavior

On mount:

1. Find nearest parent `<intl-locale>`.
2. Create a new child runtime scope.
3. If `inherit` is true, inherit parent messages/fallbacks.
4. If `locale` is provided, override parent locale.
5. If no locale is provided, inherit parent locale.
6. Load messages from `messages`, `src`, `src-dir`, or `loader`.
7. Set local `lang` and `dir`.
8. Notify all child components.
9. Render slot content.

### Nested Provider Rules

Nested providers are allowed. Child provider uses parent as fallback unless disabled.

```html
<intl-locale locale="en-US">
  <intl-msg key="hello"></intl-msg>

  <intl-locale locale="pt-CV">
    <intl-msg key="hello"></intl-msg>
  </intl-locale>
</intl-locale>
```

The inner component uses the nearest provider.

---

## Lazy Loading Strategy

The package must support granular loading.

### Package Exports

```json
{
  "exports": {
    ".": "./dist/index.js",
    "./runtime": "./dist/runtime.js",
    "./message": "./dist/message.js",
    "./number": "./dist/number.js",
    "./datetime": "./dist/datetime.js",
    "./duration": "./dist/duration.js",
    "./relative-time": "./dist/relative-time.js",
    "./list": "./dist/list.js",
    "./name": "./dist/name.js",
    "./plural": "./dist/plural.js",

    "./components/locale": "./dist/components/locale.js",
    "./components/msg": "./dist/components/msg.js",
    "./components/number": "./dist/components/number.js",
    "./components/datetime": "./dist/components/datetime.js",
    "./components/duration": "./dist/components/duration.js",
    "./components/relative-time": "./dist/components/relative-time.js",
    "./components/list": "./dist/components/list.js",
    "./components/name": "./dist/components/name.js",
    "./components/plural": "./dist/components/plural.js"
  }
}
```

### CDN Usage

Full bundle:

```html
<script type="module" src="https://unpkg.com/@beforesemicolon/intl/dist/client.js"></script>
```

Only locale + message:

```html
<script type="module" src="https://unpkg.com/@beforesemicolon/intl/dist/components/locale.js"></script>
<script type="module" src="https://unpkg.com/@beforesemicolon/intl/dist/components/msg.js"></script>
```

Only number formatter:

```html
<script type="module" src="https://unpkg.com/@beforesemicolon/intl/dist/components/number.js"></script>
```

### Lazy Component Registration

Each component module registers only itself. Importing `<intl-number>` must not register every other intl component.

---

## Phase 1 — Runtime Scope

Build scoped runtime first.

### Deliverables

- `createIntl()`
- `initIntl()`
- `getIntl()`
- `setLocale()`
- `loadLocale()`
- `subscribe()`
- scoped parent/child runtime model
- default runtime fallback
- runtime tests

### Implementation Notes

Create a core `IntlRuntime` class or factory. It should not depend on Web Components. Components depend on runtime, but runtime does not depend on components.

---

## Phase 2 — Locale Loading

Build message loading into runtime.

### Supported Sources

```ts
createIntl({
  locale: 'en-US',
  messages: {},
})
```

```ts
createIntl({
  locale: 'en-US',
  src: '/locales/en-US.json',
})
```

```ts
createIntl({
  locale: 'en-US',
  srcDir: '/locales',
})
```

```ts
createIntl({
  locale: 'en-US',
  loader: async (locale) => {
    return import(`/locales/${locale}.json`)
  },
})
```

### Rules

- Cache loaded locales.
- Abort stale fetches.
- Support fallback locale.
- Support parent-scope fallback.
- Expose loading/error state.
- Dispatch `locale-load`, `locale-error`, and `locale-change` events from component provider.

---

## Phase 3 — Formatter Functions

Move all formatting logic into pure exported functions.

### Required Functions

- `formatMessage`
- `formatNumber`
- `formatDateTime`
- `formatDuration`
- `formatRelativeTime`
- `formatList`
- `formatName`
- `formatPlural`

### Requirements

- Accept explicit locale override.
- Accept explicit runtime scope.
- Use runtime formatter cache.
- Validate input.
- Return string output.
- Never directly manipulate DOM.
- No component dependency.

---

## Phase 4 — `<intl-locale>` Provider

Refactor `<intl-locale>` to use runtime scopes.

### Requirements

- Creates scoped runtime.
- Supports nested providers.
- Allows locale override.
- Uses nearest parent provider as parent scope.
- Provides scope to descendants.
- Initializes default runtime if needed.
- Can update document `<html lang>` and `<html dir>` only if `update-document` is true.
- Renders slotted content after ready, unless fallback rendering is enabled.

---

## Phase 5 — `<intl-msg>` / `formatMessage`

### `formatMessage` Features

- nested keys: `home.hero.title`
- interpolation: `{name}`
- fallback values
- missing-key behavior
- parent-scope fallback
- fallback-locale fallback
- rich text token support

### Component

```html
<intl-msg key="home.title"></intl-msg>
<intl-msg key="hello" values='{"name":"Elson"}'></intl-msg>
```

Rules:

- Component finds nearest locale scope.
- Calls `formatMessage`.
- Re-renders on scope update.
- Supports `id` as deprecated alias for `key`.

---

## Phase 6 — Number

### `formatNumber`

Support:

- decimal
- currency
- percent
- unit
- compact notation
- rounding
- numbering system
- grouping
- sign display

### Component

```html
<intl-number value="1200" type="currency" currency="USD"></intl-number>
```

Rules:

- No internal formatter logic.
- Uses `formatNumber`.
- Uses nearest locale scope.
- Supports explicit `locale`.

---

## Phase 7 — DateTime

### `formatDateTime`

Support:

- `dateStyle`
- `timeStyle`
- `timeZone`
- `timeZoneName`
- `calendar`
- `hourCycle`
- custom date parts

Fix current `timezoneName` naming issue.

### Component

```html
<intl-datetime value="2026-01-01T10:00:00Z" date-style="medium"></intl-datetime>
```

Rules:

- Render semantic `<time datetime="...">`.
- Use nearest locale scope.
- Support explicit locale.

---

## Phase 8 — Relative Time

### `formatRelativeTime`

Support:

- auto unit
- explicit unit
- precision
- numeric mode
- style
- locale override

### Component

```html
<intl-rel-time value="1780000000000" live></intl-rel-time>
```

Rules:

- Use nearest locale scope.
- Fix locale override bug.
- Cleanup timers.
- Render `<time datetime="...">` where possible.

---

## Phase 9 — Duration

### `formatDuration`

Support:

- `Intl.DurationFormat` when available
- fallback implementation
- selected units
- narrow/short/long styles
- localized list formatting

### Component

```html
<intl-duration value="3600000" fields="hour minute"></intl-duration>
```

Rules:

- Use nearest locale scope.
- No hardcoded English unless fallback locale requires it.

---

## Phase 10 — List / Name / Plural

### `formatList`

Uses `Intl.ListFormat`.

```ts
formatList(['A', 'B', 'C'], { type: 'conjunction' })
```

### `formatName`

Uses `Intl.DisplayNames`.

```ts
formatName('PT', { type: 'region' })
```

### `formatPlural`

Uses `Intl.PluralRules`.

```ts
formatPlural(2, {
  one: 'item',
  other: 'items',
})
```

Components:

- `<intl-list>`
- `<intl-name>`
- `<intl-plural>`

All must use nearest locale scope.

---

## Phase 11 — Formatter Cache

Add shared formatter cache per runtime scope.

### Cache Targets

- `Intl.NumberFormat`
- `Intl.DateTimeFormat`
- `Intl.RelativeTimeFormat`
- `Intl.ListFormat`
- `Intl.DisplayNames`
- `Intl.PluralRules`
- `Intl.DurationFormat` when available

### Cache Key

```ts
`${formatterType}:${locale}:${stableStringify(options)}`
```

---

## Phase 12 — Component Registration

Make each component independently loadable.

### Rules

- Each component has its own entry file.
- Each component registers only itself.
- Full bundle imports all component entry files.
- Runtime/function modules do not auto-register components.

Example:

```ts
import '@beforesemicolon/intl/components/number'
```

---

## Phase 13 — Accessibility + SEO

### Requirements

- No Shadow DOM for text output unless explicitly enabled.
- Localized text should appear in real DOM.
- Components set `lang`.
- Components set `dir`.
- Date components render `<time>`.
- Short/narrow output supports `aria-label`.
- Fallback text should be available before load when possible.

---

## Phase 14 — Developer Experience

### Improve

- Clear prop names.
- Dev-only deprecation warnings.
- Strong TypeScript types.
- Better errors.
- Better README.
- API examples.
- CDN examples.
- Migration guide.

### Deprecated Aliases

Keep temporarily:

- `id` alias for `key`
- `timezone` alias for `time-zone`
- `timezone-name` alias for `time-zone-name`
- `time-style` alias for `style` where appropriate

---

## Phase 15 — Testing

### Required Tests

- runtime creation
- nested runtime scopes
- parent fallback
- locale override
- message loading
- abort stale loads
- formatter functions
- component rendering
- component nearest-provider resolution
- lazy component imports
- formatter caching
- relative-time cleanup
- accessibility output

---

## Phase 16 — Documentation

Rewrite documentation from scratch.

### Must Include

- package overview
- script-first usage
- component-first usage
- nested provider usage
- lazy CDN usage
- function API
- component API
- message file format
- fallback behavior
- migration guide
- examples per component

---

## Phase 17 — Release Plan

### `0.2.0`

- runtime scope
- formatter functions
- locale loading

### `0.3.0`

- new `<intl-locale>`
- nested provider support
- message refactor

### `0.4.0`

- number/date/relative-time/duration refactors

### `0.5.0`

- list/name/plural refactors
- lazy exports
- CDN entrypoints

### `1.0.0`

- stable API
- complete docs
- full tests
- migration path finalized
