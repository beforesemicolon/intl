---
name: '{{t.pages.documentation.formatters.intl_name.meta.intlname}}'
order: 6.16
title: '{{t.pages.documentation.formatters.intl_name.meta.intlname_intl_by_before_semicolon}}'
description: '{{t.pages.documentation.formatters.intl_name.meta.display_localized_language_region_script_and_currency_names_with_intl_displaynames}}'
layout: document
---

## {{t.pages.documentation.formatters.intl_name.content.intlname}}

{{t.pages.documentation.formatters.intl_name.content.intlname_value_options_converts_identifiers_into_localized_human_names_use_this_for_country_labe}}

{{t.pages.documentation.formatters.intl_name.content.native_reference_intl_displaynames_https_developer_mozilla_org_en_us_docs_web_javascript_referen}}

## {{t.common.content.signature}}

```ts
function intlName(
  value: string,
  options?: Intl.DisplayNamesOptions & {
    locale?: string
    scope?: IntlRuntime
  }
): string
```

{{t.pages.documentation.formatters.intl_name.content.empty_or_unknown_values_return}}

## {{t.common.content.option_map}}

{{t.common.content.option_type_default_effect}}
|---|---|---|---|
{{t.common.content.locale_string_runtime_locale_one_off_locale_override}}
{{t.pages.documentation.formatters.intl_name.content.scope_intlruntime_getintl_use_scoped_locale_defaults}}
{{t.pages.documentation.formatters.intl_name.content.type_region_language_script_currency_calendar_datetimefield_undefined_what_the_value_represents}}
{{t.pages.documentation.formatters.intl_name.content.style_narrow_short_long_short_label_width}}
{{t.pages.documentation.formatters.intl_name.content.fallback_none_code_code_what_to_return_when_the_value_cannot_be_resolved}}
{{t.pages.documentation.formatters.intl_name.content.languagedisplay_dialect_standard_standard_dialect_vs_language_first_naming}}
{{t.pages.documentation.formatters.intl_name.content.scriptdisplay_standard_short_standard_script_name_style}}

## {{t.common.content.examples}}

### {{t.pages.documentation.formatters.intl_name.content.region_names}}

```ts
intlName('US', { locale: 'en-US', type: 'region' }) // "United States"
intlName('US', { locale: 'fr-FR', type: 'region', style: 'short' }) // "États-Unis"
```

### {{t.pages.documentation.formatters.intl_name.content.language_script_and_currency}}

```ts
intlName('en', { type: 'language' }) // "English"
intlName('pt-BR', { type: 'language' }) // "Portuguese (Brazil)"
intlName('USD', { type: 'currency', style: 'long' }) // "US Dollar"
intlName('Latn', { type: 'script', style: 'short' }) // "Latn"
```

### {{t.pages.documentation.formatters.intl_name.content.scope_locale_override}}

```ts
import { createIntl, intlName } from '@beforesemicolon/intl'

const scoped = createIntl({ locale: 'ja-JP', messages: {} })

intlName('USD', { scope: scoped })
intlName('USD', { scope: scoped, locale: 'es-ES' })
```

## {{t.pages.documentation.formatters.intl_name.content.fallback_strategy}}

```ts
intlName('', { type: 'region' }) // ''
intlName('ZZ', { type: 'language', fallback: 'code' }) // "ZZ" in code fallback mode
```

## {{t.common.content.see_also}}

- {{t.pages.documentation.formatters.intl_name.content.intl_name_component_reference_documentation_components_intl_name}}
- {{t.pages.documentation.formatters.intl_name.content.intl_displaynames_docs_https_developer_mozilla_org_en_us_docs_web_javascript_reference_global_ob}}
