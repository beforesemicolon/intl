import '@formatjs/intl-durationformat/polyfill'
import { createIntl, initIntl, resetIntl } from './runtime'
import {
    intlDateTime,
    intlDuration,
    intlList,
    intlMsg,
    intlName,
    intlNumber,
    intlPlural,
    intlRelTime,
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

        expect(intlMsg('hello', { name: 'Elson' }, { scope })).toBe(
            'Hello Elson'
        )
        expect(intlMsg('nested.title', {}, { scope })).toBe('Dashboard')
        expect(intlMsg('missing', {}, { scope })).toBe('missing')
    })

    it('formats numbers with explicit locale and runtime formatter cache', () => {
        const scope = createIntl({ locale: 'en-US' })

        expect(intlNumber(1200, { locale: 'pt-CV', scope })).toBe('1200')
        expect(scope.formatterCache.size).toBe(1)

        intlNumber(2400, { locale: 'pt-CV', scope })

        expect(scope.formatterCache.size).toBe(1)
    })

    it('formats date and time values', () => {
        expect(
            intlDateTime('2026-01-01T10:00:00Z', {
                locale: 'en-US',
                dateStyle: 'medium',
                timeZone: 'UTC',
            })
        ).toBe('Jan 1, 2026')
    })

    it('formats durations', () => {
        expect(
            intlDuration(3_600_000, {
                locale: 'en-US',
                fields: 'hours minutes',
                style: 'long',
            })
        ).toContain('1')
    })

    it('formats relative time values', () => {
        jest.useFakeTimers().setSystemTime(new Date('2026-01-01T00:00:00Z'))

        expect(
            intlRelTime(Date.now() + 60_000, {
                locale: 'en-US',
                unit: 'auto',
            })
        ).toBe('in 1 minute')
        expect(
            intlRelTime(-2, {
                locale: 'en-US',
                unit: 'day',
                numeric: 'always',
            })
        ).toBe('2 days ago')
    })

    it('formats lists and display names', () => {
        expect(
            intlList(['A', 'B', 'C'], {
                locale: 'en-US',
                type: 'conjunction',
            })
        ).toBe('A, B, and C')
        expect(intlName('PT', { locale: 'en-US', type: 'region' })).toBe(
            'Portugal'
        )
    })

    it('uses a fallback message handler for missing message keys', () => {
        const scope = createIntl({
            locale: 'en-US',
            messages: { title: 'Hello' },
        })

        expect(
            intlMsg('missing', {}, { scope, missing: (key) => `[${key}]` })
        ).toBe('[missing]')
    })

    it('covers array option cache keys', () => {
        expect(
            intlDateTime('2026-01-01T00:00:00Z', {
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

        expect(intlRelTime(now + 1_000, { locale: 'en-US' })).toBe(
            'in 1 second'
        )
        expect(intlRelTime(now + (2 * oneMinute + 1), { locale: 'en-US' })).toBe(
            'in 2 minutes'
        )
        expect(intlRelTime(now + (2 * oneHour + 1), { locale: 'en-US' })).toBe(
            'in 2 hours'
        )
        expect(
            intlRelTime(now + (5 * oneDay + 1), { locale: 'en-US' })
        ).toBe('in 5 days')
        expect(
            intlRelTime(now + (15 * oneDay + 1), { locale: 'en-US' })
        ).toBe('in 2 weeks')
        expect(
            intlRelTime(now + (100 * oneDay + 1), { locale: 'en-US' })
        ).toBe('in 3 months')
        expect(
            intlRelTime(now + (400 * oneDay + 1), { locale: 'en-US' })
        ).toBe('next year')

        jest.useRealTimers()
    })

    it('returns empty output for invalid message keys and relative-time values', () => {
        expect(intlMsg('')).toBe('')
        expect(intlRelTime(NaN, { locale: 'en-US' })).toBe('')
        expect(intlPlural(NaN as unknown as number, { locale: 'en-US' })).toBe('')
    })

    it('formats date values from numeric and string-like inputs', () => {
        const timestamp = Date.UTC(2026, 0, 1, 10, 0, 0).toString()

        expect(
            intlDateTime(timestamp, {
                locale: 'en-US',
                dateStyle: 'short',
                timeZone: 'UTC',
            })
        ).toBe('1/1/26')
    })

    it('builds cached formatters with stable stringified option keys', () => {
        expect(
            intlNumber(1200, {
                locale: 'en-US',
                style: undefined as unknown as Intl.NumberFormatOptions['style'],
            })
        ).toBe('1,200')
    })

    it('returns empty string for invalid number options', () => {
        expect(intlNumber(100, { locale: 'en-US', style: 'currency' })).toBe('')
        expect(intlNumber(NaN, { locale: 'en-US' })).toBe('')
    })

    it('returns empty string for invalid date values', () => {
        expect(intlDateTime('bad-date', { locale: 'en-US' })).toBe('')
    })

    it('falls back to local duration formatting when Intl.DurationFormat is not present', () => {
        const originalDurationFormat = (Intl as typeof Intl & {
            DurationFormat?: new (
                locale: string,
                options: { style?: string }
            ) => { format(parts: Record<string, number>): string }
        }).DurationFormat

        withIntlProperty('DurationFormat', undefined, () => {
            expect(
                intlDuration(1_000, {
                    locale: 'en-US',
                    fields: 'seconds',
                    style: 'narrow',
                })
            ).toMatch(/1s/)
        })
    })

    it('falls back to local duration formatting with default long style', () => {
        const originalDurationFormat = (Intl as typeof Intl & {
            DurationFormat?: new (
                locale: string,
                options: { style?: string }
            ) => { format(parts: Record<string, number>): string }
        }).DurationFormat

        withIntlProperty('DurationFormat', undefined, () => {
            expect(
                intlDuration(1_000, { locale: 'en-US', fields: 'seconds' })
            ).toBe('1 second')
        })
    })

    it('returns empty output for invalid duration and list inputs', () => {
        expect(intlDuration(NaN as unknown as number, { locale: 'en-US' })).toBe('')
        expect(intlList([] as string[], { locale: 'en-US' })).toBe('')
    })

    it('falls back when Intl.ListFormat is not available', () => {
        const originalListFormat = (Intl as typeof Intl & {
            ListFormat?: new (locale: string) => { format(items: string[]): string }
        }).ListFormat

        withIntlProperty('ListFormat', undefined, () => {
            expect(intlList(['A', 'B', 'C'], { locale: 'en-US' })).toBe(
                'A, B, C'
            )
        })
    })

    it('formats plural values', () => {
        expect(
            intlPlural(1, {
                locale: 'en-US',
                one: 'item',
                other: 'items',
            })
        ).toBe('item')
        expect(
            intlPlural(2, {
                locale: 'en-US',
                one: 'item',
                other: 'items',
            })
        ).toBe('items')
        expect(intlPlural(3, { locale: 'en-US', type: 'ordinal' })).toBe(
            '3few'
        )
    })

    it('reuses formatter cache entries per runtime scope', () => {
        const scope = createIntl({ locale: 'en-US' })

        intlNumber(1, { scope, style: 'decimal' })
        intlDateTime('2026-01-01T00:00:00Z', {
            scope,
            dateStyle: 'short',
            timeZone: 'UTC',
        })
        intlDuration(1_000, { scope, fields: 'seconds', style: 'long' })
        intlRelTime(-1, {
            scope,
            unit: 'day',
            numeric: 'always',
        })
        intlList(['A', 'B'], { scope, type: 'conjunction' })
        intlName('US', { scope, type: 'region' })
        intlPlural(1, { scope, one: 'item', other: 'items' })

        expect(scope.formatterCache.size).toBe(7)

        intlNumber(2, { scope, style: 'decimal' })
        intlDateTime('2026-01-02T00:00:00Z', {
            scope,
            dateStyle: 'short',
            timeZone: 'UTC',
        })
        intlDuration(2_000, { scope, fields: 'seconds', style: 'long' })
        intlRelTime(-2, {
            scope,
            unit: 'day',
            numeric: 'always',
        })
        intlList(['C', 'D'], { scope, type: 'conjunction' })
        intlName('PT', { scope, type: 'region' })
        intlPlural(2, { scope, one: 'item', other: 'items' })

        expect(scope.formatterCache.size).toBe(7)

        const otherScope = createIntl({ locale: 'en-US' })

        intlNumber(1, { scope: otherScope, style: 'decimal' })

        expect(otherScope.formatterCache.size).toBe(1)
    })

    it('returns empty output for invalid formatter names', () => {
        expect(
            intlName('', { locale: 'en-US', type: 'region' as const })
        ).toBe('')
        expect(
            intlName('   ', { locale: 'en-US', type: 'region' as const })
        ).toBe('')
    })

    it('uses default formatter options when options are omitted', () => {
        initIntl({
            locale: 'en-US',
            messages: { greeting: 'Hello {name}' },
        })

        expect(intlMsg('greeting')).toBe('Hello ')
        expect(intlNumber(1200)).toBe('1,200')
        expect(intlDateTime('2026-01-01T00:00:00Z')).not.toBe('')
        expect(intlDuration(1_000)).toContain('1')
        expect(intlRelTime(-1)).not.toBe('')
        expect(intlList('A B')).toBe('A and B')
        expect(intlName('US')).toBe('United States')
        expect(intlPlural(1)).toBe('one')
        expect(intlNumber(1, undefined)).toBe('1')
        expect(intlDateTime('2026-01-01T00:00:00Z', undefined)).not.toBe('')
        expect(intlDuration(0, undefined)).toBe('')
        expect(intlRelTime(0, undefined)).not.toBe('')
        expect(intlList('A B', undefined)).toBe('A and B')
        expect(intlName('US', undefined)).toBe('United States')
        expect(intlPlural(0, undefined)).toBe('other')
    })
})
    const withIntlProperty = <T extends 'DurationFormat' | 'ListFormat'>(
        property: T,
        temporaryValue: unknown,
        callback: () => void
    ) => {
        const descriptor = Object.getOwnPropertyDescriptor(
            Intl,
            property
        ) as PropertyDescriptor
        const originalValue = (Intl as typeof Intl & Record<T, unknown>)[
            property
        ]

        const restore = () => {
            if (!descriptor || descriptor.writable) {
                ;(Intl as typeof Intl & Record<T, unknown>)[
                    property
                ] = originalValue as never
                return
            }

            if (!descriptor || descriptor.configurable) {
                Object.defineProperty(Intl, property, {
                    ...descriptor,
                    value: originalValue,
                    writable: true,
                    configurable: true,
                })
            }
        }

        if (descriptor && descriptor.writable) {
            try {
                ;(Intl as typeof Intl & Record<T, unknown>)[
                    property
                ] = temporaryValue as never
                callback()
            } finally {
                try {
                    restore()
                } catch {
                    // Some environments expose Intl constructors as read-only.
                }
            }

            return
        }

        if (!descriptor || descriptor.configurable) {
            try {
                Object.defineProperty(Intl, property, {
                    ...descriptor,
                    value: temporaryValue,
                    writable: true,
                    configurable: true,
                })
            } catch {
                callback()
                return
            }

            try {
                callback()
            } finally {
                try {
                    restore()
                } catch {
                    // Some environments expose Intl constructors as read-only.
                }
            }

            return
        }

        callback()
    }
