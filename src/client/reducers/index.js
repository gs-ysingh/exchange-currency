import { combineReducers } from 'redux';
import balance from './balance';
import rates from './rates';

const moneyApp = combineReducers({
	balance,
	rates
});

export default moneyApp;