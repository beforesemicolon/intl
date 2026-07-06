---
name: intlName
order: 6.16
title: intlName - Intl by Before Semicolon
description: Display localized language, region, script, and currency names with Intl.DisplayNames.
layout: document
---

## `intlName`

`intlName(value, options?)` converts identifiers into localized human names.
Use this for country labels, currency names, script names, and language names.

Native reference:
[Intl.DisplayNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames)

## Signature

```ts
function intlName(
  value: string,
  options?: Intl.DisplayNamesOptions & {
    locale?: string
    scope?: IntlRuntime
  }
): string
```

Empty or unknown values return `''`.

## Option map

| Option | Type | Default | Effect |
|---|---|---|---|
| `locale` | `string` | runtime locale | One-off locale override |
| `scope` | `IntlRuntime` | `getIntl()` | Use scoped locale defaults |
| `type` | `region \| language \| script \| currency \| calendar \| dateTimeField` | `undefined` | What the value represents |
| `style` | `narrow \| short \| long` | `short` | Label width |
| `fallback` | `none \| code` | `code` | What to return when the value cannot be resolved |
| `languageDisplay` | `dialect \| standard` | `standard` | Dialect vs language-first naming |
| `scriptDisplay` | `standard \| short` | `standard` | Script name style |

## Examples

### Region names

```ts
intlName('US', { locale: 'en-US', type: 'region' }) // "United States"
intlName('US', { locale: 'fr-FR', type: 'region', style: 'short' }) // "États-Unis"
```

### Language, script, and currency

```ts
intlName('en', { type: 'language' }) // "English"
intlName('pt-BR', { type: 'language' }) // "Portuguese (Brazil)"
intlName('USD', { type: 'currency', style: 'long' }) // "US Dollar"
intlName('Latn', { type: 'script', style: 'short' }) // "Latn"
```

### Scope + locale override

```ts
import { createIntl, intlName } from '@beforesemicolon/intl'

const scoped = createIntl({ locale: 'ja-JP', messages: {} })

intlName('USD', { scope: scoped })
intlName('USD', { scope: scoped, locale: 'es-ES' })
```

## Fallback strategy

```ts
intlName('', { type: 'region' }) // ''
intlName('ZZ', { type: 'language', fallback: 'code' }) // "ZZ" in code fallback mode
```

## See also

- [intl-name component reference](/documentation/components/intl-name)
- [Intl.DisplayNames docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames)
