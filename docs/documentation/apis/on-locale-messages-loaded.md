---
name: onLocaleMessagesLoaded
order: 6.26
title: onLocaleMessagesLoaded - Intl by Before Semicolon
description: Register the intl-locale component and return locale lifecycle behavior for the browser entrypoint.
layout: document
---

## `onLocaleMessagesLoaded`

`onLocaleMessagesLoaded` is exported by the browser and module entrypoints after the `<intl-locale>` component is registered. Most applications listen to the DOM events emitted by `<intl-locale>` instead.

```html
<intl-locale locale="en-US" src-dir="/locales"></intl-locale>

<script>
    document.body.addEventListener('locale-load', (event) => {
        console.log(event.detail.locale)
    })
</script>
```

## Locale events

| Event | When it fires | Detail |
|---|---|---|
| `locale-load` | Locale messages finish loading. | `IntlRuntimeSnapshot` |
| `locale-change` | Runtime is ready after loading or changing locale. | `IntlRuntimeSnapshot` |
| `locale-error` | Runtime loading fails. | `IntlRuntimeSnapshot` with `error` |

## Browser global

```html
<script>
    const { onLocaleMessagesLoaded } = window.BFS.INTL
</script>
```

For application logic, prefer `subscribeIntl()` or the DOM lifecycle events above.
