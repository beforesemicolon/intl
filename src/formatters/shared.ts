import {
    ONE_DAY_MS,
    ONE_HOUR_MS,
    ONE_MINUTE_MS,
    ONE_SECOND_MS,
} from '../utils/time-in-miliseconds'
import { IntlRuntime, getIntl } from '../runtime'

export interface FormatterOptions {
    locale?: string
    scope?: IntlRuntime
}

export interface MessageFormatOptions extends FormatterOptions {
    missing?: string | ((key: string) => string)
}

export type MessageValues = Record<string, unknown>

export interface DurationFormatOptions extends FormatterOptions {
    fields?: '*' | string | string[]
    style?: 'long' | 'short' | 'narrow' | 'digital'
}

export interface RelativeTimeFormatOptions extends FormatterOptions {
    unit?:
        | 'auto'
        | Intl.RelativeTimeFormatUnit
        | Intl.RelativeTimeFormatUnitSingular
    precision?: number
    numeric?: Intl.RelativeTimeFormatNumeric
    style?: Intl.RelativeTimeFormatStyle
}

export interface PluralFormatOptions extends FormatterOptions {
    type?: Intl.PluralRuleType
    zero?: string
    one?: string
    two?: string
    few?: string
    many?: string
    other?: string
}

export type DurationParts = Record<string, number>
export type ListFormatType = 'conjunction' | 'disjunction' | 'unit'
export type ListFormatStyle = 'long' | 'short' | 'narrow'

export interface ListFormatOptions {
    localeMatcher?: 'lookup' | 'best fit'
    type?: ListFormatType | 'and' | 'or' | 'none'
    style?: ListFormatStyle
}

type ListFormatter = {
    format(items: string[]): string
}

export const IntlWithListFormat = Intl as typeof Intl & {
    ListFormat?: new (
        locale: string,
        options?: ListFormatOptions
    ) => ListFormatter
}

const durationFields = new Set([
    'years',
    'months',
    'weeks',
    'days',
    'hours',
    'minutes',
    'seconds',
    'milliseconds',
    'microseconds',
    'nanoseconds',
])

export const listTypeAliases: Record<string, ListFormatType> = {
    and: 'conjunction',
    or: 'disjunction',
    none: 'unit',
}

export const getRuntime = (scope?: IntlRuntime) => getIntl(scope)

export const getLocale = ({ locale, scope }: FormatterOptions = {}) => {
    return locale || getRuntime(scope).locale
}

export const stableStringify = (value: unknown): string => {
    if (!value || typeof value !== 'object') {
        return JSON.stringify(value)
    }

    if (Array.isArray(value)) {
        return `[${value.map(stableStringify).join(',')}]`
    }

    return `{${Object.entries(value as Record<string, unknown>)
        .filter(([, item]) => item !== undefined)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, item]) => `${JSON.stringify(key)}:${stableStringify(item)}`)
        .join(',')}}`
}

export const getCachedFormatter = <T>(
    type: string,
    locale: string,
    options: object,
    scope: IntlRuntime | undefined,
    create: () => T
) => {
    const runtime = getRuntime(scope)
    const key = `${type}:${locale}:${stableStringify(options)}`
    const cached = runtime.formatterCache.get(key)

    if (cached) {
        return cached as T
    }

    const formatter = create()
    runtime.formatterCache.set(key, formatter)
    return formatter
}

export const interpolateMessage = (
    message: string,
    values: MessageValues = {}
) => {
    return message.replace(/\{\s*([a-zA-Z0-9_.-]+)\s*\}/g, (_, key) => {
        const value = values[key]
        return value === undefined || value === null ? '' : String(value)
    })
}

export const normalizeDurationFields = (
    fields: DurationFormatOptions['fields']
) => {
    if (!fields || fields === '*') {
        return durationFields
    }

    const names = Array.isArray(fields) ? fields : fields.trim().split(/\s+/)

    return new Set(
        names
            .map((field) => field.trim())
            .filter((field) => durationFields.has(field))
    )
}

export const getRelativeUnitAndValue = (
    milliseconds: number,
    precision: number
): {
    value: number
    unit: Intl.RelativeTimeFormatUnit
    interval: number | null
} => {
    const sign = milliseconds < 0 ? -1 : 1
    const abs = Math.abs(milliseconds)
    const days = Number((abs / ONE_DAY_MS).toFixed(precision))

    if (days < 1) {
        if (abs < ONE_MINUTE_MS) {
            return {
                value: Number((abs / ONE_SECOND_MS).toFixed(precision)) * sign,
                unit: 'second',
                interval: ONE_SECOND_MS,
            }
        }

        const hours = abs / ONE_HOUR_MS

        if (hours < 1) {
            return {
                value: Number((abs / ONE_MINUTE_MS).toFixed(precision)) * sign,
                unit: 'minute',
                interval: ONE_MINUTE_MS,
            }
        }

        return {
            value: Number(hours.toFixed(precision)) * sign,
            unit: 'hour',
            interval: ONE_HOUR_MS,
        }
    }

    if (days < 7) {
        return { value: days * sign, unit: 'day', interval: null }
    }

    if (days < 30) {
        return {
            value: Number((days / 7).toFixed(precision)) * sign,
            unit: 'week',
            interval: null,
        }
    }

    if (days < 365) {
        return {
            value: Number((days / 30).toFixed(precision)) * sign,
            unit: 'month',
            interval: null,
        }
    }

    return {
        value: Number((days / 365).toFixed(precision)) * sign,
        unit: 'year',
        interval: null,
    }
}

export const fallbackDurationFormat = (
    parts: DurationParts,
    style = 'long'
) => {
    return Object.entries(parts)
        .filter(([, value]) => value)
        .map(([unit, value]) => {
            const singular = unit.replace(/s$/, '')
            const label = value === 1 ? singular : unit

            if (style === 'narrow') {
                return `${value}${singular[0]}`
            }

            return `${value} ${label}`
        })
        .join(', ')
}
