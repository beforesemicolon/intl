---
name: '{{t.pages.documentation.components.intl_msg.meta.intl_msg}}'
order: 5.2
title: '{{t.pages.documentation.components.intl_msg.meta.message_formatter}}'
description: '{{t.pages.documentation.components.intl_msg.meta.resolve_runtime_messages_by_key_with_text_fallback_and_placeholder_interpolation}}'
layout: document
---

## {{t.pages.documentation.components.intl_msg.content.text}}

{{t.pages.documentation.components.intl_msg.content.renders_a_message_from_the_nearest_runtime_its_child_text_is_the_fallback_shown_before_messages}}

```html
<intl-msg key="checkout.title">Checkout</intl-msg>
```

## {{t.common.content.attributes}}

{{t.common.content.attribute_type_default_description}}
|---|---|---|---|
{{t.pages.documentation.components.intl_msg.content.key_string_dot_path_message_key_such_as_checkout_title}}
{{t.pages.documentation.components.intl_msg.content.values_json_object_placeholder_values_used_for_name_interpolation}}

## {{t.pages.documentation.components.intl_msg.content.key}}

{{t.pages.documentation.components.intl_msg.content.use_key_to_read_a_value_from_the_active_locale_messages_the_child_text_remains_useful_fallback_c}}

```html
<intl-locale locale="en-US" src-dir="/locales">
    <h1><intl-msg key="checkout.title">Checkout</intl-msg></h1>
</intl-locale>
```

{{t.pages.documentation.components.intl_msg.content.for_messages_like}}

```json
{
    "checkout": {
        "title": "Checkout"
    }
}
```

{{t.pages.documentation.components.intl_msg.content.dot_paths_read_nested_message_objects}}

```html
<intl-msg key="account.profile.heading">Profile</intl-msg>
```

```json
{
    "account": {
        "profile": {
            "heading": "Profile"
        }
    }
}
```

## {{t.pages.documentation.components.intl_msg.content.values}}

{{t.pages.documentation.components.intl_msg.content.use_values_when_the_message_includes_placeholder_tokens}}

```html
<intl-msg
    key="checkout.greeting"
    values='{"name":"Ari","count":3}'
>
    Welcome back
</intl-msg>
```

{{t.pages.documentation.components.intl_msg.content.for_messages_like}}

```json
{
    "checkout": {
        "greeting": "Welcome back, {name}. You have {count} items."
    }
}
```

{{t.pages.documentation.components.intl_msg.content.every_value_must_be_valid_json_because_attributes_are_strings_in_html}}

```html
<intl-msg
    key="order.total"
    values='{"amount":"$42.00","currency":"USD"}'
>
    Total: $42.00
</intl-msg>
```

{{t.pages.documentation.components.intl_msg.content.missing_null_and_undefined_placeholder_values_render_as_empty_strings}}

{{t.pages.documentation.components.intl_msg.content.for_complex_formatting_dates_numbers_etc_place_placeholders_in_the_message_string_and_keep_local}}

## {{t.pages.documentation.components.intl_msg.content.fallback_text}}

{{t.pages.documentation.components.intl_msg.content.the_fallback_text_is_the_content_inside_the_tag}}

```html
<intl-msg key="missing.key">Fallback copy</intl-msg>
```

{{t.pages.documentation.components.intl_msg.content.if_the_runtime_is_not_ready_no_key_is_set_or_the_key_is_missing_the_component_renders_fallback_c}}

{{t.pages.documentation.components.intl_msg.content.you_can_also_use_fallback_only_text_for_static_copy_during_early_prototyping}}

```html
<intl-msg>Plain fallback text</intl-msg>
```

{{t.pages.documentation.components.intl_msg.content.for_production_translation_files_prefer_adding_a_key_or_using_the_optional_translation_builder_w}}

## {{t.pages.documentation.components.intl_msg.content.html_content_in_messages}}

{{t.pages.documentation.components.intl_msg.content.message_output_is_rendered_as_a_markup_template_so_trusted_message_strings_can_include_markup}}

```json
{
    "status": {
        "new": "<strong>New</strong>"
    }
}
```

```html
<intl-msg key="status.new">New</intl-msg>
```

{{t.pages.documentation.components.intl_msg.content.only_put_trusted_translation_content_in_message_files}}

## {{t.common.content.see_also}}

- {{t.pages.documentation.components.intl_msg.content.intlmsg_documentation_formatters_intl_message}}
