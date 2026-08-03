---
name: '{{t.pages.documentation.apis.on_locale_messages_loaded.meta.onlocalemessagesloaded}}'
order: 7.26
title: '{{t.pages.documentation.apis.on_locale_messages_loaded.meta.onlocalemessagesloaded_intl_by_before_semicolon}}'
description: '{{t.pages.documentation.apis.on_locale_messages_loaded.meta.register_the_intl_locale_component_and_return_locale_lifecycle_behavior_for_the_browser_entrypoi}}'
layout: document
---

## {{t.pages.documentation.apis.on_locale_messages_loaded.content.onlocalemessagesloaded}}

{{t.pages.documentation.apis.on_locale_messages_loaded.content.onlocalemessagesloaded_is_exported_from_the_browser_bundle_and_used_when_you_load_dist_client_js}}

{{t.pages.documentation.apis.on_locale_messages_loaded.content.it_ties_locale_events_to_the_custom_element_layer_so_dom_workflows_can_react_to_runtime_lifecycl}}

## {{t.common.content.signature}}

```ts
function onLocaleMessagesLoaded(
  options?: IntlLocaleOptions
) // Browser entry helper
```

## {{t.pages.documentation.apis.on_locale_messages_loaded.content.event_model_and_lifecycle}}

{{t.pages.documentation.apis.on_locale_messages_loaded.content.the_helper_powers_the_same_locale_events_that_emits}}

- {{t.pages.documentation.apis.on_locale_messages_loaded.content.locale_load_when_a_locale_file_fetch_completes}}
- {{t.pages.documentation.apis.on_locale_messages_loaded.content.locale_change_when_active_locale_is_ready}}
- {{t.pages.documentation.apis.on_locale_messages_loaded.content.locale_error_when_fetch_parsing_fails}}

```html
<intl-locale locale="en-US" src-dir="/locales"></intl-locale>
<script>
  document.body.addEventListener('locale-load', (event) => {
    console.log('loaded', event.detail.locale)
  })
</script>
```

{{t.pages.documentation.apis.on_locale_messages_loaded.content.use_this_in_browser_mode_when_you_need_global_setup_and_want_to_keep_logic_in_html}}

{{t.pages.documentation.apis.on_locale_messages_loaded.content.for_explicit_js_subscriptions_and_snapshots_prefer_subscribeintl}}

{{t.pages.documentation.apis.on_locale_messages_loaded.content.native_references_customevent_https_developer_mozilla_org_en_us_docs_web_api_customevent_web_com}}
