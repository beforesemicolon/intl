---
name: intlList
order: 6.15
title: intlList - Intl by Before Semicolon
description: Format localized lists with Intl.ListFormat.
layout: document
---

## `intlList`

`intlList(value, options?)` builds a localized list string from multiple values.
Use it for breadcrumb-like segments, summaries, or UI helper text like shipping/payment terms.

It maps directly to:
[Intl.ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat)

## Input shape

`value` can be:

- `string[]`
- space-separated text (`"A B C"`)

```ts
import { intlList } from '@beforesemicolon/intl'

intlList(['shipping', 'tax', 'discounts'])
intlList('shipping tax discounts')
```

## Signature

```ts
function intlList(
  value: string[] | string,
  options?: {
    locale?: string
    scope?: IntlRuntime
    type?: 'conjunction' | 'disjunction' | 'unit' | 'and' | 'or' | 'none'
    style?: 'long' | 'short' | 'narrow'
    localeMatcher?: 'lookup' | 'best fit'
  }
): string
```

Invalid or empty input returns `''`.

## Option map

| Option | Type | Default | Effect |
|---|---|---|---|
| `locale` | `string` | runtime locale | Locale for this list |
| `scope` | `IntlRuntime` | `getIntl()` | Use scoped runtime for locale fallback |
| `type` | `conjunction \| disjunction \| unit \| and \| or \| none` | `conjunction` | Grammar behavior |
| `style` | `long \| short \| narrow` | `long` | Full vs compact list text |
| `localeMatcher` | `lookup \| best fit` | `best fit` | Locale negotiation algorithm |

`and`, `or`, and `none` are convenience aliases for `conjunction`, `disjunction`, and `unit` behavior.

## Examples

### Default behavior

```ts
intlList(['A', 'B', 'C'])
intlList('A B C', { locale: 'en-US' })
```

### Type variations

```ts
intlList(['A', 'B', 'C'], { type: 'conjunction', style: 'long' }) // and
intlList(['A', 'B', 'C'], { type: 'or', style: 'short' }) // or
intlList(['A', 'B', 'C'], { type: 'none', style: 'narrow' }) // punctuation only
```

### Scope and locale overrides

```ts
import { createIntl, intlList } from '@beforesemicolon/intl'

const scoped = createIntl({ locale: 'fr-FR', messages: {} })

intlList(['A', 'B', 'C'], { scope: scoped })
intlList('A B C', { locale: 'de-DE', style: 'short' })
```

## Empty output rules

```ts
intlList([]) // ''
intlList('') // ''
```

## See also

- [intl-list component reference](/documentation/components/intl-list)
- [Intl.ListFormat docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat)
