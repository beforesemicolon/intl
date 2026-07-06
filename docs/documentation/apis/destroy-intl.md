---
name: destroyIntl
order: 7.07
title: destroyIntl - Intl by Before Semicolon
description: Destroy the default or scoped Intl runtime and clear subscriptions, caches, and pending loads.
layout: document
---

## `destroyIntl`

`destroyIntl(scope?)` disposes runtime resources.

Use this for component/page teardown in long-lived single-page contexts.

```ts
import { createIntl, destroyIntl } from '@beforesemicolon/intl'

const preview = createIntl({ locale: 'en-US' })
destroyIntl(preview)
```

## Signature

```ts
function destroyIntl(scope?: IntlRuntime): void
```

## What it does

- cancels pending loads via `AbortController`
- clears listeners, loading maps, and runtime caches
- clears loaded locale maps
- marks runtime as destroyed

If no `scope` is passed, it disposes the package default runtime only when it is the current default.

```ts
import { destroyIntl } from '@beforesemicolon/intl'

destroyIntl() // remove package default runtime
```

## Teardown patterns

### Scoped runtime

Use with modals, widgets, and editors that own their own localization context.

```ts
const sidePanelRuntime = createIntl({ locale: 'en-US', messages: { ok: 'OK' } })
// ... modal closes
destroyIntl(sidePanelRuntime)
```

### Default runtime

Use during app-level unmount or full-page reload flows.

```ts
window.addEventListener('beforeunload', () => destroyIntl())
```

## What it is not

`destroyIntl()` does not mutate any other runtime instances.
For default runtime reset in test code, prefer `resetIntl()`.
