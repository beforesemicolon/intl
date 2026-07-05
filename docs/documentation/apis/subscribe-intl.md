---
name: subscribeIntl
order: 6.06
title: subscribeIntl - Intl by Before Semicolon
description: Subscribe to Intl runtime snapshots when locale, loading status, or messages change.
layout: document
---

## `subscribeIntl`

`subscribeIntl(listener, scope?)` runs `listener` immediately with the current snapshot, then runs it again whenever the runtime changes.

```ts
import { subscribeIntl } from '@beforesemicolon/intl'

const unsubscribe = subscribeIntl((snapshot) => {
    console.log(snapshot.locale, snapshot.status)
})
```

## Signature

```ts
function subscribeIntl(
    listener: (snapshot: IntlRuntimeSnapshot) => void,
    scope?: IntlRuntime
): () => void
```

## Snapshot fields

| Field | Type | Description |
|---|---|---|
| `locale` | `string` | Active locale. |
| `fallbackLocale` | `string \| undefined` | Configured fallback locale. |
| `messages` | `IntlMessages` | Active messages after parent and current messages are merged. |
| `fallbackMessages` | `IntlMessages` | Fallback messages after inheritance. |
| `direction` | `'ltr' \| 'rtl'` | Text direction for the active locale. |
| `loadedLocales` | `Set<string>` | Locales already loaded into the runtime. |
| `status` | `'idle' \| 'loading' \| 'ready' \| 'error'` | Current loading state. |
| `error` | `unknown` | Last load error, if any. |
| `parentScope` | `IntlRuntime \| undefined` | Parent runtime for inherited messages. |

## Cleanup

```ts
const unsubscribe = subscribeIntl(render)

window.addEventListener('beforeunload', unsubscribe, { once: true })
```

Always call the returned function when the subscriber is no longer needed.
