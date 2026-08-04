---
name: '{{t.pages.documentation.apis.set_locale.meta.setlocale}}'
order: 7.04
title: '{{t.pages.documentation.apis.set_locale.meta.setlocale_intl_by_before_semicolon}}'
description: '{{t.pages.documentation.apis.set_locale.meta.change_the_active_locale_on_a_runtime_and_load_messages_for_the_new_locale}}'
layout: document
---

## {{t.pages.documentation.apis.set_locale.content.setlocale}}

{{t.pages.documentation.apis.set_locale.content.setlocale_locale_scope_updates_the_runtime_locale_and_loads_the_locale_payload_for_that_runtime}}

{{t.pages.documentation.apis.set_locale.content.it_is_the_supported_path_for_in_page_language_switching}}

```ts
import { initIntl, setLocale } from '@beforesemicolon/intl'

initIntl({ locale: 'en-US', srcDir: '/locales' })
await setLocale('fr-FR')
```

## {{t.common.content.signature}}

```ts
function setLocale(locale: string, scope?: IntlRuntime): Promise<IntlRuntimeSnapshot>
```

## {{t.pages.documentation.apis.set_locale.content.what_changes_when_this_runs}}

- {{t.pages.documentation.apis.set_locale.content.sets_runtime_locale}}
- {{t.pages.documentation.apis.set_locale.content.marks_runtime_status_as_loading}}
- {{t.pages.documentation.apis.set_locale.content.loads_locale_messages_src_srcdir_or_custom_loader}}
- {{t.pages.documentation.apis.set_locale.content.loads_fallback_locale_messages_when_configured}}
- {{t.pages.documentation.apis.set_locale.content.notifies_subscribers_with_updated_snapshot_once_ready}}

{{t.pages.documentation.apis.set_locale.content.if_locale_is_unchanged_or_empty_it_resolves_immediately_with_the_current_snapshot}}

```ts
const sameLocale = await setLocale(getIntl().locale) // resolves fast, no fetch
```

## {{t.pages.documentation.apis.set_locale.content.scoped_vs_default_runtime}}

{{t.pages.documentation.apis.set_locale.content.pass_a_runtime_when_language_switching_should_be_isolated}}

```ts
const preview = createIntl({ locale: 'en-US', srcDir: '/locales/previews' })
await setLocale('ja-JP', preview)
```

{{t.pages.documentation.apis.set_locale.content.without_scope_the_package_default_runtime_is_changed}}

## {{t.pages.documentation.apis.set_locale.content.language_switcher_pattern}}

```ts
const localeSelect = document.querySelector('#locale')

localeSelect?.addEventListener('change', async (event) => {
  const locale = (event.target as HTMLSelectElement).value
  const snapshot = await setLocale(locale)

  document.documentElement.lang = snapshot.locale
  document.documentElement.dir = snapshot.direction
  document.documentElement.classList.remove('is-loading-locale')
})
```

{{t.pages.documentation.apis.set_locale.content.setlocale_resolves_even_if_loading_fails_check_snapshot_status_error_before_switching_ui_assumpt}}

```ts
const snapshot = await setLocale('ar')
if (snapshot.status === 'error') {
  console.warn(snapshot.error)
}
```

{{t.pages.documentation.apis.set_locale.content.for_manual_loading_without_changing_active_locale_use_loadlocale}}
