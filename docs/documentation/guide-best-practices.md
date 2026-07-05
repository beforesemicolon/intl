---
name: Guide & Best Practices
order: 4
title: Intl Guide & Best Practices - Intl by Before Semicolon
description: Practical guidance for building maintainable HTML-first localization with Before Semicolon Intl.
layout: document
---

## Guide & Best Practices

Intl works best when locale scope is explicit and formatting stays close to the UI that needs it. Use components for visible output, use API helpers for application logic, and keep message loading predictable.

## Start With One Locale Scope

Wrap the localized part of the page in `<intl-locale>`. This gives child components one shared locale, fallback locale, message source, direction, and loading state.

```html
<intl-locale locale="en-US" fallback-locale="en" src-dir="/locales" update-document>
    <h1><intl-msg key="checkout.title">Checkout</intl-msg></h1>
    <p>
        <intl-msg key="checkout.total">Total</intl-msg>
        <intl-number type="currency" currency="USD">1299.99</intl-number>
    </p>
</intl-locale>
```

Use `update-document` when the provider represents the page language. Leave it off for embedded previews, widgets, or side-by-side locale comparisons.

## Prefer Child Text For Simple Values

For readable HTML, put simple formatter input inside the tag.

```html
<intl-number type="currency" currency="USD">1299.99</intl-number>
<intl-datetime date-style="full">2026-01-01T10:00:00Z</intl-datetime>
<intl-list type="and">shipping tax discounts</intl-list>
```

Use the `value` attribute only when a binding layer or component wrapper needs to set it as a property or attribute.

## Keep Message Fallback Text Useful

`<intl-msg>` uses its text content before messages are ready or when a key is missing. Write fallback text that is good enough for the first paint.

```html
<intl-msg key="profile.save">Save profile</intl-msg>
```

Avoid empty message tags unless an empty loading state is intentional.

## Use Nested Scopes For Intentional Locale Boundaries

Nested providers inherit parent messages and fallback behavior, then override what they load.

```html
<intl-locale locale="en-US" src-dir="/locales">
    <intl-msg key="product.title">Product</intl-msg>

    <aside>
        <intl-locale locale="fr-FR" src-dir="/locales">
            <intl-msg key="product.title">Produit</intl-msg>
        </intl-locale>
    </aside>
</intl-locale>
```

Use this for previews, language switchers, demos, and embedded content that should not change the whole page locale.

## Use APIs For Non-DOM Work

Use formatter functions when you need localized strings in business logic, tests, server-rendered fragments, document titles, analytics labels, or generated data.

```ts
import { createIntl, formatMessage, formatNumber } from '@beforesemicolon/intl'

const scope = createIntl({
    locale: 'en-US',
    messages: {
        email: {
            subject: 'Receipt for {total}',
        },
    },
})

const total = formatNumber(1299.99, {
    scope,
    style: 'currency',
    currency: 'USD',
})

formatMessage('email.subject', { total }, { scope })
```

## Use `createIntl` For Isolated Work

Use `createIntl` for tests, previews, and isolated formatting jobs. Use `initIntl` for the application default runtime.

```ts
const preview = createIntl({
    locale: 'ja-JP',
    fallbackLocale: 'en',
    srcDir: '/locales',
})

await preview.loadLocale()
```

This avoids replacing the runtime used by the rest of the page.

## Load Locales Predictably

Use `src-dir` when your files follow a locale-name convention.

```html
<intl-locale locale="pt-CV" fallback-locale="en" src-dir="/locales">
    <intl-msg key="home.title">Home</intl-msg>
</intl-locale>
```

Use a custom loader when messages come from an API, import map, or database.

```ts
const runtime = createIntl({
    locale: 'fr-FR',
    loader(locale, signal) {
        return fetch(`/api/messages/${locale}`, { signal }).then((res) =>
            res.json()
        )
    },
})
```

## Keep Formatting Options Close To Output

Readers should be able to understand the localized output from the markup alone.

```html
<intl-datetime date-style="full" time-style="short" time-zone="UTC">
    2026-01-01T10:00:00Z
</intl-datetime>
```

Avoid hiding critical formatting decisions in distant scripts unless you are using the function API intentionally.

## Production Checklist

- Give every page one clear top-level locale scope.
- Use fallback text inside `<intl-msg>`.
- Prefer child text for simple component values.
- Use `createIntl` for isolated runtimes and `initIntl` for the default runtime.
- Pass `scope` to API helpers when formatting should not use the default runtime.
- Listen for `locale-error` when remote message loading can fail.
- Use `update-document` only for the provider that controls the page language.
