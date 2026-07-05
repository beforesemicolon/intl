---
name: intl-list
order: 5.7
title: <intl-list> - List Formatter
description: Format localized conjunction, disjunction, and unit lists from child text or a value.
layout: document
---

## `<intl-list>`

`<intl-list>` formats a list with `Intl.ListFormat`. Child text is split on whitespace. The helper function can also accept arrays.

```html
<intl-list>shipping tax discounts</intl-list>
```

## Attributes and properties

| Attribute | JS property | Type | Description |
|---|---|---|---|
| `value` | `value` | string/string[] | List source. Child text is used when omitted. |
| `locale` | `locale` | string | Overrides the runtime locale. |
| `type` | `type` | `conjunction` \| `disjunction` \| `unit` \| `and` \| `or` \| `none` | List relationship. |
| `type-style` | `typeStyle` | `long` \| `short` \| `narrow` | List style. |

Aliases: `and` means `conjunction`, `or` means `disjunction`, and `none` means `unit`.

## Conjunction and disjunction

```html
<intl-list type="and">apples pears peaches</intl-list>
<intl-list type="or">email phone chat</intl-list>
```

## Unit lists and styles

```html
<intl-list type="none" type-style="narrow">meter second kilogram</intl-list>
<intl-list type="and" type-style="short">A B C</intl-list>
```

For short or narrow styles, the component adds a long-form `aria-label` when the accessible label differs from the visible output.

## JavaScript API equivalent

```ts
import { intlList, formatList } from '@beforesemicolon/intl'

intlList({
    value: ['shipping', 'tax', 'discounts'],
    type: 'and',
})

formatList(['email', 'phone', 'chat'], {
    type: 'disjunction',
    style: 'long',
})
```
