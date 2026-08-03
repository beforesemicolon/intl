---
name: '{{t.pages.documentation.apis.get_intl.meta.getintl}}'
order: 7.03
title: '{{t.pages.documentation.apis.get_intl.meta.getintl_intl_by_before_semicolon}}'
description: '{{t.pages.documentation.apis.get_intl.meta.read_the_active_intl_runtime_either_from_an_explicit_scope_or_from_the_package_default_runtime}}'
layout: document
---

## {{t.pages.documentation.apis.get_intl.content.getintl}}

{{t.pages.documentation.apis.get_intl.content.getintl_scope_gives_you_the_runtime_instance_that_formatters_and_components_use}}

{{t.pages.documentation.apis.get_intl.content.use_it_when_you_need_to_inspect_current_state_read_messages_directly_or_share_one_runtime_instan}}

```ts
import { getIntl } from '@beforesemicolon/intl'

const runtime = getIntl()
console.log(runtime.locale)
console.log(runtime.direction)
console.log(runtime.snapshot().loadedLocales)
```

## {{t.common.content.signature}}

```ts
function getIntl(scope?: IntlRuntime): IntlRuntime
```

## {{t.pages.documentation.apis.get_intl.content.how_it_chooses_scope}}

- {{t.pages.documentation.apis.get_intl.content.if_you_pass_a_scope_it_returns_that_runtime_directly}}
- {{t.pages.documentation.apis.get_intl.content.if_you_omit_scope_it_returns_the_package_default_runtime}}
- {{t.pages.documentation.apis.get_intl.content.if_no_default_runtime_exists_yet_this_function_creates_one_lazily}}

```ts
const shared = getIntl()
const local = getIntl(customRuntime)
```

## {{t.pages.documentation.apis.get_intl.content.snapshot_pattern}}

{{t.pages.documentation.apis.get_intl.content.snapshot_is_the_fastest_way_to_read_runtime_status_without_triggering_ui_behavior}}

```ts
const snapshot = getIntl().snapshot()

console.log(snapshot.locale) // active locale
console.log(snapshot.status) // 'idle' | 'loading' | 'ready' | 'error'
console.log(snapshot.parentScope?.locale) // inherited scope when nested
console.log(snapshot.loadedLocales) // locales already loaded in this runtime
```

## {{t.pages.documentation.apis.get_intl.content.message_lookup_and_formatting_without_side_effects}}

{{t.pages.documentation.apis.get_intl.content.runtime_access_gives_you_deterministic_behavior_in_tests_and_reusable_helpers}}

```ts
import { initIntl, getIntl, intlMsg } from '@beforesemicolon/intl'

initIntl({ locale: 'fr-FR', messages: { product: { title: 'Produit' } } })
const runtime = getIntl()
const title = runtime.getMessage('product.title')
const rendered = intlMsg('product.title', undefined, { scope: runtime })
```

## {{t.pages.documentation.apis.get_intl.content.component_interop}}

{{t.pages.documentation.apis.get_intl.content.components_use_nearest_and_then_default_runtime_if_you_need_exact_parity_in_custom_js_use_the_sa}}

{{t.pages.documentation.apis.get_intl.content.getintl_itself_is_safe_for_plain_runtime_reads_but_does_not_subscribe_to_updates}}
