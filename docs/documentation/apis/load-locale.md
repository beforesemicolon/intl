---
name: loadLocale
order: 7.05
title: loadLocale - Intl by Before Semicolon
description: Load messages for the current or requested locale without necessarily changing the active runtime locale.
layout: document
---

## `loadLocale`

`loadLocale(locale?, scope?)` triggers message loading for a runtime.

It never changes `runtime.locale` by itself. It only fetches and stores messages.

```ts
import { initIntl, loadLocale } from '@beforesemicolon/intl'

initIntl({
  locale: 'en-US',
  srcDir: '/locales',
})

await loadLocale() // loads en-US (and fallback locale if needed)
```

## Signature

```ts
function loadLocale(locale?: string, scope?: IntlRuntime): Promise<IntlRuntimeSnapshot>
```

## Preload and warm cache

```ts
const runtime = initIntl({ locale: 'en-US', srcDir: '/locales' })
await loadLocale('fr-FR', runtime) // preload
await loadLocale('es-ES', runtime) // preload another one
```

Preloading keeps a second locale ready for quick switching while keeping current runtime locale unchanged.

## Error handling

```ts
const snapshot = await loadLocale('es-ES')
if (snapshot.status === 'error') {
  console.error(snapshot.error)
}
```

`snapshot.error` is populated when fetch fails or parsing fails.

Native reference:
[`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

