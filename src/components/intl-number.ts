import { intlNumber, FormatterOptions } from '../formatters'
import { getIntl, IntlRuntime } from '../runtime'
import { getIntlLocaleRuntime } from './intl-locale'

export interface IntlNumberProps {
    value: number | string | undefined
    locale: string
    type: Intl.NumberFormatOptions['style']
    currency: string
    currencyStyle: Intl.NumberFormatOptions['currencyDisplay']
    currencySign: Intl.NumberFormatOptions['currencySign']
    unit: string
    unitStyle: Intl.NumberFormatOptions['unitDisplay']
    notation: Intl.NumberFormatOptions['notation']
    compact: Intl.NumberFormatOptions['compactDisplay']
    system: string
    grouping: string | boolean
    sign: Intl.NumberFormatOptions['signDisplay']
    rounding: string
    roundingIncrement: number | string | undefined
    roundingPriority: string
    trailingZero: string
    minDigits: number | string | undefined
    significantDigits: number | string | undefined
    fractions: number | string | undefined
}

type NumberFormatOptions = FormatterOptions & Record<string, unknown>

const readValue = <T>(value: T | (() => T)) => {
    return typeof value === 'function' ? (value as () => T)() : value
}

const addDefined = (
    options: NumberFormatOptions,
    key: string,
    value: unknown
) => {
    if (value !== undefined && value !== null && value !== '') {
        options[key] = value
    }
}

const parseRange = (value: unknown) => {
    const parts = String(value || '')
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map(Number)
        .filter((part) => !Number.isNaN(part))

    if (!parts.length) {
        return []
    }

    return [parts[0], parts[1] ?? parts[0]]
}

const parseGrouping = (value: unknown) => {
    if (value === 'false' || value === false) {
        return false
    }

    if (value === 'true' || value === true) {
        return true
    }

    return value as Intl.NumberFormatOptions['useGrouping']
}

const buildOptions = (
    props: Partial<
        Record<
            keyof IntlNumberProps,
            | IntlNumberProps[keyof IntlNumberProps]
            | (() => IntlNumberProps[keyof IntlNumberProps])
        >
    >,
    runtime?: IntlRuntime
) => {
    const style = readValue(props.type) || 'decimal'
    const options: NumberFormatOptions = {
        scope: runtime,
        style,
    }
    const locale = readValue(props.locale)

    addDefined(options, 'locale', locale)
    addDefined(options, 'currency', readValue(props.currency))
    addDefined(options, 'currencyDisplay', readValue(props.currencyStyle))
    addDefined(options, 'currencySign', readValue(props.currencySign))
    addDefined(options, 'unit', readValue(props.unit))
    addDefined(options, 'unitDisplay', readValue(props.unitStyle))
    addDefined(options, 'notation', readValue(props.notation))
    addDefined(options, 'compactDisplay', readValue(props.compact))
    addDefined(options, 'numberingSystem', readValue(props.system))
    addDefined(options, 'signDisplay', readValue(props.sign))
    addDefined(options, 'roundingMode', readValue(props.rounding))
    addDefined(
        options,
        'roundingIncrement',
        Number(readValue(props.roundingIncrement)) || undefined
    )
    addDefined(options, 'roundingPriority', readValue(props.roundingPriority))
    addDefined(options, 'trailingZeroDisplay', readValue(props.trailingZero))
    addDefined(
        options,
        'minimumIntegerDigits',
        Number(readValue(props.minDigits)) || undefined
    )

    const [minSignificantDigits, maxSignificantDigits] = parseRange(
        readValue(props.significantDigits)
    )
    const [minFractionDigits, maxFractionDigits] = parseRange(
        readValue(props.fractions)
    )
    const grouping = readValue(props.grouping)

    addDefined(options, 'minimumSignificantDigits', minSignificantDigits)
    addDefined(options, 'maximumSignificantDigits', maxSignificantDigits)
    addDefined(options, 'minimumFractionDigits', minFractionDigits)
    addDefined(options, 'maximumFractionDigits', maxFractionDigits)

    if (grouping !== undefined && grouping !== '') {
        options.useGrouping = parseGrouping(grouping)
    }

    return options
}

const resolveNumberValue = (value: unknown) => {
    const numberValue = Number(readValue(value))
    return Number.isNaN(numberValue) ? undefined : numberValue
}

const initIntlNumber = ({
    html,
    WebComponent,
}: typeof import('@beforesemicolon/web-component')) => {
    class IntlNumber extends WebComponent<
        IntlNumberProps,
        { content: string }
    > {
        static observedAttributes = [
            'value',
            'locale',
            'type',
            'currency',
            'currency-style',
            'currency-sign',
            'unit',
            'unit-style',
            'notation',
            'compact',
            'system',
            'grouping',
            'sign',
            'rounding',
            'rounding-increment',
            'rounding-priority',
            'trailing-zero',
            'min-digits',
            'significant-digits',
            'fractions',
        ]
        value = 0
        locale = ''
        type = 'decimal' as IntlNumberProps['type']
        currency = ''
        currencyStyle = ''
        currencySign = ''
        unit = ''
        unitStyle = ''
        notation = ''
        compact = ''
        system = ''
        grouping = ''
        sign = ''
        rounding = ''
        roundingIncrement = undefined
        roundingPriority = ''
        trailingZero = ''
        minDigits = undefined
        significantDigits = undefined
        fractions = undefined
        config = { shadow: false }
        initialState = {
            content: '',
        }
        runtime?: IntlRuntime
        unsubscribe?: () => void
        subscribeTimer?: ReturnType<typeof setTimeout>
        sourceText = ''

        updateNumber = () => {
            const value = resolveNumberValue(
                this.sourceText || this.props.value()
            )

            if (value === undefined) {
                console.error('intl-number: invalid value', this.props.value())
                this.setState({ content: '' })
                return
            }

            this.setState({
                content: intlNumber(
                    value,
                    buildOptions(
                        this.props,
                        this.runtime
                    ) as Intl.NumberFormatOptions & FormatterOptions
                ),
            })
        }

        subscribeToRuntime = () => {
            this.unsubscribe?.()
            const provider = this.closest('intl-locale')
            const providerRuntime = getIntlLocaleRuntime(this)

            /* istanbul ignore next -- depends on custom-element provider mount ordering */
            if (provider && !providerRuntime) {
                this.subscribeTimer = setTimeout(this.subscribeToRuntime, 0)
                return
            }

            this.runtime = providerRuntime || getIntl()
            this.unsubscribe = this.runtime.subscribe((snapshot) => {
                this.lang = this.props.locale() || snapshot.locale
                this.dir = snapshot.direction
                this.updateNumber()
            })
        }

        onMount() {
            this.subscribeToRuntime()
        }

        onUpdate() {
            this.updateNumber()
        }

        onDestroy() {
            clearTimeout(this.subscribeTimer)
            this.unsubscribe?.()
        }

        render() {
            return html`${this.state.content}`
        }
    }

    Object.defineProperty(IntlNumber.prototype, 'connectedCallback', {
        value: function connectedCallback(this: IntlNumber) {
            this.sourceText = this.textContent?.trim() || ''
            ;(
                WebComponent.prototype as unknown as {
                    connectedCallback(): void
                }
            ).connectedCallback.call(this)
        },
    })

    if (!customElements.get('intl-number')) {
        customElements.define('intl-number', IntlNumber)
    }
}

export default initIntlNumber
