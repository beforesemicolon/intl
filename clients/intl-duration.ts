import { intlDuration } from '../src/formatters'
import initIntlDuration from '../src/components/intl-duration'
import { initSingleIntlClient } from '../src/client-base'

initSingleIntlClient(initIntlDuration, {
    intlDuration,
})
