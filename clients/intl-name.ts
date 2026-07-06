import { intlName } from '../src/formatters'
import initIntlName from '../src/components/intl-name'
import { initSingleIntlClient } from '../src/client-base'

initSingleIntlClient(initIntlName, {
    intlName,
})
