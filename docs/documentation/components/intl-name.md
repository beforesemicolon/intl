---
name: intl-name
order: 5.8
title: <intl-name> - Display Names
description: Render localized names for regions, languages, scripts, and currencies.
layout: document
---

## `<intl-name>`

`<intl-name>` resolves identifiers through `Intl.DisplayNames`.

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

## Regions and currencies

```html
<intl-name type="region">US</intl-name>
<intl-name type="currency">USD</intl-name>
<intl-name type="region" name-style="short">FR</intl-name>
```

## Languages and scripts

```html
<intl-name type="language" language="dialect">pt-BR</intl-name>
<intl-name type="language" language="standard">fr-CA</intl-name>
<intl-name type="script">Latn</intl-name>
```

For short or narrow styles, the component adds a long-form `aria-label` when the accessible label differs from the visible output.

## JavaScript API equivalent

```ts
import { intlName, formatName } from '@beforesemicolon/intl'

intlName({
    value: 'US',
    type: 'region',
})

formatName('pt-BR', {
    type: 'language',
    languageDisplay: 'dialect',
})
```
