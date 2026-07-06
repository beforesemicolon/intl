---
name: subscribeIntl
order: 7.06
title: subscribeIntl - Intl by Before Semicolon
description: Subscribe to Intl runtime snapshots when locale, loading status, or messages change.
layout: document
---

## `subscribeIntl`

`subscribeIntl(listener, scope?)` subscribes to live runtime snapshots.

It is useful for UI that must react to locale, loading, or message load state outside components.

```ts
import { subscribeIntl } from '@beforesemicolon/intl'

const unsubscribe = subscribeIntl((snapshot) => {
  console.log(snapshot.locale)
  console.log(snapshot.status)
})
```

## Signature

```ts
function subscribeIntl(
  listener: (snapshot: IntlRuntimeSnapshot) => void,
  scope?: IntlRuntime
): () => void
```

## Callback contract

`subscribeIntl` does two things immediately:

1. adds the listener
2. calls it once with the current snapshot

It then calls the listener for all future locale/message/state updates.

## Snapshot fields in practice

- `locale` / `fallbackLocale` for current and fallback language resolution
- `direction` for `ltr` / `rtl` layout behavior
- `messages` and `fallbackMessages` for resolved message layers
- `loadedLocales` for cache-awareness
- `status` lifecycle (`idle`, `loading`, `ready`, `error`)
- `error` for failed loads
- `parentScope` when runtime inherits from another runtime

```ts
const unsubscribe = subscribeIntl((snapshot) => {
  if (snapshot.status === 'loading') {
    showSpinner()
    return
  }

  if (snapshot.status === 'error') {
    showWarning(snapshot.error)
    return
  }

  if (snapshot.status === 'ready') {
    render(snapshot.locale)
  }
})
```

## Cleanup

Always unsubscribe when the listener is no longer needed.

```ts
const cleanup = subscribeIntl((snapshot) => {
  // component paint function
})

window.addEventListener('unload', cleanup)
```

For low-level component internals, this can replace manual polling for runtime state.
