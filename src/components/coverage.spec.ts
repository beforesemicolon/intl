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
import { initIntl, resetIntl } from '../runtime'

initLocale(WC)
const { intlDatetime } = initDatetime(WC)
const { intlDuration } = initDuration(WC)
const { intlList } = initList(WC)
const { intlMsg } = initMsg(WC)
const { intlName } = initName(WC)
const { intlNumber } = initNumber(WC)
const { intlPlural } = initPlural(WC)
const { intlRelativeTime } = initRelTime(WC)

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
            intlDatetime({
                value: new Date('2026-01-01T10:00:00Z'),
                dateStyle: 'medium',
                timeZone: 'UTC',
            })
        ).toBe('Jan 1, 2026')
        expect(
            intlDatetime({
                value: new Date('bad-date'),
                dateStyle: 'medium',
            })
        ).toBe('')
        expect(intlDatetime()).not.toBe('')
        expect(intlNumber({ value: 12, grouping: true })).toBe('12')
        expect(intlNumber({ value: 12, grouping: 'min2' })).toBe('12')
        expect(intlNumber({ value: 12, fractions: 'bad' })).toBe('12')
        expect(intlNumber()).toBe('0')
        expect(intlDuration({ value: 1_000, fields: undefined })).toBe(
            '1 second'
        )
        expect(intlDuration()).toBe('')
        expect(intlList({ value: undefined })).toBe('')
        expect(intlList()).toBe('')
        expect(intlName({ value: 'US', nameStyle: 'short' })).toBe('US')
        expect(intlName({ value: '' })).toBe('')
        expect(intlPlural({ value: Number.NaN })).toBe('')
        expect(intlPlural()).toBe('other')
        expect(intlRelativeTime(new Date('bad-date'))).toBe('')
        expect(
            intlRelativeTime('2026-01-01T10:00:00Z', {
                locale: 'en-US',
            })
        ).not.toBe('')
        expect(
            intlRelativeTime(1, {
                numeric: true,
                unit: 'years',
            })
        ).toBe('in 1 year')
        expect(
            intlRelativeTime(1, {
                numeric: false,
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
