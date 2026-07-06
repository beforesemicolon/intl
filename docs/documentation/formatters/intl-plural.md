---
name: intlPlural
order: 6.17
title: intlPlural - Intl by Before Semicolon
description: Select cardinal or ordinal plural output with Intl.PluralRules.
layout: document
---

## `intlPlural`

`intlPlural(value, options?)` returns text based on locale plural rules.
Use this for item labels, counters, and plural-aware grammar in any output path.

Native reference:
[Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules)

## Signature

```ts
function intlPlural(
  value: number,
  options?: {
    locale?: string
    scope?: IntlRuntime
    type?: 'cardinal' | 'ordinal'
    zero?: string
    one?: string
    two?: string
    few?: string
    many?: string
    other?: string
  }
): string
```

Invalid values return `''`.

## Option map

| Option | Type | Default | Effect |
|---|---|---|---|
| `locale` | `string` | runtime locale | One-off locale override |
| `scope` | `IntlRuntime` | `getIntl()` | Use scoped runtime locale |
| `type` | `cardinal \| ordinal` | `cardinal` | Pluralization mode |
| `zero` | `string` | `undefined` | Text for zero category |
| `one` | `string` | `other` fallback | Text for one category |
| `two` | `string` | `undefined` | Text for two category |
| `few` | `string` | `undefined` | Text for few category |
| `many` | `string` | `undefined` | Text for many category |
| `other` | `string` | required | Text for other category |

If a category is missing, output falls back to `other` or the selected category's raw token.

## Examples

### Cardinal examples

```ts
intlPlural(0, { locale: 'en-US', zero: 'no items', one: 'item', other: 'items' })
intlPlural(1, { locale: 'en-US', one: 'item', other: 'items' }) // "item"
intlPlural(2, { locale: 'en-US', one: 'item', other: 'items' }) // "items"
```

### Ordinal examples

```ts
intlPlural(1, {
  type: 'ordinal',
  one: '1st',
  two: '2nd',
  few: '3rd',
  other: 'th',
})

intlPlural(11, {
  type: 'ordinal',
  one: '1st',
  two: '2nd',
  few: '3rd',
  other: 'th',
}) // other in en-US
```

### Language-specific behavior

```ts
intlPlural(2, {
  locale: 'ar',
  one: 'article',
  two: 'couple',
  few: 'few',
  many: 'many',
  other: 'other',
})
```

### Runtime scoping

```ts
import { createIntl, intlPlural } from '@beforesemicolon/intl'

const scoped = createIntl({ locale: 'fr-FR', messages: {} })
intlPlural(3, { scope: scoped, one: 'article', other: 'articles' })
```

## See also

- [intl-plural component reference](/documentation/components/intl-plural)
- [Intl.PluralRules docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules)
