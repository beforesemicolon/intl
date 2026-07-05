---
name: intl-plural
order: 5.9
title: <intl-plural> - Pluralization
description: Select cardinal and ordinal plural text from locale-aware Intl.PluralRules categories.
layout: document
---

## `<intl-plural>`

`<intl-plural>` selects a plural category and renders the matching attribute value.

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

## Cardinal plurals

```html
<intl-plural zero="no files" one="file" other="files">0</intl-plural>
<intl-plural one="message" other="messages">1</intl-plural>
<intl-plural one="message" other="messages">5</intl-plural>
```

## Ordinal plurals

For `type="ordinal"`, the formatter prepends the numeric value to the selected suffix.

```html
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

## Locale-specific categories

Some locales use `few`, `many`, or `two`. Provide every category your supported locales need, and always provide `other`.

```html
<intl-plural locale="ar" zero="zero" one="one" two="two" few="few" many="many" other="other">
    3
</intl-plural>
```

## JavaScript API equivalent

```ts
import { intlPlural, formatPlural } from '@beforesemicolon/intl'

intlPlural({
    value: 2,
    one: 'item',
    other: 'items',
})

formatPlural(3, {
    type: 'ordinal',
    one: 'st',
    two: 'nd',
    few: 'rd',
    other: 'th',
})
```
