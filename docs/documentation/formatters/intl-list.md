---
name: '{{t.pages.documentation.formatters.intl_list.meta.intllist}}'
order: 6.15
title: '{{t.pages.documentation.formatters.intl_list.meta.intllist_intl_by_before_semicolon}}'
description: '{{t.pages.documentation.formatters.intl_list.meta.format_localized_lists_with_intl_listformat}}'
layout: document
---

## {{t.pages.documentation.formatters.intl_list.content.intllist}}

{{t.pages.documentation.formatters.intl_list.content.intllist_value_options_builds_a_localized_list_string_from_multiple_values_use_it_for_breadcrumb}}

{{t.pages.documentation.formatters.intl_list.content.it_maps_directly_to_intl_listformat_https_developer_mozilla_org_en_us_docs_web_javascript_refere}}

## {{t.common.content.input_shape}}

{{t.common.content.value_can_be}}

- {{t.pages.documentation.formatters.intl_list.content.string}}
- {{t.pages.documentation.formatters.intl_list.content.space_separated_text_a_b_c}}

```ts
import { intlList } from '@beforesemicolon/intl'

intlList(['shipping', 'tax', 'discounts'])
intlList('shipping tax discounts')
```

## {{t.common.content.signature}}

```ts
function intlList(
  value: string[] | string,
  options?: {
    locale?: string
    scope?: IntlRuntime
    type?: 'conjunction' | 'disjunction' | 'unit' | 'and' | 'or' | 'none'
    style?: 'long' | 'short' | 'narrow'
    localeMatcher?: 'lookup' | 'best fit'
  }
): string
```

{{t.pages.documentation.formatters.intl_list.content.invalid_or_empty_input_returns}}

## {{t.common.content.option_map}}

{{t.common.content.option_type_default_effect}}
|---|---|---|---|
{{t.pages.documentation.formatters.intl_list.content.locale_string_runtime_locale_locale_for_this_list}}
{{t.pages.documentation.formatters.intl_list.content.scope_intlruntime_getintl_use_scoped_runtime_for_locale_fallback}}
{{t.pages.documentation.formatters.intl_list.content.type_conjunction_disjunction_unit_and_or_none_conjunction_grammar_behavior}}
{{t.pages.documentation.formatters.intl_list.content.style_long_short_narrow_long_full_vs_compact_list_text}}
{{t.pages.documentation.formatters.intl_list.content.localematcher_lookup_best_fit_best_fit_locale_negotiation_algorithm}}

{{t.pages.documentation.formatters.intl_list.content.and_or_and_none_are_convenience_aliases_for_conjunction_disjunction_and_unit_behavior}}

## {{t.common.content.examples}}

### {{t.pages.documentation.formatters.intl_list.content.default_behavior}}

```ts
intlList(['A', 'B', 'C'])
intlList('A B C', { locale: 'en-US' })
```

### {{t.pages.documentation.formatters.intl_list.content.type_variations}}

```ts
intlList(['A', 'B', 'C'], { type: 'conjunction', style: 'long' }) // and
intlList(['A', 'B', 'C'], { type: 'or', style: 'short' }) // or
intlList(['A', 'B', 'C'], { type: 'none', style: 'narrow' }) // punctuation only
```

### {{t.pages.documentation.formatters.intl_list.content.scope_and_locale_overrides}}

```ts
import { createIntl, intlList } from '@beforesemicolon/intl'

const scoped = createIntl({ locale: 'fr-FR', messages: {} })

intlList(['A', 'B', 'C'], { scope: scoped })
intlList('A B C', { locale: 'de-DE', style: 'short' })
```

## {{t.common.content.empty_output_rules}}

```ts
intlList([]) // ''
intlList('') // ''
```

## {{t.common.content.see_also}}

- {{t.pages.documentation.formatters.intl_list.content.intl_list_component_reference_documentation_components_intl_list}}
- {{t.pages.documentation.formatters.intl_list.content.intl_listformat_docs_https_developer_mozilla_org_en_us_docs_web_javascript_reference_global_obje}}
