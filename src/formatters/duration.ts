import {
    DurationFormatOptions,
    DurationParts,
    getCachedFormatter,
    getLocale,
    normalizeDurationFields,
    fallbackDurationFormat,
} from './shared'
import { millisecondsToTimeParts } from '../utils/milliseconds-to-time-parts'

export const intlDuration = (
    value: number,
    options: DurationFormatOptions = {}
) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return ''
    }

    const {
        locale: explicitLocale,
        scope,
        fields = '*',
        style = 'long',
    } = options
    const locale = getLocale({ locale: explicitLocale, scope })
    const selectedFields = normalizeDurationFields(fields)
    const parts = millisecondsToTimeParts(
        value,
        selectedFields
    ) as DurationParts

    const formatter = getCachedFormatter(
        'duration',
        locale,
        { style },
        scope,
        () => {
            const DurationFormat = (
                Intl as typeof Intl & {
                    DurationFormat?: new (
                        locale: string,
                        options: { style?: string }
                    ) => { format(parts: DurationParts): string }
                }
            ).DurationFormat

            if (!DurationFormat) {
                return {
                    format: (fallbackParts: DurationParts) =>
                        fallbackDurationFormat(fallbackParts, style),
                }
            }

            return new DurationFormat(locale, { style })
        }
    )

    return formatter.format(parts)
}
