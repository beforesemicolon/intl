export const conditionalField = (key: string, value: unknown) =>
	// @ts-ignore
	!value && !value?.length && !value?.size ? {} : {[key]: value}
