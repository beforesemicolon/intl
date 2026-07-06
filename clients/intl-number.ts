import { intlNumber } from '../src/formatters'
import initIntlNumber from '../src/components/intl-number'
import { initSingleIntlClient } from '../src/client-base'

initSingleIntlClient(initIntlNumber, {
    intlNumber,
})
