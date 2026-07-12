import { intlRelTime } from '../formatters'
import initIntlRelTime from '../components/intl-rel-time'
import { initSingleIntlClient } from '../client-base'

initSingleIntlClient(initIntlRelTime, {
    intlRelTime,
})
