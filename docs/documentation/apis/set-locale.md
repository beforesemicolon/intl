---
name: setLocale
order: 7.04
title: setLocale - Intl by Before Semicolon
description: Change the active locale on a runtime and load messages for the new locale.
layout: document
---

## `setLocale`

`setLocale(locale, scope?)` updates the runtime locale and loads the locale payload for that runtime.

It is the supported path for in-page language switching.

```ts
import { initIntl, setLocale } from '@beforesemicolon/intl'

initIntl({ locale: 'en-US', srcDir: '/locales' })
await setLocale('fr-FR')
```

## Signature

```ts
function setLocale(locale: string, scope?: IntlRuntime): Promise<IntlRuntimeSnapshot>
```

## What changes when this runs

- sets runtime locale
- marks runtime status as `loading`
- loads locale messages (`src` / `srcDir` or custom loader)
- loads fallback locale messages when configured
- notifies subscribers with updated snapshot once ready

If locale is unchanged or empty, it resolves immediately with the current snapshot.

```ts
const sameLocale = await setLocale(getIntl().locale) // resolves fast, no fetch
```

## Scoped vs default runtime

Pass a runtime when language switching should be isolated.

```ts
const preview = createIntl({ locale: 'en-US', srcDir: '/locales/previews' })
await setLocale('ja-JP', preview)
```

Without `scope`, the package default runtime is changed.

## Language switcher pattern

```ts
const localeSelect = document.querySelector('#locale')

localeSelect?.addEventListener('change', async (event) => {
  const locale = (event.target as HTMLSelectElement).value
  const snapshot = await setLocale(locale)

  document.documentElement.lang = snapshot.locale
  document.documentElement.dir = snapshot.direction
  document.documentElement.classList.remove('is-loading-locale')
})
```

`setLocale` resolves even if loading fails; check `snapshot.status === 'error'` before switching UI assumptions.

```ts
const snapshot = await setLocale('ar')
if (snapshot.status === 'error') {
  console.warn(snapshot.error)
}
```

For manual loading without changing active locale, use `loadLocale()`.
