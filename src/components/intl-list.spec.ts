import initLocale from './intl-locale'
import initList from './intl-list'
import * as WC from '@beforesemicolon/web-component'
import { resetIntl } from '../runtime'

initLocale(WC)
const { intlList } = initList(WC)
const { html } = WC

const nextFrame = () => new Promise((resolve) => setTimeout(resolve, 0))
const getContent = (selector: string) =>
    (
        document.body.querySelector(selector) as HTMLElement & {
            contentRoot?: HTMLElement
        }
    )?.contentRoot?.textContent

describe('intl-list', () => {
    beforeEach(() => {
        resetIntl()
        document.documentElement.lang = 'en-US'
    })

    afterEach(() => {
        resetIntl()
    })

    it('formats lists programmatically', () => {
        expect(
            intlList({
                value: ['book', 'pen', 'pencil'],
                locale: 'en-US',
                type: 'conjunction',
            })
        ).toBe('book, pen, and pencil')
    })

    it('renders list values and type aliases', async () => {
        html`
            <intl-list value="book pen pencil" type="or"></intl-list>
        `.render(document.body)
        await nextFrame()

        expect(getContent('intl-list')).toBe('book, pen, or pencil')
    })

    it('supports list styles', async () => {
        html`
            <intl-list
                value="book pen pencil"
                type="and"
                type-style="short"
            ></intl-list>
        `.render(document.body)
        await nextFrame()

        expect(getContent('intl-list')).toBe('book, pen, & pencil')
    })

    it('uses the nearest locale provider and rerenders on locale changes', async () => {
        html`
            <intl-locale locale="en-US">
                <intl-list value="book pen pencil" type="and"></intl-list>
            </intl-locale>
        `.render(document.body)
        await nextFrame()
        await nextFrame()

        const provider = document.querySelector('intl-locale') as
            | HTMLElement & { runtime?: { setLocale(locale: string): Promise<unknown> } }
            | null

        expect(getContent('intl-list')).toBe('book, pen, and pencil')

        await provider?.runtime?.setLocale('fr-FR')
        await nextFrame()

        expect(getContent('intl-list')).toBe('book, pen et pencil')
    })

    it('lets explicit locale override the provider locale', async () => {
        html`
            <intl-locale locale="en-US">
                <intl-list
                    value="book pen pencil"
                    locale="fr-FR"
                    type="and"
                ></intl-list>
            </intl-locale>
        `.render(document.body)
        await nextFrame()
        await nextFrame()

        expect(getContent('intl-list')).toBe('book, pen et pencil')
    })
})
