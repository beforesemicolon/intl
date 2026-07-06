---
name: onLocaleMessagesLoaded
order: 7.26
title: onLocaleMessagesLoaded - Intl by Before Semicolon
description: Register the intl-locale component and return locale lifecycle behavior for the browser entrypoint.
layout: document
---

## `onLocaleMessagesLoaded`

`onLocaleMessagesLoaded` is exported from the browser bundle and used when you load `dist/client.js`.

It ties locale events to the custom-element layer so DOM workflows can react to runtime lifecycle without importing the full module API.

## Signature

```ts
function onLocaleMessagesLoaded(
  options?: IntlLocaleOptions
) // Browser entry helper
```

## Event model and lifecycle

The helper powers the same locale events that `<intl-locale>` emits:

- `locale-load` when a locale file fetch completes
- `locale-change` when active locale is ready
- `locale-error` when fetch/parsing fails

```html
<intl-locale locale="en-US" src-dir="/locales"></intl-locale>
<script>
  document.body.addEventListener('locale-load', (event) => {
    console.log('loaded', event.detail.locale)
  })
</script>
```

Use this in browser mode when you need global setup and want to keep logic in HTML.

For explicit JS subscriptions and snapshots, prefer `subscribeIntl()`.

Native references: [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent), [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
