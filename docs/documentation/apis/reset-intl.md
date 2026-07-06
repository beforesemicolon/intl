---
name: resetIntl
order: 7.08
title: resetIntl - Intl by Before Semicolon
description: Reset the package default Intl runtime, mainly for tests and controlled runtime teardown.
layout: document
---

## `resetIntl`

`resetIntl()` destroys and removes the package default runtime.

This is the cleanest reset strategy for tests, demos, and repeated bootstraps in the same process.

```ts
import { initIntl, resetIntl, getIntl } from '@beforesemicolon/intl'

initIntl({ locale: 'en-US', messages: { hello: 'Hello' } })
resetIntl()
getIntl().locale // resolves to the package default initial locale logic
```

## Signature

```ts
function resetIntl(): void
```

## What gets cleared

- default runtime object
- listeners and subscriptions tied to the default runtime
- loaded messages and in-flight locale loads for the default runtime
- runtime caches (`formatterCache` and `messageCache`)

It does **not** remove any custom scoped runtimes you created explicitly.

## `resetIntl()` vs `destroyIntl()`

- `destroyIntl(scope)` targets a specific runtime.
- `resetIntl()` always targets and removes only the default runtime.

```ts
import { createIntl, destroyIntl, resetIntl } from '@beforesemicolon/intl'

const widgetRuntime = createIntl({ locale: 'en-US' })
destroyIntl(widgetRuntime) // scoped teardown
resetIntl() // default teardown
```

## Common test setup

```ts
beforeEach(() => {
  resetIntl()
})

afterEach(() => {
  resetIntl()
})
```


