---
name: createIntl
order: 6.01
title: createIntl - Intl by Before Semicolon
description: Create an isolated Intl runtime scope with locale, messages, fallback messages, loaders, and parent scope inheritance.
layout: document
---

## `createIntl`

`createIntl(options?)` creates an isolated runtime. Use it when a page, widget, test, server render, or nested locale area needs its own locale state without replacing the default runtime.

```ts
import { createIntl } from '@beforesemicolon/intl'

const runtime = createIntl({
    locale: 'en-US',
    fallbackLocale: 'en',
    messages: {
        checkout: {
            title: 'Checkout',
            total: 'Total: {amount}',
        },
    },
})

runtime.getMessage('checkout.title') // "Checkout"
```

## Signature

```ts
function createIntl(options?: IntlRuntimeOptions): IntlRuntime
```

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `locale` | `string` | `document.documentElement.lang` or `en` | Active locale for the runtime. |
| `fallbackLocale` | `string` | `en` | Locale to load and read when the active locale misses a message. |
| `messages` | `Record<string, unknown>` | `{}` | Messages for the active locale. Nested objects can be read with dot paths. |
| `fallbackMessages` | `Record<string, unknown>` | `{}` | Messages for the fallback locale. |
| `src` | `string` | `undefined` | Exact JSON endpoint used by `loadLocale()`. |
| `srcDir` | `string` | `/locales` | Directory used as `${srcDir}/${locale}.json` when `src` is not set. |
| `baseUrl` | `string` | `location.origin` or `http://localhost` | Base used to resolve relative `src` or `srcDir` URLs. |
| `loader` | `(locale, signal?) => Promise<IntlMessages> \| IntlMessages` | `undefined` | Custom message loader. Overrides `src` and `srcDir`. |
| `parentScope` | `IntlRuntime` | `undefined` | Parent runtime to inherit messages and fallback settings from. |

## Runtime object

The returned runtime exposes `locale`, `fallbackLocale`, `messages`, `fallbackMessages`, `direction`, `loadedLocales`, `status`, `error`, `formatterCache`, `messageCache`, `snapshot()`, `setLocale()`, `loadLocale()`, `setMessages()`, `setFallbackMessages()`, `getMessage()`, `subscribe()`, and `destroy()`.

## Load from a directory

```ts
const runtime = createIntl({
    locale: 'fr-FR',
    fallbackLocale: 'en',
    srcDir: '/locales',
})

await runtime.loadLocale()
```

This requests `/locales/fr-FR.json`. If `fallbackLocale` is different and not loaded yet, the runtime also tries `/locales/en.json`.

## Custom loader

```ts
const runtime = createIntl({
    locale: 'pt-CV',
    fallbackLocale: 'en',
    loader(locale, signal) {
        return fetch(`/api/messages?locale=${locale}`, { signal }).then((res) =>
            res.json()
        )
    },
})
```

Use a loader when translations come from a database endpoint, a bundled module map, or a framework data layer.

## Parent and child scopes

```ts
const parent = createIntl({
    locale: 'en-US',
    messages: {
        common: { save: 'Save' },
        checkout: { title: 'Checkout' },
    },
})

const child = createIntl({
    locale: 'fr-FR',
    parentScope: parent,
    messages: {
        checkout: { title: 'Paiement' },
    },
})

child.getMessage('common.save') // inherited from parent
child.getMessage('checkout.title') // child override
```

## When to use it

Use `createIntl` for isolated scopes. Use `initIntl` when you want to replace the package default runtime used by formatter functions and components outside an `<intl-locale>` provider.
