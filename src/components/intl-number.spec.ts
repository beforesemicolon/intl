import initLocale, { getIntlLocaleRuntime } from './intl-locale'
import initNumber from './intl-number'
import * as WC from '@beforesemicolon/web-component'
import { intlNumber } from '../formatters'
import { resetIntl } from '../runtime'

initLocale(WC)
initNumber(WC)

const { html } = WC
const wait = () => new Promise((resolve) => setTimeout(resolve, 0))
const waitForProviderRender = async () => {
    await wait()
    await wait()
}

describe('intl-number', () => {
    beforeEach(() => {
        resetIntl()
        document.documentElement.lang = 'en-US'
    })

    afterEach(() => {
        resetIntl()
    })

    it('should format numbers programmatically', () => {
        expect(intlNumber(123456.789, { locale: 'en-US' })).toBe(
            '123,456.789'
        )
        expect(
            intlNumber(20, {
                locale: 'en-US',
                style: 'currency',
                currency: 'USD',
            })
        ).toBe('$20.00')
        expect(
            intlNumber(0.25, { locale: 'en-US', style: 'percent' })
        ).toBe('25%')
        expect(
            intlNumber(4, {
                locale: 'en-US',
                style: 'unit',
                unit: 'kilogram',
            })
        ).toBe('4 kg')
        expect(
            intlNumber(2.28, {
                locale: 'en-US',
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
            })
        ).toBe('2.3')
        expect(
            intlNumber(1234, { locale: 'en-US', numberingSystem: 'arab' })
        ).toBe('١٬٢٣٤')
    })

    it('should render decimal, compact, grouping, and sign options', async () => {
        html`
            <intl-number value="123456.789" locale="en-US"></intl-number>
            <intl-number value="123456" notation="compact" locale="en-US"></intl-number>
            <intl-number value="123456" grouping="false" locale="en-US"></intl-number>
            <intl-number value="2" sign="always" locale="en-US"></intl-number>
        `.render(document.body)
        await wait()

        const numbers = [...document.querySelectorAll('intl-number')] as Array<
            HTMLElement & { contentRoot: HTMLElement }
        >

        expect(numbers.map((number) => number.contentRoot.textContent)).toEqual([
            '123,456.789',
            '123K',
            '123456',
            '+2',
        ])
    })

    it('should render currency, percent, and unit options', async () => {
        html`
            <intl-number value="20" type="currency" currency="USD" locale="en-US"></intl-number>
            <intl-number value="0.4" type="percent" locale="en-US"></intl-number>
            <intl-number value="30" type="unit" unit="liter" unit-style="narrow" locale="en-US"></intl-number>
        `.render(document.body)
        await wait()

        const numbers = [...document.querySelectorAll('intl-number')] as Array<
            HTMLElement & { contentRoot: HTMLElement }
        >

        expect(numbers.map((number) => number.contentRoot.textContent)).toEqual([
            '$20.00',
            '40%',
            '30L',
        ])
    })

    it('should use nearest locale provider scope and re-render on locale updates', async () => {
        html`
            <intl-locale locale="en-US" fallback>
                <intl-number value="1200"></intl-number>
            </intl-locale>
        `.render(document.body)
        await waitForProviderRender()

        const number = document.querySelector('intl-number') as HTMLElement & {
            contentRoot: HTMLElement
        }
        const runtime = getIntlLocaleRuntime(number)

        expect(number.contentRoot.textContent).toBe('1,200')

        await runtime?.setLocale('pt-CV')
        await waitForProviderRender()

        expect(number.contentRoot.textContent).toBe('1200')
    })

    it('should prefer explicit locale over provider scope', async () => {
        html`
            <intl-locale locale="pt-CV" fallback>
                <intl-number value="1200" locale="en-US"></intl-number>
            </intl-locale>
        `.render(document.body)
        await waitForProviderRender()

        const number = document.querySelector('intl-number') as HTMLElement & {
            contentRoot: HTMLElement
        }

        expect(number.contentRoot.textContent).toBe('1,200')
    })

    it('should return empty output for invalid values', async () => {
        html`<intl-number value="not-a-number"></intl-number>`.render(document.body)
        await wait()

        const number = document.querySelector('intl-number') as HTMLElement & {
            contentRoot: HTMLElement
        }

        expect(number.contentRoot.textContent).toBe('')
        expect(intlNumber(Number('not-a-number'))).toBe('')
    })
})
