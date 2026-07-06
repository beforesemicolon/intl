import {
    FormatterOptions,
    ListFormatOptions,
    getCachedFormatter,
    getLocale,
    IntlWithListFormat,
    listTypeAliases,
} from './shared'

export const intlList = (
    value: string[] | string,
    options: ListFormatOptions & FormatterOptions = {}
) => {
    const items = Array.isArray(value)
        ? value
        : String(value || '')
              .trim()
              .split(/\s+/)
              .filter(Boolean)

    if (!items.length) {
        return ''
    }

    const { locale: explicitLocale, scope, ...intlOptions } = options
    const locale = getLocale({ locale: explicitLocale, scope })
    const normalizedOptions = {
        ...intlOptions,
        type: intlOptions.type
            ? (listTypeAliases[intlOptions.type] ?? intlOptions.type)
            : intlOptions.type,
    } as ListFormatOptions

    if (!IntlWithListFormat.ListFormat) {
        return items.join(', ')
    }

    const formatter = getCachedFormatter(
        'list',
        locale,
        normalizedOptions,
        scope,
        () => new IntlWithListFormat.ListFormat!(locale, normalizedOptions)
    )

    return formatter.format(items)
}
