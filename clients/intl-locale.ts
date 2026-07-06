import * as runtimeApis from '../src/runtime'
import initIntlLocale from '../src/components/intl-locale'
import { initSingleIntlClient } from '../src/client-base'

initSingleIntlClient(initIntlLocale, runtimeApis)
