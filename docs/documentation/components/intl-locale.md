---
name: '{{t.pages.documentation.components.intl_locale.meta.intl_locale}}'
order: 5.1
title: '{{t.pages.documentation.components.intl_locale.meta.runtime_scope}}'
description: '{{t.pages.documentation.components.intl_locale.meta.define_locale_runtime_boundaries_load_messages_update_document_language_and_scope_child_intl_com}}'
layout: document
---

## {{t.pages.documentation.components.intl_locale.content.text}}

{{t.pages.documentation.components.intl_locale.content.creates_the_runtime_scope_used_by_every_intl_component_inside_it_use_it_around_the_part_of_the_p}}

{{t.pages.documentation.components.intl_locale.content.native_mapping_locale_detection_and_direction_follow_intl_locale_https_developer_mozilla_org_en}}

```html
<intl-locale locale="en-US" fallback-locale="en" src-dir="/locales">
    <intl-msg key="checkout.title">Checkout</intl-msg>
    <intl-number type="currency" currency="USD">1299.99</intl-number>
</intl-locale>
```

## {{t.common.content.attributes}}

{{t.common.content.attribute_type_default_description}}
|---|---|---|---|
{{t.pages.documentation.components.intl_locale.content.locale_string_html_lang_or_en_active_locale_for_this_scope}}
{{t.pages.documentation.components.intl_locale.content.fallback_locale_string_en_locale_used_for_fallback_message_loading_and_message_lookup}}
{{t.pages.documentation.components.intl_locale.content.src_string_undefined_exact_json_endpoint_for_this_locale_scope}}
{{t.pages.documentation.components.intl_locale.content.src_dir_string_locales_directory_used_as_srcdir_locale_json_when_src_is_not_set}}
{{t.pages.documentation.components.intl_locale.content.update_document_boolean_attribute_absent_updates_document_documentelement_lang_and_dir_from_the}}
{{t.pages.documentation.components.intl_locale.content.fallback_boolean_attribute_absent_renders_children_immediately_while_locale_messages_load_withou}}

## {{t.pages.documentation.components.intl_locale.content.lifecycle_events}}

{{t.pages.documentation.components.intl_locale.content.events_bubble_and_are_composed_so_you_can_listen_from_a_parent_container_or_document_body}}

{{t.pages.documentation.components.intl_locale.content.event_when_it_fires_event_detail}}
|---|---|---|
{{t.pages.documentation.components.intl_locale.content.locale_load_message_loading_completes_intlruntimesnapshot}}
{{t.pages.documentation.components.intl_locale.content.locale_change_the_locale_is_ready_after_load_or_change_intlruntimesnapshot}}
{{t.pages.documentation.components.intl_locale.content.locale_error_message_loading_fails_intlruntimesnapshot_with_error}}

## {{t.common.content.locale}}

{{t.pages.documentation.components.intl_locale.content.locale_sets_the_active_locale_for_every_intl_component_inside_the_scope}}

```html
<intl-locale locale="en-US" src-dir="/locales">
    <intl-msg key="home.title">Home</intl-msg>
    <intl-number>1299.99</intl-number>
</intl-locale>

<intl-locale locale="fr-FR" src-dir="/locales">
    <intl-msg key="home.title">Home</intl-msg>
    <intl-number>1299.99</intl-number>
</intl-locale>
```

{{t.pages.documentation.components.intl_locale.content.when_locale_is_omitted_the_runtime_uses_document_documentelement_lang_when_available_then_falls}}

## {{t.pages.documentation.components.intl_locale.content.fallback_locale}}

{{t.pages.documentation.components.intl_locale.content.fallback_locale_is_used_when_messages_for_the_active_locale_are_missing_or_incomplete}}

```html
<intl-locale locale="pt-CV" fallback-locale="pt" src-dir="/locales">
    <intl-msg key="home.title">Home</intl-msg>
</intl-locale>
```

{{t.pages.documentation.components.intl_locale.content.with_this_setup_the_runtime_loads_locales_pt_cv_json_and_can_use_locales_pt_json_as_fallback_mes}}

## {{t.pages.documentation.components.intl_locale.content.src}}

{{t.pages.documentation.components.intl_locale.content.use_src_when_the_locale_scope_should_load_one_exact_json_endpoint}}

```html
<intl-locale locale="en-US" src="/api/messages/current-user">
    <intl-msg key="dashboard.title">Dashboard</intl-msg>
</intl-locale>
```

{{t.pages.documentation.components.intl_locale.content.src_can_also_point_to_a_page_specific_json_file}}

```html
<intl-locale locale="en" src="/locales/en.landing-page.json">
    <section>
        <h1><intl-msg key="hero.title">Internationalization in plain HTML.</intl-msg></h1>
        <p><intl-msg key="hero.summary">Format messages close to the UI.</intl-msg></p>
    </section>
</intl-locale>
```

{{t.pages.documentation.components.intl_locale.content.use_this_for_route_level_or_page_level_message_splitting_when_a_page_should_load_a_smaller_local}}

## {{t.pages.documentation.components.intl_locale.content.src_dir}}

{{t.pages.documentation.components.intl_locale.content.use_src_dir_when_every_locale_follows_the_same_directory_convention}}

```html
<intl-locale locale="pt-CV" fallback-locale="en" src-dir="/locales">
    <intl-msg key="home.title">Home</intl-msg>
</intl-locale>
```

{{t.pages.documentation.components.intl_locale.content.this_loads}}

```text
/locales/pt-CV.json
/locales/en.json
```

{{t.pages.documentation.components.intl_locale.content.use_src_dir_for_app_wide_bundles_use_src_for_exact_files_such_as_locales_en_landing_page_json}}

## {{t.pages.documentation.components.intl_locale.content.update_document}}

{{t.pages.documentation.components.intl_locale.content.update_document_keeps_the_page_level_lang_and_dir_attributes_synchronized_with_this_runtime}}

```html
<intl-locale locale="ar" src-dir="/locales" update-document>
    <intl-msg key="home.title">Home</intl-msg>
</intl-locale>
```

{{t.pages.documentation.components.intl_locale.content.after_loading_the_document_can_be_updated_like_this}}

```html
<html lang="ar" dir="rtl">
```

{{t.pages.documentation.components.intl_locale.content.use_this_on_the_root_page_locale_avoid_using_it_on_small_nested_scopes_unless_that_nested_scope}}

## {{t.pages.documentation.components.intl_locale.content.fallback}}

{{t.pages.documentation.components.intl_locale.content.by_default_children_render_after_the_runtime_is_ready_add_fallback_when_fallback_text_should_ren}}

```html
<intl-locale locale="en-US" src-dir="/locales" fallback>
    <h1><intl-msg key="home.title">Home</intl-msg></h1>
</intl-locale>
```

{{t.pages.documentation.components.intl_locale.content.without_fallback_the_slot_waits_for_the_runtime_with_fallback_child_components_can_render_their}}

## {{t.pages.documentation.components.intl_locale.content.locale_load}}

{{t.pages.documentation.components.intl_locale.content.listen_for_locale_load_when_you_need_to_know_that_a_load_attempt_completed}}

```html
<intl-locale id="app-locale" locale="fr-FR" src-dir="/locales"></intl-locale>

<script>
    document.getElementById('app-locale').addEventListener('locale-load', (event) => {
        console.log(event.detail.locale)
        console.log(event.detail.status)
    })
</script>
```

## {{t.pages.documentation.components.intl_locale.content.locale_change}}

{{t.pages.documentation.components.intl_locale.content.listen_for_locale_change_when_ui_should_react_to_a_ready_locale}}

```html
<intl-locale id="settings-locale" locale="en" src-dir="/locales" fallback>
    <select id="language">
        <option value="en">English</option>
        <option value="fr">French</option>
    </select>

    <intl-msg key="settings.title">Settings</intl-msg>
</intl-locale>

<script>
    const locale = document.getElementById('settings-locale')
    const language = document.getElementById('language')

    language.addEventListener('change', () => {
        locale.runtime.setLocale(language.value)
    })

    locale.addEventListener('locale-change', (event) => {
        language.value = event.detail.locale
    })
</script>
```

## {{t.pages.documentation.components.intl_locale.content.locale_error}}

{{t.pages.documentation.components.intl_locale.content.listen_for_locale_error_when_you_want_custom_error_handling_for_failed_message_loads}}

```html
<intl-locale id="app-locale" locale="fr-FR" src="/missing/fr.json">
    <intl-msg key="home.title">Home</intl-msg>
</intl-locale>

<script>
    document.getElementById('app-locale').addEventListener('locale-error', (event) => {
        console.error(event.detail.error)
    })
</script>
```

## {{t.pages.documentation.components.intl_locale.content.nested_locale_scopes}}

{{t.pages.documentation.components.intl_locale.content.a_nested_provider_uses_the_nearest_scope_it_can_inherit_parent_messages_and_fallback_configurati}}

```html
<intl-locale locale="en-US" src-dir="/locales">
    <intl-msg key="product.name">Product</intl-msg>

    <intl-locale locale="fr-FR" src-dir="/locales">
        <intl-msg key="product.name">Produit</intl-msg>
    </intl-locale>
</intl-locale>
```

{{t.pages.documentation.components.intl_locale.content.nested_scopes_are_useful_for_previews_embedded_widgets_language_switchers_and_side_by_side_local}}

## {{t.pages.documentation.components.intl_locale.content.page_scoped_locale_bundles}}

{{t.pages.documentation.components.intl_locale.content.page_scoped_bundles_let_each_page_load_only_the_messages_it_needs_instead_of_fetching_one_large}}

{{t.pages.documentation.components.intl_locale.content.for_example_keep_shared_and_page_messages_separate_in_source}}

```text
locales/common.json
locales/landing-page.json
```

{{t.pages.documentation.components.intl_locale.content.at_build_time_merge_those_files_for_each_locale_and_emit_a_page_bundle}}

```text
locales/en.landing-page.json
```

{{t.pages.documentation.components.intl_locale.content.then_wrap_the_landing_page_with_an_exact_source}}

```html
<intl-locale locale="en" src="/locales/en.landing-page.json">
    <h1><intl-msg key="hero.title">Internationalization in plain HTML.</intl-msg></h1>
</intl-locale>
```

## {{t.common.content.see_also}}

- {{t.pages.documentation.components.intl_locale.content.createintl_documentation_apis_create_intl}}
- {{t.pages.documentation.components.intl_locale.content.initintl_documentation_apis_init_intl}}
- {{t.pages.documentation.components.intl_locale.content.setlocale_documentation_apis_set_locale}}
- {{t.pages.documentation.components.intl_locale.content.loadlocale_documentation_apis_load_locale}}
