---
name: loadLocale
order: 6.05
title: loadLocale - Intl by Before Semicolon
description: Load messages for the current or requested locale without necessarily changing the active runtime locale.
layout: document
---

## `loadLocale`

`loadLocale(locale?, scope?)` loads messages using the runtime loader, `src`, or `srcDir` configuration. If `locale` is omitted, it loads the runtime's current locale.

```ts
import { initIntl, loadLocale } from '@beforesemicolon/intl'

initIntl({
    locale: 'en-US',
    fallbackLocale: 'en',
    srcDir: '/locales',
})

await loadLocale()
```

## Signature

```ts
function loadLocale(locale?: string, scope?: IntlRuntime): Promise<IntlRuntimeSnapshot>
```

## Preload another locale

```ts
const runtime = initIntl({ locale: 'en-US', srcDir: '/locales' })

await loadLocale('fr-FR', runtime)
```

This loads and caches `fr-FR` messages. It does not change `runtime.locale` unless you later call `setLocale('fr-FR', runtime)`.

## Handle load errors

```ts
const snapshot = await loadLocale('es-ES')

if (snapshot.status === 'error') {
    console.error(snapshot.error)
}
```

The snapshot includes `status`, `error`, `loadedLocales`, and the current message state.
