---
name: Locale lifecycle events
order: 7.26
title: Locale lifecycle events | Before Semicolon Intl
description: Observe locale loading and changes with Intl events and runtime subscriptions.
layout: document
---

## Locale lifecycle events

`onLocaleMessagesLoaded` is not a public API in this release. When a
top-level `intl-locale` loads its messages, use its DOM events:

- `locale-load` reports a completed message load.
- `locale-change` reports that the loaded locale is ready.
- `locale-error` reports a load error.

```html
<script>
    document.addEventListener('locale-load', (event) => {
        console.log(event.detail.locale)
    })
</script>
<intl-locale locale="en-US" src-dir="/locales"></intl-locale>
```

For runtime-driven changes, including calls to `setLocale`, use
`subscribeIntl(callback)` or `scope.subscribe(callback)`. Call the returned
unsubscribe function to stop listening.
