import initLocale from './intl-locale'
import initPlural from './intl-plural'
import * as WC from '@beforesemicolon/web-component'
import { intlPlural } from '../formatters'
import { resetIntl } from '../runtime'

initLocale(WC)
initPlural(WC)
const { html } = WC

const nextFrame = () => new Promise((resolve) => setTimeout(resolve, 0))
const getContent = () =>
    (
        document.body.querySelector('intl-plural') as HTMLElement & {
            contentRoot?: HTMLElement
        }
    )?.contentRoot?.textContent

describe('intl-plural', () => {
    beforeEach(() => {
        resetIntl()
        document.documentElement.lang = 'en-US'
    })

    afterEach(() => {
        resetIntl()
    })

    it('formats plural values programmatically', () => {
        expect(
            intlPlural(1, { locale: 'en-US', one: 'person', other: 'people' })
        ).toBe('person')
        expect(
            intlPlural(2, { locale: 'en-US', one: 'person', other: 'people' })
        ).toBe('people')
    })

    it('renders cardinal plural values', async () => {
        html`
            <intl-plural value="1" one="person" other="people"></intl-plural>
        `.render(document.body)
        await nextFrame()

        expect(getContent()).toBe('person')
    })

    it('renders ordinal plural values', async () => {
        html`
            <intl-plural
                value="2"
                type="ordinal"
                one="st"
                two="nd"
                few="rd"
                other="th"
            ></intl-plural>
        `.render(document.body)
        await nextFrame()

        expect(getContent()).toBe('2nd')
    })

    it('uses the nearest locale provider and rerenders on locale changes', async () => {
        html`
            <intl-locale locale="en-US">
                <intl-plural
                    value="11"
                    one="one"
                    other="other"
                    many="many"
                ></intl-plural>
            </intl-locale>
        `.render(document.body)
        await nextFrame()
        await nextFrame()

        const provider = document.querySelector('intl-locale') as
            | HTMLElement & { runtime?: { setLocale(locale: string): Promise<unknown> } }
            | null

        expect(getContent()).toBe('other')

        await provider?.runtime?.setLocale('ar')
        await nextFrame()

        expect(getContent()).toBe('many')
    })

    it('lets explicit locale override the provider locale', async () => {
        html`
            <intl-locale locale="en-US">
                <intl-plural
                    value="11"
                    locale="ar"
                    one="one"
                    other="other"
                    many="many"
                ></intl-plural>
            </intl-locale>
        `.render(document.body)
        await nextFrame()
        await nextFrame()

        expect(getContent()).toBe('many')
    })

    it('renders empty content for invalid values', async () => {
        html`<intl-plural value="bad-value"></intl-plural>`.render(
            document.body
        )
        await nextFrame()

        expect(getContent()).toBe('')
        expect(intlPlural(Number('bad-value'))).toBe('')
    })
})
