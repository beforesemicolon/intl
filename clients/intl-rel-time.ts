import { intlRelTime } from '../src/formatters'
import initIntlRelTime from '../src/components/intl-rel-time'
import { initSingleIntlClient } from '../src/client-base'

initSingleIntlClient(initIntlRelTime, {
    intlRelTime,
})
