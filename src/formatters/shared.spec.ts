import { createIntl, resetIntl } from '../runtime'
import {
    fallbackDurationFormat,
    getLocale,
    getRelativeUnitAndValue,
    interpolateMessage,
    normalizeDurationFields,
    stableStringify,
} from './shared'

describe('formatters shared utilities', () => {
    beforeEach(() => {
        resetIntl()
    })

    it('resolves locale with a custom scope and fallback', () => {
        const scope = createIntl({ locale: 'fr-CA' })
        expect(getLocale({ scope })).toBe('fr-CA')
        expect(getLocale()).toBe('en')
        expect(getLocale({ locale: 'en-GB', scope })).toBe('en-GB')
    })

    it('stringifies values deterministically', () => {
        expect(stableStringify(undefined)).toBeUndefined()
        expect(stableStringify('hello')).toBe('"hello"')
        expect(stableStringify({ b: 2, a: undefined, c: 1 })).toBe(
            '{"b":2,"c":1}'
        )
        expect(stableStringify(['b', 'a'])).toBe('[\"b\",\"a\"]')
    })

    it('interpolates messages and handles default values', () => {
        expect(interpolateMessage('Hello {name}', { name: 'You' })).toBe(
            'Hello You'
        )
        expect(interpolateMessage('Missing {x}')).toBe('Missing ')
        expect(interpolateMessage('Null {x}', { x: null })).toBe('Null ')
    })

    it('normalizes duration fields from arrays, strings, and wildcards', () => {
        expect(normalizeDurationFields('*')).toEqual(new Set([
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
        ]))
        expect(normalizeDurationFields('days hours unknown')).toEqual(
            new Set(['days', 'hours'])
        )
        expect(normalizeDurationFields(['minutes', 'seconds', 'bad'])).toEqual(
            new Set(['minutes', 'seconds'])
        )
        expect(normalizeDurationFields(undefined)).toEqual(new Set([
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
        ]))
    })

    it('covers all duration unit branches', () => {
        expect(getRelativeUnitAndValue(500, 1)).toMatchObject({
            unit: 'second',
        })
        expect(getRelativeUnitAndValue(60_000 + 500, 1)).toMatchObject({
            unit: 'minute',
        })
        expect(getRelativeUnitAndValue(3_600_000 + 500, 1)).toMatchObject({
            unit: 'hour',
        })
        expect(getRelativeUnitAndValue(2 * 24 * 60 * 60 * 1000, 1)).toMatchObject(
            { unit: 'day' }
        )
        expect(
            getRelativeUnitAndValue(8 * 24 * 60 * 60 * 1000, 1)
        ).toMatchObject({ unit: 'week' })
        expect(
            getRelativeUnitAndValue(40 * 24 * 60 * 60 * 1000, 1)
        ).toMatchObject({ unit: 'month' })
        expect(
            getRelativeUnitAndValue(400 * 24 * 60 * 60 * 1000, 1)
        ).toMatchObject({ unit: 'year' })
    })

    it('formats duration fallback as narrow and long output', () => {
        expect(fallbackDurationFormat({ hours: 1, minutes: 2 }, 'narrow')).toBe(
            '1h, 2m'
        )
        expect(fallbackDurationFormat({ hours: 1, minutes: 2 })).toBe(
            '1 hour, 2 minutes'
        )
        expect(fallbackDurationFormat({}, 'long')).toBe('')
    })
})
