---
name: intl-msg
order: 5.2
title: <intl-msg> - Message Formatter
description: Resolve runtime messages by key with text fallback and placeholder interpolation.
layout: document
---

## `<intl-msg>`

`<intl-msg>` renders a message from the nearest `<intl-locale>` runtime.
Its child text is the fallback shown before messages are ready, when a key is missing, or when no key is provided.

```html
<intl-msg key="checkout.title">Checkout</intl-msg>
```

## Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `key` | `string` | `''` | Dot-path message key, such as `checkout.title`. |
| `values` | JSON object | `{}` | Placeholder values used for `{name}` interpolation. |

## `key`

Use `key` to read a value from the active locale messages. The child text remains useful fallback content.

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

Dot paths read nested message objects:

```html
<intl-msg key="account.profile.heading">Profile</intl-msg>
```

```json
{
    "account": {
        "profile": {
            "heading": "Profile"
        }
    }
}
```

## `values`

Use `values` when the message includes `{placeholder}` tokens.

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

Every value must be valid JSON because attributes are strings in HTML.

```html
<intl-msg
    key="order.total"
    values='{"amount":"$42.00","currency":"USD"}'
>
    Total: $42.00
</intl-msg>
```

Missing, `null`, and `undefined` placeholder values render as empty strings.

For complex formatting (dates, numbers, etc.), place placeholders in the message string and keep locale formatting to the runtime formatters.

## Fallback text

The fallback text is the content inside the tag.

```html
<intl-msg key="missing.key">Fallback copy</intl-msg>
```

If the runtime is not ready, no key is set, or the key is missing, the component renders `Fallback copy`. If there is no fallback text, a missing key renders the key itself.

You can also use fallback-only text for static copy during early prototyping.

```html
<intl-msg>Plain fallback text</intl-msg>
```

For production translation files, prefer adding a `key` or using the optional translation builder workflow once it exists.

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

## See also

- [intlMsg](/documentation/formatters/intl-message)
