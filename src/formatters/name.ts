import { FormatterOptions, getCachedFormatter, getLocale } from './shared'

export const intlName = (
    value: string,
    options: Intl.DisplayNamesOptions & FormatterOptions = {
        type: 'region',
    }
) => {
    if (typeof value !== 'string' || !value.trim()) {
        return ''
    }

    const { locale: explicitLocale, scope, ...intlOptions } = options
    const locale = getLocale({ locale: explicitLocale, scope })
    const formatter = getCachedFormatter(
        'name',
        locale,
        intlOptions,
        scope,
        () => new Intl.DisplayNames(locale, intlOptions)
    )

    return formatter.of(value) ?? ''
}
