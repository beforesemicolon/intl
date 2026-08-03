---
name: '{{t.pages.documentation.apis.reset_intl.meta.resetintl}}'
order: 7.08
title: '{{t.pages.documentation.apis.reset_intl.meta.resetintl_intl_by_before_semicolon}}'
description: '{{t.pages.documentation.apis.reset_intl.meta.reset_the_package_default_intl_runtime_mainly_for_tests_and_controlled_runtime_teardown}}'
layout: document
---

## {{t.pages.documentation.apis.reset_intl.content.resetintl}}

{{t.pages.documentation.apis.reset_intl.content.resetintl_destroys_and_removes_the_package_default_runtime}}

{{t.pages.documentation.apis.reset_intl.content.this_is_the_cleanest_reset_strategy_for_tests_demos_and_repeated_bootstraps_in_the_same_process}}

```ts
import { initIntl, resetIntl, getIntl } from '@beforesemicolon/intl'

initIntl({ locale: 'en-US', messages: { hello: 'Hello' } })
resetIntl()
getIntl().locale // resolves to the package default initial locale logic
```

## {{t.common.content.signature}}

```ts
function resetIntl(): void
```

## {{t.pages.documentation.apis.reset_intl.content.what_gets_cleared}}

- {{t.pages.documentation.apis.reset_intl.content.default_runtime_object}}
- {{t.pages.documentation.apis.reset_intl.content.listeners_and_subscriptions_tied_to_the_default_runtime}}
- {{t.pages.documentation.apis.reset_intl.content.loaded_messages_and_in_flight_locale_loads_for_the_default_runtime}}
- {{t.pages.documentation.apis.reset_intl.content.runtime_caches_formattercache_and_messagecache}}

{{t.pages.documentation.apis.reset_intl.content.it_does_not_remove_any_custom_scoped_runtimes_you_created_explicitly}}

## {{t.pages.documentation.apis.reset_intl.content.resetintl_vs_destroyintl}}

- {{t.pages.documentation.apis.reset_intl.content.destroyintl_scope_targets_a_specific_runtime}}
- {{t.pages.documentation.apis.reset_intl.content.resetintl_always_targets_and_removes_only_the_default_runtime}}

```ts
import { createIntl, destroyIntl, resetIntl } from '@beforesemicolon/intl'

const widgetRuntime = createIntl({ locale: 'en-US' })
destroyIntl(widgetRuntime) // scoped teardown
resetIntl() // default teardown
```

## {{t.pages.documentation.apis.reset_intl.content.common_test_setup}}

```ts
beforeEach(() => {
  resetIntl()
})

afterEach(() => {
  resetIntl()
})
```
