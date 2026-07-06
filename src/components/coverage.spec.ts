import initDatetime from './intl-datetime'
import initDuration from './intl-duration'
import initList from './intl-list'
import initLocale from './intl-locale'
import initMsg from './intl-msg'
import initName from './intl-name'
import initNumber from './intl-number'
import initPlural from './intl-plural'
import initRelTime from './intl-rel-time'
import * as WC from '@beforesemicolon/web-component'
import {
    intlDateTime,
    intlDuration,
    intlList,
    intlMsg,
    intlName,
    intlNumber,
    intlPlural,
    intlRelTime,
} from '../formatters'
import { initIntl, resetIntl } from '../runtime'

initLocale(WC)
initDatetime(WC)
initDuration(WC)
initList(WC)
initMsg(WC)
initName(WC)
initNumber(WC)
initPlural(WC)
initRelTime(WC)

const { html } = WC
const nextFrame = () => new Promise((resolve) => setTimeout(resolve, 0))
const text = (selector: string) =>
    (
        document.querySelector(selector) as HTMLElement & {
            contentRoot?: HTMLElement
        }
    )?.contentRoot?.textContent

describe('component edge coverage', () => {
    beforeEach(() => {
        resetIntl()
        document.documentElement.lang = 'en-US'
    })

    afterEach(() => {
        resetIntl()
        jest.useRealTimers()
    })

    it('covers programmatic parser edge cases', () => {
        initIntl({
            locale: 'en-US',
            messages: { greeting: 'Hello {name}' },
        })

        expect(
            intlDateTime(new Date('2026-01-01T10:00:00Z'), {
                dateStyle: 'medium',
                timeZone: 'UTC',
            })
        ).toBe('Jan 1, 2026')
        expect(
            intlDateTime(new Date('bad-date'), {
                dateStyle: 'medium',
            })
        ).toBe('')
        expect(
            intlDateTime(new Date('2026-01-01T10:00:00Z'), {
                dateStyle: 'medium',
            })
        ).not.toBe('')
        expect(intlNumber(12, { useGrouping: true })).toBe('12')
        expect(
            intlNumber(12, {
                useGrouping: 'bad' as unknown as Intl.NumberFormatOptions['useGrouping'],
            })
        ).toBe('')
        expect(
            intlNumber(12, {
                maximumFractionDigits: 'bad' as unknown as number,
            })
        ).toBe('')
        expect(intlNumber(0)).toBe('0')
        expect(intlDuration(1_000, { fields: undefined })).toBe('1 second')
        expect(intlDuration(NaN)).toBe('')
        expect(intlList(undefined as unknown as string[])).toBe('')
        expect(intlList([] as unknown as string[])).toBe('')
        expect(intlName('US', { type: 'region', style: 'short' })).toBe('US')
        expect(intlName('')).toBe('')
        expect(intlPlural(Number.NaN)).toBe('')
        expect(intlPlural(0)).toBe('other')
        expect(intlRelTime(Number.NaN)).toBe('')
        expect(
            intlRelTime(new Date('2026-01-01T10:00:00Z').getTime(), {
                locale: 'en-US',
            })
        ).not.toBe('')
        expect(
            intlRelTime(1, {
                numeric: 'always',
                unit: 'years',
            })
        ).toBe('in 1 year')
        expect(
            intlRelTime(1, {
                numeric: 'auto',
                unit: 'years',
            })
        ).toBe('next year')
        expect(intlMsg('greeting', { name: 'Sam' })).toBe('Hello Sam')
    })

    it('updates and destroys rendered components cleanly', async () => {
        html`
            <intl-msg key="greeting">Fallback</intl-msg>
            <intl-number value="1"></intl-number>
            <intl-datetime
                value="2026-01-01T10:00:00Z"
                year="numeric"
                month="2-digit"
                day="2-digit"
                hour12="true"
                time-zone="UTC"
            ></intl-datetime>
            <intl-duration value="1000"></intl-duration>
            <intl-list value="a b" type-style="short"></intl-list>
            <intl-name value="US" type="region" name-style="short"></intl-name>
            <intl-plural value="1" one="one" other="other"></intl-plural>
            <intl-rel-time value="1" unit="hour" live></intl-rel-time>
        `.render(document.body)
        await nextFrame()

        initIntl({
            locale: 'en-US',
            messages: { greeting: 'Hello' },
        })

        const number = document.querySelector('intl-number')
        number?.setAttribute('value', '2')

        const datetime = document.querySelector('intl-datetime')
        datetime?.setAttribute('hour12', 'false')

        const duration = document.querySelector('intl-duration')
        duration?.setAttribute('time-style', 'short')

        const list = document.querySelector('intl-list')
        list?.setAttribute('type-style', 'long')

        const name = document.querySelector('intl-name')
        name?.setAttribute('name-style', 'long')

        const plural = document.querySelector('intl-plural')
        plural?.setAttribute('value', '2')

        const relTime = document.querySelector('intl-rel-time')
        relTime?.setAttribute('live', 'false')

        await nextFrame()

        expect(text('intl-number')).toBe('2')
        expect(text('intl-plural')).toBe('other')

        document.body.innerHTML = ''
        await nextFrame()
    })
})
