import '@formatjs/intl-durationformat/polyfill'
import initLocale from './intl-locale'
import initDuration from './intl-duration'
import * as WC from '@beforesemicolon/web-component'
import { resetIntl } from '../runtime'

initLocale(WC)
const { intlDuration } = initDuration(WC)
const { html } = WC

const nextFrame = () => new Promise((resolve) => setTimeout(resolve, 0))

const formatExpected = (
    locale: string,
    parts: Record<string, number>,
    style: 'long' | 'short' | 'narrow' = 'long'
) => {
    const DurationFormat = Intl as typeof Intl & {
        DurationFormat: new (
            locale: string,
            options: { style: string }
        ) => { format(parts: Record<string, number>): string }
    }

    return new DurationFormat.DurationFormat(locale, { style }).format(parts)
}

describe('intl-duration', () => {
    beforeEach(() => {
        resetIntl()
        document.documentElement.lang = 'en-US'
    })

    afterEach(() => {
        resetIntl()
    })

    it('formats durations programmatically', () => {
        expect(
            intlDuration({
                value: 3_600_000,
                locale: 'en-US',
                fields: 'hours minutes',
            })
        ).toBe(formatExpected('en-US', { hours: 1, minutes: 0 }))
    })

    it('renders selected duration fields', async () => {
        html`
            <intl-duration value="90061000" fields="hours minutes seconds">
            </intl-duration>
        `.render(document.body)
        await nextFrame()

        const duration = document.body.querySelector(
            'intl-duration'
        ) as HTMLElement & { contentRoot?: HTMLElement }

        expect(duration.contentRoot?.textContent).toBe(
            formatExpected('en-US', { hours: 25, minutes: 1, seconds: 1 })
        )
    })

    it('maps singular field aliases at the component boundary', async () => {
        html`
            <intl-duration value="3600000" fields="hour"></intl-duration>
        `.render(document.body)
        await nextFrame()

        const duration = document.body.querySelector(
            'intl-duration'
        ) as HTMLElement & { contentRoot?: HTMLElement }

        expect(duration.contentRoot?.textContent).toBe(
            formatExpected('en-US', { hours: 1 })
        )
    })

    it('supports duration styles', async () => {
        html`
            <intl-duration
                value="3600000"
                fields="hours"
                time-style="long"
            ></intl-duration>
            <intl-duration
                value="3600000"
                fields="hours"
                time-style="short"
            ></intl-duration>
            <intl-duration
                value="3600000"
                fields="hours"
                time-style="narrow"
            ></intl-duration>
        `.render(document.body)
        await nextFrame()

        const durations = [
            ...document.body.querySelectorAll('intl-duration'),
        ] as Array<HTMLElement & { contentRoot?: HTMLElement }>

        expect(durations.map((duration) => duration.contentRoot?.textContent)).toEqual(
            [
                formatExpected('en-US', { hours: 1 }, 'long'),
                formatExpected('en-US', { hours: 1 }, 'short'),
                formatExpected('en-US', { hours: 1 }, 'narrow'),
            ]
        )
    })

    it('uses the nearest locale provider and rerenders on locale changes', async () => {
        html`
            <intl-locale locale="en-US">
                <intl-duration value="3600000" fields="hours"></intl-duration>
            </intl-locale>
        `.render(document.body)
        await nextFrame()
        await nextFrame()

        const provider = document.querySelector('intl-locale') as
            | HTMLElement & { runtime?: { setLocale(locale: string): Promise<unknown> } }
            | null
        const runtime = provider?.runtime
        const duration = document.body.querySelector(
            'intl-duration'
        ) as HTMLElement & { contentRoot?: HTMLElement }

        expect(duration.contentRoot?.textContent).toBe(
            formatExpected('en-US', { hours: 1 })
        )

        await runtime?.setLocale('fr-FR')
        await nextFrame()

        expect(duration.contentRoot?.textContent).toBe(
            formatExpected('fr-FR', { hours: 1 })
        )
    })

    it('lets explicit locale override the provider locale', async () => {
        html`
            <intl-locale locale="en-US">
                <intl-duration
                    value="3600000"
                    locale="fr-FR"
                    fields="hours"
                ></intl-duration>
            </intl-locale>
        `.render(document.body)
        await nextFrame()
        await nextFrame()

        const duration = document.body.querySelector(
            'intl-duration'
        ) as HTMLElement & { contentRoot?: HTMLElement }

        expect(duration.contentRoot?.textContent).toBe(
            formatExpected('fr-FR', { hours: 1 })
        )
    })

    it('renders empty content for invalid values', async () => {
        html`<intl-duration value="bad-value"></intl-duration>`.render(
            document.body
        )
        await nextFrame()

        const duration = document.body.querySelector(
            'intl-duration'
        ) as HTMLElement & { contentRoot?: HTMLElement }

        expect(duration.contentRoot?.textContent).toBe('')
        expect(intlDuration({ value: 'bad-value' })).toBe('')
    })
})
