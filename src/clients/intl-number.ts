import { intlNumber } from '../formatters'
import initIntlNumber from '../components/intl-number'
import { initSingleIntlClient } from '../client-base'

initSingleIntlClient(initIntlNumber, {
    intlNumber,
})
