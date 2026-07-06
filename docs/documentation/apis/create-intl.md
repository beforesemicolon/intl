---
name: createIntl
order: 7.01
title: createIntl - Intl by Before Semicolon
description: Create an isolated Intl runtime for a component region, micro-app, or integration boundary.
layout: document
---

## `createIntl`

`createIntl(options?)` creates a standalone localization runtime.

Use it when one part of the app needs its own locale state, loading strategy, or message source while keeping the rest of the app unchanged.

The key difference from `initIntl()` is scope:

- `initIntl()` creates/replaces the **package default runtime** (global fallback for helpers and unscoped components).
- `createIntl()` creates a **separate runtime object** that you pass around explicitly.

```ts
import { createIntl } from '@beforesemicolon/intl'

const checkoutRuntime = createIntl({
  locale: 'en-US',
  fallbackLocale: 'en',
  messages: {
    checkout: {
      title: 'Checkout',
      totalLabel: 'Total',
      actions: {
        primary: 'Place order',
      },
    },
  },
})

checkoutRuntime.getMessage('checkout.title') // "Checkout"
```

Native API: [`Intl.Locale`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale)

## Signature

```ts
function createIntl(options?: IntlRuntimeOptions): IntlRuntime
```

If called with no options, it creates a runtime using defaults and lazy message loading settings.

## Runtime shape

`IntlRuntime` exposes:

- `locale` / `fallbackLocale`
- `messages` / `fallbackMessages`
- `direction`
- `loadedLocales`
- `status` (`idle` | `loading` | `ready` | `error`)
- `error`
- `snapshot()`
- `setLocale(locale)`
- `loadLocale(locale?)`
- `setMessages(messages, locale?)`
- `setFallbackMessages(messages, locale?)`
- `getMessage(key)`
- `subscribe(listener)`
- `destroy()`

Use these methods directly when you need isolation and deterministic control.

## Core behavior to understand

- `messages` and `fallbackMessages` are merged with `parentScope` if present.
- inline `messages` for the configured locale are loaded into memory immediately.
- if `src` or `srcDir` is configured, locale fetching happens when needed.
- switching locale on this runtime via `setLocale()` keeps isolation from the default runtime unless you use `initIntl()`.

```ts
const runtime = createIntl({ locale: 'en-US', srcDir: '/locales' })
await runtime.setLocale('fr-FR')
```

## Options deep dive

### `locale`

- Default: `document.documentElement.lang` if present, otherwise inherited parent locale or `'en'`.
- If missing/empty, `getLocale` resolution still falls back to defaults.
- If `parentScope` exists, it inherits locale unless you provide one.

### `fallbackLocale`

- Default: `en` if not provided; inherited from `parentScope` if available.
- Used when active-locale keys are missing.

### `messages`

- Inline messages for the active locale.
- Useful for SSR snapshots, integration tests, and no-network bootstraps.

```ts
createIntl({
  locale: 'en',
  messages: {
    nav: { home: 'Home', checkout: 'Checkout' },
  },
})
```

### `fallbackMessages`

- Inline fallback messages keyed by `fallbackLocale`.
- Good for bootstrapping critical copy while still loading remote locale bundles.

### `src` vs `srcDir`

Use exactly one of them per runtime in normal setups:

- `src`: one exact endpoint
- `srcDir`: auto-load using `${srcDir}/${locale}.json`

```ts
const exact = createIntl({ locale: 'en', src: '/api/messages/en.json' })
const perLocale = createIntl({ locale: 'fr', srcDir: '/locales' })
```

### `baseUrl`

Base URL used when paths are relative.

```ts
createIntl({ locale: 'en', src: './locales/en.json', baseUrl: 'https://cdn.example.com' })
```

### `loader`

Custom loader is used for all locale fetches.

Signature:

```ts
(locale: string, signal?: AbortSignal) => Promise<IntlMessages> | IntlMessages
```

```ts
const runtime = createIntl({
  locale: 'pt-CV',
  fallbackLocale: 'en',
  loader: (locale, signal) =>
    fetch(`/i18n/messages?locale=${locale}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal,
    }).then((res) => res.json()),
})
```

Why this matters:

- supports authenticated endpoints
- lets you add response transforms/caching
- receives `AbortSignal` so rapid language switches don’t accumulate stale requests

### `parentScope`

Child runtimes inherit parent messages and configuration, then apply local overrides.

```ts
const shell = createIntl({
  locale: 'en-US',
  messages: {
    common: {
      save: 'Save',
      cancel: 'Cancel',
    },
  },
})

const modal = createIntl({
  locale: 'fr-FR',
  parentScope: shell,
  messages: {
    common: { save: 'Sauvegarder' },
  },
})

modal.getMessage('common.save') // "Sauvegarder"
modal.getMessage('common.cancel') // "Cancel"
```

## Common setup patterns

### Isolated UI previews

Keep each preview runtime isolated from production defaults.

```ts
const productCard = createIntl({
  locale: 'en-US',
  messages: {
    product: { cta: 'Add to cart' },
  },
})
```

### Route-level widgets

Each route can own its own runtime for reduced coupling.

```ts
const checkoutRuntime = createIntl({
  locale: 'en-US',
  src: '/locales/en.checkout.json',
})

const supportRuntime = createIntl({
  locale: 'en-US',
  src: '/locales/en.support.json',
})
```

### Runtime testing and fixtures

Create and tear down runtimes per test case.

```ts
const runtime = createIntl({
  locale: 'en-US',
  messages: { title: 'Home' },
})

runtime.getMessage('title') // "Home"
runtime.destroy()
```

## Runtime methods in practice

```ts
const runtime = createIntl({ locale: 'en-US', srcDir: '/locales' })

await runtime.setLocale('fr-FR')
await runtime.loadLocale('es-ES')

runtime.setMessages({ checkout: { title: 'Quick checkout' } })
runtime.setFallbackMessages({ common: { cancel: 'Cancel' } })

runtime.subscribe((snapshot) => {
  console.log(snapshot.status, snapshot.locale)
})

console.log(runtime.snapshot())
runtime.destroy()
```

### Return types that matter

- `setLocale(locale)` → `Promise<IntlRuntimeSnapshot>`
- `loadLocale(locale?)` → `Promise<IntlRuntimeSnapshot>`
- `setMessages(...)` and `setFallbackMessages(...)` → `IntlRuntimeSnapshot`
- `getMessage(key)` → message value or `undefined`
- `snapshot()` → normalized snapshot including `loadedLocales` and `error`

## Error and lifecycle notes

- `snapshot().status` is your source of truth:
  - `idle`: no remote load has started
  - `loading`: a load is in-flight
  - `ready`: locale messages are ready
  - `error`: load failed
- `destroy()` clears caches, listeners, and loaded data for that runtime.
- `destroy()` does **not** mutate sibling runtimes.

## Migration from `initIntl` to scoped runtimes

If you have one global locale currently, start by moving feature areas one-by-one:

1. Keep `initIntl()` for app shell
2. Create `createIntl()` for each page section or widget
3. Pass scoped runtimes into helper calls that need independent state
4. Keep existing `<intl-locale>` usage where DOM scoping is already clear

Use `createIntl()` when you want predictable, composable runtime boundaries.
