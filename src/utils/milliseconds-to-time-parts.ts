import {
    ONE_DAY_MS,
    ONE_HOUR_MS,
    ONE_MINUTE_MS,
    ONE_MONTH_MS,
    ONE_SECOND_MS,
    ONE_WEEK_MS,
    ONE_YEAR_MS,
    ONE_NANOSECOND_MS,
} from './time-in-miliseconds'

/**
 * gradually break-down time based on the fields needed
 * @param mils
 * @param keys
 */
export const millisecondsToTimeParts = (mils: number, keys: Set<string>) => {
    let remainder = mils
    const obj = {
        years: 0,
        months: 0,
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
        nanoseconds: 0,
    }

    if (keys.has('years')) {
        obj.years = Math.floor(mils / ONE_YEAR_MS)
        remainder = mils % ONE_YEAR_MS
    }

    if (keys.has('months')) {
        obj.months = Math.floor(remainder / ONE_MONTH_MS)
        remainder = remainder % ONE_MONTH_MS
    }

    if (keys.has('weeks')) {
        obj.weeks = Math.floor(remainder / ONE_WEEK_MS)
        remainder = remainder % ONE_WEEK_MS
    }

    if (keys.has('days')) {
        obj.days = Math.floor(remainder / ONE_DAY_MS)
        remainder = remainder % ONE_DAY_MS
    }

    if (keys.has('hours')) {
        obj.hours = Math.floor(remainder / ONE_HOUR_MS)
        remainder = remainder % ONE_HOUR_MS
    }

    if (keys.has('minutes')) {
        obj.minutes = Math.floor(remainder / ONE_MINUTE_MS)
        remainder = remainder % ONE_MINUTE_MS
    }

    if (keys.has('seconds')) {
        obj.seconds = Math.floor(remainder / ONE_SECOND_MS)
        remainder = remainder % ONE_SECOND_MS
    }

    if (keys.has('milliseconds')) {
        obj.milliseconds = remainder
    }

    if (keys.has('nanoseconds')) {
        obj.nanoseconds = remainder * ONE_NANOSECOND_MS
    }

    return obj
}
