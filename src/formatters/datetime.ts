import { FormatterOptions, getCachedFormatter, getLocale } from './shared'

export const intlDateTime = (
    value: string | number | Date,
    options: Intl.DateTimeFormatOptions & FormatterOptions = {}
) => {
    const date =
        value instanceof Date
            ? value
            : typeof value === 'string' && /^\d+$/.test(value)
              ? new Date(Number(value))
              : new Date(value)

    if (Number.isNaN(date.getTime())) {
        return ''
    }

    const { locale: explicitLocale, scope, ...intlOptions } = options
    const locale = getLocale({ locale: explicitLocale, scope })
    const formatter = getCachedFormatter(
        'datetime',
        locale,
        intlOptions,
        scope,
        () => new Intl.DateTimeFormat(locale, intlOptions)
    )

    return formatter.format(date)
}
