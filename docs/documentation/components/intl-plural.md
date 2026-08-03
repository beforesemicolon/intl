---
name: '{{t.pages.documentation.components.intl_plural.meta.intl_plural}}'
order: 5.9
title: '{{t.pages.documentation.components.intl_plural.meta.pluralization}}'
description: '{{t.pages.documentation.components.intl_plural.meta.select_cardinal_and_ordinal_plural_text_from_locale_aware_intl_pluralrules_categories}}'
layout: document
---

## {{t.pages.documentation.components.intl_plural.content.text}}

{{t.pages.documentation.components.intl_plural.content.selects_a_plural_category_from_locale_rules_and_renders_the_matching_category_text}}

{{t.pages.documentation.components.intl_plural.content.native_reference_intl_pluralrules_https_developer_mozilla_org_en_us_docs_web_javascript_referenc}}

```html
<intl-plural one="item" other="items">2</intl-plural>
```

## {{t.common.content.attributes_and_properties}}

{{t.common.content.attribute_js_property_type_description}}
|---|---|---|---|
{{t.pages.documentation.components.intl_plural.content.value_value_number_string_number_to_classify_child_text_is_used_when_omitted}}
{{t.common.content.locale_locale_string_overrides_the_runtime_locale}}
{{t.pages.documentation.components.intl_plural.content.type_type_cardinal_ordinal_plural_rules_type_defaults_to_cardinal}}
{{t.pages.documentation.components.intl_plural.content.zero_zero_string_text_for_the_zero_category}}
{{t.pages.documentation.components.intl_plural.content.one_one_string_text_for_the_one_category}}
{{t.pages.documentation.components.intl_plural.content.two_two_string_text_for_the_two_category}}
{{t.pages.documentation.components.intl_plural.content.few_few_string_text_for_the_few_category}}
{{t.pages.documentation.components.intl_plural.content.many_many_string_text_for_the_many_category}}
{{t.pages.documentation.components.intl_plural.content.other_other_string_text_for_the_other_category_and_fallback_text_when_a_category_is_missing}}

## {{t.common.content.value}}

{{t.pages.documentation.components.intl_plural.content.use_child_text_for_static_values}}

```html
<intl-plural one="item" other="items">2</intl-plural>
```

{{t.pages.documentation.components.intl_plural.content.use_the_property_from_javascript_when_the_count_is_dynamic}}

```html
<intl-plural id="cart-count" one="item" other="items">0</intl-plural>

<script>
    document.getElementById('cart-count').value = 3
</script>
```

## {{t.common.content.locale}}

{{t.pages.documentation.components.intl_plural.content.use_locale_when_a_specific_plural_rule_should_be_applied}}

```html
<intl-plural locale="en" one="item" other="items">1</intl-plural>
<intl-plural locale="fr" one="article" other="articles">1</intl-plural>
```

## {{t.common.content.type}}

{{t.pages.documentation.components.intl_plural.content.use_type_cardinal_for_quantities_use_type_ordinal_for_ranking_suffixes}}

```html
<intl-plural type="cardinal" one="message" other="messages">5</intl-plural>

<intl-plural
    type="ordinal"
    one="st"
    two="nd"
    few="rd"
    other="th"
>
    3
</intl-plural>
```

{{t.pages.documentation.components.intl_plural.content.for_type_ordinal_the_formatter_prepends_the_numeric_value_to_the_selected_suffix}}

## {{t.pages.documentation.components.intl_plural.content.zero}}

{{t.pages.documentation.components.intl_plural.content.use_zero_for_locales_or_product_copy_where_zero_has_a_dedicated_phrase}}

```html
<intl-plural zero="no files" one="file" other="files">0</intl-plural>
```

## {{t.pages.documentation.components.intl_plural.content.one}}

{{t.pages.documentation.components.intl_plural.content.use_one_for_the_singular_category}}

```html
<intl-plural one="message" other="messages">1</intl-plural>
```

## {{t.pages.documentation.components.intl_plural.content.two}}

{{t.pages.documentation.components.intl_plural.content.some_locales_use_a_two_category}}

```html
<intl-plural locale="ar" one="one item" two="two items" other="items">2</intl-plural>
```

## {{t.pages.documentation.components.intl_plural.content.few}}

{{t.pages.documentation.components.intl_plural.content.some_locales_use_a_few_category}}

```html
<intl-plural locale="ar" few="a few items" other="items">3</intl-plural>
```

## {{t.pages.documentation.components.intl_plural.content.many}}

{{t.pages.documentation.components.intl_plural.content.some_locales_use_a_many_category}}

```html
<intl-plural locale="ar" many="many items" other="items">11</intl-plural>
```

## {{t.pages.documentation.components.intl_plural.content.other}}

{{t.pages.documentation.components.intl_plural.content.always_provide_other_it_is_the_standard_fallback_when_the_selected_category_is_not_provided}}

```html
<intl-plural one="file" other="files">12</intl-plural>
```

## {{t.pages.documentation.components.intl_plural.content.locale_specific_categories}}

{{t.pages.documentation.components.intl_plural.content.provide_every_category_your_supported_locales_need}}

```html
<intl-plural
    locale="ar"
    zero="zero"
    one="one"
    two="two"
    few="few"
    many="many"
    other="other"
>
    3
</intl-plural>
```

## {{t.common.content.see_also}}

- {{t.pages.documentation.components.intl_plural.content.intlplural_documentation_formatters_intl_plural}}
