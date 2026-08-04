---
name: '{{t.pages.documentation.apis.get_locale_direction.meta.getlocaledirection}}'
order: 7.09
title: '{{t.pages.documentation.apis.get_locale_direction.meta.getlocaledirection_intl_by_before_semicolon}}'
description: '{{t.pages.documentation.apis.get_locale_direction.meta.resolve_text_direction_for_a_locale_using_intl_locale}}'
layout: document
---

## {{t.pages.documentation.apis.get_locale_direction.content.getlocaledirection}}

{{t.pages.documentation.apis.get_locale_direction.content.getlocaledirection_locale_returns_text_direction_for_a_locale_tag}}

- {{t.pages.documentation.apis.get_locale_direction.content.rtl_for_right_to_left_locales}}
- {{t.pages.documentation.apis.get_locale_direction.content.ltr_for_left_to_right_locales}}

{{t.pages.documentation.apis.get_locale_direction.content.this_function_uses_intl_locale_https_developer_mozilla_org_en_us_docs_web_javascript_reference_g}}

```ts
import { getLocaleDirection } from '@beforesemicolon/intl'

getLocaleDirection('en-US') // "ltr"
getLocaleDirection('ar') // "rtl"
getLocaleDirection('fa') // "rtl"
getLocaleDirection('zh-Hant') // "ltr"
```

## {{t.common.content.signature}}

```ts
function getLocaleDirection(locale: string): 'ltr' | 'rtl'
```

## {{t.pages.documentation.apis.get_locale_direction.content.practical_notes}}

- {{t.pages.documentation.apis.get_locale_direction.content.invalid_locale_values_return_ltr_instead_of_throwing}}
- {{t.pages.documentation.apis.get_locale_direction.content.this_is_useful_for_pre_setting_dir_before_runtime_loading_completes}}
- {{t.pages.documentation.apis.get_locale_direction.content.call_this_whenever_you_need_a_deterministic_fallback_while_a_runtime_settles}}

```ts
document.documentElement.dir = getLocaleDirection(selectedLocale)
```
