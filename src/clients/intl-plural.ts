import { intlPlural } from '../formatters'
import initIntlPlural from '../components/intl-plural'
import { initSingleIntlClient } from '../client-base'

initSingleIntlClient(initIntlPlural, {
    intlPlural,
})
