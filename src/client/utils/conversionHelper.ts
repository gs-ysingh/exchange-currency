import currencies from '../constants/currencies';

export const addCurrencyProperties = (currenyCode: string) => {
	return currencies.find((cur) => {
		return cur.currencyCode === currenyCode;
	})
}