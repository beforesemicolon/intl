import { getCachedFormatter, getLocale, PluralFormatOptions } from './shared'

export const intlPlural = (
    value: number,
    options: PluralFormatOptions = {}
) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return ''
    }

    const {
        locale: explicitLocale,
        scope,
        type = 'cardinal',
        ...rules
    } = options
    const locale = getLocale({ locale: explicitLocale, scope })
    const formatter = getCachedFormatter(
        'plural',
        locale,
        { type },
        scope,
        () => new Intl.PluralRules(locale, { type })
    )
    const selected = formatter.select(value)
    const text = rules[selected] ?? rules.other ?? selected

    return type === 'ordinal' ? `${value}${text}` : text
}
