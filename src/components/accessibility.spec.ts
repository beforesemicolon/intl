import initLocale from './intl-locale'
import initNumber from './intl-number'
import initDatetime from './intl-datetime'
import initDuration from './intl-duration'
import * as WC from '@beforesemicolon/web-component'
import { resetIntl } from '../runtime'

initLocale(WC)
initNumber(WC)
initDatetime(WC)
initDuration(WC)

const { html } = WC
const nextFrame = () => new Promise((resolve) => setTimeout(resolve, 0))

describe('component accessibility output', () => {
    beforeEach(() => {
        resetIntl()
        document.documentElement.lang = 'en-US'
    })

    afterEach(() => {
        resetIntl()
    })

    it('renders localized text in light DOM with language metadata', async () => {
        html`
            <intl-locale locale="ar" fallback>
                <intl-number value="1200"></intl-number>
            </intl-locale>
        `.render(document.body)
        await nextFrame()
        await nextFrame()

        const number = document.querySelector('intl-number') as HTMLElement | null

        expect(number?.shadowRoot).toBeNull()
        expect(number?.textContent).not.toBe('')
        expect(number?.lang).toBe('ar')
        expect(number?.dir).toBe('rtl')
    })

    it('renders date output as a real time element', async () => {
        html`
            <intl-datetime
                value="2026-01-01T10:00:00Z"
                date-style="medium"
                time-zone="UTC"
            ></intl-datetime>
        `.render(document.body)
        await nextFrame()

        const datetime = document.querySelector('intl-datetime')
        const time = datetime?.querySelector('time')

        expect(datetime?.shadowRoot).toBeNull()
        expect(time?.dateTime).toBe('2026-01-01T10:00:00.000Z')
        expect(time?.textContent).toBe('Jan 1, 2026')
    })

    it('adds long aria labels for abbreviated output', async () => {
        html`
            <intl-duration
                value="3600000"
                fields="hours"
                time-style="narrow"
            ></intl-duration>
        `.render(document.body)
        await nextFrame()

        const duration = document.querySelector('intl-duration')

        expect(duration?.textContent).toBe('1h')
        expect(duration?.getAttribute('aria-label')).toBe('1 hour')
    })
})
