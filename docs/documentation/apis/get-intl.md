---
name: getIntl
order: 6.03
title: getIntl - Intl by Before Semicolon
description: Read the active Intl runtime, either from an explicit scope or from the package default runtime.
layout: document
---

## `getIntl`

`getIntl(scope?)` returns the provided scope when one is passed. Otherwise it returns the default runtime, creating one with default options if needed.

```ts
import { getIntl } from '@beforesemicolon/intl'

const runtime = getIntl()
runtime.locale // "en" unless initialized differently
```

## Signature

```ts
function getIntl(scope?: IntlRuntime): IntlRuntime
```

## Use with optional scopes

```ts
import { getIntl } from '@beforesemicolon/intl'

export function readTitle(scope?: IntlRuntime) {
    return getIntl(scope).getMessage<string>('page.title')
}
```

This pattern lets callers pass a scoped runtime while still supporting the default runtime.

## Snapshot example

```ts
const snapshot = getIntl().snapshot()

console.log(snapshot.locale)
console.log(snapshot.direction)
console.log(snapshot.status)
```

Use `snapshot()` when you need a stable read of runtime state without subscribing.
