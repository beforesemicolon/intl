import {
    ONE_DAY_MS,
    ONE_HOUR_MS,
    ONE_MINUTE_MS,
    ONE_SECOND_MS,
} from './utils/time-in-miliseconds'
import { millisecondsToTimeParts } from './utils/milliseconds-to-time-parts'
import { getIntl, IntlRuntime } from './runtime'

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

type DurationParts = Record<string, number>
type ListFormatType = 'conjunction' | 'disjunction' | 'unit'
type ListFormatStyle = 'long' | 'short' | 'narrow'

interface ListFormatOptions {
    localeMatcher?: 'lookup' | 'best fit'
    type?: ListFormatType | 'and' | 'or' | 'none'
    style?: ListFormatStyle
}

type ListFormatter = {
    format(items: string[]): string
}

const IntlWithListFormat = Intl as typeof Intl & {
    ListFormat?: new (locale: string, options?: ListFormatOptions) => ListFormatter
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

const listTypeAliases: Record<string, ListFormatType> = {
    and: 'conjunction',
    or: 'disjunction',
    none: 'unit',
}

const getRuntime = (scope?: IntlRuntime) => getIntl(scope)

const getLocale = ({ locale, scope }: FormatterOptions = {}) => {
    return locale || getRuntime(scope).locale
}

const stableStringify = (value: unknown): string => {
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

const getCachedFormatter = <T>(
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

const interpolateMessage = (message: string, values: MessageValues = {}) => {
    return message.replace(/\{\s*([a-zA-Z0-9_.-]+)\s*\}/g, (_, key) => {
        const value = values[key]
        return value === undefined || value === null ? '' : String(value)
    })
}

const normalizeDurationFields = (fields: DurationFormatOptions['fields']) => {
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

const getRelativeUnitAndValue = (
    milliseconds: number,
    precision: number
): { value: number; unit: Intl.RelativeTimeFormatUnit; interval: number | null } => {
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

const fallbackDurationFormat = (parts: DurationParts, style = 'long') => {
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

export const formatMessage = (
    key: string,
    values: MessageValues = {},
    options: MessageFormatOptions = {}
) => {
    if (!key) {
        return ''
    }

    const runtime = getRuntime(options.scope)
    const message = runtime.getMessage(key)

    if (message === undefined || message === null) {
        if (typeof options.missing === 'function') {
            return options.missing(key)
        }

        return options.missing ?? key
    }

    return interpolateMessage(String(message), values)
}

export const formatNumber = (
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

export const formatDateTime = (
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

export const formatDuration = (
    value: number,
    options: DurationFormatOptions = {}
) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return ''
    }

    const { locale: explicitLocale, scope, fields = '*', style = 'long' } = options
    const locale = getLocale({ locale: explicitLocale, scope })
    const selectedFields = normalizeDurationFields(fields)
    const parts = millisecondsToTimeParts(value, selectedFields) as DurationParts
    const DurationFormat = (Intl as typeof Intl & {
        DurationFormat?: new (
            locale: string,
            options: { style?: string }
        ) => { format(parts: DurationParts): string }
    }).DurationFormat

    if (!DurationFormat) {
        return fallbackDurationFormat(parts, style)
    }

    const formatter = getCachedFormatter(
        'duration',
        locale,
        { style },
        scope,
        () => new DurationFormat(locale, { style })
    )

    return formatter.format(parts)
}

export const formatRelativeTime = (
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

export const formatList = (
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
            ? listTypeAliases[intlOptions.type] ?? intlOptions.type
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

export const formatName = (
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

export const formatPlural = (
    value: number,
    options: PluralFormatOptions = {}
) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return ''
    }

    const { locale: explicitLocale, scope, type = 'cardinal', ...rules } = options
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
