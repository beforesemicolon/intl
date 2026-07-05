import '@formatjs/intl-durationformat/polyfill'
import { createIntl, initIntl, resetIntl } from './runtime'
import {
    formatDateTime,
    formatDuration,
    formatList,
    formatMessage,
    formatName,
    formatNumber,
    formatPlural,
    formatRelativeTime,
} from './formatters'

describe('formatter functions', () => {
    beforeEach(() => {
        resetIntl()
        document.documentElement.lang = 'en-US'
    })

    afterEach(() => {
        resetIntl()
        jest.useRealTimers()
    })

    it('formats messages from the active runtime scope', () => {
        const scope = createIntl({
            locale: 'en-US',
            messages: {
                hello: 'Hello {name}',
                nested: {
                    title: 'Dashboard',
                },
            },
        })

        expect(formatMessage('hello', { name: 'Elson' }, { scope })).toBe(
            'Hello Elson'
        )
        expect(formatMessage('nested.title', {}, { scope })).toBe('Dashboard')
        expect(formatMessage('missing', {}, { scope })).toBe('missing')
    })

    it('formats numbers with explicit locale and runtime formatter cache', () => {
        const scope = createIntl({ locale: 'en-US' })

        expect(formatNumber(1200, { locale: 'pt-CV', scope })).toBe('1200')
        expect(scope.formatterCache.size).toBe(1)

        formatNumber(2400, { locale: 'pt-CV', scope })

        expect(scope.formatterCache.size).toBe(1)
    })

    it('formats date and time values', () => {
        expect(
            formatDateTime('2026-01-01T10:00:00Z', {
                locale: 'en-US',
                dateStyle: 'medium',
                timeZone: 'UTC',
            })
        ).toBe('Jan 1, 2026')
    })

    it('formats durations', () => {
        expect(
            formatDuration(3_600_000, {
                locale: 'en-US',
                fields: 'hours minutes',
                style: 'long',
            })
        ).toContain('1')
    })

    it('formats relative time values', () => {
        jest.useFakeTimers().setSystemTime(new Date('2026-01-01T00:00:00Z'))

        expect(
            formatRelativeTime(Date.now() + 60_000, {
                locale: 'en-US',
                unit: 'auto',
            })
        ).toBe('in 1 minute')
        expect(
            formatRelativeTime(-2, {
                locale: 'en-US',
                unit: 'day',
                numeric: 'always',
            })
        ).toBe('2 days ago')
    })

    it('formats lists and display names', () => {
        expect(
            formatList(['A', 'B', 'C'], {
                locale: 'en-US',
                type: 'conjunction',
            })
        ).toBe('A, B, and C')
        expect(formatName('PT', { locale: 'en-US', type: 'region' })).toBe(
            'Portugal'
        )
    })

    it('uses a fallback message handler for missing message keys', () => {
        const scope = createIntl({
            locale: 'en-US',
            messages: { title: 'Hello' },
        })

        expect(
            formatMessage('missing', {}, { scope, missing: (key) => `[${key}]` })
        ).toBe('[missing]')
    })

    it('covers array option cache keys', () => {
        expect(
            formatDateTime('2026-01-01T00:00:00Z', {
                locale: 'en-US',
                dateStyle: 'medium',
                timeZone: 'UTC',
                // @ts-expect-error testing cache key normalization
                custom: ['A', 'B', 'C'],
            })
        ).toBe('Jan 1, 2026')
    })

    it('formats a wide range of relative-time units with auto calculation', () => {
        jest.useFakeTimers().setSystemTime(new Date('2026-01-01T00:00:00Z'))

        const now = Date.now()
        const oneMinute = 60_000
        const oneHour = 60 * oneMinute
        const oneDay = 24 * oneHour
        const oneWeek = 7 * oneDay
        const oneMonth = 30 * oneDay

        expect(formatRelativeTime(now + 1_000, { locale: 'en-US' })).toBe(
            'in 1 second'
        )
        expect(formatRelativeTime(now + (2 * oneMinute + 1), { locale: 'en-US' })).toBe(
            'in 2 minutes'
        )
        expect(formatRelativeTime(now + (2 * oneHour + 1), { locale: 'en-US' })).toBe(
            'in 2 hours'
        )
        expect(
            formatRelativeTime(now + (5 * oneDay + 1), { locale: 'en-US' })
        ).toBe('in 5 days')
        expect(
            formatRelativeTime(now + (15 * oneDay + 1), { locale: 'en-US' })
        ).toBe('in 2 weeks')
        expect(
            formatRelativeTime(now + (100 * oneDay + 1), { locale: 'en-US' })
        ).toBe('in 3 months')
        expect(
            formatRelativeTime(now + (400 * oneDay + 1), { locale: 'en-US' })
        ).toBe('next year')

        jest.useRealTimers()
    })

    it('returns empty output for invalid message keys and relative-time values', () => {
        expect(formatMessage('')).toBe('')
        expect(formatRelativeTime(NaN, { locale: 'en-US' })).toBe('')
        expect(formatPlural(NaN as unknown as number, { locale: 'en-US' })).toBe('')
    })

    it('formats date values from numeric and string-like inputs', () => {
        const timestamp = Date.UTC(2026, 0, 1, 10, 0, 0).toString()

        expect(
            formatDateTime(timestamp, {
                locale: 'en-US',
                dateStyle: 'short',
                timeZone: 'UTC',
            })
        ).toBe('1/1/26')
    })

    it('builds cached formatters with stable stringified option keys', () => {
        expect(
            formatNumber(1200, {
                locale: 'en-US',
                style: undefined as unknown as Intl.NumberFormatOptions['style'],
            })
        ).toBe('1,200')
    })

    it('returns empty string for invalid number options', () => {
        expect(formatNumber(100, { locale: 'en-US', style: 'currency' })).toBe('')
        expect(formatNumber(NaN, { locale: 'en-US' })).toBe('')
    })

    it('returns empty string for invalid date values', () => {
        expect(formatDateTime('bad-date', { locale: 'en-US' })).toBe('')
    })

    it('falls back to local duration formatting when Intl.DurationFormat is not present', () => {
        const originalDurationFormat = (Intl as typeof Intl & {
            DurationFormat?: new (
                locale: string,
                options: { style?: string }
            ) => { format(parts: Record<string, number>): string }
        }).DurationFormat

        try {
            delete (Intl as { DurationFormat?: typeof originalDurationFormat }).DurationFormat

            expect(
                formatDuration(1_000, { locale: 'en-US', fields: 'seconds', style: 'narrow' })
            ).toMatch(/1s/)
        } finally {
            ;(
                Intl as typeof Intl & {
                    DurationFormat?: typeof originalDurationFormat
                }
            ).DurationFormat = originalDurationFormat
        }
    })

    it('falls back to local duration formatting with default long style', () => {
        const originalDurationFormat = (Intl as typeof Intl & {
            DurationFormat?: new (
                locale: string,
                options: { style?: string }
            ) => { format(parts: Record<string, number>): string }
        }).DurationFormat

        try {
            delete (Intl as { DurationFormat?: typeof originalDurationFormat }).DurationFormat

            expect(
                formatDuration(1_000, { locale: 'en-US', fields: 'seconds' })
            ).toBe('1 second')
        } finally {
            ;(
                Intl as typeof Intl & {
                    DurationFormat?: typeof originalDurationFormat
                }
            ).DurationFormat = originalDurationFormat
        }
    })

    it('returns empty output for invalid duration and list inputs', () => {
        expect(formatDuration(NaN as unknown as number, { locale: 'en-US' })).toBe('')
        expect(formatList([] as string[], { locale: 'en-US' })).toBe('')
    })

    it('falls back when Intl.ListFormat is not available', () => {
        const originalListFormat = (Intl as typeof Intl & {
            ListFormat?: new (locale: string) => { format(items: string[]): string }
        }).ListFormat

        try {
            delete (Intl as { ListFormat?: typeof originalListFormat }).ListFormat

            expect(formatList(['A', 'B', 'C'], { locale: 'en-US' })).toBe(
                'A, B, C'
            )
        } finally {
            ;(
                Intl as typeof Intl & {
                    ListFormat?: typeof originalListFormat
                }
            ).ListFormat = originalListFormat
        }
    })

    it('formats plural values', () => {
        expect(
            formatPlural(1, {
                locale: 'en-US',
                one: 'item',
                other: 'items',
            })
        ).toBe('item')
        expect(
            formatPlural(2, {
                locale: 'en-US',
                one: 'item',
                other: 'items',
            })
        ).toBe('items')
        expect(formatPlural(3, { locale: 'en-US', type: 'ordinal' })).toBe(
            '3few'
        )
    })

    it('reuses formatter cache entries per runtime scope', () => {
        const scope = createIntl({ locale: 'en-US' })

        formatNumber(1, { scope, style: 'decimal' })
        formatDateTime('2026-01-01T00:00:00Z', {
            scope,
            dateStyle: 'short',
            timeZone: 'UTC',
        })
        formatDuration(1_000, { scope, fields: 'seconds', style: 'long' })
        formatRelativeTime(-1, {
            scope,
            unit: 'day',
            numeric: 'always',
        })
        formatList(['A', 'B'], { scope, type: 'conjunction' })
        formatName('US', { scope, type: 'region' })
        formatPlural(1, { scope, one: 'item', other: 'items' })

        expect(scope.formatterCache.size).toBe(7)

        formatNumber(2, { scope, style: 'decimal' })
        formatDateTime('2026-01-02T00:00:00Z', {
            scope,
            dateStyle: 'short',
            timeZone: 'UTC',
        })
        formatDuration(2_000, { scope, fields: 'seconds', style: 'long' })
        formatRelativeTime(-2, {
            scope,
            unit: 'day',
            numeric: 'always',
        })
        formatList(['C', 'D'], { scope, type: 'conjunction' })
        formatName('PT', { scope, type: 'region' })
        formatPlural(2, { scope, one: 'item', other: 'items' })

        expect(scope.formatterCache.size).toBe(7)

        const otherScope = createIntl({ locale: 'en-US' })

        formatNumber(1, { scope: otherScope, style: 'decimal' })

        expect(otherScope.formatterCache.size).toBe(1)
    })

    it('returns empty output for invalid formatter names', () => {
        expect(
            formatName('', { locale: 'en-US', type: 'region' as const })
        ).toBe('')
        expect(
            formatName('   ', { locale: 'en-US', type: 'region' as const })
        ).toBe('')
    })

    it('uses default formatter options when options are omitted', () => {
        initIntl({
            locale: 'en-US',
            messages: { greeting: 'Hello {name}' },
        })

        expect(formatMessage('greeting')).toBe('Hello ')
        expect(formatNumber(1200)).toBe('1,200')
        expect(formatDateTime('2026-01-01T00:00:00Z')).not.toBe('')
        expect(formatDuration(1_000)).toContain('1')
        expect(formatRelativeTime(-1)).not.toBe('')
        expect(formatList('A B')).toBe('A and B')
        expect(formatName('US')).toBe('United States')
        expect(formatPlural(1)).toBe('one')
        expect(formatNumber(1, undefined)).toBe('1')
        expect(formatDateTime('2026-01-01T00:00:00Z', undefined)).not.toBe('')
        expect(formatDuration(0, undefined)).toBe('')
        expect(formatRelativeTime(0, undefined)).not.toBe('')
        expect(formatList('A B', undefined)).toBe('A and B')
        expect(formatName('US', undefined)).toBe('United States')
        expect(formatPlural(0, undefined)).toBe('other')
    })
})
