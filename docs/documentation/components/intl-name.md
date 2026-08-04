---
name: '{{t.pages.documentation.components.intl_name.meta.intl_name}}'
order: 5.8
title: '{{t.pages.documentation.components.intl_name.meta.display_names}}'
description: '{{t.pages.documentation.components.intl_name.meta.render_localized_names_for_regions_languages_scripts_and_currencies}}'
layout: document
---

## {{t.pages.documentation.components.intl_name.content.text}}

{{t.pages.documentation.components.intl_name.content.resolves_identifiers_through_intl_displaynames}}

{{t.pages.documentation.components.intl_name.content.native_reference_intl_displaynames_https_developer_mozilla_org_en_us_docs_web_javascript_referen}}

```html
<intl-name type="region">US</intl-name>
```

## {{t.common.content.attributes_and_properties}}

{{t.common.content.attribute_js_property_type_description}}
|---|---|---|---|
{{t.pages.documentation.components.intl_name.content.value_value_string_identifier_to_display_child_text_is_used_when_omitted}}
{{t.common.content.locale_locale_string_overrides_the_runtime_locale}}
{{t.pages.documentation.components.intl_name.content.type_type_language_region_script_currency_identifier_category_defaults_to_region}}
{{t.pages.documentation.components.intl_name.content.name_style_namestyle_long_short_narrow_display_name_style}}
{{t.pages.documentation.components.intl_name.content.language_language_dialect_standard_language_display_style}}

## {{t.common.content.value}}

{{t.pages.documentation.components.intl_name.content.use_child_text_for_static_identifiers}}

```html
<intl-name type="region">US</intl-name>
```

{{t.pages.documentation.components.intl_name.content.use_the_property_from_javascript_for_dynamic_identifiers}}

```html
<intl-name id="selected-region" type="region">US</intl-name>

<script>
    document.getElementById('selected-region').value = 'BR'
</script>
```

## {{t.common.content.locale}}

{{t.common.content.use_locale_for_a_one_off_override}}

```html
<intl-name locale="en-US" type="region">BR</intl-name>
<intl-name locale="pt-BR" type="region">BR</intl-name>
```

## {{t.common.content.type}}

{{t.pages.documentation.components.intl_name.content.type_tells_the_component_which_identifier_category_to_resolve}}

```html
<intl-name type="region">US</intl-name>
<intl-name type="language">pt-BR</intl-name>
<intl-name type="script">Latn</intl-name>
<intl-name type="currency">USD</intl-name>
```

## {{t.pages.documentation.components.intl_name.content.name_style}}

{{t.pages.documentation.components.intl_name.content.name_style_controls_output_length_when_the_browser_supports_multiple_labels}}

```html
<intl-name type="region" name-style="long">US</intl-name>
<intl-name type="region" name-style="short">US</intl-name>
<intl-name type="currency" name-style="narrow">USD</intl-name>
```

{{t.common.content.for_short_or_narrow_styles_the_component_adds_a_long_form_aria_label_when_the_accessible_label_d}}

## {{t.pages.documentation.components.intl_name.content.language}}

{{t.pages.documentation.components.intl_name.content.language_controls_language_display_when_type_language}}

```html
<intl-name type="language" language="dialect">pt-BR</intl-name>
<intl-name type="language" language="standard">pt-BR</intl-name>
```

{{t.pages.documentation.components.intl_name.content.use_dialect_when_regional_language_names_matter_use_standard_when_you_want_the_base_language_nam}}

## {{t.common.content.see_also}}

- {{t.pages.documentation.components.intl_name.content.intlname_documentation_formatters_intl_name}}
