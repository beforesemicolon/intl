---
name: '{{t.pages.documentation.installation.meta.installation}}'
order: 3
title: '{{t.pages.documentation.installation.meta.installation_intl_by_before_semicolon}}'
description: '{{t.pages.documentation.installation.meta.install_intl_for_browser_cdn_usage_or_module_usage_in_any_framework}}'
layout: document
---

## {{t.pages.documentation.installation.content.install}}

{{t.pages.documentation.installation.content.beforesemicolon_intl_is_designed_to_work_in_plain_html_any_framework_and_tests}}

{{t.pages.documentation.installation.content.you_have_two_options}}

- {{t.pages.documentation.installation.content.package_manager_module_usage}}
- {{t.pages.documentation.installation.content.cdn_browser_globals}}

{{t.pages.documentation.installation.content.both_approaches_expose_the_same_runtime_behavior}}

## {{t.pages.documentation.installation.content.via_package_manager}}

```bash
npm install @beforesemicolon/intl
```

{{t.pages.documentation.installation.content.then_initialize_the_runtime_from_your_app_entrypoint}}

```ts
import {
    initIntl,
    intlMsg,
    intlNumber,
} from '@beforesemicolon/intl'
```

{{t.pages.documentation.installation.content.use_any_exported_helpers_directly_from_your_bundler_or_esm_loader}}

## {{t.pages.documentation.installation.content.via_cdn_browser_build}}

```html
<script src="https://unpkg.com/@beforesemicolon/web-component/dist/client.js"></script>
<script src="https://unpkg.com/@beforesemicolon/intl/dist/client.js"></script>
```

{{t.pages.documentation.installation.content.when_loaded_this_way_helper_functions_are_available_on_window_bfs_intl}}

```html
<script>
  const { initIntl, intlMsg, intlNumber } = window.BFS.INTL
</script>
```

## {{t.pages.documentation.installation.content.minimal_runtime_setup}}

```html
<intl-locale locale="en-US" fallback-locale="en" src-dir="/locales">
    <intl-msg key="hello">Hello</intl-msg>
    <intl-number type="currency" currency="USD">1200</intl-number>
</intl-locale>
```

{{t.pages.documentation.installation.content.src_dir_loads_locales_locale_json_by_default_locales_en_us_json}}

## {{t.pages.documentation.installation.content.how_to_choose_a_setup}}

{{t.pages.documentation.installation.content.scenario_setup}}
|---|---|
{{t.pages.documentation.installation.content.static_pages_use_cdn_scripts_and_intl_tags}}
{{t.pages.documentation.installation.content.spa_or_app_framework_use_module_imports_and_initintl}}
{{t.pages.documentation.installation.content.tests_and_snapshots_use_initintl_with_messages}}

## {{t.pages.documentation.installation.content.common_installation_notes}}

- {{t.pages.documentation.installation.content.use_src_for_exact_scoped_files_such_as_locales_en_checkout_json}}
- {{t.pages.documentation.installation.content.use_src_dir_for_directory_based_locale_files_such_as_locales_locale_json}}
- {{t.pages.documentation.installation.content.locale_omits_runtime_falls_back_to_document_documentelement_lang}}
- {{t.pages.documentation.installation.content.fallback_locale_defaults_to_en}}
- {{t.pages.documentation.installation.content.add_update_document_only_on_the_app_root_locale_scope}}

## {{t.pages.documentation.installation.content.troubleshooting}}

{{t.pages.documentation.installation.content.if_formatting_is_not_updating}}

- {{t.pages.documentation.installation.content.verify_both_scripts_are_loaded_for_browser_global_mode}}
- {{t.pages.documentation.installation.content.verify_your_src_src_dir_urls_return_valid_json}}
- {{t.pages.documentation.installation.content.ensure_intl_locale_exists_in_the_dom_before_components_mount}}
