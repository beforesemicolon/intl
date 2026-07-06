---
name: intl-plural
order: 5.9
title: <intl-plural> - Pluralization
description: Select cardinal and ordinal plural text from locale-aware Intl.PluralRules categories.
layout: document
---

## `<intl-plural>`

`<intl-plural>` selects a plural category from locale rules and renders the matching category text.

Native reference: [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules)

```html
<intl-plural one="item" other="items">2</intl-plural>
```

## Attributes and properties

| Attribute | JS property | Type | Description |
|---|---|---|---|
| `value` | `value` | number/string | Number to classify. Child text is used when omitted. |
| `locale` | `locale` | string | Overrides the runtime locale. |
| `type` | `type` | `cardinal` \| `ordinal` | Plural rules type. Defaults to `cardinal`. |
| `zero` | `zero` | string | Text for the `zero` category. |
| `one` | `one` | string | Text for the `one` category. |
| `two` | `two` | string | Text for the `two` category. |
| `few` | `few` | string | Text for the `few` category. |
| `many` | `many` | string | Text for the `many` category. |
| `other` | `other` | string | Text for the `other` category and fallback text when a category is missing. |

## `value`

Use child text for static values.

```html
<intl-plural one="item" other="items">2</intl-plural>
```

Use the property from JavaScript when the count is dynamic.

```html
<intl-plural id="cart-count" one="item" other="items">0</intl-plural>

<script>
    document.getElementById('cart-count').value = 3
</script>
```

## `locale`

Use `locale` when a specific plural rule should be applied.

```html
<intl-plural locale="en" one="item" other="items">1</intl-plural>
<intl-plural locale="fr" one="article" other="articles">1</intl-plural>
```

## `type`

Use `type="cardinal"` for quantities. Use `type="ordinal"` for ranking suffixes.

```html
<intl-plural type="cardinal" one="message" other="messages">5</intl-plural>

<intl-plural
    type="ordinal"
    one="st"
    two="nd"
    few="rd"
    other="th"
>
    3
</intl-plural>
```

For `type="ordinal"`, the formatter prepends the numeric value to the selected suffix.

## `zero`

Use `zero` for locales or product copy where zero has a dedicated phrase.

```html
<intl-plural zero="no files" one="file" other="files">0</intl-plural>
```

## `one`

Use `one` for the singular category.

```html
<intl-plural one="message" other="messages">1</intl-plural>
```

## `two`

Some locales use a `two` category.

```html
<intl-plural locale="ar" one="one item" two="two items" other="items">2</intl-plural>
```

## `few`

Some locales use a `few` category.

```html
<intl-plural locale="ar" few="a few items" other="items">3</intl-plural>
```

## `many`

Some locales use a `many` category.

```html
<intl-plural locale="ar" many="many items" other="items">11</intl-plural>
```

## `other`

Always provide `other`. It is the standard fallback when the selected category is not provided.

```html
<intl-plural one="file" other="files">12</intl-plural>
```

## Locale-specific categories

Provide every category your supported locales need.

```html
<intl-plural
    locale="ar"
    zero="zero"
    one="one"
    two="two"
    few="few"
    many="many"
    other="other"
>
    3
</intl-plural>
```

## See also

- [intlPlural](/documentation/formatters/intl-plural)
