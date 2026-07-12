import { intlDuration } from '../formatters'
import initIntlDuration from '../components/intl-duration'
import { initSingleIntlClient } from '../client-base'

initSingleIntlClient(initIntlDuration, {
    intlDuration,
})
