import { UPDATE_EXCHANGE_RATES} from './../actions/types';

export const initialRates = {
	"base": "USD",
	"rates": {
		"USD": 1,
		"EUR": 0.907528,
		"GBP": 0.782779
	}
};

function rates(state = initialRates, action) {
	if(action.type === UPDATE_EXCHANGE_RATES) {
		return {
			...state,
			...action.data
		};
	}
	return state;
}

export default rates;