import { intlDateTime } from '../formatters'
import initIntlDateTime from '../components/intl-datetime'
import { initSingleIntlClient } from '../client-base'

initSingleIntlClient(initIntlDateTime, {
    intlDateTime,
})
