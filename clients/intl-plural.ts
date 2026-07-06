import { intlPlural } from '../src/formatters'
import initIntlPlural from '../src/components/intl-plural'
import { initSingleIntlClient } from '../src/client-base'

initSingleIntlClient(initIntlPlural, {
    intlPlural,
})
