import initLocale from './intl-locale'
import initDate from './intl-datetime'
import * as WC from '@beforesemicolon/web-component'
import { intlDateTime } from '../formatters'
import { resetIntl } from '../runtime'

initLocale(WC)
initDate(WC)
const { html } = WC

const nextFrame = () => new Promise((resolve) => setTimeout(resolve, 0))
const getTime = (element: Element | null) =>
    (element as Element & { contentRoot?: HTMLElement } | null)?.contentRoot?.querySelector(
        'time'
    )

describe('intl-datetime', () => {
    beforeEach(() => {
        resetIntl()
        document.documentElement.lang = 'en-US'
    })

    afterEach(() => {
        resetIntl()
    })

    it('formats dates programmatically', () => {
        expect(
            intlDateTime('2026-01-01T10:00:00Z', {
                locale: 'en-US',
                dateStyle: 'medium',
                timeZone: 'UTC',
            })
        ).toBe('Jan 1, 2026')
        expect(
            intlDateTime('2026-01-01T10:00:00Z', {
                locale: 'fr-FR',
                dateStyle: 'medium',
                timeZone: 'UTC',
            })
        ).toBe('1 janv. 2026')
    })

    it('renders semantic time markup', async () => {
        html`
            <intl-datetime
                value="2026-01-01T10:00:00Z"
                date-style="medium"
                time-zone="UTC"
            ></intl-datetime>
        `.render(document.body)
        await nextFrame()

        const time = getTime(document.body.querySelector('intl-datetime'))

        expect(time?.dateTime).toBe('2026-01-01T10:00:00.000Z')
        expect(time?.textContent).toBe('Jan 1, 2026')
    })

    it('uses the nearest locale provider and rerenders on locale changes', async () => {
        html`
            <intl-locale locale="en-US">
                <intl-datetime
                    value="2026-01-01T10:00:00Z"
                    date-style="medium"
                    time-zone="UTC"
                ></intl-datetime>
            </intl-locale>
        `.render(document.body)
        await nextFrame()
        await nextFrame()

        const provider = document.querySelector('intl-locale') as
            | HTMLElement & { runtime?: { setLocale(locale: string): Promise<unknown> } }
            | null
        const runtime = provider?.runtime
        const time = getTime(document.body.querySelector('intl-datetime'))

        expect(time?.textContent).toBe('Jan 1, 2026')

        await runtime?.setLocale('fr-FR')
        await nextFrame()

        expect(time?.textContent).toBe('1 janv. 2026')
    })

    it('lets explicit locale override the provider locale', async () => {
        html`
            <intl-locale locale="en-US">
                <intl-datetime
                    value="2026-01-01T10:00:00Z"
                    locale="fr-FR"
                    date-style="medium"
                    time-zone="UTC"
                ></intl-datetime>
            </intl-locale>
        `.render(document.body)
        await nextFrame()
        await nextFrame()

        expect(
            getTime(document.body.querySelector('intl-datetime'))?.textContent
        ).toBe(
            '1 janv. 2026'
        )
    })

    it('supports time zone name attributes', async () => {
        html`
            <intl-datetime
                value="2026-01-01T10:00:00Z"
                locale="en-US"
                hour="numeric"
                minute="2-digit"
                time-zone="UTC"
                time-zone-name="short"
            ></intl-datetime>
            <intl-datetime
                value="2026-01-01T10:00:00Z"
                locale="en-US"
                hour="numeric"
                minute="2-digit"
                timezone="UTC"
                timezone-name="short"
            ></intl-datetime>
        `.render(document.body)
        await nextFrame()

        const times = [...document.body.querySelectorAll('intl-datetime')]
            .map(getTime)
            .filter((time): time is HTMLTimeElement => !!time)

        expect(times.map((time) => time.textContent)).toEqual([
            '10:00 AM UTC',
            '10:00 AM UTC',
        ])
    })

    it('renders empty content for invalid dates', async () => {
        html`<intl-datetime value="not-a-date"></intl-datetime>`.render(
            document.body
        )
        await nextFrame()

        expect(getTime(document.body.querySelector('intl-datetime'))?.textContent).toBe(
            ''
        )
        expect(intlDateTime('not-a-date')).toBe('')
    })
})
