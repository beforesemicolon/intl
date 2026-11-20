# createIntl / initIntl / setLocale

`@beforesemicolon/intl@0.5.0` · `intl/runtime`

Create a scoped locale runtime, load messages, or change the current language.

- Import the runtime subpath when no Custom Element registration is required.
- Use the default runtime or explicit scope consistently. Use initIntl only when you mean to replace the default; a mounted top-level intl-locale sets it up.
- Runtime lookup checks active messages, fallback messages, then parent scope. Use subscribeIntl for pending, ready, and error status.

## Setup

### npm

No custom elements register when importing this subpath.

````js
import { createIntl, initIntl, getIntl, setLocale, loadLocale, subscribeIntl, destroyIntl, resetIntl, getLocaleDirection } from '@beforesemicolon/intl/runtime'
````

### Classic scripts

- `https://cdn.jsdelivr.net/npm/@beforesemicolon/web-component@1.22.0/dist/client.js`
- `https://cdn.jsdelivr.net/npm/@beforesemicolon/intl@0.5.0/dist/client.js`

**Available globals for this record:** `BFS.INTL.createIntl`, `BFS.INTL.initIntl`, `BFS.INTL.getIntl`, `BFS.INTL.setLocale`, `BFS.INTL.loadLocale`, `BFS.INTL.subscribeIntl`, `BFS.INTL.destroyIntl`, `BFS.INTL.resetIntl`, `BFS.INTL.getLocaleDirection`.

Load scripts in the listed order. No bundler is needed.

## Public values

### `createIntl`

````typescript
createIntl: (options?: IntlRuntimeOptions) => IntlRuntime
````

Create an independent scope without replacing the global default. A scope can use static messages, an async loader, path-based loading, or a parent scope.

````js
const scope = createIntl({ locale: 'en', messages: { title: 'Home' } })
````

### `initIntl`

````typescript
initIntl: (options?: IntlRuntimeOptions) => IntlRuntime
````

Replace the module default runtime. Use during application initialization outside a provider; do not call again merely to change languages.

````js
const runtime = initIntl({ locale: 'en', srcDir: '/locales' })
````

### `getIntl`

````typescript
getIntl: (scope?: IntlRuntime) => IntlRuntime
````

Return a supplied scope, or get or create the default. Pass a scope explicitly in isolated code so it does not read global state by accident.

````js
const runtime = getIntl()
````

### `setLocale`

````typescript
setLocale: (locale: string, scope?: IntlRuntime) => Promise<IntlRuntimeSnapshot>
````

Change a scope locale, loading messages as needed. Omit scope only for default-provider workflows. Await the snapshot before reading the selected language.

````js
const snapshot = await setLocale('pt', scope)
````

### `loadLocale`

````typescript
loadLocale: (locale?: string, scope?: IntlRuntime) => Promise<IntlRuntimeSnapshot>
````

Load messages using the scope options. For explicit active-language switching use setLocale. Check the returned status and error.

````js
const snapshot = await loadLocale('pt', scope)
````

### `subscribeIntl`

````typescript
subscribeIntl: (listener: IntlRuntimeListener, scope?: IntlRuntime) => () => void
````

Watch snapshots as the runtime changes. The returned cleanup stops updates; call it on teardown.

````js
const unsubscribe = subscribeIntl(snapshot => console.log(snapshot.locale, snapshot.status), scope)
// Call unsubscribe() on teardown.
````

### `destroyIntl`

````typescript
destroyIntl: (scope?: IntlRuntime) => void
````

Tear down a scope and abort its pending loads. Omitting the argument destroys the module default.

````js
destroyIntl(scope)
````

### `resetIntl`

````typescript
resetIntl: () => void
````

Clear and destroy the default runtime for the next initializer. Use in tests or application teardown, not a live language switch.

````js
resetIntl()
````

### `getLocaleDirection`

````typescript
getLocaleDirection: (locale: string) => IntlDirection
````

Resolve writing direction for a locale tag. Use this for server output that cannot read document.dir.

````js
console.log(getLocaleDirection('ar'))
````

## Type-only exports

Import these with `import type` in TypeScript. They are not runtime values.

### `IntlDirection`

````typescript
export type IntlDirection = 'ltr' | 'rtl';
````

### `IntlRuntime`

````typescript
export interface IntlRuntime {
    readonly locale: string;
    readonly fallbackLocale?: string;
    readonly messages: IntlMessages;
    readonly fallbackMessages: IntlMessages;
    readonly direction: IntlDirection;
    readonly loadedLocales: Set<string>;
    readonly status: IntlRuntimeStatus;
    readonly error?: unknown;
    readonly parentScope?: IntlRuntime;
    readonly formatterCache: Map<string, unknown>;
    readonly messageCache: Map<string, unknown>;
    snapshot(): IntlRuntimeSnapshot;
    setLocale(locale: string): Promise<IntlRuntimeSnapshot>;
    loadLocale(locale?: string): Promise<IntlRuntimeSnapshot>;
    setMessages(messages: IntlMessages, locale?: string): IntlRuntimeSnapshot;
    setFallbackMessages(messages: IntlMessages, locale?: string): IntlRuntimeSnapshot;
    getMessage<T = unknown>(key: string): T | undefined;
    subscribe(listener: IntlRuntimeListener): () => void;
    destroy(): void;
}
````

One scope, one active locale. Retain a runtime reference when switching only one subtree.

### `IntlRuntimeOptions`

````typescript
export interface IntlRuntimeOptions {
    locale?: string;
    fallbackLocale?: string;
    messages?: IntlMessages;
    fallbackMessages?: IntlMessages;
    src?: string;
    srcDir?: string;
    baseUrl?: string;
    loader?: (locale: string, signal?: AbortSignal) => Promise<IntlMessages> | IntlMessages;
    parentScope?: IntlRuntime;
}
````

Use messages for existing data, loader for custom async resolution, and srcDir for per-locale URL resolution.

### `IntlRuntimeSnapshot`

````typescript
export interface IntlRuntimeSnapshot {
    locale: string;
    fallbackLocale?: string;
    messages: IntlMessages;
    fallbackMessages: IntlMessages;
    direction: IntlDirection;
    loadedLocales: Set<string>;
    status: IntlRuntimeStatus;
    error?: unknown;
    parentScope?: IntlRuntime;
}
````

Check status before treating messages as loaded; inspect error on a failed snapshot. Do not mutate caches from snapshots.

### `IntlMessages`

````typescript
export type IntlMessages = Record<string, unknown>;
````

A nested JSON-like record. Dotted message keys descend through nested properties.

### `IntlRuntimeListener`

````typescript
export type IntlRuntimeListener = (snapshot: IntlRuntimeSnapshot) => void;
````

### `IntlRuntimeStatus`

````typescript
export type IntlRuntimeStatus = 'idle' | 'loading' | 'ready' | 'error';
````

## Examples

````js
import { createIntl, setLocale } from '@beforesemicolon/intl/runtime'
const messages = { en: { greeting: 'Hello' }, pt: { greeting: 'Olá' } }
const scope = createIntl({ locale: 'en', loader: (locale) => messages[locale] ?? {} })
await setLocale('pt', scope)
console.log(scope.getMessage('greeting'))
scope.destroy()
````

### Classic

````html
<script type="module">
await BFS.INTL.setLocale('pt')
</script>
````

## Related local reference

[intl/intl-locale](intl-locale.md) · [intl/intl-msg](intl-msg.md) · [intl/formatters](formatters.md)

[Back to the offline reference index](../index.md)
