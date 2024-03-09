import { TC } from '../../utils/type-check'

export const conditionalField = (key: string, value: unknown) =>
    TC.empty(value) ? {} : { [key]: value }
