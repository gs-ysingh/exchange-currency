import initialBalance from '../constants/balance';
import { EXCHANGE_CURRENCY } from '../actions/types'

function updateBalance(balance, data) {
	balance.amount = Math.round((balance.amount + (+data.amount)) * 100) / 100;
	return balance;
}

function balance(state = initialBalance, action) {
	if (action.type === EXCHANGE_CURRENCY) {
		const index = state.findIndex((item) => {
			return item.currencyCode === action.data.currencyCode;
		});

		if(index !== -1) {
			return [
				...state.slice(0, index),
				updateBalance(state[index], action.data),
				...state.slice(index + 1)
			];

		}
	}
	return state;
}

export default balance;