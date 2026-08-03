---
name: '{{t.pages.documentation.apis.init_intl.meta.initintl}}'
order: 7.02
title: '{{t.pages.documentation.apis.init_intl.meta.initintl_intl_by_before_semicolon}}'
description: '{{t.pages.documentation.apis.init_intl.meta.initialize_or_replace_the_default_intl_runtime_used_by_helper_functions_and_unscoped_components}}'
layout: document
---

## {{t.pages.documentation.apis.init_intl.content.initintl}}

{{t.pages.documentation.apis.init_intl.content.initintl_options_creates_or_replaces_the_package_default_runtime}}

{{t.pages.documentation.apis.init_intl.content.use_this_at_app_entry_when_one_locale_baseline_should_apply_across_the_whole_page}}

```ts
import { initIntl } from '@beforesemicolon/intl'

initIntl({
  locale: navigator.language,
  fallbackLocale: 'en',
  srcDir: '/locales',
})
```

{{t.common.content.native_api_intl_locale_https_developer_mozilla_org_en_us_docs_web_javascript_reference_global_ob}}

## {{t.common.content.signature}}

```ts
function initIntl(options?: IntlRuntimeOptions): IntlRuntime
```

## {{t.pages.documentation.apis.init_intl.content.what_happens_when_called}}

- {{t.pages.documentation.apis.init_intl.content.destroys_any_existing_default_runtime}}
- {{t.pages.documentation.apis.init_intl.content.creates_a_new_default_runtime_from_options}}
- {{t.pages.documentation.apis.init_intl.content.default_runtime_becomes_the_fallback_for_initintl_helpers_and_unscoped_components}}

```ts
const runtime = initIntl({ locale: 'en-US', messages: { brand: 'Acme' } })
```

## {{t.pages.documentation.apis.init_intl.content.setup_patterns}}

### {{t.pages.documentation.apis.init_intl.content.page_level_scoped_files}}

```ts
initIntl({
  locale: 'en',
  src: '/locales/en.landing-page.json',
  fallbackLocale: 'en',
})
```

### {{t.pages.documentation.apis.init_intl.content.runtime_inheritance}}

{{t.pages.documentation.apis.init_intl.content.initintl_is_for_global_defaults_for_nested_or_isolated_contexts_create_dedicated_runtimes_with_c}}

```ts
import { createIntl } from '@beforesemicolon/intl'

const child = createIntl({ locale: 'fr-FR', parentScope: initIntl() })
```

## {{t.pages.documentation.apis.init_intl.content.pairing_with_components}}

{{t.pages.documentation.apis.init_intl.content.when_components_render_outside_they_use_this_runtime}}

```html
<intl-number type="currency" currency="USD">1299.99</intl-number>
```
