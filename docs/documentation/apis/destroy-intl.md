---
name: destroyIntl
order: 6.07
title: destroyIntl - Intl by Before Semicolon
description: Destroy the default or scoped Intl runtime and clear subscriptions, caches, and pending loads.
layout: document
---

## `destroyIntl`

`destroyIntl(scope?)` destroys a runtime. It aborts pending loads, clears subscribers, clears formatter/message caches, and empties loaded locale state.

```ts
import { destroyIntl } from '@beforesemicolon/intl'

destroyIntl()
```

## Signature

```ts
function destroyIntl(scope?: IntlRuntime): void
```

## Destroy a scoped runtime

```ts
const preview = createIntl({ locale: 'en-US' })

// Later, when the preview widget unmounts:
destroyIntl(preview)
```

## Default runtime behavior

When called without `scope`, `destroyIntl()` destroys the default runtime and resets the package-level runtime reference. The next `getIntl()` call creates a fresh default runtime.
