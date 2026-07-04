import { millisecondsToTimeParts } from './milliseconds-to-time-parts'

describe('millisecondsToTimeParts', () => {
    const blank = {
        days: 0,
        hours: 0,
        milliseconds: 0,
        minutes: 0,
        months: 0,
        nanoseconds: 0,
        seconds: 0,
        weeks: 0,
        years: 0,
    }

    it('should return all parts', () => {
        expect(
            millisecondsToTimeParts(
                1693355092459,
                new Set([
                    'years',
                    'months',
                    'weeks',
                    'days',
                    'hours',
                    'minutes',
                    'seconds',
                    'milliseconds',
                    'nanoseconds',
                ])
            )
        ).toEqual({
            ...blank,
            milliseconds: 459,
            minutes: 24,
            months: 8,
            nanoseconds: 459000000000,
            seconds: 52,
            weeks: 2,
            years: 53,
        })
    })

    it('should return years', () => {
        expect(millisecondsToTimeParts(3.156e10, new Set(['years']))).toEqual({
            ...blank,
            years: 1,
        })
    })

    it('should return months', () => {
        expect(millisecondsToTimeParts(2.628e9, new Set(['months']))).toEqual({
            ...blank,
            months: 1,
        })
    })

    it('should return days', () => {
        expect(millisecondsToTimeParts(8.64e7, new Set(['days']))).toEqual({
            ...blank,
            days: 1,
        })
    })

    it('should return weeks', () => {
        expect(millisecondsToTimeParts(6.048e8, new Set(['weeks']))).toEqual({
            ...blank,
            weeks: 1,
        })
    })

    it('should return hours', () => {
        expect(millisecondsToTimeParts(3.6e6, new Set(['hours']))).toEqual({
            ...blank,
            hours: 1,
        })
    })

    it('should return minutes', () => {
        expect(millisecondsToTimeParts(60000, new Set(['minutes']))).toEqual({
            ...blank,
            minutes: 1,
        })
    })

    it('should return seconds', () => {
        expect(millisecondsToTimeParts(1000, new Set(['seconds']))).toEqual({
            ...blank,
            seconds: 1,
        })
    })

    it('should return nanoseconds', () => {
        expect(millisecondsToTimeParts(1, new Set(['nanoseconds']))).toEqual({
            ...blank,
            nanoseconds: 1000000000,
        })
    })
})
