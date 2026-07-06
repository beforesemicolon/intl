---
name: intl-list
order: 5.7
title: <intl-list> - List Formatter
description: Format localized conjunction, disjunction, and unit lists from child text or a value.
layout: document
---

## `<intl-list>`

`<intl-list>` formats a list with `Intl.ListFormat`.
Child text is split on whitespace. The helper function can also accept arrays.

Native reference: [Intl.ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat)

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

## `value`

Use child text for simple whitespace-separated lists.

```html
<intl-list>shipping tax discounts</intl-list>
```

Use the property from JavaScript when the list is dynamic or contains items with spaces.

```html
<intl-list id="delivery-options">email phone chat</intl-list>

<script>
    document.getElementById('delivery-options').value = [
        'priority mail',
        'store pickup',
        'courier delivery',
    ]
</script>
```

## `locale`

Use `locale` for a one-off override.

```html
<intl-list locale="en-US">apples pears peaches</intl-list>
<intl-list locale="es-ES">apples pears peaches</intl-list>
```

## `type`

`type` controls the relationship between list items.

```html
<intl-list type="conjunction">apples pears peaches</intl-list>
<intl-list type="disjunction">email phone chat</intl-list>
<intl-list type="unit">meter second kilogram</intl-list>
```

The aliases are shorter to write in markup.

```html
<intl-list type="and">apples pears peaches</intl-list>
<intl-list type="or">email phone chat</intl-list>
<intl-list type="none">meter second kilogram</intl-list>
```

## `type-style`

`type-style` controls output length.

```html
<intl-list type="and" type-style="long">A B C</intl-list>
<intl-list type="and" type-style="short">A B C</intl-list>
<intl-list type="and" type-style="narrow">A B C</intl-list>
```

For short or narrow styles, the component adds a long-form `aria-label` when the accessible label differs from the visible output.

## See also

- [intlList](/documentation/formatters/intl-list)
