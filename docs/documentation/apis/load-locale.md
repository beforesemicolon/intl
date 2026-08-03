---
name: '{{t.pages.documentation.apis.load_locale.meta.loadlocale}}'
order: 7.05
title: '{{t.pages.documentation.apis.load_locale.meta.loadlocale_intl_by_before_semicolon}}'
description: '{{t.pages.documentation.apis.load_locale.meta.load_messages_for_the_current_or_requested_locale_without_necessarily_changing_the_active_runtim}}'
layout: document
---

## {{t.pages.documentation.apis.load_locale.content.loadlocale}}

{{t.pages.documentation.apis.load_locale.content.loadlocale_locale_scope_triggers_message_loading_for_a_runtime}}

{{t.pages.documentation.apis.load_locale.content.it_never_changes_runtime_locale_by_itself_it_only_fetches_and_stores_messages}}

```ts
import { initIntl, loadLocale } from '@beforesemicolon/intl'

initIntl({
  locale: 'en-US',
  srcDir: '/locales',
})

await loadLocale() // loads en-US (and fallback locale if needed)
```

## {{t.common.content.signature}}

```ts
function loadLocale(locale?: string, scope?: IntlRuntime): Promise<IntlRuntimeSnapshot>
```

## {{t.pages.documentation.apis.load_locale.content.preload_and_warm_cache}}

```ts
const runtime = initIntl({ locale: 'en-US', srcDir: '/locales' })
await loadLocale('fr-FR', runtime) // preload
await loadLocale('es-ES', runtime) // preload another one
```

{{t.pages.documentation.apis.load_locale.content.preloading_keeps_a_second_locale_ready_for_quick_switching_while_keeping_current_runtime_locale}}

## {{t.pages.documentation.apis.load_locale.content.error_handling}}

```ts
const snapshot = await loadLocale('es-ES')
if (snapshot.status === 'error') {
  console.error(snapshot.error)
}
```

{{t.pages.documentation.apis.load_locale.content.snapshot_error_is_populated_when_fetch_fails_or_parsing_fails}}

{{t.pages.documentation.apis.load_locale.content.native_reference_fetch_https_developer_mozilla_org_en_us_docs_web_api_fetch_api_abortcontroller}}
