---
name: intlName
order: 6.24
title: intlName - Intl by Before Semicolon
description: Helper function that mirrors the intl-name component API.
layout: document
---

## `intlName`

`intlName(props?)` resolves localized display names for regions, languages, scripts, and currencies.

```ts
import { intlName } from '@beforesemicolon/intl'

intlName({
    value: 'US',
    type: 'region',
    locale: 'en-US',
})
```

## Signature

```ts
function intlName(props?: Partial<IntlNameProps>): string
```

## Examples

```ts
intlName({ value: 'USD', type: 'currency' })
intlName({ value: 'pt-BR', type: 'language', language: 'dialect' })
intlName({ value: 'Latn', type: 'script', nameStyle: 'short' })
```
