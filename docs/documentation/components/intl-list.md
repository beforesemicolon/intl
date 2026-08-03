---
name: '{{t.pages.documentation.components.intl_list.meta.intl_list}}'
order: 5.7
title: '{{t.pages.documentation.components.intl_list.meta.list_formatter}}'
description: '{{t.pages.documentation.components.intl_list.meta.format_localized_conjunction_disjunction_and_unit_lists_from_child_text_or_a_value}}'
layout: document
---

## {{t.pages.documentation.components.intl_list.content.text}}

{{t.pages.documentation.components.intl_list.content.formats_a_list_with_intl_listformat_child_text_is_split_on_whitespace_the_helper_function_can_al}}

{{t.pages.documentation.components.intl_list.content.native_reference_intl_listformat_https_developer_mozilla_org_en_us_docs_web_javascript_reference}}

```html
<intl-list>shipping tax discounts</intl-list>
```

## {{t.common.content.attributes_and_properties}}

{{t.common.content.attribute_js_property_type_description}}
|---|---|---|---|
{{t.pages.documentation.components.intl_list.content.value_value_string_string_list_source_child_text_is_used_when_omitted}}
{{t.common.content.locale_locale_string_overrides_the_runtime_locale}}
{{t.pages.documentation.components.intl_list.content.type_type_conjunction_disjunction_unit_and_or_none_list_relationship}}
{{t.pages.documentation.components.intl_list.content.type_style_typestyle_long_short_narrow_list_style}}

{{t.pages.documentation.components.intl_list.content.aliases_and_means_conjunction_or_means_disjunction_and_none_means_unit}}

## {{t.common.content.value}}

{{t.pages.documentation.components.intl_list.content.use_child_text_for_simple_whitespace_separated_lists}}

```html
<intl-list>shipping tax discounts</intl-list>
```

{{t.pages.documentation.components.intl_list.content.use_the_property_from_javascript_when_the_list_is_dynamic_or_contains_items_with_spaces}}

```html
<intl-list id="delivery-options">email phone chat</intl-list>

<script>
    document.getElementById('delivery-options').value = [
        'priority mail',
        'store pickup',
        'courier delivery',
    ]
</script>
```

## {{t.common.content.locale}}

{{t.common.content.use_locale_for_a_one_off_override}}

```html
<intl-list locale="en-US">apples pears peaches</intl-list>
<intl-list locale="es-ES">apples pears peaches</intl-list>
```

## {{t.common.content.type}}

{{t.pages.documentation.components.intl_list.content.type_controls_the_relationship_between_list_items}}

```html
<intl-list type="conjunction">apples pears peaches</intl-list>
<intl-list type="disjunction">email phone chat</intl-list>
<intl-list type="unit">meter second kilogram</intl-list>
```

{{t.pages.documentation.components.intl_list.content.the_aliases_are_shorter_to_write_in_markup}}

```html
<intl-list type="and">apples pears peaches</intl-list>
<intl-list type="or">email phone chat</intl-list>
<intl-list type="none">meter second kilogram</intl-list>
```

## {{t.pages.documentation.components.intl_list.content.type_style}}

{{t.pages.documentation.components.intl_list.content.type_style_controls_output_length}}

```html
<intl-list type="and" type-style="long">A B C</intl-list>
<intl-list type="and" type-style="short">A B C</intl-list>
<intl-list type="and" type-style="narrow">A B C</intl-list>
```

{{t.common.content.for_short_or_narrow_styles_the_component_adds_a_long_form_aria_label_when_the_accessible_label_d}}

## {{t.common.content.see_also}}

- {{t.pages.documentation.components.intl_list.content.intllist_documentation_formatters_intl_list}}
