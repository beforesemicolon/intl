---
name: resetIntl
order: 6.08
title: resetIntl - Intl by Before Semicolon
description: Reset the package default Intl runtime, mainly for tests and controlled runtime teardown.
layout: document
---

## `resetIntl`

`resetIntl()` destroys the current default runtime and clears the package default runtime reference.

```ts
import { resetIntl } from '@beforesemicolon/intl'

afterEach(() => {
    resetIntl()
})
```

## Signature

```ts
function resetIntl(): void
```

## When to use it

Use `resetIntl` in tests or local demos where multiple cases initialize different default runtimes in the same JavaScript process.

For app teardown, `destroyIntl()` is usually more explicit.
