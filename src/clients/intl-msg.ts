import { intlMsg } from '../formatters'
import initIntlMsg from '../components/intl-msg'
import { initSingleIntlClient } from '../client-base'

initSingleIntlClient(initIntlMsg, {
    intlMsg,
})
