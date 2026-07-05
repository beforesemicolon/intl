---
name: formatName
order: 6.16
title: formatName - Intl by Before Semicolon
description: Display localized language, region, script, and currency names with Intl.DisplayNames.
layout: document
---

## `formatName`

`formatName(value, options?)` resolves localized display names.

```ts
import { formatName } from '@beforesemicolon/intl'

formatName('US', { locale: 'en-US', type: 'region' }) // "United States"
formatName('pt-BR', { locale: 'en-US', type: 'language' }) // "Brazilian Portuguese"
formatName('USD', { locale: 'en-US', type: 'currency' }) // "US Dollar"
```

## Signature

```ts
function formatName(
    value: string,
    options?: Intl.DisplayNamesOptions & {
        locale?: string
        scope?: IntlRuntime
    }
): string
```

Empty values return an empty string.

## Common types

```ts
formatName('Latn', { type: 'script' })
formatName('FR', { type: 'region', style: 'short' })
formatName('fr-CA', { type: 'language', languageDisplay: 'standard' })
```

## Component equivalent

```html
<intl-name type="region" name-style="long">US</intl-name>
```
