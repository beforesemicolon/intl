---
name: intlList
order: 6.23
title: intlList - Intl by Before Semicolon
description: Helper function that mirrors the intl-list component API.
layout: document
---

## `intlList`

`intlList(props?)` formats an array or whitespace-separated string into a localized list.

```ts
import { intlList } from '@beforesemicolon/intl'

intlList({
    value: ['shipping', 'tax', 'discounts'],
    type: 'conjunction',
})
```

## Signature

```ts
function intlList(props?: Partial<IntlListProps>): string
```

## Examples

```ts
intlList({ value: 'A B C', type: 'and' })
intlList({ value: 'A B C', type: 'or', typeStyle: 'short' })
intlList({ value: ['kg', 'm', 's'], type: 'none', typeStyle: 'narrow' })
```
