import * as runtimeApis from '../runtime'
import initIntlLocale from '../components/intl-locale'
import { initSingleIntlClient } from '../client-base'

initSingleIntlClient(initIntlLocale, runtimeApis)
