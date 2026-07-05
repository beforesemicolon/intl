---
name: setLocale
order: 6.04
title: setLocale - Intl by Before Semicolon
description: Change the active locale on a runtime and load messages for the new locale.
layout: document
---

## `setLocale`

`setLocale(locale, scope?)` changes the active locale on a runtime. It loads messages for the new locale, updates caches, and notifies subscribers.

```ts
import { initIntl, setLocale } from '@beforesemicolon/intl'

initIntl({ locale: 'en-US', srcDir: '/locales' })

await setLocale('fr-FR')
```

## Signature

```ts
function setLocale(locale: string, scope?: IntlRuntime): Promise<IntlRuntimeSnapshot>
```

## Use with a custom runtime

```ts
const preview = createIntl({
    locale: 'en-US',
    srcDir: '/locales/previews',
})

await setLocale('ja-JP', preview)
```

Passing `scope` keeps the default runtime unchanged.

## UI language switcher

```ts
document.querySelector('[data-locale]')?.addEventListener('change', async (event) => {
    const locale = (event.target as HTMLSelectElement).value
    const snapshot = await setLocale(locale)

    document.documentElement.lang = snapshot.locale
    document.documentElement.dir = snapshot.direction
})
```

When the runtime is connected to components, subscribers re-render automatically after the locale load completes.
