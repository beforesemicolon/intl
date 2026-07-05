---
name: intl-msg
order: 5.2
title: <intl-msg> - Message Formatter
description: Resolve runtime messages by key with text fallback and placeholder interpolation.
layout: document
---

## `<intl-msg>`

`<intl-msg>` renders a message from the nearest `<intl-locale>` runtime. Its text content is the fallback shown before messages are ready or when the key is missing.

```html
<intl-msg key="checkout.title">Checkout</intl-msg>
```

## Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `key` | `string` | `''` | Dot-path message key, such as `checkout.title`. |
| `values` | JSON object | `{}` | Placeholder values used for `{name}` interpolation. |

## Basic message

```html
<intl-locale locale="en-US" src-dir="/locales">
    <h1><intl-msg key="checkout.title">Checkout</intl-msg></h1>
</intl-locale>
```

For messages like:

```json
{
    "checkout": {
        "title": "Checkout"
    }
}
```

## Placeholder values

```html
<intl-msg
    key="checkout.greeting"
    values='{"name":"Ari","count":3}'
>
    Welcome back
</intl-msg>
```

For messages like:

```json
{
    "checkout": {
        "greeting": "Welcome back, {name}. You have {count} items."
    }
}
```

## Fallback behavior

```html
<intl-msg key="missing.key">Fallback copy</intl-msg>
```

If the runtime is not ready, no key is set, or the key is missing, the component renders its fallback text. If there is no fallback text, a missing key renders the key itself.

## HTML content in messages

Message output is rendered as a Markup template, so trusted message strings can include markup.

```json
{
    "status": {
        "new": "<strong>New</strong>"
    }
}
```

```html
<intl-msg key="status.new">New</intl-msg>
```

Only put trusted translation content in message files.

## JavaScript API equivalent

```ts
import { initIntl, intlMsg, formatMessage } from '@beforesemicolon/intl'

const runtime = initIntl({
    locale: 'en-US',
    messages: {
        checkout: {
            greeting: 'Welcome back, {name}',
        },
    },
})

intlMsg('checkout.greeting', { name: 'Ari' })
formatMessage('checkout.greeting', { name: 'Ari' }, { scope: runtime })
```
