import { intlMsg } from '../src/formatters'
import initIntlMsg from '../src/components/intl-msg'
import { initSingleIntlClient } from '../src/client-base'

initSingleIntlClient(initIntlMsg, {
    intlMsg,
})
