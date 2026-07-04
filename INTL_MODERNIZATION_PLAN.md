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

## Current Status After Latest Pull + Local Changes Review

Latest upstream `main` now includes the first runtime foundation in `src/runtime.ts`:

- `createIntl()`, `initIntl()`, `getIntl()`, `setLocale()`, `loadLocale()`, subscription, destroy, and reset helpers.
- Parent/child runtime support through `parentScope`.
- Locale message loading from `messages`, `fallbackMessages`, `src`, `srcDir`, or `loader`.
- Runtime-owned `formatterCache` and `messageCache`.
- Runtime tests in `src/runtime.spec.ts`.

The local changes are generally moving toward a richer intl package, but they are currently taking a component/type-first path rather than the planned runtime/function-first path:

- Good direction:
  - Broader typed prop coverage was added for date/time, duration, list, name, and number components.
  - Formatter helper behavior is being extracted inside component modules and tested through returned helper functions such as `intlNumber`, `intlDatetime`, `intlDuration`, `intlList`, `intlName`, and `intlMsg`.
  - Component tests were expanded substantially.
  - The dependency update adds `@formatjs/intl-durationformat`, which supports the duration fallback strategy in Phase 9.
  - The builder-based package build scripts are closer to the lazy module output this plan wants.
- Architectural gap:
  - Components still resolve locale through `getLocale()` and, for messages, a separate global `messages` state in `src/messages.ts`.
  - Components do not yet use `getIntl()`, nearest provider scope, parent-scope fallback, runtime subscriptions, or runtime formatter caches.
  - The extracted formatter helpers are not yet exported as pure package-level formatter functions, so components are still the owner of formatting behavior.
  - `<intl-locale>` currently loads messages into the global message state and does not create a scoped runtime provider.
  - `src/index.ts` exports the runtime, but the main component registrations still register multiple components from the root entrypoint and do not yet provide per-component lazy entry files.
- Dependency caution:
  - Regenerating `package-lock.json` with the merged manifest produces an existing peer warning: `@beforesemicolon/builder@1.4.0` depends on `global-jsdom@9.2.0`, whose peer range is `jsdom >=23 <24`, while the local manifest uses `jsdom@25.0.1`.
  - Before finalizing the dependency modernization, either align `jsdom` to the builder peer range, upgrade the builder/global-jsdom path, or document why the peer override is acceptable.
- Verification after merge:
  - `npm test -- --runInBand` now reaches the suite after pinning npm scripts to `jest.config.cjs`, but it does not pass yet.
  - Passing suites include runtime, locale, message, duration, and name tests.
  - Current failures are concentrated in date/time locale output expectations, number rounding behavior, stale plural/relative-time tests that reference removed helper modules, `intl-list` typing against `ObjectLiteral`, and the singular/plural key mismatch in `millisecondsToTimeParts`.

Decision: preserve the local component/type/test work, but redirect the next implementation pass around the runtime APIs now present on `main`. The plan below is updated to make runtime integration the next gate before adding more component surface area.

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

## Phase 1 — Runtime Scope — Complete

Build scoped runtime first.

Status: complete as of the latest `main` pull. Implemented in `src/runtime.ts` and covered by `src/runtime.spec.ts`.

Verification:

```sh
npm test -- --runInBand src/runtime.spec.ts
```

Result: 8 runtime tests passing.

### Deliverables

- [x] `createIntl()`
- [x] `initIntl()`
- [x] `getIntl()`
- [x] `setLocale()`
- [x] `loadLocale()`
- [x] `subscribe()`
- [x] scoped parent/child runtime model
- [x] default runtime fallback
- [x] runtime tests

### Implementation Notes

Create a core `IntlRuntime` class or factory. It should not depend on Web Components. Components depend on runtime, but runtime does not depend on components.

---

## Phase 2 — Locale Loading — Complete

Build message loading into runtime.

Status: complete. Runtime locale loading is implemented in `src/runtime.ts`; `<intl-locale>` now delegates locale file loading to an `IntlRuntime` instance and dispatches locale lifecycle events.

Verification:

```sh
npm test -- --runInBand src/runtime.spec.ts src/components/intl-locale.spec.ts
```

Result: 20 focused runtime and provider tests passing.

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

- [x] Cache loaded locales.
- [x] Abort stale fetches.
- [x] Support fallback locale.
- [x] Support parent-scope fallback.
- [x] Expose loading/error state.
- [x] Dispatch `locale-load`, `locale-error`, and `locale-change` events from component provider.

---

## Phase 3 — Formatter Functions — Complete

Move all formatting logic into pure exported functions.

Updated gate: do this before further component refactors. The current local helper functions inside component modules should be moved into formatter modules that accept `{ locale?, scope? }`, use `getIntl(scope)`, and share runtime caches.

Status: complete for the package-level formatter API. Implemented in `src/formatters.ts` and exported from `src/index.ts`. Component migration to these functions remains assigned to the component-specific phases below.

Verification:

```sh
npx jest --config jest.config.cjs --runInBand src/formatters.spec.ts src/runtime.spec.ts
```

Result: 22 focused formatter and runtime tests passing.

### Required Functions

- [x] `formatMessage`
- [x] `formatNumber`
- [x] `formatDateTime`
- [x] `formatDuration`
- [x] `formatRelativeTime`
- [x] `formatList`
- [x] `formatName`
- [x] `formatPlural`

### Requirements

- [x] Accept explicit locale override.
- [x] Accept explicit runtime scope.
- [x] Use runtime formatter cache.
- [x] Validate input.
- [x] Return string output.
- [x] Never directly manipulate DOM.
- [x] No component dependency.
- [x] Do not read locale from `document` directly except through runtime fallback.
- [x] Do not read message text from `src/messages.ts`; use `IntlRuntime.getMessage()`.

---

## Phase 4 — `<intl-locale>` Provider — Complete

Refactor `<intl-locale>` to use runtime scopes.

Updated gate: replace the current global message-loading implementation with a provider-backed runtime before relying on scoped locale behavior in other components.

Status: complete. `<intl-locale>` creates provider-backed runtime scopes, supports nested providers, exposes nearest-provider runtime lookup for descendants, initializes the default runtime for root providers, and supports ready-gated rendering.

Verification:

```sh
npx jest --config jest.config.cjs --runInBand src/components/intl-locale.spec.ts src/runtime.spec.ts src/formatters.spec.ts
```

Result: 32 focused provider, runtime, and formatter tests passing.

### Requirements

- [x] Creates scoped runtime.
- [x] Supports nested providers.
- [x] Allows locale override.
- [x] Uses nearest parent provider as parent scope.
- [x] Provides scope to descendants.
- [x] Initializes default runtime if needed.
- [x] Can update document `<html lang>` and `<html dir>` only if `update-document` is true.
- [x] Renders slotted content after ready, unless fallback rendering is enabled.
- [x] Loads `messages`, `src`, `src-dir`, and `loader` through `createIntl()` / `loadLocale()`.
- [x] Exposes the provider runtime to descendants without using a process-wide messages store.
- [x] Subscribes child rendering to runtime updates and cleans up subscriptions on unmount.

---

## Phase 5 — `<intl-msg>` / `formatMessage` — Complete

Status: complete. `formatMessage` resolves messages through `IntlRuntime.getMessage()`, and `<intl-msg>` now uses the nearest provider runtime, supports `key` with `id` as a compatibility alias, renders rich message markup, and re-renders on runtime updates.

Verification:

```sh
npx jest --config jest.config.cjs --runInBand src/components/intl-msg.spec.ts src/components/intl-locale.spec.ts src/formatters.spec.ts src/runtime.spec.ts
```

Result: 36 focused message, provider, formatter, and runtime tests passing.

### `formatMessage` Features

- [x] nested keys: `home.hero.title`
- [x] interpolation: `{name}`
- [x] fallback values
- [x] missing-key behavior
- [x] parent-scope fallback
- [x] fallback-locale fallback
- [x] rich text token support

Updated from local review: the current `src/messages.ts` state store is useful as a temporary compatibility layer, but it should not become the long-term message registry. Message lookup must move to `IntlRuntime.getMessage()` so nested providers, fallback locale, and parent-scope fallback all behave consistently.

### Component

```html
<intl-msg key="home.title"></intl-msg>
<intl-msg key="hello" values='{"name":"Elson"}'></intl-msg>
```

Rules:

- [x] Component finds nearest locale scope.
- [x] Calls `formatMessage`.
- [x] Re-renders on scope update.
- [x] Supports `id` as deprecated alias for `key`.
- [x] Prefer `key` in new API and tests; keep `id` only as a compatibility alias with a deprecation path.

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

Updated from local review: `@formatjs/intl-durationformat` is now part of the local dependency direction. Confirm the intended browser/runtime support matrix, then make the fallback explicit in `formatDuration` tests instead of hiding the behavior inside the component.

### Component

```html
<intl-duration value="3600000" fields="hour minute"></intl-duration>
```

Rules:

- Use nearest locale scope.
- No hardcoded English unless fallback locale requires it.
- Keep duration unit names aligned with `Intl.DurationFormat` plural option keys (`years`, `months`, `weeks`, `days`, `hours`, `minutes`, `seconds`, `milliseconds`, `microseconds`, `nanoseconds`) and map component aliases at the boundary.

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

Updated from local review: builder-based scripts are a good step, but package exports and source entrypoints still need to prove that importing one component registers only that component.

### Rules

- Each component has its own entry file.
- Each component registers only itself.
- Full bundle imports all component entry files.
- Runtime/function modules do not auto-register components.
- Root package import may export formatter/runtime APIs, but it should not be the only path to component registration.

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

### Immediate Test Updates From Local Review

- Add formatter-level tests once helpers move out of component modules.
- Add provider integration tests proving nearest `<intl-locale>` wins over document language.
- Add nested provider tests for message fallback from child to parent.
- Add tests proving components re-render after runtime `setLocale()` / `setMessages()`.
- Add lazy import tests that import one component entrypoint and assert unrelated custom elements are not registered.
- Add dependency compatibility coverage or CI notes for the `jsdom` / `global-jsdom` peer warning introduced by the builder path.

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
- component helpers migrated out of component modules into formatter modules

### `0.3.0`

- new `<intl-locale>`
- nested provider support
- message refactor
- removal or compatibility wrapping of the temporary global message store

### `0.4.0`

- number/date/relative-time/duration refactors
- runtime formatter cache integration for number/date/relative-time/duration

### `0.5.0`

- list/name/plural refactors
- lazy exports
- CDN entrypoints
- per-component entrypoint tests

### `1.0.0`

- stable API
- complete docs
- full tests
- migration path finalized
