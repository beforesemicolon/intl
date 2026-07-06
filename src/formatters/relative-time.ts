import {
    getCachedFormatter,
    getLocale,
    getRelativeUnitAndValue,
    RelativeTimeFormatOptions,
} from './shared'

export const intlRelTime = (
    value: number,
    options: RelativeTimeFormatOptions = {}
) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return ''
    }

    const {
        locale: explicitLocale,
        scope,
        unit = 'auto',
        precision = 0,
        numeric = 'auto',
        style = 'long',
    } = options
    const locale = getLocale({ locale: explicitLocale, scope })
    const formatter = getCachedFormatter(
        'relative-time',
        locale,
        { numeric, style },
        scope,
        () => new Intl.RelativeTimeFormat(locale, { numeric, style })
    )

    if (unit === 'auto') {
        const relative = getRelativeUnitAndValue(value - Date.now(), precision)
        return formatter.format(relative.value, relative.unit)
    }

    return formatter.format(
        Number(value.toFixed(precision)),
        unit as Intl.RelativeTimeFormatUnit
    )
}
