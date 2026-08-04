---
name: '{{t.pages.documentation.formatters.intl_plural.meta.intlplural}}'
order: 6.17
title: '{{t.pages.documentation.formatters.intl_plural.meta.intlplural_intl_by_before_semicolon}}'
description: '{{t.pages.documentation.formatters.intl_plural.meta.select_cardinal_or_ordinal_plural_output_with_intl_pluralrules}}'
layout: document
---

## {{t.pages.documentation.formatters.intl_plural.content.intlplural}}

{{t.pages.documentation.formatters.intl_plural.content.intlplural_value_options_returns_text_based_on_locale_plural_rules_use_this_for_item_labels_coun}}

{{t.pages.documentation.formatters.intl_plural.content.native_reference_intl_pluralrules_https_developer_mozilla_org_en_us_docs_web_javascript_referenc}}

## {{t.common.content.signature}}

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

{{t.common.content.invalid_values_return}}

## {{t.common.content.option_map}}

{{t.common.content.option_type_default_effect}}
|---|---|---|---|
{{t.common.content.locale_string_runtime_locale_one_off_locale_override}}
{{t.pages.documentation.formatters.intl_plural.content.scope_intlruntime_getintl_use_scoped_runtime_locale}}
{{t.pages.documentation.formatters.intl_plural.content.type_cardinal_ordinal_cardinal_pluralization_mode}}
{{t.pages.documentation.formatters.intl_plural.content.zero_string_undefined_text_for_zero_category}}
{{t.pages.documentation.formatters.intl_plural.content.one_string_other_fallback_text_for_one_category}}
{{t.pages.documentation.formatters.intl_plural.content.two_string_undefined_text_for_two_category}}
{{t.pages.documentation.formatters.intl_plural.content.few_string_undefined_text_for_few_category}}
{{t.pages.documentation.formatters.intl_plural.content.many_string_undefined_text_for_many_category}}
{{t.pages.documentation.formatters.intl_plural.content.other_string_required_text_for_other_category}}

{{t.pages.documentation.formatters.intl_plural.content.if_a_category_is_missing_output_falls_back_to_other_or_the_selected_category_s_raw_token}}

## {{t.common.content.examples}}

### {{t.pages.documentation.formatters.intl_plural.content.cardinal_examples}}

```ts
intlPlural(0, { locale: 'en-US', zero: 'no items', one: 'item', other: 'items' })
intlPlural(1, { locale: 'en-US', one: 'item', other: 'items' }) // "item"
intlPlural(2, { locale: 'en-US', one: 'item', other: 'items' }) // "items"
```

### {{t.pages.documentation.formatters.intl_plural.content.ordinal_examples}}

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

### {{t.pages.documentation.formatters.intl_plural.content.language_specific_behavior}}

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

### {{t.pages.documentation.formatters.intl_plural.content.runtime_scoping}}

```ts
import { createIntl, intlPlural } from '@beforesemicolon/intl'

const scoped = createIntl({ locale: 'fr-FR', messages: {} })
intlPlural(3, { scope: scoped, one: 'article', other: 'articles' })
```

## {{t.common.content.see_also}}

- {{t.pages.documentation.formatters.intl_plural.content.intl_plural_component_reference_documentation_components_intl_plural}}
- {{t.pages.documentation.formatters.intl_plural.content.intl_pluralrules_docs_https_developer_mozilla_org_en_us_docs_web_javascript_reference_global_obj}}
