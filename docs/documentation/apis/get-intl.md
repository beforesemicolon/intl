---
name: getIntl
order: 7.03
title: getIntl - Intl by Before Semicolon
description: Read the active Intl runtime, either from an explicit scope or from the package default runtime.
layout: document
---

## `getIntl`

`getIntl(scope?)` gives you the runtime instance that formatters and components use.

Use it when you need to inspect current state, read messages directly, or share one runtime instance between modules.

```ts
import { getIntl } from '@beforesemicolon/intl'

const runtime = getIntl()
console.log(runtime.locale)
console.log(runtime.direction)
console.log(runtime.snapshot().loadedLocales)
```

## Signature

```ts
function getIntl(scope?: IntlRuntime): IntlRuntime
```

## How it chooses scope

- If you pass a `scope`, it returns that runtime directly.
- If you omit `scope`, it returns the package default runtime.
- If no default runtime exists yet, this function creates one lazily.

```ts
const shared = getIntl()
const local = getIntl(customRuntime)
```

## Snapshot pattern

`snapshot()` is the fastest way to read runtime status without triggering UI behavior.

```ts
const snapshot = getIntl().snapshot()

console.log(snapshot.locale) // active locale
console.log(snapshot.status) // 'idle' | 'loading' | 'ready' | 'error'
console.log(snapshot.parentScope?.locale) // inherited scope when nested
console.log(snapshot.loadedLocales) // locales already loaded in this runtime
```

## Message lookup and formatting without side effects

Runtime access gives you deterministic behavior in tests and reusable helpers.

```ts
import { initIntl, getIntl, intlMsg } from '@beforesemicolon/intl'

initIntl({ locale: 'fr-FR', messages: { product: { title: 'Produit' } } })
const runtime = getIntl()
const title = runtime.getMessage('product.title')
const rendered = intlMsg('product.title', undefined, { scope: runtime })
```

## Component interop

Components use nearest `<intl-locale>` and then default runtime. If you need exact parity in custom JS, use the same scoped runtime you pass to components.

`getIntl()` itself is safe for plain runtime reads but does not subscribe to updates.
