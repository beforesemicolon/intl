import initLocale from './intl-locale'
import initRelTime from './intl-rel-time'
import * as WC from '@beforesemicolon/web-component'
import { intlRelTime } from '../formatters'
import { resetIntl } from '../runtime'
import { ONE_SECOND_MS } from '../utils/time-in-miliseconds'

initLocale(WC)
initRelTime(WC)
const { html } = WC

const nextFrame = () => new Promise((resolve) => setTimeout(resolve, 0))
const getTime = (element: Element | null) =>
    (element as Element & { contentRoot?: HTMLElement } | null)?.contentRoot?.querySelector(
        'time'
    )

describe('intl-rel-time', () => {
    beforeEach(() => {
        resetIntl()
        document.documentElement.lang = 'en-US'
        jest.useRealTimers()
    })

    afterEach(() => {
        resetIntl()
        jest.useRealTimers()
    })

    it('formats relative time programmatically', () => {
        expect(
            intlRelTime(20, {
                locale: 'en-US',
                unit: 'year',
                numeric: 'always',
            })
        ).toBe('in 20 years')
        expect(
            intlRelTime(-1, {
                locale: 'en-US',
                unit: 'year',
                numeric: 'auto',
            })
        ).toBe('last year')
    })

    it('renders semantic time markup for auto timestamp values', async () => {
        const value = Date.now() - ONE_SECOND_MS

        html`
            <intl-rel-time value="${value}"></intl-rel-time>
        `.render(document.body)
        await nextFrame()

        const time = getTime(document.body.querySelector('intl-rel-time'))

        expect(time?.dateTime).toBe(new Date(value).toISOString())
        expect(time?.textContent).toBe('1 second ago')
    })

    it('supports explicit units, style, numeric, and precision', async () => {
        html`
            <intl-rel-time unit="years" numeric="always">20</intl-rel-time>
            <intl-rel-time unit="year" time-style="short" numeric="always">
                20
            </intl-rel-time>
            <intl-rel-time unit="hour" precision="1" numeric="always">
                1.24
            </intl-rel-time>
        `.render(document.body)
        await nextFrame()

        const times = [...document.body.querySelectorAll('intl-rel-time')]
            .map(getTime)
            .filter((time): time is HTMLTimeElement => !!time)

        expect(times.map((time) => time.textContent)).toEqual([
            'in 20 years',
            'in 20 yr.',
            'in 1.2 hours',
        ])
    })

    it('uses the nearest locale provider and rerenders on locale changes', async () => {
        html`
            <intl-locale locale="en-US">
                <intl-rel-time unit="year" numeric="always">20</intl-rel-time>
            </intl-locale>
        `.render(document.body)
        await nextFrame()
        await nextFrame()

        const provider = document.querySelector('intl-locale') as
            | HTMLElement & { runtime?: { setLocale(locale: string): Promise<unknown> } }
            | null
        const runtime = provider?.runtime
        const time = getTime(document.body.querySelector('intl-rel-time'))

        expect(time?.textContent).toBe('in 20 years')

        await runtime?.setLocale('fr-FR')
        await nextFrame()

        expect(time?.textContent).toBe('dans 20 ans')
    })

    it('lets explicit locale override the provider locale', async () => {
        html`
            <intl-locale locale="en-US">
                <intl-rel-time locale="fr-FR" unit="year" numeric="always">
                    20
                </intl-rel-time>
            </intl-locale>
        `.render(document.body)
        await nextFrame()
        await nextFrame()

        expect(getTime(document.body.querySelector('intl-rel-time'))?.textContent).toBe(
            'dans 20 ans'
        )
    })

    it('updates live relative time and clears timers on destroy', async () => {
        const value = new Date('2026-01-01T00:00:00.000Z').getTime()
        const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout')
        jest.useFakeTimers()
        jest.setSystemTime(value)

        html`
            <intl-rel-time live value="${value}"></intl-rel-time>
        `.render(document.body)
        jest.advanceTimersByTime(0)
        await Promise.resolve()

        const element = document.body.querySelector('intl-rel-time')
        const time = getTime(element)

        expect(time?.textContent).toBe('now')

        jest.setSystemTime(value + ONE_SECOND_MS)
        ;(element as HTMLElement & { updateTime(): void } | null)?.updateTime()
        jest.advanceTimersByTime(0)
        await Promise.resolve()

        expect(time?.textContent).toBe('1 second ago')

        element?.remove()

        expect(clearTimeoutSpy).toHaveBeenCalled()
    })

    it('renders empty content for invalid values', async () => {
        html`<intl-rel-time value="bad-value"></intl-rel-time>`.render(
            document.body
        )
        await nextFrame()

        expect(getTime(document.body.querySelector('intl-rel-time'))?.textContent).toBe(
            ''
        )
        expect(intlRelTime(Number('bad-value'))).toBe('')
    })
})
