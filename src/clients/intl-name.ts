import { intlName } from '../formatters'
import initIntlName from '../components/intl-name'
import { initSingleIntlClient } from '../client-base'

initSingleIntlClient(initIntlName, {
    intlName,
})
