import initLocale from './intl-locale'
import initName from './intl-name'
import * as WC from '@beforesemicolon/web-component'
import { resetIntl } from '../runtime'

initLocale(WC)
const { intlName } = initName(WC)
const { html } = WC

const nextFrame = () => new Promise((resolve) => setTimeout(resolve, 0))
const getContent = () =>
    (
        document.body.querySelector('intl-name') as HTMLElement & {
            contentRoot?: HTMLElement
        }
    )?.contentRoot?.textContent

describe('intl-name', () => {
    beforeEach(() => {
        resetIntl()
        document.documentElement.lang = 'en-US'
    })

    afterEach(() => {
        resetIntl()
    })

    it('formats display names programmatically', () => {
        expect(
            intlName({
                value: 'US',
                locale: 'en-US',
                type: 'region',
            })
        ).toBe('United States')
    })

    it('renders display names', async () => {
        html`<intl-name value="USD" type="currency"></intl-name>`.render(
            document.body
        )
        await nextFrame()

        expect(getContent()).toBe('US Dollar')
    })

    it('uses the nearest locale provider and rerenders on locale changes', async () => {
        html`
            <intl-locale locale="en-US">
                <intl-name value="US" type="region"></intl-name>
            </intl-locale>
        `.render(document.body)
        await nextFrame()
        await nextFrame()

        const provider = document.querySelector('intl-locale') as
            | HTMLElement & { runtime?: { setLocale(locale: string): Promise<unknown> } }
            | null

        expect(getContent()).toBe('United States')

        await provider?.runtime?.setLocale('fr-FR')
        await nextFrame()

        expect(getContent()).toBe('États-Unis')
    })

    it('lets explicit locale override the provider locale', async () => {
        html`
            <intl-locale locale="en-US">
                <intl-name
                    value="US"
                    locale="fr-FR"
                    type="region"
                ></intl-name>
            </intl-locale>
        `.render(document.body)
        await nextFrame()
        await nextFrame()

        expect(getContent()).toBe('États-Unis')
    })

    it('renders empty content for invalid values', async () => {
        html`<intl-name type="region"></intl-name>`.render(document.body)
        await nextFrame()

        expect(getContent()).toBe('')
        expect(intlName()).toBe('')
    })
})
