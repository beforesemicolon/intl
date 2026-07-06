import { FormatterOptions, getCachedFormatter, getLocale } from './shared'

export const intlNumber = (
    value: number,
    options: Intl.NumberFormatOptions & FormatterOptions = {}
) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return ''
    }

    const { locale: explicitLocale, scope, ...intlOptions } = options
    const locale = getLocale({ locale: explicitLocale, scope })
    try {
        const formatter = getCachedFormatter(
            'number',
            locale,
            intlOptions,
            scope,
            () => new Intl.NumberFormat(locale, intlOptions)
        )

        return formatter.format(value)
    } catch {
        return ''
    }
}
