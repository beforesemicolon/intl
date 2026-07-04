import { createIntl, resetIntl } from './runtime'
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
})
