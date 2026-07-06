import { intlDateTime } from '../src/formatters'
import initIntlDateTime from '../src/components/intl-datetime'
import { initSingleIntlClient } from '../src/client-base'

initSingleIntlClient(initIntlDateTime, {
    intlDateTime,
})
