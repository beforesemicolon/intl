---
name: intl-name
order: 5.8
title: <intl-name> - Display Names
description: Render localized names for regions, languages, scripts, and currencies.
layout: document
---

## `<intl-name>`

`<intl-name>` resolves identifiers through `Intl.DisplayNames`.

Native reference: [Intl.DisplayNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames)

```html
<intl-name type="region">US</intl-name>
```

## Attributes and properties

| Attribute | JS property | Type | Description |
|---|---|---|---|
| `value` | `value` | string | Identifier to display. Child text is used when omitted. |
| `locale` | `locale` | string | Overrides the runtime locale. |
| `type` | `type` | `language` \| `region` \| `script` \| `currency` | Identifier category. Defaults to `region`. |
| `name-style` | `nameStyle` | `long` \| `short` \| `narrow` | Display name style. |
| `language` | `language` | `dialect` \| `standard` | Language display style. |

## `value`

Use child text for static identifiers.

```html
<intl-name type="region">US</intl-name>
```

Use the property from JavaScript for dynamic identifiers.

```html
<intl-name id="selected-region" type="region">US</intl-name>

<script>
    document.getElementById('selected-region').value = 'BR'
</script>
```

## `locale`

Use `locale` for a one-off override.

```html
<intl-name locale="en-US" type="region">BR</intl-name>
<intl-name locale="pt-BR" type="region">BR</intl-name>
```

## `type`

`type` tells the component which identifier category to resolve.

```html
<intl-name type="region">US</intl-name>
<intl-name type="language">pt-BR</intl-name>
<intl-name type="script">Latn</intl-name>
<intl-name type="currency">USD</intl-name>
```

## `name-style`

`name-style` controls output length when the browser supports multiple labels.

```html
<intl-name type="region" name-style="long">US</intl-name>
<intl-name type="region" name-style="short">US</intl-name>
<intl-name type="currency" name-style="narrow">USD</intl-name>
```

For short or narrow styles, the component adds a long-form `aria-label` when the accessible label differs from the visible output.

## `language`

`language` controls language display when `type="language"`.

```html
<intl-name type="language" language="dialect">pt-BR</intl-name>
<intl-name type="language" language="standard">pt-BR</intl-name>
```

Use `dialect` when regional language names matter. Use `standard` when you want the base language name when possible.

## See also

- [intlName](/documentation/formatters/intl-name)
