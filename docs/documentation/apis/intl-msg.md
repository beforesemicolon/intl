---
name: intlMsg
order: 6.18
title: intlMsg - Intl by Before Semicolon
description: Browser and module helper for resolving translated message strings.
layout: document
---

## `intlMsg`

`intlMsg(key, values?, options?)` is the function exported beside the `<intl-msg>` component. It returns the same string as `formatMessage`.

```ts
import { initIntl, intlMsg } from '@beforesemicolon/intl'

initIntl({
    locale: 'en-US',
    messages: { cta: 'Continue as {name}' },
})

intlMsg('cta', { name: 'Sam' }) // "Continue as Sam"
```

## Signature

```ts
function intlMsg(
    key: string,
    values?: Record<string, unknown>,
    options?: MessageFormatOptions
): string
```

## Browser global

```html
<script>
    const label = window.BFS.INTL.intlMsg('checkout.title')
</script>
```

Use `formatMessage` when you want the lower-level formatter name. Use `intlMsg` when you want the helper that mirrors the component naming.
